/**
 * Bootstrap y router de la app.
 */

import { store } from './core/store.js';
import { timer } from './core/timer.js';
import { RECETAS, pasosNormalizados } from './data/recetas.js';
import { HORARIO, RUTINA_SEMANAL, getDiaDelMes, getRutinaDia } from './data/horario.js';
import { MERCADO } from './data/mercado.js';
import { BATCH_COOKING, getBatchCooking, getBatchCookingList } from './data/batch.js';
import { getFaseActiva } from './data/fases.js';
import { macrosDeReceta, totalesDelDia, progresoVsMeta, autoVerificar } from './core/macros.js';

// Verificación de datos
console.log('🔍 Verificando aritmética de macros...');
autoVerificar();

// Estado global
let screenActual = 'dashboard';
let recetaActual = null;
let pasoActual = 0;
let recetaGuiado = null;

// Inicializar app
async function init() {
  // Registrar service worker
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      console.log('✓ SW registrado:', reg);
    } catch (e) {
      console.warn('SW error:', e);
    }
  }

  // Solicitar persistencia de localStorage (mitigar Safari ITP)
  await store.solicitarPersistencia();

  // Detectar si está en modo standalone / instalado
  const esStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  console.log('Standalone:', esStandalone);

  // Onboarding
  if (!esStandalone && !localStorage.getItem('onboarding-completado')) {
    mostrarOnboarding();
  } else {
    localStorage.setItem('onboarding-completado', 'true');
    irAPanel('dashboard');
  }

  // Solicitar permiso de notificaciones
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Event listeners
  setupEventListeners();
}

function mostrarOnboarding() {
  const esIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const instrucciones = document.getElementById('install-instructions');

  if (esIOS) {
    instrucciones.innerHTML = `
      <strong>📱 Instalación en Safari (iPad/iPhone):</strong><br>
      1. Toca el botón "Compartir" (↗️ en la barra de Safari)<br>
      2. Desplázate y toca "Añadir a pantalla de inicio"<br>
      3. Dale un nombre (ej. "Recetario")<br>
      4. Toca "Añadir"<br>
      5. Abre la app desde el icono de la pantalla de inicio<br><br>
      <em>Las notificaciones push solo funcionan en la app instalada, no en Safari normal.</em>
    `;
  } else {
    instrucciones.innerHTML = `
      <strong>🌐 Instalación:</strong><br>
      En la mayoría de navegadores, toca el botón de "Instalar" que aparece en la barra de direcciones,
      o abre el menú y busca "Instalar app".
    `;
  }

  document.getElementById('btn-onboarding-continue').addEventListener('click', () => {
    localStorage.setItem('onboarding-completado', 'true');
    irAPanel('dashboard');
  });
}

function setupEventListeners() {
  // Nav buttons
  document.querySelectorAll('#nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      irAPanel(screen);
    });
  });

  // Paso anterior/siguiente en modo guiado
  document.getElementById('btn-paso-anterior').addEventListener('click', () => {
    if (pasoActual > 0) {
      pasoActual--;
      renderizarPaso();
    }
  });

  document.getElementById('btn-paso-siguiente').addEventListener('click', () => {
    if (pasoActual < pasosNormalizados(recetaGuiado).length - 1) {
      pasoActual++;
      renderizarPaso();
    } else {
      // Completar quest
      completarQuest(recetaGuiado.tipo, recetaGuiado);
      timer.detener();
      irAPanel('dashboard');
    }
  });
}

function irAPanel(screen) {
  // Ocultar todos
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  // Mostrar el solicitado
  const screenEl = document.getElementById(`screen-${screen}`);
  if (screenEl) {
    screenEl.classList.add('active');
    screenActual = screen;

    // Renderizar contenido dinamico
    if (screen === 'dashboard') renderizarDashboard();
    if (screen === 'batch') renderizarBatch();
    if (screen === 'mercado') renderizarMercado();
    if (screen === 'progreso') renderizarProgreso();
    if (screen === 'ajustes') renderizarAjustes();
  }
}

// ============ RENDERIZADO DE PANTALLAS ============

