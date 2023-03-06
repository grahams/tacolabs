/// <reference types="@fastly/js-compute" />

import { includeBytes } from "fastly:experimental";

// Load a static file as a Uint8Array at compile time.
// File path is relative to root of project, not to this file
const notfoundPage = includeBytes("./src/not-found.html");

const handler = async (event) => {
 // get the request from the client
 const req = event.request

 const backendResponse = await fetch(req, {
   backend: "vcl-origin",
   cacheOverride: new CacheOverride("pass")
 });

 // Handle 404s with a custom response
 if (backendResponse.status == 404) {
   return new Response(notfoundPage, {
     status: 404,
   });
 }

 // If status is not 404, send the backend response to the client
 if (backendResponse.status != 404) {
   // Add headers to the response back to the client
   backendResponse.headers.append("x-tacos", "🌮🌮🌮")
   return backendResponse;
 }
}

addEventListener("fetch", event => event.respondWith(handler(event)));

 