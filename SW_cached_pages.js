const cacheName = 'v1';

const cachedAssets = ['index.html', 'about.html', 'index.css', 'script.js'];

//Call install event
self.addEventListener('install', (e) => {
  console.log('Service worker installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service worker : caching files');
        cache.addAll(cachedAssets);
      })
      .then(() => self.skipWaiting())
  );
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

  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
