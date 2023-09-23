export {};

declare const self: ServiceWorkerGlobalScope;

const CURRENT_CACHES = {
  assets: "assets-v1",
  db: "db-v1",
};

const fetchFromCache = async (cacheName: keyof typeof CURRENT_CACHES, request: Request) => {
  const cache = await caches.open(cacheName);
  const matched = await cache.match(request);

  if (matched !== undefined) {
    return matched;
  }

  const response = await fetch(request.clone());

  if (response.status < 400) {
    cache.put(request, response.clone());
  }

  return response;
};

self.addEventListener("activate", (event) => {
  // Delete all caches not in `CURRENT_CACHES`.
  const currentCacheNames = new Set(Object.values(CURRENT_CACHES));

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCacheNames.has(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  const path = requestUrl.pathname;

  if (path.startsWith("kodata-") && path.endsWith(".rawproto")) {
    event.respondWith(fetchFromCache("db", event.request));
  } else if (/^\/[\w-\.]+\.[a-z]+$/.test(path) || requestUrl.host !== location.host) {
    event.respondWith(fetchFromCache("assets", event.request));
  } else {
    // Handle requests to `/`, `/s/안녕/`, `/s/안녕/1`, etc.
    event.respondWith(fetchFromCache("assets", new Request(new URL("/index.html", event.request.url))));
  }
});
