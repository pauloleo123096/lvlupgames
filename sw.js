// The name of your cache. Update the version number if you make major changes to your HTML.
const CACHE_NAME = 'lvlup-spinner-v1';

// The exact files the service worker needs to save for offline use.
const urlsToCache = [
  './spinner.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. INSTALL PHASE: When the app is first loaded, cache all the necessary files.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. FETCH PHASE: When the app requests a file, check the cache first.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it instantly.
        if (response) {
          return response;
        }
        // If it's not in the cache, fetch it from the network normally.
        return fetch(event.request);
      })
  );
});

// 3. ACTIVATE PHASE: Clean up old caches if the CACHE_NAME version changes.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
