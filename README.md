# ◆ SISTEMA — Recetario Operativo

PWA (Progressive Web App) estilo Solo Leveling para la gestión de nutrición Fase 1 de Christian.

## Características

- **Instalable en celular/tablet** — Funciona sin conexión gracias al service worker
- **Quests diarias** — Batido, almuerzo, cena con temporizadores integrados
- **Gamificación** — Niveles, XP, racha de días completados
- **Modo guiado en la cocina** — Paso a paso con timers para cada fase
- **Lista de mercado** — Checklist marcable con precios validados
- **Batch cooking** — Tareas de preparación en lote (domingo/miércoles)
- **Notificaciones push** — Recordatorios a horas fijas (8:30, 9:20, 10:30, 13:30, 19:00)
- **Cálculos exactos** — Macros totalizadas desde recetas auditadas (sin invención)
- **Datos locales** — Todo se guarda en el dispositivo, sin servidor de backend
- **Exportar/importar** — Backup JSON descargable

## Testing local

### Requisitos

- PowerShell (Windows)
- Git (opcional, para publicar en GitHub Pages)

### Paso 1: Servir la app localmente

```powershell
cd "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"
powershell -File tools/serve.ps1
```

Abre http://localhost:8080 en el navegador. En Windows, `localhost` también funciona desde el iPad si están en la misma red usando `http://<IP_DEL_PC>:8080`.

### Paso 2: Verificar funcionalidad

- **Dashboard** — Debe mostrar 8 recetas del día (batido + almuerzo + cena + batch si aplica)
- **Receta** — Click en una quest muestra ingredientes y macros
- **Modo guiado** — Abre paso a paso con timers que suenan al terminar
- **Offline** — Abre DevTools → App → Service Workers y verifica que esté registrado
- **Persistencia** — Marca una quest completa, recarga, debe seguir marcada

### Paso 3: Generar llaves VAPID

Abre `tools/vapid.html` en el navegador (localmente o en cualquier HTTPS) y:

1. Haz click en "Generar llaves VAPID"
2. Copia ambas llaves
3. Guarda la PRIVATE KEY en un lugar seguro (necesaria para Cloudflare)

## Publicación en GitHub Pages

### Requisitos

- Cuenta de GitHub
- Git instalado

### Pasos

1. **Crear repositorio público en GitHub**

   ```
   https://github.com/TU_USUARIO/recetario
   ```

2. **Inicializar git localmente**

   ```bash
   cd "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"
   git init
   git add .
   git commit -m "Initial commit: Recetario PWA"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/recetario
   git push -u origin main
   ```

3. **Habilitar GitHub Pages**

   - Ve a Configuración del repositorio → Pages
   - Selecciona "Deploy from a branch"
   - Elige `main` branch, carpeta `/root`
   - Guarda

4. **Esperar el deploy** (~1-2 minutos)

   La app estará en: `https://tu_usuario.github.io/recetario/`

5. **Instalar en iPad/iPhone**

   - Abre la URL en Safari
   - Toca el botón "Compartir" (↗️)
   - Desplázate y toca "Añadir a pantalla de inicio"
   - Toca "Añadir"

## Notificaciones Push (Cloudflare Worker)

### Requisitos

- Cuenta de Cloudflare (tier gratuito funciona)
- KV namespace en Cloudflare
- Llaves VAPID generadas

### Pasos

1. **En Cloudflare Dashboard**

   - Ve a Workers & Pages
   - Crea un nuevo Worker
   - Copia el código de `worker/worker.js` al editor
   - Guarda y despliega (ej. `recetario-api.yourdomain.workers.dev`)

2. **Configurar KV**

   - Ve a Storage → KV
   - Crea un namespace llamado "SUSCRIPCIONES"
   - En el Worker, vincula el namespace:

     ```toml
     [[kv_namespaces]]
     binding = "SUSCRIPCIONES"
     id = "tu_kv_namespace_id"
     ```

3. **Agregar secret VAPID**

   ```bash
   wrangler secret put VAPID_PRIVATE_KEY
   # Pega la llave privada generada
   ```

4. **En la app: actualizar URL del Worker**

   Edita `js/core/push.js` (cuando lo crees) y apunta a tu Worker:

   ```javascript
   const WORKER_URL = 'https://recetario-api.yourdomain.workers.dev';
   ```