function renderizarDashboard() {
  const hoy = new Date();
  const diaDelMes = getDiaDelMes();
  const rutina = getRutinaDia(diaDelMes);
  const dateStr = hoy.toISOString().split('T')[0];
  const questsDelDia = store.data.quests_completadas[dateStr] || {};

  const progXp = store.obtenerProgresoNivel(store.data.xp);

  // Actualizar stats
  document.getElementById('hunter-nivel').textContent = progXp.nivel;
  document.getElementById('hunter-racha').textContent = store.calcularRacha(hoy);

  const xpDelNivel = progXp.xp - progXp.xpNivelActual;
  const xpParaSiguiente = progXp.xpSiguiente - progXp.xpNivelActual;
  const pctXp = Math.round((xpDelNivel / xpParaSiguiente) * 100);
  document.getElementById('xp-info').textContent = `${xpDelNivel} / ${xpParaSiguiente}`;
  document.getElementById('xp-bar').style.width = pctXp + '%';

  // Quests
  const questsList = document.getElementById('quests-list');
  questsList.innerHTML = '';

  const quests = [
    { id: 'batido', nombre: 'Batido post-entreno', tipo: 'batido', receta: 'batido_post_entreno' },
  ];

  if (diaDelMes !== 'domingo') {
    quests.push({
      id: 'almuerzo',
      nombre: `Almuerzo — ${rutina.almuerzo}`,
      tipo: 'almuerzo',
      receta: rutina.almuerzo
    });
  } else {
    quests.push({
      id: 'almuerzo',
      nombre: 'Almuerzo libre — sin registrar',
      tipo: 'almuerzo',
      receta: null
    });
  }

  if (diaDelMes !== 'domingo') {
    quests.push({
      id: 'cena',
      nombre: `Cena — ${rutina.cena}`,
      tipo: 'cena',
      receta: rutina.cena
    });
  } else {
    quests.push({
      id: 'cena',
      nombre: 'Cena libre — sopa miso ligera',
      tipo: 'cena',
      receta: null
    });
  }

  if (rutina.batch_cooking) {
    quests.push({
      id: 'batch',
      nombre: 'Batch cooking',
      tipo: 'batch_cooking',
      receta: null
    });
  }

  quests.forEach(quest => {
    const completada = questsDelDia[quest.id] === true;
    const recetaData = quest.receta ? RECETAS[quest.receta] : null;
    const kcal = recetaData ? macrosDeReceta(quest.receta, store.obtenerAjuste('ajuste_fase1')).kcal : 0;

    const card = document.createElement('div');
    card.className = `quest-card ${completada ? 'quest-card--completada' : ''}`;
    card.innerHTML = `
      <div class="quest-card__info">
        <div class="quest-title">${quest.nombre}</div>
        ${kcal > 0 ? `<div class="text-secondary" style="font-size: 12px; margin-top: 4px;">${kcal} kcal</div>` : ''}
      </div>
      <div class="quest-card__check ${completada ? 'quest-card__check--checked' : ''}">
        ${completada ? '✓' : ''}
      </div>
    `;

    // Click en el check
    const checkEl = card.querySelector('.quest-card__check');
    checkEl.addEventListener('click', () => {
      if (completada) {
        // Desmarcar
        questsDelDia[quest.id] = false;
      } else {
        // Marcar
        completarQuest(quest.id, recetaData || { tipo: quest.tipo });
      }
      store.save();
      renderizarDashboard();
    });

    // Click en la quest para abrir receta
    if (recetaData) {
      card.addEventListener('click', (e) => {
        if (e.target !== checkEl) {
          mostrarReceta(quest.receta);
        }
      });
      card.style.cursor = 'pointer';
    }

    questsList.appendChild(card);
  });

  // Totales del día
  const totales = totalesDelDia(hoy, store.obtenerAjuste('ajuste_fase1'));
  const totalesEl = document.getElementById('totales-hoy');
  if (totales.verificable) {
    const progreso = progresoVsMeta(totales);
    const metaStr = `
      ${Math.round(totales.kcal)} / ${progreso.meta} kcal<br>
      P: ${Math.round(totales.proteina)}g | G: ${Math.round(totales.grasa)}g | C: ${Math.round(totales.carbo)}g
    `;
    totalesEl.innerHTML = metaStr;
  } else {
    totalesEl.innerHTML = 'Almuerzo libre + cena libre<br><em>No verificable</em>';
  }
}

