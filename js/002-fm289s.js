/* 충진·메쉬 소요량 (SmartCost 스타일) — 제조사 비종속: 직접 입력 또는 데이터시트 첨부 */
const FD={tab:'fill',mode:'j',dm:'in',loss:10,pk:300,pu:'mL',pn:'카트리지',packs:[],sg:'',pname:'',pmaker:'',price:0,rodp:0,tapep:0,dsmsg:'',
 parts:[],dia:0,
 mesh:{dm:'in',src:'h',man:[{nm:'수기1',w:'',l:'',q:1,a:''}],name:'NEXWEB Mesh',open:'',gm:40,wr:1,lr:150,price:0,pu:'m²',ei:50,eo:50,ov:50,jb:100,mt:10,loss:10,mq:1,dsmsg:'',dia:0,mem:[{nm:'부재1',H:300,B:300,tw:10,tf:15,sz:3,l:6,q:10,z:{A:1}}]},
 hist:[]};
const FM=JSON.parse(JSON.stringify(FD));
try{const o=JSON.parse(localStorage['pqu:fm2']||'{}');Object.keys(o).forEach(k=>{if(k=='mesh')Object.assign(FM.mesh,o.mesh);else FM[k]=o[k]})}catch(e){}
try{if(!localStorage['pqu:fm316']){localStorage['pqu:fm316']=1;if(FM.parts.length<=1){FM.parts=[];fmSave()}}}catch(e){}
const fq=id=>document.getElementById(id),fn=(x,d=1)=>(+x||0).toLocaleString('ko-KR',{maximumFractionDigits:d}),esc2=t=>String(t==null?'':t).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
function fmSave(){try{localStorage['pqu:fm2']=JSON.stringify(FM)}catch(e){}}
const MS=()=>FM.mesh;
(function(){const M=FM.mesh;if(!M.gm&&!M.wr&&!M.lr){M.gm=40;M.wr=1;M.lr=150;if(!M.name)M.name='NEXWEB Mesh'}if(!M.src)M.src='h';if(!Array.isArray(M.man)||!M.man.length)M.man=[{nm:'수기1',w:'',l:'',q:1,a:''}]})();
const ICN={pen:'<path d="M14 4l6 6-9 9H5v-6z"/><path d="M12 6l6 6"/>',grid:'<path d="M8 3L6 21M18 3l-2 18M3 8h18M2 16h18"/>',doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',folder:'<path d="M3 6h6l2 2h10v11H3z"/>',calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',clip:'<path d="M20.5 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.8-8.8a3.3 3.3 0 0 1 4.7 4.7l-8.8 8.8a1.7 1.7 0 0 1-2.4-2.4l8-8"/>',chev:'<path d="M9 6l6 6-6 6"/>',won:'<path d="M5 8l3 10 4-8 4 8 3-10M3 12h18"/>',bars:'<path d="M5 20V10M12 20V4M19 20v-7"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',leaf:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c3-5 6-8 10-10"/>',drop:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',box:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',area:'<path d="M4 4h16v16H4z"/><path d="M4 12h16M12 4v16"/>',roll:'<rect x="4" y="6" width="14" height="12" rx="6"/><path d="M18 12h2"/>',reset:'<path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICN[n]}</svg>`;
const FSV={j:'<svg viewBox="0 0 220 124"><rect x="8" y="28" width="54" height="66" fill="#d3d1c7"/><rect x="158" y="28" width="54" height="66" fill="#d3d1c7"/><rect x="62" y="28" width="96" height="34" fill="#a9c8f8"/><circle cx="110" cy="77" r="12" fill="#f1efe8" stroke="#999"/><g class="hw"><path d="M62 18H158M62 14v8M158 14v8"/><text x="110" y="11">폭 W</text></g><g class="hd"><path d="M70 29V61M66 29h8M66 61h8"/><text x="76" y="49" style="text-anchor:start">깊이 D</text></g><g class="hl"><path d="M14 106H206M14 102v8M206 102v8"/><text x="110" y="120">길이 L</text></g></svg>',
 f:'<svg viewBox="0 0 220 124"><rect x="8" y="70" width="204" height="30" fill="#d3d1c7"/><rect x="8" y="20" width="40" height="50" fill="#d3d1c7"/><path d="M48 70V32L86 70z" fill="#a9c8f8"/><g class="hw"><path d="M52 70H86M52 66v8M86 66v8"/><text x="69" y="86">변 a</text></g><g class="hl"><path d="M14 108H206M14 104v8M206 104v8"/><text x="110" y="121">길이 L</text></g></svg>',
 a:'<svg viewBox="0 0 220 124"><rect x="8" y="70" width="204" height="30" fill="#d3d1c7"/><rect x="8" y="40" width="204" height="30" fill="#a9c8f8"/><g class="hd"><path d="M196 41V69M192 41h8M192 69h8"/><text x="190" y="58" style="text-anchor:end">두께 t</text></g><g class="hl"><path d="M14 112H206M14 108v8M206 108v8"/><text x="110" y="30">충진 면적 (길이 × 폭)</text></g></svg>'};
/* ---------- 공통 입력 ---------- */
const ri=(lab,val,on,u,ph)=>`<label class="sr"><span>${lab}</span><i><input type="number" inputmode="decimal" step="any" value="${val??''}" placeholder="${ph||''}" oninput="${on}">${u?'<b>'+u+'</b>':''}</i></label>`;
const rt=(lab,val,on,ph)=>`<label class="sr"><span>${lab}</span><i><input type="text" value="${esc2(val)}" placeholder="${ph||''}" oninput="${on}"></i></label>`;
const rs=(lab,opts,val,on)=>`<label class="sr"><span>${lab}</span><i><select onchange="${on}">${opts.map(([v,t])=>`<option value="${v}"${v==val?' selected':''}>${t}</option>`).join('')}</select></i></label>`;
function fmSet(k,v){FM[k]=v;fmSave();fmOut()}
function fmMs(k,v){const M=MS();M[k]=v;if(k=='price'){}else if(+M.rp>0&&(k=='rp'||k=='pu'||k=='wr'||k=='lr')){const a=(+M.wr||0)*(+M.lr||0);M.price=M.pu=='롤'?+M.rp:(a>0?Math.round(M.rp/a):M.price)}fmSave();fmOut()}
function fmMPrice(v){const M=MS();M.price=v;M.rp='';fmSave();fmOut()}
function fmPart(i,k,v){FM.parts[i][k]=v;fmSave();fmOut()}
function fmAddPart(){const e=fq('fmnp'),nm=(e&&e.value.trim())||'부위'+(FM.parts.length+1);FM.parts.push({nm,w:10,d:10,l:10,q:1,lo:10});fmSave();fmRender()}
function fmHi(k){const e=fq('fpv');if(e)e.className='fpv'+(k?' f-'+k:'')}
function fmAct(i){if(FM.fpi!==i){FM.fpi=i;const p=fq('fpv');if(p)p.innerHTML=fmPrev()}}
function fmDelPart(i){FM.parts.splice(i,1);fmSave();fmRender()}
function fmTab(t){FM.tab=t;fmSave();fmRender();window.scrollTo&&0}
function fmMode(m){FM.mode=m;fmSave();fmRender()}
function fmDm(w,v){if(w=='fill')FM.dm=v;else MS().dm=v;fmSave();fmRender()}
function fmFold(k){FM[k]=FM[k]?0:1;fmSave();fmRender()}
const recD=w=>w<=0?0:w<12?6:w<=25?+(w/2).toFixed(1):13;
/* ---------- 충진 계산 ---------- */
function fmPv(){const v=+FM.pk||0;return FM.pu=='mL'?v:FM.pu=='L'?v*1000:(+FM.sg>0?v/FM.sg*1000:0)}
function cF(){const pv=fmPv();let V=0,Vt=0,area=0,rod=0,tape=0;const ln=[];
 FM.parts.forEach(r=>{const q=+r.q||1,w=+r.w||0,d=+r.d||0,l=+r.l||0,lo=1+(+(r.lo==null?FM.loss:r.lo)||0)/100;let v=0,x='';
  if(FM.mode=='j'){v=w*d*l*q;area+=l*(w+2*d)/1000*q;rod+=l*q;tape+=2*l*q;x=`${fn(w,2)} × ${fn(d,2)} × ${fn(l,2)}${q>1?' × '+q:''}`}
  else if(FM.mode=='f'){v=w*w/2*l*q;area+=l*2*w/1000*q;tape+=2*l*q;x=`(${fn(w,2)}² ÷ 2) × ${fn(l,2)}${q>1?' × '+q:''}`}
  else if(FM.mode=='c'){v=Math.PI*w*w*l*q;area+=l*Math.PI*w/1000*q;x=`π × ${fn(w,2)}² × ${fn(l,2)}${q>1?' × '+q:''}`}
  else if(FM.mode=='m'){v=w*l*q;area+=l*q*0;x=`${fn(w,2)} mm² × ${fn(l,2)}${q>1?' × '+q:''}`}
  else{v=l*d*1000*q;area+=l*q;x=`${fn(l,2)} m² × ${fn(d,2)} mm × 1,000${q>1?' × '+q:''}`}
  V+=v;Vt+=v*lo;ln.push([r.nm,x,v,lo])});
 const L=V>0?Vt/V:1,n=pv>0?Math.ceil(Vt/pv-1e-9):0;return{L,pv,V,Vt,n,area,rod,tape,ln}}
/* ---------- 메쉬 계산 ---------- */
const FMZ={A:['플랜지 끝단',4],B:['웨브-플랜지 접합부',4],C:['플랜지 외면',2],D:['플랜지 내면',4],E:['웨브 양면',2]};
const FMHB=[['H-150×150×7×10',150,150,7,10],['H-200×200×8×12',200,200,8,12],['H-250×250×9×14',250,250,9,14],['H-300×300×10×15',300,300,10,15],['H-350×350×12×19',350,350,12,19],['H-400×400×13×21',400,400,13,21],['H-300×150×6.5×9',300,150,6.5,9],['H-400×200×8×13',400,200,8,13],['H-500×200×10×16',500,200,10,16],['H-600×200×11×17',600,200,11,17]];
function fmZw(m,k){const M=MS(),tf=+m.tf||0,B=+m.B||0,tw=+m.tw||0,H=+m.H||0;return k=='A'?(+M.ei||0)+tf+(+M.eo||0)+(+M.mt||0):k=='B'?(+M.jb||0):k=='C'?B:k=='D'?Math.max(0,(B-tw)/2):Math.max(0,H-2*tf)}
function cM(){const M=MS(),wr=+M.wr,lr=+M.lr,L=1+(+M.loss||0)/100,mq=+M.mq||1;let A=0,len=0,need=0,warn='';const lines=[];
 if(M.src=='m')(M.man||[]).forEach(m=>{const q=(+m.q||1)*mq,w=+m.w||0,l=+m.l||0,ad=+m.a||0;if(ad>0){const ln=wr>0?ad/wr:0;A+=ad*q;len+=ln*q;lines.push({m:m.nm,k:'수기',w:wr*1000,ln:ln*q,a:ad*q});if(wr>0&&lr>0)need+=ad*q*L/wr;return}if(!(w>0&&l>0))return;let ln=l*q;if(lr>0)ln+=((Math.ceil(l/lr-1e-9)-1)*q)*(+M.ov||0)/1000;const a=ln*w/1000;len+=ln;A+=a;lines.push({m:m.nm,k:'수기',w,ln,a});if(wr>0&&lr>0){const sw=Math.floor(wr*1000/w);if(sw<1)warn='롤 폭('+fn(wr,2)+'m)이 띠 폭('+fn(w,0)+'mm)보다 좁습니다';else need+=ln*L/sw}});
 else M.mem.forEach(m=>{const q=(+m.q||1)*mq,l=+m.l||0;Object.keys(FMZ).forEach(k=>{if(!(m.z&&m.z[k]))return;const w=fmZw(m,k),n=FMZ[k][1];if(!(w>0))return;let ln=l*q*n;if(lr>0)ln+=((Math.ceil(l/lr-1e-9)-1)*n*q)*(+M.ov||0)/1000;const a=ln*w/1000;len+=ln;A+=a;lines.push({m:m.nm,k,w,ln,a});if(wr>0&&lr>0){const s=Math.floor(wr*1000/w);if(s<1)warn='롤 폭('+fn(wr,2)+'m)이 띠 폭('+fn(w,0)+'mm)보다 좁습니다';else need+=ln*L/s}})});
 const rolls=wr>0&&lr>0&&!warn&&need>0?Math.ceil(need/lr-1e-9):0;return{L,A,At:A*L,len,lines,rolls,warn,wr,lr}}
function fmZ(i,k){const m=MS().mem[i];m.z=m.z||{};m.z[k]=m.z[k]?0:1;fmSave();fmRender()}
function fmZset(i,mode){const m=MS().mem[i];m.z=mode=='all'?{A:1,B:1,C:1,D:1,E:1}:{};fmSave();fmRender()}
function fmSize(i,v){const m=MS().mem[i];if(v!='x'){const p=FMHB[+v];m.H=p[1];m.B=p[2];m.tw=p[3];m.tf=p[4];m.sz=+v}else m.sz='x';fmSave();fmRender()}
function fmMem(i,k,v){MS().mem[i][k]=v;fmSave();fmOut()}
function fmMemDim(i,k,v){const m=MS().mem[i];m[k]=v;m.sz='x';fmSave();{const z=document.querySelector('.sz[data-i="'+i+'"] .szs');if(z)z.innerHTML=fmShape(m,i);const f=document.activeElement;if(f&&f.id==='md'+i+k)fmMHi(i,k);const c=document.querySelector('.sz[data-i="'+i+'"] .gchip[data-k="'+k+'"] em');if(c)c.textContent=v||'-'}fmOut()}
function fmAddMem(){const M=MS();M.mem.push({nm:'부재'+(M.mem.length+1),H:300,B:300,tw:10,tf:15,sz:3,l:6,q:1,z:{A:1}});fmSave();fmRender()}
function fmDelMem(i){const M=MS();if(M.mem.length>1){M.mem.splice(i,1);fmSave();fmRender()}}
function fmShape(m,i){const H=+m.H||250,B=+m.B||250,tw=+m.tw||9,tf=+m.tf||14,s=Math.min(118/H,132/B),w=B*s,h=H*s,x0=(200-w)/2,y0=(180-h)/2,tfs=Math.max(tf*s,5),tws=Math.max(tw*s,4),e=7,z=m.z||{};
 const c=k=>z[k]?'fill="#d85a30" opacity=".95"':'fill="#cfd6e4" opacity=".6" stroke="#8a97ad" stroke-width=".6" stroke-dasharray="2 1.5"',R=(k,x,y,ww,hh)=>`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(ww,2).toFixed(1)}" height="${Math.max(hh,2).toFixed(1)}" ${c(k)} style="cursor:pointer" onclick="fmZ(${i},'${k}')"/>`,wx=x0+(w-tws)/2,half=(w-tws)/2,f=n=>n.toFixed(1);
 const tx=(x,y,t)=>`<text x="${f(x)}" y="${f(y)}" font-size="9" fill="#14213d" font-weight="700">${t}</text>`;
 const G='#1f9d55',GF='rgba(31,157,85,.28)',ln=(x1,y1,x2,y2)=>`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${G}" stroke-width="1.4"/>`,
  lb=(x,y,t)=>`<text x="${f(x)}" y="${f(y)}" font-size="10" fill="${G}" font-weight="800" text-anchor="middle" paint-order="stroke" stroke="#fff" stroke-width="3">${t}</text>`,
  ap=(x,y,d)=>d=='v'?`<path d="M${f(x-3)} ${f(y)}h6" stroke="${G}" stroke-width="1.4"/>`:`<path d="M${f(x)} ${f(y-3)}v6" stroke="${G}" stroke-width="1.4"/>`,
  xh=x0-e-11,xr=x0+w+e+14,yb=y0+h+e+10,ym=y0+h/2;
 const gH=`<g class="gd" data-k="H">${ln(xh-3,y0,x0+w,y0)}${ln(xh-3,y0+h,x0+w,y0+h)}${ln(xh,y0,xh,y0+h)}${ap(xh,y0,'v')}${ap(xh,y0+h,'v')}${lb(xh,ym+3,'H')}</g>`,
  gB=`<g class="gd" data-k="B">${ln(x0,y0+h,x0,yb+3)}${ln(x0+w,y0+h,x0+w,yb+3)}${ln(x0,yb,x0+w,yb)}${ap(x0,yb,'h')}${ap(x0+w,yb,'h')}${lb(x0+w/2,yb-3,'B')}</g>`,
  gw=`<g class="gd" data-k="tw"><rect x="${f(wx)}" y="${f(y0+tfs)}" width="${f(tws)}" height="${f(h-2*tfs)}" fill="${GF}" stroke="${G}" stroke-width="1.2"/>${ln(wx-4,ym,wx+tws+4,ym)}${ap(wx,ym,'h')}${ap(wx+tws,ym,'h')}${lb(wx+tws+e+9,ym+3,'tw')}</g>`,
  gf=`<g class="gd" data-k="tf"><rect x="${f(x0)}" y="${f(y0)}" width="${f(w)}" height="${f(tfs)}" fill="${GF}" stroke="${G}" stroke-width="1.2"/><rect x="${f(x0)}" y="${f(y0+h-tfs)}" width="${f(w)}" height="${f(tfs)}" fill="${GF}" stroke="${G}" stroke-width="1.2"/>${ln(xr,y0,xr,y0+tfs)}${ap(xr,y0,'v')}${ap(xr,y0+tfs,'v')}${lb(xr+2,y0+tfs+11,'tf')}</g>`;
 return `<svg viewBox="2 0 200 180" width="100%" preserveAspectRatio="xMidYMid meet"><g fill="#b4b2a9"><rect x="${f(x0)}" y="${f(y0)}" width="${f(w)}" height="${f(tfs)}"/><rect x="${f(x0)}" y="${f(y0+h-tfs)}" width="${f(w)}" height="${f(tfs)}"/><rect x="${f(wx)}" y="${f(y0+tfs)}" width="${f(tws)}" height="${f(h-2*tfs)}"/></g>
 <g class="gz">${R('A',x0-e,y0,e,tfs)}${R('A',x0+w,y0,e,tfs)}${R('A',x0-e,y0+h-tfs,e,tfs)}${R('A',x0+w,y0+h-tfs,e,tfs)}
 ${R('C',x0,y0-e,w,e)}${R('C',x0,y0+h,w,e)}
 ${R('D',x0,y0+tfs,half-9,e)}${R('D',wx+tws+9,y0+tfs,half-9,e)}${R('D',x0,y0+h-tfs-e,half-9,e)}${R('D',wx+tws+9,y0+h-tfs-e,half-9,e)}
 ${R('B',wx-8,y0+tfs,8,8)}${R('B',wx+tws,y0+tfs,8,8)}${R('B',wx-8,y0+h-tfs-8,8,8)}${R('B',wx+tws,y0+h-tfs-8,8,8)}
 ${R('E',wx-e,y0+tfs+9,e,h-2*tfs-18)}${R('E',wx+tws,y0+tfs+9,e,h-2*tfs-18)}
 ${tx(x0+w+e+2,y0+tfs/2+3,'A')}${tx(x0+w/2-3,y0-e-2,'C')}${tx(x0+w-half/2-4,y0+tfs+e+9,'D')}${tx(wx+tws+10,y0+tfs+18,'B')}${tx(wx-e-9,ym+3,'E')}</g>
 ${gH}${gB}${gf}${gw}</svg>`}
/* ---------- LOAD (데이터시트 / 저장 DB) ---------- */
let LD='',LDQ='';
const fmDB=()=>{try{return Array.isArray(DB)?DB:[]}catch(e){return[]}};
const fmPn=(v,u)=>u=='mL'?(v<=330?'카트리지':'소시지'):u=='L'?'말통':'통';
function fmParsePacks(p){const o=[];for(const m of String(p.pks||'').matchAll(/(\d+(?:\.\d+)?)\s*(ml|㎖|l|ℓ|리터|kg|㎏)/gi)){const u=/kg|㎏/i.test(m[2])?'kg':/ml|㎖/i.test(m[2])?'mL':'L',v=+m[1];if(!o.some(x=>x.v==v&&x.u==u))o.push({v,u,n:fmPn(v,u)})}if(!o.length&&+p.mk>0){const u=p.un=='kg'?'kg':'L';o.push({v:+p.mk,u,n:fmPn(+p.mk,u)})}return o}
function fmLoad(w,st){LD=st?w+':'+st:'';LDQ='';fmRender()}
function fmLq(v){LDQ=v;const e=fq('sldl');if(e)e.innerHTML=ldList(LD.split(':')[0])}
function fmFromDB(w,i){const p=fmDB()[i];if(!p)return;if(w=='fill'){FM.pname=p.n;FM.pmaker=p.mf||'';if(+p.sg>0)FM.sg=+p.sg;const k=fmParsePacks(p);if(k.length){FM.packs=k;FM.pk=k[0].v;FM.pu=k[0].u;FM.pn=k[0].n}FM.dsmsg='저장된 DB에서 불러왔습니다: '+p.n}else{MS().name=p.n;MS().maker=p.mf||'';MS().dsmsg='저장된 DB에서 불러왔습니다: '+p.n}LD='';fmSave();fmRender()}
function ldList(w){const q=LDQ.trim().toLowerCase(),db=fmDB();const r=db.map((p,i)=>[p,i]).filter(([p])=>!q||(p.n+' '+(p.mf||'')+' '+(p.g||'')).toLowerCase().includes(q)).slice(0,80);return r.length?r.map(([p,i])=>`<button class="sldi" onclick="fmFromDB('${w}',${i})"><b>${esc2(p.n)}</b><small>${esc2(p.mf||'')}${p.sg?' · 비중 '+p.sg:''}${p.pks?' · '+esc2(p.pks):''}</small></button>`).join(''):'<div class="sce">'+(db.length?'검색 결과가 없습니다.':'저장된 DB가 없습니다.')+'</div>'}
function ldSheet(){if(!LD)return'';const [w,st]=LD.split(':');const hasDb=fmDB().length>0;
 const card=(ico,t,sub,body)=>`<div class="bkc"><div class="bkh"><i>${ic(ico)}</i><div><b>${t}</b><small>${sub}</small></div></div><div class="bkb">${body}</div></div>`;
 return `<div class="sld bk" onclick="fmLoad('')"><div class="sldb" onclick="event.stopPropagation()"><div class="sldh"><b>첨부</b><button onclick="fmLoad('')">닫기</button></div>${st=='db'?card('folder','저장된 DB에서 선택','제품 DB에 저장된 제품을 불러옵니다',`<input class="sldq" placeholder="제품명·제조사 검색" oninput="fmLq(this.value)"><div id="sldl" class="sldl">${ldList(w)}</div><button class="bko" onclick="fmLoad('${w}','menu')">← 뒤로</button>`):card('clip','데이터시트 첨부','TDS PDF에서 제품 정보를 자동 입력',`<p>PDF에서 ${w=='fill'?'제품명·제조사·비중·포장 규격':'메쉬 규격·중량·롤 규격'}을 읽어 자동 입력합니다. TDS 원본은 저장되지 않습니다.</p><button class="bkp" onclick="fmLoad('');fmPickDs('${w}')">PDF 파일 선택</button>`)+card('folder','저장된 DB에서 선택',hasDb?'제품 DB에 저장된 제품을 불러옵니다':'저장된 제품이 없습니다',`<p>${hasDb?'제품 DB에 등록된 제품의 값을 그대로 가져옵니다.':'이 화면에서는 DB를 사용할 수 없습니다 (앱에서 사용).'}</p><button class="bko" ${hasDb?`onclick="fmLoad('${w}','db')"`:'disabled'}>DB에서 선택</button>`)}</div></div>`}
/* ---------- 데이터시트 첨부 ---------- */
function fmPickDs(w){let i=fq('fmdsf');if(!i){i=document.createElement('input');i.type='file';i.id='fmdsf';i.accept='application/pdf,.pdf';i.style.cssText='position:fixed;left:-9999px;opacity:0';document.body.appendChild(i)}i.value='';i.onchange=()=>{const f=i.files&&i.files[0];i.remove();if(f)fmReadDs(w,f)};i.click()}
const fmUnit=u=>/kg|㎏/i.test(u)?'kg':/ml|㎖/i.test(u)?'mL':'L';
async function fmReadDs(w,f){const set=m=>{(w=='fill'?FM:MS()).dsmsg=m;fmSave();fmRender()};
 if(typeof pdfLines!='function')return set('이 화면에서는 데이터시트 읽기를 사용할 수 없습니다. 직접 입력하세요.');
 set('데이터시트를 읽는 중…');let L=[];try{L=await pdfLines(f,null,false,true)}catch(e){return set('읽기 실패: 인터넷 연결(PDF 도구)을 확인하거나 직접 입력하세요.')}
 const T=L.join('\n'),got=[];
 let nm='';try{nm=(parseHead(L)||{}).name||''}catch(e){}if(!nm)nm=(L.find(x=>x.trim().length>1)||'').trim().slice(0,40);
 if(w=='fill'){let mk='';try{mk=parseMaker(L)||''}catch(e){}if(nm){FM.pname=nm;got.push('제품명')}if(mk){FM.pmaker=mk;got.push('제조사')}
  const sg=T.match(/비중[^\d\n]{0,14}(\d+(?:\.\d+)?)/);if(sg&&+sg[1]>0.3&&+sg[1]<5){FM.sg=+sg[1];got.push('비중')}
  const pk=[];L.filter(x=>/포장|용량|규격|packing|package|cartridge|카트리지|소시지|sausage|통/i.test(x)).forEach(x=>{for(const m of x.matchAll(/(\d+(?:\.\d+)?)\s*(ml|㎖|l|ℓ|리터|kg|㎏)(?![a-z])/gi)){const u=fmUnit(m[2]),v=+m[1];if(v>0&&!pk.some(p=>p.v==v&&p.u==u))pk.push({v,u,n:u=='mL'?(v<=330?'카트리지':'소시지'):u=='L'?'말통':'통'})}});
  if(pk.length){FM.packs=pk.slice(0,6);FM.pk=pk[0].v;FM.pu=pk[0].u;FM.pn=pk[0].n;got.push('포장 규격 '+pk.length+'개')}
  set(got.length?'불러온 항목: '+got.join(', ')+' — 확인 후 수정하세요.':'읽을 수 있는 항목을 찾지 못했습니다. 직접 입력하세요.')}
 else{const M=MS();if(nm){M.name=nm;got.push('제품명')}
  const op=T.match(/(\d+(?:\.\d+)?)\s*(?:mm)?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*mm/i);if(op){M.open=op[1]+' × '+op[2]+' mm';got.push('규격')}
  const gm=T.match(/(\d+(?:\.\d+)?)\s*g\s*\/\s*(?:m2|m²|㎡)/i);if(gm){M.gm=+gm[1];got.push('중량')}
  const rl=T.match(/(\d+(?:\.\d+)?)\s*m\s*[x×*]\s*(\d+(?:\.\d+)?)\s*m(?![a-z])/i);if(rl){M.wr=Math.min(+rl[1],+rl[2]);M.lr=Math.max(+rl[1],+rl[2]);got.push('롤 규격')}
  set(got.length?'불러온 항목: '+got.join(', ')+' — 확인 후 수정하세요.':'읽을 수 있는 항목을 찾지 못했습니다. 직접 입력하세요.')}}

/* ---------- v311 단면 프로파일 카드 + 대화형 투시도 ---------- */
const fsec=(k,n,t,sub,ex,body)=>{const o=!(FM.fo&&FM.fo[k]===true);return `<details class="fsd k${n}" ${o?'open':''} ontoggle="fmFo('${k}',this.open)"><summary class="sst fps"><i>${n}</i><b>${t}</b>${sub?`<em>${sub}</em>`:''}${ex||''}${ic('chev').replace('<svg ','<svg class="fcv" ')}</summary><div class="fsb">${body}</div></details>`};
try{FM.fo={}}catch(e){}
try{S.coats.forEach(c=>{delete c.o;delete c.cm;delete c.ap})}catch(e){}
try{(SY.groups||[]).forEach(g=>{g.c=0})}catch(e){}
function fmFo(k,o){if(!FM.fo)FM.fo={};if(FM.fo[k]===!o)return;FM.fo[k]=!o;fmSave()}
const fstep=(n,t,sub)=>`<div class="sst fps"><i>${n}</i><b>${t}</b>${sub?`<em>${sub}</em>`:''}</div>`;
const FPI={
 j:'<svg viewBox="0 0 48 48"><path d="M10 8h28" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-dasharray="3 2"/><rect x="14" y="14" width="20" height="20" rx="2" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="2.6"/></svg>',
 f:'<svg viewBox="0 0 48 48"><path d="M13 10L36 33H13z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/></svg>',
 c:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="2.6"/><path d="M14 24h20" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-dasharray="2 2"/></svg>',
 a:'<svg viewBox="0 0 48 48"><rect x="8" y="18" width="32" height="9" rx="1.5" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="2.6"/><rect x="8" y="27" width="32" height="11" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="2" stroke-dasharray="3 2"/></svg>',
 m:'<svg viewBox="0 0 48 48"><path d="M12 13q12 5 24 0l-2 18q-10 5-20 0z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/></svg>'};
const FPT=[['j','직사각형','W × D'],['f','삼각 코너','½ × a²'],['c','원형 비드','π × r²'],['m','임의 단면','A (mm²)'],['a','면 충진','t × 면적']];
function fprofBody(m){return `<div class="fpg">${FPT.map(([k,t,f])=>`<div class="fpc${m==k?' on':''}" role="button" tabindex="0" onclick="fmMode('${k}')">${m==k?'<s class="fck">✓</s>':''}${FPI[k]}<b>${t}</b><code>${f}</code></div>`).join('')}</div>`}
function fmPrev(){const m=FM.mode,P=FM.parts[Math.min(FM.fpi||0,FM.parts.length-1)]||{},w=Math.max(+P.w||0,0),d=Math.max(+P.d||0,0),L=Math.max(+P.l||0,0),lo=+(P.lo==null?FM.loss:P.lo)||0;
 const OR='#c47a12',OL='#c47a12',BL='#1f9d74',BK='url(#fph)',ST='#8da2c8',SK='#3c8fb8',NEON='#1f9d55',NF='rgba(31,157,85,.14)',MO='ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';
 const f1=v=>(+v).toFixed(1),T=(x,y,t,c,a,fs)=>`<text x="${x}" y="${y}" fill="${c}" text-anchor="${a||'middle'}" font-family="${MO}" font-size="${fs||13}" font-weight="700" stroke="#fff" stroke-width="3.5" paint-order="stroke" stroke-linejoin="round">${t}</text>`;
 const fl=(x1,y1,x2,y2,c,wd)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${wd||2}" fill="none"/>`;
 const nl=(x1,y1,x2,y2,wd)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${NEON}" stroke-width="${wd||3.5}" stroke-linecap="round" fill="none"/>`;
 const hdim=(xa,xb,y,c)=>fl(xa,y,xb,y,c)+fl(xa,y-5,xa,y+5,c)+fl(xb,y-5,xb,y+5,c),vdim=(x,ya,yb,c)=>fl(x,ya,x,yb,c)+fl(x-5,ya,x+5,ya,c)+fl(x-5,yb,x+5,yb,c);
 const blk=(x,y,wd,h)=>`<rect x="${x}" y="${y}" width="${wd}" height="${h}" fill="${BK}" stroke="${ST}" stroke-width="1.5"/>`;
 const ov=(k,c)=>`<g class="ov o${k}">${c}</g>`;
 const prism=(st,fi)=>{const x=334,y=8;return `<rect x="${x}" y="${y+8}" width="26" height="16" fill="${fi}" stroke="${st}" stroke-width="1.6"/><path d="M${x} ${y+8}L${x+12} ${y}L${x+38} ${y}L${x+26} ${y+8}Z" fill="${fi}" stroke="${st}" stroke-width="1.6"/><path d="M${x+26} ${y+8}L${x+38} ${y}L${x+38} ${y+16}L${x+26} ${y+24}Z" fill="${fi}" stroke="${st}" stroke-width="1.6"/>`};
 const lenIc=`<g class="hl2">${prism(ST,'#eef4ff')}<text x="352" y="46" fill="#6b7a99" text-anchor="middle" font-family="${MO}" font-size="11" font-weight="700">길이 L ${fn(L,1)} m</text></g>`;
 let A=0,sc='-',body='',unit='mL per linear meter',badge='',ok=true;const cx=200;
 if(m=='j'){A=w*d;ok=A>0;if(ok){const s=Math.min(14,150/w,130/(d+1.05*w)),W=w*s,D=d*s,x0=cx-W/2,x1=cx+W/2,yT=60,yB=yT+D,r=Math.max(W*.58,9),rc=yB+r*.8;sc=s.toFixed(1)+'×';
  const sp=`M${x0} ${yT}Q${cx} ${yT+Math.min(9,D*.4)} ${x1} ${yT}L${x1} ${yB}Q${cx} ${yB-Math.min(7,D*.3)} ${x0} ${yB}Z`;
  body=blk(x0-112,yT,112,rc+r+16-yT)+blk(x1,yT,112,rc+r+16-yT)+`<circle cx="${cx}" cy="${rc}" r="${r}" fill="#fff" stroke="#8da2c8" stroke-width="1.6" stroke-dasharray="4 3"/>`+`<text x="${cx}" y="${rc+4}" fill="#6b7a99" text-anchor="middle" font-family="${MO}" font-size="${Math.min(12,r*.42).toFixed(1)}" font-weight="700">Backer Rod</text>`+
  `<path d="${sp}" fill="#bfe6f5" fill-opacity=".9" stroke="${SK}" stroke-width="2.4" stroke-linejoin="round"/>`+
  `<g class="hw">${hdim(x0,x1,yT-16,OR)}${T(cx,yT-24,'폭 W '+f1(w)+' mm',OL)}</g><g class="hd">${vdim(x1+12,yT,yB,BL)}${T(x1+20,(yT+yB)/2+4,'깊이 D '+f1(d)+' mm',BL,'start')}</g>`+lenIc+
  ov('w',`<rect x="${x0}" y="${yT}" width="${W}" height="${D}" fill="${NF}"/>${nl(x0,yT-16,x1,yT-16,4.5)}${nl(x0,yT,x0,yB,3)}${nl(x1,yT,x1,yB,3)}`)+
  ov('d',`<rect x="${x0}" y="${yT}" width="${W}" height="${D}" fill="${NF}"/>${nl(x1+12,yT,x1+12,yB,4.5)}${nl(x0,yT,x1,yT,3)}${nl(x0,yB,x1,yB,3)}`)+
  ov('q',`<path d="${sp}" fill="${NF}" stroke="${NEON}" stroke-width="3.5" stroke-linejoin="round"/>`)+
  ov('l',`<g>${prism(NEON,NF)}</g>`);badge='A = '+f1(A)+' mm²'}}
 else if(m=='f'){A=w*w/2;ok=A>0;if(ok){const s=Math.min(14,95/w),a=w*s,x0=cx-a/2-10,Y=128;sc=s.toFixed(1)+'×';
  const sp=`M${x0} ${Y}L${x0+a} ${Y}Q${x0+a*.34} ${Y-a*.34} ${x0} ${Y-a}Z`;
  body=blk(x0-110,Y-a-22,110,a+22)+blk(x0-110,Y,a+230,34)+`<path d="${sp}" fill="#bfe6f5" fill-opacity=".9" stroke="${SK}" stroke-width="2.4" stroke-linejoin="round"/>`+
  `<g class="hw">${hdim(x0,x0+a,Y+17,OR)}${T(x0+a/2,Y+31,'변 a '+f1(w)+' mm',OL)}</g><g class="hd">${vdim(x0+a+14,Y-a,Y,BL)}${T(x0+a+22,Y-a/2+4,'변 a '+f1(w)+' mm',BL,'start')}</g>`+lenIc+
  ov('w',`<path d="${sp}" fill="${NF}"/>${nl(x0,Y,x0+a,Y,4.5)}${nl(x0,Y-a,x0,Y,4.5)}${nl(x0,Y+17,x0+a,Y+17,3)}${nl(x0+a+14,Y-a,x0+a+14,Y,3)}`)+
  ov('q',`<path d="${sp}" fill="${NF}" stroke="${NEON}" stroke-width="3.5" stroke-linejoin="round"/>`)+
  ov('l',`<g>${prism(NEON,NF)}</g>`);badge='A = '+f1(A)+' mm²'}}
 else if(m=='c'){A=Math.PI*w*w;ok=A>0;if(ok){const s=Math.min(14,55/w),rp=w*s,Y=150,cy=Y-rp;sc=s.toFixed(1)+'×';
  body=blk(40,Y,320,34)+`<circle cx="${cx}" cy="${cy}" r="${rp}" fill="#bfe6f5" fill-opacity=".9" stroke="${SK}" stroke-width="2.4"/><path d="M${cx-rp} ${cy}H${cx+rp}" stroke="#3c8fb8" stroke-width="1.6" stroke-dasharray="3 3"/>`+
  `<g class="hw">${hdim(cx-rp,cx+rp,cy-rp-14,OR)}${T(cx,cy-rp-22,'지름 2r '+f1(2*w)+' mm',OL)}</g><g class="hd">${fl(cx,cy,cx+rp,cy,BL,2.4)}${T(cx+rp+10,cy+4,'반지름 r '+f1(w)+' mm',BL,'start')}</g>`+lenIc+
  ov('w',`<circle cx="${cx}" cy="${cy}" r="${rp}" fill="${NF}" stroke="${NEON}" stroke-width="3"/>${nl(cx,cy,cx+rp,cy,4.5)}<circle cx="${cx}" cy="${cy}" r="3.5" fill="${NEON}"/>`)+
  ov('q',`<circle cx="${cx}" cy="${cy}" r="${rp}" fill="${NF}" stroke="${NEON}" stroke-width="3.5"/>`)+
  ov('l',`<g>${prism(NEON,NF)}</g>`);badge='A = '+f1(A)+' mm²'}}
 else if(m=='m'){A=w;ok=A>0;if(ok){const z=Math.min(112,Math.max(44,Math.sqrt(A)*9)),W=z*1.3,H=z*.72,x0=cx-W/2,x1=cx+W/2,yT=70,yB=yT+H;
  const sp=`M${x0} ${yT}Q${cx} ${yT+10} ${x1} ${yT}L${x1-5} ${yB}Q${cx} ${yB+9} ${x0+5} ${yB}Z`;
  body=blk(x0-112,yT-6,112,H+34)+blk(x1,yT-6,112,H+34)+`<path d="${sp}" fill="#bfe6f5" fill-opacity=".9" stroke="${SK}" stroke-width="2.4" stroke-linejoin="round"/>`+
  `<g class="hw">${T(cx,yT-16,'단면적 A '+f1(A)+' mm²',OL)}</g>`+lenIc+
  ov('w',`<path d="${sp}" fill="${NF}" stroke="${NEON}" stroke-width="3.5" stroke-linejoin="round"/>`)+
  ov('q',`<path d="${sp}" fill="${NF}" stroke="${NEON}" stroke-width="3.5" stroke-linejoin="round"/>`)+
  ov('l',`<g>${prism(NEON,NF)}</g>`);badge='A = '+f1(A)+' mm²'}}
 else{unit='mL per m²';A=d*1000;ok=d>0;if(ok){const tp=Math.min(70,Math.max(8,d*9)),Y=140;sc=(tp/d).toFixed(1)+'×';
  const plan=(st,fi)=>`<rect x="338" y="12" width="34" height="24" fill="${fi}" stroke="${st}" stroke-width="1.6"/>`;
  body=blk(40,Y,320,40)+`<rect x="40" y="${Y-tp}" width="320" height="${tp}" fill="#bfe6f5" fill-opacity=".9" stroke="${SK}" stroke-width="2.4"/>`+`<g class="hd">${vdim(340,Y-tp,Y,BL)}${T(332,Y-tp/2+4,'두께 t '+f1(d)+' mm',BL,'end')}</g><g class="hw">${T(cx,Y-tp-12,'1 m² 기준 (면적 × 두께)',OL)}</g>`+
  `<g class="hl2">${plan(ST,'#eef4ff')}<text x="355" y="50" fill="#6b7a99" text-anchor="middle" font-family="${MO}" font-size="11" font-weight="700">면적 ${fn(L,1)} m²</text></g>`+
  ov('d',`<rect x="40" y="${Y-tp}" width="320" height="${tp}" fill="${NF}"/>${nl(340,Y-tp,340,Y,4.5)}${nl(40,Y-tp,360,Y-tp,3)}${nl(40,Y,360,Y,3)}`)+
  ov('l',`<rect x="40" y="${Y-tp}" width="320" height="${tp}" fill="${NF}" stroke="${NEON}" stroke-width="3.5"/>${plan(NEON,NF)}`)+
  ov('q',`<rect x="40" y="${Y-tp}" width="320" height="${tp}" fill="${NF}" stroke="${NEON}" stroke-width="3.5"/>`);badge='t × 1,000 = '+fn(A,0)+' mL/m²'}}
 const DF='<defs><pattern id="fph" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V7" stroke="#c3cfe6" stroke-width="1.3"/></pattern></defs>',
 bw=badge.length*7.2+20,svg=ok?`<svg viewBox="0 0 400 210" role="img" aria-label="줄눈 단면 투시도">${DF}${body}<rect x="10" y="10" width="${bw}" height="24" rx="12" fill="#eef4ff" stroke="#c5d6f2" stroke-width="1.2"/>${T(10+bw/2,26,badge,'#31568f')}</svg>`:`<svg viewBox="0 0 400 76">${DF}<text x="200" y="43" fill="#8b96ad" text-anchor="middle" font-size="14">${FM.parts.length?'치수를 입력하면 단면이 그려집니다':'부위를 추가하면 단면이 그려집니다'}</text></svg>`;
 const pi0=FM.parts[Math.min(FM.fpi||0,FM.parts.length-1)]||{},lA=A*(1+lo/100),U=unit.replace(' per linear meter','/m').replace('mL per m²','mL/m²');
 return `<div class="fph"><span class="fpe">${ic('eye')}</span><em>${esc2(pi0.nm||'')} · 배율 ${sc}</em></div><div class="fpd">${svg}</div><div class="fpst"><div><span>${m=='a'?'두께':'단면적'}</span><b>${m=='a'?f1(d)+' mm':fn(A,1)+' mm²'}</b></div><div><span>이론 원단위</span><b>${fn(A,1)}<small> ${U}</small></b></div><div class="hl"><span>로스 ${fn(lo,1)}% 포함</span><b>${fn(lA,1)}<small> ${U}</small></b></div></div>`}
/* ---------- 계산 결과 / 계산하기 ---------- */
function fmOut(){const o=fq('scR');let ix=-1;try{const a=document.activeElement;if(o&&a&&a.tagName=='INPUT'&&o.contains(a))ix=[...o.querySelectorAll('input')].indexOf(a)}catch(e){}if(o)o.innerHTML=FM.tab=='fill'?outFill():outMesh();if(ix>=0){try{const n=o.querySelectorAll('input')[ix];if(n)n.focus({preventScroll:true})}catch(e){}}const pv=fq('fpv');if(pv&&FM.tab=='fill')pv.innerHTML=fmPrev()}
function outFill(){const c=cF(),pr=+FM.price||0,amt=c.n*pr,rA=Math.ceil(c.rod*1.05),tA=Math.ceil(c.tape*1.05),ex=FM.mode=='j'&&c.rod>0?rA*(+FM.rodp||0)+tA*(+FM.tapep||0):0,tot=amt+ex,pl=FM.pk?`${fn(FM.pk,2)}${FM.pu}`:'-';
 const warn=FM.pu=='kg'&&!(+FM.sg>0)?'<div class="sw">kg 포장은 비중이 필요합니다. 1 제품 정보에 비중을 입력하세요.</div>':'';
 const stp=[`<b>순수 충진량</b><small>${c.ln.map(x=>`${esc2(x[0])}: ${x[1]} = ${fn(x[2],0)} mL`).join('<br>')}${c.ln.length>1?`<br>합계 ${fn(c.V,0)} mL`:''}</small>`,`<b>로스 적용</b><small>${c.ln.map(x=>`${esc2(x[0])}: ${fn(x[2],0)} × ${fn(x[3],2)} = ${fn(x[2]*x[3],0)} mL`).join('<br>')}${c.ln.length>1?`<br>합계 ${fn(c.Vt,0)} mL`:''}</small>`,`<b>포장 수량</b><small>${fn(c.Vt,0)} ÷ ${fn(c.pv,0)} = ${c.pv>0?fn(c.Vt/c.pv,2):'-'} → 올림 ${fn(c.n,0)} 개</small>`,`<b>재료비</b><small>${fn(c.n,0)} × ${fn(pr,0)} = ${fn(amt,0)} 원${ex?` + 부자재 ${fn(ex,0)} 원`:''}</small>`];
 return warn+`<div class="sc3"><div><span>순수 충진량</span><b><i class="tic">${ic('drop')}</i>${fn(c.V/1000,2)}<u> L</u></b></div><div><span>로스 포함 소요량</span><b><i class="tic">${ic('drop')}</i>${fn(c.Vt/1000,2)}<u> L</u></b><em>+${fn((c.L-1)*100,1)}%</em></div><div><span>필요 포장 수량</span><b><i class="tic">${ic('box')}</i>${fn(c.n,0)}<u> 개</u></b><em>(${pl})</em></div></div>
<div class="scc scw"><div class="scwl"><i>${ic('won')}</i><div><span>예상 재료비</span><b>${fn(tot,0)}<u> 원</u></b></div></div><div class="scwr"><label class="sr s2"><span>포장 단가</span><i><input type="number" inputmode="decimal" value="${pr||''}" placeholder="0" oninput="fmSet('price',this.value)"><b>원</b></i></label><div class="srr"><span>총 금액</span><b>${fn(amt,0)} 원</b></div></div></div>
<div class="scc scp"><div class="scpn"><b>${esc2(FM.pname||'충진재')}</b><small>${esc2(FM.pmaker||'제조사 자동')} | ${pl}${FM.pn?' '+esc2(FM.pn):''}</small></div><div class="scpg"><div><span>비중</span>${+FM.sg>0?fn(FM.sg,2)+' kg/L':'-'}</div><div><span>로스율</span>${fn((c.L-1)*100,1)}%</div><div><span>포장 단가</span>${fn(pr,0)} 원</div></div></div>`+
 (FM.mode=='j'&&c.rod>0?`<div class="scc scx"><b>부자재 (줄눈)</b><div class="scxr"><span>백업재 약 ${fn(rA,0)} m</span><i><input type="number" inputmode="decimal" value="${FM.rodp||''}" placeholder="단가" oninput="fmSet('rodp',this.value)"><b>원/m</b></i></div><div class="scxr"><span>마스킹 테이프 약 ${fn(tA,0)} m</span><i><input type="number" inputmode="decimal" value="${FM.tapep||''}" placeholder="단가" oninput="fmSet('tapep',this.value)"><b>원/m</b></i></div></div>`:'')+
 `<details class="scc scf"><summary>${ic('calc')}<b>계산식 보기</b>${ic('chev')}</summary><div class="scfb">${FM.mode=='j'?'줄눈: 폭(mm) × 깊이(mm) × 길이(m) = mL':FM.mode=='c'?'원형 비드: π × 반지름(mm)² × 길이(m) = mL':FM.mode=='m'?'임의 단면: 단면적(mm²) × 길이(m) = mL':FM.mode=='f'?'삼각 비드: 변길이(mm)² ÷ 2 × 길이(m) = mL':'면 충진: 면적(m²) × 두께(mm) × 1,000 = mL'}<br>소요량 = 순수 충진량 × (1 + 로스율)<br>포장 수량 = 소요량 ÷ 포장 용량 (올림)<br>kg 포장은 비중으로 L 환산 (용량 = kg ÷ 비중)</div></details>
<div class="scc scs"><b>계산 요약</b>${stp.map((t,i)=>`<div class="scsr"><i>${i+1}</i><div>${t}</div></div>`).join('')}</div>`}
function outMesh(){const M=MS(),c=cM(),pr=+M.price||0,amt=M.pu=='롤'?c.rolls*pr:c.At*pr;
 const stp=[`<b>띠 폭</b><small>${c.lines.length?c.lines.map(x=>`${esc2(x.m)} ${x.k}: ${fn(x.w,0)} mm × ${fn(x.ln,1)} m = ${fn(x.a,2)} m²`).join('<br>'):'적용 부위를 선택하세요'}</small>`,`<b>면적 합계</b><small>${fn(c.A,2)} m² (끝단 길이 합계 ${fn(c.len,1)} m)</small>`,`<b>로스 적용</b><small>${fn(c.A,2)} × ${fn(c.L,2)} = ${fn(c.At,2)} m²</small>`,`<b>롤 수량</b><small>${c.rolls?`롤 ${fn(c.wr,2)}m × ${fn(c.lr,0)}m 기준 ${fn(c.rolls,0)} 롤`:'롤 규격(폭·길이)을 입력하면 계산됩니다'}</small>`];
 return (c.warn?'<div class="sw">'+c.warn+'</div>':'')+(c.lines.length?'':'<div class="sw">적용 부위가 선택되지 않았습니다. 도형에서 메쉬를 넣을 부위를 눌러 선택하세요.</div>')+`<div class="sc3m"><div><div class="tlh"><i class="tic2">${ic('area')}</i><span>필요 메쉬 면적</span></div><b>${fn(c.A,2)}<u> m²</u></b><em>(예상 소요량)</em></div><div><div class="tlh"><i class="tic2">${ic('area')}</i><span>로스 포함 소요량</span></div><b>${fn(c.At,2)}<u> m²</u></b><em>+${M.loss}%</em></div><div><div class="tlh"><i class="tic2">${ic('roll')}</i><span>필요 롤 수량</span></div><b>${c.rolls?fn(c.rolls,0):'-'}<u> 롤</u></b><em>${c.wr&&c.lr?`(${fn(c.wr,2)}×${fn(c.lr,0)}m)`:'롤 규격 입력'}</em></div></div>
<div class="scc scw"><div class="scwl"><i>${ic('won')}</i><div><span>예상 재료비</span><b>${fn(amt,0)}<u> 원</u></b></div></div><div class="scwr"><label class="sr s2"><span>롤 단가</span><i><input type="number" inputmode="decimal" value="${M.rp||''}" placeholder="롤당 가격" oninput="fmMs('rp',this.value)"><b>원/롤</b></i></label><label class="sr s2"><span>단가 (${M.pu}) ${+M.rp>0?'<small>자동</small>':''}</span><i><input type="number" inputmode="decimal" value="${pr||''}" placeholder="0" oninput="fmMPrice(this.value)"><b>원</b></i></label><div class="srr"><span>수량</span><b>${M.pu=='롤'?fn(c.rolls,0)+' 롤':fn(c.At,2)+' m²'}</b></div></div></div>
<div class="scc scp"><div class="scpn"><b>${esc2(M.name||'내화 메쉬')}</b><small>${esc2(M.open||'개구 규격 미입력')} | ${M.gm?fn(M.gm,0)+' g/m²':'중량 미입력'}</small></div><div class="scpg"><div><span>롤 폭</span>${M.wr?fn(M.wr,2)+' m':'-'}</div><div><span>롤 길이</span>${M.lr?fn(M.lr,0)+' m':'-'}</div><div><span>중량</span>${M.gm?fn(c.At*M.gm/1000,2)+' kg':'-'}</div></div></div>
<details class="scc scf"><summary>${ic('calc')}<b>계산식 보기</b>${ic('chev')}</summary><div class="scfb">띠 폭 A = 내면 연장 + 플랜지 두께(tf) + 외면 연장 + 도막 두께<br>B = 접합부 띠 폭(입력), C = 플랜지 폭, D = (B − tw) ÷ 2, E = H − 2·tf<br>길이 = 부재 길이 × 수량 × 개소 (+ 롤 이음 겹침)<br>면적 = Σ(길이 × 띠 폭), 소요량 = 면적 × (1 + 로스율)<br>롤 수 = Σ(길이 ÷ 롤 폭 줄 수) ÷ 롤 길이 (올림)</div></details>
<div class="scc scs"><b>계산 요약</b>${stp.map((t,i)=>`<div class="scsr"><i>${i+1}</i><div>${t}</div></div>`).join('')}</div>`}
function fmRun(){let h;if(FM.tab=='fill'){const c=cF();if(!(c.n>0)){return typeof tt=='function'?tt('소요량이 0입니다. 값을 입력하세요.'):alert('소요량이 0입니다.')}h={k:'충진',nm:(FM.pname||'충진재')+' · '+({j:'줄눈',f:'삼각',c:'원형',m:'임의',a:'면'})[FM.mode],val:fn(c.Vt/1000,2)+' L',snap:JSON.stringify({mode:FM.mode,parts:FM.parts,pk:FM.pk,pu:FM.pu,pn:FM.pn,sg:FM.sg,pname:FM.pname,pmaker:FM.pmaker,price:FM.price,loss:FM.loss})}}
 else{const c=cM();if(!(c.A>0)){return typeof tt=='function'?tt('적용 부위를 선택하세요.'):alert('적용 부위를 선택하세요.')}h={k:'메쉬',nm:(MS().name||'메쉬')+' · '+(MS().src=='m'?(MS().man||[]):MS().mem).map(m=>m.nm).join(','),val:fn(c.At,1)+' m²',snap:JSON.stringify(MS())}}
 h.t=new Date().toISOString();FM.hist.unshift(h);FM.hist=FM.hist.slice(0,30);fmSave();fmOut();const r=fq('scR');if(r)r.scrollIntoView({behavior:'smooth',block:'start'});if(typeof tt=='function')tt('계산 결과가 작업 내역에 저장되었습니다')}
function fmRestore(i){const h=FM.hist[i];if(!h)return;try{const s=JSON.parse(h.snap);if(h.k=='충진'){Object.assign(FM,s);FM.tab='fill'}else{Object.assign(FM.mesh,s);FM.tab='mesh'}}catch(e){}fmSave();fmRender()}
function fmDelHist(i){FM.hist.splice(i,1);fmSave();fmRender()}
const fmDt=s=>{try{const d=new Date(s);return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0')+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}catch(e){return''}};
const recent=(n)=>FM.hist.slice(0,n).map((h,i)=>`<button class="scrh" onclick="fmRestore(${i})"><i>${ic(h.k=='충진'?'pen':'grid')}</i><div><b>${esc2(h.nm)}</b><small>${fmDt(h.t)}</small></div><em>${esc2(h.val)}</em>${ic('chev')}</button>`).join('')||'<div class="sce">저장된 작업이 없습니다. "계산하기" 또는 "저장"을 누르면 저장됩니다.</div>';
/* ---------- 화면 ---------- */
function nav(){return '';const T=FM.tab,c=(k,cl,i,t,on)=>`<button class="scn ${cl}${T==k?' on':''}" onclick="${on}">${ic(i)}<b>${t}</b></button>`;
 return `<div class="scnav">${c('fill','c1','pen','실란트',"fmTab('fill')")}${c('mesh','c2','grid','메쉬',"fmTab('mesh')")}${c('x','c3','doc','일위대가',"if(window.T)T(0)")}${c('hist','c4','folder','내역',"fmTab('hist')")}</div>`}
const step=(n,t,extra)=>`<div class="sst"><i>${n}</i><b>${t}</b>${extra||''}</div>`;
const fi1=(lab,val,on,fk)=>`<label class="sf"><span>${lab}</span><input type="number" inputmode="decimal" step="any" value="${val??''}" oninput="${on}"${fk?` onfocus="fmHi('${fk}')" onblur="fmHi('')"`:''}></label>`;
function fillHtml(){const m=FM.mode;
 const parts=FM.parts.map((r,i)=>{const lo=r.lo==null?FM.loss:r.lo,P=(k,v)=>`fmPart(${i},'${k}',${v?'':'this.value'})`;
  const row=m=='j'?fi1('폭(mm)',r.w,P('w'),'w')+fi1('깊이(mm)',r.d,P('d'),'d')+fi1('길이(m)',r.l,P('l'),'l'):m=='c'?fi1('반지름 r(mm)',r.w,P('w'),'w')+fi1('길이(m)',r.l,P('l'),'l'):m=='m'?fi1('단면적(mm²)',r.w,P('w'),'w')+fi1('길이(m)',r.l,P('l'),'l'):m=='f'?fi1('변 a(mm)',r.w,P('w'),'w')+fi1('길이(m)',r.l,P('l'),'l'):fi1('면적(m²)',r.l,P('l'),'l')+fi1('두께(mm)',r.d,P('d'),'d');
  return `<div class="spt" onfocusin="fmAct(${i})"><div class="sph pc"><i class="pci">${ic('doc')}</i><input value="${esc2(r.nm)}" oninput="fmPart(${i},'nm',this.value)"><button onclick="fmDelPart(${i})" aria-label="삭제">${ic('trash')}</button></div><div class="sfr">${row}${fi1('충진갯수',r.q,P('q'),'q')}${fi1('로스율(%)',lo,P('lo'),'lo')}</div>${m=='j'&&+r.w>0&&+r.d!=recD(+r.w)?`<div class="shn">권장 깊이 ${recD(+r.w)}mm (폭의 1/2, 6~13mm) <button onclick="fmPart(${i},'d',${recD(+r.w)});fmRender()">적용</button></div>`:''}</div>`}).join('');
 return nav()+`<div class="scg"><section class="scc scin"><div class="sch"><i>${ic('pen')}</i><b>실란트 소요량 계산</b></div>
${fsec('s1',1,'제품 정보','',`<button class="fpa" onclick="event.preventDefault();event.stopPropagation();fmLoad('fill','menu')">${ic('clip')}첨부</button>`,`<div class="sfr sprod"><label class="sf sn"><span>제품명</span><input type="text" value="${esc2(FM.pname)}" placeholder="제품명 입력" oninput="fmSet('pname',this.value)"></label>${fi1('비중(kg/L)',FM.sg,"fmSet('sg',this.value)")}<label class="sf sp"><span>포장 규격</span><div class="spk"><input type="number" inputmode="decimal" step="any" value="${FM.pk}" oninput="fmSet('pk',this.value)"><select onchange="fmSet('pu',this.value)"><option${FM.pu=='mL'?' selected':''}>mL</option><option${FM.pu=='L'?' selected':''}>L</option><option${FM.pu=='kg'?' selected':''}>kg</option></select></div></label></div>
<div class="sdm"><i class="sdl">${ic('leaf')}</i><span>${FM.pmaker?'제조사(자동): '+esc2(FM.pmaker):'제조사: 데이터시트·DB를 불러오면 자동 입력됩니다'}${FM.dsmsg?'<br>'+esc2(FM.dsmsg):''}</span></div>`)}
${fsec('s2',2,'단면 프로파일 선택','',``,fprofBody(m))}
${fsec('s3',3,'충진 부위 입력','치수 · 연장','',`<div class="sadr"><input id="fmnp" placeholder="적용 부위 입력 (예: 외벽 줄눈)"><button class="sad" onclick="fmAddPart()">+ 추가</button><button class="srun2" onclick="fmRun()">${ic('calc')}계산하기</button></div>
${parts||'<div class="fpe0">부위 이름을 입력하고 <b>+ 추가</b>를 누르세요.</div>'}`)}
${fsec('s4',4,'단면 투시도','','',`<div id="fpv" class="fpv">${fmPrev()}</div>`)}
</section>
<section class="scres"><div class="sch"><i>${ic('bars')}</i><b>계산 결과</b><em>충진</em></div><div id="scR"></div></section></div>
<section class="scc screc"><div class="sch"><i>${ic('clock')}</i><b>최근 작업 현황</b><button class="sbt" onclick="fmTab('hist')">더보기 ${ic('chev')}</button></div>${recent(4)}</section>`}
const mf=(lab,val,on,u,ph)=>`<label class="sf"><span>${lab}</span><div class="sfi"><input type="number" inputmode="decimal" step="any" value="${val??''}" placeholder="${ph||''}" oninput="${on}">${u?'<b>'+u+'</b>':''}</div></label>`;
const mt=(lab,val,on,ph)=>`<label class="sf"><span>${lab}</span><div class="sfi"><input type="text" value="${esc2(val)}" placeholder="${ph||''}" oninput="${on}"></div></label>`;
const MI=(()=>{const B='<rect x="4" y="4" width="16" height="4" rx=".6" fill="#8d98ad"/><rect x="10.5" y="8" width="3" height="8" fill="#8d98ad"/><rect x="4" y="16" width="16" height="4" rx=".6" fill="#8d98ad"/>',O='#e0662f',w=(b)=>`<svg class="mi" viewBox="0 0 24 24" aria-hidden="true">${b}</svg>`;
 return {in:w(B+`<rect x="4" y="8" width="6.5" height="3" fill="${O}"/><rect x="13.5" y="8" width="6.5" height="3" fill="${O}"/><rect x="4" y="13" width="6.5" height="3" fill="${O}"/><rect x="13.5" y="13" width="6.5" height="3" fill="${O}"/>`),
 out:w(B+`<rect x="4" y="1" width="16" height="3" fill="${O}"/><rect x="4" y="20" width="16" height="3" fill="${O}"/>`),
 mt:w(`<path d="M4 4h16v4h-5.5v8H20v4H4v-4h5.5V8H4z" fill="#d7dce6" stroke="${O}" stroke-width="2" stroke-linejoin="round"/>`),
 ov:w(`<rect x="2" y="5" width="12" height="6" rx="1" fill="#c9d3e6"/><rect x="10" y="13" width="12" height="6" rx="1" fill="#c9d3e6"/><rect x="10" y="5" width="4" height="14" fill="${O}" opacity=".85"/>`),
 jb:w(B+`<rect x="7.5" y="8" width="3" height="3" fill="${O}"/><rect x="13.5" y="8" width="3" height="3" fill="${O}"/><rect x="7.5" y="13" width="3" height="3" fill="${O}"/><rect x="13.5" y="13" width="3" height="3" fill="${O}"/>`),
 mq:w(`<g fill="#8d98ad"><rect x="1.5" y="6" width="6" height="2"/><rect x="3.5" y="8" width="2" height="4"/><rect x="1.5" y="12" width="6" height="2"/><rect x="9" y="6" width="6" height="2"/><rect x="11" y="8" width="2" height="4"/><rect x="9" y="12" width="6" height="2"/><rect x="16.5" y="6" width="6" height="2"/><rect x="18.5" y="8" width="2" height="4"/><rect x="16.5" y="12" width="6" height="2"/></g><path d="M5 17h14M16 15l3 2-3 2" fill="none" stroke="${O}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`),
 ls:w(`<path d="M18 6L6 18" stroke="${O}" stroke-width="2" stroke-linecap="round"/><circle cx="7.5" cy="7.5" r="2.4" fill="none" stroke="${O}" stroke-width="2"/><circle cx="16.5" cy="16.5" r="2.4" fill="none" stroke="${O}" stroke-width="2"/>`),
 pu:w(`<rect x="3" y="4" width="14" height="16" rx="2" fill="#c9d3e6"/><path d="M6.5 8h7M6.5 12h7" stroke="#fff" stroke-width="1.5"/><circle cx="17.5" cy="16.5" r="5" fill="${O}"/><path d="M15.3 14.5l1 4 1.2-3 1.2 3 1-4" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>`)}})();
const mdim=(lab,val,on,i,k)=>`<label class="sdl2"><span>${lab}</span><div class="sfi"><input id="md${i}${k}" type="number" inputmode="decimal" step="any" value="${val??''}" oninput="${on}" onfocus="fmMHi(${i},'${k}')" onblur="fmMHi(${i},'')"></div></label>`;
function fmMHi(i,k){const z=document.querySelector('.sz[data-i="'+i+'"]');if(!z)return;z.classList.toggle('hasg',!!k);z.querySelectorAll('.gd').forEach(g=>g.classList.toggle('on',g.dataset.k==k));z.querySelectorAll('.gchip').forEach(g=>g.classList.toggle('on',g.dataset.k==k))}
function fmMFocus(i,k){const e=document.getElementById('md'+i+k);if(e){e.focus();try{e.select()}catch(_){}}}
function fmTabSel(v){if(v=='x'){if(window.T)T(0);return}fmTab(v)}
function meshHtml(){const M=MS(),multi=M.mem.length>1,
 mem=M.mem.map((m,i)=>`<div class="spt mm">${multi?`<div class="sph pc"><i class="pci">${ic('grid')}</i><input value="${esc2(m.nm||'')}" oninput="fmMem(${i},'nm',this.value)"><button onclick="fmDelMem(${i})" aria-label="삭제">${ic('trash')}</button></div>`:''}
 <label class="sf wide"><span>형강 규격 선택</span><div class="sfi sel"><select onchange="fmSize(${i},this.value)">${FMHB.map((p,j)=>`<option value="${j}"${m.sz===j?' selected':''}>${p[0]}</option>`).join('')}<option value="x"${m.sz===undefined||m.sz==='x'?' selected':''}>직접 입력</option></select></div></label>
 <div class="sdt">단면 치수 <small>H · B · tw · tf</small></div><div class="sd4">${mdim('H',m.H,`fmMemDim(${i},'H',this.value)`,i,'H')}${mdim('B',m.B,`fmMemDim(${i},'B',this.value)`,i,'B')}${mdim('tw',m.tw,`fmMemDim(${i},'tw',this.value)`,i,'tw')}${mdim('tf',m.tf,`fmMemDim(${i},'tf',this.value)`,i,'tf')}</div>
 <div class="sfr2">${mf('부재 길이',m.l,`fmMem(${i},'l',this.value)`,'m')}${mf('부재 수량',m.q,`fmMem(${i},'q',this.value)`,'개')}</div>
 <div class="sz" data-i="${i}"><div class="szs">${fmShape(m,i)}</div><div class="szl"><b class="ztt">메쉬 적용 부위 <small>도형 또는 항목을 눌러 선택</small></b>${Object.keys(FMZ).map(k=>`<label class="szc ${m.z&&m.z[k]?'on':''}"><input type="checkbox" ${m.z&&m.z[k]?'checked':''} onchange="fmZ(${i},'${k}')"><span><b>${k}</b> ${FMZ[k][0]} ×${FMZ[k][1]}</span><em>${fn(fmZw(m,k),0)}mm</em></label>`).join('')}<div class="szp"><button onclick="fmZset(${i},'all')">전체</button><button onclick="fmZset(${i},'none')">해제</button></div></div></div></div>`).join('');
  const seg=`<div class="fseg"><button class="${M.src!='m'?'on':''}" onclick="fmSrc('h')">형강 기준</button><button class="${M.src=='m'?'on':''}" onclick="fmSrc('m')">일반 · 수기</button></div>`,
  manH=(M.man||[]).map((m,i)=>`<div class="spt mm"><div class="sph pc"><i class="pci">${ic('grid')}</i><input value="${esc2(m.nm||'')}" oninput="fmMan(${i},'nm',this.value)"><button onclick="fmDelMan(${i})" aria-label="삭제">${ic('trash')}</button></div><div class="sfr3">${mf('띠 폭',m.w,`fmMan(${i},'w',this.value)`,'mm')}${mf('길이',m.l,`fmMan(${i},'l',this.value)`,'m')}${mf('수량',m.q,`fmMan(${i},'q',this.value)`,'개')}</div><div class="sfr2">${mf('또는 면적 직접 입력',m.a,`fmMan(${i},'a',this.value)`,'m²')}</div></div>`).join('')+'<div class="sdm"><span>띠 폭 × 길이 × 수량으로 입력하거나, 면적(m²)을 직접 입력합니다. 면적을 입력하면 그 값이 우선합니다.</span></div>',
  cond=`<details class="fsub"><summary><span class="cgi"><em title="시공 조건">${ic('area')}<small>시공</small></em><em title="로스율"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18"/><circle cx="7.5" cy="7.5" r="2.3"/><circle cx="16.5" cy="16.5" r="2.3"/></svg><small>로스</small></em><em title="단가 기준">${ic('won')}<small>단가</small></em></span><b class="cgt">세부 조건</b>${ic('chev').replace('<svg ','<svg class="fcv" ')}</summary><div class="sfr2">${mf(`${MI.in}플랜지 내면 연장`,M.ei,"fmMs('ei',this.value)",'mm')}${mf(`${MI.out}플랜지 외면 연장`,M.eo,"fmMs('eo',this.value)",'mm')}${mf(`${MI.mt}도막 두께`,M.mt,"fmMs('mt',this.value)",'mm')}${mf(`${MI.ov}겹침 길이`,M.ov,"fmMs('ov',this.value)",'mm')}${mf(`${MI.jb}접합부(B) 띠 폭`,M.jb,"fmMs('jb',this.value);this.onchange=()=>fmRender()",'mm')}${mf(`${MI.mq}동일 구조 반복`,M.mq,"fmMs('mq',this.value)",'세트')}${mf(`${MI.ls}로스율`,M.loss,"fmMs('loss',this.value)",'%')}<label class="sf"><span>${MI.pu}단가 기준</span><div class="sfi sel"><select onchange="fmMs('pu',this.value);fmRender()"><option value="m²"${M.pu=='m²'?' selected':''}>m² 단위</option><option value="롤"${M.pu=='롤'?' selected':''}>롤 단위</option></select></div></label></div></details>`;
 return nav()+`<div class="scg"><section class="scc scin"><div class="sch"><i>${ic('grid')}</i><b>메쉬 소요량 계산</b></div>
${fsec('m1',1,'메쉬 정보','',`<button class="fpa" onclick="event.preventDefault();event.stopPropagation();fmLoad('mesh','menu')">${ic('clip')}첨부</button>`,`${M.maker||M.dsmsg?`<div class="sdm"><i class="sdl">${ic('leaf')}</i><span>${M.maker?'제조사(자동): '+esc2(M.maker)+'<br>':''}${esc2(M.dsmsg||'')}</span></div>`:''}
<div class="sfr2">${mt('메쉬 명칭',M.name,"fmMs('name',this.value)",'예) 내부용 유리섬유 메쉬')}${mt('규격',M.open,"fmMs('open',this.value)",'예) 11 × 11 mm')}</div>
<div class="sfr3">${mf('중량',M.gm,"fmMs('gm',this.value)",'g/m²')}${mf('롤 폭',M.wr,"fmMs('wr',this.value)",'m','1.5')}${mf('롤 길이',M.lr,"fmMs('lr',this.value)",'m','150')}</div><div class="sdm"><span id="rla">롤 면적 = 롤 폭 × 롤 길이 = <b>${fn((+M.wr||0)*(+M.lr||0),1)} ㎡</b><br>입력 단위: 띠 폭·연장·겹침은 mm, 길이는 m, 면적은 ㎡</span></div>`)}
${fsec('m2',2,'도포 면적 및 선택사항','',`<button class="fpa" onclick="event.preventDefault();event.stopPropagation();${M.src=='m'?'fmAddMan()':'fmAddMem()'}">+ ${M.src=='m'?'행':'부재'} 추가</button>`,`${seg}${M.src=='m'?manH:mem}${cond}`)}
</section>
<section class="scres"><div class="sch"><i>${ic('bars')}</i><b>계산 결과</b><button class="sbt" onclick="fmRun()">저장</button><button class="sbt" onclick="fmResetMesh()">${ic('reset')}초기화</button></div><div id="scR"></div></section></div>
<section class="scc screc"><div class="sch"><i>${ic('clock')}</i><b>최근 작업 현황</b><button class="sbt" onclick="fmTab('hist')">더보기 ${ic('chev')}</button></div>${recent(4)}</section>`}

function histHtml(){return nav()+`<section class="scc screc"><div class="sch"><i>${ic('folder')}</i><b>작업 내역</b>${FM.hist.length?`<button class="sbt" onclick="if(confirm('작업 내역을 모두 지울까요?')){FM.hist=[];fmSave();fmRender()}">전체 삭제</button>`:''}</div>${FM.hist.length?FM.hist.map((h,i)=>`<div class="scrw"><button class="scrh" onclick="fmRestore(${i})"><i>${ic(h.k=='충진'?'pen':'grid')}</i><div><b>${esc2(h.nm)}</b><small>${fmDt(h.t)} · 눌러서 다시 열기</small></div><em>${esc2(h.val)}</em></button><button class="scrx" onclick="fmDelHist(${i})" aria-label="삭제">${ic('trash')}</button></div>`).join(''):'<div class="sce">저장된 작업이 없습니다. 실란트·메쉬 화면에서 "계산하기" 또는 "저장"을 누르면 저장됩니다.</div>'}</section>`}
function fmRender(){const e=fq('v8');if(!e)return;const T=FM.tab;document.querySelectorAll('body>.sld').forEach(x=>x.remove());e.innerHTML=`<div class="sc">${T=='mesh'?meshHtml():T=='hist'?histHtml():fillHtml()}</div>${ldSheet()}`;const sl=e.querySelector('.sld');if(sl)document.body.appendChild(sl);document.querySelectorAll('body>.scpill').forEach(x=>x.remove());{const pl=e.querySelector('.scpill');if(pl)document.body.appendChild(pl)}{const t=document.getElementById('ttl'),h=document.getElementById('hs2');if(t){t.textContent=T=='mesh'?'메쉬 소요량 계산':'실란트 소요량 · 메쉬 소요량';if(h)h.textContent=T=='mesh'?'실란트 도포 시 필요한 메쉬 수량을 계산합니다.':'Sealant · Mesh Quantity'}}fmOut()}

function fmResetMesh(){const f=()=>{const t=FM.tab;try{const o=JSON.parse(JSON.stringify(FD.mesh));Object.assign(FM.mesh,o)}catch(e){}fmSave();fmRender()};if(typeof ask=='function')ask('메쉬 입력값을 모두 초기화할까요?',f);else if(confirm('메쉬 입력값을 모두 초기화할까요?'))f()}
