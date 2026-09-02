/**
 * Overlay de receta detallada con ingredientes, pasos y cronómetro.
 */

import { RECETAS } from '../data/recetas.js';

let recetaActualOverlay = null;
let cronoActivo = false;
let cronoIntervalo = null;
let cronoTiempoRestante = 0;

export function inicializarRecetaOverlay() {
  try {
    // Botón para cerrar overlay de receta
    const btnCerrar = document.getElementById('btn-cerrar-receta');
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarOverlayReceta);

    const overlay = document.getElementById('overlay-receta');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target.id === 'overlay-receta') cerrarOverlayReceta();
      });
    }

    // Foto clickeable
    const foto = document.getElementById('receta-foto');
    if (foto) foto.addEventListener('click', abrirFotoGrande);

    // Cronómetro
    inicializarCronometro();
  } catch (e) {
    console.error('Error inicializando overlay:', e);
  }
}

// ============ OVERLAY DE RECETA ============

export function abrirRecetaOverlay(recetaId, onModoGuiado = null) {
  const receta = RECETAS[recetaId];
  if (!receta) return;

  recetaActualOverlay = receta;
  const overlay = document.getElementById('overlay-receta');
  overlay.style.display = 'block';

  // Botón Modo Guiado
  const btnGuiado = document.getElementById('btn-modo-guiado');
  if (btnGuiado && onModoGuiado) {
    btnGuiado.onclick = () => {
      cerrarOverlayReceta();
      onModoGuiado(recetaId);
    };
  }

  // Foto
  document.getElementById('receta-foto').src = receta.foto_url;
  document.getElementById('receta-foto').alt = receta.nombre;

  // Título
  document.getElementById('receta-titulo').textContent = receta.nombre;

  // Datos básicos
  document.getElementById('receta-kcal').textContent = Math.round(receta.kcal);
  document.getElementById('receta-tiempo').textContent = `${receta.tiempo_min} min`;
  document.getElementById('receta-rango').textContent = receta.rango || '—';

  // Regla especial
  const reglaEl = document.getElementById('receta-regla');
  if (receta.regla_especial) {
    reglaEl.style.display = 'block';
    document.getElementById('regla-texto').textContent = receta.regla_especial;
  } else {
    reglaEl.style.display = 'none';
  }

  // Ingredientes
  const ingredientesContainer = document.getElementById('receta-ingredientes');
  ingredientesContainer.innerHTML = '';
  receta.ingredientes.forEach((ing, idx) => {
    const item = document.createElement('div');
    item.className = 'ej-check-item';
    item.innerHTML = `
      <div class="ej-check-box"></div>
      <div class="ej-check-label" style="flex:1;">
        <strong>${ing.nombre}</strong>
        <div style="font-size:12px;color:var(--clr-text-secondary);margin-top:2px;">${ing.crudo}</div>
      </div>
    `;
    item.addEventListener('click', () => item.classList.toggle('checked'));
    ingredientesContainer.appendChild(item);
  });

  // Pasos
  const pasosContainer = document.getElementById('receta-pasos');
  pasosContainer.innerHTML = '';
  receta.pasos.forEach((paso, idx) => {
    const pasosNormalizados = typeof paso === 'string'
      ? { n: idx + 1, texto: paso, timer_segundos: null }
      : { n: paso.texto ? idx + 1 : paso.paso, texto: paso.texto || paso, timer_segundos: paso.timer_segundos ?? null };

    const item = document.createElement('div');
    item.className = 'ej-check-item';
    item.style.flexDirection = 'column';
    item.style.alignItems = 'flex-start';
    item.innerHTML = `
      <div style="display:flex;width:100%;gap:12px;align-items:flex-start;">
        <div class="ej-check-box" style="flex-shrink:0;margin-top:2px;"></div>
        <div class="ej-check-label" style="flex:1;">
          <div style="display:flex;gap:8px;align-items:baseline;">
            <strong>Paso ${pasosNormalizados.n}</strong>
            ${pasosNormalizados.timer_segundos ? `<span style="font-size:11px;color:var(--clr-ambar);">⏱ ${pasosNormalizados.timer_segundos}s</span>` : ''}
          </div>
          <div style="margin-top:6px;font-size:13px;line-height:1.5;color:#fff;">${pasosNormalizados.texto}</div>
        </div>
      </div>
    `;
    item.addEventListener('click', () => {
      item.querySelector('.ej-check-box').parentElement.parentElement.classList.toggle('checked');
    });
    pasosContainer.appendChild(item);
  });

  // Mostrar botón de cronómetro
  document.getElementById('btn-activar-cronometro').addEventListener('click', abrirCronometro);
}

function cerrarOverlayReceta() {
  document.getElementById('overlay-receta').style.display = 'none';
  detenerCronometro();
  document.getElementById('cronometro-modal').style.display = 'none';
  document.getElementById('cronometro-overlay').style.display = 'none';
}

function abrirFotoGrande() {
  if (!recetaActualOverlay) return;
  // Aquí se podría abrir un modal con la foto más grande, pero por ahora
  // solo se abre en el navegador
  window.open(recetaActualOverlay.foto_url, '_blank');
}

// ============ CRONÓMETRO ============