function mostrarReceta(recetaId) {
  recetaActual = RECETAS[recetaId];
  if (!recetaActual) return;

  const container = document.getElementById('receta-content');
  const ajuste = store.obtenerAjuste('ajuste_fase1');
  const macros = macrosDeReceta(recetaId, ajuste && recetaActual.ajuste_fase1);

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-lg);">
      <div>
        <h2>${recetaActual.nombre}</h2>
        ${recetaActual.rango ? `<span class="badge badge--rango-${recetaActual.rango.toLowerCase()}">${recetaActual.rango}</span>` : ''}
        <div class="text-secondary" style="margin-top: var(--space-sm); font-size: 12px;">${recetaActual.cuando}</div>
      </div>
      <button id="btn-modo-guiado" style="width: 150px;">Modo guiado</button>
    </div>

    <div class="panel">
      <strong>Macros totales:</strong><br>
      ${Math.round(macros.kcal)} kcal | P: ${Math.round(macros.proteina)}g | G: ${Math.round(macros.grasa)}g | C: ${Math.round(macros.carbo)}g
    </div>
  `;

  if (recetaActual.regla_especial) {
    html += `<div class="panel panel--highlight" style="margin-top: var(--space-md);"><strong>⚠ Nota:</strong> ${recetaActual.regla_especial}</div>`;
  }

  if (ajuste && recetaActual.ajuste_fase1) {
    html += `
      <div class="panel" style="margin-top: var(--space-md); background: var(--clr-darker); border-left: 4px solid var(--clr-ambar);">
        <strong>Ajuste Fase 1 (activo):</strong><br>
        ${recetaActual.ajuste_fase1.descripcion}<br>
        +${recetaActual.ajuste_fase1.delta_kcal} kcal
      </div>
    `;
  }

  html += `
    <div style="margin-top: var(--space-lg);">
      <h3>Ingredientes</h3>
      <table class="receta-table">
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Crudo</th>
            <th style="text-align: right;">kcal</th>
            <th style="text-align: right;">P</th>
            <th style="text-align: right;">G</th>
            <th style="text-align: right;">C</th>
          </tr>
        </thead>
        <tbody>
  `;

  recetaActual.ingredientes.forEach(ing => {
    html += `
      <tr>
        <td>${ing.nombre}</td>
        <td>${ing.crudo}</td>
        <td style="text-align: right;">${ing.kcal}</td>
        <td style="text-align: right;">${ing.p}</td>
        <td style="text-align: right;">${ing.g}</td>
        <td style="text-align: right;">${ing.c}</td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;

  container.innerHTML = html;

  document.getElementById('btn-modo-guiado').addEventListener('click', () => {
    recetaGuiado = recetaActual;
    pasoActual = 0;
    irAPanel('guiado');
    renderizarPaso();
  });
}

function renderizarPaso() {
  if (!recetaGuiado) return;

  const pasos = pasosNormalizados(recetaGuiado);
  const paso = pasos[pasoActual];

  document.getElementById('guiado-counter').textContent = `Paso ${paso.n} de ${pasos.length}`;
  document.getElementById('guiado-texto').textContent = paso.texto;

  const timerEl = document.getElementById('guiado-timer');
  if (paso.timer_segundos) {
    timerEl.classList.remove('hidden');
    timerEl.textContent = paso.timer_segundos;

    // Auto-iniciar timer
    timer.iniciar(paso.timer_segundos, paso.texto, {
      onTick: (segundos) => {
        timerEl.textContent = segundos;
      }
    });
  } else {
    timerEl.classList.add('hidden');
    timer.detener();
  }
}

