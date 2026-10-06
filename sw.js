// v5.2 deliberately unregisters legacy service workers to avoid stale-code failures.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.registration.unregister().then(()=>self.clients.matchAll()).then(clients=>clients.forEach(c=>c.navigate(c.url)))));
