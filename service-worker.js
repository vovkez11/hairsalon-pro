// Service Worker for HairSalon Pro - Enhanced Version
const CACHE_NAME = 'hairsalon-pro-v7';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

self.addEventListener('install', event => {
  console.log('🟢 Service Worker: Installing...', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🟢 Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('🟢 Service Worker: Installation complete - skipping wait');
        return self.skipWaiting();
      })
      .catch(error => {
        console.log('❌ Service Worker: Installation failed', error);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('🟢 Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🟢 Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('🟢 Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Network-first strategy for HTML files to get latest updates
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response
          const responseClone = response.clone();
          
          // Update cache with new version
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          
          return response;
        })
        .catch(() => {
          // If network fails, serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first strategy for other resources
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Check if cache is expired
          const cacheDate = response.headers.get('date');
          if (cacheDate) {
            const age = Date.now() - new Date(cacheDate).getTime();
            if (age > CACHE_EXPIRATION) {
              console.log('🟢 Service Worker: Cache expired, fetching fresh', event.request.url);
              // Cache expired, fetch new version
              return fetch(event.request).then(fetchResponse => {
                // Update cache with new version
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, fetchResponse.clone());
                });
                return fetchResponse;
              }).catch(() => response); // Fallback to old cache if network fails
            }
          }
          
          console.log('🟢 Service Worker: Serving from cache', event.request.url);
          return response;
        }

        console.log('🟢 Service Worker: Fetching from network', event.request.url);
        return fetch(event.request).then(fetchResponse => {
          // Don't cache if not a valid response
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type === 'error') {
            return fetchResponse;
          }
          
          // Cache the new resource
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
          });
          
          return fetchResponse;
        });
      })
      .catch(error => {
        console.log('❌ Service Worker: Fetch failed', error);
      })
  );
});

// Handle messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle push notifications for upcoming appointments
self.addEventListener('push', event => {
  console.log('🟢 Service Worker: Push notification received');
  
  let data = {
    title: 'HairSalon Pro',
    body: 'You have an upcoming appointment',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png'
  };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }
  
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    vibrate: [200, 100, 200],
    tag: 'appointment-reminder',
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Appointment' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('🟢 Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/?section=upcoming')
    );
  }
});


