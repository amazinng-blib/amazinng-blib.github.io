const cacheName = 'v2';

//Call install event
self.addEventListener('install', (e) => {
  console.log('Service worker installed');
});

//Call Activate event
self.addEventListener('activate', (e) => {
  console.log('Service worker Activated');

  //   Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cachedNames) => {
      return Promise.all(
        cachedNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service worker clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event

self.addEventListener('fetch', (e) => {
  console.log('Service worker : Fetching');

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Make copy / clone of response
        const resClone = res.clone();
        // open cache
        caches.open(cacheName).then((cache) => {
          // Add the response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