function inicializarCronometro() {
  try {
    const btnIniciar = document.getElementById('btn-crono-iniciar');
    const btnPausar = document.getElementById('btn-crono-pausar');
    const btnReanudar = document.getElementById('btn-crono-reanudar');
    const btnReiniciar = document.getElementById('btn-crono-reiniciar');
    const btnCerrar = document.getElementById('btn-crono-cerrar');
    const inputMinutos = document.getElementById('crono-minutos');
    const inputSegundos = document.getElementById('crono-segundos');

    if (!btnIniciar || !inputMinutos || !inputSegundos) return; // Elementos no existen aún

    btnIniciar.addEventListener('click', () => iniciarCronometro(inputMinutos, inputSegundos));
    if (btnPausar) btnPausar.addEventListener('click', pausarCronometro);
    if (btnReanudar) btnReanudar.addEventListener('click', reanudarCronometro);
    if (btnReiniciar) btnReiniciar.addEventListener('click', () => reiniciarCronometro(inputMinutos, inputSegundos));
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarCronometro);

    // Actualizar display cuando cambien inputs
    inputMinutos.addEventListener('change', () => actualizarDisplay());
    inputSegundos.addEventListener('change', () => actualizarDisplay());
  } catch (e) {
    console.error('Error inicializando cronómetro:', e);
  }
}

function abrirCronometro() {
  document.getElementById('cronometro-overlay').style.display = 'block';
  document.getElementById('cronometro-modal').style.display = 'block';
}

function cerrarCronometro() {
  document.getElementById('cronometro-overlay').style.display = 'none';
  document.getElementById('cronometro-modal').style.display = 'none';
  detenerCronometro();
}

function iniciarCronometro(inputMin, inputSeg) {
  if (cronoActivo) return;

  const minutos = parseInt(inputMin.value) || 0;
  const segundos = parseInt(inputSeg.value) || 0;
  cronoTiempoRestante = minutos * 60 + segundos;

  if (cronoTiempoRestante <= 0) {
    alert('Por favor ingresa un tiempo válido');
    return;
  }

  cronoActivo = true;
  actualizarBotonesCrono();

  cronoIntervalo = setInterval(() => {
    cronoTiempoRestante--;
    actualizarDisplay();

    if (cronoTiempoRestante <= 0) {
      detenerCronometro();
      reproducirSonidoLevelUp();
    }
  }, 1000);
}

function pausarCronometro() {
  if (!cronoActivo) return;
  cronoActivo = false;
  clearInterval(cronoIntervalo);
  actualizarBotonesCrono();
}

function reanudarCronometro() {
  if (cronoActivo || cronoTiempoRestante <= 0) return;
  cronoActivo = true;
  actualizarBotonesCrono();

  cronoIntervalo = setInterval(() => {
    cronoTiempoRestante--;
    actualizarDisplay();

    if (cronoTiempoRestante <= 0) {
      detenerCronometro();
      reproducirSonidoLevelUp();
    }
  }, 1000);
}

function reiniciarCronometro(inputMin, inputSeg) {
  detenerCronometro();
  cronoTiempoRestante = 0;
  const minutos = parseInt(inputMin.value) || 0;
  const segundos = parseInt(inputSeg.value) || 0;
  cronoTiempoRestante = minutos * 60 + segundos;
  actualizarDisplay();
  actualizarBotonesCrono();
}

function detenerCronometro() {
  cronoActivo = false;
  clearInterval(cronoIntervalo);
  actualizarBotonesCrono();
}

function actualizarDisplay() {
  const min = Math.floor(cronoTiempoRestante / 60);
  const seg = cronoTiempoRestante % 60;
  const display = `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  document.getElementById('crono-display').textContent = display;
}

function actualizarBotonesCrono() {
  const btnIniciar = document.getElementById('btn-crono-iniciar');
  const btnPausar = document.getElementById('btn-crono-pausar');
  const btnReanudar = document.getElementById('btn-crono-reanudar');

  if (cronoActivo) {
    btnIniciar.style.display = 'none';
    btnPausar.style.display = 'block';
    btnReanudar.style.display = 'none';
  } else if (cronoTiempoRestante > 0) {
    btnIniciar.style.display = 'none';
    btnPausar.style.display = 'none';
    btnReanudar.style.display = 'block';
  } else {
    btnIniciar.style.display = 'block';
    btnPausar.style.display = 'none';
    btnReanudar.style.display = 'none';
  }
}

// Sonido "Level Up" del anime Solo Leveling
function reproducirSonidoLevelUp() {
  // Crear una nota simple con Web Audio API (Nivel Up simplificado)
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;

  // Sonido de notificación (beep alto)
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  osc1.connect(gain1);
  gain1.connect(audioContext.destination);
  osc1.frequency.value = 800;
  gain1.gain.setValueAtTime(0.3, now);
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
  osc1.start(now);
  osc1.stop(now + 0.3);

  // Segundo beep
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  osc2.connect(gain2);
  gain2.connect(audioContext.destination);
  osc2.frequency.value = 1200;
  gain2.gain.setValueAtTime(0.3, now + 0.2);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
  osc2.start(now + 0.2);
  osc2.stop(now + 0.5);

  // Mostrar notificación
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('⏱ ¡Tiempo terminado!', {
      body: 'Tu cronómetro ha llegado a cero.',
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect fill="%23050810"/><text x="50%" y="50%" font-size="80" fill="%234da6ff" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-weight="bold">◆</text></svg>'
    });
  }
}
