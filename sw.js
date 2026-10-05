const CACHE='ultra-central-v2-2.0.0';
const CORE=['./','./index.html','./styles.css','./config.js','./scenarios.js','./app.js','./lib/storage.js','./lib/csv.js','./lib/analytics.js','./lib/copilot.js','./assets/ultra-logo.png','./assets/ultra-icon.png','./assets/rd-conversas.png','./assets/rd-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>caches.match('./index.html'))));
});
