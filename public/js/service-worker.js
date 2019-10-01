self.addEventListener("activate", function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(
          keyList.map(function(key) {
            if (key !== cacheName) {
              return caches.delete(key);
            }
          })
        );
      })
    );
    return self.clients.claim();
  });