var cacheName = 'syn-virtualnursegenotropinin-cache';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('pfizervirtualnursengenin').then(function (cache) {
      return cache.addAll([
        './index.html',
        './assets/js/jquery-3.6.0.min.js',
        './assets/js/jquery-cookie.js',
        './pwa.js',
        './assets/css/pwa.css',
        './assets/css/fonts.css',
        './assets/icons/pwa_logo_48x48.png',
        './assets/icons/pwa_logo_72x72.png',
        './assets/icons/pwa_logo_96x96.png',
        './assets/icons/pwa_logo_144x144.png',
        './assets/icons/pwa_logo_192x192.png',
        './assets/icons/pwa_logo_512x512.png',
        './assets/icons/qr_instruction_land.png',
        './assets/icons/qr_instruction_port.png',
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("assets.adobedtm.com")) {
    return false;
  }
  if (event.request.url.includes("pfedev.report-uri.com")) {
    return false;
  }
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept")) {
          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/index.html");
          }
        } else {
          // nothing
        }
      });
    })
  );
});
