const CACHE_NAME = "my-pwa-sample-v1";

const CORE_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/favicon.ico",
    "/logo192.png",
    "/logo512.png",
    "/static/css/main.8cd4d566.css",
     "/static/css/453.ac4ac38echunk.js",
      "/static/css/main.74eec088.js"
];

//Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CORE_ASSETS);
        })
    );
    self.skipWaiting();
});

//Activate Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(
                names
                .filter((name) => name !== CACHE_NAME)
                .map((name) => caches.delete(name))
            )
        )    
    );
self.clients.claim();
});

//CACHE FIRST Strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) return cached;

    const netwrorkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return netwrorkResponse; 
}

//Network First Strategy
async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        const netwrorkResponse = await fetch(request);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch {
        return cache.match(request);
    }
}

//Fetch Handler
self.addEventListener("fetch", (event) => {
    const request = event.request;

    //HTML navigation
    if (request.mode === "navigate") {
        event.respondWith(networkFirst(request));
        return;
    }
    // Static assets
    event.respondWith(cacheFirst(request));
});