function renderizarBatch() {
  const container = document.getElementById('batch-content');
  const diaDelMes = getDiaDelMes();
  const tareas = [];

  if (diaDelMes === 'domingo') {
    tareas.push(getBatchCooking('domingo_noche'));
  }
  if (diaDelMes === 'miercoles') {
    tareas.push(getBatchCooking('miercoles_noche'));
  }
  if (tareas.length === 0) {
    tareas.push(...getBatchCookingList());
  }

  let html = '';
  tareas.forEach(batch => {
    html += `
      <div class="panel">
        <h3>${batch.titulo}</h3>
        ${batch.tiempo_min ? `<p class="text-secondary">⏱ ${batch.tiempo_min} min</p>` : ''}
        ${batch.nota ? `<p class="text-secondary"><em>${batch.nota}</em></p>` : ''}
        <div style="margin-top: var(--space-md);">
          ${batch.tareas.map((tarea, i) => `
            <div style="padding: var(--space-sm); background: var(--clr-darker); margin-bottom: var(--space-sm); border-radius: 2px;">
              <strong>${i + 1}.</strong> ${tarea.texto || tarea}
              ${tarea.timer_segundos ? `<div class="text-secondary" style="font-size: 12px; margin-top: 4px;">⏱ ${tarea.timer_segundos}s</div>` : ''}
            </div>
          `).join('')}
        </div>
        ${batch.almacenamiento ? `
          <div style="margin-top: var(--space-lg); padding: var(--space-md); background: var(--clr-darker); border-left: 4px solid var(--clr-cian);">
            <strong>Almacenamiento:</strong>
            <ul style="margin: var(--space-sm) 0; padding-left: 20px;">
              ${batch.almacenamiento.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderizarMercado() {
  const container = document.getElementById('mercado-content');
  const checklist = store.obtenerChecklist();

  let html = `<h3>Semanal (perecederos)</h3>`;
  MERCADO.semanal_perecederos.forEach(item => {
    const marcado = checklist[`semanal_${item.id}`] || false;
    html += `
      <div class="mercado-item">
        <input type="checkbox" ${marcado ? 'checked' : ''} data-item="semanal_${item.id}" class="mercado-item__check">
        <div class="mercado-item__info">
          <strong>${item.producto}</strong> — ${item.cantidad}<br>
          <span class="mercado-item__precio">~$${item.precio_ck?.toLocaleString()}</span>
          ${item.nota ? `<div class="text-secondary" style="font-size: 12px; margin-top: 4px;">${item.nota}</div>` : ''}
        </div>
      </div>
    `;
  });

  html += `<h3 style="margin-top: var(--space-lg);">Mensual (no perecederos)</h3>`;
  MERCADO.mensual_no_perecederos.forEach(item => {
    const marcado = checklist[`mensual_${item.id}`] || false;
    html += `
      <div class="mercado-item">
        <input type="checkbox" ${marcado ? 'checked' : ''} data-item="mensual_${item.id}" class="mercado-item__check">
        <div class="mercado-item__info">
          <strong>${item.producto}</strong> — ${item.cantidad}<br>
          <span class="mercado-item__precio">~$${item.precio_ck?.toLocaleString()}</span>
          ${item.nota ? `<div class="text-secondary" style="font-size: 12px; margin-top: 4px;">${item.nota}</div>` : ''}
        </div>
      </div>
    `;
  });

  html += `
    <div class="panel" style="margin-top: var(--space-lg); border-left: 4px solid var(--clr-cian);">
      <strong>Presupuesto mensual:</strong><br>
      Escenario A (Éxito): ~$${MERCADO.presupuesto_info.total_escenario_a.toLocaleString()}<br>
      Escenario B (D1/Ara): ~$${MERCADO.presupuesto_info.total_escenario_b.toLocaleString()}<br>
      Tope máximo: $${MERCADO.presupuesto_info.tope_maximo.toLocaleString()}<br>
      <p class="text-secondary" style="font-size: 12px; margin-top: var(--space-sm);">${MERCADO.presupuesto_info.recomendacion}</p>
    </div>
  `;

  container.innerHTML = html;

  // Event listeners
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      store.alternarItemMercado(cb.dataset.item);
    });
  });
}

