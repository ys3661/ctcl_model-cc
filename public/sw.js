/* CTCL Insight service worker — conservative offline support.
 * Network-first for page navigations (never serve stale HTML while online),
 * cache-first for hashed static assets, with an offline fallback to the home
 * page. Bump CACHE_VERSION to invalidate old caches on deploy. */
const CACHE_VERSION = "ctcl-insight-v1"
const OFFLINE_URL = "/"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.add(OFFLINE_URL))
      .catch(() => {}),
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  let url
  try {
    url = new URL(request.url)
  } catch {
    return
  }
  if (url.origin !== self.location.origin) return

  // Page navigations: network-first, fall back to cache then offline shell.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))),
    )
    return
  }

  // Static assets (hashed, so safe to cache-first).
  const isStatic =
    url.pathname.startsWith("/_next/static") ||
    ["style", "script", "font", "image"].includes(request.destination)

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            const copy = response.clone()
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy))
            return response
          })
          .catch(() => cached)
        return cached || network
      }),
    )
  }
})
