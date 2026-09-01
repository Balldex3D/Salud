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
import { renderEjercicio } from './screens/ejercicio.js';

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
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      console.log('✓ SW registrado:', reg);
    } catch (e) {
      console.warn('SW error:', e);
    }
  }

  await store.solicitarPersistencia();

  const esStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  console.log('Standalone:', esStandalone);

  if (!esStandalone && !localStorage.getItem('onboarding-completado')) {
    mostrarOnboarding();
  } else {
    localStorage.setItem('onboarding-completado', 'true');
    irAPanel('dashboard');
  }

  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }

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

  // Ejercicio: Skip descanso y Level Up
  const ejSkip = document.getElementById('ej-rest-skip');
  if (ejSkip) ejSkip.addEventListener('click', () => {
    store.data.ejercicio_rest_timer = null;
    store.save();
    document.getElementById('ej-rest-overlay').classList.remove('show');
  });

  const ejLevelUp = document.getElementById('ej-levelup');
  if (ejLevelUp) ejLevelUp.addEventListener('click', () => ejLevelUp.classList.remove('show'));

  // Salir del modo guiado sin completar
  document.getElementById('btn-guiado-salir').addEventListener('click', () => {
    timer.detener();
    irAPanel('dashboard');
  });

  // Botones del modo guiado
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
      // Último paso: completar quest
      completarQuest(recetaGuiado.tipo, recetaGuiado);
      timer.detener();
      irAPanel('dashboard');
    }
  });
}

function irAPanel(screen) {
  // Ocultar todos
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  // Resaltar botón activo en nav
  const navScreens = ['dashboard','ejercicio','batch','mercado','progreso','ajustes'];
  document.querySelectorAll('#nav button').forEach(btn => {
    const isActive = btn.dataset.screen === screen;
    btn.style.color = isActive ? '#fff' : '';
    btn.style.borderColor = isActive ? '#3ec5ff' : '';
    btn.style.background = isActive
      ? 'linear-gradient(180deg,rgba(123,47,247,.35),rgba(62,197,255,.15))'
      : '';
  });

  // Mostrar la pantalla solicitada
  const screenEl = document.getElementById(`screen-${screen}`);
  if (screenEl) {
    screenEl.classList.add('active');
    screenActual = screen;

    if (screen === 'dashboard') renderizarDashboard();
    if (screen === 'ejercicio') renderEjercicio();
    if (screen === 'batch') renderizarBatch();
    if (screen === 'mercado') renderizarMercado();
    if (screen === 'progreso') renderizarProgreso();
    if (screen === 'ajustes') renderizarAjustes();
  }
}

// ============ DASHBOARD ============

