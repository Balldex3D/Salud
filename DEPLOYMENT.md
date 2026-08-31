# Guía de despliegue — ◆ SISTEMA Recetario

**Tiempo estimado:** 15 minutos (GitHub Pages) + 5 minutos (Cloudflare, opcional)

## 1. GitHub Pages — Publicar la app

### Paso 1.1: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `recetario` (o el que prefieras)
3. Descripción: "PWA de nutrición Fase 1 — Sistema estilo Solo Leveling"
4. Selecciona **Public**
5. Crea el repo

### Paso 1.2: Conectar el código local con GitHub

En PowerShell, en la carpeta del proyecto:

```powershell
cd "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"

# Agregar el repositorio remoto
git remote add origin https://github.com/TU_USUARIO/recetario

# Renombrar a main si es necesario
git branch -M main

# Enviar el código
git push -u origin main
```

Si pide credenciales:
- **Opción A** (recomendado): GitHub CLI
  ```powershell
  gh auth login
  ```
- **Opción B**: Token personal de GitHub
  - Ve a https://github.com/settings/tokens
  - Crea un token con permiso `repo`
  - Usa el token como contraseña en el prompt

### Paso 1.3: Habilitar Pages

1. Ve a https://github.com/TU_USUARIO/recetario/settings/pages
2. En "Build and deployment":
   - Source: `Deploy from a branch`
   - Branch: `main` / folder: `/ (root)`
3. Guarda

**Espera 1-2 minutos.** La app estará en:

```
https://tu_usuario.github.io/recetario/
```

### Paso 1.4: Probar en el iPad

1. Abre Safari en el iPad
2. Ve a `https://tu_usuario.github.io/recetario/`
3. Toca el botón "Compartir" (↗️ arriba a la derecha)
4. Desplázate hacia abajo
5. Toca "Añadir a pantalla de inicio"
6. Dale un nombre (ej. "◆ Recetario")
7. Toca "Añadir"
8. Abre el icono desde la pantalla de inicio

**¡Ya está instalada!** Funciona offline.

---

## 2. Cloudflare Worker — Notificaciones push (OPCIONAL)

Las push funcionan **sin** el Worker usando solo la app local, pero con el Worker tienes:
- Notificaciones a horas exactas **incluso con la app cerrada**
- Sin depender del servidor de la app

### Requisito previo

Crear llaves VAPID:

1. Abre `https://tu_usuario.github.io/recetario/tools/vapid.html` (o localmente `http://localhost:8080/tools/vapid.html`)
2. Haz click en "Generar llaves VAPID"
3. **Guarda ambas llaves en un archivo de texto seguro**

Ejemplo:
```
PUBLIC: sFnIkPP7Jz8K... (50+ caracteres)
PRIVATE: nM9K2wP4Lx7Q... (50+ caracteres)
```

### Paso 2.1: Crear Worker en Cloudflare

1. Ve a https://dash.cloudflare.com/
2. Workers & Pages → Crear aplicación → Crear un servicio
3. Nombre: `recetario-api` (o lo que prefieras)
4. Crea

### Paso 2.2: Pegar el código del Worker

1. En el editor de código del Worker, reemplaza todo por el contenido de `worker/worker.js`
2. Guarda y despliega

URL del Worker:
```
https://recetario-api.TUDOMINIO.workers.dev
```

(o `.TUSUBNOMBRE.workers.dev` si no tienes dominio personalizado)

### Paso 2.3: Crear KV namespace

1. En Cloudflare Dashboard → Storage → KV
2. Crea un namespace llamado `suscripciones`
3. Copia el ID
4. Ve al Worker → Settings → Bindings → Add binding
   - Variable name: `SUSCRIPCIONES`
   - KV namespace: selecciona el que creaste
   - Guarda

### Paso 2.4: Agregar secret VAPID

En la terminal (con Wrangler instalado):

