/**
 * Timer con sincronizacion de timestamp absoluto y alertas multiples.
 */

import { store } from './store.js';

export class Timer {
  constructor() {
    this.timerActivo = null; // { finEnMs, paso_texto, callbacks }
    this.resumeInterval = null;
    this.wakeLock = null;
  }

  iniciar(duracionSegundos, pasoTexto, callbacks = {}) {
    const ahora = Date.now();
    const finEnMs = ahora + duracionSegundos * 1000;

    this.timerActivo = {
      finEnMs,
      pasoTexto,
      callbacks: callbacks
    };

    // Iniciar loop de verificacion
    this.loop();

    // Evitar que la pantalla se duerma
    this.solicitarWakeLock();

    // Detectar cuando vuelve de segundo plano
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }

  loop() {
    if (!this.timerActivo) return;

    const ahora = Date.now();
    const durante = Math.max(0, this.timerActivo.finEnMs - ahora);

    if (durante <= 0) {
      // Timer termino
      this.alertar();
      this.timerActivo = null;
      this.liberarWakeLock();
      return;
    }

    // Actualizar UI cada 100ms
    if (this.timerActivo.callbacks.onTick) {
      this.timerActivo.callbacks.onTick(Math.ceil(durante / 1000));
    }

    setTimeout(() => this.loop(), 100);
  }

  handleVisibilityChange() {
    if (document.hidden) return;

    // Volvo del segundo plano: recalcular tiempo restante
    if (this.timerActivo) {
      const ahora = Date.now();
      const durante = Math.max(0, this.timerActivo.finEnMs - ahora);

      if (durante <= 0) {
        this.alertar();
        this.timerActivo = null;
        this.liberarWakeLock();
      } else {
        // Continuar loop
        this.loop();
      }
    }
  }

  alertar() {
    const ajustes = store.data.ajustes;

    // 1. Sonido
    if (ajustes.alerta_timer_sonido) {
      this.reproducirSonido();
    }

    // 2. Overlay a pantalla completa
    if (ajustes.alerta_timer_overlay) {
      this.mostrarOverlay();
    }

    // 3. Notificacion
    if (ajustes.alerta_timer_notif) {
      this.mostrarNotificacion();
    }

    // 4. Voz
    if (ajustes.alerta_timer_voz) {
      this.hablar();
    }
  }

  reproducirSonido() {
    try {
      // Acorde ascendente con Web Audio API
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const tiempo = audioCtx.currentTime;
      const duracion = 0.5;

      // 3 notas: Do (262 Hz), Mi (330 Hz), Sol (392 Hz)
      const notas = [262, 330, 392];

      notas.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const start = tiempo + i * 0.1;
        const end = start + duracion;

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.01, end);

        osc.start(start);
        osc.stop(end);
      });
    } catch (e) {
      console.warn('Web Audio no disponible:', e);
    }
  }

  mostrarOverlay() {
    let overlay = document.getElementById('timer-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'timer-overlay';
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(5, 8, 16, 0.9);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 9999; animation: pulse-overlay 0.5s ease-in-out infinite;
      `;
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div style="color: #4da6ff; font-size: 48px; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 3px;">
        ¡TIEMPO!
      </div>
      <div style="color: #8b5cf6; font-size: 24px; margin-top: 20px; text-align: center;">
        ${this.timerActivo?.pasoTexto || 'Paso completado'}
      </div>
    `;

    overlay.style.display = 'flex';

    setTimeout(() => {
      overlay.style.display = 'none';
    }, 3000);
  }

  mostrarNotificacion() {
    if (Notification.permission === 'granted' && navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'show-notification',
        title: 'Tiempo completado',
        body: this.timerActivo?.pasoTexto || 'Paso completado'
      });
    }
  }

  hablar() {
    try {
      const utterance = new SpeechSynthesisUtterance('¡Tiempo!');
      utterance.lang = 'es';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis no disponible:', e);
    }
  }

  async solicitarWakeLock() {
    try {
      if (navigator.wakeLock) {
        this.wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (e) {
      console.warn('Wake Lock no disponible:', e);
    }
  }

  liberarWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
  }

  detener() {
    this.timerActivo = null;
    this.liberarWakeLock();
    const overlay = document.getElementById('timer-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  obtenerTiempoRestante() {
    if (!this.timerActivo) return 0;
    return Math.max(0, this.timerActivo.finEnMs - Date.now());
  }
}

export const timer = new Timer();
