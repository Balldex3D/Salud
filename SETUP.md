# ◆ SISTEMA — Primeros pasos

Bienvenida/o al recetario. Esto es una PWA (app que funciona en el navegador y se instala en tu iPad).

## Lo que tienes

✅ **App funcional 100%** — Instalable en iPad, funciona sin internet  
✅ **8 recetas auditadas** — Datos verificados del PDF (no inventado)  
✅ **Gamificación** — Niveles, XP, racha diaria  
✅ **Timers en la cocina** — Con sonido, overlay visual, notificación y voz  
✅ **Lista de mercado** — Checklist con precios verificados  
✅ **Batch cooking** — Tareas de preparación lote (Dom/Mié)  
✅ **Backup** — Exporta/importa tus datos  
✅ **Offline** — Funciona sin internet una vez instalada  

## Lo que aún falta

❌ **Notificaciones a horas fijas** — Requiere Cloudflare Worker (opcional, ver DEPLOYMENT.md)  
❌ **Fases 2 y 3** — Mostradas como "pendiente de definir" (necesitan recetas y macros)  
❌ **Receta cena libre domingo** — No definida en el documento original  

## Paso 1: Instalar en el iPad (2 minutos)

### Opción A: Desde GitHub Pages (recomendado — permanente)

1. **En tu PC/Mac:** Sigue DEPLOYMENT.md paso 1
   - Crea un repo de GitHub
   - Haz push del código
   - Espera a que GitHub Pages esté listo

2. **En el iPad:**
   - Abre Safari
   - Ve a `https://tu_usuario.github.io/recetario/`
   - Botón "Compartir" (↗️) → "Añadir a pantalla de inicio"
   - Ábrel desde el icono

### Opción B: Desde localhost (prueba rápida)

1. **En tu PC (PowerShell):**
   ```powershell
   cd "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"
   powershell -File tools/serve.ps1
   ```

2. **En el iPad:**
   - Abre Safari
   - Ve a `http://TU_IP_DEL_PC:8080` (pide la IP del PowerShell)
   - No es instalable así, pero funciona offline una vez cargada

## Paso 2: Primeros pasos en la app

### Dashboard

- **Quests de hoy** — Batido, almuerzo, cena (+ batch cooking si aplica)
- **Click en una quest** → ver ingredientes y macros
- **Click en el ✓** → marcar completada (ganas XP)
- **Panel derecho** — Tu nivel, XP, racha actual, totales del día

### Modo guiado (cocina)

- Abre una receta (ej. Chicken Teriyaki Don)
- Botón "Modo guiado"
- **Paso a paso** con timers integrados
- Cuando termina el timer: **4 alertas a la vez**
  - Sonido (acorde ascendente)
  - Overlay azul a pantalla completa
  - Notificación del sistema
  - Voz que anuncia "¡Tiempo!"

### Ajustes

- **Ajuste Fase 1 (ON por defecto)** — Suma +20g de arroz en almuerzos específicos
- **Notificaciones** — Activa/desactiva las 4 alertas del timer
- **Exportar datos** — Descarga backup JSON (recomendado cada mes)

### Lista de mercado

- Semanal (perecederos) — Cheklist marcable
- Mensual (no perecederos) — Con precios validados
- **Total presupuesto** — Escenario A/B (Éxito vs D1/Ara)

## Paso 3: Entiende el sistema de gamificación

- **Batido:** 20 XP
- **Almuerzo:** 40 XP
- **Cena:** 40 XP
- **Batch cooking:** 80 XP
- **Día completo (todas las quests):** +25 XP extra

**Curva de nivel:**
- Lv.1→2: 100 XP
- Lv.2→3: 150 XP
- Lv.3→4: 200 XP (aumenta 50 XP por nivel)

**Racha:** Se cuenta un día si completaste batido + almuerzo + cena. El domingo el almuerzo libre no cuenta obligatorio.

## Dónde está todo

| Que necesito | Donde está |
|--------------|-----------|
| Abrir la app | Icono en pantalla de inicio (tras instalar) |
| Cambiar recetas | `js/data/recetas.js` (requiere git push) |
| Cambiar horarios | `js/data/horario.js` |
| Cambiar paleta de colores | `css/tokens.css` |
| Guía de despliegue | `DEPLOYMENT.md` |
| Instrucciones técnicas | `README.md` |
| Código del servidor local | `tools/serve.ps1` |
| Worker de notificaciones | `worker/worker.js` + Cloudflare |

## Troubleshooting rápido

### "La app no instala en el iPad"

- ¿Usas **Safari**? (no Chrome — en iPad Chrome es Safari por dentro)
- ¿Es **HTTPS** la URL? (`https://`, no `http://`)
- ¿iOS 16.4+?

### "Los datos desaparecieron"

- Safari puede limpiar localStorage (ITP)
- **Usa Ajustes → Exportar backup cada mes**
- La app avisa si pasan 30+ días sin backup

### "El timer no suena"

- ¿Muted activo en el iPad? (verifica el toggle de volumen a la izquierda)
- ¿Tienes permiso de notificaciones? (Safari → Ajustes)
- Los 4 canales son independientes:
  - Sin sonido pero hay overlay visual ✓
  - Sin vibración en iPad (no vibra) ✓
  - Sin notificación pero hay sonido ✓

### "El modo offline no funciona"

- Necesita **service worker registrado**
- En DevTools → Application → Service Workers debe decir "activated and running"
- Si dice "Install" o hay un error, recarga la página

### "¿Cómo sigo Fases 2 y 3?"

- La app lo soporta, pero faltan recetas/macros
- Cuando las definas, ediéndome y agrego en `js/data/fases.js`
- Ahora solo está Fase 1 activa

## Próximos pasos opcionales

### Notificaciones push a horas fijas

Ver **DEPLOYMENT.md paso 2** — requiere:
- Cloudflare account (gratis)
- Seguir 6 pasos de configuración (~10 min)
- Resultado: notificaciones incluso con la app cerrada

### Cambios de recetas

1. Edita los JS en `js/data/`
2. `git add . && git commit -m "..." && git push`
3. GitHub Pages actualiza en 1-2 minutos

### Dark mode / Light mode

Ya funciona automático — la app respeta `prefers-color-scheme` del iPad.

## Contacto / Soporte

Si algo no funciona:
1. Abre DevTools (F12 en navegador)
2. Ve a Console → ¿Hay errores rojos?
3. Ve a Application → Service Workers → ¿Dice "activated"?
4. Ve a Storage → localStorage → ¿Tiene datos? (recetario_v1)

---

**¡Bienvenida/o al Sistema!**

Cada quest completada es un paso hacia el siguiente nivel. 💪

Última actualización: 31 agosto 2026  
Versión: 1.0 — Fase 1
