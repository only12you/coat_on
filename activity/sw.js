const C='activity-v5',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-180.png'];
self.oninstall=e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))))};
self.onactivate=e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
self.onfetch=e=>{if(e.request.method!='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin==location.origin&&new URL(e.request.url).pathname.includes('/activity/')){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))};
