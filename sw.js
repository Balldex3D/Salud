/**
 * Service Worker — Offline + Push
 * Strategy: HTML/JS siempre descarga nuevo, fallback a cache si offline
 */

// Cambiar versión cada vez que hay cambios
const CACHE_VERSION = 'recetario-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/tokens.css',
  './js/app.js',
  './js/core/store.js',
  './js/core/macros.js',
  './js/core/timer.js',
  './js/data/recetas.js',
  './js/data/fases.js',
  './js/data/horario.js',
  './js/data/batch.js',
  './js/data/mercado.js'
];

// Install — precache
self.addEventListener('install', (ev) => {
  console.log('[SW] Installing v3...');
  ev.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log('[SW] Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch((e) => {
        console.warn('[SW] Some assets failed to cache:', e);
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate — limpiar caches viejos
self.addEventListener('activate', (ev) => {
  console.log('[SW] Activating v3...');
  ev.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_VERSION) {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch — Strategy por tipo
self.addEventListener('fetch', (ev) => {
  const url = new URL(ev.request.url);

  // Ignorar APIs externas y cross-origin
  if (url.origin !== location.origin) {
    return;
  }

  // STRATEGY: HTML + JS = NETWORK FIRST (siempre descarga nuevo, fallback cache)
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname === '/') {
    ev.respondWith(
      fetch(ev.request)
        .then((response) => {
          // Cachear si tiene éxito
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put(ev.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline: devolver versión cacheada
          console.log('[SW] Offline, using cached:', url.pathname);
          return caches.match(ev.request).then((cached) => {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // STRATEGY: CSS/Assets = Cache first (usa cache, fallback a network)
  ev.respondWith(
    caches.match(ev.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(ev.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(ev.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});

// Push — mostrar notificación sin payload
self.addEventListener('push', (ev) => {
  console.log('[SW] Push recibido');

  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const horaActual = `${horas}:${minutos}`;

  const horarios = {
    '08:30': '⏰ Hora de despertar',
    '09:20': '🏋️ Alista, entrena a las 9:30',
    '10:30': '🥤 Batido post-entreno',
    '13:30': '🍚 Almuerzo',
    '19:00': '🍲 Cena',
    '20:00': '🔪 Batch cooking'
  };

  const mensaje = horarios[horaActual] || 'Recetario';

  ev.waitUntil(
    self.registration.showNotification('◆ SISTEMA', {
      body: mensaje,
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect fill="%23050810"/><text x="50%" y="50%" font-size="80" fill="%234da6ff" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-weight="bold">◆</text></svg>',
      tag: 'recetario-notif',
      requireInteraction: false
    })
  );
});

// Notification click
self.addEventListener('notificationclick', (ev) => {
  ev.notification.close();
  ev.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./');
    })
  );
});

// Message desde la app
self.addEventListener('message', (ev) => {
  if (ev.data && ev.data.type === 'show-notification') {
    self.registration.showNotification(ev.data.title, {
      body: ev.data.body,
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect fill="%23050810"/><text x="50%" y="50%" font-size="80" fill="%234da6ff" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-weight="bold">◆</text></svg>',
      tag: 'recetario-timer'
    });
  }
});
