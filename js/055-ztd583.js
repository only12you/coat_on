(function(){
const DN={rust:'녹',crack:'균열',peel:'박리',blis:'블리스터',chalk:'초킹',pinhole:'핀홀',crater:'크레이터링',hide:'은폐불량',sag:'흐름',cdev:'색분리',bub:'기포',dry:'건조불량',stain:'빗물자국',putty:'퍼티자국',wrink:'주름'};
const dn=k=>DN[k]||k,F=x=>Math.round(x).toLocaleString('en-US'),F1=x=>(Math.round(x*10)/10).toLocaleString('en-US'),pc=x=>Math.round(x*100);
const esc=v=>String(v==null?'':v).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const CS=['#cfe0fa','#a9c8f5','#7eabee','#5590e0','#2a78d6','#1d5cae'];/* 단일 색상 명도 단계 */
const ZC={R:'#d63a3a',O:'#e8780c',Y:'#d9a900',G:'#2e9d5b'},ZT={R:'3개월 내',O:'6개월 내',Y:'1년 내',G:'3년 내'};
const ic=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
const IC={env:'<path d="M12 3c-3.4 4.3-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-2.6-6.7-6-11z"/>',def:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M8 11h6"/>',ai:'<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 9h.01M15 9h.01M9 15h6M12 2v3M12 19v3"/>',db:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',lcc:'<path d="M5 20V11M10 20V4M15 20v-9M20 20v-5"/>',kpi:'<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>'};
let AI=null,AIP=false;
function loadAI(cb){if(AI){cb(AI);return}if(AIP)return;AIP=true;
 const done=r=>{AI=r;AIP=false;cb(r)};
 try{const q=indexedDB.open('lccds',1);q.onupgradeneeded=()=>{const d=q.result;if(!d.objectStoreNames.contains('rec'))d.createObjectStore('rec',{keyPath:'id'});if(!d.objectStoreNames.contains('ph'))d.createObjectStore('ph',{keyPath:'id'})};
  q.onsuccess=()=>{try{const g=q.result.transaction('rec').objectStore('rec').getAll();g.onsuccess=()=>{done(g.result||[])};g.onerror=()=>done([])}catch(e){done([])}};q.onerror=()=>done([])}catch(e){done([])}}
const jl=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
function rows(L,o){o=o||{};const mx=o.max||Math.max(1e-9,...L.map(x=>x.v));return L.map(x=>`<div class="ztdr" title="${esc(x.t||x.n)}"><span class="ztdn">${esc(x.n)}</span><span class="ztdb"><i style="width:${Math.max(x.v>0?2:0,Math.min(100,x.v/mx*100))}%;background:${x.c||o.c||'#2a78d6'}"></i></span><b>${x.l}</b></div>`).join('')}
function card(t,sub,i,body,id){return `<section class="ztdc" ${id?'id="'+id+'"':''}><div class="ztdh"><span class="ztdi">${ic(IC[i])}</span><div><b>${t}</b><small>${sub}</small></div></div>${body}</section>`}
const kpi=(l,v,u)=>`<div class="ztdk"><small>${l}</small><b>${v}<em>${u||''}</em></b></div>`;
const none=m=>`<div class="ztde">${m}</div>`;
function cEnv(X){const L=X.LC;if(!L)return none('LCC 자산 데이터를 불러오지 못했습니다');const RS=L.get(),as=RS.assets||[];if(!as.length)return none('등록된 자산이 없습니다');
 const cnt={},ar={};let tot=0,fp=0,zc={R:0,O:0,Y:0,G:0};
 as.forEach(a=>{try{const e=L.envI(a),r=L.all(a);cnt[e.eff]=(cnt[e.eff]||0)+1;ar[e.eff]=(ar[e.eff]||0)+(+a.ar||0);tot+=+a.ar||0;fp+=e.fp;zc[r.B.z]++}catch(x){}});
 const G=L.CK.map((k,i)=>({n:k+' '+L.CAT[k][0],v:cnt[k]||0,c:CS[Math.min(5,i)],l:(cnt[k]||0)+'개'+(tot?' · '+pc((ar[k]||0)/tot)+'%':''),t:k+' '+(cnt[k]||0)+'개 · 면적 '+F(ar[k]||0)+'㎡'}));
 const n=as.length,top=L.CK.slice().sort((a,b)=>(cnt[b]||0)-(cnt[a]||0))[0];
 const zt=['R','O','Y','G'].map(z=>`<span class="ztdz"><i style="background:${ZC[z]}"></i>${ZT[z]} <b>${zc[z]}</b></span>`).join('');
 return `<div class="ztdks">${kpi('평가 자산',n,'개')}${kpi('최다 환경등급',top||'-','')}${kpi('평균 환경 보정계수',F1(fp/n*100)/100,'')}</div><div class="ztdsub">부식환경(ISO 12944) 등급 분포 <small>(개수 · 면적 비중)</small></div>${rows(G,{max:Math.max(1,...Object.values(cnt))})}<div class="ztdsub">보수 시기 판정 분포</div><div class="ztdzr">${zt}</div>`}
function cDef(X){const H=X.H;if(!H.length)return none('저장된 진단 이력이 없습니다 · 현장진단을 저장하면 집계됩니다');
 const by={};let nm=0;H.forEach(r=>{Object.keys(r.items||{}).forEach(k=>{const i=r.items[k];if(!i||!(i.done!==undefined?i.done:(i.pct>0||i.man)))return;(by[k]=by[k]||{n:0,p:0,g:[0,0,0,0,0,0]});by[k].n++;by[k].p+=+i.pct||0;by[k].g[Math.min(5,+i.g||0)]++;nm++})});
 const ks=Object.keys(by).sort((a,b)=>by[b].n-by[a].n);if(!ks.length)return none('측정 완료된 결함 항목이 없습니다');
 const A=ks.map(k=>({n:dn(k),v:by[k].p/by[k].n,l:F1(by[k].p/by[k].n)+'% · '+by[k].n+'건',t:dn(k)+' 평균 면적비 '+F1(by[k].p/by[k].n)+'% ('+by[k].n+'건)'}));
 const gt=[0,0,0,0,0,0];ks.forEach(k=>by[k].g.forEach((v,i)=>gt[i]+=v));const T=gt.reduce((a,b)=>a+b,0)||1,LB=['없음','경미','약간','보통','심함','매우 심함'];
 const seg=gt.map((v,i)=>v?`<i style="flex:${v};background:${CS[i]}" title="${LB[i]} ${v}건 (${pc(v/T)}%)"></i>`:'').join('');
 const lg=gt.map((v,i)=>`<span class="ztdz"><i style="background:${CS[i]}"></i>${i} ${LB[i]} <b>${v}</b></span>`).join('');
 const mon={};H.forEach(r=>{const d=new Date(r.date);if(isNaN(d))return;const k=d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0');mon[k]=(mon[k]||0)+1});
 const mk=Object.keys(mon).sort().slice(-6),mm=Math.max(1,...mk.map(k=>mon[k]));
 const bars=mk.map(k=>`<div class="ztdv" title="${k} ${mon[k]}건"><b>${mon[k]}</b><i style="height:${Math.max(6,mon[k]/mm*54)}px"></i><span>${k.slice(2)}</span></div>`).join('');
 return `<div class="ztdks">${kpi('진단 이력',H.length,'건')}${kpi('측정 결함 항목',nm,'건')}${kpi('결함 종류',ks.length,'종')}</div><div class="ztdsub">결함 종류별 평균 면적비 <small>(%, 측정 건수)</small></div>${rows(A)}<div class="ztdsub">결함 등급 분포 <small>(0~5등급 · 전체 측정 ${T}건)</small></div><div class="ztdst">${seg}</div><div class="ztdzr">${lg}</div>${mk.length?`<div class="ztdsub">월별 진단 건수 <small>(최근 ${mk.length}개월)</small></div><div class="ztdvs">${bars}</div>`:''}`}
function cAI(X){const R=X.AIR;if(R==null)return none('AI 학습 데이터를 집계하는 중…');const M=X.M&&X.M.cls||{};
 const ok=R.filter(x=>x&&x.auto&&x.fin&&x.flags&&(x.flags.corrected||x.flags.confirmed||x.flags.man||x.flags.edited));
 const by={};ok.forEach(x=>{const b=(by[x.k]=by[x.k]||{n:0,h:0,h1:0,c:0});b.n++;const d=Math.abs((+x.auto.g||0)-(+x.fin.g||0));if(d==0)b.h++;if(d<=1)b.h1++;if(x.flags.corrected)b.c++});
 const ks=Object.keys(by).sort((a,b)=>by[b].n-by[a].n),N=ok.length,H=ks.reduce((a,k)=>a+by[k].h,0),H1=ks.reduce((a,k)=>a+by[k].h1,0),COR=ok.filter(x=>x.flags.corrected).length;
 const on=Object.keys(M).filter(k=>M[k]&&M[k].on).length;
 if(!N&&!Object.keys(M).length)return none('정답 데이터가 아직 없습니다 · 현장진단에서 ‘인식 결과가 맞습니다’ 또는 ‘인식 영역 수정’을 하면 적중률이 집계됩니다');
 const L=ks.map(k=>{const b=by[k],m=M[k];return {n:dn(k),v:b.n?b.h/b.n*100:0,c:'#2a78d6',l:pc(b.h/b.n)+'% · '+b.n+'건'+(m?(m.on?' · AI':' · 규칙'):''),t:dn(k)+' 적중 '+b.h+'/'+b.n+' (±1등급 포함 '+pc(b.h1/b.n)+'%)'}});
 const mt=Object.keys(M).filter(k=>M[k]&&M[k].iou!=null).map(k=>({n:dn(k),v:M[k].iou*100,c:'#1baf7a',l:'IoU '+(+M[k].iou).toFixed(2)+(M[k].ri!=null?' (규칙 '+(+M[k].ri).toFixed(2)+')':''),t:dn(k)+' 검증 IoU '+M[k].iou}));
 return `<div class="ztdks">${kpi('정답 데이터',N,'건')}${kpi('AI 적중률',N?pc(H/N):'-',N?'%':'')}${kpi('적용 중 모델',on,'종')}</div>${N?`<div class="ztdnote">적중 = AI·규칙이 낸 결함 등급이 전문가 확정(수정·확인) 등급과 같은 경우. ±1등급 이내 포함 ${pc(H1/N)}% · 전문가 수정률 ${pc(COR/N)}%</div><div class="ztdsub">결함 종류별 적중률 <small>(%, 정답 건수 · 적용 방식)</small></div>${rows(L,{max:100})}`:''}${mt.length?`<div class="ztdsub">학습 모델 검증 정확도 <small>(IoU, 높을수록 정확)</small></div>${rows(mt,{max:100})}`:''}`}
function cDb(X){const Y=X.Y,P=X.P;if(!Y.length&&!P.length)return none('사양·제품 DB가 비어 있습니다');
 const env={},sub={};let dft=0,dn_=0,life=0,ln=0;Y.forEach(x=>{if(x.env)env[x.env]=(env[x.env]||0)+1;if(x.sub)sub[x.sub]=(sub[x.sub]||0)+1;const t=(x.items||[]).reduce((a,c)=>a+(+c.dft||0)*(+c.cnt>1?Math.round(+c.cnt):1),0);if(t>0){dft+=t;dn_++}if(+x.life>0){life+=+x.life;ln++}});
 const E=['C2','C3','C4','C5','CX'].map((k,i)=>({n:k,v:env[k]||0,c:CS[Math.min(5,i+1)],l:(env[k]||0)+'건'})),S=Object.keys(sub).map(k=>({n:k,v:sub[k],l:sub[k]+'건'}));
 const mf={};P.forEach(p=>{const m=(p.mf||'미상').trim()||'미상';mf[m]=(mf[m]||0)+1});const MF=Object.keys(mf).sort((a,b)=>mf[b]-mf[a]).slice(0,5).map(k=>({n:k,v:mf[k],l:mf[k]+'종'}));
 const tds=P.filter(p=>p.dry||p.pot||p.dsrc||p.url).length;
 return `<div class="ztdks">${kpi('사양 DB',Y.length,'건')}${kpi('평균 총 DFT',dn_?F(dft/dn_):'-',dn_?'㎛':'')}${kpi('평균 내구연한',ln?F1(life/ln):'-',ln?'년':'')}</div>${Y.length?`<div class="ztdsub">사양 환경등급 분포</div>${rows(E)}${S.length?`<div class="ztdsub">적용 대상별 사양</div>${rows(S)}`:''}`:''}<div class="ztdks" style="margin-top:10px">${kpi('제품 DB',P.length,'종')}${kpi('TDS 보유',P.length?pc(tds/P.length):'-',P.length?'%':'')}${kpi('제조사',Object.keys(mf).length,'곳')}</div>${MF.length?`<div class="ztdsub">제조사별 제품 수 <small>(상위 5)</small></div>${rows(MF)}`:''}`}
function cLcc(X){const L=X.LC;if(!L)return none('LCC 데이터를 불러오지 못했습니다');const RS=L.get(),as=RS.assets||[];if(!as.length)return none('등록된 자산이 없습니다');
 const T=[0,0,0];let ar=0;as.forEach(a=>{try{const r=L.all(a);r.m.forEach((m,j)=>T[j]+=m.tot);ar+=+a.ar||0}catch(x){}});
 const mx=Math.max(1,...T),CC=['#64748b','#2563eb','#16a34a'];
 const R=L.RN.map((n,j)=>({n,v:T[j],c:CC[j],l:F(T[j]/1000)+'백만원',t:n+' LCC '+F(T[j]*1000)+'원'}));
 const best=T.indexOf(Math.min(...T)),sv=T[0]>0?(T[0]-T[best])/T[0]:0;
 return `<div class="ztdks">${kpi('평가기간',RS.hz,'년')}${kpi('총 면적',F(ar),'㎡')}${kpi('최저 LCC',L.RN[best],'')}</div><div class="ztdsub">사양별 총 LCC <small>(전체 자산 합계 · ${RS.hz}년)</small></div>${rows(R,{max:mx})}<div class="ztdnote">${best==0?'현재 도장사양이 가장 낮은 LCC입니다.':'‘'+L.RN[best]+'’이 도장사양 대비 <b>'+pc(sv)+'%</b> ('+F((T[0]-T[best])/1000)+'백만원) 절감됩니다.'}</div>`}
function build(){
 const X={LC:window.LCCX&&LCCX.envI?LCCX:null,H:jl('lcci:h',[]),M:jl('lcci:mdl',null),AIR:AI,Y:(()=>{try{return syLibGet()}catch(e){return []}})(),P:(()=>{try{return DB||[]}catch(e){return []}})()};
 const as=X.LC?(X.LC.get().assets||[]):[],n=as.length,ar=as.reduce((a,x)=>a+(+x.ar||0),0);
 const sum=`<div class="ztdks ztdk6">${kpi('자산',n,'개')}${kpi('총 면적',F(ar),'㎡')}${kpi('진단 이력',X.H.length,'건')}${kpi('AI 정답',X.AIR?X.AIR.filter(x=>x&&x.flags&&(x.flags.corrected||x.flags.confirmed)).length:'…','건')}${kpi('사양 DB',X.Y.length,'건')}${kpi('제품 DB',X.P.length,'종')}</div>`;
 return `<div id="ztd" class="ztd"><div class="ztdth"><div><b>데이터 통계 대시보드</b><small>프로그램에 저장된 자산·진단·AI·사양·제품 데이터를 집계합니다</small></div><button type="button" onclick="lstRefresh()">새로고침</button></div>${sum}`
  +card('부식환경(ISO 12944) 평가 통계','자산별 환경등급과 보수 시기','env',cEnv(X),'ztd-env')
  +card('도막결함 측정 통계','현장진단 이력 기준 결함 종류·등급·월별 건수','def',cDef(X),'ztd-def')
  +card('AI 학습 · 적중률','AI·규칙 판정과 전문가 확정 등급 비교','ai',cAI(X),'ztd-ai')
  +card('사양 · 제품 DB 통계','환경등급·대상·도막두께·제조사 분포','db',cDb(X),'ztd-db')
  +card('LCC 비용 비교','사양별 생애주기비용 합계','lcc',cLcc(X),'ztd-lcc')+'</div>'}
function mount(){const e=document.getElementById('v9');if(!e||document.body.dataset.pg!='9')return;if(!window.LCCX||!LCCX.get)return;if(LCCX.get().tab!=0){const o=document.getElementById('ztd');if(o)o.remove();return}
 if(document.getElementById('ztd'))return;e.insertAdjacentHTML('beforeend',build());
 loadAI(()=>{const a=document.getElementById('ztd-ai');if(a){const X={AIR:AI,M:jl('lcci:mdl',null)};const b=a.querySelector('.ztdh');a.innerHTML=b.outerHTML+cAI(X);const k=document.querySelector('#ztd .ztdk6 .ztdk:nth-child(4) b');if(k)k.firstChild.nodeValue=AI.filter(x=>x&&x.flags&&(x.flags.corrected||x.flags.confirmed)).length}})}
window.lstRefresh=function(){AI=null;const o=document.getElementById('ztd');if(o)o.remove();mount()};
let t=0;const q=()=>{clearTimeout(t);t=setTimeout(mount,120)};
try{new MutationObserver(q).observe(document.getElementById('v9'),{childList:true})}catch(e){}
document.addEventListener('DOMContentLoaded',q);setTimeout(q,800);
})();