5. **Solicitar permiso de notificaciones**

   Al abrir la app, debería pedir permiso. Acepta.

6. **Probar**

   - Endpoint POST a `https://tu-worker/test` con `{ subscription: ... }`
   - O espera a la siguiente hora exacta (8:30 am, 9:20 am, etc.)

## Estructura de archivos

```
.
├── index.html                 # Shell HTML
├── manifest.webmanifest       # Configuración PWA
├── sw.js                      # Service Worker (offline + push)
├── css/
│   └── tokens.css             # Variables CSS, Sistema theme
├── js/
│   ├── app.js                 # Bootstrap, router, renderizado
│   ├── core/
│   │   ├── store.js           # localStorage con versionado
│   │   ├── macros.js          # Cálculo de calorías
│   │   ├── timer.js           # Timers con alertas multi-canal
│   │   └── (otros módulos)
│   └── data/
│       ├── recetas.js         # 8 recetas auditadas
│       ├── fases.js           # Fase 1/2/3
│       ├── horario.js         # Rutina semanal
│       ├── batch.js           # Batch cooking
│       └── mercado.js         # Lista de mercado + precios
├── worker/
│   ├── worker.js              # Cloudflare Worker (push cron)
│   └── wrangler.toml          # Configuración
└── tools/
    ├── serve.ps1             # Servidor local (PowerShell)
    └── vapid.html            # Generador de llaves VAPID
```

## Notas técnicas

### Sin build toolchain

- Vanilla ES modules (no webpack, no Vite)
- Sin dependencies externas
- Service worker + localStorage (offline completo)

### Datos

- Todos los valores de recetas, precios y horarios vienen del documento auditado
- Ninguna cifra se recalcula ni se inventa (macros autoverificadas)
- Fases 2 y 3 se muestran como "pendiente de definir"

### Gamificación

- Batido: 20 XP
- Almuerzo: 40 XP
- Cena: 40 XP
- Batch cooking: 80 XP
- Bono día completo: +25 XP
- Curva de nivel: Lv.N→N+1 requiere `100 + (N-1)*50` XP

### Alertas de timer

1. **Sonido** — Acorde ascendente sintético (Web Audio API)
2. **Overlay** — Pantalla completa pulsante en azul
3. **Notificación** — Push del sistema
4. **Voz** — Síntesis de voz ("¡Tiempo!")

Cada una desactivable en Ajustes (todas ON por defecto en iPad).

### Safari en iPad

- **Push solo funciona instalada** — No en el navegador normal
- Requiere iOS 16.4+
- `navigator.vibrate` no existe (se intenta pero no hace nada)
- Timers de JavaScript se congelan en segundo plano → mitigado con Screen Wake Lock

## Troubleshooting

### El service worker no se registra

- Verifica que estés en `http://localhost` o `https://`
- `file://` no funciona
- En DevTools → Application → Service Workers, debe haber una entrada activa

### Las push no llegan en iPad

- Verifica que la app esté **instalada** (icono en pantalla de inicio)
- Confirma que **Safari es el navegador** usado para instalar
- iOS 16.4+ requerido
- Chequea Ajustes → Notificaciones que la app tenga permisos

### Los datos desaparecen

- Safari ITP (Intelligent Tracking Prevention) puede limpiar localStorage
- La app solicita `navigator.storage.persist()` al instalar
- Usa Ajustes → Exportar backup regularmente (auto-alertar si pasan 30+ días)

### Tema oscuro / contraste

- Usa variables CSS en `css/tokens.css`
- Totalmente soportado en iPadOS Light/Dark mode
- Respeta `prefers-reduced-motion` para animaciones

## Actualizaciones futuras

- [ ] Fases 2 y 3 con recetas y macros definidos
- [ ] Gráficas de progreso nutricional
- [ ] Integración con app de fitness (paso contador, etc.)
- [ ] Traducción a EN/PT
- [ ] Dark mode forzado si lo prefiere Christian

## Licencia

Privado / No redistribuir sin autorización.

---

**Última actualización:** 31 de agosto de 2026  
**Versión:** 1.0 — Fase 1  
**Plataforma:** iPad 10ª gen (iPadOS 17+), celular Android, navegadores modernos