```bash
npm install -g wrangler
cd worker
wrangler login
wrangler secret put VAPID_PRIVATE_KEY
# Pega la PRIVATE KEY, presiona Enter, Ctrl+D
wrangler publish
```

O en el Dashboard:

1. Worker → Settings → Environment variables
2. Add variable: `VAPID_PRIVATE_KEY`
3. Pega la llave privada
4. Guarda y republica

### Paso 2.5: Actualizar la app para usar el Worker

Edita `js/app.js` y busca donde se manejan las notificaciones:

```javascript
// En la parte de push (cuando lo implementes)
const WORKER_URL = 'https://recetario-api.TUDOMINIO.workers.dev';

// Para subscribirse:
const subscription = await reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: VAPID_PUBLIC
});

// Enviar al Worker
fetch(`${WORKER_URL}/subscribe`, {
  method: 'POST',
  body: JSON.stringify({ subscription })
});
```

**Nota:** La app actual muestra "notificaciones habilitadas" en Ajustes pero la integración real con el Worker se implementará en la siguiente fase.

### Paso 2.6: Habilitar Cron Trigger

En el Worker:

1. Settings → Triggers
2. Cron Triggers → Add
3. Expression: `* * * * *` (cada minuto)
4. Guarda

**El Worker ahora enviará push cada minuto a quien esté suscrito.**

---

## 3. Testing local (sin GitHub)

Si quieres probar antes de publicar:

```powershell
cd "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"
powershell -File tools/serve.ps1
```

Abre http://localhost:8080 en el navegador.

**Nota:** El service worker y offline funcionan en `localhost`, pero las notificaciones del sistema pueden requerir HTTPS.

---

## Troubleshooting

### GitHub Pages no aparece en Settings

- Espera 2-3 minutos después de hacer push
- Verifica que el código esté en `main` branch
- Recarga la página de Settings

### La app en GitHub Pages se ve distinta

- Abre DevTools (F12)
- Ve a Application → Cache Storage
- Si hay un cache viejo, bórralo y recarga
- O fuerza la recarga (Ctrl+Shift+R)

### El Service Worker no se registra en localhost

- DevTools → Application → Service Workers
- Si hay un error, léelo; generalmente es un problema en `sw.js`
- Los errores de ES modules no se ven en la consola regular, abre DevTools primero

### Las push no funcionan sin el Worker

- Es normal — **las push sin backend solo funcionan si hay una app de escritorio escuchando**
- Con solo la app web + service worker: notificaciones mientras esté abierta
- Usa el Worker de Cloudflare para **push verdaderas incluso cerrada**

### El iPad no instala la app

- Verifica que sea **Safari** (no Chrome)
- iOS 16.4+ requerido
- Botón "Compartir" (↗️) debe estar visible
- Si no aparece la opción "Añadir a pantalla de inicio":
  - Cierra y reabre Safari
  - O reinicia el iPad
  - Verifica que sea HTTPS (no http)

---

## Resumen de URLs

| Recurso | URL |
|---------|-----|
| App (GitHub Pages) | `https://tu_usuario.github.io/recetario/` |
| Installer (local) | `http://localhost:8080/` |
| VAPID Generator | `https://tu_usuario.github.io/recetario/tools/vapid.html` |
| Cloudflare Worker | `https://recetario-api.TUDOMINIO.workers.dev` |
| GitHub repo | `https://github.com/tu_usuario/recetario/` |

---

## Cambios después del deploy

Si haces cambios locales:

```powershell
git add .
git commit -m "Cambio: descripcion"
git push
```

GitHub Pages auto-actualiza en 1-2 minutos.

---

## Support

- **Errores JS:** DevTools → Console
- **Offline no funciona:** DevTools → Application → Service Workers
- **Notificaciones:** DevTools → Application → Manifest, verifica `notifications_enabled`
- **Performance:** Lighthouse audit (DevTools → Lighthouse)

---

**Última actualización:** 31 agosto 2026  
**Versión PWA:** 1.0
