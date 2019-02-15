var cacheName='heni-test-1.0.0.1';
var filesToCache=[
    "./",
    "./shop.html"
];

self.addEventListener('install', function(e){
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function(event){
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}
