/**
 * Pantalla de Ejercicio del Cazador.
 * Muestra la quest del día, checklists, series, timer de descanso e historial.
 */

import { store } from '../core/store.js';
import {
  QUESTS_EJERCICIO,
  STAT_LABELS,
  DAY_NAMES,
  MONTH_NAMES,
  questIdParaDia,
  questTotales,
  isQuestCompleta,
} from '../data/ejercicios.js';

// ── Utilidades de fecha en hora Colombia (UTC-5) ──────────────────

const BOGOTA_TZ = 'America/Bogota';
const bogotaFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: BOGOTA_TZ, hour12: false,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
});

function getNow() {
  const parts = {};
  bogotaFmt.formatToParts(new Date()).forEach(p => {
    if (p.type !== 'literal') parts[p.type] = p.value;
  });
  return new Date(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
}

function todayStr() {
  const d = getNow();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function parseDate(s) {
  return new Date(s + 'T12:00:00');
}

function fmtDate(s) {
  const d = parseDate(s);
  return DAY_NAMES[d.getDay()] + ' ' + d.getDate() + ' · ' + MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear();
}

// ── Estado local de la pantalla ───────────────────────────────────

let _tab = 'quest'; // 'quest' | 'historial'
let _restInterval = null;
const CIRC = 2 * Math.PI * 42;

// ── Sonido ────────────────────────────────────────────────────────

let audioCtx = null;
function ensureAudio() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) { /* sin audio */ }
}

function beep() {
  try {
    ensureAudio();
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    [[880, 0], [1174.7, 0.18], [1568, 0.36]].forEach(([f, off]) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + off);
      g.gain.exponentialRampToValueAtTime(0.28, t + off + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + off + 0.28);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t + off); o.stop(t + off + 0.32);
    });
  } catch (e) { /* sin audio */ }
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

// ── Toast del Sistema ─────────────────────────────────────────────

