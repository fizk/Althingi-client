const cacheName = `pwa-version-${VERSION}`;
const appShellFiles = [
    '/',
    '/bundle.js',
    '/bundle.css',
];

self.addEventListener('install', (event: any) => {
    console.log('[Service Worker] Install');
    event.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(appShellFiles);
    })());
});

self.addEventListener('fetch', (event: any) => {
    event.respondWith((async () => {
        console.log(event.request.headers, event.request.method, event.request.mode);
        const r = await caches.match(event.request);
        console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
        if (r) { return r; }
        const response = await fetch(event.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
        cache.put(event.request, response.clone());
        return response;
    })());
});
