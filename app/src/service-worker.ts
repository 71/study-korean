export {};

declare const self: ServiceWorkerGlobalScope;

const CURRENT_CACHES = {
  assets: "assets-v1",
  db: "db-v1",
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
  const path = new URL(event.request.url).pathname;

  if (path.startsWith("kodata-") && path.endsWith(".rawproto")) {
    const promise = async function () {
      const cache = await caches.open(CURRENT_CACHES.db);
      const matched = await cache.match(event.request);

      if (matched !== undefined) {
        return matched;
      }

      const response = await fetch(event.request.clone());

      if (response.status < 400) {
        cache.put(event.request, response.clone());
      }

      return response;
    }();

    event.respondWith(promise);
  } else if (path.endsWith(".js") || path.endsWith(".css") || path.endsWith(".html")) {
    const promise = async function () {
      const cache = await caches.open(CURRENT_CACHES.db);
      const matched = await cache.match(event.request);

      if (matched !== undefined) {
        return matched;
      }

      const response = await fetch(event.request.clone());

      if (response.status < 400) {
        cache.put(event.request, response.clone());
      }

      return response;
    }();

    event.respondWith(promise);
  }
});
