/**
 * Definición de quests y ejercicios del Cazador.
 * Estructura: { id, name, type, checklists, exercises, stretch, bonus }
 * Rotación semanal: 0=dom, 1=lun, 2=mar, 3=mie, 4=jue, 5=vie, 6=sab
 */

export const STAT_LABELS = {
  fuerza:      'FUERZA',
  resistencia: 'RESISTENCIA',
  agilidad:    'AGILIDAD',
  vitalidad:   'VITALIDAD',
};

export const QUESTS_EJERCICIO = {
  upper: {
    id: 'upper',
    name: 'Ascenso del Cazador',
    type: 'Quest · Tren superior',
    checklists: [
      {
        id: 'calGen', title: 'Calentamiento general', items: [
          'Trote suave 2 min',
          'Círculos de brazos 1 min',
          'Círculos de muñecas 30 seg',
          'Rotación de hombros 10 veces',
        ],
      },
      {
        id: 'calEsp', title: 'Calentamiento específico', items: [
          'Cuelgue pasivo en barra 2x15 seg',
          '5 flexiones suaves de activación',
        ],
      },
    ],
    exercises: [
      { id: 'dominadas', name: 'Dominadas',          sets: 4, target: null,                 rest: 90, xp: 18, stat: 'fuerza',      gain: 2 },
      { id: 'fondos',    name: 'Fondos',              sets: 4, target: null,                 rest: 90, xp: 18, stat: 'fuerza',      gain: 2 },
      { id: 'flexiones', name: 'Flexiones de pecho',  sets: 4, target: null,                 rest: 60, xp: 12, stat: 'fuerza',      gain: 1 },
    ],
    stretch: {
      id: 'stretch', title: 'Estiramiento final', items: [
        'Estiramiento de brazos atrás 30 seg',
        'Estiramiento de brazo cruzado 30 seg cada lado',
        'Estiramiento de tríceps 30 seg cada lado',
        'Cuelgue pasivo 30 seg',
      ],
    },
    // Bonus al completar la quest completa
    bonus: { xp: 60, stat: 'vitalidad', gain: 3 },
  },

  legs: {
    id: 'legs',
    name: 'Cimientos del Cazador',
    type: 'Quest · Piernas',
    checklists: [
      {
        id: 'calGen', title: 'Calentamiento general', items: [
          'Trote suave 2 min',
          'Jumping jacks 1 min',
          'Círculos de cadera 30 seg',
          'Círculos de rodillas 30 seg',
        ],
      },
      {
        id: 'calEsp', title: 'Calentamiento específico', items: [
          'Sentadillas sin peso x10',
          'Zancadas suaves x5 por pierna',
        ],
      },
    ],
    exercises: [
      { id: 'sentadillasTrx', name: 'Sentadillas con apoyo TRX', sets: 4, target: '12 reps',            rest: 90, xp: 18, stat: 'resistencia', gain: 2, targetReps: 12 },
      { id: 'zancadas',       name: 'Zancadas alternas',         sets: 3, target: '10 reps por pierna', rest: 90, xp: 18, stat: 'resistencia', gain: 2, targetReps: 10 },
      { id: 'puente',         name: 'Puente de glúteo',          sets: 4, target: '15 reps',            rest: 60, xp: 12, stat: 'resistencia', gain: 1, targetReps: 15 },
      { id: 'talones',        name: 'Elevación de talones',      sets: 4, target: '15 reps',            rest: 45, xp: 12, stat: 'resistencia', gain: 1, targetReps: 15 },
    ],
    stretch: {
      id: 'stretch', title: 'Estiramiento final', items: [
        'Estiramiento cuádriceps 30 seg cada pierna',
        'Estiramiento isquiotibiales 30 seg',
        'Estiramiento pantorrilla 30 seg cada pierna',
        'Postura del niño 30 seg',
      ],
    },
    bonus: { xp: 60, stat: 'vitalidad', gain: 3 },
  },

  soft: {
    id: 'soft',
    name: 'Recuperación del Cazador',
    type: 'Quest · Día suave',
    checklists: [
      {
        id: 'recup', title: 'Recuperación activa', items: [
          'Caminata o trote suave 5 min',
          'Estiramiento completo de cuerpo 10-12 min',
        ],
      },
    ],
    exercises: [],
    stretch: null,
    bonus: { xp: 25, stat: 'agilidad', gain: 2 },
  },
};

// 0=dom, 1=lun, 2=mar, 3=mie, 4=jue, 5=vie, 6=sab
// null = día de descanso (no hay misión)
export const ROTACION_SEMANAL = {
  0: null,
  1: 'upper',
  2: 'legs',
  3: 'soft',
  4: 'upper',
  5: 'legs',
  6: null,
};

export const DAY_NAMES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
export const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

/**
 * Devuelve el questId que corresponde a la fecha dada (o null si descanso).
 * @param {Date} date
 * @returns {string|null}
 */
export function questIdParaDia(date) {
  return ROTACION_SEMANAL[date.getDay()] || null;
}

/**
 * Cuenta el total de items completables en una quest.
 * @param {object} quest
 * @param {object} today - {checks, sets}
 */
export function questTotales(quest, today) {
  let total = 0;
  let done = 0;

  for (const cl of quest.checklists) {
    for (let i = 0; i < cl.items.length; i++) {
      total++;
      if (today.checks[cl.id + '-' + i]) done++;
    }
  }

  if (quest.stretch) {
    for (let i = 0; i < quest.stretch.items.length; i++) {
      total++;
      if (today.checks['stretch-' + i]) done++;
    }
  }

  for (const ex of quest.exercises) {
    total += ex.sets;
    done += Math.min((today.sets[ex.id] || []).length, ex.sets);
  }

  return { total, done };
}

/**
 * True si todos los items de la quest están completados.
 */
export function isQuestCompleta(quest, today) {
  const { total, done } = questTotales(quest, today);
  return total > 0 && done >= total;
}
