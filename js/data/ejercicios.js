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
          'Trote suave: 2 minutos en el lugar, ritmo bajo',
          'Shoulder Circles Forward (Círculos de hombro hacia adelante): 30 seg, lento y controlado',
          'Shoulder Circles Backward (Círculos de hombro hacia atrás): 30 seg, lento y controlado',
          'Arm Circles (Círculos de brazos): 30 seg cada dirección, brazos extendidos',
          'Wrist Circles (Círculos de muñecas): 30 seg, ambas manos simultáneamente',
          'Shoulder Rolls (Rotación de hombros): 10 veces arriba, 10 veces abajo',
        ],
      },
      {
        id: 'calEsp', title: 'Calentamiento específico', items: [
          'Dead Hang (Cuelgue pasivo en barra): 2 series de 15 segundos, agarre neutro',
          'Push-ups (Flexiones suaves): 5 repeticiones de activación, ritmo lento, bajo impacto',
        ],
      },
    ],
    exercises: [
      { id: 'dominadas', name: 'Pull-ups / Dominadas',          sets: 4, target: null,                 rest: 90, xp: 18, stat: 'fuerza',      gain: 2, description: 'Agarre dorsal (palmas hacia afuera). Si no puedes, usa banda de asistencia.' },
      { id: 'fondos',    name: 'Dips / Fondos de tríceps',      sets: 4, target: null,                 rest: 90, xp: 18, stat: 'fuerza',      gain: 2, description: 'Paralelas o sillas. Mantén cuerpo vertical. Si no puedes, usa banda de asistencia.' },
      { id: 'flexiones', name: 'Push-ups / Flexiones de pecho', sets: 4, target: null,                 rest: 60, xp: 12, stat: 'fuerza',      gain: 1, description: 'Manos a altura de hombros. Cuerpo en línea recta de cabeza a talones.' },
    ],
    stretch: {
      id: 'stretch', title: 'Estiramiento final — Tren Superior', items: [
        'Reverse Shoulder Stretch (Brazos atrás): 30 seg, manos entrelazadas, tira hacia abajo',
        'Cross-body Shoulder Stretch (Estiramiento de hombro cruzado): 30 seg cada lado, brazo sobre el pecho',
        'Triceps Stretch (Estiramiento de tríceps): 30 seg cada lado, codo atrás de la cabeza',
        'Dead Hang / Cuelgue Pasivo (Pecho y espalda): 30 seg, brazos relajados, cuelga de la barra',
        'Doorway Chest Stretch (Estiramiento de pecho en marco de puerta): 30 seg cada lado, antebrazos en marco',
      ],
    },
    bonus: { xp: 60, stat: 'vitalidad', gain: 3 },
  },

  legs: {
    id: 'legs',
    name: 'Cimientos del Cazador',
    type: 'Quest · Piernas',
    checklists: [
      {
        id: 'calGen', title: 'Calentamiento general', items: [
          'Trote suave: 2 minutos en el lugar, ritmo bajo',
          'Jumping Jacks (Saltos de tijera): 1 minuto, ritmo lento y controlado',
          'Hip Circles (Círculos de cadera): 30 seg cada dirección, pies juntos, manos en cadera',
          'Knee Circles (Círculos de rodilla): 30 seg, pies juntos, manos en rodillas, pequeños círculos',
          'Leg Swings Forward/Backward (Péndulos de pierna adelante/atrás): 20 seg cada pierna',
          'Leg Swings Side-to-Side (Péndulos laterales): 20 seg cada pierna',
        ],
      },
      {
        id: 'calEsp', title: 'Calentamiento específico', items: [
          'Bodyweight Squats (Sentadillas sin peso): 10 repeticiones, movimiento controlado',
          'Walking Lunges (Zancadas caminando): 5 repeticiones por pierna, pasos lentos',
        ],
      },
    ],
    exercises: [
      { id: 'sentadillasTrx', name: 'TRX Assisted Squats / Sentadillas con TRX', sets: 4, target: '12 reps',            rest: 90, xp: 18, stat: 'resistencia', gain: 2, targetReps: 12, description: 'Agarra las cintas TRX, pecho arriba, rodillas atrás de los dedos del pie.' },
      { id: 'zancadas',       name: 'Alternating Lunges / Zancadas alternas',         sets: 3, target: '10 reps por pierna', rest: 90, xp: 18, stat: 'resistencia', gain: 2, targetReps: 10, description: 'Paso adelante, baja rodilla trasera hacia el suelo. Alterna pierna.' },
      { id: 'puente',         name: 'Glute Bridge / Puente de glúteo',          sets: 4, target: '15 reps',            rest: 60, xp: 12, stat: 'resistencia', gain: 1, targetReps: 15, description: 'Acostado, pies apoyados, sube caderas. Contrae glúteos en la cima.' },
      { id: 'talones',        name: 'Calf Raises / Elevación de talones',      sets: 4, target: '15 reps',            rest: 45, xp: 12, stat: 'resistencia', gain: 1, targetReps: 15, description: 'De pie, sube sobre los dedos. Baja controlado.' },
    ],
    stretch: {
      id: 'stretch', title: 'Estiramiento final — Piernas', items: [
        'Standing Quadriceps Stretch (Estiramiento de cuádriceps de pie): 30 seg cada pierna, talón hacia glúteo',
        'Lying Hamstring Stretch (Estiramiento de isquiotibiales acostado): 30 seg cada pierna, sube pierna extendida',
        'Calf Stretch Against Wall (Estiramiento de pantorrilla contra pared): 30 seg cada pierna, talón en suelo',
        'Child\'s Pose (Postura del niño): 30 seg, rodillas dobladas, frente al suelo, respiración lenta',
        'Pigeon Pose (Postura de paloma — glúteos y cadera): 30 seg cada lado, pierna cruzada adelante',
      ],
    },
    bonus: { xp: 60, stat: 'vitalidad', gain: 3 },
  },

  soft: {
    id: 'soft',
    name: 'Recuperación del Cazador',
    type: 'Quest · Día suave (Miércoles)',
    checklists: [
      {
        id: 'recup', title: 'Recuperación activa', items: [
          'Walk or Light Jog (Caminata o trote suave): 5 minutos en el lugar o aire libre, ritmo bajo y relajado',
        ],
      },
    ],
    exercises: [],
    stretch: {
      id: 'stretch', title: '⭐ ESTIRAMIENTO COMPLETO DE CUERPO — MIÉRCOLES', items: [
        '🔵 CUELLO Y HOMBROS (Parte superior)',
        'Neck Tilts Side-to-Side (Inclinación lateral del cuello): 30 seg cada lado, oreja hacia hombro',
        'Neck Rotation (Rotación de cuello): 30 seg cada lado, mira por encima del hombro',
        'Shoulder Rolls (Rotación de hombros): 10 veces arriba lento, 10 veces abajo lento',
        'Neck & Shoulder Stretch (Estiramiento de cuello y trapecio): 30 seg cada lado, inclina cabeza, tira hombro abajo',

        '🔵 BRAZOS Y PECHO',
        'Doorway Chest Stretch (Estiramiento de pecho en marco de puerta): 45 seg cada lado, antebrazos en marco, inclina cuerpo adelante',
        'Cross-body Shoulder Stretch (Estiramiento de hombro cruzado): 45 seg cada lado, brazo sobre pecho, tira con otra mano',
        'Triceps Stretch (Estiramiento de tríceps): 45 seg cada lado, codo atrás de cabeza, tira con otra mano',
        'Wrist & Forearm Stretch (Estiramiento de muñeca y antebrazo): 30 seg cada posición, palma hacia abajo y arriba',

        '🔵 ESPALDA MEDIA Y BAJA',
        'Cat-Cow Stretch (Postura de gato-vaca): 1 minuto alternando, con ritmo lento',
        'Child\'s Pose (Postura del niño): 1 minuto, rodillas dobladas, frente al suelo',
        'Spinal Twist Lying (Giro espinal acostado): 45 seg cada lado, rodilla cruzada hacia el pecho',

        '🔵 CADERAS Y GLÚTEOS',
        'Pigeon Pose (Postura de paloma): 1 minuto cada lado, pierna cruzada adelante, inclina cuerpo adelante',
        'Glute Stretch Lying (Estiramiento de glúteos acostado): 45 seg cada pierna, rodilla hacia pecho cruzada',
        'Hip Flexor Stretch in Lunge (Estiramiento de flexores de cadera en zancada): 45 seg cada lado, rodilla trasera al suelo',

        '🔵 PIERNAS (Adelante, detrás, lateral)',
        'Standing Quadriceps Stretch (Estiramiento de cuádriceps de pie): 45 seg cada pierna, talón hacia glúteo',
        'Lying Hamstring Stretch (Estiramiento de isquiotibiales acostado): 45 seg cada pierna, levanta pierna extendida',
        'Standing Hamstring Stretch (Estiramiento de isquiotibiales de pie): 45 seg cada pierna, inclina pecho hacia pierna',
        'Calf Stretch Against Wall (Estiramiento de pantorrilla contra pared): 45 seg cada pierna, talón firme en suelo',
        'Side Lunge Stretch (Estiramiento en zancada lateral): 45 seg cada lado, pecho hacia la pierna flexionada',

        '🔵 CIERRE — RESPIRACIÓN Y RELAJACIÓN',
        'Supine Figure-4 Stretch (Estiramiento figura-4 acostado): 1 minuto, rodilla cruzada en pecho',
        'Breathing Meditation (Meditación de respiración): 2 minutos, acostado boca arriba, respira lento (4 inhala, 6 exhala)',
      ],
    },
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
