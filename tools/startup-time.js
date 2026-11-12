// 시작 시간 측정: 느린 폰을 흉내(CPU 4배 느리게, 고속 3G급 네트워크)내어 첫 화면까지 걸리는 시간을 여러 번 재서 중앙값을 낸다
const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8768/index.html',N=+process.argv[3]||5,SLOW=process.argv[4]!=='fast';
(async()=>{const b=await chromium.launch();const rs=[];
 for(let i=0;i<N;i++){const c=await b.newContext({viewport:{width:390,height:844},ignoreHTTPSErrors:true}),p=await c.newPage();
  const cd=await c.newCDPSession(p);if(SLOW){await cd.send('Emulation.setCPUThrottlingRate',{rate:4});await cd.send('Network.enable');await cd.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8})}
  let reqs=0,bytes=0;p.on('response',async r=>{reqs++;try{bytes+=+(r.headers()['content-length']||0)}catch(e){}});
  const t0=Date.now();await p.goto(URL,{waitUntil:'commit'});
  await p.waitForFunction(()=>typeof T==='function'&&typeof cards==='function'&&document.querySelector('#cs,.h-top,#hqd'),null,{timeout:60000}).catch(()=>0);
  const ready=Date.now()-t0;
  const m=await p.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0],paint=Object.fromEntries(performance.getEntriesByType('paint').map(x=>[x.name,Math.round(x.startTime)]));return {dcl:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),fcp:paint['first-contentful-paint']}});
  rs.push({ready,reqs,bytes,...m});await c.close()}
 const med=k=>rs.map(r=>r[k]).sort((a,b)=>a-b)[Math.floor(rs.length/2)];
 console.log((SLOW?'느린 폰 흉내':'빠른 환경')+' · '+N+'회 중앙값:','화면 준비',med('ready')+'ms','/ 첫 표시(FCP)',med('fcp')+'ms','/ DOM 완료',med('dcl')+'ms','/ 로드 완료',med('load')+'ms','/ 요청',med('reqs')+'개');await b.close()})();
