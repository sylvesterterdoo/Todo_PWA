// install service worker
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache-name-02").then(function (cache) {
      cache.addAll([
        "/",
        // "/index.html",
        // "/script.js",
        // "/sw.js",
        "/style.css",
        "/manifest.json",
        "/favicon.ico",
        "/smu-icon-192x192.png",
      ]);
    })
  );
});

// return cached response
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (res) {
      return res;
    })
  );
});
