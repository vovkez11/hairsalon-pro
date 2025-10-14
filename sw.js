// Service Worker for Stylebook Pro
const CACHE_NAME = 'stylebook-pro-v1';
const urlsToCache = [
  '/stylebook-pro/',
  '/stylebook-pro/index.html',
  '/stylebook-pro/manifest.json',
  '/stylebook-pro/assets/icons/icon-192.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