function renderizarProgreso() {
  const container = document.getElementById('progreso-content');
  const progXp = store.obtenerProgresoNivel(store.data.xp);
  const fase = getFaseActiva();

  let html = `
    <div class="panel">
      <div style="text-align: center; margin-bottom: var(--space-lg);">
        <div style="font-size: 64px; font-weight: bold; color: var(--clr-cian);">Lv.${progXp.nivel}</div>
        <div style="color: var(--clr-text-secondary); margin-top: var(--space-md);">
          ${store.data.xp} XP
        </div>
      </div>
    </div>

    <div class="panel">
      <strong>Fase activa:</strong><br>
      ${fase.nombre} (Semanas ${fase.semanas})<br>
      Meta: ${fase.kcal_meta} kcal/día
      ${fase.macros_meta ? `<br>P: ${fase.macros_meta.proteina_g}g | G: ${fase.macros_meta.grasa_g}g | C: ${fase.macros_meta.carbo_g}g` : '<br><em>Pendiente de definir</em>'}
    </div>

    <div class="panel" style="margin-top: var(--space-lg);">
      <strong>Historial reciente:</strong>
      <div style="font-size: 12px; margin-top: var(--space-md);">
        ${store.data.historial.slice(-5).reverse().map(h => `
          <div style="padding: 4px 0; border-bottom: 1px solid var(--clr-border);">
            <strong>${h.fecha}</strong> — ${h.tipo} (${h.kcal} kcal)
          </div>
        `).join('') || '<em>Sin historial</em>'}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function renderizarAjustes() {
  const container = document.getElementById('ajustes-content');
  const ajustes = store.data.ajustes;

  const html = `
    <div class="panel">
      <label>
        <input type="checkbox" ${ajustes.notificaciones_habilitadas ? 'checked' : ''} data-ajuste="notificaciones_habilitadas">
        Notificaciones habilitadas
      </label>

      <label style="margin-top: var(--space-md);">
        Hora del batch cooking:
        <input type="time" id="batch-hora" value="${ajustes.batch_cooking_hora}" style="width: 150px; margin-left: var(--space-sm);">
      </label>

      <label style="margin-top: var(--space-md);">
        <input type="checkbox" ${ajustes.ajuste_fase1 ? 'checked' : ''} data-ajuste="ajuste_fase1">
        Ajuste Fase 1 (+20g arroz en almuerzos)
      </label>

      <fieldset style="margin-top: var(--space-lg); padding: var(--space-md); border: 1px solid var(--clr-border); border-radius: 2px;">
        <legend>Alertas de timer</legend>
        <label><input type="checkbox" ${ajustes.alerta_timer_sonido ? 'checked' : ''} data-ajuste="alerta_timer_sonido"> Sonido</label>
        <label><input type="checkbox" ${ajustes.alerta_timer_overlay ? 'checked' : ''} data-ajuste="alerta_timer_overlay"> Overlay visual</label>
        <label><input type="checkbox" ${ajustes.alerta_timer_notif ? 'checked' : ''} data-ajuste="alerta_timer_notif"> Notificación</label>
        <label><input type="checkbox" ${ajustes.alerta_timer_voz ? 'checked' : ''} data-ajuste="alerta_timer_voz"> Voz</label>
      </fieldset>

      <div style="margin-top: var(--space-lg);">
        <button id="btn-exportar" style="width: 100%;">Exportar datos (.json)</button>
        <input type="file" id="import-file" accept=".json" style="display: none;">
        <button id="btn-importar" style="width: 100%; margin-top: var(--space-md);">Importar backup</button>
      </div>

      <div style="margin-top: var(--space-lg); font-size: 12px; color: var(--clr-text-secondary);">
        Versión 1.0 | Último backup: ${ajustes.ultimo_backup ? new Date(ajustes.ultimo_backup).toLocaleString() : 'nunca'}
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Event listeners para ajustes
  container.querySelectorAll('[data-ajuste]').forEach(el => {
    el.addEventListener('change', () => {
      const key = el.dataset.ajuste;
      const value = el.type === 'checkbox' ? el.checked : el.value;
      store.actualizarAjuste(key, value);
    });
  });

  // Batch cooking hora
  document.getElementById('batch-hora').addEventListener('change', (e) => {
    store.actualizarAjuste('batch_cooking_hora', e.target.value);
  });

  // Export
  document.getElementById('btn-exportar').addEventListener('click', () => {
    const { filename, json } = store.exportar();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Import
  document.getElementById('btn-importar').addEventListener('click', () => {
    document.getElementById('import-file').click();
  });

  document.getElementById('import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const success = store.importar(ev.target.result);
        if (success) {
          alert('✓ Backup importado exitosamente');
          renderizarAjustes(); // Refresh
        } else {
          alert('✗ Error al importar backup');
        }
      };
      reader.readAsText(file);
    }
  });
}

function completarQuest(tipoQuest, recetaData) {
  const hoy = new Date();
  const dateStr = hoy.toISOString().split('T')[0];

  if (!store.data.quests_completadas[dateStr]) {
    store.data.quests_completadas[dateStr] = {};
  }

  store.data.quests_completadas[dateStr][tipoQuest] = true;
  const resultado = store.registrarQuest(hoy, tipoQuest, recetaData);

  if (resultado.levelUp) {
    mostrarLevelUp(resultado.nuevoNivel);
  }
}

function mostrarLevelUp(nuevoNivel) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(5, 8, 16, 0.95);
    display: flex; align-items: center; justify-content: center;
    z-index: 99999;
    animation: fadeIn 0.3s ease-out;
  `;

  overlay.innerHTML = `
    <div style="text-align: center; animation: slideUp 2.5s ease-out;">
      <div style="font-size: 24px; color: var(--clr-morado); margin-bottom: 20px;">━━━━━━━━━━</div>
      <div style="font-size: 64px; font-weight: bold; color: var(--clr-cian); letter-spacing: 3px; text-transform: uppercase; animation: glow 1s ease-in-out;">
        LEVEL UP
      </div>
      <div style="font-size: 48px; font-weight: bold; color: var(--clr-ambar); margin-top: 30px;">
        Lv.${nuevoNivel}
      </div>
      <div style="font-size: 14px; color: var(--clr-text-secondary); margin-top: 20px;">
        ✦ Hunter en ascenso ✦
      </div>
      <div style="font-size: 24px; color: var(--clr-morado); margin-top: 30px;">━━━━━━━━━━</div>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
  }, 2500);
}

// Iniciar
init();
