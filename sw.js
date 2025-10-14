// Service Worker for HairSalon Pro
const CACHE_NAME = 'hairsalon-pro-v1';
const urlsToCache = [
  '/hairsalon-pro/',
  '/hairsalon-pro/index.html',
  '/hairsalon-pro/manifest.json',
  '/hairsalon-pro/sw.js',
  '/hairsalon-pro/assets/icons/icon-192.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
