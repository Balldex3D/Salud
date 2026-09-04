/**
 * Utilidades de fecha ancladas a la zona horaria de Bogotá (UTC-5, sin DST).
 *
 * Regla para evitar bugs de doble conversión:
 * - `ahoraBogota()` / `fechaStr()` SOLO se llaman sobre un instante real
 *   (normalmente `new Date()` directo) — nunca sobre una fecha que ya fue
 *   convertida a hora Bogotá.
 * - `formatearYMD()` solo formatea una fecha "ingenua" que ya está en hora
 *   Bogotá (con getters planos, sin volver a convertir zona horaria).
 */

const BOGOTA_TZ = 'America/Bogota';
const bogotaFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: BOGOTA_TZ, hour12: false,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
});

/**
 * Convierte un instante real (Date) en un Date "ingenuo" cuyos componentes
 * locales representan la hora de reloj en Bogotá para ese instante.
 */
export function ahoraBogota(instante = new Date()) {
  const parts = {};
  bogotaFmt.formatToParts(instante).forEach(p => {
    if (p.type !== 'literal') parts[p.type] = p.value;
  });
  return new Date(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
}

/**
 * Formatea una fecha ya "ingenua" (en hora Bogotá) como YYYY-MM-DD,
 * usando getters planos sin volver a convertir zona horaria.
 */
export function formatearYMD(fechaIngenua) {
  return fechaIngenua.getFullYear() + '-' +
    String(fechaIngenua.getMonth() + 1).padStart(2, '0') + '-' +
    String(fechaIngenua.getDate()).padStart(2, '0');
}

/**
 * Atajo: fecha de hoy (o del instante dado) en Bogotá, como YYYY-MM-DD.
 */
export function fechaStr(instante = new Date()) {
  return formatearYMD(ahoraBogota(instante));
}
