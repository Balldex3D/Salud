/**
 * Almacenamiento local en localStorage con versionado de esquema.
 * Soporte para exportar/importar backups JSON.
 */

const VERSION = 1;
const STORAGE_KEY = 'recetario_v' + VERSION;

export class Store {
  constructor() {
    this.data = this.load();
  }

  load() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migrar: garantizar que campos de ejercicio existan en datos previos
        if (!parsed.ejercicio_stats) {
          parsed.ejercicio_stats = { fuerza: 0, resistencia: 0, agilidad: 0, vitalidad: 0 };
        }
        if (!parsed.ejercicio_historial) parsed.ejercicio_historial = [];
        if (!('ejercicio_hoy' in parsed)) parsed.ejercicio_hoy = null;
        if (!('ejercicio_rest_timer' in parsed)) parsed.ejercicio_rest_timer = null;
        return parsed;
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }

    // Estado inicial
    return {
      version: VERSION,
      nivel: 1,
      xp: 0,
      racha: 0,
      ultima_fecha_completada: null,
      quests_completadas: {}, // { 'YYYY-MM-DD': { batido: true, almuerzo: true, cena: true, batch?: true } }
      historial: [], // { fecha, quest_id, tipo, kcal, p, g, c }
      mercado_checklist: {}, // { 'semanal_0': true, 'mensual_3': false, ... }
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

      // ── Ejercicio ──────────────────────────────────────────────
      ejercicio_stats: {
        fuerza:      0,
        resistencia: 0,
        agilidad:    0,
        vitalidad:   0,
      },
      // Progreso del día de ejercicio actual
      ejercicio_hoy: null, // { date, questId, checks: {}, sets: {exId: [reps]}, complete }
      ejercicio_historial: [], // { date, questId, questName, sets, complete }
      ejercicio_rest_timer: null, // { endAt, seconds, label }
    };
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  // Gamificación
  registrarQuest(fecha, tipo, recetaData) {
    const dateStr = fecha.toISOString().split('T')[0];
    if (!this.data.quests_completadas[dateStr]) {
      this.data.quests_completadas[dateStr] = {};
    }
    this.data.quests_completadas[dateStr][tipo] = true;

    // Sumar XP
    const xpPorTipo = { batido: 20, almuerzo: 40, cena: 40, batch_cooking: 80 };
    this.data.xp += xpPorTipo[tipo] || 0;

    // Chequear día completo y bonus
    const dia = this.data.quests_completadas[dateStr];
    if (dia.batido && dia.almuerzo && dia.cena) {
      this.data.xp += 25; // Bono día completo
    }

    // Chequear level up
    const nivelAnterior = this.data.nivel;
    this.data.nivel = this.calcularNivel(this.data.xp);

    // Historial
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
    let xpRequerido = 100; // Lv.1->2
    let xpAcumulado = 0;

    while (xpAcumulado + xpRequerido <= xp) {
      xpAcumulado += xpRequerido;
      nivel++;
      xpRequerido = 100 + (nivel - 2) * 50; // Lv.2->3 = 150, Lv.3->4 = 200, etc.
    }

    return nivel;
  }

  obtenerXPDelNivel(nivel) {
    let total = 0;
    for (let n = 1; n < nivel; n++) {
      const xpReq = n === 1 ? 100 : 100 + (n - 2) * 50;
      total += xpReq;
    }
    return total;
  }

  obtenerProgresoNivel(xp) {
    const nivel = this.data.nivel;
    const xpNivelActual = this.obtenerXPDelNivel(nivel);
    const xpSiguiente = this.obtenerXPDelNivel(nivel + 1);
    return {
      nivel,
      xp,
      xpNivelActual,
      xpSiguiente,
      progreso: xp - xpNivelActual
    };
  }

  calcularRacha(fecha = new Date()) {
    // Racha: dias consecutivos donde se completaron todas las quests obligatorias
    let racha = 0;
    let date = new Date(fecha);
    date.setHours(0, 0, 0, 0);

    while (true) {
      const dateStr = date.toISOString().split('T')[0];
      const dia = this.data.quests_completadas[dateStr];

      if (!dia || !dia.batido || !dia.almuerzo || !dia.cena) break;

      racha++;
      date.setDate(date.getDate() - 1);
    }

    this.data.racha = racha;
    return racha;
  }

  // Ajustes
  actualizarAjuste(key, value) {
    this.data.ajustes[key] = value;
    this.save();
  }

  obtenerAjuste(key) {
    return this.data.ajustes[key];
  }

  // Mercado
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

  // Backup
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

  // ── Gamificación: Ejercicio ────────────────────────────────────

  /**
   * Registra una serie completada de ejercicio.
   * Suma XP global + incrementa stat de ejercicio.
   * @param {string} statKey - 'fuerza' | 'resistencia' | 'agilidad' | 'vitalidad'
   * @param {number} statGain - cuántos puntos sube el stat
   * @param {number} xpGain - cuántos XP globales suma
   * @returns {{ levelUp: boolean, nuevoNivel: number }}
   */
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

  /**
   * Registra la finalización del bonus de quest de ejercicio.
   * @param {string} statKey
   * @param {number} statGain
   * @param {number} xpGain
   * @param {string} fecha - 'YYYY-MM-DD'
   * @returns {{ levelUp: boolean, nuevoNivel: number }}
   */
  registrarBonusEjercicio(statKey, statGain, xpGain, fecha) {
    this.data.ejercicio_stats[statKey] = (this.data.ejercicio_stats[statKey] || 0) + statGain;
    this.data.xp += xpGain;

    // Racha de ejercicio: si no hay racha activa o la última fecha no es consecutiva,
    // se actualiza correctamente con calcularRacha de cocina.
    // Por ahora solo actualizamos la fecha de última misión completada.
    this.data.ultima_fecha_completada = fecha;

    const nivelAnterior = this.data.nivel;
    this.data.nivel = this.calcularNivel(this.data.xp);
    this.save();

    return {
      levelUp: this.data.nivel > nivelAnterior,
      nuevoNivel: this.data.nivel,
    };
  }

  /**
   * Guarda el estado actual del día de ejercicio.
   */
  guardarEjercicioHoy(estadoHoy) {
    this.data.ejercicio_hoy = estadoHoy;
    this.save();
  }

  /**
   * Agrega o actualiza una entrada en el historial de ejercicio.
   */
  upsertHistorialEjercicio(entrada) {
    const idx = this.data.ejercicio_historial.findIndex(h => h.date === entrada.date);
    if (idx >= 0) {
      this.data.ejercicio_historial[idx] = entrada;
    } else {
      this.data.ejercicio_historial.push(entrada);
    }
    this.save();
  }

  // ── Persistencia (Safari ITP mitigation) ──────────────────────

  // Persistencia (Safari ITP mitigation)
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
