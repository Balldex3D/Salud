/** Horarios diarios y semanal del plan. */

import { ahoraBogota } from '../core/fecha.js';

export const HORARIO = {
  // Horas en formato HH:MM (Colombia, UTC-5)
  despertar: '08:30',
  aviso_pre_entreno: '09:20', // 10 min antes del entreno
  entreno: '09:30',
  batido_post_entreno: '10:30',
  almuerzo: '13:30',
  cena: '19:00',

  // Batch cooking: domingo y miercoles
  batch_cooking_dias: ['domingo', 'miercoles'],
  batch_cooking_hora_default: '20:00'
};

export const RUTINA_SEMANAL = {
  lunes: { nombre: 'Lunes', entrenamiento: 'Torso/Core', almuerzo: 'chicken_teriyaki_don', cena: 'miso_udon_huevo' },
  martes: { nombre: 'Martes', entrenamiento: 'Pierna', almuerzo: 'gyudon', cena: 'tofu_don_espinaca' },
  miercoles: { nombre: 'Miercoles', entrenamiento: 'Recuperacion activa', almuerzo: 'egg_soboro_don', cena: 'sopa_miso_arroz_tofu', batch_cooking: true },
  jueves: { nombre: 'Jueves', entrenamiento: 'Torso/Core', almuerzo: 'chicken_teriyaki_don', cena: 'miso_udon_huevo' },
  viernes: { nombre: 'Viernes', entrenamiento: 'Pierna', almuerzo: 'gyudon', cena: 'tofu_don_espinaca' },
  sabado: { nombre: 'Sabado', entrenamiento: 'Descanso', almuerzo: 'salmon_don', cena: 'sopa_miso_arroz_tofu' },
  domingo: { nombre: 'Domingo', entrenamiento: 'Descanso', almuerzo: 'libre', cena: 'libre', batch_cooking: true }
};

export const getDiaDelMes = () => {
  const hoy = ahoraBogota();
  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  return dias[hoy.getDay()];
};

export const getRutinaDia = (dia) => RUTINA_SEMANAL[dia];
