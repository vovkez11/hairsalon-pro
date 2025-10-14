// Service Worker for HairSalon Pro
const CACHE_NAME = 'hairsalon-pro-v5';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

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

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('🟢 Service Worker: Serving from cache', event.request.url);
          return response;
        }

        console.log('🟢 Service Worker: Fetching from network', event.request.url);
        return fetch(event.request);
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
