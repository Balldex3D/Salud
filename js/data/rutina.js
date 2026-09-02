export const RUTINA_DIARIA = [
  { hora: '8:30am', duracion: '5 min', actividad: 'Levantarme', emoji: '🛏️' },
  { hora: '8:35am', duracion: '5 min', actividad: 'Lavarme los dientes', emoji: '🪥' },
  { hora: '8:50am', duracion: '15 min', actividad: 'Despertarme', emoji: '☕' },
  { hora: '9:00am', duracion: '40 min', actividad: 'Rutina skincare MAÑANA', emoji: '🧴', detalle: 'Lavar → esperar 10 → aplicar → esperar 15 → aplicar' },
  { hora: '9:45am', duracion: '15 min', actividad: 'Tomarme un mate', emoji: '🧉' },
  { hora: '10:00am', duracion: '1 hora', actividad: 'Hacer ejercicio', emoji: '💪' },
  { hora: '11:00am', duracion: '1 hora', actividad: 'Hacer oficio', emoji: '🧹' },
  { hora: '1:30pm', duracion: '1 hora', actividad: 'Almorzar', emoji: '🍽️' },
  { hora: '2:30pm', duracion: '1 hora', actividad: 'Estudiar inglés', emoji: '🇺🇸' },
  { hora: '7:30pm', duracion: '30 min', actividad: 'Cena', emoji: '🍷' },
  { hora: '8:00pm', duracion: '45 min', actividad: 'Rutina skincare NOCHE', emoji: '🧴', detalle: 'Lavar → esperar 15 → aplicar → esperar 15 → aplicar' },
  { hora: '8:45pm', duracion: '20 min', actividad: 'Tocar piano', emoji: '🎹' },
];

export const obtenerRutina = () => RUTINA_DIARIA;
