/**
 * Almacenamiento con IndexedDB (Safari-safe) + localStorage fallback.
 * Versionado de esquema y backup JSON.
 */

import { fechaStr, formatearYMD, ahoraBogota } from './fecha.js';

const VERSION = 1;
const STORAGE_KEY = 'recetario_v' + VERSION;
const IDB_NAME = 'RecetarioApp';
const IDB_STORE = 'appState';

export class Store {
  constructor() {
    this.data = null;
    this.idbReady = false;
    this.useIDB = true;
  }

  /**
   * Inicializa IndexedDB y carga datos
   */
  async init() {
    if ('indexedDB' in window) {
      try {
        this.db = await this.initIDB();
        this.idbReady = true;
        this.useIDB = true;
        this.data = await this.loadFromIDB();
        console.log('✓ IndexedDB inicializado');
      } catch (e) {
        console.warn('IndexedDB error, fallback a localStorage:', e);
        this.useIDB = false;
        this.data = this.loadFromLocalStorage();
      }
    } else {
      console.warn('IndexedDB no disponible, usando localStorage');
      this.useIDB = false;
      this.data = this.loadFromLocalStorage();
    }

    if (!this.data) {
      this.data = this.getDefaultData();
    }
  }

  /**
   * Inicializa base de datos IndexedDB
   */
  initIDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(IDB_NAME, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
    });
  }

  /**
   * Carga datos desde IndexedDB
   */
  loadFromIDB() {
    return new Promise((resolve) => {
      const tx = this.db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const request = store.get(STORAGE_KEY);

      request.onsuccess = () => {
        const data = request.result;
        if (data) {
          resolve(this.migrateData(data));
        } else {
          resolve(null);
        }
      };

      request.onerror = () => resolve(null);
    });
  }

  /**
   * Carga datos desde localStorage (fallback)
   */
  loadFromLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return this.migrateData(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing localStorage:', e);
        return null;
      }
    }
    return null;
  }

  /**
   * Migración de datos entre versiones
   */
  migrateData(data) {
    if (!data.ejercicio_stats) {
      data.ejercicio_stats = { fuerza: 0, resistencia: 0, agilidad: 0, vitalidad: 0 };
    }
    if (!data.ejercicio_historial) data.ejercicio_historial = [];
    if (!('ejercicio_hoy' in data)) data.ejercicio_hoy = null;
    if (!('ejercicio_rest_timer' in data)) data.ejercicio_rest_timer = null;
    if (!data.recordatorios) data.recordatorios = {};
    if (!data.quests_completadas) data.quests_completadas = {};
    return data;
  }

  /**
   * Estado inicial por defecto
   */
  getDefaultData() {
    return {
      version: VERSION,
      nivel: 'E',
      xp: 0,
      racha: 0,
      ultima_fecha_completada: null,
      quests_completadas: {},
      historial: [],
      mercado_checklist: {},
      recordatorios: {},
      ajustes: {
        notificaciones_habilitadas: true,
        batch_cooking_hora: '20:00',
        ajuste_fase1: true,
        alerta_timer_sonido: true,
        alerta_timer_overlay: true,
        alerta_timer_notif: true,
        alerta_timer_voz: true
      },
      ultimo_backup: null,
      ejercicio_stats: {
        fuerza: 0,
        resistencia: 0,
        agilidad: 0,
        vitalidad: 0,
      },
      ejercicio_hoy: null,
      ejercicio_historial: [],
      ejercicio_rest_timer: null,
    };
  }

  /**
   * Guarda datos en IndexedDB + localStorage
   */
  async save() {
    if (this.useIDB && this.idbReady) {
      try {
        await this.saveToIDB();
      } catch (e) {
        console.warn('Error saving to IDB:', e);
        this.saveToLocalStorage();
      }
    } else {
      this.saveToLocalStorage();
    }
  }

  /**
   * Guarda en IndexedDB
   */
  saveToIDB() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const request = store.put(this.data, STORAGE_KEY);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Guarda en localStorage
   */
  saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE NEGOCIO (sin cambios)
  // ════════════════════════════════════════════════════════════════════════

  registrarQuest(fecha, tipo, recetaData) {
    const dateStr = fechaStr(fecha);
    if (!this.data.quests_completadas[dateStr]) {
      this.data.quests_completadas[dateStr] = {};
    }
    this.data.quests_completadas[dateStr][tipo] = true;

    const xpPorTipo = { batido: 20, almuerzo: 40, cena: 40, batch_cooking: 80 };
    this.data.xp += xpPorTipo[tipo] || 0;

    const dia = this.data.quests_completadas[dateStr];
    if (dia.batido && dia.almuerzo && dia.cena) {
      this.data.xp += 25;
    }

    const nivelAnterior = this.data.nivel;
    this.data.nivel = this.calcularNivel(this.data.xp);

    this.data.historial.push({
      fecha: dateStr,
      quest_id: tipo === 'batch_cooking' ? 'batch' : tipo,
      tipo,
      kcal: recetaData?.kcal || 0,
      p: recetaData?.proteina_g || 0,
      g: recetaData?.grasa_g || 0,
      c: recetaData?.carbo_g || 0
    });

    this.data.ultima_fecha_completada = dateStr;
    this.save();

    return {
      levelUp: this.data.nivel > nivelAnterior,
      nuevoNivel: this.data.nivel
    };
  }

  calcularNivel(xp) {
    let nivel = 1;
    let xpRequerido = 100;
    let xpAcumulado = 0;

    while (xpAcumulado + xpRequerido <= xp) {
      xpAcumulado += xpRequerido;
      nivel++;
      xpRequerido = 100 + (nivel - 2) * 50;
    }

    return nivel;
  }

  calcularRango(xpTotal) {
    const rangos = [
      { rango: 'E', xpMin: 0,      xpMax: 2000 },
      { rango: 'D', xpMin: 2000,   xpMax: 5000 },
      { rango: 'C', xpMin: 5000,   xpMax: 12000 },
      { rango: 'B', xpMin: 12000,  xpMax: 25000 },
      { rango: 'A', xpMin: 25000,  xpMax: 60000 },
      { rango: 'S', xpMin: 60000,  xpMax: Infinity }
    ];

    for (const r of rangos) {
      if (xpTotal >= r.xpMin && xpTotal < r.xpMax) {
        return {
          rango: r.rango,
          xpEnRango: xpTotal - r.xpMin,
          xpParaSiguiente: r.xpMax - r.xpMin,
          xpMin: r.xpMin,
          xpMax: r.xpMax
        };
      }
    }

    return {
      rango: 'S',
      xpEnRango: xpTotal - 60000,
      xpParaSiguiente: 0,
      xpMin: 60000,
      xpMax: Infinity
    };
  }

  obtenerProgresoNivel(xp) {
    const rangoData = this.calcularRango(xp);
    return {
      nivel: rangoData.rango,
      rango: rangoData.rango,
      xp,
      xpNivelActual: rangoData.xpMin,
      xpSiguiente: rangoData.xpMax,
      xpEnRango: rangoData.xpEnRango,
      xpParaSiguiente: rangoData.xpParaSiguiente,
      progreso: rangoData.xpEnRango
    };
  }

  sincronizarDia() {
    const hoy = fechaStr();
    const ultimaFecha = this.data.ultima_fecha_completada;

    if (ultimaFecha !== hoy && !this.data.quests_completadas[hoy]) {
      this.data.quests_completadas[hoy] = {};
    }

    if (this.data.ejercicio_hoy && this.data.ejercicio_hoy.date !== hoy) {
      this.data.ejercicio_hoy = null;
    }

    this.save();
  }

  calcularRacha(fecha = new Date()) {
    let racha = 0;
    let date = ahoraBogota(fecha);
    date.setHours(0, 0, 0, 0);

    while (true) {
      const dateStr = formatearYMD(date);
      const dia = this.data.quests_completadas[dateStr];

      if (!dia || !dia.batido || !dia.almuerzo || !dia.cena) break;

      racha++;
      date.setDate(date.getDate() - 1);
    }

    this.data.racha = racha;
    return racha;
  }

  actualizarAjuste(key, value) {
    this.data.ajustes[key] = value;
    this.save();
  }

  obtenerAjuste(key) {
    return this.data.ajustes[key];
  }

  alternarItemMercado(itemId) {
    if (!this.data.mercado_checklist[itemId]) {
      this.data.mercado_checklist[itemId] = false;
    }
    this.data.mercado_checklist[itemId] = !this.data.mercado_checklist[itemId];
    this.save();
  }

  obtenerChecklist() {
    return this.data.mercado_checklist;
  }

  exportar() {
    const now = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `recetario-backup-${now}.json`;
    const json = JSON.stringify(this.data, null, 2);
    return { filename, json };
  }

  importar(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.version !== VERSION) {
        throw new Error(`Version mismatch: expected ${VERSION}, got ${parsed.version}`);
      }
      this.data = parsed;
      this.save();
      this.data.ultimo_backup = new Date().toISOString();
      this.save();
      return true;
    } catch (e) {
      console.error('Error importing backup:', e);
      return false;
    }
  }

  registrarSerie(statKey, statGain, xpGain) {
    this.data.ejercicio_stats[statKey] = (this.data.ejercicio_stats[statKey] || 0) + statGain;
    this.data.xp += xpGain;

    const nivelAnterior = this.data.nivel;
    this.data.nivel = this.calcularNivel(this.data.xp);
    this.save();

    return {
      levelUp: this.data.nivel > nivelAnterior,
      nuevoNivel: this.data.nivel,
    };
  }

  registrarBonusEjercicio(statKey, statGain, xpGain, fecha) {
    this.data.ejercicio_stats[statKey] = (this.data.ejercicio_stats[statKey] || 0) + statGain;
    this.data.xp += xpGain;
    this.data.ultima_fecha_completada = fecha;

    const nivelAnterior = this.data.nivel;
    this.data.nivel = this.calcularNivel(this.data.xp);
    this.save();

    return {
      levelUp: this.data.nivel > nivelAnterior,
      nuevoNivel: this.data.nivel,
    };
  }

  guardarEjercicioHoy(estadoHoy) {
    this.data.ejercicio_hoy = estadoHoy;
    this.save();
  }

  upsertHistorialEjercicio(entrada) {
    const idx = this.data.ejercicio_historial.findIndex(h => h.date === entrada.date);
    if (idx >= 0) {
      this.data.ejercicio_historial[idx] = entrada;
    } else {
      this.data.ejercicio_historial.push(entrada);
    }
    this.save();
  }

  async solicitarPersistencia() {
    if (navigator.storage && navigator.storage.persist) {
      try {
        const persistent = await navigator.storage.persist();
        console.log('Persistencia concedida:', persistent);
        return persistent;
      } catch (e) {
        console.warn('No se pudo solicitar persistencia:', e);
      }
    }
    return false;
  }
}

export const store = new Store();
