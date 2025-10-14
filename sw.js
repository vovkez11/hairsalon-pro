// Service Worker for Stylebook Pro - Fixed for GitHub Pages
const CACHE_NAME = 'stylebook-pro-v1.0.0';
const urlsToCache = [
  '/stylebook-pro/',
  '/stylebook-pro/index.html',
  '/stylebook-pro/manifest.json',
  '/stylebook-pro/assets/icons/icon-192.png',
  '/stylebook-pro/assets/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event
self.addEventListener('install', event => {
  console.log('🛠️ Service Worker installing for Stylebook Pro...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ All resources cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Cache failed:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker ready to control clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - Enhanced for GitHub Pages
self.addEventListener('fetch', event => {
  // Only handle same-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached version or fetch from network
          if (response) {
            console.log('📂 Serving from cache:', event.request.url);
            return response;
          }
          
          console.log('🌐 Fetching from network:', event.request.url);
          return fetch(event.request)
            .then(fetchResponse => {
              // Check if we received a valid response
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                return fetchResponse;
              }

              // Clone the response
              const responseToCache = fetchResponse.clone();

              // Add to cache for future visits
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return fetchResponse;
            })
            .catch(error => {
              console.error('❌ Fetch failed:', error);
              // You could return a custom offline page here
              return new Response('Network error happened', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' }
              });
            });
        })
    );
  }
  // For cross-origin requests (like fonts), let them go through normally
});

// Message handling
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
