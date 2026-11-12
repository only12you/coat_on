const C='activity-v1',A=['./','index.html','material.js','manifest.webmanifest'];
self.oninstall=e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))))};
self.onactivate=e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
self.onfetch=e=>{if(e.request.method!='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin==location.origin){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))};
