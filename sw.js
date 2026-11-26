/* Service worker: застосунок відкривається без інтернету. */
const CACHE = 'fin-v3.14.0';
const SHELL = ['./', 'index.html', 'apple-touch-icon.png'];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET'  url.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then((res) => { const c = res.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)); return res; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r  caches.match('index.html'))));
});