export function toastEjercicio(titulo, cuerpo = '') {
  // Reutilizar el toast del sistema si existe, o crear uno propio
  const wrap = document.getElementById('ej-toasts');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'ej-toast';
  el.innerHTML = `
    <div class="ej-toast-in">
      <div class="ej-toast-head">◆ Sistema ◆</div>
      <div class="ej-toast-body"><strong>${esc(titulo)}</strong>${cuerpo ? '<br>' + cuerpo : ''}</div>
    </div>`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ── Sincronización del día ────────────────────────────────────────

function sincronizarDia() {
  const hoy = todayStr();
  const now = getNow();
  const questId = questIdParaDia(now);

  if (!store.data.ejercicio_hoy || store.data.ejercicio_hoy.date !== hoy) {
    store.data.ejercicio_hoy = { date: hoy, questId, checks: {}, sets: {}, complete: false };
    store.data.ejercicio_rest_timer = null;
    store.save();
  }
}

// ── Escape HTML ───────────────────────────────────────────────────

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// ── Timer de descanso ─────────────────────────────────────────────

function iniciarDescanso(seconds, label) {
  const endAt = Date.now() + seconds * 1000;
  store.data.ejercicio_rest_timer = { endAt, seconds, label };
  store.save();
  correrDescanso(endAt, seconds, label);
}

function correrDescanso(endAt, seconds, label) {
  limpiarDescanso();
  const overlay = document.getElementById('ej-rest-overlay');
  const prog = document.getElementById('ej-rest-prog');
  const timeEl = document.getElementById('ej-rest-time');
  const subEl = document.getElementById('ej-rest-sub');

  if (!overlay || !prog || !timeEl) return;

  if (subEl) subEl.textContent = `${label}: recupere energía antes de la siguiente serie.`;
  prog.setAttribute('stroke-dasharray', CIRC);
  overlay.classList.add('show');

  const tick = () => {
    const remain = Math.max(0, endAt - Date.now());
    const secs = Math.ceil(remain / 1000);
    timeEl.textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
    prog.setAttribute('stroke-dashoffset', CIRC * (1 - remain / (seconds * 1000)));
    if (remain <= 0) {
      detenerDescanso();
      beep();
      toastEjercicio('Descanso terminado', 'Continúe con la siguiente serie, Cazador.');
    }
  };
  tick();
  _restInterval = setInterval(tick, 200);
}

function limpiarDescanso() {
  if (_restInterval) { clearInterval(_restInterval); _restInterval = null; }
  const overlay = document.getElementById('ej-rest-overlay');
  if (overlay) overlay.classList.remove('show');
}

function detenerDescanso() {
  limpiarDescanso();
  store.data.ejercicio_rest_timer = null;
  store.save();
}

function reanudarDescansoSiHay() {
  const rt = store.data.ejercicio_rest_timer;
  if (!rt) return;
  if (rt.endAt - Date.now() <= 0) {
    store.data.ejercicio_rest_timer = null;
    store.save();
    return;
  }
  correrDescanso(rt.endAt, rt.seconds, rt.label);
}

// ── Level Up visual ───────────────────────────────────────────────

function mostrarLevelUp(nivel) {
  const lu = document.getElementById('ej-levelup');
  if (!lu) return;
  document.getElementById('ej-lu-nivel').textContent = 'NIVEL ' + nivel;
  lu.classList.remove('show');
  void lu.offsetWidth;
  lu.classList.add('show');
  beep();
  setTimeout(() => lu.classList.remove('show'), 5000);
}

// ── Lógica principal ──────────────────────────────────────────────

function toggleCheck(key) {
  const hoy = store.data.ejercicio_hoy;
  if (!hoy || hoy.complete) return;
  hoy.checks[key] = !hoy.checks[key];
  const quest = QUESTS_EJERCICIO[hoy.questId];
  let ups = 0;
  if (hoy.checks[key] && quest && isQuestCompleta(quest, hoy)) {
    ups = completarQuestSiAplica();
  }
  store.guardarEjercicioHoy(hoy);
  renderEjercicio();
  if (ups) mostrarLevelUp(store.data.nivel);
}

function completarSerie(exId) {
  const hoy = store.data.ejercicio_hoy;
  if (!hoy || hoy.complete || !hoy.questId) return;
  const quest = QUESTS_EJERCICIO[hoy.questId];
  const ex = quest.exercises.find(e => e.id === exId);
  if (!ex) return;

  const done = hoy.sets[exId] || [];
  if (done.length >= ex.sets) return;

  const input = document.getElementById('ej-reps-' + exId);
  let reps = parseInt(input && input.value, 10);
  if (isNaN(reps) || reps < 0) {
    toastEjercicio('Sistema', 'Ingrese las repeticiones realizadas para registrar la serie.');
    return;
  }

  done.push(reps);
  hoy.sets[exId] = done;

  const { levelUp, nuevoNivel } = store.registrarSerie(ex.stat, ex.gain, ex.xp);

  toastEjercicio(
    `Serie ${done.length} de ${ex.sets} registrada — ${ex.name}`,
    `+${ex.xp} XP · +${ex.gain} ${STAT_LABELS[ex.stat]}`
  );

  // Historial parcial
  store.upsertHistorialEjercicio({
    date: hoy.date,
    questId: hoy.questId,
    questName: quest.name,
    sets: JSON.parse(JSON.stringify(hoy.sets)),
    complete: false,
  });

  let upsBonus = 0;
  if (isQuestCompleta(quest, hoy)) upsBonus = completarQuestSiAplica();

  store.guardarEjercicioHoy(hoy);
  iniciarDescanso(ex.rest, ex.name);
  renderEjercicio();

  if (levelUp || upsBonus) mostrarLevelUp(store.data.nivel);
}

function completarQuestSiAplica() {
  const hoy = store.data.ejercicio_hoy;
  const quest = QUESTS_EJERCICIO[hoy.questId];
  if (!quest || hoy.complete) return 0;

  hoy.complete = true;
  const { levelUp, nuevoNivel } = store.registrarBonusEjercicio(
    quest.bonus.stat, quest.bonus.gain, quest.bonus.xp, hoy.date
  );

  store.upsertHistorialEjercicio({
    date: hoy.date,
    questId: hoy.questId,
    questName: quest.name,
    sets: JSON.parse(JSON.stringify(hoy.sets)),
    complete: true,
  });

  toastEjercicio(
    '¡Ha completado la misión diaria!',
    `+${quest.bonus.xp} XP · +${quest.bonus.gain} ${STAT_LABELS[quest.bonus.stat]} · Racha 🔥`
  );

  return levelUp ? 1 : 0;
}

// ── Render helpers ────────────────────────────────────────────────

function sysPanel(tag, inner) {
  return `
    <div class="sys-panel-wrap" style="margin-bottom:16px">
      <div class="panel">
        ${tag ? `<div class="sys-tag">${tag}</div>` : ''}
        ${inner}
      </div>
    </div>`;
}

function renderStats() {
  const stats = store.data.ejercicio_stats || {};
  const statColors = {
    fuerza:      { name: '#ff6b81', fill: 'linear-gradient(90deg,#a1123a,#ff6b81)', glow: 'rgba(255,107,129,.7)' },
    resistencia: { name: '#ffb35c', fill: 'linear-gradient(90deg,#b25b12,#ffb35c)', glow: 'rgba(255,179,92,.7)' },
    agilidad:    { name: '#41f0a6', fill: 'linear-gradient(90deg,#0e8f5c,#41f0a6)', glow: 'rgba(65,240,166,.7)' },
    vitalidad:   { name: '#3ec5ff', fill: 'linear-gradient(90deg,#1a5fb2,#3ec5ff)', glow: 'rgba(62,197,255,.7)' },
  };

  const rows = Object.keys(STAT_LABELS).map(k => {
    const v = stats[k] || 0;
    const cap = Math.max(25, Math.ceil((v + 1) / 25) * 25);
    const c = statColors[k];
    return `
      <div style="display:grid;grid-template-columns:110px 1fr 40px;gap:12px;align-items:center;margin-bottom:8px">
        <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:14px;letter-spacing:.18em;color:${c.name}">${STAT_LABELS[k]}</div>
        <div style="height:9px;background:#101833;border:1px solid rgba(123,47,247,.3);overflow:hidden;clip-path:polygon(5px 0,100% 0,calc(100% - 5px) 100%,0 100%)">
          <div style="height:100%;width:${Math.min(100, 100 * v / cap)}%;background:${c.fill};box-shadow:0 0 8px ${c.glow};transition:width .6s cubic-bezier(.2,.9,.3,1)"></div>
        </div>
        <div style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:15px;text-align:right;color:#fff">${v}</div>
      </div>`;
  }).join('');

  return sysPanel('Estadísticas del Cazador', rows);
}

function renderChecklist(id, title, items, hoy) {
  const locked = hoy.complete ? ' style="pointer-events:none;opacity:.6"' : '';
  const rows = items.map((it, i) => {
    const key = id + '-' + i;
    const on = hoy.checks[key];
    return `
      <div class="ej-check-item ${on ? 'checked' : ''}" data-ej-check="${key}"${locked}>
        <div class="ej-check-box"></div>
        <div class="ej-check-label">${esc(it)}</div>
      </div>`;
  }).join('');
  return sysPanel(esc(title), rows);
}

function renderEjercicio_principal(quest, hoy) {
  const { total, done } = questTotales(quest, hoy);
  const pct = total ? Math.round(100 * done / total) : 0;

  if (hoy.complete) {
    const xpEarned = quest.exercises.reduce((s, ex) => s + (hoy.sets[ex.id] || []).length * ex.xp, 0) + quest.bonus.xp;
    return sysPanel('Misión completada', `
      <div style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:19px;color:#fff;text-shadow:0 0 14px rgba(123,47,247,.9)">${esc(quest.name)}</div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:13px;color:var(--clr-blue);letter-spacing:.15em;margin-top:3px;text-transform:uppercase">${esc(quest.type)}</div>
      <div style="margin-top:10px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:13px;color:var(--clr-ambar)">◆ XP ganada hoy: +${xpEarned} XP</div>
      <div style="margin-top:12px;padding:10px;text-align:center;font-family:'Orbitron',sans-serif;font-weight:800;font-size:14px;color:var(--clr-verde);border:1px solid rgba(65,240,166,.4);background:rgba(65,240,166,.06);text-shadow:0 0 10px rgba(65,240,166,.8);letter-spacing:.15em;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)">✦ RECOMPENSA RECLAMADA ✦</div>
    `);
  }

  return sysPanel('Misión diaria', `
    <div style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:19px;color:#fff;text-shadow:0 0 14px rgba(123,47,247,.9)">${esc(quest.name)}</div>
    <div style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:13px;color:var(--clr-blue);letter-spacing:.15em;margin-top:3px;text-transform:uppercase">${esc(quest.type)}</div>
    <div style="margin-top:12px">
      <div style="height:7px;background:#101833;border:1px solid rgba(62,197,255,.3);overflow:hidden;clip-path:polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--clr-blue),var(--clr-violet));box-shadow:0 0 8px rgba(62,197,255,.8);transition:width .5s"></div>
      </div>
      <div style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;color:var(--clr-text-secondary);margin-top:4px;letter-spacing:.1em">PROGRESO ${done} / ${total} · ${pct}%</div>
    </div>
    <div style="margin-top:10px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:13px;color:var(--clr-ambar);letter-spacing:.06em">◆ Recompensa final: +${quest.bonus.xp} XP · +${quest.bonus.gain} ${STAT_LABELS[quest.bonus.stat]}</div>
  `);
}

function renderEjercicioCard(ex, hoy) {
  const done = hoy.sets[ex.id] || [];
  const chips = [];
  for (let i = 0; i < ex.sets; i++) {
    if (i < done.length) {
      chips.push(`<div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:12px;letter-spacing:.05em;padding:4px 10px;color:var(--clr-verde);border:1px solid rgba(65,240,166,.4);background:rgba(65,240,166,.07);clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)">S${i + 1} · ${done[i]} reps</div>`);
    } else {
      chips.push(`<div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:12px;letter-spacing:.05em;padding:4px 10px;color:var(--clr-text-secondary);border:1px solid rgba(124,139,176,.3);clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)">S${i + 1} · —</div>`);
    }
  }

  const finished = done.length >= ex.sets;
  const controls = finished
    ? `<div style="margin-top:12px;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:14px;color:var(--clr-verde);letter-spacing:.12em;text-shadow:0 0 8px rgba(65,240,166,.7)">✔ SUB-MISIÓN COMPLETADA</div>`
    : `<div style="display:flex;gap:10px;align-items:center;margin-top:12px;flex-wrap:wrap">
        <span style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:14px;color:var(--clr-blue);letter-spacing:.1em;text-shadow:0 0 8px rgba(62,197,255,.6)">SERIE ${done.length + 1} DE ${ex.sets}</span>
        <input id="ej-reps-${ex.id}" type="number" min="0" inputmode="numeric" style="width:76px;padding:9px 10px;background:#0b1226;border:1px solid rgba(62,197,255,.4);color:#fff;font-family:'Orbitron',sans-serif;font-weight:700;font-size:15px;text-align:center;outline:none;clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)" value="${ex.targetReps != null ? ex.targetReps : ''}" placeholder="reps">
        <button class="ej-btn-serie" data-ej-ex="${ex.id}" style="padding:10px 18px;border:1px solid var(--clr-blue);cursor:pointer;background:linear-gradient(180deg,rgba(123,47,247,.4),rgba(62,197,255,.12));color:#fff;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:14px;letter-spacing:.15em;text-transform:uppercase;clip-path:polygon(9px 0,100% 0,calc(100% - 9px) 100%,0 100%);text-shadow:0 0 8px rgba(62,197,255,.6)">Completar serie</button>
       </div>`;

  return sysPanel(null, `
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">
      <span style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:15px;color:#fff;letter-spacing:.04em">${esc(ex.name)}</span>
      ${ex.target ? `<span style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;color:var(--clr-blue);letter-spacing:.08em">${esc(ex.target)}</span>` : ''}
    </div>
    <div style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;color:var(--clr-text-secondary);margin-top:4px;letter-spacing:.05em">${ex.sets} series · descanso ${ex.rest} seg · +${ex.xp} XP y +${ex.gain} ${STAT_LABELS[ex.stat]} por serie</div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:10px">${chips.join('')}</div>
    ${controls}`);
}

function renderHistorialEjercicio() {
  const entries = [...(store.data.ejercicio_historial || [])].sort((a, b) => b.date.localeCompare(a.date));
  if (!entries.length) {
    return sysPanel('Historial de misiones', `
      <div style="text-align:center;color:var(--clr-text-secondary);font-size:14px;padding:12px 0;line-height:1.6">
        Aún no hay misiones registradas.<br>Complete su primera misión diaria para comenzar el registro.
      </div>`);
  }

  return entries.map(h => {
    const q = QUESTS_EJERCICIO[h.questId];
    let exRows = '';
    if (q && q.exercises.length) {
      exRows = q.exercises.map(ex => {
        const reps = (h.sets && h.sets[ex.id]) || [];
        if (!reps.length) return '';
        return `<div style="display:flex;justify-content:space-between;gap:10px;font-size:13px;padding:5px 0;border-bottom:1px solid rgba(62,197,255,.07)">
          <span style="color:var(--clr-text-primary)">${esc(ex.name)}</span>
          <span style="font-family:'Rajdhani',sans-serif;font-weight:700;color:var(--clr-blue);letter-spacing:.05em;white-space:nowrap">${reps.join(' · ')} reps</span>
        </div>`;
      }).join('');
    }
    if (!exRows) exRows = `<div style="font-size:13px;padding:5px 0;color:var(--clr-text-secondary)">Sin series registradas${h.complete ? ' (recuperación)' : ''}</div>`;

    const badgeColor = h.complete ? 'color:var(--clr-verde);border:1px solid rgba(65,240,166,.4);background:rgba(65,240,166,.07)' : 'color:var(--clr-ambar);border:1px solid rgba(255,207,92,.4);background:rgba(255,207,92,.07)';

    return sysPanel(null, `
      <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:14px;color:var(--clr-blue);letter-spacing:.12em;text-transform:uppercase">${fmtDate(h.date)}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:2px">
        <span style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:13px;color:#fff">${esc(h.questName)}</span>
        <span style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:11px;letter-spacing:.12em;padding:2px 10px;clip-path:polygon(5px 0,100% 0,calc(100% - 5px) 100%,0 100%);${badgeColor}">${h.complete ? 'COMPLETADA' : 'PARCIAL'}</span>
      </div>
      <div style="margin-top:8px">${exRows}</div>`);
  }).join('');
}

// ── Render principal ──────────────────────────────────────────────

export function renderEjercicio() {
  sincronizarDia();

  const container = document.getElementById('ejercicio-content');
  if (!container) return;

  const hoy = store.data.ejercicio_hoy;
  const questId = hoy ? hoy.questId : null;
  const quest = questId ? QUESTS_EJERCICIO[questId] : null;

  // Nivel XP compartido
  const progXp = store.obtenerProgresoNivel(store.data.xp);
  const xpDelNivel = progXp.xp - progXp.xpNivelActual;
  const xpParaSiguiente = progXp.xpSiguiente - progXp.xpNivelActual;
  const pctXp = Math.round((xpDelNivel / xpParaSiguiente) * 100);

  // HUD
  const rangoInfo = rankFor(progXp.nivel);
  const hudHtml = `
    <div class="sys-panel-wrap" style="margin-bottom:16px">
      <div class="panel">
        <div class="sys-tag">Estado del Cazador</div>
        <div style="display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center">
          <div style="width:80px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-family:'Orbitron',sans-serif;font-weight:900;font-size:40px;line-height:1;color:${rangoInfo.color};text-shadow:0 0 16px ${rangoInfo.color},0 0 40px ${rangoInfo.color}88">${rangoInfo.rank}</div>
            <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:10px;letter-spacing:.25em;color:var(--clr-text-secondary);margin-top:2px">RANGO</div>
          </div>
          <div>
            <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;letter-spacing:.3em;color:var(--clr-text-secondary);text-transform:uppercase">${getNow().getDate()} ${MONTH_NAMES[getNow().getMonth()]} · ${DAY_NAMES[getNow().getDay()]}</div>
            <div style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:22px;color:#fff;text-shadow:0 0 14px rgba(123,47,247,.9)">NIVEL <span style="color:var(--clr-blue);text-shadow:0 0 12px rgba(62,197,255,.9)">${progXp.nivel}</span></div>
            <div style="height:12px;margin-top:8px;background:#101833;border:1px solid rgba(62,197,255,.35);overflow:hidden;clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);position:relative">
              <div style="height:100%;width:${pctXp}%;background:linear-gradient(90deg,var(--clr-violet),var(--clr-blue));box-shadow:0 0 12px rgba(62,197,255,.9);transition:width .6s cubic-bezier(.2,.9,.3,1)"></div>
            </div>
            <div style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;color:var(--clr-text-secondary);margin-top:4px;letter-spacing:.08em">XP ${xpDelNivel} / ${xpParaSiguiente} para nivel ${progXp.nivel + 1}</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:24px;filter:drop-shadow(0 0 8px rgba(255,140,50,.9))">🔥</div>
            <div style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:22px;color:#ffb35c;text-shadow:0 0 12px rgba(255,140,50,.8)">${store.calcularRacha(new Date())}</div>
            <div style="font-family:'Rajdhani',sans-serif;font-weight:700;font-size:9px;letter-spacing:.2em;color:var(--clr-text-secondary)">RACHA</div>
          </div>
        </div>
      </div>
    </div>`;

  // Tabs
  const tabsHtml = `
    <div style="display:flex;gap:10px;margin-bottom:16px">
      <button class="ej-tab ${_tab === 'quest' ? 'ej-tab-active' : ''}" data-ej-tab="quest">Misión del día</button>
      <button class="ej-tab ${_tab === 'historial' ? 'ej-tab-active' : ''}" data-ej-tab="historial">Historial</button>
    </div>`;

  let bodyHtml = '';

  if (_tab === 'quest') {
    if (!quest) {
      bodyHtml = sysPanel('Notificación', `
        <div style="text-align:center;padding:22px 10px">
          <div style="font-size:42px;filter:drop-shadow(0 0 14px rgba(62,197,255,.6))">🌙</div>
          <h2 style="font-size:18px;color:#fff;margin-top:12px;text-shadow:0 0 12px rgba(123,47,247,.8);letter-spacing:.06em">EL CAZADOR DESCANSA</h2>
          <p style="color:var(--clr-text-secondary);font-size:13px;margin-top:8px;line-height:1.6">No hay misiones asignadas hoy.<br>Vuelva el lunes: el Sistema tendrá una nueva misión disponible.</p>
        </div>`);
    } else {
      bodyHtml += renderEjercicio_principal(quest, hoy);
      bodyHtml += renderStats();
      for (const cl of quest.checklists) {
        bodyHtml += renderChecklist(cl.id, cl.title, cl.items, hoy);
      }
      if (quest.exercises.length) {
        bodyHtml += `<div class="sys-tag" style="margin:4px 0 12px">Ejercicios principales</div>`;
        for (const ex of quest.exercises) bodyHtml += renderEjercicioCard(ex, hoy);
      }
      if (quest.stretch) {
        bodyHtml += renderChecklist('stretch', quest.stretch.title, quest.stretch.items, hoy);
      }
    }
  } else {
    bodyHtml = renderHistorialEjercicio();
  }

  container.innerHTML = hudHtml + tabsHtml + bodyHtml;

  // Event listeners
  container.querySelectorAll('[data-ej-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      _tab = btn.dataset.ejTab;
      renderEjercicio();
    });
  });

  container.querySelectorAll('[data-ej-check]').forEach(el => {
    el.addEventListener('click', () => toggleCheck(el.dataset.ejCheck));
  });

  container.querySelectorAll('.ej-btn-serie').forEach(btn => {
    btn.addEventListener('click', () => completarSerie(btn.dataset.ejEx));
  });

  // Reanudar timer si había
  reanudarDescansoSiHay();
}

// ── Rango del nivel ───────────────────────────────────────────────

function rankFor(nivel) {
  let rank, color;
  if (nivel >= 30)      { rank = 'S'; color = '#ffcf5c'; }
  else if (nivel >= 20) { rank = 'A'; color = '#ffb35c'; }
  else if (nivel >= 15) { rank = 'B'; color = '#7b2ff7'; }
  else if (nivel >= 10) { rank = 'C'; color = '#3ec5ff'; }
  else if (nivel >= 5)  { rank = 'D'; color = '#41f0a6'; }
  else                  { rank = 'E'; color = '#9aa5b1'; }
  return { rank, color };
}
