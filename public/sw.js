// Service Worker per Push Notifications
const CACHE_NAME = 'servizi-facili-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/favicon.ico'
];

// Installazione Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Attivazione Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Gestione richieste (cache-first strategy)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Ritorna dalla cache se disponibile
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Gestione Push Messages
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  let notificationData = {
    title: '🚀 Nuova Opportunità!',
    body: 'Una nuova opportunità di lavoro è disponibile',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'opportunity-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'Visualizza',
        icon: '/favicon.ico'
      },
      {
        action: 'dismiss',
        title: 'Ignora'
      }
    ]
  };

  // Se ci sono dati nel push message
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (e) {
      console.error('Errore parsing push data:', e);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Gestione click su notifiche
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click');
  
  event.notification.close();

  if (event.action === 'view') {
    // Apri l'app o vai alla pagina specifica
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Se l'app è già aperta, portala in primo piano
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // Altrimenti apri una nuova finestra
        if (clients.openWindow) {
          const url = event.notification.data?.url || '/';
          return clients.openWindow(url);
        }
      })
    );
  } else if (event.action === 'dismiss') {
    // Non fare nulla, la notifica è già chiusa
    console.log('Notifica ignorata');
  } else {
    // Click sulla notifica (non su un'azione)
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Gestione chiusura notifiche
self.addEventListener('notificationclose', (event) => {
  console.log('Service Worker: Notification closed');
  // Tracking analytics se necessario
});