function renderizarDashboard() {
  const hoy = new Date();
  const diaDelMes = getDiaDelMes();
  const rutina = getRutinaDia(diaDelMes);
  const dateStr = hoy.toISOString().split('T')[0];
  const questsDelDia = store.data.quests_completadas[dateStr] || {};

  const progXp = store.obtenerProgresoNivel(store.data.xp);

  document.getElementById('hunter-nivel').textContent = progXp.nivel;
  document.getElementById('hunter-racha').textContent = store.calcularRacha(hoy);

  const xpDelNivel = progXp.xp - progXp.xpNivelActual;
  const xpParaSiguiente = progXp.xpSiguiente - progXp.xpNivelActual;
  const pctXp = Math.round((xpDelNivel / xpParaSiguiente) * 100);
  document.getElementById('xp-info').textContent = `${xpDelNivel} / ${xpParaSiguiente}`;
  document.getElementById('xp-bar').style.width = pctXp + '%';

  const questsList = document.getElementById('quests-list');
  questsList.innerHTML = '';

  const quests = [
    { id: 'batido', nombre: 'Batido post-entreno', tipo: 'batido', receta: 'batido_post_entreno' },
  ];

  if (diaDelMes !== 'domingo') {
    quests.push({ id: 'almuerzo', nombre: `Almuerzo — ${rutina.almuerzo}`, tipo: 'almuerzo', receta: rutina.almuerzo });
  } else {
    quests.push({ id: 'almuerzo', nombre: 'Almuerzo libre — sin registrar', tipo: 'almuerzo', receta: null });
  }

  if (diaDelMes !== 'domingo') {
    quests.push({ id: 'cena', nombre: `Cena — ${rutina.cena}`, tipo: 'cena', receta: rutina.cena });
  } else {
    quests.push({ id: 'cena', nombre: 'Cena libre — sopa miso ligera', tipo: 'cena', receta: null });
  }

  if (rutina.batch_cooking) {
    quests.push({ id: 'batch', nombre: 'Batch cooking', tipo: 'batch_cooking', receta: null });
  }

  quests.forEach(quest => {
    const completada = questsDelDia[quest.id] === true;
    const recetaData = quest.receta ? RECETAS[quest.receta] : null;
    const kcal = recetaData ? macrosDeReceta(quest.receta, store.obtenerAjuste('ajuste_fase1')).kcal : 0;

    const card = document.createElement('div');
    card.className = `quest-card ${completada ? 'quest-card--completada' : ''}`;
    card.style.cssText = 'flex-direction:column; gap:10px; align-items:stretch;';

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <div class="quest-card__info" style="flex:1;">
          <div class="quest-title" style="font-size:15px;">${quest.nombre}</div>
          ${kcal > 0 ? `<div class="text-secondary" style="font-size:12px;margin-top:4px;">${kcal} kcal</div>` : ''}
        </div>
        <div class="quest-card__check ${completada ? 'quest-card__check--checked' : ''}" data-role="check" style="flex-shrink:0;">
          ${completada ? '✓' : ''}
        </div>
      </div>
      ${recetaData ? `
        <button data-role="cocinar"
          style="width:100%;background:linear-gradient(90deg,rgba(123,47,247,.45),rgba(62,197,255,.2));
                 border-color:rgba(62,197,255,.55);font-size:12px;min-height:40px;
                 letter-spacing:.2em;padding:8px 12px;">
          ${completada ? '↩ VER RECETA DE NUEVO' : '▶ COCINAR PASO A PASO'}
        </button>
      ` : ''}
    `;

    // Marcar/desmarcar completada
    const checkEl = card.querySelector('[data-role="check"]');
    checkEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (completada) {
        questsDelDia[quest.id] = false;
      } else {
        completarQuest(quest.id, recetaData || { tipo: quest.tipo });
      }
      store.save();
      renderizarDashboard();
    });

    // Botón "COCINAR PASO A PASO" — va directo al modo guiado
    const cocinarBtn = card.querySelector('[data-role="cocinar"]');
    if (cocinarBtn) {
      cocinarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        iniciarGuiado(quest.receta);
      });
    }

    questsList.appendChild(card);
  });

  // Totales del día
  const totales = totalesDelDia(hoy, store.obtenerAjuste('ajuste_fase1'));
  const totalesEl = document.getElementById('totales-hoy');
  if (totales.verificable) {
    const progreso = progresoVsMeta(totales);
    totalesEl.innerHTML = `
      ${Math.round(totales.kcal)} / ${progreso.meta} kcal<br>
      P: ${Math.round(totales.proteina)}g | G: ${Math.round(totales.grasa)}g | C: ${Math.round(totales.carbo)}g
    `;
  } else {
    totalesEl.innerHTML = 'Almuerzo libre + cena libre<br><em>No verificable</em>';
  }
}

// ============ RECETA / GUIADO ============

/**
 * Va directamente al modo guiado (paso a paso) sin pasar por pantalla de detalle.
 */
function iniciarGuiado(recetaId) {
  recetaGuiado = RECETAS[recetaId];
  if (!recetaGuiado) return;
  recetaActual = recetaGuiado;
  pasoActual = 0;
  irAPanel('guiado');
  renderizarPaso();
}

/**
 * Muestra la pantalla de detalle de receta (ingredientes + macros).
 */
function mostrarReceta(recetaId) {
  recetaActual = RECETAS[recetaId];
  if (!recetaActual) return;

  // ¡Primero cambiar a la pantalla de receta!
  irAPanel('receta');

  const container = document.getElementById('receta-content');
  const ajuste = store.obtenerAjuste('ajuste_fase1');
  const macros = macrosDeReceta(recetaId, ajuste && recetaActual.ajuste_fase1);

  let html = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:var(--space-lg);">
      <button id="btn-volver-receta" style="flex-shrink:0;min-width:80px;font-size:12px;padding:8px;">← Volver</button>
      <div style="flex:1;">
        <h2 style="margin:0;font-size:18px;">${recetaActual.nombre}</h2>
        ${recetaActual.rango ? `<span class="badge badge--rango-${recetaActual.rango.toLowerCase()}">${recetaActual.rango}</span>` : ''}
      </div>
    </div>

    <button id="btn-modo-guiado" style="width:100%;min-height:52px;font-size:15px;letter-spacing:.2em;
      background:linear-gradient(90deg,rgba(123,47,247,.6),rgba(62,197,255,.3));
      border-color:rgba(62,197,255,.8);margin-bottom:var(--space-md);">
      ▶ COMENZAR PASO A PASO
    </button>

    <div class="panel">
      <strong>Macros:</strong>&nbsp;
      ${Math.round(macros.kcal)} kcal | P: ${Math.round(macros.proteina)}g | G: ${Math.round(macros.grasa)}g | C: ${Math.round(macros.carbo)}g
    </div>
  `;

  if (recetaActual.regla_especial) {
    html += `<div class="panel panel--highlight"><strong>⚠ Nota:</strong> ${recetaActual.regla_especial}</div>`;
  }

  html += `
    <div style="margin-top:var(--space-lg);">
      <h3>Ingredientes</h3>
      <table class="receta-table">
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Cantidad</th>
            <th style="text-align:right;">kcal</th>
          </tr>
        </thead>
        <tbody>
  `;

  recetaActual.ingredientes.forEach(ing => {
    html += `
      <tr>
        <td>${ing.nombre}</td>
        <td>${ing.crudo}</td>
        <td style="text-align:right;">${ing.kcal}</td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;

  document.getElementById('btn-volver-receta').addEventListener('click', () => irAPanel('dashboard'));
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
  const esUltimo = pasoActual === pasos.length - 1;

  document.getElementById('guiado-counter').textContent = `Paso ${paso.n} de ${pasos.length}`;
  document.getElementById('guiado-texto').textContent = paso.texto;

  // Actualizar texto del botón siguiente en el último paso
  const btnSig = document.getElementById('btn-paso-siguiente');
  btnSig.textContent = esUltimo ? '✓ Completar quest' : 'Siguiente →';
  btnSig.style.background = esUltimo
    ? 'linear-gradient(180deg,rgba(65,240,166,.5),rgba(65,240,166,.2))'
    : '';
  btnSig.style.borderColor = esUltimo ? '#41f0a6' : '';

  const timerEl = document.getElementById('guiado-timer');
  if (paso.timer_segundos) {
    timerEl.classList.remove('hidden');
    timerEl.textContent = paso.timer_segundos;

    timer.iniciar(paso.timer_segundos, paso.texto, {
      onTick: (segundos) => { timerEl.textContent = segundos; }
    });
  } else {
    timerEl.classList.add('hidden');
    timer.detener();
  }
}

// ============ BATCH ============

function renderizarBatch() {
  const container = document.getElementById('batch-content');
  const diaDelMes = getDiaDelMes();
  const tareas = [];

  if (diaDelMes === 'domingo') tareas.push(getBatchCooking('domingo_noche'));
  if (diaDelMes === 'miercoles') tareas.push(getBatchCooking('miercoles_noche'));
  if (tareas.length === 0) tareas.push(...getBatchCookingList());

  let html = '';
  tareas.forEach(batch => {
    html += `
      <div class="panel">
        <h3>${batch.titulo}</h3>
        ${batch.tiempo_min ? `<p class="text-secondary">⏱ ${batch.tiempo_min} min</p>` : ''}
        ${batch.nota ? `<p class="text-secondary"><em>${batch.nota}</em></p>` : ''}
    `;

    // Mostrar ORDEN SUGERIDO si existe
    if (batch.orden_sugerido) {
      html += `
        <div style="margin-top:var(--space-md);padding:var(--space-md);background:linear-gradient(180deg,rgba(65,240,166,.08),rgba(65,240,166,.02));border-left:4px solid var(--clr-verde);border-radius:2px;">
          <strong style="color:var(--clr-verde);text-shadow:0 0 8px rgba(65,240,166,.4);">📋 ORDEN SUGERIDO</strong>
          <pre style="font-size:12px;color:var(--clr-text-secondary);line-height:1.5;white-space:pre-wrap;word-wrap:break-word;margin:var(--space-sm) 0 0;font-family:var(--font-system);">${batch.orden_sugerido}</pre>
        </div>
      `;
    }

    // Pasos numerados con mejor presentación
    html += `
      <div style="margin-top:var(--space-lg);">
        <strong style="color:var(--clr-cian);text-shadow:0 0 8px rgba(62,197,255,.5);">PASO A PASO</strong>
        <div style="margin-top:var(--space-md);">
          ${batch.tareas.map((tarea, i) => {
            // Divide el texto por saltos de línea y crea sub-puntos
            const lineas = (tarea.texto || tarea).split('\n').filter(l => l.trim());
            const titulo = lineas[0]; // Primera línea es el título
            const detalles = lineas.slice(1); // Resto son detalles
            return `
              <div style="padding:var(--space-md);background:var(--clr-darker);margin-bottom:var(--space-md);border-radius:2px;border-left:3px solid var(--clr-blue);">
                <strong style="font-size:14px;color:#fff;">${i + 1}. ${titulo}</strong>
                ${detalles.length > 0 ? `
                  <div style="margin-top:var(--space-sm);font-size:13px;line-height:1.6;color:var(--clr-text-primary);">
                    ${detalles.map(linea => `<div style="margin:4px 0;">${linea}</div>`).join('')}
                  </div>
                ` : ''}
                ${tarea.timer_segundos ? `<div class="text-secondary" style="font-size:12px;margin-top:var(--space-sm);display:flex;align-items:center;gap:4px;">⏱ Tiempo: ${Math.floor(tarea.timer_segundos / 60)}:${(tarea.timer_segundos % 60).toString().padStart(2, '0')} min</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Almacenamiento: lista visual sin checkboxes (sin persistencia nueva)
    if (batch.almacenamiento) {
      html += `
        <div style="margin-top:var(--space-lg);padding:var(--space-md);background:var(--clr-darker);border-left:4px solid var(--clr-cian);border-radius:2px;">
          <strong style="color:var(--clr-cian);text-shadow:0 0 8px rgba(62,197,255,.5);">📦 Almacenamiento</strong>
          <ul style="margin:var(--space-sm) 0;padding-left:24px;font-size:13px;line-height:1.7;color:var(--clr-text-primary);">
            ${batch.almacenamiento.map(item => `<li style="margin:4px 0;">${item}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    html += `</div>`;
  });

  container.innerHTML = html;
}

// ============ MERCADO ============

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
          ${item.nota ? `<div class="text-secondary" style="font-size:12px;margin-top:4px;">${item.nota}</div>` : ''}
        </div>
      </div>
    `;
  });

  html += `<h3 style="margin-top:var(--space-lg);">Mensual (no perecederos)</h3>`;
  MERCADO.mensual_no_perecederos.forEach(item => {
    const marcado = checklist[`mensual_${item.id}`] || false;
    html += `
      <div class="mercado-item">
        <input type="checkbox" ${marcado ? 'checked' : ''} data-item="mensual_${item.id}" class="mercado-item__check">
        <div class="mercado-item__info">
          <strong>${item.producto}</strong> — ${item.cantidad}<br>
          <span class="mercado-item__precio">~$${item.precio_ck?.toLocaleString()}</span>
          ${item.nota ? `<div class="text-secondary" style="font-size:12px;margin-top:4px;">${item.nota}</div>` : ''}
        </div>
      </div>
    `;
  });

  html += `
    <div class="panel" style="margin-top:var(--space-lg);border-left:4px solid var(--clr-cian);">
      <strong>Presupuesto mensual:</strong><br>
      Escenario A (Éxito): ~$${MERCADO.presupuesto_info.total_escenario_a.toLocaleString()}<br>
      Escenario B (D1/Ara): ~$${MERCADO.presupuesto_info.total_escenario_b.toLocaleString()}<br>
      Tope máximo: $${MERCADO.presupuesto_info.tope_maximo.toLocaleString()}<br>
      <p class="text-secondary" style="font-size:12px;margin-top:var(--space-sm);">${MERCADO.presupuesto_info.recomendacion}</p>
    </div>
  `;

  container.innerHTML = html;

  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => { store.alternarItemMercado(cb.dataset.item); });
  });
}

// ============ PROGRESO ============

function renderizarProgreso() {
  const container = document.getElementById('progreso-content');
  const progXp = store.obtenerProgresoNivel(store.data.xp);
  const fase = getFaseActiva();
  const ejercStats = store.data.ejercicio_stats || { fuerza: 0, resistencia: 0, agilidad: 0, vitalidad: 0 };
  const racha = store.calcularRacha(new Date());

  const xpDelNivel = progXp.xp - progXp.xpNivelActual;
  const xpParaSiguiente = progXp.xpSiguiente - progXp.xpNivelActual;
  const pctXp = Math.round((xpDelNivel / xpParaSiguiente) * 100);

  container.innerHTML = `
    <!-- HEADER: CAZADOR + NIVEL -->
    <div class="sys-panel-wrap" style="margin-bottom:var(--space-lg);">
      <div class="panel" style="text-align:center;padding:var(--space-lg);background:linear-gradient(180deg,rgba(123,47,247,.15),rgba(62,197,255,.08));">
        <div style="font-family:var(--font-system);font-size:11px;letter-spacing:.3em;color:var(--clr-verde);text-transform:uppercase;text-shadow:0 0 8px rgba(65,240,166,.5);margin-bottom:var(--space-md);">
          ✦ HUNTER STATUS ✦
        </div>
        <div style="font-family:var(--font-display);font-size:72px;font-weight:900;letter-spacing:2px;color:var(--clr-cian);text-shadow:0 0 20px rgba(62,197,255,.9),0 0 40px rgba(62,197,255,.5);margin:0;">
          Lv.${progXp.nivel}
        </div>
        <div style="font-family:var(--font-system);font-size:13px;letter-spacing:.15em;color:var(--clr-text-secondary);margin-top:var(--space-sm);text-transform:uppercase;">
          CAZADOR EN ASCENSO
        </div>
      </div>
    </div>

    <!-- XP BAR -->
    <div class="panel" style="padding:var(--space-md);border-left:4px solid var(--clr-violet);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm);">
        <strong style="color:var(--clr-violet);text-shadow:0 0 8px rgba(123,47,247,.5);">EXPERIENCIA</strong>
        <span style="font-size:12px;color:var(--clr-text-secondary);">${xpDelNivel} / ${xpParaSiguiente}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width:${pctXp}%;"></div>
      </div>
      <div style="font-size:11px;color:var(--clr-text-secondary);margin-top:4px;text-align:right;">
        ${pctXp}% para siguiente nivel
      </div>
    </div>

    <!-- STATS: RACHA + FASE -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-top:var(--space-lg);">
      <div class="panel" style="text-align:center;padding:var(--space-md);border-left:4px solid var(--clr-ambar);">
        <div style="font-size:12px;color:var(--clr-ambar);text-transform:uppercase;letter-spacing:.1em;text-shadow:0 0 8px rgba(255,207,92,.5);">Racha</div>
        <div style="font-size:32px;font-weight:bold;color:var(--clr-ambar);margin-top:4px;">${racha}</div>
        <div style="font-size:10px;color:var(--clr-text-secondary);margin-top:4px;">días seguidos</div>
      </div>

      <div class="panel" style="text-align:center;padding:var(--space-md);border-left:4px solid var(--clr-verde);">
        <div style="font-size:12px;color:var(--clr-verde);text-transform:uppercase;letter-spacing:.1em;text-shadow:0 0 8px rgba(65,240,166,.5);">Fase</div>
        <div style="font-size:14px;font-weight:bold;color:var(--clr-text-primary);margin-top:4px;">${fase.nombre}</div>
        <div style="font-size:10px;color:var(--clr-text-secondary);margin-top:4px;">S${fase.semanas}</div>
      </div>
    </div>

    <!-- EXERCISE STATS (si hay) -->
    ${ejercStats.fuerza + ejercStats.resistencia + ejercStats.agilidad + ejercStats.vitalidad > 0 ? `
      <div class="panel" style="margin-top:var(--space-lg);padding:var(--space-md);border-left:4px solid var(--clr-blue);background:linear-gradient(180deg,rgba(62,197,255,.08),rgba(62,197,255,.02));">
        <div style="font-family:var(--font-system);font-size:11px;letter-spacing:.2em;color:var(--clr-blue);text-transform:uppercase;text-shadow:0 0 8px rgba(62,197,255,.5);margin-bottom:var(--space-md);">
          ⚔ ATRIBUTOS
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-sm);">
          <div style="padding:var(--space-sm);background:var(--clr-darker);border-radius:2px;text-align:center;">
            <div style="font-size:11px;color:var(--clr-text-secondary);text-transform:uppercase;">Fuerza</div>
            <div style="font-size:18px;font-weight:bold;color:var(--clr-rojo);margin-top:2px;">${ejercStats.fuerza}</div>
          </div>
          <div style="padding:var(--space-sm);background:var(--clr-darker);border-radius:2px;text-align:center;">
            <div style="font-size:11px;color:var(--clr-text-secondary);text-transform:uppercase;">Resistencia</div>
            <div style="font-size:18px;font-weight:bold;color:var(--clr-verde);margin-top:2px;">${ejercStats.resistencia}</div>
          </div>
          <div style="padding:var(--space-sm);background:var(--clr-darker);border-radius:2px;text-align:center;">
            <div style="font-size:11px;color:var(--clr-text-secondary);text-transform:uppercase;">Agilidad</div>
            <div style="font-size:18px;font-weight:bold;color:var(--clr-violet);margin-top:2px;">${ejercStats.agilidad}</div>
          </div>
          <div style="padding:var(--space-sm);background:var(--clr-darker);border-radius:2px;text-align:center;">
            <div style="font-size:11px;color:var(--clr-text-secondary);text-transform:uppercase;">Vitalidad</div>
            <div style="font-size:18px;font-weight:bold;color:var(--clr-ambar);margin-top:2px;">${ejercStats.vitalidad}</div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- META DE NUTRICIÓN -->
    <div class="panel" style="margin-top:var(--space-lg);padding:var(--space-md);border-left:4px solid var(--clr-cian);">
      <div style="font-family:var(--font-system);font-size:11px;letter-spacing:.2em;color:var(--clr-cian);text-transform:uppercase;text-shadow:0 0 8px rgba(62,197,255,.5);margin-bottom:var(--space-md);">
        🎯 OBJETIVOS
      </div>
      <div style="font-size:13px;line-height:1.8;color:var(--clr-text-primary);">
        <strong>${fase.kcal_meta}</strong> kcal/día<br>
        ${fase.macros_meta ? `
          <span style="color:var(--clr-text-secondary);font-size:12px;">
            P: <strong style="color:var(--clr-text-primary);">${fase.macros_meta.proteina_g}g</strong> |
            G: <strong style="color:var(--clr-text-primary);">${fase.macros_meta.grasa_g}g</strong> |
            C: <strong style="color:var(--clr-text-primary);">${fase.macros_meta.carbo_g}g</strong>
          </span>
        ` : '<em style="color:var(--clr-text-secondary);">Pendiente de definir</em>'}
      </div>
    </div>

    <!-- HISTORIAL -->
    ${store.data.historial.length > 0 ? `
      <div class="panel" style="margin-top:var(--space-lg);padding:var(--space-md);border-left:4px solid var(--clr-text-secondary);">
        <div style="font-family:var(--font-system);font-size:11px;letter-spacing:.2em;color:var(--clr-text-secondary);text-transform:uppercase;text-shadow:0 0 8px rgba(124,139,176,.5);margin-bottom:var(--space-md);">
          📜 HISTORIAL RECIENTE
        </div>
        <div style="font-size:12px;line-height:1.8;">
          ${store.data.historial.slice(-8).reverse().map(h => `
            <div style="padding:6px 0;border-bottom:1px solid var(--clr-border);display:flex;justify-content:space-between;align-items:center;">
              <span><strong>${h.fecha}</strong> · ${h.tipo}</span>
              <span style="color:var(--clr-ambar);">+${h.kcal} kcal</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- XP TOTAL -->
    <div style="margin-top:var(--space-lg);text-align:center;padding:var(--space-md);background:rgba(123,47,247,.1);border:1px solid rgba(123,47,247,.3);border-radius:2px;">
      <div style="font-size:11px;color:var(--clr-text-secondary);text-transform:uppercase;letter-spacing:.1em;">Total acumulado</div>
      <div style="font-size:24px;font-weight:bold;color:var(--clr-violet);text-shadow:0 0 12px rgba(123,47,247,.6);margin-top:4px;">${store.data.xp} XP</div>
    </div>
  `;
}

// ============ AJUSTES ============

function renderizarAjustes() {
  const container = document.getElementById('ajustes-content');
  const ajustes = store.data.ajustes;

  container.innerHTML = `
    <div class="panel">
      <label>
        <input type="checkbox" ${ajustes.notificaciones_habilitadas ? 'checked' : ''} data-ajuste="notificaciones_habilitadas">
        Notificaciones habilitadas
      </label>

      <label style="margin-top:var(--space-md);">
        Hora del batch cooking:
        <input type="time" id="batch-hora" value="${ajustes.batch_cooking_hora}" style="width:150px;margin-left:var(--space-sm);">
      </label>

      <label style="margin-top:var(--space-md);">
        <input type="checkbox" ${ajustes.ajuste_fase1 ? 'checked' : ''} data-ajuste="ajuste_fase1">
        Ajuste Fase 1 (+20g arroz en almuerzos)
      </label>

      <fieldset style="margin-top:var(--space-lg);padding:var(--space-md);border:1px solid var(--clr-border);border-radius:2px;">
        <legend>Alertas de timer</legend>
        <label><input type="checkbox" ${ajustes.alerta_timer_sonido ? 'checked' : ''} data-ajuste="alerta_timer_sonido"> Sonido</label>
        <label><input type="checkbox" ${ajustes.alerta_timer_overlay ? 'checked' : ''} data-ajuste="alerta_timer_overlay"> Overlay visual</label>
        <label><input type="checkbox" ${ajustes.alerta_timer_notif ? 'checked' : ''} data-ajuste="alerta_timer_notif"> Notificación</label>
        <label><input type="checkbox" ${ajustes.alerta_timer_voz ? 'checked' : ''} data-ajuste="alerta_timer_voz"> Voz</label>
      </fieldset>

      <div style="margin-top:var(--space-lg);">
        <button id="btn-exportar" style="width:100%;">Exportar datos (.json)</button>
        <input type="file" id="import-file" accept=".json" style="display:none;">
        <button id="btn-importar" style="width:100%;margin-top:var(--space-md);">Importar backup</button>
      </div>

      <div style="margin-top:var(--space-lg);font-size:12px;color:var(--clr-text-secondary);">
        Versión 1.0 | Último backup: ${ajustes.ultimo_backup ? new Date(ajustes.ultimo_backup).toLocaleString() : 'nunca'}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-ajuste]').forEach(el => {
    el.addEventListener('change', () => {
      const key = el.dataset.ajuste;
      const value = el.type === 'checkbox' ? el.checked : el.value;
      store.actualizarAjuste(key, value);
    });
  });

  document.getElementById('batch-hora').addEventListener('change', (e) => {
    store.actualizarAjuste('batch_cooking_hora', e.target.value);
  });

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
          renderizarAjustes();
        } else {
          alert('✗ Error al importar backup');
        }
      };
      reader.readAsText(file);
    }
  });
}

// ============ QUESTS / LEVEL UP ============

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
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(5,8,16,0.95);
    display:flex;align-items:center;justify-content:center;
    z-index:99999;
  `;

  overlay.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:24px;color:var(--clr-morado);">━━━━━━━━━━</div>
      <div style="font-size:64px;font-weight:bold;color:var(--clr-cian);letter-spacing:3px;text-transform:uppercase;">
        LEVEL UP
      </div>
      <div style="font-size:48px;font-weight:bold;color:var(--clr-ambar);margin-top:30px;">
        Lv.${nuevoNivel}
      </div>
      <div style="font-size:14px;color:var(--clr-text-secondary);margin-top:20px;">✦ Hunter en ascenso ✦</div>
      <div style="font-size:24px;color:var(--clr-morado);margin-top:30px;">━━━━━━━━━━</div>
    </div>
  `;

  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 2500);
}

// Iniciar
init();
