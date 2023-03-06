/// <reference types="@fastly/js-compute" />

function handler(event) {
  return fetch(event.request, {
    backend: "vcl-origin",
    cacheOverride: new CacheOverride("pass")
  });
 }
 
 addEventListener("fetch", event => event.respondWith(handler(event)));
 