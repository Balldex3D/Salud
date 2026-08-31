export const FASES = [
  {
    id: 1,
    nombre: 'Adaptacion',
    semanas: '1-3',
    kcal_meta: 2000,
    macros_meta: { proteina_g: 110, grasa_g: 60, carbo_g: 255 }
  },
  {
    id: 2,
    nombre: 'Superavit leve',
    semanas: '4-6',
    kcal_meta: 2300,
    macros_meta: null,
    estado: 'pendiente de definir'
  },
  {
    id: 3,
    nombre: 'Superavit real',
    semanas: '7+',
    kcal_meta: 2500,
    macros_meta: null,
    estado: 'pendiente de definir'
  }
];

export const getFase = (id) => FASES.find(f => f.id === id);
export const getFaseActiva = () => FASES[0]; // Por ahora siempre Fase 1
