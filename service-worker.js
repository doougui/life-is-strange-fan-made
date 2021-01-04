var dataCacheName = 'life-is-strange';
var cacheName = 'life-is-strange';
var filesToCache = [
  '/',
 "./assets",
 "./assets/css",
 "./assets/css/normalize.css",
 "./assets/css/style.css",
 "./assets/css/secondary.css",
 "./assets/font",
 "./assets/font/Anton-Regular.ttf",
 "./assets/font/HankenGrotesk-Light.otf",
 "./assets/font/Oswald-Regular.ttf",
 "./assets/font/Poppins-Regular.ttf",
 "./assets/font/Poppins-Regular.ttf",
 "./assets/img",
 "./assets/img/max-storm4.jpg",
 "./assets/img/lis-before-the-storm.jpg",
 "./assets/img/captain-spirit.jpg",
 "./assets/img/life-is-strange-2.jpg",
 "./assets/img/facebook.png",
 "./assets/img/instagram.png",
 "./assets/img/twitter.png",
 "./assets/img/logo.png",
 "./assets/img/top.png",
 "./assets/img/rail.jpg",
 "./assets/img/max-character.jpg",
 "./assets/img/chloe-character.jpg",
 "./assets/img/rachel-character.jpg",
 "./assets/img/soundtrack.jpg",
 "./assets/img/icons",
 "./assets/img/icons/icon-128x128.png",
 "./assets/img/icons/icon-144x144.png",
 "./assets/img/icons/icon-152x152.png",
 "./assets/img/icons/icon-152x152.png",
 "./assets/img/icons/icon-192x192.png",
 "./assets/img/icons/icon-256x256.png",
 "./assets/js",
 "./assets/js/script.js",
 // "./.htaccess",
 "./favicon.ico",
 "./manifest.json",
 "./service-worker.js",
 "./index.html",
 "./before-the-storm.html",
 "./captain-spirit.html",
 "./life-is-strange-2.html"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
