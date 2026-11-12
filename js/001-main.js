const EDITION='user';
const LS=(()=>{const o=window.localStorage,P=EDITION==='admin'?'pqa:':'pqu:';return new Proxy({},{get:(t,k)=>{if(typeof k!=='string')return undefined;if(k==='getItem')return x=>o.getItem(P+x);if(k==='setItem')return(x,v)=>o.setItem(P+x,v);if(k==='removeItem')return x=>o.removeItem(P+x);const v=o.getItem(P+k);return v===null?undefined:v},set:(t,k,v)=>{o.setItem(P+k,String(v));return true},deleteProperty:(t,k)=>{o.removeItem(P+k);return true}})})();
const DEF=[];
const $=s=>document.querySelector(s),F=(n,d=2)=>isFinite(n)?(+n).toLocaleString('ko-KR',{maximumFractionDigits:d}):'-';
const SV=d=>`<svg viewBox="0 0 24 24" width="1.15em" height="1.15em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${d}</svg>`,IC={doc:SV('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),trash:SV('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>'),share:SV('<circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="18" cy="18" r="2.3"/><path d="M8 11l8-4M8 13l8 4"/>'),chev:SV('<path d="M6 9l6 6 6-6"/>')};
let MF='all',LFJ=[];
let DB=JSON.parse(LS.db||'null')||DEF.map(p=>({...p})),S=JSON.parse(LS.st||'null')||{area:'1',labor:0,coats:[{}]};if(!(+S.area>0))S.area='';try{if(LS.av!='2'){S.area='';LS.av='2'}}catch(e){}
const sv=()=>{try{LS.db=JSON.stringify(DB);LS.st=JSON.stringify(S)}catch(e){try{window.CODATA&&CODATA.saveFail(e)}catch(_){}}try{window.LCCX&&LCCX.pull&&LCCX.pull()}catch(e){}},P=n=>DB.find(p=>p.n==n);
/* v265: DB에 없는 제품·직접 입력 값도 공식으로 계산 (포장 18L 기본, 입력한 DFT·SVR·Loss·희석율·단가 사용) */
/* v491 사양 DB ↔ 제품 DB 제품 연결: 이름이 조금 달라도(공백·괄호·제조사명·모델번호) 같은 제품을 찾아 소개·규격을 연동 */
function pfN(s){return String(s||'').toLowerCase().replace(/㈜|\(주\)/g,'').replace(/[\s\-_.,·()\[\]{}\/\\'"‘’“”]+/g,'')}
function pfCodes(s){return (String(s||'').toUpperCase().match(/[A-Z]{1,6}[-\s]?\d{2,}[A-Z0-9]*|\d{2,}[A-Z][A-Z0-9]*/g)||[]).map(x=>x.replace(/[-\s]/g,'')).filter(x=>x.length>=4)}
function PF(n){if(!n)return null;const q=pfN(n);if(q.length<2)return null;
 let h=DB.find(p=>pfN(p.n)==q);if(h)return h;
 const c1=DB.filter(p=>{const d=pfN(p.n);return d.length>=4&&q.length>=4&&(d.includes(q)||q.includes(d))});if(c1.length==1)return c1[0];
 const cs=pfCodes(n);if(cs.length){const c2=DB.filter(p=>{const d=pfN(p.n).toUpperCase();return cs.some(c=>d.includes(c))});if(c2.length==1)return c2[0]}
 return null}
function PX(n){return P(n)||PF(n)}
const PC=n=>PX(n)||{n:n||'직접 입력 제품',g:'',d:'',svr:0,dft:0,mk:18,pk:18,un:'L',sg:0,ts:18,tn:'',tc:'',tr:0,_v:1};
try{if(LS.sfx!='1'){let n=0;DB.forEach(p=>{const D=DEF.find(x=>x.n==p.n);if(D&&+D.mk>0&&(+p.pk!==+D.pk||+p.mk!==+D.mk)){p.pk=D.pk;p.mk=D.mk;if(D.un)p.un=D.un;n++}});if(n)sv();LS.sfx='1'}}catch(e){}
try{if(LS.thfx!='1'){DB.forEach(p=>{const D=DEF.find(x=>x.n==p.n);if(D&&+p.dft>=1000&&+D.dft>0&&+D.dft<1000)p.dft=D.dft;if(+p.svr&&+p.dft)p.th=+(p.svr*10/p.dft).toFixed(4)});sv();LS.thfx='1'}}catch(e){}
function toTop(){const f=()=>{try{window.scrollTo({top:0,left:0,behavior:'instant'});document.documentElement.scrollTop=0;document.body.scrollTop=0;document.querySelectorAll('#es .zf,#es .zbd,#es .zsc,#vh,#app,.pn').forEach(e=>{e.scrollTop=0})}catch(e){}};f();requestAnimationFrame(f);setTimeout(f,90);setTimeout(f,300)}
const T=n=>{try{const mh=document.getElementById('mh');if(mh){mh.hidden=n!=2;document.body.classList.toggle('mhp',n==2);if(n==2){['#app','#vh','#bb','#bb3'].forEach(q=>{const e=document.querySelector(q);if(e)e.hidden=true});document.body.dataset.pg=2;['cp','lccdash','lccasset','pg1','pg4'].forEach(c=>document.body.classList.remove(c));if(window.mhRender)mhRender();window.scrollTo(0,0);try{sessionStorage.vw=2}catch(e){}return}else{const ap=document.getElementById('app');if(ap)ap.hidden=false}}}catch(e){}try{ndHero(n)}catch(e){}$('#vh').hidden=n!=2;$('#app').hidden=n==2;$('#v0').hidden=n!=0;$('#v1').hidden=n!=1;$('#v3').hidden=n!=3;$('#v4').hidden=n!=4;$('#v5').hidden=n!=5;$('#v7').hidden=n!=7;{const e=$('#v8');if(e)e.hidden=n!=8}{const e=$('#v9');if(e)e.hidden=n!=9}{const e=$('#v10');if(e)e.hidden=n!=10}$('#bb').hidden=n!=0;$('#bb3').hidden=n!=3;$('#ttl').textContent=pqTitle(n);if(n==1)dbl();if(n==3){if(!window.SYK)window.SYM='sys';syRender()}if(n==2)dashRender();if(n==4)tpRender();if(n==5)csvRender();if(n==7)admRender();if(n==8)fmRender();document.body.dataset.pg=n;if(n==9&&window.LCCX)LCCX.R();if(n==10&&window.cmpRender)cmpRender();toTop();const sa=$('#saw');if(sa)sa.hidden=n!=0;hdr(n);hh();setTimeout(()=>fit(document),0);try{sessionStorage.vw=n}catch(e){}if(typeof gnav=='function')gnav(n)};
function hdr(n){const d=n==1;$('#hs1').textContent=d?'Technical Data Sheet':'코트 온';$('#hs2').textContent=d?'Data Sheet DB':n==3?(window.SYM=='db'?'Specification DB':'Coating System'):pqHs2(n)||'Unit Price Table';$('#tb0').classList.toggle('on',n==0||n==2);$('#tb1').classList.toggle('on',d);$('#tb3').classList.toggle('on',n==3);document.body.classList.toggle('cp',n==0);if(n==1)setTimeout(()=>{try{mfTds()}catch(e){}},400)}
try{$('#hxbg').src=$('#vh .hbg').src}catch(e){}

const dl=(b,n)=>{const touch=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),ios=/iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 if(touch&&navigator.share&&navigator.canShare){try{const fl=new File([b],n,{type:b.type||'application/octet-stream'});if(navigator.canShare({files:[fl]})){navigator.share({files:[fl],title:n}).catch(e=>{if(!e||e.name!=='AbortError')dlSheet(b,n)});return}}catch(e){}}
 const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=n;a.rel='noopener';a.style.display='none';document.body.appendChild(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(u)},8000);
 if(ios)setTimeout(()=>dlSheet(b,n),900)};
function dlSheet(b,n){const t=document.getElementById('pqdl');if(t)t.remove();const u=URL.createObjectURL(b);window.__dlb=b;
 pqSheet('pqdl',`<div class="pqmh"><span class="pqi">${PQI.save}</span><b>파일 저장</b></div><div class="pqn"><b>${esc(n)}</b><br>파일 다운로드가 시작되지 않았다면 아래 방법을 사용하세요.</div><div class="pqg2"><button class="pqbc" onclick="dlCopy()">내용 복사</button><button class="pqbc ok" onclick="window.open('${u}','_blank')">새 창에서 열기</button></div><div class="pqg2"><button class="pqbc" onclick="pqX('pqdl')">닫기</button></div>`)}
async function dlCopy(){try{const tx=await window.__dlb.text();await navigator.clipboard.writeText(tx);tt('내용을 복사했습니다<br><small>메모·파일 앱에 붙여넣어 저장하세요</small>')}catch(e){tt('복사하지 못했습니다<br><small>새 창에서 열기를 사용하세요</small>')}}
let IDBC=null;const idbOpen=()=>IDBC?Promise.resolve(IDBC):new Promise((ok,no)=>{const q=indexedDB.open('tds_'+EDITION,1);q.onupgradeneeded=()=>q.result.createObjectStore('f');q.onsuccess=()=>{IDBC=q.result;IDBC.onclose=IDBC.onversionchange=()=>{try{IDBC.close()}catch(e){}IDBC=null};ok(IDBC)};q.onerror=()=>no(q.error)}),idb=(m,k,v)=>idbOpen().then(d=>new Promise((ok,no)=>{const s=d.transaction('f',m=='get'?'readonly':'readwrite').objectStore('f'),r=m=='get'?s.get(k):m=='del'?s.delete(k):s.put(v,k);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)}));
const rec=p=>({dft:+p.dft||0,svr:+p.svr||0,loss:10,tr:p.tr?+(p.tr*100).toFixed(1):0}),ev=(c,p)=>{const r=rec(p),g=k=>c[k]===undefined||c[k]===''||c[k]===null?r[k]:+c[k];return{dft:g('dft'),svr:g('svr'),loss:g('loss'),tr:g('tr')}};
const UN=p=>/kg|㎏/i.test((p&&p.un)||'')?'kg':'L';
function thFb(){try{const L=[].concat(S.coats||[],(window.SY&&SY.layers)||[]);for(const x of L){const q=x&&x.n?PC(x.n):null;if(q&&+q.ts>0)return +q.ts}}catch(e){}return 0}
function calc(c){const p=PC(c.n);if(!p)return null;const e=ev(c,p),dft=e.dft,svr=e.svr;if(!dft||!svr)return null;const pk=+p.mk||+p.pk||18,L=e.loss/100,thv=dft/(svr*10),acv=thv/(1-L),kg=UN(p)=='kg'&&+p.sg>0,fm=kg?+p.sg:1,th=thv*fm,ac=acv*fm,up=(+c.price||0)/pk,rt=1/thv/fm;
const o=[{nm:c.n||p.n,use:p.g||p.d,th,ac,a1:[pk*rt,pk*rt*(1-L)],u:up,amt:ac*up,pk}],r=e.tr/100;
if(r>0){const tk=+p.ts||thFb()||18,tp=(+c.tprice||0)/tk;o.push({nm:'└ 전용 희석제: '+tnClean(p.tn||'희석제')+(p.tc&&p.tc!=p.tn?' ('+p.tc+')':''),use:'희석제 '+(p.tc||''),th:thv*r,ac:acv*r,a1:null,u:tp,amt:acv*r*tp,pk:tk})}return o}
function U(i,k,v){const c=S.coats[i];c[k]=v;if(k=='n'){const p=P(v);c.dft=c.tr=c.loss='';c.svr=p&&p.svr||'';sv();return cards()}res();sv()}
const CI={dft:SV('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5" opacity=".55"/>'),svr:SV('<path d="M6 18L18 6"/><circle cx="7.5" cy="7.5" r="1.6"/><circle cx="16.5" cy="16.5" r="1.6"/>'),loss:SV('<path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13"/>'),tr:SV('<path d="M12 3c-3.4 4.3-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-2.6-6.7-6-11z"/>'),area:SV('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),price:SV('<circle cx="12" cy="12" r="9"/><path d="M7.5 9l2 7 2.5-5 2.5 5 2-7M7 12h10M7.5 14.2h9"/>'),th:SV('<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>'),flask:SV('<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7.5 15h9"/>')};
const EXP={dft:'예: 200',svr:'예: 70',loss:'예: 10',tr:'예: 5',price:'예: 45,000',tprice:'예: 3,000'};
function ctab(i){S.coats.forEach((c,j)=>c.o=j==i);sv();cards();setTimeout(()=>{const e=document.querySelectorAll('#cs .cc')[i];if(e)e.scrollIntoView({behavior:'smooth',block:'start'})},60)}
function cardEdt(i){const p=P(S.coats[i].n);if(!p)return tt('제품을 먼저 선택하세요');const j=DB.indexOf(p);if(j<0)return tt('DB에 등록된 제품만 수정할 수 있습니다');pdOpen(j)}
function tdsPill(nm,ex,i){const st='event.preventDefault();event.stopPropagation();';return `<span class=psb><button type=button class="zsp no" data-t="${nm||'~c'+i}" onclick="${st}tds(${ex},${i})">${IC.doc}<span>미첨부</span></button><button type=button class="zsp at" onclick="${st}att(${ex},${i})"><span>첨부</span></button><button type=button class="zsp dl" onclick="${st}tdel(${ex},${i})"><span>삭제</span></button><button type=button class="zsp ed" onclick="${st}cardEdt(${i})"><span>제품 수정</span></button></span>`}
function tdsBar(nm,ex,x){return `<div class="tdr tdsbar${x?' t'+(3+x.split('<button').length-1):''}"><button class=no data-t="${nm}" onclick="tds(${ex})">${IC.doc}<span>미첨부</span></button><button class=at onclick="att(${ex})">${IC.doc}<span>첨부</span></button><button class=dl onclick="tdel(${ex})">${IC.trash}<span>삭제</span></button>${x||''}</div>`}
function cards(){try{cards0()}catch(e){cardsHeal(e)}}
function cardsHeal(err){
 const msg=String((err&&err.message)||err).slice(0,120);let bad=[];
 try{
  const keep=S.coats;if(!Array.isArray(keep)||!keep.length){S.coats=[{}];bad.push(0)}
  else{
   const ok=keep.map((c,i)=>{if(!c||typeof c!='object'){return null}S.coats=[c];try{cards0();return c}catch(e){return null}});
   S.coats=keep.map((c,i)=>{if(ok[i])return ok[i];bad.push(i+1);return {area:(c&&c.area)||''}});
  }
  sv();cards0();
 }catch(e2){
  try{const el=document.getElementById('cs');if(el)el.innerHTML='<div class="ccard" style="padding:14px;color:#b3261e">코트 카드를 표시하지 못했습니다.<br><small>'+esc(String(e2&&e2.message||e2))+'</small><br><button class="gb" style="margin-top:8px" onclick="if(confirm(\'일위대가표 입력값을 초기화할까요?\')){S={area:\'\',labor:0,coats:[{}]};sv();cards()}">입력값 초기화</button></div>'}catch(_){}
  return;
 }
 try{tt('저장된 코트 데이터 일부가 손상되어 복구했습니다<br><small>'+(bad.length?bad.join(', ')+'번 코트 초기화 · ':'')+esc(msg)+'</small>')}catch(_){}
}
function cards0(){try{ndRs0()}catch(e){}try{const t=document.getElementById('sttl');if(t&&document.activeElement!==t)t.value=S.ttl||''}catch(e){}$('#ar').value=+S.area>0?S.area:'';$('.sa').classList.toggle('emp',!(+S.area>0));applyLock();$('#cnt').textContent=DB.length+'개';
const NC=S.coats.length,labs=syLabsOld(NC);
$('#cs').innerHTML=(NC>1?`<div class=ctabs>${S.coats.map((c,i)=>`<button class="ctab${c.o!==false?' on':''}" style="${cvars(i)}" onclick="ctab(${i})">${od(i+1)}${labs[i]?' · '+labs[i]:''}</button>`).join('')}</div>`:'')+S.coats.map((c,i)=>{const p=P(c.n),u=p?UN(p):'ℓ',m=p?mx(p):{},rc=p?rec(p):{},op=c.o!==false,nm=(c.n||'').replace(/"/g,''),lb=labs[i]?' · '+labs[i]:'',
f=(l,key,ic,ph)=>`<div class="cell k-${key}"><div class=lb>${CI[ic]||''}<span>${l}</span></div><input type=number inputmode=decimal data-k=${key} placeholder="${ph||(p&&rc[key]!==undefined&&rc[key]!==''?rc[key]:(EXP[key]||''))}" value="${c[key]??''}" oninput="U(${i},'${key}',this.value)"></div>`;
return `<div class=cc style="${cvars(i)}"><div class=ch onclick="tg(${i})"><div class=cht><div class=chn><i class="chk${op?' on':''}"></i><span style="color:var(--cd)">${od(i+1)}${lb}</span>${nm&&!c.cu?`<em class=chp>${nm}</em>`:''}</div><div id=h${i} class="cv chs"></div></div><button type=button class=chsel onclick="event.stopPropagation();chSel()">${SV('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>')}<span>도장사양 선택</span></button><span class=chv style="transform:rotate(${op?180:0}deg)">${SV('<path d="M6 9l6 6 6-6"/>')}</span></div><div class=cbd ${op?'':'hidden'}>${c.cu?cuForm(i,c):''}<div ${c.cu?'hidden':''}><div class="cbox${(nm||c.dft||c.svr||c.loss||c.tr||c.price||c.tprice||c.area)?' neon':''}"><div class=prow><div class=pin><input value="${nm}" placeholder="제품명 입력 · 일부 입력시 목록 표시" onfocus="sgst(${i},this.value)" oninput="sgst(${i},this.value)" onblur="setTimeout(()=>{const b=$('#cb${i}');if(b)b.hidden=true},150)" onchange="chg(${i},this.value)"><span class=pdv onmousedown="event.preventDefault()" onclick="this.previousElementSibling.focus()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span></div>${p&&m.m>0?`<div class=pspec><small>규격</small><b>${F(m.m)}${u}</b></div>`:''}<button class="gb gen" onclick="cuOn(${i})">+ 생성</button></div><div class=cb id=cb${i} hidden onmousedown="event.preventDefault()"></div>
<div class=rec>${p?`추천 도막 ${rc.dft}㎛ · SVR ${rc.svr}% · Loss ${rc.loss}% · 희석 ${rc.tr}% · 전용 희석제 ${p.tn&&p.tn!='무희석'?p.tn+(p.tc&&p.tc!=p.tn?' ('+p.tc+')':''):'무희석'}`:'제품 선택 시 추천값 자동 적용 · DB에 없으면 DFT·SVR 입력'}</div>
<div class="ccard${c.cm===1?' cmin':''}"><div class=cch onclick="ccTg(${i},this,event)"><span class=cci>${CI.flask}</span><div><b>소요량 및 조건</b><small>Consumption &amp; Condition</small></div><label class=carea><span>면적 [m²]</span><input type=number inputmode=decimal data-k=area placeholder="기본면적" value="${c.area??''}" oninput="U(${i},'area',this.value)"></label><button type=button class=ctg aria-label="접기/펼치기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button></div><div class="cg3 cg4">${f('DFT [μm]','dft','dft')}${f('SVR (%)','svr','svr')}${f('Loss (%)','loss','loss')}${f('희석율 (%)','tr','tr')}</div><div class="cg3 cgp">${f('제품단가 [원/1말]','price','price','')}${f('희석제 단가 [원]','tprice','price','')}</div><details class=addc ${c.ap===0?'':'open'} ontoggle="if(S.coats[${i}])S.coats[${i}].ap=this.open?1:0"><summary class=pshd><span class=pst><span class=pstx><b>제품소개</b><small>${p?esc(p.n):'제품을 선택하세요.'}</small></span></span>${tdsPill(nm,`S.coats[${i}].n`,i)}</summary>${p?`<div class="dsemb">${typeof dsSecs=="function"?dsSecs(p):""}</div>`:''}</details><div class="cg3 cgr"><div class="cell ro"><div class=lb>${CI.th}<span>이론 소요량 (${u}/m²)</span></div><div class=rov id=th${i}>-</div></div><div class="cell ro"><div class=lb>${CI.th}<span>실제 소요량 (${u}/m²)</span></div><div class=rov id=ac${i}>-</div></div><div class="cell ro"><div class=lb>${CI.area}<span>캔당 면적 (m²)</span></div><div class=rov id=ca${i}>-</div></div></div></div></div></div><div id=r${i}></div></div></div></div>`}).join('')+lbForm('p',0,S.lab||{});try{ndRs1()}catch(e){}res();mark()}
function chSel(){T(3);setTimeout(()=>{try{syLibSheet()}catch(e){}},90)}
const cuOn=i=>{const c=S.coats[i];c.cu=true;c.cp=c.cp||{un:'ℓ'};c.o=true;sv();cards()},cuOff=i=>{S.coats[i].cu=false;sv();cards()},CU=(i,k,v)=>{const c=S.coats[i];(c.cp=c.cp||{})[k]=v;sv()};
function cuForm(i,c){const d=c.cp||{},f=(l,k,ic,ph,tx)=>`<div class=cell><div class=lb>${CI[ic]||''}<span>${l}</span></div><input ${tx?'':'type=number inputmode=decimal '}placeholder="${ph||''}" value="${esc(d[k]??'')}" oninput="CU(${i},'${k}',this.value)"></div>`;
return `<div><div class=prow><div class=pin><input placeholder="제품명 입력 (필수)" value="${esc(d.n??'')}" oninput="CU(${i},'n',this.value)"></div><button class="gb gen" onclick="cuOff(${i})">목록 선택</button></div>
<div class=rec>직접 입력 모드 · 입력한 값으로 새 제품이 DB에 등록되고 바로 계산됩니다</div>
<div class="ccard${c.cm===1?' cmin':''}"><div class=cch onclick="ccTg(${i},this,event)"><span class=cci>${CI.flask}</span><div><b>소요량 및 조건</b><small>Consumption &amp; Condition</small></div><label class=carea><span>면적 [m²]</span><input type=number inputmode=decimal data-k=area placeholder="기본값" value="${c.area??''}" oninput="U(${i},'area',this.value)"></label><button type=button class=ctg aria-label="접기/펼치기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button></div><div class="cg3 cg4">${f('DFT [μm]','dft','dft')}${f('SVR (%)','svr','svr')}${f('Loss (%)','loss','loss','10')}${f('희석율 (%)','tr','tr')}</div><div class="cg3 cgp">${f('제품단가 [원/1말]','price','price')}${f('희석제 단가 [원]','tprice','price')}</div></div>
<div class=ccard><div class=cch><span class=cci>${CI.th}</span><div><b>제품 정보</b><small>Product Information</small></div><div class=cuact2><button class=a3 onclick="cuEdit(${i})">수정</button><button class=a4 onclick="cuSave(${i})">계산</button><button class=a1 onclick="cuTds(${i})">저장</button><button class=a2 onclick="cuTdel(${i})">삭제</button></div></div><div class=cg3><div class=cell><div class=lb>${CI.flask}<span>단위</span></div><select onchange="CU(${i},'un',this.value)"><option value="ℓ" ${d.un!='kg'?'selected':''}>ℓ (리터)</option><option value="kg" ${d.un=='kg'?'selected':''}>kg</option></select></div>${f('혼합규격 1말','mk','svr','예: 18')}${f('출고규격 (주제)','pk','svr','단액형 비움')}${f('비중','sg','svr','kg일 때')}${f('희석제 규격','ts','tr','예: 18')}${f('제조사','mf','th','예: KCC',1)}</div>
<div class=cg2>${f('일반명 · 용도','g','th','예: 에폭시 하도',1)}${f('희석제명','tn','tr','없으면 비움',1)}</div></div>
<div class=hint>제품명만 필수입니다. 나머지는 비워 두면 추천값 없이 입력한 값으로 계산됩니다. 기술자료 파일을 올리면 자동으로 채워 등록합니다</div></div>`}
function cuSave(i,q){const c=S.coats[i],d=c.cp||{},n=(d.n||'').trim();if(!n)return tt('제품명을 입력하세요');if(DB.some(q=>q.n==n))return tt('같은 이름의 제품이 이미 있습니다<br><small>"목록에서 선택"을 누르거나 제품명을 바꿔 주세요</small>');
const g=k=>d[k]!==undefined&&d[k]!==''&&isFinite(+d[k])?+d[k]:0,mk=g('mk')||g('pk'),pk=g('pk')||mk,p={n,mf:(d.mf||'').trim(),g:d.g||'',us:d.g||'',d:'',tc:'',ts:g('ts'),url:'',un:d.un||'ℓ',pk,mk,tn:d.tn||'',tr:g('tr')?g('tr')/100:0,cu:1};
if(g('sg'))p.sg=g('sg');if(g('svr'))p.svr=g('svr');if(g('dft'))p.dft=g('dft');if(p.svr&&p.dft)p.th=+(p.svr*10/p.dft).toFixed(4);
DB.push(p);c.n=n;c.dft=c.tr='';c.loss=d.loss!==undefined?d.loss:'';c.svr=p.svr||'';if(d.area!==undefined&&d.area!=='')c.area=d.area;if(d.price!==undefined&&d.price!=='')c.price=d.price;if(d.tprice!==undefined&&d.tprice!=='')c.tprice=d.tprice;c.cu=false;delete c.cp;sv();cards();dbl();if(!q)tt('직접 입력한 제품을 등록했습니다<br><small>'+esc(n)+'</small>')}
function cuTds(i){const k=document.createElement('input');k.type='file';k.accept='.pdf,application/pdf,image/*';k.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.append(k);
k.onchange=async()=>{const f=k.files[0];k.remove();if(!f)return;LAST=[];try{await afTds([f],1)}catch(e){return tt('기술자료를 읽지 못했습니다<br>'+esc(e.message||e))}if(LAST[0]){const c=S.coats[i];c.n=LAST[0];c.dft=c.tr=c.loss='';c.svr=(P(LAST[0])||{}).svr||'';c.cu=false;delete c.cp;sv();cards()}};k.click()}
function cuEdit(i){const d=S.coats[i].cp||{},n=(d.n||'').trim();if(!n)return tt('제품명을 입력하세요');const go=()=>{const j=DB.findIndex(p=>p.n==n);if(j>=0)pdOpen(j)};if(DB.some(p=>p.n==n))return go();ask('입력한 제품을 DB에 등록하고<br>제품 수정 화면으로 이동할까요?',()=>{cuSave(i,1);go()})}
function cuTdel(i){const n=((S.coats[i].cp||{}).n||'').trim();if(!n)return tt('제품명을 입력하세요');if(!P(n))return tt('등록되지 않은 제품입니다<br><small>삭제할 TDS가 없습니다</small>');tdel(n)}
function ccNeonAll(){document.querySelectorAll('#cs .cc').forEach((e,i)=>{const c=S.coats[i],b=e.querySelector('.cbox');if(!c||!b)return;b.classList.toggle('neon',!!(c.n||c.dft||c.svr||c.loss||c.tr||c.price||c.tprice||c.area))})}
function res(){try{ccNeonAll()}catch(e){}RP=[];document.querySelectorAll('[data-k=area]').forEach(e=>e.placeholder='기본면적');
const A=+S.area||1,v=x=>`<span class=cv>${x}</span>`;let sec='',rows='',pr='',tot=0,T2=0,buy=0,sM=0,sT=0,sTh=0,sAc=0,any=0;const PT=[];const SBR=window.subRows?subRows():[],SBA=SBR.reduce((z,r)=>z+Math.round(r.q*r.p),0);
S.coats.forEach((c,i)=>{const r=calc(c),hh=$('#h'+i),el=$('#r'+i),o=od(i+1);if(hh)hh.textContent='';if(el)el.innerHTML='';const te=$('#th'+i),ae=$('#ac'+i),ce=$('#ca'+i);if(ce){ce.textContent='자동 계산됩니다.';ce.classList.add('emp')}if(te){te.textContent='자동 계산됩니다.';te.classList.add('emp')}if(ae){ae.textContent='자동 계산됩니다.';ae.classList.add('emp')}
if(!r)return;
any=1;const p=PC(c.n),Ac=+c.area||A,s=r.reduce((a,x)=>a+x.amt,0),a=r[0],t=r[1],m=mx(p),u=UN(p);const pa=Ac>0?f10(a.amt*Ac):0,da=t&&Ac>0?f10(t.amt*Ac):0,ct=pa+da;tot+=s;T2+=ct;sM+=a.amt;sT+=t?t.amt:0;sTh+=a.th;sAc+=a.ac;
const cA=a.ac>0?a.pk/a.ac:0;if(hh)hh.textContent=`${tdsHh(p,u,a)} · ㎡당 ${F(s,0)}원`+(cA>0?` · 캔당 ${F(cA,1)}㎡`:'');{const ce2=$('#ca'+i);if(ce2&&cA>0){ce2.textContent=F(cA,1);ce2.classList.remove('emp')}}if(te){te.textContent=F(a.th);te.classList.remove('emp')}if(ae){ae.textContent=F(a.ac);ae.classList.remove('emp')}tdsFx(p,u,a,te,ae);
let cc=0;r.forEach(x=>{cc+=Math.ceil(x.ac*Ac/x.pk-1e-9)*x.pk*x.u});buy+=cc;
const nq=x=>{const q=x.ac*Ac,k=Math.ceil(q/x.pk-1e-9);return Ac>0?`${F(q)}${x===a?u:'L'} → ${k}말`:'면적 입력 시 표시'};
const nqs=Ac>0?'제품 '+nq(a)+(t?' · 희석제 '+nq(t):''):'면적 입력 시 표시';
const Lh=lcard(i,o,c,a,t,Ac,u,ev(c,p)),Rh=rcard(o,Ac,a,t,ct,cc,u,i);RP[i]={L:Lh,R:Rh};PT.push({i,o,nm:p.n,u,q:a.ac*Ac,k:Math.ceil(a.ac*Ac/a.pk-1e-9),pa,tn:t?t.nm.replace(/^└ 전용 희석제: /,''):'',tq:t?t.ac*Ac:0,tk:t?Math.ceil(t.ac*Ac/t.pk-1e-9):0,da,Ac});
rows+=`<div class=xpr>${xb(i,Lh,Rh)}</div>`;
});
const fl=x=>F(Math.floor(x/10)*10,0),FM='<div class=fmb><b>■ 소요량 산출 공식</b><div class=fmr><b>이론 소요량</b> [L/㎡]</div><div class=fmf>추천도막두께[㎛] ÷ (SVR[%] × 10)</div><div class=fmr><b>실제 소요량</b> [L/㎡]</div><div class=fmf>이론 소요량 ÷ (1 − Loss[%] ÷ 100)</div><small>※ kg 단위 제품은 비중을 곱해 kg/㎡로 환산<br>예) 추천도막두께 100㎛ · SVR 50% · Loss 10% → 이론 0.2 / 실제 약 0.22 L/㎡</small></div>',NT='<div class=nt>⚠ 본 자료는 참고용이며 현장 상황·작업자 숙련도에 따라 실제 사용량은 다를 수 있습니다. 산출 근거는 도료 소요량 공식이며, 활용에 따른 판단과 책임은 사용자에게 있으며, 제작자는 법령이 허용하는 범위에서 책임을 지지 않습니다.</div>';
const BU={};PT.forEach(r=>{const k=r.u==='ℓ'?'L':r.u;BU[k]=(BU[k]||0)+r.q});const tLq=PT.reduce((z,r)=>z+r.tq,0),f2=x=>(+x).toFixed(2),jn=o=>{const e=Object.entries(o).filter(([k,v])=>v>0);return e.length?e.map(([k,v])=>`${f2(v)}<small>${k}</small>`).join(' + '):`0.00<small>L</small>`},TT=Object.assign({},BU);if(tLq>0)TT.L=(TT.L||0)+tLq;const DRP='<svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="currentColor" style="flex:none"><path d="M12 2.5c-3.4 4.3-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-2.6-6.7-6-11z"/></svg>';
const sP=PT.reduce((z,r)=>z+r.pa,0),sD=PT.reduce((z,r)=>z+r.da,0),tcl=PT.map(r=>`<div class=tcr style="${cvars(r.i)}"><span class=tcn><i>${r.o}</i>${esc(r.nm)}</span><span class=tcq>${r.Ac>0?F(r.q)+r.u+' → '+r.k+'말'+(r.tn?' · 희석제 '+F(r.tq)+'L':''):'면적 입력 시 표시'}</span><span class=tca>${r.Ac>0?F(r.pa+r.da,0)+'원':'-'}</span></div>`).join('');
$('#rs').innerHTML=(any?`<div class=rcw><div class=rch><span class=rcht>${DRP}소요량 계산 결과</span><button type=button class=rdb onclick="rdOpen()">세부 내역</button></div><div class=rcb><div class=rcg><div class="rcc rth"><div class=rcl><b>이론 소요량 <small>(L/㎡)</small></b></div><div class=rcf>DFT[㎛] ÷ (SVR[%] × 10)</div><div class=rcv>${F(sTh)}<small>L/㎡</small></div></div><div class="rcc rac"><div class=rcl><b>실제 소요량 <small>(L/㎡)</small></b></div><div class=rcf>이론 ÷ (1 − Loss[%]÷100)</div><div class=rcv>${F(sAc)}<small>L/㎡</small></div></div></div><div class=rcs><div><span>소요량(예상)</span><b>${jn(BU)}</b></div><div><span>희석제 소요량</span><b>${jn({L:tLq})}</b></div><div><span>총 소요량</span><b>${jn(TT)}</b></div></div></div></div><div class=tcd><div class=tct><span>총 금액<small>제품 + 희석제 · VAT 별도</small></span><b>${(T2+SBA)>0?F(T2+SBA,0)+'<small>원</small>':'-'}</b></div><div class=tcm><span>제품 <b>${F(sP,0)}원</b></span><span>희석제 <b>${F(sD,0)}원</b></span>${SBA>0?`<span>부자재 <b>${F(SBA,0)}원</b></span>`:''}<span>㎡당 <b>${fl(tot)}원</b></span></div><div class=tcl>${tcl}${SBR.map(r=>`<div class=tcr><span class=tcn><i>+</i>${esc(r.n)}</span><span class=tcq>${F(r.q)}${r.u}</span><span class=tca>${r.p>0?F(Math.round(r.q*r.p),0)+'원':'-'}</span></div>`).join('')}</div><div class=tch>${T2>0?'십원 미만 절사 · 소요량 단위 L·kg/㎡':'면적과 단가를 입력하면 총 금액이 표시됩니다'}</div></div>`:'')+(any?FM:'')+NT;rcFit()}
async function tds(n0,ci){const n=attK(n0,ci);if(!n)return tt('등록된 TDS가 없습니다');const p=P(n);const f=await idb('get',n).catch(()=>0);if(f){const bl=f.buf?new Blob([f.buf],{type:f.type}):f.b;vwr(bl,f.name,f.type||bl.type||'')}else if(p&&p.url)open(p.url);else tt('등록된 TDS가 없습니다. "TDS 첨부"로 PDF를 추가하거나 DB의 TDS링크 열에 주소를 넣으세요.')}
const attK=(n,i)=>(n||'').trim()||(i!=null?'~c'+i:'');
function att(n0,ci){const n=attK(n0,ci);if(!n)return tt('제품명을 입력하거나 일위대가표 칸에서 첨부하세요');const i=document.createElement('input');i.type='file';i.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.append(i);
i.onchange=async()=>{const f=i.files[0];i.remove();if(!f)return;try{const buf=await f.arrayBuffer();await idb('put',n,{name:f.name,type:ft(f),buf});mark();if(/pdf/i.test(f.type+f.name)){tt('TDS 첨부 완료<br>'+f.name);if(P(n))setTimeout(()=>{ext(n,f).catch(()=>0)},700);else if(ci!=null)setTimeout(()=>{extC(n,ci,f).catch(()=>0)},700)}else tt('TDS 첨부 완료<br>'+f.name)}catch(e){tt('첨부 실패: '+(e&&e.message||e)+'<br>저장 공간이나 브라우저 설정을 확인하세요')}};i.click()}
const cv=x=>`<span class=cv>${x}</span>`;let LAST=[],LIM=100;
let TLAST=[],TF='all',TK=[];
let DBO=false;
const DBX={"doc": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 3h7l5 5v13H7z\"/><path d=\"M14 3v5h5M10 13h6M10 17h6\"/></svg>", "search": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M20 20l-4-4\"/></svg>", "chev": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", "cube": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3l8 4.5v9L12 21l-8-4.5v-9z\"/><path d=\"M4 7.5l8 4.5 8-4.5M12 12v9\"/></svg>", "list": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01\"/></svg>", "note": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z\"/><path d=\"M14 3v5h5M8.5 13h7M8.5 17h4\"/></svg>", "refresh": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 12a8 8 0 1 1-2.6-5.9\"/><path d=\"M20 4v5h-5\"/></svg>", "snow": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5\"/><path d=\"M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5\"/></svg>", "sun": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1\"/></svg>", "info": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5.2M12 7.7v.01\"/></svg>", "eye": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>", "clip": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20.5 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.8-8.8a3.3 3.3 0 0 1 4.7 4.7l-8.8 8.8a1.7 1.7 0 0 1-2.4-2.4l8-8\"/></svg>", "trash": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6\"/></svg>", "edit": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V12\"/><path d=\"M18.5 2.6a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z\"/></svg>", "check": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7\"/></svg>", "timer": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"13.5\" r=\"7.5\"/><path d=\"M12 9.5v4l2.5 2M9.5 2.5h5\"/></svg>", "x": "<svg class=\"\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg>", "donut": "<svg class=\"qsi-svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7.5\" fill=\"none\" stroke=\"#2f7be8\" stroke-width=\"4.2\"/><path d=\"M12 4.5a7.5 7.5 0 0 1 7.5 7.5\" fill=\"none\" stroke=\"#0f2c5c\" stroke-width=\"4.2\"/><path d=\"M12 19.5a7.5 7.5 0 0 1-7.5-7.5\" fill=\"none\" stroke=\"#0f2c5c\" stroke-width=\"4.2\"/></svg>"};
const dbxF=v=>{v=String(v==null?'':v).trim();return(!v||v=='-')?'-':esc(v)};
const dbxTv=c=>{const n=parseFloat(String(c[0]||'').replace(/[^\d.\-]/g,''));return isNaN(n)?999:n};
const dbxTl=c=>String(c[0]||'?').replace(/\s/g,'').replace('℃','°C');
const dbxCell=(l,v,x)=>`<div class="dsc${x?' '+x:''}"><span class="qsl">${l}</span><span class="dsv">${v}</span></div>`;
const dbxSec=(ic,t,body,open,cls)=>`<details class="dsec${cls?' '+cls:''}"><summary class="qsh"><span class="qsi">${ic}</span><b>${t}</b>${DBX.chev.replace('<svg class="','<svg class="dsc-chv ')}</summary><div class="dsbody">${body}</div></details>`;
function dbxDry(p){
 const R=String(p.dry||'').split(/[;\n]/).map(x=>x.trim()).filter(Boolean).map(r=>r.split('/').map(x=>x.trim())).sort((a,b)=>dbxTv(a)-dbxTv(b));
 let h='';
 if(R.length){
  const cl=c=>{const t=dbxTv(c);return t<=12?'c1':t<=25?'c2':'c3'};
  h+=`<div class="dtb" style="--n:${R.length}"><div class="dth c0">구분</div>`+R.map(c=>`<div class="dth ${cl(c)}">${cl(c)=='c1'?DBX.snow:DBX.sun}<span>${esc(dbxTl(c))}</span></div>`).join('');
  [['지촉',1],['고화',2],['완전경화',3]].forEach(([nm,k])=>{h+=`<div class="dtl">${nm}</div>`+R.map(c=>`<div class="dtv">${dbxF(c[k])}</div>`).join('')});
  h+='</div>';
 }
 if(p.pot)h+=`<div class="drc pot"><span class="drt">${DBX.timer}<b>가사시간</b></span><span class="drr"><b class="mn">${esc(p.pot)}</b></span></div>`;
 if(R.length){
  const hr=c=>(c[4]&&c[4]!='-')||(c[5]&&c[5]!='-');
  const main=R.find(c=>dbxTv(c)==20&&hr(c))||R.find(hr)||R.find(c=>dbxTv(c)==20)||R[0];
  const rc=(c,big)=>`<span class="drr${big?'':' qsm'}"><em>${esc(dbxTl(c))} 기준</em><em>최소</em><b class="mn">${dbxF(c[4])}</b><i>→</i><em>최대</em><b class="mx">${dbxF(c[5])}</b></span>`;
  h+=`<div class="drc"><span class="drt">${DBX.refresh}<b>재도장 간격</b></span>${hr(main)?rc(main,1):'<span class="drr"><b class="mx">-</b></span>'}</div>`;
  R.filter(c=>c!==main&&hr(c)).forEach(c=>{h+=`<div class="drc qx"><span class="drt"></span>${rc(c,0)}</div>`});
 }
 h+=`<div class="dnt">${DBX.info}<div><span>지촉: 손에 묻지 않는 시간 ·</span> <span>고화: 눌러도 자국이 없는 시간 ·</span> <span>완전경화: 사용 가능 상태</span><br>재도장: 다음 코트 도장 가능 간격(최소~최대)${p.dsrc?'<br>TDS에서 자동 추출 · 원문과 대조 필요':''}</div></div>`;
 return h;
}
function dbxSpec(p){
 const m=mx(p),u=UN(p),two=m.b>0,t=thc(p);
 const tn=p.tn&&p.tn!='무희석'?esc(p.tn)+(p.tc&&p.tc!=p.tn?' ('+esc(p.tc)+')':'')+(+p.tr?' · 희석율 '+F(p.tr*100,1)+'%':''):'무희석';
 const area=t?(u=='kg'&&+p.sg>0?F(t/p.sg)+'m²/kg':F(t)+'m²/L'):'-';
 return `<div class="qsg">`
  +dbxCell('혼합규격',F(m.m)+u)
  +dbxCell('혼합비'+(two?' <small>('+(u=='kg'?'무게비':'부피비')+')</small>':''),two?F(m.a/m.b)+' : 1':'단액형')
  +dbxCell('출고규격',two?'주제 '+F(m.a)+' : 경화제 '+F(m.b):F(m.a)+u)
  +dbxCell('희석제',tn)
  +dbxCell('SVR (고형분 용적비)',p.svr?p.svr+'%':'-')
  +dbxCell('추천도막',p.dft?p.dft+'μm':'-')
  +dbxCell('이론 도장면적 (L·kg당 · 로스 제외)',area,'qbig')
  +dbxCell('혼합규격당 도장면적',cov1(p)?F(cov1(p),1)+'m²':'-')
  +`</div>`;
}
function dbxMore(p){
 const m=mx(p),u=UN(p),c1=cov1(p);
 let h='<div class="qsg qone">';
 if(p.g&&p.d)h+=dbxCell('제품설명',esc(p.d),'qw');
 if(p.sg)h+=dbxCell('비중',F(p.sg));
 
 if(p.pre)h+=dbxCell('선행도장',esc(p.pre));
 if(p.nxt)h+=dbxCell('후속도장',esc(p.nxt));
 if(p.pks)h+=dbxCell('데이터시트 포장규격',esc(p.pks));
 h+='</div>'+metaLine(p);
 return h;
}
function dbxSub(p){
 const a=[];const f=p.g||p.d;if(f)a.push(esc(f));
 const us=p.us||'';if(us)a.push('용도 '+esc(us));
 if(p.sp)a.push('표면처리 '+esc(p.sp));
 return a.length?a.map(x=>`<span>${x}</span>`).join(''):'<span class="no">등록된 설명이 없습니다</span>';
}
function dbxBadge(p){let adm=false;try{adm=!!IS_ADMIN}catch(e){}return (p.ver?'<span class="pdv qg">검증</span>':'<span class="pdv qy">미검증</span>')+(adm&&p.lic?'<span class="pdv qb">배포승인</span>':'')}
function dbl(){const OP=[...document.querySelectorAll('details.pdc[open]')].map(x=>x.dataset.n),q=($('#q').value||'').toLowerCase(),has=p=>TK.includes(p.n)||p.url,L=DB.map((p,j)=>[p,j]).filter(([p])=>(p.n+p.g+p.d+p.e+(p.mf||'')).toLowerCase().includes(q)&&(TF=='all'||(TF=='y')==!!has(p))&&(MF=='all'||(p.mf||'미지정')==MF)).sort((a,b)=>(LAST.includes(b[0].n)-LAST.includes(a[0].n))||(TLAST.includes(b[0].n)-TLAST.includes(a[0].n))),na=DB.filter(has).length,ch=[['all','전체 '+DB.length,DBX.cube],['y','TDS 첨부 '+na,DBX.doc],['n','미첨부 '+(DB.length-na),DBX.doc]].map(([k,l,ic])=>`<button type="button" class="${TF==k?'qon':''}" onclick="TF='${k}';dbl()">${ic}<span>${l}</span></button>`).join('');LFJ=L.map(x=>x[1]);const mfs=[...new Set(DB.map(p=>p.mf||'미지정'))].sort(),mfr=`<select class=mfsel aria-label="제조사 선택" onchange="MF=this.value;dbl()"><option value=all>제조사 전체</option>${mfs.map(m=>`<option ${MF==m?'selected':''}>${esc(m)}</option>`).join('')}</select>`;{const w=$('#mfw');if(w)w.innerHTML=mfr}{const c=$('#dbch');if(c)c.innerHTML=ch}
$('#dbl').innerHTML=`<details class="qtot" ${DBO?'open':''} ontoggle="DBO=this.open"><summary class="dbth">${DBX.list}<b>총 ${DB.length}개 중 ${Math.min(LIM,L.length)}개 표시됨${q?' (검색 '+L.length+'개)':''}</b>${DBX.chev.replace('<svg class="','<svg class="dbt-chv ')}</summary><div class="dbtl">`+L.slice(0,LIM).map(([p,j])=>{const nm=p.n.replace(/"/g,'');return `<details class="pdc" data-n="${nm}" ${OP.includes(p.n)?'open':''}><summary class="pdh"><span class="dxth">${DXI.can}</span><div class="dxmid"><div class="pd1"><span class="pdn">${esc(p.n)}</span>${p.mf?`<span class="pdm">${esc(p.mf)}</span>`:''}${dbxBadge(p)}${TLAST.includes(p.n)?'<small class="cv">✅ 매칭됨</small>':''}<span class="qtdp" data-ti="${nm}"></span></div><div class="pd2"><div class="pds dxd">${p.d?`<span>${esc(p.d)}</span>`:dbxSub(p)}</div></div></div><span class="dxtg">${esc(dbxTags(p))}</span>${DBX.chev.replace('<svg class="','<svg class="pdc-chv ')}</summary><div class="pdb">${dbxInfo(p)}</div></details><div class="pdbar"><button type="button" class="qbv no" data-t="${nm}" onclick="tds(DB[${j}].n)">${DBX.doc}<span>미첨부</span></button><button type="button" class="qba" onclick="att(DB[${j}].n)">${DBX.clip}<span>첨부</span></button><button type="button" class="qbd" onclick="tdel(DB[${j}].n)">${DBX.trash}<span>삭제</span></button><button type="button" class="qbe" onclick="edt(${j})">${DBX.edit}<span>제품 수정</span></button></div>`}).join('')+(L.length>LIM?`<button type="button" class="dbmore" onclick="LIM+=100;dbl()">더 보기</button>`:'')+'</div></details>';mark()}
function dbrsClose(){const d=document.getElementById('dbrs');if(d)d.open=false}
document.addEventListener('click',e=>{const d=document.getElementById('dbrs');if(d&&d.open&&!d.contains(e.target))d.open=false});
function tdel(n0,ci){const n=attK(n0,ci);if(!n)return tt('삭제할 TDS가 없습니다');const p=P(n);ask('첨부된 TDS를 삭제할까요?',async()=>{await idb('del',n).catch(()=>0);if(p&&p.dsrc){delete p.dry;delete p.dsrc;delete p.it;sv()}cards();dbl();tt('TDS를 삭제했습니다')})}
function del(j){const n=DB[j].n;ask('⚠ 삭제 경고<br><b>'+n+'</b><br>이 제품을 DB에서 삭제합니다.<br>삭제하면 되돌릴 수 없습니다. 계속할까요?',()=>{DB.splice(j,1);sv();dbl();cards()})}
function clr(){ask('모든 입력 내용을 지울까요?'+(S.lock?'<br><small>(고정된 기본면적은 유지됩니다)</small>':''),()=>{const prev=JSON.stringify(S);S={area:S.lock?S.area:'1',lock:!!S.lock,rp:S.rp,labor:0,coats:[{}]};sv();cards();undoBar('입력을 지웠습니다',()=>{try{S=JSON.parse(prev)}catch(e){return}sv();cards();tt('되돌렸습니다')})})}
/* 되돌리기 막대: 실수로 지웠을 때 10초 안에 복구 (공통 상태 표시 — 저장됨·되돌리기) */
function undoBar(msg,fn){let e=document.getElementById('undobar');if(e)e.remove();e=document.createElement('div');e.id='undobar';e.setAttribute('role','status');e.style.cssText='position:fixed;left:12px;right:12px;bottom:calc(60px + env(safe-area-inset-bottom,0px));z-index:2147483500;max-width:520px;margin:0 auto;display:flex;align-items:center;gap:10px;padding:8px 8px 8px 14px;border-radius:7px;background:#0b2354;color:#fff;font-size:13px;box-shadow:0 6px 20px rgba(0,0,0,.28)';
 const t=document.createElement('span');t.style.cssText='flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';t.textContent=msg;const b=document.createElement('button');b.type='button';b.textContent='되돌리기';b.style.cssText='flex:none!important;width:auto!important;min-width:84px;margin:0!important;height:30px;padding:0 14px;border:0;border-radius:7px;background:#fff;color:#0b4fd0;font-weight:800;font-size:13px';
 const kill=()=>{clearTimeout(tm);e.remove()},tm=setTimeout(kill,10000);b.onclick=()=>{kill();fn()};e.append(t,b);document.body.append(e)}
function sgst(i,q){const b=$('#cb'+i);if(!b)return;q=(q||'').trim().toLowerCase();const L=DB.map((p,j)=>[p,j]).filter(([p])=>!q||(p.n+' '+p.g).toLowerCase().includes(q)).slice(0,40);b.innerHTML=L.length?L.map(([p,j])=>`<div onclick="pick(${i},${j})"><b>${p.n}</b><br><small>${p.g||''}</small></div>`).join(''):'<div><small>일치하는 제품이 없습니다</small></div>';b.hidden=false}
const pick=(i,j)=>U(i,'n',DB[j].n),chg=(i,v)=>{if(!v||P(v))U(i,'n',v)};
let UNDO=null,TTM;
function tt(m){pop(m)}
function tta(m,ms){let e=document.getElementById('tta');if(!e){e=document.createElement('div');e.id='tta';e.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2147483600;max-width:84%;padding:14px 22px;border-radius:14px;background:rgba(16,38,79,.94);color:#fff;font-size:14px;line-height:1.5;text-align:center;box-shadow:0 8px 28px rgba(0,0,0,.3);pointer-events:none;transition:opacity .25s';document.body.append(e)}e.innerHTML=m;e.style.display='block';e.style.opacity='1';clearTimeout(tta.t);if(ms)tta.t=setTimeout(ttaOff,ms)}
function ttaOff(){const e=document.getElementById('tta');if(!e)return;clearTimeout(tta.t);e.style.opacity='0';setTimeout(()=>{if(e.style.opacity==='0')e.style.display='none'},260)}
function ask(m,fn){pop(m,fn)}
function pop(m,fn){let e=$('#pp');if(!e){e=document.createElement('div');e.id='pp';e.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:20;align-items:center;justify-content:center;padding:24px';document.body.append(e)}
e.innerHTML='<div style="background:#fff;border-radius:14px;padding:18px;max-width:340px;width:100%;text-align:center"><div style="margin-bottom:14px;line-height:1.5">'+m+'</div><div style="display:flex;gap:8px">'+(fn?'<button id=pn>취소</button>':'')+'<button id=py style="background:var(--bl);color:#fff">확인</button></div></div>';e.style.display='flex';$('#py').onclick=()=>{e.style.display='none';if(fn){vib([40,60,40]);fn()}};if(fn)$('#pn').onclick=()=>{e.style.display='none'}}
function snap(){UNDO=JSON.stringify({S,DB})}
function undo(){if(UNDO){const o=JSON.parse(UNDO);S=o.S;DB=o.DB;sv();cards();dbl();$('#tt').style.display='none'}}
let AFILE=null,EDN=null;const alv=s=>String(s).split(/[,，;；\n]/).map(x=>x.trim()).filter(Boolean);
function saveP(){const g=k=>{const v=$('#a_'+k).value.trim();return ['d','us','sp'].includes(k)?sm20(v):v},n=g('n');if(!n)return tt('제품명을 입력하세요');
const ed=EDN?DB.findIndex(q=>q.n==EDN):-1;
if(ed>=0){if(n!=EDN&&DB.some(q=>q.n==n))return tt('같은 이름의 제품이 이미 있습니다<br><small>'+esc(n)+'</small>');const o=DB[ed],p={...o,n};['g','mf','us','pks','d','sp','un','tn','tc','dry','pot','pre','nxt','src','rev','chk','memo','mixt'].forEach(k=>p[k]=g(k));p.ver=$('#a_ver').value=='1'?1:0;['pk','mk','svr','dft','sg','th','ts'].forEach(k=>{if(g(k))p[k]=+g(k);else delete p[k]});p.tr=g('tr')?+g('tr')/100:0;p.al=alv(g('al'));p.un=UN(p);p.ts=p.ts||(p.tn&&p.tn!='무희석'?18:0);p.pk=p.pk||p.mk||'';p.mk=p.mk||p.pk||'';if(p.svr&&p.dft)p.th=+(p.svr*10/p.dft).toFixed(4);if(p.dry!==o.dry||p.pot!==o.pot)delete p.dsrc;
pqNorm(p);const old=EDN,af=AFILE;DB[ed]=p;if(n!=old)S.coats.forEach(c=>{if(c.n==old)c.n=n});sv();AFILE=null;EDN=null;document.querySelectorAll('#af input:not([type=file])').forEach(x=>x.value='');
(async()=>{if(n!=old){const f=await idb('get',old).catch(()=>0);if(f){await idb('put',n,f).catch(()=>0);await idb('del',old).catch(()=>0)}}if(af)await idb('put',n,af).catch(()=>0);await mark();dbl();cards();$('#af').hidden=true;tt('제품 정보를 수정하고 저장했습니다<br><small>'+esc(n)+'</small>')})();return}
const p={n};['g','mf','us','pks','d','sp','un','tn','tc','dry','pot','pre','nxt','src','rev','chk','memo','mixt'].forEach(k=>{if(g(k))p[k]=g(k)});if($('#a_ver').value=='1')p.ver=1;['pk','mk','svr','dft','sg','th','ts'].forEach(k=>{if(g(k))p[k]=+g(k)});if(g('tr'))p.tr=+g('tr')/100;if(g('al'))p.al=alv(g('al'));if(p.svr&&p.dft)p.th=+(p.svr*10/p.dft).toFixed(4);pqNorm(p);const af=AFILE;if(af&&p.dry)p.dsrc='TDS';const j=DB.findIndex(q=>q.n==n);if(j<0)DB.push({d:'',tc:'',ts:18,url:'',un:'ℓ',...p,pk:p.pk||p.mk||'',mk:p.mk||p.pk||''});else DB[j]={...DB[j],...p};sv();AFILE=null;document.querySelectorAll('#af input:not([type=file])').forEach(x=>x.value='');(async()=>{if(af)await idb('put',n,af).catch(()=>0);await mark();dbl();cards();$('#af').hidden=true;const a=await autoLink();tt('제품이 저장되었습니다'+(af?'<br>기술자료(TDS)도 함께 등록했습니다':'')+(a?'<br>대기 중이던 기술자료 '+a+'개를 자동 연결했습니다':''))})()}
function clrForm(){document.querySelectorAll('#af input:not([type=file])').forEach(x=>x.value='');AFILE=null;EDN=null;$('#af_t').textContent='제품 추가'}
function newP(){pdOpen(-1)}
function cancelP(){clrForm();$('#af').hidden=true}
function pdOpen(j){const o=j>=0?DB[j]:null,p=o?{...o}:{};tvOpen({p,L:null},{mode:o?'edit':'new',edit:o?o.n:null,src:p.src||'',rev:p.rev||'',chk:p.chk||'',ver:!!p.ver})}
function edt(j){if(DB[j])pdOpen(j)}
const NUMS=(t,bad)=>[...String(t).matchAll(/(\d+(?:\.\d+)?)\s*([℃°]|㎛|μm|µm|um|%)?/gi)].filter(m=>!(m[2]&&bad&&bad.test(m[2]))).map(m=>+m[1]);
const sumU=v=>{v=String(v).replace(/\s+/g,' ').trim();if(v.length<=45)return v;const P=v.split(/[,，、·]|(?<=다)\.\s*|\s+및\s+|\s+또는\s+/).map(x=>x.replace(/(?:등)?(?:에|의|으로)?\s*(?:사용|적용|도장)(?:됩니다|합니다|되며|하며|함|됨|된다|한다|가능)?\.?$/,'').trim()).filter(x=>x.length>=2),o=[];for(const x of P){if(o.length&&(o.join(' · ')+' · '+x).length>60)break;o.push(x)}return (o.join(' · ')||v).slice(0,70)};
const cutL=v=>String(v).replace(/\s+(?:색상|광택|비중|고형분|도막|건조|희석|포장|가사|혼합|규격|이론|선행|후속|표면처리|도장방법|Color|Gloss|Specific|Solids)\s*[:：].*$/i,'').trim();
const sq=l=>String(l).replace(/(?<=[가-힣])[ \t]+(?=[가-힣])/g,''),K=w=>[...w].join('\\s*');
const LBL=/^(?:용도|사용용도|색상|광택|고형분|비중|도막|이론|건조|희석|혼합|포장|가사|선행|후속|도장방법|도장간격|재도장|인화|특성|특징|주요|물성|조건|표면|전처리|지촉|경화|규격|사용|저장|주의|안전|Solids|Specific|Thinner|Pot|Dry|Color|Gloss|Use|Application|Mixing|Packing|Film|Theoretical)/i;
const ocrNorm=l=>String(l).replace(/[ \t]+/g,' ').replace(/(\d)\s*(?:μm|µm|um|pm)\b/gi,'$1㎛').replace(/(\d)\s*°\s*C\b/g,'$1℃').replace(/％/g,'%').trim();
const lt=()=>window.Tesseract?Promise.resolve():new Promise((o,e)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';s.onload=o;s.onerror=()=>e(new Error('OCR 도구를 불러오지 못했습니다(온라인 필요)'));document.head.append(s)});
let OCRW=null;const wt=(p,ms,m)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error(m)),ms))]);
const ocrW=async()=>{await lt();if(!OCRW){OCRW=await wt(Tesseract.createWorker('kor+eng'),120000,'OCR 언어 데이터를 내려받지 못했습니다(인터넷 연결 확인)');try{await OCRW.setParameters({preserve_interword_spaces:'1',user_defined_dpi:'300'})}catch(e){}}return OCRW};
/* v593 OCR 개선: 사전 보정(회색조·대비 늘리기·크기 맞춤) + 회전 재시도 + 글자 보정 */
function ocrPrep(src,w,h){const L=Math.max(w,h),s=L>2800?2400/L:L<1600?Math.min(2.5,2000/L):1,cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(w*s));cv.height=Math.max(1,Math.round(h*s));const x=cv.getContext('2d',{willReadFrequently:true});x.fillStyle='#fff';x.fillRect(0,0,cv.width,cv.height);x.imageSmoothingQuality='high';x.drawImage(src,0,0,cv.width,cv.height);
 const im=x.getImageData(0,0,cv.width,cv.height),d=im.data,n=d.length/4,hi=new Uint32Array(256),yb=yelBands(im);for(let i=0;i<n;i++){const g=(d[i*4]*77+d[i*4+1]*150+d[i*4+2]*29)>>8;d[i*4]=g;hi[g]++}
 let a=0,lo=0,up=255;const t=n*.02;for(let v=0;v<256;v++){a+=hi[v];if(a>=t){lo=v;break}}a=0;for(let v=255;v>=0;v--){a+=hi[v];if(a>=t){up=v;break}}
 const rg=Math.max(40,up-lo);let sm=0,sq=0;for(let i=0;i<n;i++){let g=(d[i*4]-lo)*255/rg;g=g<0?0:g>255?255:g;d[i*4]=d[i*4+1]=d[i*4+2]=g;sm+=g;sq+=g*g}
 x.putImageData(im,0,0);const mean=sm/n;return {cv:cv,yb:yb,blank:(sq/n-mean*mean)<150&&mean>235}}
/* v593 노란 형광펜(음영·동그라미·밑줄) 가로 띠 찾기: [시작행, 끝행] 목록 */
function yelBands(im){const w=im.width,h=im.height,d=im.data,cnt=new Uint16Array(h);for(let y=0;y<h;y++){let c=0,o=y*w*4;for(let x=0;x<w;x++,o+=4){const r=d[o],g=d[o+1],b=d[o+2];if(r>=200&&g>=160&&b<=150&&r-b>=90&&g-b>=60&&r-g<=75)c++}cnt[y]=c}
 const thr=Math.max(5,w*.004),B=[],gp=Math.max(3,h*.008);let st=-1,gap=0,en=0;for(let y=0;y<h;y++){if(cnt[y]>=thr){if(st<0)st=y;gap=0;en=y}else if(st>=0&&++gap>gp){B.push([st,en]);st=-1}}if(st>=0)B.push([st,en]);
 return B.filter(b=>b[1]-b[0]>=Math.max(4,h*.005)&&b[1]-b[0]<h*.5)}
/* 형광 띠를 글자 한 줄 높이만큼 넓혀 합치고(최대 16개), 그 가로 줄만 따로 OCR */
async function ocrBands(w,pr){const cv=pr.cv,H=cv.height,W=cv.width,yb=pr.yb||[];if(!yb.length)return[];const up=Math.max(H*.016,14),dn=Math.max(H*.008,8),M=[];
 yb.map(b=>[Math.max(0,b[0]-up),Math.min(H,b[1]+dn)]).forEach(b=>{const l=M[M.length-1];if(l&&b[0]<=l[1]+4)l[1]=Math.max(l[1],b[1]);else M.push(b)});
 const out=[];try{await w.setParameters({tessedit_pageseg_mode:'6'})}catch(e){}
 try{for(const b of M.slice(0,16)){const hh=Math.round(b[1]-b[0]);if(hh<12)continue;const c=document.createElement('canvas');c.width=W;c.height=hh+24;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(cv,0,b[0],W,hh,0,12,W,hh);const t=ocrFix((await wt(w.recognize(c),90000,'OCR 시간 초과')).data.text);t.split('\n').map(ocrNorm).filter(Boolean).forEach(l=>out.push(l))}}
 finally{try{await w.setParameters({tessedit_pageseg_mode:'3'})}catch(e){}}return out}
/* v593 끊어진 한글 단어 잇기: '고 형 분'→'고형분', 줄바꿈으로 갈라진 '사 / 용합니다'→'/ 사용합니다' (줄 수는 그대로) */
const KR1=new Set('수 및 등 약 중 후 전 내 외 총 각 본 시 간 때 곳 것 더 안 못 잘 또 한 두 세 네 이 그 저 다 번 회 개 년 월 일 분 초 도 만 의 가 는 은 를 을 와 과 에 로 서 며 고 면 나 지 위 밑 별 인 비'.split(' '));
const KR2=new Set('용도 비중 희석 혼합 비고 색상 규격 방법 조건 제품 성분 특징 인화 포장 저장 후속 선행 두께 시간 온도 간격 기간 도장 보관 상태 마감 단위 주의 사항 용량 도료 종류 성질 일반'.split(' '));
function krJoin(t){return String(t||'').replace(/(?<![가-힣])[가-힣](?: [가-힣]){2,}(?![가-힣])/g,x=>{const k=x.split(' ');let tail='';while(k.length>3&&'약 및 등 수 총 각 본 또'.split(' ').includes(k[k.length-1])){tail=' '+k.pop()+tail}return k.join('')+tail}).replace(/^([가-힣]) ([가-힣])(?= |$)/,(m,a,b)=>KR2.has(a+b)?a+b:m)}
function krMend(A){const o=A.map(l=>krJoin(l));for(let i=0;i+1<o.length;i++){const m=o[i].match(/^(.*\S) ([가-힣])$/);if(!m||KR1.has(m[2]))continue;if(!/^[가-힣]/.test(o[i+1])||/^[가-힣]{1,2}\s*(?:[:：]|\d)/.test(o[i+1]))continue;o[i]=m[1];o[i+1]=m[2]+o[i+1]}return o}
function ocrRot(cv,deg){const o=document.createElement('canvas'),q=deg%180!==0;o.width=q?cv.height:cv.width;o.height=q?cv.width:cv.height;const x=o.getContext('2d');x.translate(o.width/2,o.height/2);x.rotate(deg*Math.PI/180);x.drawImage(cv,-cv.width/2,-cv.height/2);return o}
function ocrFix(t){return krMend(String(t||'').replace(/\r/g,'').replace(/[ \t ]+/g,' ').replace(/(\d)\s*(?:um|pm|μm|µm|jim|Hm)\b/gi,'$1㎛').replace(/(\d)\s*(?:m2|rn2|m²)\b/g,'$1㎡').replace(/(?<=\d)[Oo](?=\d)/g,'0').replace(/(?<=\d)[Oo](?=\s*(?:㎛|%|℃|㎡))/g,'0').replace(/(?<=\d)[lI|](?=\d)/g,'1').replace(/％/g,'%').split('\n').map(l=>l.trim()).filter(l=>{if(!l)return true;const k=l.replace(/\s/g,'');if(k.length<2)return false;const ok=(k.match(/[가-힣A-Za-z0-9.,:;()%\/\-~㎡㎛℃°·]/g)||[]).length;return k.length>=12||ok/k.length>=.5})).join('\n').replace(/\n{3,}/g,'\n\n')}
const ocrScore=t=>(String(t||'').match(/[가-힣A-Za-z0-9]/g)||[]).length;
async function ocrBest(wk,cv){let best=(await wk.recognize(cv)).data.text;if(ocrScore(best)<60){for(const dg of [90,270]){const t=(await wk.recognize(ocrRot(cv,dg))).data.text;if(ocrScore(t)>ocrScore(best)*1.5)best=t}}return ocrFix(best)}
async function ocrBmp(f){try{return await createImageBitmap(f,{imageOrientation:'from-image'})}catch(e){return await new Promise((ok,no)=>{const u=URL.createObjectURL(f),i=new Image();i.onload=()=>{URL.revokeObjectURL(u);ok(i)};i.onerror=()=>no(new Error('이미지를 열 수 없습니다'));i.src=u})}}

const ocrTxt=r=>String(r&&r.data&&r.data.text||'').split('\n').map(ocrNorm).filter(Boolean);
async function ocrLines(f,say){await lp();const w=await ocrW(),doc=await pdfjsLib.getDocument({cMapUrl:PJ+'cmaps/',cMapPacked:true,useSystemFonts:true,data:await f.arrayBuffer()}).promise,L=[],n=Math.min(doc.numPages,10);let HL=null;
for(let p=1;p<=n;p++){say&&say('OCR로 글자를 인식하는 중… ('+p+'/'+n+')<br><small>처음 한 번은 언어 데이터를 내려받아 시간이 걸립니다</small>');const pg=await doc.getPage(p),v1=pg.getViewport({scale:1}),vp=pg.getViewport({scale:Math.min(3,Math.max(1.5,2400/Math.max(v1.width,v1.height)))}),cv=document.createElement('canvas');cv.width=vp.width;cv.height=vp.height;await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;const pr=ocrPrep(cv,cv.width,cv.height);if(pr.blank)continue;try{(HL=HL||[]).push(...await ocrBands(w,pr))}catch(e){}L.push(...ocrFix(await wt(ocrBest(w,pr.cv),150000,'OCR 시간 초과')).split('\n').map(ocrNorm).filter(Boolean))}if(HL&&HL.length)L.hlLines=HL;return L}
async function ocrImg(f,say){say&&say('OCR로 글자를 인식하는 중…<br><small>처음 한 번은 언어 데이터를 내려받아 시간이 걸립니다</small>');const w=await ocrW(),bm=await ocrBmp(f),pr=ocrPrep(bm,bm.width||bm.naturalWidth,bm.height||bm.naturalHeight);try{bm.close&&bm.close()}catch(e){}if(pr.yb.length)say&&say('노란 음영 부분을 먼저 읽는 중…<br><small>표시한 '+pr.yb.length+'곳</small>');let H=[];try{H=await ocrBands(w,pr)}catch(e){H=[]}const L=ocrFix(await wt(ocrBest(w,pr.cv),150000,'OCR 시간 초과')).split('\n').map(ocrNorm).filter(Boolean);if(H.length)L.hlLines=H;return L}
const garbL=L=>{const t=L.join(' ');if(t.length<60)return false;const bad=(t.match(/[\uE000-\uF8FF\uFFFD]/g)||[]).length,ok=(t.match(/[가-힣A-Za-z0-9.,:;()%\/\-~㎡㎛℃°·\s]/g)||[]).length;return bad/t.length>.02||ok/t.length<.7};
async function pdfLines(f,say,force,lite){let L=[];try{L=await pdfText(f,lite?10:0)}catch(e){if(!force)throw e}
if(!lite&&(force||L.join('').replace(/\s/g,'').length<120||garbL(L))){try{const O=await ocrLines(f,say),H=O.hlLines;L=L.concat(O);if(H)L.hlLines=H;L.ocr=1}catch(e){if(!L.length)throw e}}return L}
function parseHead(L){const Z=L.map(sq),skip=/기술자료|TECHNICAL|DATA\s*SHEET|PRODUCT\s*DATA|KCC|^페이지|^Page|^\d+\/\d+$|^Rev|^개정|^발행|www\.|http|TEL|FAX|㈜|\(주\)/i;
let ni=-1,name='';for(let i=0;i<Math.min(Z.length,12);i++){const z=Z[i];if(!z||z.length<2||z.length>40||skip.test(z)||LBL.test(z))continue;const m=L[i].match(/^제\s*품\s*명\s*[:：]?\s*(.+)$/);if(m){name=m[1].trim();ni=i;break}if(/^제\s*품\s*명?$/.test(z))continue;name=L[i].trim();ni=i;break}
if(ni<0)return {name:'',sub:'',desc:''};const B=[];for(let i=ni+1;i<L.length&&B.length<10;i++){const z=Z[i];if(!z)break;if(LBL.test(z)||skip.test(z))break;B.push(L[i].trim())}
let sub='',desc='';if(B.length){if(B.length>1&&B[0].length<=30&&!/[.。다]$/.test(B[0])){sub=B.shift()}desc=B.join(' ').replace(/\s+/g,' ').replace(/(?<![가-힣])[가-힣](?: [가-힣]){2,}(?![가-힣])/g,x=>x.replace(/ /g,'')).slice(0,600)}
if(!desc&&sub){desc=sub;sub=''}return {name,sub,desc}}
function parseSpec(L){const o={};
for(let q=0;q<L.length;q++){const r=L[q],l=sq(r);let m;
if(o.svr==null&&/고형분|solids/i.test(l)){m=l.match(/(?:용적|vol(?:ume)?)[^\d\n]{0,15}?(\d+(?:\.\d+)?)/i);if(m&&+m[1]>=1&&+m[1]<=100)o.svr=+m[1]}
if(o.sg==null&&/비중|specific\s*gravity|density/i.test(l)&&!/혼합비/.test(l)){const v=NUMS(l.replace(/^.*?(?:비중|specific\s*gravity|density)/i,''),/[℃°㎛%]|um|μm|µm/i).find(x=>x>=.5&&x<=5);if(v)o.sg=v}
if(o.mixa==null&&/혼합비|mixing\s*ratio/i.test(l)){m=l.match(/(\d+(?:\.\d+)?)\s*[:：]\s*(\d+(?:\.\d+)?)/);if(m&&+m[1]>0&&+m[2]>0){o.mixa=+m[1];o.mixb=+m[2]}}
if(o.dft==null&&/(권장|표준|적정|건조)[^\d\n]{0,12}도막|도막\s*두께|DFT/i.test(l)&&!/습윤|WFT|wet/i.test(l)){m=l.replace(/(\d),(\d{3})/g,'$1$2').match(/(\d+(?:\.\d+)?)(?:\s*[~\-–]\s*(\d+(?:\.\d+)?))?\s*(?:㎛|μm|µm|um|micron)/i);if(m){const a=+m[1],b=m[2]?+m[2]:0,v=b>a?Math.round((a+b)/2):a;if(v>=5&&v<=999)o.dft=v}}
if(o.th==null&&/이론\s*(도포율|살포율|도포면적)|theoretical\s*spreading|spreading\s*rate/i.test(l)){const _t=l.replace(/^.*?(?:이론\s*(?:도포율|살포율|도포면적)|theoretical\s*spreading|spreading\s*rate)/i,''),_r=_t.match(/(\d+(?:\.\d+)?)\s*[~∼～–-]\s*(\d+(?:\.\d+)?)/);let v=NUMS(_t,/[℃°㎛%]|um|μm|µm/i).find(x=>x>=.5&&x<=200);if(_r&&+_r[2]>+_r[1]&&+_r[1]>=.3&&+_r[2]<=200){v=+((+_r[1]+ +_r[2])/2).toFixed(2);o.thr=_r[1]+'~'+_r[2]}if(v){o.th=v;o.ths=v;o.thu=/(㎡|m2|m²)\s*\/\s*(kg|㎏)/i.test(l)?'kg':'L'}}
if(o.tr==null&&/희석율|희석\s*비율|thinning/i.test(l)){if(/무희석|불필요|not\s*required/i.test(l))o.tr=0;else{m=l.match(/(\d+(?:\.\d+)?)(?:\s*[~\-–]\s*(\d+(?:\.\d+)?))?\s*%/);if(m){const v=Math.max(+m[1],+(m[2]||0));if(v>=0&&v<=50)o.tr=+(v/100).toFixed(3)}}}
for(const mm of l.matchAll(/주제[^\d\n]{0,8}(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg)[^\d\n]{0,12}경화제[^\d\n]{0,8}(\d+(?:\.\d+)?)/gi)){if(+mm[1]>0&&+mm[3]>0){const t=+(+mm[1]+ +mm[3]).toFixed(2);(o.packl=o.packl||[]).push({v:t,u:/kg|㎏/i.test(mm[2])?'㎏':'ℓ'});if(o.pk==null||t>o.mk){o.pk=+mm[1];o.mk=t;o.pun=/kg|㎏/i.test(mm[2])?'㎏':'ℓ'}}}
if(!/주제/.test(l)&&/(?:포장\s*단위|포장\s*규격|포장|출고\s*규격|공급\s*단위|판매\s*단위|용량|규격|패키지|packing|package|pack\s*size)/i.test(l)){let seg=l.replace(/^.*?(?:포장\s*단위|포장\s*규격|포장|출고\s*규격|공급\s*단위|판매\s*단위|용량|규격|패키지|packing|package|pack\s*size)/i,''),z=[...seg.matchAll(/(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg|liters?|litres?)(?![a-z])/gi)];if(!z.length&&L[q+1]&&!LBL.test(sq(L[q+1])))z=[...L[q+1].matchAll(/(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg|liters?|litres?)(?![a-z])/gi)];z.forEach(x=>{if(+x[1]>0&&+x[1]<=1000)(o.packl=o.packl||[]).push({v:+x[1],u:/kg|㎏/i.test(x[2])?'㎏':'ℓ'})})}
if(o.use==null&&(m=r.match(new RegExp('^[\\s■□●○▪·\\d.\\)\\(-]*(?:'+K('사용')+'\\s*|'+K('주')+'\\s*)?(?:'+K('용도')+'|'+K('적용대상')+'|'+K('적용부위')+'|'+K('사용처')+')\\s*[:：]?\\s*(.*)$')))){let v=cutL(m[1]).replace(/^및\s*특[징성]\s*[:：]?\s*/,'');for(let k=1;k<=3&&L[q+k]&&!LBL.test(sq(L[q+k]))&&!/^[\d.\s]+$/.test(L[q+k])&&k<=2&&(!v||!/[.。다]$/.test(v));k++)v=(v+' '+cutL(L[q+k])).trim();v=v.replace(/\s+/g,' ').trim();if(v.length>=2&&v.length<=300)o.use=sumU(v)}
if(o.gen==null&&(m=r.match(new RegExp('^(?:'+K('일반명')+'|'+K('도료종류')+'|'+K('종류')+')\\s*[:：]?\\s*(.{2,60})$'))))o.gen=m[1].trim();
if(o.tn==null&&!/희석율|희석비율/.test(l)&&(m=r.match(new RegExp('^(?:'+K('전용')+'\\s*)?(?:'+K('희석제')+'|'+K('신나')+')\\s*(?:명|종류)?\\s*[:：]?\\s*(.{2,40})$')))&&!/^\d|%/.test(m[1].trim())){o.tn=m[1].trim();const c=o.tn.match(/(\d{3})/);if(c)o.tc=c[1]}
if(o.sp==null&&(m=r.match(new RegExp('^(?:'+K('표면처리')+'|'+K('소지조정')+'|'+K('바탕처리')+'|'+K('표면준비')+'|'+K('전처리')+')\\s*(?:'+K('방법')+')?\\s*[:：]?\\s*(.{2,200})$')))){let v=m[1].trim();for(let k=1;k<=2&&L[q+k]&&!LBL.test(sq(L[q+k]))&&v.length<160;k++)v+=' '+L[q+k].trim();o.sp=v.replace(/\s+/g,' ')}
if(o.pre==null&&(m=r.match(new RegExp('^(?:'+K('선행도료')+'|'+K('선행도장')+'|'+K('전도장')+')\\s*[:：]?\\s*(.{2,80})$'))))o.pre=m[1].trim();
if(o.nxt==null&&(m=r.match(new RegExp('^(?:'+K('후속도료')+'|'+K('후속도장')+'|'+K('후도장')+')\\s*[:：]?\\s*(.{2,80})$'))))o.nxt=m[1].trim()}
if(!(o.packl&&o.packl.length)){for(const r0 of L){for(const x of sq(r0).matchAll(/(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg)\s*[\/(]?\s*(?:CAN|PAIL|DRUM|캔|통|말|드럼)/gi)){if(+x[1]>0&&+x[1]<=1000)(o.packl=o.packl||[]).push({v:+x[1],u:/kg|㎏/i.test(x[2])?'㎏':'ℓ'})}}}
if(o.packl&&o.packl.length){const mx0=o.packl.reduce((a,b)=>b.v>a.v?b:a),us=[...new Set(o.packl.filter(x=>x.u==mx0.u).map(x=>x.v))].sort((a,b)=>a-b);o.pack=mx0.v;o.pun=mx0.u;o.pks=us.map(v=>v+(mx0.u=='㎏'?'kg':'L')).join(' · ');if(o.pk&&o.mk&&!o.pks)o.pks=''}
return o}
function parseMaker(L){const A=[...(L||[])].map(x=>String(x||'')),H=A.slice(0,60).join('\n'),ALL=A.join('\n'),D=[['KCC',/\bKCC\b|케이씨씨/i],['조광페인트',/조광\s*페인트|CHOKWANG/i],['삼화페인트',/삼화\s*페인트|SAMHWA/i],['노루페인트',/노루\s*페인트|NOROO/i],['강남제비스코',/강남\s*제비스코|KANGNAM\s*JEVISCO|제비스코/i],['건설화학공업',/건설\s*화학/],['Chugoku Marine Paints',/CHUGOKU|중국\s*도료/i],['Nippon Paint',/NIPPON\s*PAINT|닛폰\s*페인트/i],['Kansai Paint',/KANSAI\s*PAINT|칸사이/i],['Jotun',/JOTUN|조턴/i],['Hempel',/HEMPEL|헴펠/i],['International Paint',/INTERNATIONAL\s*PAINT|AKZO\s*NOBEL|아크조/i],['PPG',/\bPPG\b|SIGMACOVER|SIGMA\s*PAINTS/i],['Sherwin-Williams',/SHERWIN/i],['Carboline',/CARBOLINE/i],['Dai Nippon Toryo',/DAI\s*NIPPON\s*TORYO/i]];
for(const src of[H,ALL]){let b=null,bi=1e9;for(const[n,r]of D){const m=r.exec(src);if(m&&m.index<bi){b=n;bi=m.index}}if(b)return b}
const m=/(?:제조\s*사|제조\s*원|제조\s*업체|제조\s*자|Manufacturer|Producer)\s*[:：]\s*([^\n,;()\[\]]{2,40})/i.exec(ALL);
if(m){const v=m[1].replace(/\s+/g,' ').replace(/(주소|전화|연락|Tel|Address|Phone).*$/i,'').trim();if(v.length>=2&&!/^\d+$/.test(v)&&!/없음|해당|N\/A/i.test(v))return v}
return ''}
let MFRUN=0,MFT=0;
async function mfTds(){if(MFRUN||Date.now()-MFT<45000)return;
try{if(LS.mfbusy&&Date.now()-(+LS.mfbusy)<600000)return}catch(e){}
MFRUN=1;MFT=Date.now();try{let tried=[];try{tried=JSON.parse(LS.mft||'[]')}catch(e){}const ks=DB.filter(p=>!p.mf);let ok=0,ch=0;
for(const p of ks){if(ch>=2)break;const f=await idb('get',p.n).catch(()=>0);if(!f||!/pdf/i.test((f.type||'')+(f.name||'')))continue;const sz=f.buf?f.buf.byteLength:(f.b&&f.b.size)||0,key=p.n+'|'+f.name+'|'+sz;if(tried.includes(key))continue;
if(sz>15*1048576||!f.buf){tried.push(key);try{LS.mft=JSON.stringify(tried.slice(-2000))}catch(e){}continue}
tried.push(key);try{LS.mft=JSON.stringify(tried.slice(-2000));LS.mfbusy=Date.now()}catch(e){}
let L;try{L=await pdfText(new File([f.buf],f.name,{type:f.type}),3)}catch(e){try{delete LS.mfbusy}catch(x){}continue}ch++;try{delete LS.mfbusy}catch(x){}
const m=parseMaker(L);if(m){p.mf=m;ok++}await new Promise(r=>setTimeout(r,300))}
if(ok){sv();try{dbl()}catch(e){}}
if(ch>=2)setTimeout(()=>{MFT=0;try{mfTds()}catch(e){}},5000)}catch(e){}MFRUN=0}
/* v593 노란 음영 표시 줄(+이어지는 줄)만 모아서 먼저 읽고, 거기서 읽힌 값은 전체 읽기 결과보다 우선 */
function hlOf(L){if(L.hlLines&&L.hlLines.length)return L.hlLines;const h=L.hl;if(!h||!h.some(x=>x))return null;const S=new Set();h.forEach((v,i)=>{if(!v)return;S.add(i);for(let k=1;k<=2;k++){const t=L[i+k];if(t==null||h[i+k]||LBL.test(sq(t)))break;S.add(i+k)}});return L.filter((_,i)=>S.has(i))}
/* 출고 규격: '(주제 : 12 L, 경화제 : 3 L)' 처럼 두 용량이 같이 적힌 포장 중 합이 가장 큰(대포장) 것 → 주제 용량·총 용량 */
function pairPack(L){let b=null;const re=/(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg)\s*[,+\/&·]\s*[^,\n()]{0,30}?[:：=]?\s*(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg)/gi;
 for(const r0 of L){const t=sq(r0);if(!/포장|규격|용량|패키지|pack|주제|경화제|[AB]\s*제|PT[AB]|Part/i.test(t))continue;for(const m of t.matchAll(re)){const u1=/kg|㎏/i.test(m[2]),u2=/kg|㎏/i.test(m[4]);if(u1!==u2)continue;const a=+m[1],c=+m[3];if(!(a>0&&c>0&&a<=1000&&c<=1000))continue;const tot=+(a+c).toFixed(2);if(!b||tot>b.mk)b={pk:a,mk:tot,u:u1?'㎏':'ℓ'}}}return b}
function parseAll(L){const s=parseSpec(L),h=parseHead(L);try{const Lh=hlOf(L);if(Lh&&Lh.length){const sh=parseSpec(Lh);let n=0;for(const k in sh){const v=sh[k];if(v==null||v===''||(Array.isArray(v)&&!v.length))continue;s[k]=v;n++}if(n)s.hl=Lh.length}}catch(e){}
try{const pp=pairPack(L);if(pp&&(!s.pk||!s.mk||pp.mk>s.mk)){s.pk=pp.pk;s.mk=pp.mk;s.pun=pp.u;s.pack=Math.max(+s.pack||0,pp.mk);if(!s.pks)s.pks=pp.mk+(pp.u=='㎏'?'kg':'L')}}catch(e){}s.us=s.use||'';s.g=s.gen||h.sub||s.use||'';s.d=h.desc||'';s.hname=h.name;s.mf=parseMaker(L);try{exApply(s,h,L)}catch(e){}['us','g','d','sp','pre','nxt','tn','gen'].forEach(k=>{if(typeof s[k]=='string')s[k]=krJoin(s[k])});return s}
const lkSpec=p=>{const D=DEF.find(x=>x.n==p.n);return !!(D&&+D.mk>0)};
/* 출고규격·혼합규격은 데이터시트에 적힌 포장 중 가장 큰(대포장) 기준. 소포장만 있으면 그 소포장 그대로. 주제:경화제 비율은 유지 */
function bigPack(p){if(!p||typeof p!='object'||lkSpec(p))return false;const t=String(p.pks||''),sz=t.match(/\d+(?:\.\d+)?/g);if(!sz)return false;
 if(/kg|㎏/i.test(t)!==(UN(p)=='kg'))return false;const mx=Math.max(...sz.map(Number)),mk=+p.mk||+p.pk||0,pk=+p.pk||0;if(!(mx>0)||!(mx>mk+1e-9))return false;
 const r=mk>0&&pk>0&&pk<mk?pk/mk:1;p.mk=+mx.toFixed(2);p.pk=+(mx*r).toFixed(2);return true}
function sm20(t){t=String(t||'').replace(/\s+/g,' ').trim();return t.length>80?t.slice(0,80):t}
/* ===== 제품 정보 표준화: 제품설명(수지계·도료 종류) · 용도(소지용 수지 기능 도장층) · 표면처리(블라스팅·동력공구·용제세정) · 선행/후속(제품코드) · 혼합비 기준(L=부피비, kg=무게비) ===== */
const PQ_RES=[[/변성\s*에폭시/,'변성 에폭시'],[/에폭시|epoxy/i,'에폭시'],[/폴리\s*아스파[르ㄹ]?틱|아스파틱|aspartic/i,'폴리아스파틱'],[/아크릴\s*우레탄/,'아크릴 우레탄'],[/폴리\s*우레탄|우레탄|urethane/i,'우레탄'],[/아크릴|acrylic/i,'아크릴'],[/염화\s*고무|chlorinated/i,'염화고무'],[/알키드|alkyd/i,'알키드'],[/실리콘|silicone/i,'실리콘'],[/불소|FEVE|PVDF/i,'불소'],[/징크\s*리치|아연\s*말|징크|zinc/i,'징크리치'],[/실리케이트|silicate/i,'실리케이트'],[/비닐|vinyl/i,'비닐'],[/페놀|phenol/i,'페놀'],[/폴리\s*에스[테터]르|polyester/i,'폴리에스터']];
const PQ_FN=[[/방청|녹\s*방지|부식\s*방지|anti-?corros|rust/i,'방청'],[/내화학|chemical/i,'내화학'],[/내열|heat/i,'내열'],[/내후|weather|UV/i,'내후'],[/방수|waterproof/i,'방수'],[/무용제|solvent[-\s]?free/i,'무용제'],[/바닥|floor/i,'바닥용']];
function pqNorm(p){if(!p||typeof p!='object')return p;
 const T=[p.d,p.us,p.g,p.n].filter(Boolean).join(' '),hit=a=>{const r=a.find(x=>x[0].test(T));return r?r[1]:''};
 const res=hit(PQ_RES),fn=hit(PQ_FN);
 const layer=/하도|프라이머|primer|프라이머/i.test(T)?'하도':/중도|중간|intermediate|미드/i.test(T)?'중도':/상도|top\s*coat|마감|finish/i.test(T)?'상도':'';
 let sub=/콘크리트|concrete/i.test(T)?'콘크리트':/아연\s*도금|galvani|HDG|용융/i.test(T)?'아연도금':/알루미늄|비철|non-?ferrous/i.test(T)?'비철':/목재|wood/i.test(T)?'목재':/철재|강재|철골|steel|구조물|선박|탱크|배관/i.test(T)?'철재':'';
 if(!sub&&fn=='방청')sub='철재';
 let form=/2\s*액|2\s*component|two[-\s]?(?:pack|component)|주제.{0,6}경화제/i.test(T)?'2액형':/1\s*액|단액|one[-\s]?component/i.test(T)?'1액형':'';
 try{if(!form&&(+p.mk||+p.pk))form=mx(p).b>0?'2액형':'1액형'}catch(e){}
 if(res){const kind=[fn,layer].filter(Boolean).join(' ');
  if(!p.d)p.d=[form,res,'수지계',kind,'도료'].filter(Boolean).join(' ');
  if(!p.us)p.us=[sub?sub+'용':'',res.replace(/^변성\s*/,''),fn,layer].filter(Boolean).join(' ')}
 /* 표면처리 */
 const S=[p.sp,p.us,p.d].filter(Boolean).join(' '),sp=String(p.sp||''),parts=[];
 if(sp){const g=sp.match(/S[aA]\s*(3|2\s*(?:1\/2|½|\.5)|2|1)(?![\d])/);
  const bl=g?'블라스팅 Sa '+({'3':'3','2':'2','1':'1'}[g[1].replace(/\s/g,'')]||'2½'):/블라스[트팅]|blast/i.test(sp)?'블라스팅':'';
  if(bl)parts.push(bl);
  const st=sp.match(/\bS[tT]\s*([23])/),pw=st?'동력공구 St '+st[1]:/동력\s*공구|power\s*tool|SSPC-?SP\s*3/i.test(sp)?'동력공구':'';
  if(pw)parts.push(pw);
  if(/용제|솔벤트|solvent|SSPC-?SP\s*1\b|탈지|유분|그리스|세정|degreas|cleaning/i.test(sp))parts.push('용제세정');
  }
 /* 선행·후속: 제품코드만 */
 const code=v=>{if(!v)return v;const m=String(v).match(/\b[A-Z]{1,5}-?\d{2,}[A-Z0-9]*(?:[-\/][A-Z0-9]+)*\b/g);return m&&m.length?[...new Set(m)].join(', '):(/사양에\s*따/.test(v)?'도장사양에 따름':v)};
 if(p.pre)p.pre=exPre(p.pre);if(p.nxt)p.nxt=exPre(p.nxt);
 /* 혼합비 기준: L=부피비, kg=무게비 */
 try{p.mixt=UN(p)=='kg'?'무게비':'부피비'}catch(e){}
 if(p.d&&String(p.d).length>100)p.d=endSum(p.d,100);
 return p}
function applySpec(p,s,over){s={...s};const u=[],set=(k,v,l)=>{if(v!=null&&v!==''&&p[k]!==v){p[k]=v;u.push(l)}},tx=(k,v,l)=>{if(v&&(over||!p[k])&&p[k]!==v){p[k]=v;u.push(l)}};
tx('g',s.g,'일반명');tx('sp',s.sp,'표면처리');tx('us',s.us,'용도');set('pks',s.pks,'포장규격');tx('d',s.d,'제품설명');tx('tn',s.tn,'전용 희석제');tx('tc',s.tc,'희석제코드');
if(s.ths>0&&(over||!(+p.ths))&&(+p.ths!==s.ths||p.thu!==s.thu||p.thr!==s.thr)){p.ths=s.ths;p.thu=s.thu||'L';if(s.thr)p.thr=s.thr;else delete p.thr;u.push('TDS 이론도포율 '+(s.thr||s.ths)+'㎡/'+p.thu)}set('svr',s.svr,'SVR(고형분 용적비)');set('sg',s.sg,'비중');set('dft',s.dft,'추천도막');set('tr',s.tr,'희석율');set('pre',s.pre,'선행도장');set('nxt',s.nxt,'후속도장');
if(!lkSpec(p)&&s.pack&&(over||!(+p.mk))){p.mk=s.pack;p.pk=s.pack;p.un=s.pun;u.push('규격')}
if(lkSpec(p)){}else if(s.pk&&s.mk){if(+p.pk!==s.pk||+p.mk!==s.mk){p.pk=s.pk;p.mk=s.mk;if(s.pun)p.un=s.pun;u.push('주제·경화제 규격')}}
else if(s.mixa&&s.mixb){const m=+p.mk||0,a=+p.pk||0;if(m>0){const v=+(m*s.mixa/(s.mixa+s.mixb)).toFixed(2);if(a!==v){p.pk=v;u.push('혼합비·출고규격')}}else if(a>0){p.mk=+(a*(s.mixa+s.mixb)/s.mixa).toFixed(2);u.push('혼합비·혼합규격')}}
if(+p.svr&&+p.dft){const v=+(p.svr*10/p.dft).toFixed(4);if(+p.th!==v){p.th=v;u.push('이론 도포율')}}
if(s.mf&&!p.mf){p.mf=s.mf;u.push('제조사')}
if(+p.ths>0&&(!(+p.dft)||(over&&!s.dft))&&+p.svr&&(p.thu!='kg'||+p.sg>0)){const l=1/(p.thu=='kg'?p.ths*p.sg:p.ths);p.dft=Math.round(l*p.svr*10);u.push('추천도막 '+p.dft+'㎛ (도포율 환산)')}if(bigPack(p))u.push('대포장 규격');pqNorm(p);return u}
async function afTds(files,nf){files=[...(files||[])].filter(f=>f);if(!files.length)return;const R=[],isImg=f=>/^image\//.test(f.type)||/\.(png|jpe?g|webp|bmp)$/i.test(f.name);let i=0;
for(const f of files){i++;const pre=files.length>1?'('+i+'/'+files.length+') ':'';
if(!isImg(f)&&!/pdf/i.test(f.type+f.name)){R.push({f:f.name,err:'PDF·이미지가 아님'});continue}
try{const say=m=>tt(pre+m);say('기술자료에서 제품 정보를 읽는 중…');let L=isImg(f)?await ocrImg(f,say):await pdfLines(f,say),sp=parseAll(L);
const pt=parsePot(L),d=isImg(f)?'':parseDry(L),b=fb(f.name).trim()||sp.hname||'제품',ex=findP(b),isNew=!ex;
const p=ex||{n:b,g:'',d:'',tc:'',ts:0,url:'',un:'ℓ',pk:'',mk:'',tr:0,tn:''};
const up=applySpec(p,sp,true);if(sp.hl)up.push('노란 음영 '+sp.hl+'줄 우선 인식');if(pt){p.pot=pt;up.push('가사시간')}if(d){p.dry=d;up.push('건조시간')}else if(L.length){const d2=parseDry(L);if(d2){p.dry=d2;up.push('건조시간')}}if(up.length)p.dsrc='TDS';
if(isNew)DB.push(p);await idb('put',p.n,{name:f.name,type:ft(f),buf:await f.arrayBuffer()}).catch(()=>0);sv();let oc='';
if(!isImg(f)&&!L.ocr&&(!sp.svr||!sp.sg||!sp.d)){try{say('글자 인식(OCR)으로 빠진 항목을 보완하는 중… (최대 1~2분)');const O=await ocrLines(f,say),s2=parseAll(O),t={};for(const k in s2)if(!p[k]&&s2[k]!=null&&s2[k]!=='')t[k]=s2[k];if(+p.mk){delete t.pack;delete t.pk;delete t.mk;delete t.mixa;delete t.mixb}const u2=applySpec(p,t,false);if(u2.length)up.push('OCR 보완: '+u2.join('·'));L=L.concat(O)}catch(e){oc=e.message}}
const miss=[];if(!+p.svr)miss.push('SVR(고형분 용적비)');if(!+p.dft)miss.push('추천도막');if(!p.d)miss.push('제품설명');if(!p.g)miss.push('용도');
R.push({f:f.name,n:p.n,isNew,up,miss,p,raw:L,oc})}catch(e){R.push({f:f.name,err:e.message||String(e)})}}
sv();await mark();dbl();cards();
const ok=R.filter(r=>r.n),bad=R.filter(r=>r.err),need=ok.filter(r=>r.miss.length);
if(ok.length)$('#af').hidden=true;
let m='기술자료 '+ok.length+'개를 읽어 바로 저장했습니다<br><small>신규 '+ok.filter(r=>r.isNew).length+'개 · 기존 제품 갱신 '+ok.filter(r=>!r.isNew).length+'개</small>';
if(ok.length==1)m+='<br><small>'+(ok[0].up.length?ok[0].up.join(' · '):'읽은 항목 없음')+'</small>';
if(need.length){m+='<br><b style="color:#b0505a">확인 필요</b><br><small>'+need.slice(0,6).map(r=>r.n+': '+r.miss.join(', ')+' 미인식').join('<br>')+(need.length>6?'<br>외 '+(need.length-6)+'개':'')+'</small>';if(need.length==1&&!nf)fillForm(need[0].p)}
const dbg=r=>`<details style="text-align:left;margin-top:6px"><summary style="font-size:12px">${esc(r.n)} · 읽은 원문 보기 (${r.raw.length}줄)</summary><pre style="white-space:pre-wrap;font-size:10px;max-height:28vh;overflow:auto;margin:4px 0">${esc(r.raw.slice(0,80).join('\n'))||'(읽은 글자 없음)'}</pre></details>`;
ok.filter(r=>r.oc).slice(0,3).forEach(r=>{m+='<br><small>'+esc(r.n)+': OCR 보완 실패 ('+esc(r.oc)+')</small>'});ok.filter(r=>!r.raw.length).slice(0,3).forEach(r=>{m+='<br><small>'+esc(r.n)+': 글자를 읽지 못했습니다. 스캔본이면 OCR(인터넷 필요)이 필요합니다</small>'});
(ok.length==1?ok:need.slice(0,2)).forEach(r=>{m+=dbg(r)});
if(bad.length)m+='<br><small>읽지 못함: '+bad.map(r=>r.f+(r.err?' ('+r.err+')':'')).join(', ')+'</small>';
tt(m);if(ok.length){LAST=ok.map(r=>r.n);dbl()}}
function fillForm(p){const m={n:'n',mf:'mf',g:'g',pk:'pk',mk:'mk',un:'un',sg:'sg',svr:'svr',dft:'dft',th:'th',tn:'tn',tc:'tc',ts:'ts',pre:'pre',nxt:'nxt',d:'d',sp:'sp',us:'us',pks:'pks',dry:'dry',pot:'pot',src:'src',rev:'rev',chk:'chk',memo:'memo',mixt:'mixt'};for(const k in m){const e=$('#a_'+m[k]);if(e)e.value=p[k]??''}$('#a_tr').value=p.tr?+(p.tr*100).toFixed(1):'';$('#a_al').value=(p.al||[]).join(', ');$('#a_ver').value=p.ver?'1':'';AFILE=null;EDN=p.n;$('#af_t').textContent='제품 수정 · '+p.n;$('#af').hidden=false}
const mxs=p=>{const m=+p.mk||+p.pk||0,a=+p.pk||0,u=UN(p);return m>a&&a>0?`혼합규격(1말) ${F(m)}${u} = 출고규격 주제 ${F(a)}${u} + 경화제 ${F(m-a)}${u} · 혼합비 ${F(a/(m-a),2)}:1`:`출고·혼합규격(1말) ${F(m)}${u} (단액형)`};
const tg=i=>{S.coats[i].o=!(S.coats[i].o!==false);sv();cards()};
const tdk=()=>new Promise(ok=>{try{const q=indexedDB.open('tds_'+EDITION,1);q.onupgradeneeded=()=>q.result.createObjectStore('f');q.onsuccess=()=>{const r=q.result.transaction('f').objectStore('f').getAllKeys();r.onsuccess=()=>ok(r.result);r.onerror=()=>ok([])};q.onerror=()=>ok([])}catch(e){ok([])}});
async function mark(){const k=await tdk();TK=k;document.querySelectorAll('[data-t]').forEach(b=>{const n=b.dataset.t,p=P(n),h=k.includes(n)||(p&&p.url);b.classList.remove('ok','no');b.classList.add(h?'ok':'no');b.innerHTML=(h&&b.classList.contains('qbv')?DBX.eye:IC.doc)+'<span>'+(h?'보기':'미첨부')+'</span>'});document.querySelectorAll('[data-ti]').forEach(s=>{const n=s.dataset.ti,p=P(n);s.innerHTML=(k.includes(n)||(p&&p.url))?DBX.check+'<span>TDS 첨부</span>':''});const e=$('#tdc');if(e)e.textContent=DB.filter(p=>k.includes(p.n)||p.url).length;const e2=$('#tdp');if(e2)e2.textContent=k.filter(x=>String(x).startsWith('@:')).length;rPend()}
const CC=['#1f6fe5','#2f8f6b','#c98a2b','#8a5bb0','#c9525c','#2b8fa8'],CT=['#eaf0fa','#e8f5ef','#fbf2e2','#f1eaf7','#fbebed','#e6f4f8'],CP=['#6aaef5','#a6dcc0','#f4d49e','#cdbdee','#f3b8c0','#a8d8e6'],CD=['#0d3f9e','#1f6a4c','#7a5210','#5a3a82','#8a2f3a','#1b6478'],cvars=i=>{const k=i%6;return `--cc:${CC[k]};--ct:${CT[k]};--cp:${CP[k]};--cd:${CD[k]}`};
const od=n=>n+(n%100>=11&&n%100<=13?'th':['th','st','nd','rd'][n%10>3?0:n%10]);
const mx=p=>{const m=+p.mk||+p.pk||0,a=+p.pk||0;return m>a&&a>0?{a,b:m-a,m}:{a:m,b:0,m}};
const dfm=v=>{v=String(v||'').trim();if(!v||v=='-')return '<span class=dn>–</span>';const m=v.match(/^(\d+(?:\.\d+)?(?:\s*~\s*\d+(?:\.\d+)?)?)\s*(시간|분|일|주일|주|개월)?$/);return m?`<b>${m[1]}</b><small>${m[2]||''}</small>`:`<b class=dw>${v}</b>`};
const DTC=[[5,'#4f63c4','#eceffb','#2f3f8f'],[10,'#2b8fa8','#e6f4f8','#1b6478'],[20,'#2f8f6b','#e8f5ef','#1f6a4c'],[25,'#7d9a2b','#f1f6e3','#56691c'],[30,'#c98a2b','#fbf2e2','#7a5210'],[999,'#c9525c','#fbebed','#8a2f3a']],dtc=t=>{const n=parseFloat(String(t));const c=isNaN(n)?DTC[2]:DTC.find(x=>n<=x[0]);return `--tc:${c[1]};--tb:${c[2]};--td:${c[3]}`};
const dryC=s=>{const R=String(s).split(/[;\n]/).map(x=>x.trim()).filter(Boolean).map(r=>r.split('/').map(x=>x.trim()));if(!R.length)return '';const has=v=>v&&v!='-';
return `<div class=dka1><div class=dkc><div class=dkc0><span></span><span>지촉</span><span>고화</span><span>완전경화</span></div>${R.map(c=>{const mn=has(c[4]),mxv=has(c[5]);return `<div class=dkb style="${dtc(c[0])}"><div class=dkm><span class=dkt>${c[0]||'?'}</span><span class=dkx>${dfm(c[1])}</span><span class=dkx>${dfm(c[2])}</span><span class=dkx>${dfm(c[3])}</span></div><div class=dkq><span class=dkrl>재도장 간격</span>${mn||mxv?`<span class=dkrv><em>최소</em><span class=dkx>${dfm(c[4])}</span><i>→</i><em>최대</em><span class=dkx>${dfm(c[5]||'')}</span></span>`:'<span class=dn>–</span>'}</div></div>`}).join('')}</div></div><div class=hint>지촉: 손에 묻지 않는 시간 · 고화: 눌러도 자국이 없는 시간 · 완전경화: 사용 가능 상태 · 재도장: 다음 코트 도장 가능 간격(최소~최대)</div>`};
const spec=p=>{const m=+p.mk||+p.pk||0,a=+p.pk||0,u=UN(p),two=m>a&&a>0;return `<div class=w><table><tr><th>주제 출고규격<th>경화제 규격<th>혼합규격(1말)<th>혼합비(주:경)</tr><tr><td>${F(a||m)}${u}<td>${two?F(m-a)+u:'-'}<td>${F(m)}${u}<td>${two?F(a/(m-a),2)+' : 1':'단액형'}</table></div>`};
const dry=p=>(p.dry||p.pot)?(p.pot?`<div class=dpot><span>가사시간</span><b>${esc(p.pot)}</b></div>`:'')+(p.dry?dryC(p.dry)+(p.dsrc?'<div class=hint>TDS에서 자동 추출 · 원문과 대조 필요</div>':''):''):'';
const tdsFx=(p,u,a,te,ae)=>{try{const lbs=e=>e&&e.parentElement&&e.parentElement.querySelector('.lb span');const on=false,tu=on?(p.thu=='kg'?'kg':'L'):u,cv=v=>{let c=1/v;if(on&&tu!=u&&+p.sg>0)c=tu=='kg'?c/p.sg:c*p.sg;return c};
 [[te,a&&a.th,'이론',u],[ae,a&&a.ac,'실제',u]].forEach(([e,v,nm,u0])=>{const l=lbs(e);if(!e||!l)return;if(on){l.textContent=nm+' 도포율 (㎡/'+tu+')';e.textContent=F(cv(v),2)}else l.textContent=nm+' 소요량 ('+u0+'/m²)'})}catch(_){}};
const tdsHh=(p,u,a)=>{if(false){const tu=p.thu=='kg'?'kg':'L';let c=1/a.ac;if(tu!=u&&+p.sg>0)c=tu=='kg'?c/p.sg:c*p.sg;return '실제 '+F(c,2)+'㎡/'+tu}return '실제 '+F(a.ac)+u+'/㎡'};
const rgT=p=>{try{const m=String(p.thr||'').match(/([\d.]+)~([\d.]+)/);if(!m||!(+p.ths>0))return null;const u=UN(p),tu=p.thu=='kg'?'kg':'L';if(tu!=u)return null;const lo=+m[1],hi=+m[2],f=F,mm=mx(p).m;let d='';if(+p.svr>0){const k=tu=='kg'?(+p.sg>0?+p.sg:0):1;if(k)d=f(p.svr*10/(hi*k),0)+'~'+f(p.svr*10/(lo*k),0)+'㎛'}return{a:f(lo,1)+'~'+f(hi,1)+'㎡/'+tu,q:f(1/hi,2)+'~'+f(1/lo,2)+' '+u+'/㎡',c:mm>0?f(mm*lo,0)+'~'+f(mm*hi,0)+'㎡':'',d}}catch(_){return null}};
const tsL=p=>{const v=+p.ths;if(!(v>0))return 0;return p.thu=='kg'?(+p.sg>0?v*p.sg:0):v};
const thc=p=>p.dft&&p.svr?p.svr*10/p.dft:(UN(p)=='kg'?0:+p.th||0);
const thq=p=>{const d=+p.dft,v=+p.svr;if(!d||!v)return 0;return d/(v*10)*(UN(p)=='kg'&&+p.sg>0?+p.sg:1)};
const cov1=p=>{const q=thq(p);return q?mx(p).m/q:0};
const kv=(k,v)=>`<div class=k>${k}</div><div class=vv>${v}</div>`;
const intro=p=>{const m=mx(p),u=UN(p),two=m.b>0,t=thc(p),T=(k,l,v,o)=>`<div class="bst ${k}${o&&o.w?' w':''}${o&&o.big?' big':''}${o&&o.l?' l':''}${o&&o.one?' one':''}"><span class=bsl>${l}</span><span class=bsv>${v}${o&&o.s?`<small class=bss>${o.s}</small>`:''}</span></div>`;
const IC=(c,t,v)=>`<details class=bsc open><summary class=bsh>${t}</summary><div class="bst ${c} w" style="border-bottom:0"><span class="bsv icv">${v?esc(v):'<span class=ice>등록된 내용이 없습니다</span>'}</span></div></details>`;
const tn=p.tn&&p.tn!='무희석'?esc(p.tn)+(p.tc&&p.tc!=p.tn?' ('+esc(p.tc)+')':'')+(+p.tr?' · 희석율 '+F(p.tr*100,1)+'%':''):'무희석';
return IC('k1','제품설명',p.d)+IC('k2','용도',p.us||(p.g?'일반명: '+p.g:''))+IC('k3','표면처리',p.sp)+`<details class=bsc open><summary class=bsh>기본 제원</summary><div class=bsg>`
+T('k1','혼합규격 (1말 기준)',F(m.m)+u,{big:1,l:1,s:p.pks&&String(p.pks).replace(/\s/g,'').toLowerCase()!=(F(m.m)+u).replace(/\s/g,'').toLowerCase()?'데이터시트 '+esc(p.pks):''})+T('k1','혼합비 ('+(u=='kg'?'무게비':'부피비')+')',two?F(m.a/m.b)+' : 1':'단액형',{big:1})
+T('k1','출고규격',two?'주제 '+F(m.a)+' : 경화제 '+F(m.b):F(m.a)+u+' (단액형)',{big:1,w:1})
+T('k1','희석제',tn,{big:1,w:1})
+T('k2','SVR(고형분 용적비)',p.svr?p.svr+'%':'-',{big:1,l:1})+T('k2','추천도막',p.dft?p.dft+'㎛':'-',{big:1})
+T('k2','이론 도장면적 (L·kg당 · 로스 제외)',t?(UN(p)=='kg'&&+p.sg>0?F(t/p.sg)+'㎡/kg':F(t)+'㎡/L'):'-',{big:1,w:1,one:1})+T('k2','이론 소요량 (로스 제외 · 계산값과 동일)',thq(p)?F(thq(p),3)+(UN(p)=='kg'?' kg/㎡':' L/㎡'):'-',{big:1,w:1,one:1})
+T('k2','비중',p.sg?F(p.sg):'-',{big:1,l:1})+T('k2','1말당 이론면적',cov1(p)?F(cov1(p),1)+'㎡':'-',{big:1})
+T('k4','선행도장',p.pre||'-',{l:1})+T('k4','후속도장',p.nxt||'-',{})
+`</div></details>`};
/* 외부 라이브러리: 앱 폴더의 lib/ 에 파일이 있으면 그것을 먼저 쓰고, 없으면 인터넷(CDN)에서 받는다 (tools/fetch-libs.js 참고) */
const libHas=u=>fetch(u,{method:'HEAD',cache:'no-store'}).then(r=>r.ok).catch(()=>false),libSrc=async(l,c)=>(await libHas(l))?l:c,libTag=(u,ok,er)=>{const s=document.createElement('script');s.src=u;s.onload=ok;s.onerror=er;document.head.append(s)};
let PJ='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
const lp=()=>window.pdfjsLib?Promise.resolve():libHas('lib/pdfjs/pdf.min.js').then(h=>{if(h)PJ='lib/pdfjs/';return new Promise((o,e)=>libTag(PJ+'pdf.min.js',()=>{pdfjsLib.GlobalWorkerOptions.workerSrc=PJ+'pdf.worker.min.js';o()},()=>e(new Error('PDF 읽기 도구를 불러오지 못했습니다(온라인 1회 필요)'))))});
async function pdfRules(pg){const O=pdfjsLib.OPS,ol=await pg.getOperatorList();let m=[1,0,0,1,0,0];const st=[],hs=[];
 const pm=(A,B)=>[A[0]*B[0]+A[1]*B[2],A[0]*B[1]+A[1]*B[3],A[2]*B[0]+A[3]*B[2],A[2]*B[1]+A[3]*B[3],A[4]*B[0]+A[5]*B[2]+B[4],A[4]*B[1]+A[5]*B[3]+B[5]],P=(x,y)=>[x*m[0]+y*m[2]+m[4],x*m[1]+y*m[3]+m[5]];
 const rect=(x,y,w,h)=>{const a=P(x,y),b=P(x+w,y+h),W=Math.abs(b[0]-a[0]),H=Math.abs(b[1]-a[1]),x1=Math.min(a[0],b[0]),y1=Math.min(a[1],b[1]);if(H<=2.5){if(W>=30)hs.push({y:y1+H/2,x1:x1,x2:x1+W})}else if(W>=60){hs.push({y:y1,x1:x1,x2:x1+W});hs.push({y:y1+H,x1:x1,x2:x1+W})}};
 const seg=(a,b)=>{if(Math.abs(a[1]-b[1])<=1&&Math.abs(a[0]-b[0])>=30)hs.push({y:(a[1]+b[1])/2,x1:Math.min(a[0],b[0]),x2:Math.max(a[0],b[0])})};
 for(let i=0;i<ol.fnArray.length;i++){const f=ol.fnArray[i],a=ol.argsArray[i];
  if(f===O.save)st.push(m.slice());else if(f===O.restore){if(st.length)m=st.pop()}else if(f===O.transform)m=pm(a,m);
  else if(f===O.constructPath){let cur=null;
   if(Array.isArray(a[0])){const ops=a[0],c=a[1];let k=0;for(const o of ops){if(o===O.moveTo){cur=P(c[k],c[k+1]);k+=2}else if(o===O.lineTo){const q=P(c[k],c[k+1]);if(cur)seg(cur,q);cur=q;k+=2}else if(o===O.rectangle){rect(c[k],c[k+1],c[k+2],c[k+3]);k+=4}else if(o===O.curveTo)k+=6;else if(o===O.curveTo2||o===O.curveTo3)k+=4}}
   else{const d=a[1]&&a[1][0]!==undefined?(a[1].length==1&&a[1][0]&&a[1][0].length!==undefined?a[1][0]:a[1]):[];let k=0,first=null;while(k<d.length){const o=d[k++];if(o===0){cur=P(d[k],d[k+1]);first=cur;k+=2}else if(o===1){const q=P(d[k],d[k+1]);if(cur)seg(cur,q);cur=q;k+=2}else if(o===2)k+=6;else if(o===3)k+=4;else if(o===4){if(cur&&first)seg(cur,first)}else break}
    /* v6: 사각형은 moveTo+lineTo*3+close 로 들어옴 → 위 seg 로 처리, 채워진 얇은 사각형은 아래에서 */
    if(d.length>=13&&d[0]===0&&d[3]===1&&d[6]===1&&d[9]===1){const xs=[d[1],d[4],d[7],d[10]],ys=[d[2],d[5],d[8],d[11]];rect(Math.min(...xs),Math.min(...ys),Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys))}}}}
 if(!hs.length)return [];const mw=Math.max(...hs.map(h=>h.x2-h.x1)),ys=hs.filter(h=>h.x2-h.x1>=mw*.4).map(h=>h.y).sort((a,b)=>b-a),o=[];for(const y of ys)if(!o.length||o[o.length-1]-y>1.5)o.push(y);return o}
function ddLine(t){let k=String(t).split(' ');
 /* 굵게(겹쳐 찍은) 글자: 한 글자씩 두 번 → 한 번 */
 const one=x=>x.length==1&&/[가-힣一-鿿]/.test(x);let i=0;const o=[];
 while(i<k.length){if(one(k[i])&&k[i+1]===k[i]&&i<24){o.push(k[i]);i+=2}else{o.push(k[i]);i++}}
 /* 같은 덩어리가 연달아 두 번 → 한 번 (제목·라벨·값) */
 let r=o;for(let pass=0;pass<3;pass++){let ch=false;for(let n=Math.min(12,Math.floor(r.length/2));n>=1;n--){for(let a=0;a+2*n<=r.length;a++){let same=true;for(let q=0;q<n;q++)if(r[a+q]!==r[a+n+q]){same=false;break}
   if(same&&r.slice(a,a+n).some(x=>/[가-힣A-Za-z一-鿿]/.test(x))&&!(n==1&&/^\d+$/.test(r[a]))){r=r.slice(0,a+n).concat(r.slice(a+2*n));ch=true;break}}if(ch)break}if(!ch)break}
 return r.join(' ')}
async function pdfText(f,mp){await lp();const doc=await pdfjsLib.getDocument({cMapUrl:PJ+'cmaps/',cMapPacked:true,useSystemFonts:true,data:await f.arrayBuffer()}).promise,L=[],YS=[],RID=[],HL=[];try{for(let p=1;p<=Math.min(doc.numPages,mp||40);p++){const pg=await doc.getPage(p),c=await pg.getTextContent(),m={};let RL=[],HR=[];try{RL=await pdfRules(pg)}catch(e){RL=[]}try{HR=await pdfHlRects(pg)}catch(e){HR=[]}if(!HR.length){try{HR=await pdfPixHl(pg)}catch(e){HR=[]}}c.items.forEach(it=>{const y=Math.round(it.transform[5]/3),x0=it.transform[4],w=it.width||0,h=it.height||Math.abs(it.transform[3])||10,y0=it.transform[5];const hit=HR.length&&it.str.trim()&&HR.some(r=>r[2]>=x0+w*.1&&r[0]<=x0+w*.9&&r[3]>=y0-1&&r[1]<=y0+h*.9);(m[y]=m[y]||[]).push([x0,it.str,y0,hit?1:0])});try{pg.cleanup()}catch(e){}Object.keys(m).map(Number).sort((a,b)=>b-a).forEach(y=>{const t=ddLine(m[y].sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join(' ').replace(/\s+/g,' ').trim());if(t){L.push(t);YS.push(y*3-(p-1)*1e5);const y0=m[y][0][2];RID.push(RL.length>=3?p*1000+RL.filter(r=>r>y0).length:-1);HL.push(m[y].some(x=>x[3])?1:0)}})}}finally{try{await doc.destroy()}catch(e){}}try{krMend(L).forEach((v,i)=>{L[i]=v})}catch(e){}const R=L;R.y=YS;R.rid=RID;R.hl=HL;return R}
/* v592 노란 형광펜(Highlight/Ink 주석) 영역 [x1,y1,x2,y2] — 아이폰 파일 앱 마크업은 Ink, 일반 뷰어는 Highlight */
/* 주석이 아니라 페이지 그림에 직접 그려진 노란 표시도 찾기(그림으로 그려진 형광펜·동그라미) */
async function pdfPixHl(pg){const v1=pg.getViewport({scale:1}),sc=Math.min(2,1100/Math.max(v1.width,v1.height)),vp=pg.getViewport({scale:sc}),cv=document.createElement('canvas');cv.width=Math.round(vp.width);cv.height=Math.round(vp.height);const x=cv.getContext('2d',{willReadFrequently:true});x.fillStyle='#fff';x.fillRect(0,0,cv.width,cv.height);await pg.render({canvasContext:x,viewport:vp}).promise;const B=yelBands(x.getImageData(0,0,cv.width,cv.height));return B.map(b=>{const t=(b[1]-b[0])*.1;return [0,(cv.height-b[1]+t)/sc-1,v1.width,(cv.height-b[0]-t)/sc+6]})}
async function pdfHlRects(pg){const an=await pg.getAnnotations(),R=[];
const yel=c=>c&&c.length>=3&&c[0]>=200&&c[1]>=170&&c[2]<=150&&c[0]-c[2]>=80;
an.forEach(a=>{if(!/^(Highlight|Ink|Underline|Squiggly)$/.test(a.subtype))return;if(a.color&&!yel(a.color))return;if(!a.color&&a.subtype!='Highlight')return;
const bw=(a.borderStyle&&a.borderStyle.width)||0,pad=Math.max(bw/2,2);
const push=pts=>{if(!pts||!pts.length)return;let x1=1e9,y1=1e9,x2=-1e9,y2=-1e9;pts.forEach(q=>{const x=q.x!=null?q.x:q[0],y=q.y!=null?q.y:q[1];if(x<x1)x1=x;if(x>x2)x2=x;if(y<y1)y1=y;if(y>y2)y2=y});if(x1<1e9)R.push([x1-pad,y1-pad-2,x2+pad,y2+pad+2])};
if(a.inkLists&&a.inkLists.length)a.inkLists.forEach(push);
else if(a.quadPoints&&a.quadPoints.length){const q=a.quadPoints;if(Array.isArray(q[0])&&q[0].length>=4)q.forEach(push);else for(let i=0;i+3<q.length;i+=4)push(q.slice(i,i+4))}
else if(a.rect)R.push([a.rect[0],a.rect[1],a.rect[2],a.rect[3]])});
return R}
/* 형광펜이 있으면 첫 표시 줄(바로 위 제목 1줄 포함)부터 읽고, 결과가 없으면 전체로 되돌림 */
function hlSlice(L){const h=L.hl;if(!h||!h.some(x=>x))return null;const i=h.indexOf(1);let a=Math.max(0,i-1);const o=L.slice(a);return o.length>=3?o:null}
function recoat(J){const MX='(\\d+(?:\\s*~\\s*\\d+)?\\s*(?:시간|분|일|주일|주|개월)|무제한|제한\\s*없음|없음)',Z=x=>(x||'').replace(/\s/g,''),out=[],A=new RegExp('(\\d+)\\s*[℃°]\\s*C?[^\\n]{0,15}?최소\\s*[:：]?\\s*'+MX+'(?:[^\\n]{0,8}?최대\\s*[:：]?\\s*'+MX+')?','g');let m;
while(m=A.exec(J))out.push([m[1]+'℃',Z(m[2]),Z(m[3])]);
if(!out.length)J.split('\n').forEach(l=>{if(!/(재도장|도장\s*간격)/.test(l))return;const a=l.match(new RegExp('최소\\s*[:：]?\\s*'+MX)),b=l.match(new RegExp('최대\\s*[:：]?\\s*'+MX)),tp=l.match(/(\d+)\s*[℃°]/);if(a)out.push([tp?tp[1]+'℃':'',Z(a[1]),Z(b&&b[1])])});
if(!out.length){const D=J.match(/재도장\s*간격[^\n\d]{0,10}(\d+(?:\.\d+)?\s*(?:시간|분|일))\s*이상(?:[^\n]{0,8}?(\d+)\s*[℃°])?/);if(D)out.push([D[2]?D[2]+'℃':'',Z(D[1]),''])}
return out}
function parseDry(L){const T=/(-?\d+)\s*[℃°]\s*C?/g,V=l=>{if(!l)return[];const u=/\(시간\)/.test(l)?'시간':'';return[...l.matchAll(/(\d+(?:\.\d+)?)\s*(시간|분|개월|일|주)?/g)].map(m=>m[1]+(m[2]||u))};let rows=[];
for(let i=0;i<L.length&&!rows.length;i++){const tm=[...L[i].matchAll(T)].map(m=>m[1]+'℃');if(tm.length<2)continue;const b=L.slice(i+1,i+9),f=re=>b.find(l=>re.test(l)),n=tm.length,g=l=>V(l).slice(-n),a=g(f(/지촉/)),c=g(f(/고화|지건|경화건조/)),e=g(f(/완전/)),r=g(b.find(l=>/재도장/.test(l)&&!/최소|최대/.test(l)));if(a.length==n||c.length==n||r.length==n)rows=tm.map((t,k)=>[t,a[k]||'',c[k]||'',e[k]||'',r[k]||'',''])}
recoat(L.join('\n')).forEach(([t,mn,mx])=>{const r=rows.find(x=>x[0]==t)||(!t&&rows.length==1?rows[0]:0);if(r){if(!r[4]){r[4]=mn;r[5]=mx}}else rows.push([t,'','','',mn,mx])});
return rows.map(r=>r.join('/')).join(';')}
function parsePot(L){for(let i=0;i<L.length;i++){const l=L[i];if(!/가사\s*시간/.test(l))continue;const a=l.match(/(\d+)\s*[℃°]\s*C?[^\d]{0,6}?(\d+(?:\.\d+)?)\s*(시간|분)/);if(a)return a[1]+'℃ '+a[2]+a[3];const v=[...l.matchAll(/(\d+(?:\.\d+)?)\s*(시간|분)/g)].map(m=>m[1]+m[2]),tm=[...L.slice(Math.max(0,i-4),i).join(' ').matchAll(/(\d+)\s*[℃°]\s*C?/g)].map(m=>m[1]+'℃').slice(-v.length);if(v.length&&tm.length==v.length)return tm.map((x,k)=>x+' '+v[k]).join(' / ');if(v.length)return v.join(' / ')}return ''}
const tdsNm=(f,sp)=>{const h=String((sp&&sp.hname)||'').replace(/\([^)]*\)|（[^）]*）/g,' ').replace(/\s+/g,' ').trim(),ok=h.length>=2&&h.length<=30&&!/(합니다|입니다|됩니다|적합|사용|있습니다|바랍니다|것)/.test(h)&&!/[.。]$/.test(h),b=fb(f.name).replace(/_+/g,' ').replace(/\b(TDS|PDS|MSDS|datasheet|technical data sheet)\b/ig,' ').replace(/기술자료집?|데이터\s*시트|최신|최종|수정본|복사본|\(\d+\)|rev\.?\s*\d*|ver\.?\s*\d*/ig,' ').replace(/\s+/g,' ').trim();return (ok?h:b).slice(0,40)};
async function extC(key,ci,f){try{tt('TDS에서 기술자료를 읽는 중…');const L=await pdfLines(f,tt,false,true),sp=parseAll(L),c=S.coats[ci];if(!c)return;
const m=!(c.n||'').trim()&&(findP(fb(f.name))||(sp.hname&&findP(sp.hname)));
const mv=async nk=>{if(nk===key)return;const r=await idb('get',key).catch(()=>0);if(r){await idb('put',nk,r);await idb('del',key).catch(()=>0)}};
if(m){await mv(m.n);c.n=m.n;c.dft=c.tr=c.loss='';c.svr=m.svr||'';sv();cards();ext(m.n,f);return}
const up=[],has=k=>c[k]!==undefined&&c[k]!==''&&c[k]!==null,set=(k,v,l)=>{if(v&&!has(k)){c[k]=String(v);up.push(l)}};
set('dft',sp.dft,'DFT');set('svr',sp.svr,'SVR');if(sp.tr)set('tr',+(sp.tr*100).toFixed(1),'희석율');
if(!(c.n||'').trim()){const nm=tdsNm(f,sp);if(nm){await mv(nm);c.n=nm;up.push('제품명')}}
sv();cards();tt('TDS 첨부 완료'+(up.length?'<br>입력 칸에 채웠습니다<br><small>'+up.join(' · ')+'</small>':'<br>자동으로 읽은 값이 없어 직접 입력해 주세요'))}catch(e){tt('TDS는 첨부되었습니다.<br>기술자료 자동 읽기는 실패했습니다 ('+(e&&e.message||e)+')')}}
async function ext(n,f,q){const say=q?()=>0:tt;if(!/pdf/i.test(f.type+f.name))return;try{say('TDS에서 기술자료를 읽는 중…');const L=await pdfLines(f,q?null:tt,false,true),d=parseDry(L),j=DB.findIndex(p=>p.n==n);if(j<0)return;const pt=parsePot(L),up=applySpec(DB[j],parseAll(L),true);if(pt){DB[j].pot=pt;DB[j].dsrc='TDS'}if(up.length)DB[j].dsrc='TDS';if(d){DB[j].dry=d;DB[j].dsrc='TDS'}say('TDS 첨부 완료'+(d?'<br>건조시간 '+d.split(';').length+'행을 가져왔습니다':'<br>건조시간 표는 찾지 못했습니다. "TDS 보기"로 원문을 확인하세요')+(up.length?'<br>기본 정보를 기술자료 기준으로 업데이트했습니다<br><small>'+up.join(' · ')+'</small>':''));sv();if(!q){cards();dbl()}}catch(e){say('TDS는 첨부되었습니다.<br>기술자료 자동 읽기는 실패했습니다 ('+e.message+')')}}
let VZ=1,VD=null;
let VK='',VT=0;const VMIN=.5,VMAX=4;
async function drawPdf(keep){const box=$('#vb');if(!box||!VD)return;const tk=++VT,W=box.clientWidth-12,dpr=Math.min(window.devicePixelRatio||1,2),ps=[];
for(let p=1;p<=VD.numPages;p++){ps.push(await VD.getPage(p));if(tk!=VT)return}
const nw=document.createElement('div');nw.id='vz';
const cs=ps.map(pg=>{const v1=pg.getViewport({scale:1}),cw=W*VZ,ch=v1.height*cw/v1.width;let k=cw/v1.width*dpr;const a=cw*dpr*ch*dpr;if(a>8e6)k*=Math.sqrt(8e6/a);const vp=pg.getViewport({scale:k}),cv=document.createElement('canvas');cv.width=Math.round(vp.width);cv.height=Math.round(vp.height);cv.style.cssText='display:block;margin:0 auto 6px;background:#fff;width:'+cw+'px;height:'+ch+'px';nw.append(cv);return[pg,vp,cv]});
const put=()=>{box.innerHTML='';box.append(nw)};if(!keep)put();
for(const[pg,vp,cv]of cs){await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;if(tk!=VT)return}
if(keep){put();keep()}}
function vbPinch(b){let s=null,busy=0;const D=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY),rs=w=>{if(w){w.style.transform='';w.style.transformOrigin='';w.style.willChange=''}};
b.addEventListener('touchstart',e=>{if(e.touches.length!=2||busy||!VK)return;const r=b.getBoundingClientRect(),fx=(e.touches[0].clientX+e.touches[1].clientX)/2-r.left,fy=(e.touches[0].clientY+e.touches[1].clientY)/2-r.top;s={d:D(e.touches)||1,z:VZ,k:1,fx,fy,cx:b.scrollLeft+fx,cy:b.scrollTop+fy};const w=$('#vz');if(w){w.style.transformOrigin=(s.cx-6)+'px '+(s.cy-6)+'px';w.style.willChange='transform'}},{passive:true});
b.addEventListener('touchmove',e=>{if(!s||e.touches.length!=2)return;e.preventDefault();const z=Math.min(VMAX,Math.max(VMIN,s.z*D(e.touches)/s.d));s.k=z/s.z;const w=$('#vz');if(w)w.style.transform='scale('+s.k+')'},{passive:false});
const end=async e=>{if(!s||e.touches.length>=2)return;const o=s;s=null;const z=Math.min(VMAX,Math.max(VMIN,o.z*o.k)),w=$('#vz');if(Math.abs(z-o.z)<.02){rs(w);return}
const r=z/o.z,fin=()=>{b.scrollLeft=o.cx*r-o.fx;b.scrollTop=o.cy*r-o.fy};busy=1;try{VZ=z;if(VK=='pdf')await drawPdf(fin);else{const im=w&&w.querySelector('img');if(im)im.style.width=(z*100)+'%';rs(w);fin()}}finally{busy=0;rs($('#vz'))}};
b.addEventListener('touchend',end);b.addEventListener('touchcancel',end)}
let VB=null;async function vwr(bl,name,type){VB={bl,name};let e=$('#vw');if(!e){e=document.createElement('div');e.id='vw';e.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;background:#fff;z-index:30;flex-direction:column';document.body.append(e)}
e.innerHTML='<div class="vwh" style="display:grid;grid-template-columns:44px 1fr 44px;align-items:center;padding:calc(env(safe-area-inset-top) + 6px) 6px 6px;background:#fff;border-bottom:1px solid #e6ecf6;color:#0f2147"><button id=vc aria-label="닫기" style="width:40px;height:40px;padding:0;border:0;background:transparent;color:#14213d;display:grid;place-items:center"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><b style="text-align:center;font-size:16px;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 4px">'+name+'</b><button id=vq aria-label="인쇄" style="width:40px;height:40px;padding:0;border:0;background:transparent;color:#2f6fdc;display:grid;place-items:center"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9V3h10v6M7 17H4v-6h16v6h-3M7 14h10v7H7z"/></svg></button></div><div id=vb style="flex:1;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-x pan-y;background:#e9edf3;padding:6px"></div>';e.style.display='flex';VZ=1;VD=null;VK='';VT++;vbPinch($('#vb'));
$('#vq').onclick=()=>prnBlob(bl,name);$('#vc').onclick=()=>{VT++;VK='';e.style.display='none';$('#vb').innerHTML='';VD=null};
const u=URL.createObjectURL(bl),pdf=/pdf/i.test(type+name),img=/^image/.test(type)||/\.(png|jpe?g|gif|webp)$/i.test(name);
if(img){VK='img';$('#vb').innerHTML='<div id=vz><img src="'+u+'" style="width:100%;display:block"></div>';return}
if(!pdf){e.style.display='none';return dl(bl,name)}
try{await lp();VD=await pdfjsLib.getDocument({cMapUrl:PJ+'cmaps/',cMapPacked:true,useSystemFonts:true,data:await bl.arrayBuffer()}).promise;VK='pdf';await drawPdf()}catch(x){$('#vb').innerHTML='<iframe src="'+u+'" style="width:100%;height:100%;border:0;background:#fff"></iframe>'}}
const ft=f=>f.type||(/\.pdf$/i.test(f.name)?'application/pdf':'application/octet-stream');
const nk=s=>String(s).normalize('NFKC').toLowerCase().replace(/[^a-z0-9가-힣]/g,''),fb=n=>String(n).normalize('NFC').replace(/\.[^.]+$/,'');
const toks=b=>String(b).normalize('NFC').toLowerCase().replace(/([가-힣])([a-z0-9])/g,'$1 $2').replace(/([a-z0-9])([가-힣])/g,'$1 $2').split(/[^a-z0-9가-힣]+/).filter(t=>t.length>=2);
const scoreP=(p,b)=>{const hay=nk((p.n||'')+' '+(p.g||'')+' '+(p.e||'')+' '+((p.al||[]).join(' ')));let s=0;for(const t of toks(b)){if(!hay.includes(t))continue;s+=/\d/.test(t)&&/[a-z]/.test(t)&&t.length>=3?5:(/\d/.test(t)?1:(t.length>=3?2:1))}return s};
function findP(b){const k=nk(b);if(!k)return null;const k2=k.replace(/기술자료집|기술자료|데이터시트|datasheet|technicaldatasheet|tds|pds|rev\d*|ver\d*|최신|최종|수정본|복사본|copy/g,'');const uq=(a,len)=>{a=a.slice().sort((x,y)=>len(y)-len(x));return a[0]&&(!a[1]||len(a[1])<len(a[0]))?a[0]:null};
let r=DB.find(x=>nk(x.n)==k||(k2&&nk(x.n)==k2));if(r)return r;
r=DB.find(x=>(x.al||[]).some(a=>nk(a)==k));if(r)return r;
r=uq(DB.filter(x=>{const q=nk(x.n);return q.length>=4&&k.includes(q)}),x=>nk(x.n).length);if(r)return r;
r=uq(DB.filter(x=>(x.al||[]).some(a=>{const q=nk(a);return q.length>=3&&k.includes(q)})),x=>1);if(r)return r;
if(k.length>=4){const c=DB.filter(x=>nk(x.n).includes(k));if(c.length==1)return c[0]}
const c2=DB.filter(x=>[x.g,x.e].some(a=>{const q=nk(a||'');return q.length>=3&&(q==k||(k.length>=4&&(k.includes(q)||q.includes(k))))}));if(c2.length==1)return c2[0];
const sc=DB.map(x=>[x,scoreP(x,b)]).filter(y=>y[1]>=5).sort((a,c)=>c[1]-a[1]);return sc[0]&&(!sc[1]||sc[1][1]<sc[0][1])?sc[0][0]:null}
async function contentP(f){if(!/pdf/i.test(ft(f)+f.name))return null;try{const k=nk((await pdfText(f,2)).slice(0,40).join(' '));if(!k)return null;const c=DB.filter(x=>{const q=nk(x.n);return q.length>=4&&k.includes(q)});if(!c.length)return null;c.sort((a,b)=>k.indexOf(nk(a.n))-k.indexOf(nk(b.n))||nk(b.n).length-nk(a.n).length);return c[0]}catch(e){return null}}
let PK=[],BR=null;
function rBR(){const e=$('#brs');if(!e)return;if(!BR){e.innerHTML='';return}e.innerHTML=`<div class=hint style="margin-top:6px"><b>■ 최근 일괄 등록 결과</b> — <b style="color:#2f7a45">✅ 매칭 ${BR.m.length}개</b> · <b style="color:#b0505a">❌ 미매칭 ${BR.u.length}개</b></div><div style="max-height:30vh;overflow:auto;font-size:12px;border:1px solid var(--b);border-radius:6px;padding:4px 6px">`+BR.m.map(x=>`<div style="padding:2px 0;border-bottom:1px solid #eef2f9;word-break:break-all">✅ ${esc(x[0])}<br><b style="color:#2f7a45">→ ${esc(x[1])}</b> <small>(${x[2]} 기준)</small></div>`).join('')+BR.u.map(x=>`<div style="padding:2px 0;color:#b0505a;word-break:break-all">❌ ${esc(x)} (미매칭)</div>`).join('')+'</div>'}
async function rPend(){const e=$('#pend');if(!e)return;const ks=(await tdk()).filter(x=>String(x).startsWith('@:'));PK=ks;e.innerHTML=ks.length?`<div class=hint style="margin-top:6px">■ 연결되지 않은 파일 ${ks.length}개 — "제품 연결"로 직접 지정하면 다음부터 같은 이름의 파일은 자동 연결됩니다</div>`+ks.map((k,i)=>`<div class=pnd><span class=pnn>${esc(k.slice(2))}</span><button class=lk onclick="pendPick(${i})">제품 연결</button></div>`).join(''):''}
function pendPick(i){const k=PK[i];if(!k)return;const name=k.slice(2),b=fb(name);let e=$('#pk');if(e)e.remove();e=document.createElement('div');e.id='pk';e.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:25;display:flex;align-items:flex-end;justify-content:center';e.onclick=ev=>{if(ev.target===e)e.remove()};
e.innerHTML=`<div style="background:#fff;border-radius:16px 16px 0 0;padding:14px 12px calc(env(safe-area-inset-bottom) + 12px);width:100%;max-width:560px;max-height:82vh;display:flex;flex-direction:column;gap:8px"><b style="color:#3d5a8c">제품 연결</b><div class=hint style="word-break:break-all">${esc(name)}</div><input id=pkq placeholder="제품명·일반명 검색"><div id=pkl class=cb style="max-height:46vh"></div><button onclick="$('#pk').remove()">닫기</button></div>`;document.body.append(e);
const draw=()=>{const q=nk($('#pkq').value);let L=DB.map((p,j)=>[p,j,scoreP(p,b)]);L=q?L.filter(([p])=>nk(p.n+' '+(p.g||'')+' '+(p.e||'')).includes(q)):L.filter(x=>x[2]>0).sort((a,c)=>c[2]-a[2]);L=L.slice(0,40);$('#pkl').innerHTML=L.length?L.map(([p,j])=>`<div onclick="linkPend(${i},${j})"><b>${esc(p.n)}</b><br><small>${esc(p.g||'')}</small></div>`).join(''):'<div><small>비슷한 제품이 없습니다. 위 검색칸에 제품명을 입력하세요</small></div>'};
$('#pkq').oninput=draw;draw()}
async function linkPend(i,j){const k=PK[i],p=DB[j];if(!k||!p)return;const f=await idb('get',k).catch(()=>0);if(!f)return;await idb('put',p.n,f);await idb('del',k);p.al=[...new Set([...(p.al||[]),fb(f.name)])];sv();const e=$('#pk');if(e)e.remove();if(/pdf/i.test((f.type||'')+f.name)){try{await ext(p.n,new File([f.buf],f.name,{type:f.type}),1)}catch(x){}}await mark();cards();dbl();tt('<b>'+esc(p.n)+'</b> 에 연결했습니다<br><small>"'+esc(fb(f.name))+'" 이름의 파일은 다음부터 자동으로 연결됩니다</small>')}
async function autoReg(f,rec){
 const img=/^image\//.test(f.type)||/\.(png|jpe?g|webp|bmp)$/i.test(f.name),pdf=/pdf/i.test((rec.type||'')+f.name);
 if(!img&&!pdf)return null;if(f.size>20971520)return null;
 const r=await tdsExtract(f,()=>{},{noOcr:true}),p=r&&r.p;if(!p||!p.n)return null;
 const ex=findP(p.n);if(ex)return{p:ex,isNew:false};
 if(!(p.svr||p.sg||p.dft||p.pk||p.mk||p.dry||p.pot))return null;   /* 아무 값도 못 읽은 문서는 신규 등록하지 않고 대기 보관 */
 const q={tc:'',ts:18,url:'',un:'ℓ',...p};try{if(!q.cat)q.cat=window.PQCAT[window.pqCatKey(q)]}catch(e){}
 q.pk=q.pk||q.mk||'';q.mk=q.mk||q.pk||'';q.ts=q.ts||(q.tn&&q.tn!='무희석'?18:0);if(q.svr&&q.dft)q.th=+(q.svr*10/q.dft).toFixed(4);
 q.src='';q.rev='';q.chk='';q.ext=pqToday();q.dsrc='TDS';q.ver=0;try{pqNorm(q)}catch(e){}
 DB.push(q);sv();return{p:q,isNew:true}
}
async function bulk(files){files=[...files];if(!files.length)return;const pend=[],pdfs=[],mt=[],mp=[];let ok=0,cm=0,nw=0,fi=-1;tt('기술자료 등록 중… ('+files.length+'개)');
for(const f of files){fi++;try{const buf=await f.arrayBuffer(),rec={name:f.name,type:ft(f),buf};let p=findP(fb(f.name)),how='파일명';if(!p){p=await contentP(f);if(p){cm++;how='문서내용'}}if(!p){tt('TDS 분석·신규 등록 중… ('+(fi+1)+'/'+files.length+')<br><small>'+esc(f.name)+'</small>');try{const r=await autoReg(f,rec);if(r){p=r.p;if(r.isNew){nw++;how='신규 등록'}else{cm++;how='문서내용'}}}catch(e){console.error(e)}}if(p){await idb('put',p.n,rec);ok++;mt.push(p.n);mp.push([f.name,p.n,how]);if(/pdf/i.test(rec.type+f.name)&&how!=='신규 등록')pdfs.push([p.n,new File([buf],f.name,{type:rec.type})])}else{await idb('put','@:'+f.name,rec);pend.push(f.name)}}catch(e){pend.push(f.name+' (오류)')}}
TLAST=mt;BR={m:mp,u:pend.slice()};await mark();rBR();let i=0,dn=0;for(const [n,f] of pdfs){i++;tt('TDS에서 건조시간 읽는 중… ('+i+'/'+pdfs.length+')');try{await ext(n,f,1);if(P(n)&&P(n).dry)dn++}catch(e){}}
await mark();cards();dbl();tt('기술자료 일괄 등록 완료<br><b style="color:#2f7a45">✅ 매칭·등록 '+ok+'개</b>'+(nw?' · <b style="color:#1c58e0">🆕 신규 제품 '+nw+'개</b>':'')+(pend.length?' · <b style="color:#b0505a">❌ 미매칭 '+pend.length+'개</b>':'')+'<br><small>'+mp.slice(0,10).map(x=>esc(x[0])+' → <b>'+esc(x[1])+'</b>').join('<br>')+(mp.length>10?'<br>외 '+(mp.length-10)+'개 (DB 화면에서 확인)':'')+'</small>'+(pdfs.length?'<br><small>기본 제원은 기술자료 기준으로 갱신 · 건조시간·재도장간격 '+dn+'/'+pdfs.length+'개 인식</small>':'')+(cm?'<br><small>파일 이름으로 못 찾아 문서 안의 제품명으로 매칭 '+cm+'개</small>':'')+(nw?'<br><small>DB에 없던 제품 '+nw+'개를 문서에서 읽어 새로 등록했습니다 — 제품 DB에서 ‘검토 필요’ 값을 원문과 대조해 확인하세요</small>':'')+(pend.length?'<br>미매칭 '+pend.length+'개는 대기 보관 — 아래 "제품 연결"로 직접 지정하세요<br><small>'+pend.slice(0,8).join(', ')+(pend.length>8?' 외':'')+'</small>':''))}
function bulkReset(){tdk().then(ks=>{const pk=ks.filter(x=>String(x).startsWith('@:')),mk=ks.length-pk.length;if(!pk.length)return tt('초기화할 미매칭 파일이 없습니다<br><small>제품에 매칭·등록된 기술자료 '+mk+'개는 초기화 대상이 아닙니다</small>');ask('<b style="color:#c9252f;font-size:16px">⚠ 경고</b><br>제품과 매칭되지 않은 대기 파일 <b>'+pk.length+'개</b>만 삭제할까요?<br><small>매칭 등록된 기술자료 '+mk+'개와 추출된 건조시간·가사시간은 그대로 유지됩니다.</small>',async()=>{for(const k of pk)await idb('del',k).catch(()=>0);await mark();dbl();tt('미매칭 대기 파일 '+pk.length+'개를 초기화했습니다<br><small>매칭 등록된 기술자료 '+mk+'개는 유지됨</small>')})})}
function dbReset(){ask('<b style="color:#c9252f;font-size:16px">⚠ 경고</b><br><b>DB를 기본 상태로 초기화합니다.</b><br>직접 추가·수정한 제품 데이터가 <b>모두 삭제</b>되며 복구할 수 없습니다.<br><small>첨부·추출한 기술자료(TDS)는 유지됩니다.</small>',()=>{const o=DB;DB=DEF.map(p=>{const q=o.find(x=>x.n==p.n);return q&&(q.dry||q.pot||q.url)?{...p,dry:q.dry,pot:q.pot,dsrc:q.dsrc,url:q.url}:{...p}});sv();dbl();cards();tt('DB를 초기화했습니다')})}
function tdsAll(){tdk().then(ks=>{const n=ks.length,m=DB.filter(p=>p.dry||p.pot||p.dsrc||p.url).length;if(!n&&!m)return tt('초기화할 데이터시트가 없습니다');ask('<b style="color:#c9252f;font-size:16px">⚠ 경고</b><br><b>데이터시트 전체 초기화 · 모든 데이터가 삭제됩니다.</b><br>첨부된 기술자료 파일 <b>'+n+'개</b>(미매칭 대기 파일 포함)와 제품별 건조시간·가사시간 정보 <b>'+m+'개</b>를 모두 삭제할까요?<br><small>제품 DB와 직접 추가한 제품은 유지됩니다. 되돌릴 수 없습니다.</small>',async()=>{for(const k of ks)await idb('del',k).catch(()=>0);DB.forEach(p=>{const d=DEF.find(x=>x.n==p.n)||{};['dry','pot','dsrc','url'].forEach(k=>{if(d[k]!==undefined&&d[k]!=='')p[k]=d[k];else delete p[k]})});sv();await mark();dbl();cards();tt('데이터시트를 전체 초기화했습니다<br><small>첨부 TDS '+n+'개 · 건조시간/가사시간 '+m+'개 삭제</small>')})})}
async function autoLink(){let n=0;const ks=(await tdk()).filter(x=>String(x).startsWith('@:'));for(const k of ks){const f=await idb('get',k).catch(()=>0);if(!f)continue;let p=findP(fb(f.name));if(!p)p=await contentP(new File([f.buf],f.name,{type:f.type}));if(!p)continue;await idb('put',p.n,f);await idb('del',k);n++;TLAST=[...TLAST,p.n];if(/pdf/i.test((f.type||'')+f.name)){try{await ext(p.n,new File([f.buf],f.name,{type:f.type}),1)}catch(e){}}}if(n){mark();cards();dbl()}return n}
const lx=()=>window.XLSX?Promise.resolve():libSrc('lib/xlsx.full.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js').then(u=>new Promise((o,e)=>libTag(u,o,()=>e(new Error('엑셀 읽기 도구는 온라인에서 처음 한 번 필요합니다. CSV는 오프라인 가능')))));
function csv(t){const R=[];let r=[],c='',q=0;t=t.replace(/^\uFEFF/,'');for(let i=0;i<t.length;i++){const h=t[i];if(q){if(h=='"'){if(t[i+1]=='"'){c+='"';i++}else q=0}else c+=h}else if(h=='"')q=1;else if(h==','){r.push(c);c=''}else if(h=='\n'||h=='\r'){if(h=='\r'&&t[i+1]=='\n')i++;r.push(c);R.push(r);r=[];c=''}else c+=h}if(c||r.length){r.push(c);R.push(r)}return R}
async function imp(f){if(!f)return;try{const x=f.name.split('.').pop().toLowerCase();if(x=='json'){LAST=[];JSON.parse(await f.text()).forEach(p=>{const j=DB.findIndex(q=>q.n==p.n);if(j<0)DB.push(p);else{const o=DB[j];Object.keys(p).forEach(k=>{if(p[k]!==''&&p[k]!==undefined&&p[k]!==0)o[k]=p[k]})};LAST.push(p.n)})}else{let rows;if(x=='csv')rows=csv(await f.text());else{await lx();const wb=XLSX.read(await f.arrayBuffer());rows=wb.SheetNames.map(s=>XLSX.utils.sheet_to_json(wb.Sheets[s],{header:1,defval:''})).find(r=>r.some(a=>a.includes('제품명')))}
const hi=rows.findIndex(r=>r.includes('제품명')),h=rows[hi],o=h.indexOf('제품명'),kcc=/기술/.test(h[o+4]||''),m={제품명:'n',제조사:'mf',일반명:'g',용도:'d',제품설명:'d',출규:'pk',단위:'un',추천도막:'dft',SVR:'svr',희석제코드:'tc',희석율:'tr',희석제명:'tn',규격:'ts','TDS링크':'url',영문:'e',비중:'sg',혼규:'mk','1회도막':'ct',횟수:'cnt',이론도포율:'th',선행도장:'pre',후속도장:'nxt',기준색상:'col',건조시간:'dry',가사시간:'pot',표면처리:'sp',사용용도:'us',포장규격:'pks'},pos={n:0,g:1,e:2,d:3,sg:4,pk:5,mk:6,un:7,dft:8,svr:9,ct:10,cnt:11,th:12,tc:13,tr:14,tn:15,ts:16,pre:17,nxt:18,col:19};
LAST=[];rows.slice(hi+1).forEach(r=>{const p={};if(kcc)for(const k in pos)p[k]=r[o+pos[k]];else h.forEach((t,j)=>{if(m[t])p[m[t]]=r[j]});if(!p.n)return;['pk','dft','svr','tr','ts','sg','mk','ct','cnt','th'].forEach(k=>p[k]=+p[k]||0);const j=DB.findIndex(q=>q.n==p.n);if(j<0)DB.push(p);else{const o=DB[j];Object.keys(p).forEach(k=>{if(p[k]!==''&&p[k]!==undefined&&p[k]!==0)o[k]=p[k]})};LAST.push(p.n)})}
sv();T(1);cards();const al=await autoLink().catch(()=>0);tt('DB 업데이트 완료: '+LAST.length+'개 반영 (전체 '+DB.length+'개). 아래 목록에서 제품별 기본 항목을 확인하세요'+(al?'<br>대기 중이던 기술자료 '+al+'개를 자동 연결했습니다':''))}catch(e){tt('불러오기 실패: '+e.message)}}
function ex(){const H=['제품명','제조사','일반명','용도','출규','단위','추천도막','SVR','희석제코드','희석율','희석제명','규격','TDS링크','영문','비중','혼규','1회도막','횟수','이론도포율','선행도장','후속도장','기준색상','건조시간','가사시간','표면처리','사용용도','포장규격','혼합규격당도장면적(이론)'],K=['n','mf','g','d','pk','un','dft','svr','tc','tr','tn','ts','url','e','sg','mk','ct','cnt','th','pre','nxt','col','dry','pot','sp','us','pks'],q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';dl(new Blob(['\uFEFF'+[H,...DB.map(p=>[...K.map(k=>p[k]),cov1(p)?+cov1(p).toFixed(2):''])].map(r=>r.map(q).join(',')).join('\n')],{type:'text/csv'}),'도료DB.csv')}
function applyLock(){const i=$('#ar');if(!i)return;S.lock=false;i.readOnly=false;i.style.background=''}
function shareCards(){const A=+S.area||1,fl=x=>F(Math.floor(x/10)*10,0),C=[];let tot=0,T2=0,n=0;
S.coats.forEach((c,i)=>{const r=calc(c);if(!r)return;n++;const p=PC(c.n),Ac=+c.area||A,a=r[0],t=r[1],u=UN(p),s=r.reduce((x,y)=>x+y.amt,0),q=(x,un)=>{const v=x.ac*Ac;return F(v)+un+' → '+Math.ceil(v/x.pk-1e-9)+'말'};const ct=Ac>0?f10(a.amt*Ac)+(t?f10(t.amt*Ac):0):0;tot+=s;T2+=ct;
const R=[['소요량','이론 '+F(a.th)+u+'/㎡ · 실제 '+F(a.ac)+u+'/㎡'],['Loss(로스율)',F(ev(c,p).loss)+'%']];if(t)R.push(['희석제',tnClean(p.tn||'희석제')+' · 희석율 '+F(ev(c,p).tr)+'%']);
if(s>0)R.push(['㎡단가',F(s,0)+'원/㎡'+(t&&t.amt>0?' (제품 '+F(a.amt,0)+' + 희석 '+F(t.amt,0)+')':'')]);
if(Ac>0){R.push(['필요 물량','제품 '+q(a,u)+(t?' / 희석제 '+q(t,'L'):'')]);if(s>0)R.push(['총 자재비',F(ct,0)+'원'])}
C.push({t:od(i+1)+' · '+c.n,sub:(+c.price>0?'말당 '+F(+c.price,0)+'원':'')+(Ac>0?(+c.price>0?' · ':'')+F(Ac)+'㎡':''),use:p.us||p.g||p.d||'',R})});
if(!n)return null;const sum=[];if(n>1){if(tot>0)sum.push(['합계 ㎡단가',fl(tot)+'원/㎡']);if(T2>0)sum.push(['총 자재비 합계',fl(T2)+'원'])}
return{head:'일위대가표',date:new Date().toLocaleDateString('ko-KR'),area:F(A)+'㎡'+(S.lock?' (고정)':''),C,sum}}
function shareText(){const d=shareCards();if(!d)return '';const L=['📋 '+d.head,d.date+' · 기본면적 '+d.area];
d.C.forEach(c=>{L.push('',c.t);if(c.sub)L.push(c.sub);if(c.use)L.push(c.use);c.R.forEach(r=>L.push(r[0]+': '+r[1]))});
if(d.sum.length){L.push('','💰 합계');d.sum.forEach(r=>L.push(r[0]+': '+r[1]))}
L.push('','※ 참조용 · 십원 미만 절사 · VAT 별도');return L.join('\n')}
function shareHtml(){const d=shareCards();if(!d)return '';const x=s=>String(s).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
let h='<div style="background:#3d5a8c;color:#fff;border-radius:10px;padding:8px 10px"><b>📋 '+d.head+'</b><div style="font-size:11px;opacity:.9">'+x(d.date)+' · 기본면적 '+x(d.area)+'</div></div>';
d.C.forEach((c,i)=>{const col=(typeof cvars=='function'?'':'');h+='<div style="background:#fff;border:1px solid #cfd8e8;border-left:4px solid #3d5a8c;border-radius:10px;padding:7px 10px;margin-top:6px"><b style="font-size:13px;color:#2c4470">'+x(c.t)+'</b>'+(c.sub?'<div style="font-size:11px;color:#667">'+x(c.sub)+'</div>':'')+(c.use?'<div style="font-size:11px;color:#667;margin-top:2px">'+x(c.use)+'</div>':'')+'<div style="margin-top:4px;font-size:12px;line-height:1.55">'+c.R.map(r=>'<div style="display:flex;gap:8px"><span style="flex:0 0 62px;color:#667">'+x(r[0])+'</span><span style="flex:1;word-break:break-word">'+x(r[1])+'</span></div>').join('')+'</div></div>'});
if(d.sum.length)h+='<div style="background:#fff7e0;border:1px solid #e8d49a;border-radius:10px;padding:7px 10px;margin-top:6px;font-size:12px"><b>💰 합계</b>'+d.sum.map(r=>'<div style="display:flex;justify-content:space-between"><span>'+x(r[0])+'</span><b>'+x(r[1])+'</b></div>').join('')+'</div>';
return h}
let SHM='text',IMGB=null,IMGP=null;
function shImg(){IMGB=null;return IMGP=(async()=>{await ldp();const w=document.createElement('div');w.style.cssText='position:fixed;left:-9999px;top:0;width:560px;padding:12px;box-sizing:border-box;background:#f4f7fc;font-family:system-ui,sans-serif;color:#1a2330';w.innerHTML=shareHtml();document.body.append(w);try{const cv=await html2canvas(w,{scale:2,backgroundColor:'#f4f7fc'});return IMGB=await new Promise(ok=>cv.toBlob(ok,'image/png'))}finally{w.remove()}})()}
/* shr: 이전 정의 제거(뒤쪽 정의가 사용됨) */

async function shareBlob(bl,name){const ty=bl.type||(/\.pdf$/i.test(name)?'application/pdf':'application/octet-stream'),f=new File([bl],name,{type:ty});try{if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],title:name});else if(navigator.share){await navigator.share({title:name,text:name+' (기술자료)'});tt('이 기기는 파일 공유를 지원하지 않아<br>제목만 공유했습니다')}else{dl(bl,name);tt('공유창을 지원하지 않아 파일을 저장했습니다')}}catch(x){if(!(x&&x.name=='AbortError')){try{dl(bl,name);tt('공유가 막혀 있어 파일을 저장했습니다')}catch(y){tt('공유할 수 없습니다')}}}}
async function tshare(n){const p=P(n);if(!p)return tt('제품을 먼저 선택하세요');const f=await idb('get',n).catch(()=>0);if(f){const bl=f.buf?new Blob([f.buf],{type:f.type}):f.b;return shareBlob(bl,f.name)}if(p.url){try{if(navigator.share)return await navigator.share({title:p.n+' 기술자료',url:p.url})}catch(x){if(x&&x.name=='AbortError')return}try{await navigator.clipboard.writeText(p.url);tt('TDS 링크를 복사했습니다')}catch(x){tt(p.url)}return}tt('첨부된 TDS가 없습니다')}
function prn(){try{window.print()}catch(x){tt('이 화면에서는 인쇄가 막혀 있습니다<br>이미지 공유·저장을 이용하세요')}}
function prnBlob(bl,name){const u=URL.createObjectURL(bl);if(/^image/.test(bl.type)||/\.(png|jpe?g|gif|webp)$/i.test(name)){const w=document.createElement('iframe');w.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0';w.srcdoc='<style>@page{size:A4 '+(window.LASTLAND?'landscape':'portrait')+';margin:0}</style>'+'<style>html,body{margin:0;height:100%}img{display:block;margin:0 auto;max-width:100%;max-height:100vh}</style><img src="'+u+'" onload="print()">';document.body.append(w);return setTimeout(()=>w.remove(),60000)}
const w=document.createElement('iframe');w.style.cssText='position:fixed;right:0;bottom:0;width:1px;height:1px;border:0';w.src=u;w.onload=()=>{try{w.contentWindow.focus();w.contentWindow.print()}catch(x){open(u,'_blank')||tt('인쇄창을 열 수 없습니다<br>공유 후 다른 앱에서 인쇄하세요')}};document.body.append(w);setTimeout(()=>w.remove(),120000)}
function fit(){}
addEventListener('resize',()=>fit(document));document.fonts&&document.fonts.ready.then(()=>fit(document));addEventListener('load',()=>fit(document));
{const _r=res;res=function(){_r.apply(this,arguments);fit(document);requestAnimationFrame(()=>fit(document))}}
function pqFitW(el){try{const w=()=>{let f=10;const st=()=>el.style.setProperty('font-size',f+'px','important');el.style.whiteSpace='nowrap';st();while(el.scrollWidth>el.clientWidth+1&&f>7){f-=.25;st()}if(el.scrollWidth>el.clientWidth+1)el.style.whiteSpace='normal'};w();setTimeout(w,150)}catch(e){}}
{const _r3=res;res=function(){_r3.apply(this,arguments);try{S.coats.forEach((c,i)=>{const p=PC(c.n),hh=$('#h'+i),cc=document.querySelectorAll('#cs .cc')[i];if(!hh)return;hh.style.color='';hh.classList.remove('warn');hh.style.removeProperty('font-size');hh.style.whiteSpace='';if(cc)cc.querySelectorAll('.cell.need').forEach(x=>x.classList.remove('need'));if(!p||!(c.n||'').trim())return;const e=ev(c,p),m=[];if(!(e.dft>0))m.push('dft');if(!(e.svr>0))m.push('svr');const mk=k=>{const inp=cc&&cc.querySelector('[data-k='+k+']'),cl=inp&&inp.closest('.cell');if(cl)cl.classList.add('need')};if(!(+c.price>0))mk('price');if(e.tr>0&&!(+c.tprice>0))mk('tprice');if(m.length){hh.classList.add('warn');hh.textContent='⚠ '+m.map(k=>k=='dft'?'DFT(추천도막)':'SVR').join(' · ')+' 값이 없어 계산되지 않습니다 — 아래 소요량 및 조건에 입력하세요';hh.style.color='#c9252f';m.forEach(mk);pqFitW(hh)}})}catch(x){}}}
function uni(r){const gs=[...r.querySelectorAll('.xlc,.xrc')];if(!gs.length)return;const m=Math.min(...gs.map(g=>parseFloat(getComputedStyle(g).fontSize)));gs.forEach(g=>g.style.fontSize=m+'px')}
var RP=[];
const lcard=(i,o,c,a,t,Ac,u,e)=>{const blk=(x,un)=>`<div class=xlb><div class=xlt>소요량</div><div class=xlv><div>이론 : ${F(x.th)}${un}/㎡</div><div>실제 : ${F(x.ac)}${un}/㎡</div></div><div class=xlt>단가</div><div class=xlv><div>${un}단가 : ${F(x.u)}원</div><div>㎡단가 : ${F(x.amt,0)}원/㎡</div></div></div>`;
return `<div class=xlc style="${cvars(i)}"><div class=xlh><b class=xln>${o} · ${esc(c.n)}</b>${+c.price>0?`<b class=xlp>단가 : ${F(+c.price,0)}원/말</b>`:''}<span class=xlg>${Ac>0?'기준 면적 : '+F(Ac)+'㎡':'면적 미입력'}</span><span class=xlg style="margin-left:0">로스율 : ${F(e.loss)}%</span></div>${blk(a,u)}${t?`<div class=xlh><b class=xln>전용 희석제 · ${esc(t.nm.replace(/^└ 전용 희석제: /,''))}</b>${+c.tprice>0?`<b class=xlp>단가 : ${F(+c.tprice,0)}원/말</b>`:''}<span class=xlg>희석율 : ${F(e.tr)}%</span></div>${blk(t,'L')}`:''}</div>`};
const f10=x=>Math.floor((+x||0)/10+1e-9)*10;
const xb=(i,L,R)=>R.slice(0,-6)+`<details class=xld ${window.XDO&&window.XDO[i]===false?'':'open'} ontoggle="(window.XDO=window.XDO||{})[${i}]=this.open;if(this.open){const x=this.closest('.xrc');if(x)fit(x.parentNode)}"><summary>산출 세부 내역</summary>${L}</details></div>`;
const ptabs=PT=>{if(!PT.length)return '';const am=x=>x>0?F(x,0)+'원':'-',sp=r=>`style="${cvars(r.i)}"`,
row=(r,nm,q,k,un,a)=>`<div class=pw2 ${sp(r)}><div class=pnm><i>${r.o}</i>${esc(nm)}</div><div class=pqa><span class=pqq>${r.Ac>0?F(q)+un+' · '+k+'말':'-'}</span><b>${am(a)}</b></div></div>`,
D=PT.filter(r=>r.tn),
pL=PT.map(r=>row(r,r.nm,r.q,r.k,r.u,r.pa)).join(''),
pR=D.length?D.map(r=>row(r,r.tn,r.tq,r.tk,'L',r.da)).join(''):'<div class=pw2><div class=pqq>전용 희석제 없음</div></div>',
sL=PT.reduce((a,r)=>a+r.pa,0),sR=PT.reduce((a,r)=>a+r.da,0),
us=[...new Set(PT.map(r=>r.u))],qL=us.length==1?F(PT.reduce((a,r)=>a+r.q,0))+us[0]:'',qR=D.length?F(D.reduce((a,r)=>a+r.tq,0))+'L':'';
return `<div class=ptw><div class=pcol><div class=pch>제품</div><div class=pcs>수량 · 합계금액</div>${pL}<div class=pst><span>소계${qL?' <small>'+qL+'</small>':''}</span><b>${am(sL)}</b></div></div><div class=pcol><div class=pch>전용 희석제</div><div class=pcs>필요수량 · 합계금액</div>${pR}<div class=pst><span>소계${qR?' <small>'+qR+'</small>':''}</span><b>${am(sR)}</b></div></div></div>`};
const rcard=(o,Ac,a,t,ct,cc,u,i)=>{const q=(x,un)=>{const w=x.ac*Ac;return F(w)+un+' → '+Math.ceil(w/x.pk-1e-9)+'말'};
return `<div class=xrc style="${cvars(i)}"><div class=xrh>${o} 자재 예상 수량 · 자재비${Ac>0?'['+F(Ac)+'㎡ 기준]':''}</div><div class=xrg><div class=xrbx><b>필요수량</b>${Ac>0?`<div>제품[${F(a.pk)}${u}] : <em>${q(a,u)}</em></div>${t?`<div>희석제[${F(t.pk)}L] : <em>${q(t,'L')}</em></div>`:''}`:'<div>면적 입력 시 표시</div>'}</div><div class=xrbx><b>총 자재비</b><div>${u} 총 금액 : <em>${Ac>0?F(ct,0)+'원':'-'}</em></div><div>말 환산 금액 : <em>${Ac>0?F(cc,0)+'원':'-'}</em></div></div></div></div>`};
const totc=(Ac,a,t,s,cc,nq)=>`<div class=tot><div class=tth>필요 수량 · 자재비${Ac>0?' ('+F(Ac)+'㎡ 기준)':''}</div><div class=tg><div class="ti w"><span class=k>필요 수량</span>${Ac>0?`<b>제품 ${nq(a)}</b>`+(t?`<b>희석제 ${nq(t)}</b>`:''):'<b>면적 입력 시 표시</b>'}</div><div class=ti><span class=k>총 자재비</span><b class=cv>${Ac>0?F(s*Ac,0)+'원':'-'}</b></div><div class=ti><span class=k>캔 환산 금액</span><b class=cv>${Ac>0?F(cc,0)+'원':'-'}</b></div></div></div>`;
const pm=x=>+x>0?` <small class=cv>· 말당 ${F(+x,0)}원</small>`:'';
function vib(p){const a=Array.isArray(p)?p:[p||30];try{if(navigator.vibrate&&navigator.vibrate(a))return}catch(e){}try{let l=$('#hpt');if(!l){l=document.createElement('label');l.id='hpt';l.style.cssText='position:fixed;left:-99px;top:0;width:1px;height:1px;opacity:0;pointer-events:none';l.innerHTML='<input type=checkbox switch tabindex=-1>';document.body.append(l)}for(let i=0;i<Math.ceil(a.length/2);i++)setTimeout(()=>l.click(),i*90)}catch(e){}}
function hh(){document.documentElement.style.setProperty('--hh',(($('.hd')||{}).offsetHeight||56)+'px')}addEventListener('resize',hh);
const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function rfit(){}
function rptHTML(){const r=$('#rs');if(!r||!r.querySelector('.xpr'))return '';const c=r.cloneNode(true);c.querySelectorAll('button').forEach(x=>x.remove());c.querySelectorAll('.gl,#cgl,#hgl,#dgl').forEach(x=>x.remove());c.querySelectorAll('.xfd>summary').forEach(x=>x.textContent='산출 공식 · 경고 안내');c.querySelectorAll('details').forEach(d=>d.setAttribute('open',''));return `<div class="a4 sc"><div class=rt0><b>일위대가표</b><span>${new Date().toLocaleDateString('ko-KR')}${' · 기본면적 '+F(+S.area||1)+'㎡'}</span></div><div class=rbody>${c.innerHTML}</div></div>`}
function rpt(){if(!S.coats.some(c=>calc(c)||(c&&String(c.n||'').trim())))return tt('출력할 결과가 없습니다<br>제품을 선택하고 값을 입력하세요');window.ESRP=1;window.ESFROM=1;est();esPv()}
const ldp=()=>window.html2canvas?Promise.resolve():libSrc('lib/html2canvas.min.js','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js').then(u=>new Promise((o,e)=>libTag(u,o,e)));
const ESL=['견적일자','수 신','현장명','공사명','유효기간','결제조건'];
function esS(){S.es=S.es||{};const E=S.es;E.l=E.l||[...ESL];E.v=E.v||[];E.o=E.o||{};E.x=E.x||[];E.nt=E.nt||'';return E}
function rdHTML(){
 const A0=+S.area||1,cs=S.coats.map((c,i)=>({c,i,r:calc(c)})).filter(x=>x.r),lab=syLabsOld(cs.length);
 if(!cs.length)return '<div class="rdw"><div class="rdn">제품을 선택하고 값을 입력하면 세부 내역이 표시됩니다</div></div>';
 let sp='',dt='',sum=0;
 cs.forEach((x,j)=>{const c=x.c,p=PC(c.n)||{},e=ev(c,p),a=x.r[0],t=x.r[1],u=UN(p),uu=u=='kg'?'kg':'L',Ac=+c.area||A0,q=a.ac*Ac,tq=t?t.ac*Ac:0;
  sp+=`<div class="rdr sx"><span>${x.i+1}${lab[j]?' '+lab[j]:''}</span><span class="l">${esc(p.n)}${p.mf?`<em>${esc(p.mf)}</em>`:''}</span><span>${Ac>0?F(Ac):'-'}</span><span>${e.dft?F(e.dft):'-'}</span><span>${e.svr?F(e.svr):'-'}</span><span>${+p.sg?F(+p.sg):'-'}</span><span class="qq">${Ac>0?F(q):'-'}</span></div>${t?`<div class="rdr sx tnr"><span>└</span><span class="l">${esc(tnClean(p.tn||'희석제'))}</span><span>-</span><span>-</span><span>-</span><span>-</span><span class="qq">${Ac>0?F(tq):'-'}</span></div>`:''}`;
  const row=(nm,sub,spec,qty,pr,gs,ar)=>{const am=Math.round((+qty||0)*(+pr||0));sum+=am;return `<div class="rdr dt${gs?' gs':''}${/^└/.test(nm)?' tn':''}"><span class="l"><b>${nm}</b>${sub?`<small>${sub}</small>`:''}</span><span>${ar>0?F(ar):'-'}</span><span>${spec}</span><span>${F(qty,0)}</span><span>${pr?F(+pr,0):'-'}</span><span class="am">${F(am,0)}</span></div>`};
  dt+=row(od(x.i+1)+' · '+esc(p.n),'','1말 ('+F(a.pk)+u+')',Ac>0?Math.ceil(a.ac*Ac/a.pk-1e-9):0,+c.price||0,1,Ac);
  if(t)dt+=row('└ '+esc(tnClean(p.tn||'희석제')),'','1캔 ('+F(t.pk)+'L)',Ac>0?Math.ceil(t.ac*Ac/t.pk-1e-9):0,+c.tprice||0,0)});
 (window.subRows?subRows():[]).forEach(r=>{const am=Math.round(r.q*r.p);sum+=am;dt+=`<div class="rdr dt gs"><span class="l"><b>${esc(r.n)}</b>${r.m?`<small>${esc(r.m)}</small>`:''}</span><span>-</span><span>${esc(r.s)}</span><span>${F(r.q,r.u=='㎡'?2:0)}</span><span>${r.p?F(+r.p,0):'-'}</span><span class="am">${F(am,0)}</span></div>`});const vat=Math.round(sum*.1);
 return `<div class="rdw"><div class="rdh tsp">도장 시스템 및 제품 사양</div><div class="rdt tsp"><div class="rdr sx h"><span>구분</span><span>제품 · 제조사</span><span>면적<br>(㎡)</span><span>DFT<br>(㎛)</span><span>SVR<br>(%)</span><span>비중</span><span>산출물량<br>(L·kg)</span></div>${sp}</div>
<div class="rdh tdt">견적 세부 내역 <small>캔 구매 기준</small></div><div class="rdt tdt"><div class="rdr dt h"><span>품명</span><span>면적<br>(㎡)</span><span>규격</span><span>수량</span><span>단가</span><span>금액</span></div>${dt}</div>
<div class="rdsum"><div><span>공급가액</span><b>${F(sum,0)}</b></div><div><span>VAT (10%)</span><b>${F(vat,0)}</b></div><div class="tt"><span>합계 (VAT 포함)</span><b>${F(sum+vat,0)}원</b></div></div></div>`}

const esSf=(fn,fb)=>{try{return fn()}catch(x){window.ESERR=(x&&x.message)||String(x);return fb}};
function tnClean(s){let t=String(s==null?'':s).replace(/\s*\n\s*/g,' ');
 t=t.replace(/\s*[(（][^)）]*(?:추천|권장)?\s*희석[^)）]*[)）]/g,'').replace(/\s*[(（][^)）]*\d\s*%[^)）]*[)）]/g,'').replace(/\s*[,:·\/\-]?\s*(?:추천|권장)\s*희석(?:율|비율|률)?[^]*$/,'').replace(/\s+/g,' ').trim();
 return t||'희석제'}
function esSyn(c){const p=esSf(()=>PX(c.n),null)||{},pk=+p.mk||+p.pk||18;return [{nm:c.n||'제품명 입력',use:'',th:0,ac:0,a1:null,u:(+c.price||0)/pk,amt:0,pk,nc:1}]}
function esGroups(){return esSf(esGroups0,[])}
function esGroups0(){const E=esS(),G=[];
 if(E.pq!==0){const cs=S.coats.map((c,i)=>({c,i,r:esSf(()=>calc(c),null)||(c&&String(c.n||'').trim()?esSyn(c):null)})).filter(x=>x.r&&!(E.hid&&E.hid['c'+x.i])),lab=syLabsOld(cs.length);G.push({k:'c',kt:'t',tag:'PQC',lab:S.lab||{},A:+S.area||1,L:cs.map((x,j)=>({...x,lab:lab[j]||'',ord:od(x.i+1)}))})}
 if(E.sy){const lb=syLb(),gs=syGr(),sel=(Array.isArray(E.syg)&&E.syg.length?E.syg:gs.map((g,k)=>k)).filter(k=>gs[k]);
  sel.forEach(k=>{const gr=gs[k],L=gr.idx.map(i=>{const c=SY.layers[i];if(!c)return null;const r=esSf(()=>calc(c),null);return r?{c,i,r}:{c:String(c.n||'').trim()?c:Object.assign({},c,{n:'제품명 입력'}),i,r:esSyn(c)}}).filter(x=>x&&x.r&&!(E.hid&&E.hid['s'+x.i]));
   if(L.length)G.push({k:'s',kt:'y',tag:'SYS',lab:SY.groups[k]||{},sn:gr.name,A:+((SY.groups[k]||{}).area)||+SY.area||1,L:L.map(x=>({...x,lab:lb[x.i]||'',ord:lb[x.i]||od(x.i+1)}))})})}
 return G}
function esRows(){return esSf(esRows0,[])}
function esRows0(){const R=[];esGroups().forEach((g,gi)=>{g.L.forEach(x=>{try{const p=P(x.c.n),Ac=+x.c.area||g.A,a=x.r[0],t=x.r[1],u=UN(p);
 R.push({k:g.k+x.i,g:g.k+x.i,sn:g.sn||'',n:(g.k=='s'?x.ord:od(x.i+1))+' · '+x.c.n,s:'1말 ('+F(a.pk)+u+')',pk:a.pk,un:u,q:a.nc?'':(Ac>0?Math.ceil(a.ac*Ac/a.pk-1e-9):0),p:+x.c.price||0,m:'',ar:Ac>0?Ac:'',nc:a.nc?1:0});
 if(t)R.push({k:g.kt+x.i,g:g.k+x.i,n:'└ '+tnClean(p.tn||'희석제'),s:'1캔 ('+F(t.pk)+'L)',pk:t.pk,un:'L',q:Ac>0?Math.ceil(t.ac*Ac/t.pk-1e-9):0,p:+x.c.tprice||0,m:''});
}catch(er){window.ESERR=(er&&er.message)||String(er);R.push({k:g.k+x.i,g:g.k+x.i,sn:g.sn||'',n:(g.k=='s'?x.ord:od(x.i+1))+' · '+(x.c&&x.c.n||'제품명 입력'),s:'수량·단가 직접 입력',q:'',p:+(x.c&&x.c.price)||0,m:'',nc:1})}});
 const LB=lbCalc(g.lab,g.A);if(LB){const d2=v=>+v.toFixed(2),gk='L'+g.k+gi,ps=(g.lab||{}).ps,px=w=>LB.B?'':' · 투입량 '+(+w.toFixed(4))+'인/㎡'+(ps?' · '+ps.s+(ps.v?'':'(검증 전)'):'');
  if(LB.qp>0)R.push({k:'lp'+gk,g:gk,sn:'',n:'노무비 · 도장공',s:'인',q:d2(LB.qp),p:LB.s.rp,m:(g.sn||'전체')+(LB.m>1?' · 할증 '+LB.s.sc+'%':'')+px(LB.pp),dec:1});
  if(LB.qn>0)R.push({k:'ln'+gk,g:gk,sn:'',n:'노무비 · 보통인부',s:'인',q:d2(LB.qn),p:LB.s.rn,m:(g.sn||'전체')+px(LB.pn),dec:1});
  if(LB.tool>0)R.push({k:'lt'+gk,g:gk,sn:'',n:'공구손료 ('+LB.s.tl+'%)',s:'식',q:1,p:LB.tool,m:''})}});if(esS().pq!==0)(window.subRows?subRows():[]).forEach(r=>R.push({k:'b'+r.k,g:'b'+r.k,sn:'',n:r.n,s:r.s,q:r.q,p:r.p,m:r.m}));return R}
const esToday=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
function esAutoNo(){const E=esS(),d=new Date(),ym=String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,'0');S.qs=S.qs||{};E.no='CC-'+ym+'-'+String((S.qs[ym]||0)+1).padStart(4,'0')}
function esIssue(){const E=esS(),m=/^(?:PQC|CC)-(\d{4})-(\d{4})$/.exec(String(E.no||'').trim());if(!m)return;S.qs=S.qs||{};if((S.qs[m[1]]||0)<+m[2]){S.qs[m[1]]=+m[2];sv()}}
function esDef(){const E=esS();if(!E.v[0])E.v[0]=esToday();if(!E.no)esAutoNo();sv()}
function esGo(k){const E=esS();if(k=='sy')E.syg=null;E.hid=E.hid||{};Object.keys(E.hid).forEach(x=>{if(x[0]==(k=='sy'?'s':'c'))delete E.hid[x]});if(k=='sy')E.sy=1;else E.pq=1;sv();const e=$('#es');if(e)e.remove();window.ESRP=0;T(k=='sy'?3:0)}
function esHide(g){const E=esS();E.hid=E.hid||{};E.hid[g]=1;sv();tt('견적에서 뺐습니다<br><small>도장S / 일위대가표 버튼으로 다시 가져올 수 있습니다</small>');esFre()}
function esHTML(){return esSf(esHTML0,'<div class="esh epd ekf"><div class="eph"><div class="epk">견 적 서</div></div><div class="epn"><b>안내</b><div>견적서를 표시하지 못했습니다. 도장 시스템/일위대가표의 제품 입력을 확인해 주세요.</div></div></div>')}
function esHTML0(){
 const E=esS(),R=esRows(),V=E.v,SP=E.sp||{},fm=v=>/^\d+(\.\d+)?$/.test(String(v))?(String(v).includes('.')?F(+v,2):F(+v,0)):v;
 const row=(l,v,sf)=>`<div class="epr"><span>${l}</span><b>${esc(v)||''}${v&&sf?'<i>'+sf+'</i>':''}</b></div>`;
 const m=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(V[0]||''),dt=m?`${m[1]} 년 ${+m[2]} 월 ${+m[3]} 일`:(V[0]||'');
 const head=`<div class="ekh"><div class="ekl">${row('수신',V[1],'귀하')}${row('현장명',V[3])}${row('견적날짜',dt)}${row('유효기간',V[4])}</div><div class="ekr2"><div class="ekg">공급자</div><div class="ekb">${row('상호명',SP.n)}${row('주소',SP.a)}${row('담당자',SP.m)}${row('연락처',SP.c)}</div></div></div>`;
 const cell=(r,i)=>{const o=E.o[r.k]||{},q=fm(o.q!==undefined?o.q:r.q),pr=fm(o.p!==undefined?o.p:r.p);const sz=r.pk?F(r.pk):(r.s||'-'),un=r.pk?r.un:'';
  return `<div class="ekr ei" data-k="${r.k}" data-pk="${r.pk||0}"><div>${i}</div><div class="l">${esc(r.n)}</div><div>${esc(sz)}</div><div>${esc(un)}</div><div><input class="r" data-f="p" inputmode="decimal" value="${esc(pr||'')}" oninput="esO('${r.k}','p',this.value)"></div><div class="up"></div><div><input class="r" data-f="q" inputmode="decimal" value="${esc(q)}" oninput="esO('${r.k}','q',this.value)"></div><div class="am"></div><div class="l bg">${esc(r.m||'')}</div></div>`};
 let no=0;let rows=R.map(r=>cell(r,++no)).join('');
 rows+=E.x.map((x,j)=>{no++;return `<div class="ekr ei" data-k="x${j}" data-pk="0"><div>${no}</div><div class="l"><input value="${esc(x.n)}" placeholder="품명" oninput="esX(${j},'n',this.value)"></div><div><input value="${esc(x.s)}" placeholder="규격" oninput="esX(${j},'s',this.value)"></div><div></div><div><input class="r" data-f="p" inputmode="decimal" value="${esc(fm(x.p))}" oninput="esX(${j},'p',this.value)"></div><div class="up"></div><div><input class="r" data-f="q" inputmode="decimal" value="${esc(fm(x.q))}" oninput="esX(${j},'q',this.value)"></div><div class="am"></div><div></div></div>`}).join('');
 for(let k=no;k<26;k++)rows+='<div class="ekr em"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
 return `<div class="esh epd ekf"><div class="eph"><div class="epk">견 적 서</div></div>${head}
<div class="ept tdt">견적 세부 내용</div>
<div class="ekt"><div class="ekr h"><div>No</div><div>품명</div><div>규격</div><div>단위</div><div>규격단가</div><div>단위단가</div><div>기준수량</div><div>금액</div><div>비고</div></div>${rows}<div class="ekr ek9"><div class="trw tt"><span>합 계</span><b id="esT0"></b><small>부가가치세 별도</small></div></div></div>
<div class="eptot ekn"><div class="trw"><span>공급가액</span><b id="esS"></b></div><div class="trw"><span>VAT (10%)</span><b id="esV"></b></div><div class="trw tt"><span>총 합계</span><b id="esT"></b></div></div>
<div class="epn ekm"><b>안내사항</b><div>${E.nt?esc(E.nt).replace(/\n/g,'<br>'):'· 상기 금액은 부가가치세 별도 금액입니다.<br>· 시공 면적·현장 여건에 따라 수량과 금액은 변동될 수 있습니다.<br>· 견적 유효기간 이후에는 단가가 변경될 수 있습니다.'}</div></div>
<div class="ekf2">상기와 같이 견적서를 제출합니다.</div></div>`}
function esHTMLD(){return esSf(esHTMLD0,'<div class="esh epd land"><div class="eph"><div class="epk">일 위 대 가 표</div></div><div class="epn"><b>안내</b><div>일위대가표를 표시하지 못했습니다.</div></div></div>')}
function esHTMLD0(){
 const E=esS(),R=esRows(),V=E.v,SP=E.sp||{},fm=v=>/^\d+(\.\d+)?$/.test(String(v))?(String(v).includes('.')?F(+v,2):F(+v,0)):v;
 const row=(l,v)=>`<div class="epr"><span>${l}</span><b>${esc(v)||'-'}</b></div>`;
 const info=`<div class="epi2"><div class="epc"><div class="epct">공급<br>받는자</div><div class="epb">${row('수신',V[1])}${row('현장/공사명',V[3])}${row('견적일자',V[0])}${row('견적번호',qtLabel(E))}${row('유효기간',V[4])}${row('결제조건',V[5])}</div></div><div class="epc"><div class="epct">공급자</div><div class="epb">${row('상호',SP.n)}${row('대표자',SP.r)}${row('담당자',SP.m)}${row('연락처',SP.c)}${row('주소',SP.a)}</div></div></div>`;
 const sp=esGroups().map(g=>(g.sn?`<div class="eptr sgh"><span>${esc(g.sn)}</span></div>`:'')+g.L.map(x=>{const p=P(x.c.n)||{},e=ev(x.c,p),a=x.r[0],t=x.r[1],u=UN(p),Ac=+x.c.area||g.A,q=a.ac*Ac,tq=t?t.ac*Ac:0,uu=u=='kg'?'kg':'L';
  const sm=a.amt,pu=(+x.c.price||0)>0,tpu=(+x.c.tprice||0)>0,tn=tnClean(p.tn||'희석제');
  return `<div class="eptr"><span>${g.k=='s'?'S':''}${g.k=='s'?syK(x.i)+1:x.i+1}차${x.lab?`<small>${esc(x.lab)}</small>`:''}</span><span class="l">${esc(x.c.n)}${p.mf?`<em>${esc(p.mf)}</em>`:''}</span><span>${Ac>0?F(Ac):'-'}</span><span>${e.dft?F(e.dft):'-'}</span><span>-</span><span class="th">${a.nc?'-':F(a.th)}</span><span class="th ac">${a.nc?'-':F(a.ac)}</span><span class="th pr">${pu&&!a.nc?F(sm,0):'-'}</span><span class="qq">${Ac>0&&!a.nc?F(q)+' '+uu:'-'}</span></div>${t?`<div class="eptr tnr"><span>└</span><span class="l">${esc(tn)}</span><span>-</span><span>-</span><span>${+e.tr>0?F(+(+e.tr).toFixed(1)):'-'}</span><span class="th">${F(t.th,3)}</span><span class="th ac">${F(t.ac,3)}</span><span class="th pr">${tpu?F(t.amt,0):'-'}</span><span class="qq">${Ac>0?F(tq)+' L':'-'}</span></div>`:''}`}).join('')).join('');
 let no=0,prev=null,psn=null;
 const ar=R.map(r=>{no++;const sh=(r.sn&&r.sn!==psn)?`<div class="etr sgh"><div class="l"><b>${esc(r.sn)}</b></div></div>`:'';psn=r.sn||psn;const o=E.o[r.k]||{},q=fm(o.q!==undefined?o.q:r.q),pr=fm(o.p!==undefined?o.p:r.p),gs=r.g!==prev;prev=r.g;return sh+`<div class="ei etr${gs?' gs':''}${/^└/.test(r.n)?' tn':''}" data-k="${r.k}"><div class="l"><b>${esc(r.n)}</b>${r.m?`<small>${esc(r.m)}</small>`:''}</div><div class="ea">${r.ar?fm(r.ar):'-'}</div><div>${esc(r.s)}</div><div><input class="r" data-f="q" inputmode="decimal" value="${esc(q)}" oninput="esO('${r.k}','q',this.value)"></div><div><input class="r" data-f="p" inputmode="decimal" value="${esc(pr||'')}" oninput="esO('${r.k}','p',this.value)"></div><div class="am"></div></div>`}).join('');
 const xr=E.x.map((x,j)=>{no++;return `<div class="ei etr gs" data-k="x${j}"><div class="l"><input value="${esc(x.n)}" placeholder="품명" oninput="esX(${j},'n',this.value)"></div><div class="ea"></div><div><input value="${esc(x.s)}" placeholder="규격" oninput="esX(${j},'s',this.value)"></div><div><input class="r" data-f="q" inputmode="decimal" value="${esc(fm(x.q))}" oninput="esX(${j},'q',this.value)"></div><div><input class="r" data-f="p" inputmode="decimal" value="${esc(fm(x.p))}" oninput="esX(${j},'p',this.value)"></div><div class="am"></div></div>`}).join('');
 return `<div class="esh epd land"><div class="eph"><div class="epk">일 위 대 가 표</div>${S.ttl?`<div class="ettl">${esc(S.ttl)}</div>`:''}</div>
${info}
<div class="ept tsp">도장 시스템 및 제품 사양</div>
<div class="etb tsp"><div class="eptr h"><span>구분</span><span>제품 · 제조사</span><span>적용<br>면적(㎡)</span><span>DFT<br>(㎛)</span><span>희석율<br>(%)</span><span>이론<br>(L·kg/㎡)</span><span>실제<br>(L·kg/㎡)</span><span>㎡당단가<br>(원/㎡)</span><span>산출물량</span></div>${sp||'<div class="eptr none">일위대가표에 제품을 입력하면 자동 반영됩니다</div>'}</div>
<div class="ept tdt">견적 세부 내역</div>
<div class="etb tdt"><div class="etr h"><div>품명</div><div>면적<br>(㎡)</div><div>규격</div><div>수량</div><div>단가(원)</div><div>금액(원)</div></div>${ar+xr||'<div class="etr none"><div>견적 항목이 없습니다</div></div>'}</div>
<div class="eptot"><div class="trw"><span>공급가액</span><b id="esS"></b></div><div class="trw"><span>VAT (10%)</span><b id="esV"></b></div><div class="trw tt"><span>총 합계</span><b id="esT"></b></div></div>
${E.nt?`<div class="epn"><b>비 고</b><div>${esc(E.nt)}</div></div>`:''}</div>`}
function esH(t,i,v){const E=esS();if(t=='nt')E.nt=v;else E[t][i]=v;sv()}
function esO(k,f,v){const E=esS();(E.o[k]=E.o[k]||{})[f]=v;sv();esSum()}
function esX(j,f,v){const E=esS();if(E.x[j])E.x[j][f]=v;sv();esSum()}
function esAdd(){esS().x.push({n:'',s:'',q:'1',p:''});sv();esRe()}
function esDel(j){esS().x.splice(j,1);sv();esRe()}
function esSum(){const R=$('#es');if(!R)return;const g=e=>parseFloat(String(e.value).replace(/,/g,''))||0;let s=0;R.querySelectorAll('.ei[data-k]').forEach(tr=>{const q=g(tr.querySelector('input[data-f=q]')),p=g(tr.querySelector('input[data-f=p]')),a=Math.round(q*p);s+=a;tr.querySelector('.am').textContent=F(a,0);const u=tr.querySelector('.up'),pk=+tr.dataset.pk||0;if(u)u.textContent=pk>0&&p?F(Math.round(p/pk),0):''});const v=Math.round(s*.1);$('#esS').textContent=F(s,0);$('#esV').textContent=F(v,0);$('#esT').textContent=F(s+v,0);const t0=R.querySelector('#esT0');if(t0)t0.textContent=F(s,0)}
function esDW(el){return el&&el.classList&&el.classList.contains('land')?1123:794}
function esZoomSet(el,w){if(!el||!el.style)return;const f=Math.min(1,(innerWidth-16)/(w||esDW(el)));el.style.zoom=f*(window.ESZ||1)}
function esZ(d){const z=d===0?1:Math.max(.5,Math.min(3,+(((window.ESZ||1)+d).toFixed(2))));window.ESZ=z;const w=$('#es .rpw');if(w&&w.firstChild)esZoomSet(w.firstChild);const q=$('#qv .qvp .esh');if(q)esZoomSet(q);document.querySelectorAll('.zpc').forEach(b=>b.textContent=Math.round(z*100)+'%')}
function esPinch(w){if(!w||w._pz)return;w._pz=1;let d0=0,z0=1;w.addEventListener('touchstart',e=>{if(e.touches.length==2){d0=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);z0=window.ESZ||1}},{passive:true});w.addEventListener('touchmove',e=>{if(e.touches.length==2&&d0){e.preventDefault();const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);window.ESZ=Math.max(.5,Math.min(3,+(z0*d/d0).toFixed(2)));esZ(0.0001)}},{passive:false});w.addEventListener('touchend',e=>{if(e.touches.length<2)d0=0},{passive:true})}
function esRe(){const w=$('#es .rpw');if(!w)return;w.innerHTML=window.ESRP?esHTMLD():esHTML();esZoomSet(w.firstChild);esSf(esSum,0);esSf(esFsum,0)}
function rcFit(){document.querySelectorAll('#rs .rcs b').forEach(b=>{const n=b.textContent.length;b.style.fontSize=n>20?'10px':n>16?'11px':n>13?'12px':n>10?'13.5px':''})}
function ccTg(i,el,ev){return;if(ev&&ev.target.closest&&ev.target.closest('label,input'))return;const cd=el.closest('.ccard');if(!cd)return;const m=cd.classList.toggle('cmin');if(S.coats[i])S.coats[i].cm=m?1:0;sv()}
function esReset(){ask('견적서에 입력한 내용을 모두 지울까요?<br><small>수량·단가 수정, 추가 항목, 공급자·수신 입력칸이 초기화됩니다</small>',()=>{S.es={};window.ESED=undefined;esDef();sv();esFre();esRe();tt('견적서를 초기화했습니다')})}
const QS=p=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>',QI={pen:QS('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),del:QS('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>'),cal:QS('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),prn:QS('<path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M7 14h10v6H7z"/>'),rf:QS('<path d="M20 11a8 8 0 0 0-14-4.5L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4.5L20 15M20 20v-5h-5"/>'),plus:QS('<path d="M12 5v14M5 12h14"/>')};
function est(){esDef();let e=$('#es');if(e)e.remove();e=document.createElement('div');e.id='es';const hb=((document.querySelector('.hbg')||{}).src)||'';
e.innerHTML=`<div class="zh" ${hb?`style="--hb:url('${hb}')"`:''}><button class="zbk" onclick="$('#es').remove()" aria-label="닫기">${QS('<path d="M15 5l-7 7 7 7"/>')}</button><div class="zhl">COAT<i>ON</i></div><span class="zhi">${PQI.quote}</span><div class="zht"><small>Quotation</small><b>견적서</b></div><p>페인트 도장 견적 정보를 입력하고<br>견적서를 생성할 수 있습니다.</p></div><div class="zf"></div><div class="zbar"><button onclick="sv();tt('저장했습니다')">${PQI.quote}<span>저장</span></button><button onclick="esPv()">${QI.prn}<span>미리보기</span></button><button class="ok" id="esb" onclick="esShare()">${PQI.tds}<span>견적서 생성</span></button><button onclick="esReset()">${QI.rf}<span>초기화</span></button></div><div class="rpw" hidden></div>`;
document.body.append(e);esFre()}
function esNav(){const g=document.getElementById('gnav');if(!g)return '';return g.outerHTML.replace(/id="?gnav"?/,'id="esnav"').replace(/onclick="/g,'onclick="$(\'#es\').remove();').replace(/ on(?=[" ])/g,'')}
function esEd(v){window.ESED=!!v;esFre()}
function esFre(){const f=$('#es .zf');if(!f)return;window.ESERR='';f.innerHTML=esForm();esRe();if(window.ESERR&&!f.querySelector('.zesr')){const d=document.createElement('div');d.className='zesr';d.style.cssText='margin:8px 12px;padding:8px 10px;border:1px solid #fdba74;background:#fff7ed;color:#9a3412;border-radius:10px;font-size:12px;line-height:1.45';d.innerHTML='일부 항목은 계산하지 못해 <b>수량·단가 직접 입력</b>으로 표시했습니다.<br><small>'+esc(window.ESERR)+'</small>';f.prepend(d)}}
function esQ(i,v){esH('v',i,v);esRe()}
function esNo(v){esS().no=v;sv();if($('#es'))esRe()}
function esSp(k,v){const E=esS();E.sp=E.sp||{};E.sp[k]=v;sv();esRe()}
function esFo(k,f,v){const E=esS();(E.o[k]=E.o[k]||{})[f]=v;sv();esRe()}
function esFx(j,f,v){const E=esS();if(E.x[j])E.x[j][f]=v;sv();esRe()}
function esTab(k){window.ESRP=k=='d'?1:0;window.ESZ=1;esRe();const t=$('#es .qpvt');if(t)t.innerHTML=(window.ESRP?'일위대가표 미리보기 (가로 A4)':'견적서 미리보기 (세로 A4)')+' <small style="opacity:.7;font-size:10px">'+(window.COATON_BUILD||'')+'</small>';document.querySelectorAll('#es .estb button').forEach(b=>b.classList.toggle('on',b.dataset.k==k));document.querySelectorAll('.zpc').forEach(b=>b.textContent='100%')}
function esPv(){const w=$('#es .rpw');if(!w)return;if(!window.ESFROM)window.ESRP=0;window.ESZ=1;esRe();w.hidden=false;w.classList.add('pv');const E=$('#es');E.classList.add('pvm');
 const t=document.createElement('div');t.className='qpvt';t.textContent=window.ESRP?'일위대가표 미리보기 (가로 A4)':'견적서 미리보기 (세로 A4)';t.innerHTML+=' <small style="opacity:.7;font-size:10px">'+(window.COATON_BUILD||'')+'</small>';E.append(t);const tb=document.createElement('div');tb.className='estb';tb.innerHTML='<button data-k="d" class="'+(window.ESRP?'on':'')+'" onclick="esTab(\'d\')">일위대가표 · 가로</button><button data-k="f" class="'+(window.ESRP?'':'on')+'" onclick="esTab(\'f\')">견적서 · 세로</button>';E.append(tb);
 const b=document.createElement('button');b.className='qpvc';b.textContent='닫기';b.onclick=esPvX;E.append(b);
 const zb=document.createElement('div');zb.className='zbx zbp';zb.innerHTML='<button onclick="esZ(-.25)">−</button><span class="zpc">'+Math.round((window.ESZ||1)*100)+'%</span><button onclick="esZ(.25)">＋</button><button onclick="esZ(0)">맞춤</button>';E.append(zb);esPinch(w);
 const bar=document.createElement('div');bar.className='qpvb';bar.innerHTML='<button onclick="esPdf()">PDF 저장</button><button onclick="esPrint()">인쇄</button><button class="rs" onclick="esReset()">초기화</button><button class="ok" onclick="esShare()">공유</button>';E.append(bar)}
function esPvX(){const w=$('#es .rpw');if(w){w.hidden=true;w.classList.remove('pv')}const E0=$('#es');if(E0)E0.classList.remove('pvm');['.qpvc','.qpvt','.qpvb','.zbx','.estb'].forEach(q=>{const b=$('#es '+q);if(b)b.remove()});if(window.ESFROM){window.ESFROM=0;window.ESRP=0;const e=$('#es');if(e)e.remove();return}window.ESRP=0;esFre()}
function esFsum(){const R=$('#es');if(!R||!R.querySelector('.zf'))return;R.querySelectorAll('.zit[data-k]').forEach(q=>{const d=R.querySelector('.rpw .ei[data-k="'+q.dataset.k+'"] .am'),o=q.querySelector('.zam');if(d&&o)o.textContent=d.textContent});[['fS','esS'],['fV','esV'],['fT','esT']].forEach(([a,b])=>{const x=R.querySelector('#'+a),y=R.querySelector('.rpw #'+b);if(x&&y)x.textContent=y.textContent})}
function esOR(k){const E=esS();delete E.o[k];sv();tt('수정한 수량·단가를 초기화했습니다');esFre()}
function esForm(){return esSf(esForm0,'<div class="zc"><div class="zem" style="color:#b45309">견적서 입력 화면을 만들지 못했습니다.<br>하단 ‘초기화’ 후 다시 도장S / 일위대가표를 불러와 주세요.'+(window.ESERR?'<br><small>('+esc(window.ESERR)+')</small>':'')+'</div><div class="zsrc" style="margin-top:10px"><button class="zs1" onclick="esAdd();esFre()">품목+</button><button class="zs2" onclick="esGo(\'sy\')">도장S</button><button class="zs3" onclick="esGo(\'pq\')">일위대가표</button></div></div>')}
function esForm0(){const E=esS(),R=esRows(),V=E.v,SP=E.sp=E.sp||{};
const spv=SP.n||SP.r||SP.m||SP.c||SP.a,ed=window.ESED===undefined?!spv:window.ESED,spRows=[['공급업체명','n'],['대표자명','r'],['담당자','m'],['연락처','c'],['주소','a']];
const fld=(l,v,fn,ph,ic,tp)=>`<label class="zfl"><span>${esc(l)}</span><div>${ic?`<i>${ic}</i>`:''}<input ${tp?'type="'+tp+'" ':''}value="${esc(v||'')}" placeholder="${ph||''}" oninput="${fn}"></div></label>`;
const hd=(ic,ti,en,extra)=>`<div class="zch"><i>${ic}</i><div><b>${ti}</b>${en?`<small>${en}</small>`:''}</div>${extra||''}</div>`;
let no=0;const it=(k,top,sub,q,p,fq,fp,delf)=>{no++;return `<div class="zit${/^<b>└/.test(top)?' zth':''}" data-k="${k}"><div class="zih"><span class="zn">${no}</span><div class="zin">${top}${sub}</div><button class="zdl" onclick="${delf}" aria-label="삭제">${QI.del}</button></div><div class="ztb"><div><span>수량</span><input inputmode="decimal" value="${esc(q)}" oninput="${fq}"></div><div><span>단가(원)</span><input inputmode="decimal" value="${esc(p)}" oninput="${fp}"></div><div><span>금액(원)</span><div class="zam"></div></div></div></div>`};
const ar=R.map(r=>{const o=E.o[r.k]||{},q=o.q!==undefined?o.q:r.q,p=o.p!==undefined?o.p:r.p;return it(r.k,`<b>${esc(r.n)}</b>`,`<small>${esc(r.s)}${r.m?' · '+esc(r.m):''}</small>`,q,p||'',`esFo('${r.k}','q',this.value)`,`esFo('${r.k}','p',this.value)`,`esHide('${r.g}')`)}).join('');
const xr=E.x.map((x,j)=>it('x'+j,`<input class="znm" value="${esc(x.n)}" placeholder="품명" oninput="esFx(${j},'n',this.value)">`,`<input class="zsp" value="${esc(x.s)}" placeholder="규격" oninput="esFx(${j},'s',this.value)">`,x.q,x.p,`esFx(${j},'q',this.value)`,`esFx(${j},'p',this.value)`,`esDel(${j});esFre()`)).join('');
const sb=`<div class="zsrc"><button class="zs1" onclick="esAdd();esFre()">품목+</button><button class="zs2" onclick="esGo('sy')">도장S</button><button class="zs3" onclick="esGo('pq')">일위대가표</button></div>`;
return `<div class="zc zsup">${hd(PQI.admin,'공급자 정보','Supplier Information')}<div class="zsr">${ed?spRows.map(([l,k])=>`<label><span>${l}</span><input value="${esc(SP[k]||'')}" oninput="esSp('${k}',this.value)"></label>`).join(''):spRows.map(([l,k])=>`<div><span>${l}</span><b>${esc(SP[k]||'-')}</b></div>`).join('')}</div><button class="zed" onclick="esEd(${ed?0:1})" aria-label="${ed?'완료':'수정'}">${ed?'✓':QI.pen}</button></div>
<div class="zc zinf">${hd(PQI.quote,'견적 정보','Quotation Info')}<div class="zig">${fld('견적일자',V[0]||esToday(),"esQ(0,this.value)",'',QI.cal,'date')}${fld('견적번호',E.no,"esNo(this.value)",'CC-2610-0001')}${fld('현장명 / 공사명',V[3],"esQ(3,this.value)")}</div><div class="zig z2">${fld('수신',V[1],"esQ(1,this.value)")}${fld('유효기간',V[4],"esQ(4,this.value)")}${fld('결제조건',V[5],"esQ(5,this.value)")}</div></div>
<div class="zc">${hd(syIc.roll,'도장 품목','Paint Items',sb)}${R.some(r=>r.nc)?'<div class="zem" style="padding:8px 10px;margin:0 0 8px;text-align:left;font-size:12.5px;line-height:1.45;color:#b45309;background:#fff7ed;border:1px solid #fdba74;border-radius:10px">SVR(고형분)이 없는 제품은 소요량을 계산할 수 없습니다. <b>수량·단가</b>를 직접 입력하세요.</div>':''}${ar+xr||'<div class="zem">일위대가표에 제품·단가를 입력하면 자동 반영됩니다</div>'}</div>
<div class="zc zs2"><div class="zst"><i>${PQI.quote}</i><b>공급가액 및 부가세</b></div><div class="ztot"><div><small>공급가액</small><b><span id="fS">0</span><em>원</em></b></div><div><small>부가세 (10%)</small><b><span id="fV">0</span><em>원</em></b></div><div class="big"><small><i>${PQI.db}</i>총 견적금액</small><b><span id="fT">0</span><em>원</em></b></div></div></div>
<div class="zc zs2"><div class="zst"><i>${PQI.tds}</i><b>비고</b></div><textarea class="znt" oninput="esH('nt',0,this.value);esRe()" placeholder="비고를 입력하세요">${esc(E.nt)}</textarea></div>`}
async function esImg(){const src=$('#es .esh'),bt=$('#esb'),W0=esDW(src);bt.textContent='만드는 중…';let box;try{await ldp();
box=document.createElement('div');box.style.cssText='position:fixed;left:-12000px;top:0;width:'+W0+'px;background:#fff;z-index:-1';
const el=src.cloneNode(true);el.style.cssText='zoom:1;width:'+W0+'px;min-width:'+W0+'px;max-width:'+W0+'px;flex:none;box-shadow:none;margin:0';
const oi=[...src.querySelectorAll('input,textarea')],ci=[...el.querySelectorAll('input,textarea')];
ci.forEach((x,i)=>{const s=document.createElement('div');s.textContent=oi[i].value;s.className='ev '+x.className;if(x.tagName=='TEXTAREA')s.style.cssText='min-height:70px;text-align:left;padding:4px 2px';x.replaceWith(s)});
el.querySelectorAll('.noexp').forEach(x=>x.remove());box.append(el);document.body.append(box);await new Promise(r=>setTimeout(r,150));
const sc=Math.min(1.6,Math.sqrt(8e6/(W0*Math.max(1,el.offsetHeight)))),cv=await html2canvas(el,{scale:sc,backgroundColor:'#fff',windowWidth:W0,scrollX:0,scrollY:0});
const bl=await new Promise(ok=>cv.toBlob(ok,'image/jpeg',.88)),nm='견적서_'+new Date().toISOString().slice(0,10)+'.jpg',f=new File([bl],nm,{type:'image/jpeg'});
if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'견적서'});qtCommit('이미지')}else{dl(bl,nm);qtCommit('이미지');tt('견적서 이미지를 저장했습니다<br><small>'+nm+'</small>')}}catch(x){if(!(x&&x.name=='AbortError'))tt('이미지 생성에 실패했습니다<br>온라인 연결을 확인해 주세요')}finally{if(box)box.remove();bt.textContent='견적서 생성'}}
const ldj=()=>window.jspdf?Promise.resolve():libSrc('lib/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(u=>new Promise((o,e)=>libTag(u,o,e)));
async function esCv(se){await ldp();const src=se||$('#es .esh');const W0=esDW(src);window.LASTLAND=W0>800;const box=document.createElement('div');box.style.cssText='position:fixed;left:-12000px;top:0;width:'+W0+'px;background:#fff;z-index:-1';
 const el=src.cloneNode(true);el.style.cssText='zoom:1;width:'+W0+'px;min-width:'+W0+'px;max-width:'+W0+'px;flex:none;box-shadow:none;margin:0';
 const oi=[...src.querySelectorAll('input,textarea')],ci=[...el.querySelectorAll('input,textarea')];
 ci.forEach((x,i)=>{const d=document.createElement('div');d.textContent=oi[i].value;d.className='ev '+x.className;x.replaceWith(d)});
 box.append(el);document.body.append(box);await new Promise(r=>setTimeout(r,150));
 try{const sc=Math.min(1.6,Math.sqrt(8e6/(W0*Math.max(1,el.offsetHeight))));const c=await html2canvas(el,{scale:sc,backgroundColor:'#fff',windowWidth:W0,scrollX:0,scrollY:0});c.land=W0>800;return c}finally{box.remove()}}
function esFitPdfN(cvs,J){let pdf;cvs.forEach(cv=>{const L=cv.land!==undefined?cv.land:window.LASTLAND,W=L?297:210,H=L?210:297,o=L?'landscape':'portrait';if(!pdf)pdf=new J({unit:'mm',format:'a4',orientation:o});else pdf.addPage('a4',o);const k=Math.min(W/cv.width,H/cv.height),w=cv.width*k,h=cv.height*k;pdf.addImage(cv.toDataURL('image/jpeg',.85),'JPEG',(W-w)/2,0,w,h,undefined,'FAST')});return pdf}
function esFitPdf(cv,J){return esFitPdfN([cv],J)}
function esFillEl(el){const g=e=>parseFloat(String(e&&e.value).replace(/,/g,''))||0;let sum=0;el.querySelectorAll('.ei[data-k]').forEach(tr=>{const q=g(tr.querySelector('input[data-f=q]')),pr=g(tr.querySelector('input[data-f=p]')),am=Math.round(q*pr);sum+=am;const c=tr.querySelector('.am');if(c)c.textContent=F(am,0);const u=tr.querySelector('.up'),pk=+tr.dataset.pk||0;if(u)u.textContent=pk>0&&pr?F(Math.round(pr/pk),0):''});const v=Math.round(sum*.1),set=(i,x)=>{const e=el.querySelector('#'+i);if(e){e.textContent=F(x,0);e.removeAttribute('id')}};set('esT0',sum);set('esS',sum);set('esV',v);set('esT',sum+v)}
function esDocEl(k){const d=document.createElement('div');d.innerHTML=k=='d'?esHTMLD():esHTML();const el=d.firstElementChild;esFillEl(el);return el}
async function esPdf(){try{const cv=await esCv();await ldj();const pdf=esFitPdf(cv,window.jspdf.jsPDF);
 const nm='견적서_'+new Date().toISOString().slice(0,10)+'.pdf';dl(pdf.output('blob'),nm);qtCommit('PDF');tt('PDF를 저장했습니다<br><small>'+nm+'</small>')}catch(x){tt('PDF 생성에 실패했습니다<br>온라인 연결을 확인하거나 이미지로 저장하세요')}}
function pqFit1(){document.querySelectorAll('#v4 .pqk span').forEach(s=>{let f=12;s.style.fontSize=f+'px';while(s.scrollWidth>s.clientWidth+1&&f>7){f-=.5;s.style.fontSize=f+'px'}})}
{const _t=tpRender;tpRender=function(){_t.apply(this,arguments);pqFit1()}}addEventListener('resize',()=>{try{pqFit1()}catch(e){}});
async function esPrint(){try{const cv=await esCv(),bl=await new Promise(ok=>cv.toBlob(ok,'image/png'));prnBlob(bl,'견적서.png');qtCommit('인쇄')}catch(x){tt('인쇄 준비에 실패했습니다<br>온라인 연결을 확인하거나 PDF·이미지로 저장하세요')}}
async function rpImg(){const src=$('#rp .a4'),bt=$('#rpb');bt.textContent='만드는 중…';let box;try{await ldp();
box=document.createElement('div');box.style.cssText='position:fixed;left:-12000px;top:0;width:794px;background:#fff;z-index:-1';
const el=src.cloneNode(true);el.style.cssText='zoom:1;width:794px;min-width:794px;max-width:794px;flex:none;box-shadow:none;margin:0';box.append(el);document.body.append(box);
await new Promise(r=>setTimeout(r,150));
const sc=Math.min(1.6,Math.sqrt(8e6/(794*Math.max(1,el.offsetHeight)))),cv=await html2canvas(el,{scale:sc,backgroundColor:'#fff',windowWidth:794,scrollX:0,scrollY:0});
const bl=await new Promise(ok=>cv.toBlob(ok,'image/jpeg',.88)),nm='일위대가표_'+new Date().toISOString().slice(0,10)+'.jpg',f=new File([bl],nm,{type:'image/jpeg'});
if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],title:'일위대가표'});else{dl(bl,nm);tt('보고서 이미지를 저장했습니다<br><small>'+nm+'</small>')}}catch(x){if(!(x&&x.name=='AbortError'))tt('이미지 생성에 실패했습니다<br>온라인 연결을 확인해 주세요')}finally{if(box)box.remove();bt.textContent='이미지 공유·저장'}}
/* ===== v70: 제조사별 용어 → 표준용어 매칭 ===== */
const TERMS=[
{k:'제품설명',u:'',r:null,d:'도료의 종류·수지·특성을 요약한 설명',v:['도료의 특성','제품 특성','제품특성','개요','Product description']},
{k:'용도',u:'',r:'용도',d:'적용 대상·부위',v:['적용대상','적용부위','사용처','Intended use','Typical use','Recommended use']},
{k:'SVR',u:'%',r:'고형분 용적비',d:'고형분 용적비 — 도막으로 남는 고형분의 부피 비율',v:['고형분용적비','부피 고형분','부피고형분','용적비','고형분','고형분(용적)','고형분(부피)','체적고형분','Volume solids','Solids by volume','Vol. solids','固形分(容積)']},
{k:'혼합비',u:'주제:경화제',r:'혼합비',d:'액형(1·2액)과 주제:경화제 혼합 비율',v:['액형','조성','배합비','혼합비율','Mixing ratio','Mix ratio']},
{k:'추천도막두께',u:'㎛',r:'건조 도막 두께',d:'1회 도장 시 권장 건조도막두께',v:['추천 도막 두께','건조 도막 두께','추천건조도막두께','건조도막두께','추천 도막','권장 도막두께','권장도막','표준 도막두께','도막두께','Typical film thickness','Recommended DFT','Dry film thickness','Film thickness','膜厚']},
{k:'이론소요량',u:'㎡/L',r:'이론 도포율',d:'이론 도포율(㎡/L) = SVR × 10 ÷ 추천도막두께',v:['이론 도포율','이론도포면적','이론도포량','추천도포면적','이론살포율','이론 소요면적','Theoretical coverage','Theoretical spreading rate','Spreading rate']},
{k:'건조시간',u:'',r:null,d:'온도별 건조·경화 시간표',v:['건조 시간','건조와 경화 시간','Drying time','Drying information']},
{k:'지촉',u:'',r:'지촉건조',d:'손가락에 묻지 않는 상태까지의 시간',v:['지촉 건조','지촉건조','표면 (지촉) 건조','표면건조','Touch dry','Surface dry','Dust free','Tack free','Set to touch','指触干燥']},
{k:'고화',u:'',r:'고화건조',d:'눌러도 자국이 없는 상태 · 서비스(사용) 가능 상태',v:['고화 건조','고화건조','서비스 건조/경화','서비스 건조','Hard dry','Cured for service','Fully cured','Full cure','Through dry','实干']},
{k:'경화',u:'',r:'경화건조',d:'보행 가능 수준으로 굳는 시간',v:['경화 건조','경화건조','보행 건조','Walk-on dry','Dry to handle']},
{k:'가사시간',u:'',r:'가사시간',d:'혼합 후 사용 가능한 시간',v:['가사 시간','사용가능시간','사용 가능시간','Pot life','Working life','适用期']},
{k:'재도장간격',u:'',r:'재도장 간격',d:'다음 코트를 도장할 수 있는 최소~최대 시간',v:['재도장 간격','재도장시간 최소','후속도장 가능시간','후속 도장 가능시간','도장간격','Overcoating interval','Recoating interval','Overcoat interval','Dry to overcoat','重涂间隔']},
{k:'선행도장',u:'',r:'선행도장',d:'앞(아래)에 도장하는 도료 · 도장시스템',v:['이전 도장','도장시스템','전도장','Previous coat']},
{k:'후속도장',u:'',r:null,d:'뒤(위)에 도장하는 도료 · 도장시스템',v:['후속 도장','도장시스템','Subsequent coat']},
{k:'표면처리',u:'',r:'표면처리',d:'도장 전 소지 조정 방법(사용방법)',v:['표면 처리','사용법','사용방법','소지조정','바탕처리','전처리','Surface preparation','Substrate preparation']},
{k:'희석제',u:'',r:'희석제',d:'신너(신나) 및 세척제',v:['신너','신나','시너','세척제','신나/세척 용제','Recommended thinner']},
{k:'혼합규격',u:'L / kg',r:null,d:'주제+경화제 혼합 용량 (선적중량·혼합비율 표 포함)',v:['선적 중량','제품 혼합 비율']},
{k:'주제',u:'',r:'주제',d:'Part A · 베이스 성분',v:['Part A','PTA']},
{k:'경화제',u:'',r:'경화제',d:'Part B · 경화 성분',v:['Part B','PTB']},
{k:'비중',u:'',r:'비중',d:'도료 밀도 (중량 ÷ 부피)',v:['중량','비 중','밀도','Specific gravity','Density','S.G.']},
{k:'출고규격',u:'L / kg',r:'포장 규격',d:'포장 단위 (제품 1세트 용량)',v:['포장','포장단위','포장 단위','포장규격','포장 규격','포장용량','공급단위','판매단위','Unit size','Pack size','Packing','Package']},
{k:'Loss',u:'%',r:'로스율',d:'로스율 — 도장 손실 계수',v:['손실률','손실계수','로스','Loss factor']},
{k:'희석율',u:'%',r:'희석율',d:'희석 비율',v:['희석비율','희석비','희석률','Thinning ratio']}];
/* v509 인식율: 추가 동의어 */
(function(){const X={'SVR':['용적 고형분','체적 고형분','Volume solids','Volume of solids','Solids by volume','Solids volume'],
'추천도막두께':['Specified DFT','Recommended DFT','Dry film thickness','표준 도막두께','표준도막두께','적정 도막두께'],
'출고규격':['포장량','Packing size','Packaging','Package size','Container size'],
'표면처리':['표면준비','표면 준비','Surface treatment','Pretreatment','소지 처리'],
'재도장간격':['Recoat time','Recoating interval','Overcoating interval','재도장 가능시간','재도장가능시간','Recoat interval'],
'가사시간':['Pot-life','Potlife','사용시간'],
'희석제':['희석용제','Thinner'],
'용도':['주요 용도','주 용도'],
'제품설명':['제품 개요','제품소개','제품 소개'],
'혼합비':['Mixing proportion','혼합 비','혼합비(중량비)','혼합비(용적비)'],
'이론소요량':['Theoretical coverage','Theoretical spreading rate','이론 소모량']};
TERMS.forEach(t=>{(X[t.k]||[]).forEach(w=>{if(!t.v.includes(w))t.v.push(w)})})})();
const _ek=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s*'),_by=a=>[...a].sort((x,y)=>y.length-x.length).map(_ek).join('|');
const NR=TERMS.filter(t=>t.r).map(t=>{const ko=t.v.filter(x=>!/[A-Za-z\u4e00-\u9fff\u3040-\u30ff]/.test(x)),en=t.v.filter(x=>/[A-Za-z\u4e00-\u9fff\u3040-\u30ff]/.test(x));return {r:t.r,ko:ko.length?new RegExp('^([\\s■□●○▪·\\d.\\)\\(-]*)(?:'+_by(ko)+')(?![가-힣A-Za-z])(?!\\s*\\(?중량)','i'):null,en:en.length?new RegExp('(?<![A-Za-z])(?:'+_by(en)+')(?![A-Za-z])','gi'):null}});
const NU=[[/(\d)\s*(?:microns?|μm|µm|um|마이크론|미크론)(?![A-Za-z가-힣])/gi,'$1㎛'],[/(-?\d+)\s*°\s*F\b/g,(m,f)=>Math.round((+f-32)*5/9)+'℃'],[/°\s*C\b|deg\s*C\b/gi,'℃'],[/(\d)\s*(?:hours?|hrs?|h)\b/gi,'$1시간'],[/(\d)\s*(?:minutes?|mins?)\b/gi,'$1분'],[/(\d)\s*(?:days?|d)\b/gi,'$1일'],[/(\d)\s*(?:lt|ltrs?|liters?|litres?)\b/gi,'$1L'],[/(\d)\s*리터/g,'$1L'],[/(\d)\s*\/\s*(?:㎡|m2|m²)/g,'$1/㎡']];
function normL(L){if(!L||L.__n)return L;const o=L.map(l=>{let t=String(l);for(const n of NR){if(n.ko)t=t.replace(n.ko,'$1'+n.r);if(n.en)t=t.replace(n.en,n.r)}for(const [a,b] of NU)t=t.replace(a,b);return t});o.ocr=L.ocr;o.__n=1;return o}
{const A=parseAll,D=parseDry,P=parsePot;parseAll=L=>A(normL(L));parseDry=L=>D(normL(L));parsePot=L=>P(normL(L))}
const glossHTML=()=>'<details class=gl><summary>용어 매칭표</summary><table class=glt>'+TERMS.map(t=>`<tr><th>${t.k}${t.u?' <small>['+t.u+']</small>':''}<small class=gd>${t.d}</small></th><td>${t.v.join(' · ')}</td></tr>`).join('')+'</table><div class=hint>기술자료(TDS)를 읽을 때 오른쪽 표기는 왼쪽 표준용어로 자동 매칭되어 계산·DB 페이지의 같은 항목에 입력됩니다.</div></details>';
['hgl','cgl','dgl'].forEach(i=>{const e=document.getElementById(i);if(e)e.innerHTML=glossHTML()});
function hInfo(){const e=document.getElementById('hinfo');if(!e)return;T(2);setTimeout(()=>{e.scrollIntoView({behavior:'smooth',block:'start'});const g=e.querySelector('.gl');if(g)g.open=true},60)}

/* v70 보완: 범위값·단위(㎜→㎛)·노이즈 줄 제거 */
{const A=parseAll,D=parseDry,P=parsePot,NZ=/양생|상대습도|최소\s*\d+\s*개월|인화점|flash\s*point|저장\s*기간|shelf\s*life|pack|포장\s*규격/i;
const num=(t,re)=>{const m=t.match(re);return m?(m[2]?(+m[1]+ +m[2])/2:+m[1]):0};
parseAll=L=>{const N=normL(L),s=A(N);
if(!s.svr)for(const l of N){if(!/고형분 용적비/.test(l))continue;const t=l.replace(/ISO\s*\d+(?::\d+)?/gi,' ').replace(/\([^)]*\)/g,' ').replace(/^.*?고형분 용적비/,'');const v=num(t,/(\d+(?:\.\d+)?)(?:\s*[~～]\s*(\d+(?:\.\d+)?))?/);if(v>=1&&v<=100){s.svr=v;break}}
for(const l of N){if(!/건조 도막 두께/.test(l)||/^\s*(?:습윤|wet)/i.test(l))continue;const t=l.replace(/\([^)]*(?:습|wet)[^)]*\)/gi,' ');let v=[];for(const m of t.matchAll(/(\d+(?:\.\d+)?)(?:\s*[~\-–]\s*(\d+(?:\.\d+)?))?\s*(㎜|mm|㎛)/gi)){const k=/mm|㎜/i.test(m[3])?1000:1;v.push(+m[1]*k);if(m[2])v.push(+m[2]*k)}if(v.length){const x=Math.round((Math.min(...v)+Math.max(...v))/2);if(x>=5&&x<=20000){s.dft=x;break}}}
if(s.tn)s.tn=s.tn.replace(/^\/\s*|\s*(?:저장\s*기간|포장\s*규격|색상|인화점|비중|건조).*$/,'').trim();
return s};
parseDry=L=>D(normL(L).filter(l=>!NZ.test(l)));parsePot=L=>P(normL(L).filter(l=>!NZ.test(l)))}

const APPV={v:'v593p15',d:'2026.11.12'};
function gnav(n){document.body.classList.toggle('inapp',n!=2);document.querySelectorAll('#gnav .hni').forEach((b,i)=>b.classList.toggle('on',i==NAVI(n)))}
const APPMK={n:'',c:''};/* 제작자 정보: 현재 비공개. 값을 넣으면 '저작권·이용 안내'에 제작자 행이 나타납니다 */
function showInfo(){
 let e=document.getElementById('inf');
 if(!e){e=document.createElement('div');e.id='inf';e.onclick=ev=>{if(ev.target===e)e.hidden=true};document.body.append(e)}
 const n=DB.length,t=DB.filter(p=>p.dry||p.pot||p.dsrc||p.url).length;
 const I=d=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${d}</svg>`;
 const ic={
  doc:I('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
  flask:I('<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7.5 15h9"/>'),
  shield:I('<path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>'),
  grid:I('<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'),
  can:I('<path d="M5 7v11c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M12 10.5c-1.3 1.6-2 2.7-2 3.6a2 2 0 0 0 4 0c0-.9-.7-2-2-3.6z"/>'),
  gear:I('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
  calc:I('<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>'),
  info:I('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.4"/>'),
  user:I('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'),
  ok:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M7.8 12.4l2.9 2.9 5.6-5.8"/></svg>'
 };
 const R=(k,v,i,h)=>`<div class="ifr"${h?' hidden':''}><div class="ifk">${i?`<span class="ifki">${i}</span>`:''}<b>${k}</b></div><div class="ifv">${v}</div></div>`;
 const C=(ico,ttl,rows)=>`<div class="ifc2"><div class="ifh2"><span class="ifi2">${ico}</span><b>${ttl}</b></div><div class="ifrs">${rows}</div></div>`;
 e.innerHTML=`<div class="infb infn">`
 +C(ic.doc,'기본 정보',R('앱 버전',APPV.v)+R('업데이트',APPV.d)+R('등록 제품',n+'개')+R('기술자료 반영',t+'개')+R('데이터 저장','이 기기(브라우저) 안에만 저장'))
 +C(ic.flask,'프로그램 정보',R('프로그램','코트 온',ic.grid)+R('용도','도장 면적별 소요량·자재비 산출, 기술자료(TDS) DB 관리',ic.can)+R('주요 기능','Coat별 소요량 · 도장 시스템 · 건조시간/재도장 간격 · TDS 자동 읽기 · 보고서 공유',ic.gear)+R('산출 공식','이론 = 추천도막두께 ÷ (SVR×10) · 실제 = 이론 ÷ (1−Loss÷100)',ic.calc)+R('안내','본 자료는 참고용이며 현장 조건에 따라 실제 사용량은 다릅니다.',ic.info)+R('저작권','앱의 화면 구성·프로그램 코드(제작자 고유 부분)의 무단 복제·배포를 금지합니다. 제품명·상표·기술자료의 권리는 각 권리자에게 있습니다.',ic.shield)+R('제작자',esc((APPMK.n||'')+(APPMK.c?' · '+APPMK.c:'')),ic.user,!APPMK.n))
 +`<div class="ifn2"><span class="ifn2i">${ic.info}</span><div><b>정확한 계산을 위해 입력하신 조건을 다시 한 번 확인해주세요.</b><small>본 계산 결과는 입력하신 조건과 프로그램 기준에 따른 예상 수치입니다.</small></div></div>`
 +`<button class="ifc ifx" onclick="document.getElementById('inf').hidden=true">${ic.ok}<span>닫기</span></button></div>`;
 e.hidden=false}

/* v73: 공식·경고·용어 매칭표를 각 코트 '예상 수량 · 자재비' 카드 안으로 */
function foldInject(){const rs=document.getElementById('rs');if(!rs)return;const fm=rs.querySelector(':scope>.fmb'),nt=rs.querySelector(':scope>.nt');if(!fm&&!nt)return;
const h=(fm?fm.outerHTML:'')+(nt?nt.outerHTML:'');document.querySelectorAll('#v0 .xrc').forEach(c=>{if(c.querySelector(':scope>details.xfd'))return;const d=document.createElement('details');d.className='xld xfd';d.innerHTML='<summary>산출 공식 · 경고 안내 · 용어 매칭표</summary>'+h+glossHTML();c.append(d)})}
{const v=document.getElementById('v0');if(v){new MutationObserver(foldInject).observe(v,{childList:true,subtree:true});foldInject()}}

/* ===== v116: 도장 시스템 페이지 ===== */
let SY=(()=>{try{return JSON.parse(LS.sy||'null')}catch(e){return null}})()||{};
if(!Array.isArray(SY.layers))SY.layers=[];
if(typeof SY.area!=='string'&&typeof SY.area!=='number')SY.area='';
if(!(SY.act>=0&&SY.act<SY.layers.length))SY.act=-1;
const syS=()=>{try{LS.sy=JSON.stringify(SY)}catch(e){}};
const syLabsOld=n=>({1:['도장'],2:['하도','상도'],3:['하도','중도','상도'],4:['하도','중도','상도1','상도2'],5:['하도','중도1','중도2','상도1','상도2']})[n]||[]; const syLb=()=>SY.layers.map((l,i,a)=>{if(l.lb!==undefined)return l.lb||'미지정';const gr=a.filter(x=>x.g==l.g),k=gr.indexOf(l);return syLabsOld(gr.length)[k]||'미지정'});
const syCol=Array.from({length:80},(_,i)=>['#1560e6','#0f8f6b','#c98a2b','#7b4fc4','#c9525c'][i%5]);
/* 시스템 묶음: 각 제품(layer)은 g(시스템 번호)를 가지며 SY.groups[g].name 이 시스템 이름 */
function syNorm(){
 const L=SY.layers;L.forEach(l=>{if(!(l.g>=0))l.g=0});
 const ids=[...new Set(L.map(l=>l.g))].sort((a,b)=>a-b),old=Array.isArray(SY.groups)?SY.groups:[];
 const ng=ids.map((g,k)=>Object.assign({},old[g]||{},{name:(old[g]&&old[g].name)||('시스템 '+(k+1)),area:(old[g]&&old[g].area)||'',c:(old[g]&&old[g].c)?1:0}));
 L.forEach(l=>{l.g=ids.indexOf(l.g)});
 SY.layers=L.map((l,i)=>[l,i]).sort((a,b)=>a[0].g-b[0].g||a[1]-b[1]).map(x=>x[0]);
 SY.groups=ng;if(!(SY.act>=0&&SY.act<SY.layers.length))SY.act=-1;
}
const syGr=()=>SY.groups.map((g,k)=>({name:g.name,idx:SY.layers.map((l,i)=>l.g==k?i:-1).filter(i=>i>=0)}));
const syK=i=>SY.layers.slice(0,i).filter(x=>x.g==SY.layers[i].g).length;
const syLbFull=i=>{const l=SY.layers[i];if(!l)return '';return (SY.groups.length>1&&SY.groups[l.g]?SY.groups[l.g].name+' · ':'')+syLb()[i]};
const syLibGet=()=>{try{const a=JSON.parse(LS.syl||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}};
const syLibSet=a=>{try{LS.syl=JSON.stringify(a)}catch(e){}};
syNorm();
const syIc={
 area:SV('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6"/>'),
 roll:SV('<rect x="3.5" y="3.5" width="14" height="6" rx="1.8"/><path d="M17.5 6.5H20v5.5h-8v3"/><rect x="10" y="15" width="4" height="6" rx="1.2"/>'),
 gear:SV('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
 layers:SV('<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>'),
 target:SV('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'),
 doc:SV('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
 chev:SV('<path d="M9 6l6 6-6 6"/>'),
 warn:'<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" style="flex:none"><path d="M12 3.5 2.5 20h19z" fill="#f5a524"/><path d="M12 9.5v5M12 17.2v.3" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
 drop:'<svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="currentColor" style="flex:none"><path d="M12 2.5c-3.4 4.3-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-2.6-6.7-6-11z"/></svg>'
};
const syf2=x=>(+x||0).toFixed(2);
const syJn=o=>{const e=Object.entries(o).filter(([k,v])=>v>0);return e.length?e.map(([k,v])=>syf2(v)+'<small>'+k+'</small>').join(' + '):'0.00<small>L</small>'};

/* 코트(층)별 계산: 기존 calc()를 그대로 사용 */
function syLay(i){
 const c=SY.layers[i],p=PC(c.n),A=+((SY.groups[c.g]||{}).area)||+SY.area||0,Ac=+c.area||A,r=calc(c);
 if(!r)return{c,p,Ac,r:null};
 const a=r[0],t=r[1],u=UN(p),pk=a.pk,q=a.ac*Ac,k=Ac>0?Math.ceil(q/pk-1e-9):0,pa=Ac>0?f10(a.amt*Ac):0,
 tq=t&&Ac>0?t.ac*Ac:0,tk=t&&Ac>0?Math.ceil(tq/t.pk-1e-9):0,da=t&&Ac>0?f10(t.amt*Ac):0,
 buy=k*(+c.price||0)+tk*(+c.tprice||0);
 return{c,p,Ac,r,a,t,u,pk,q,k,pa,tq,tk,da,tot:pa+da,buy};
}
const syVal=(c,p,k)=>{const v=c[k];if(v!==undefined&&v!==''&&v!==null)return v;const r=rec(p)[k];return r?r:''};

window.SYED=window.SYED||{};function syEd(gi){window.SYED[gi]=!window.SYED[gi];syRender()}
function syRender(){
 const e=$('#v3');if(!e)return;
 if(window.SYM=='db'){e.innerHTML='<div class="syp spdbp"><div id="sylib" class="sylib"></div></div>';syLibPage();{const b=$('#bb3');if(b)b.hidden=true}return}
 const L=SY.layers,labs=syLb(),act=SY.act;
 let h=(window.LCCEDIT?'<div class="sy-card" style="background:#fff6dc;border:1px solid #efd88f"><div class="sy-hd"><div class="sy-tt"><b>LCC 사양 수정 중</b><small>코트를 수정한 뒤 시스템의 ‘저장’을 누르면 LCC에 반영됩니다</small></div><div class="sy-hbs"><button class="sy-hb b" onclick="window.LCCEDIT=null;navGo(\'lcc\')">LCC로</button></div></div></div>':'')+`<div class="sy-card sy-ar"><div class="sy-hd"><span class="sy-ic">${syIc.area}</span><div class="sy-tt"><b>면적을 입력하세요</b><small>도장할 면적을 입력하면 자동으로 계산됩니다.</small></div></div><div class="sy-iw2"><input type="number" inputmode="decimal" id="sy_ar" placeholder="면적을 입력하세요." value="${esc(SY.area)}" onwheel="this.blur()" oninput="syArea(this.value)"><span class="sy-u2">m²<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span></div></div>`;
 h+=`<div class="sy-card sy-main"><div class="sy-hd"><span class="sy-ic">${syIc.roll}</span><div class="sy-tt"><b>도장 시스템</b><small>${L.length?(SY.groups.length+'시스템 '+L.length+'제품'):'미선택'}</small></div></div><div class="sy-bd">`;
 if(!L.length){
  h+=`<div class="sy-empty">${syIc.layers}<div><b>도장 시스템이 비어 있습니다</b><small>‘사용자사양’으로 직접 구성하거나, ‘DB 열기’에서 저장된 사양을 불러오세요. 제조사 사양서는 ‘사양첨부’로 읽을 수 있습니다.</small></div></div>`;
 }else{
  syGr().forEach((g,gi)=>{
   h+=`<div class="sy-sg${gi?' nx':''}${window.SYED&&window.SYED[gi]?' ed':''}"><div class="sy-sgh"><span class="sy-sgn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><div class="sy-gtx"><input class="sy-gn" value="${esc(g.name)}" oninput="syGn(${gi},this.value)" aria-label="시스템 이름" placeholder="시스템 이름"><span class="sy-gsub">${g.idx.map(i=>labs[i]).join(' · ')}</span></div><button class="sy-fold" onclick="syEd(${gi})" aria-label="시스템 편집(이름·면적·저장·삭제·제품 추가)" aria-expanded="${window.SYED&&window.SYED[gi]?'true':'false'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div><div class="sy-gact"><span class="sy-sgc">${g.idx.length}개</span><label class="carea sy-car"><span>면적 [m²]</span><input type="number" inputmode="decimal" placeholder="면적 ㎡" value="${esc(SY.groups[gi].area||'')}" onwheel="this.blur()" oninput="syGa(${gi},this.value)" aria-label="${esc(g.name)} 면적"></label><button class="zs1x sv" onclick="syGSave(${gi},this)">저장</button><button class="zdlx" onclick="syDelG(${gi})" aria-label="삭제">삭제</button><button class="all" onclick="syPick(${gi})">제품+</button></div><div class="sy-lcard"><div class="sy-lcc"><div class="sy-lo"><span class="sy-lt">LCC 사양</span>${[['cur','기존'],['base','범용'],['rec','추천']].map(([v,t])=>`<button type="button" class="${(SY.groups[gi].lr||'cur')==v?'on':''}" onclick="syLccSel(${gi},'${v}')">${t}</button>`).join('')}</div><button type="button" class="sy-ls sy-edb" onclick="syChg()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>사양수정</button><button type="button" class="sy-ls" onclick="syToLcc(${gi})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 13l2 2 4-4"/></svg>LCC로 보내기</button></div>`;
   g.idx.forEach((i,k)=>{
    const c=L[i],p=PC(c.n),on=act==i,nm=String(c.n||'').replace(/"/g,''),rc=p?rec(p):{},m=p?mx(p):{},u=p?UN(p):'ℓ',
    f=(l,key,ic,ph)=>`<div class="cell k-${key}"><div class=lb>${CI[ic]||''}<span>${l}</span></div><input type=number inputmode=decimal data-k=${key} placeholder="${ph||(p&&rc[key]!==undefined&&rc[key]!==''?rc[key]:(EXP[key]||''))}" value="${esc(String(c[key]??''))}" onwheel="this.blur()" oninput="syIn(${i},'${key}',this.value)"></div>`;
    h+=`<div class="cc sy-cc${on?' sy-on':''}" style="${cvars(k)}"><div class=ch onclick="syAct(${i})"><div class=cht><div class=chn><i class="chk${on?' on':''}"></i><span style="color:var(--cd)">${od(k+1)} ·</span><span class="sy-sw"><select class="sy-sel" aria-label="단계" onclick="event.stopPropagation()" onchange="syLbL(${i},this.value)">${SYST.map(x=>`<option value="${x}"${labs[i]==x?' selected':''}>${x}</option>`).join('')}</select></span>${nm?`<em class=chp>${esc(nm)}${p?'':' (DB에서 삭제됨)'}</em>`:''}</div><div id="syh${i}" class="cv chs"></div></div><button type=button class=chsel onclick="event.stopPropagation();syDelAsk(${i})">${SV('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>')}<span>삭제</span></button><span class=chv style="transform:rotate(${on?180:0}deg)">${SV('<path d="M6 9l6 6 6-6"/>')}</span></div>`;
    if(on&&c.cu)h+=syCuForm(i,c);else if(on)h+=`<div class=cbd><div><div class="cbox neon"><div class=prow><div class=pin><input value="${esc(nm)}" placeholder="제품명 입력 · 일부 입력시 목록 표시" onfocus="sySg(${i},this.value)" oninput="sySg(${i},this.value)" onblur="setTimeout(function(){var b=document.getElementById('sycb${i}');if(b)b.hidden=true},150)" onchange="syChgN(${i},this.value)"><span class=pdv onmousedown="event.preventDefault()" onclick="this.previousElementSibling.focus()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span></div>${p&&m.m>0?`<div class=pspec><small>규격</small><b>${F(m.m)}${u}</b></div>`:''}<button type=button class="gb gen" onclick="syCuOn(${i})">+ 생성</button></div><div class=cb id="sycb${i}" hidden onmousedown="event.preventDefault()"></div>
<div class=rec>${p?`추천 도막 ${rc.dft}㎛ · SVR ${rc.svr}% · Loss ${rc.loss}% · 희석 ${rc.tr}% · 전용 희석제 ${p.tn&&p.tn!='무희석'?p.tn+(p.tc&&p.tc!=p.tn?' ('+p.tc+')':''):'무희석'}`:'DB에서 삭제된 제품입니다. 시스템에서 제품을 다시 선택하세요.'}</div>
<div class=ccard><div class=cch><span class=cci>${CI.flask}</span><div><b>소요량 및 조건</b><small>Consumption &amp; Condition</small></div><label class=carea><span>면적 [m²]</span><input type=number inputmode=decimal data-k=area placeholder="기본면적" value="${esc(c.area??'')}" onwheel="this.blur()" oninput="syIn(${i},'area',this.value)"></label></div><div class="cg3 cg4">${f('DFT [μm]','dft','dft')}${f('SVR (%)','svr','svr')}${f('Loss (%)','loss','loss')}${f('희석율 (%)','tr','tr')}</div><div class="cg3 cgp">${f('제품단가 [원/1말]','price','price','')}${f('희석제 단가 [원]','tprice','price','')}</div><details class=addc ${window.SDO===false?'':'open'} ontoggle="window.SDO=this.open"><summary class=pshd><span class=pst><span class=pstx><b>제품소개</b><small>${p?esc(p.n):'제품을 선택하세요.'}</small></span></span>${syTdsPill(i,nm)}</summary>${p&&PX(c.n)?`<div class="dsemb">${typeof dsSecs=="function"?dsSecs(p):""}</div>`:`<div class="sy-nt">제품 DB에서 같은 제품을 찾지 못해 소개 자료가 없습니다.</div>`}</details><div class="cg3 cgr"><div class="cell ro"><div class=lb>${CI.th}<span>이론 소요량 (${u}/m²)</span></div><div class="rov emp" id="syth${i}">-</div></div><div class="cell ro"><div class=lb>${CI.th}<span>실제 소요량 (${u}/m²)</span></div><div class="rov emp" id="syac${i}">-</div></div><div class="cell ro"><div class=lb>${CI.area}<span>캔당 면적 (m²)</span></div><div class="rov emp" id="syca${i}">-</div></div></div><div class=sy-mv><button type=button class=gb onclick="syReset(${i})">추천값</button><button type=button class=gb onclick="syMvL(${i},-1)">▲ 위로</button><button type=button class=gb onclick="syMvL(${i},1)">▼ 아래로</button></div></div></div></div></div>`;
    h+=`</div>`;
   });
   h+=`</div>`;
   h+=lbForm('g',gi,SY.groups[gi]||{})+`</div>`;
  });
  }
 h+=`</div></div>`;
 h+=`<div id="syres"></div>`;
 e.innerHTML=`<div class="syp">${h}</div>`;
 syCalc();syAh();
}

function syBasis(act){
 const L=SY.layers,c=L[act],p=PC(c.n);let h='';
  h+=`<div class="sy-card sy-in"><div class="sy-hd"><span class="sy-ic">${syIc.target}</span><div class="sy-tt"><b>소요량 산출 기준</b><small id="sy-bh"></small></div>${p?`<label class="sy-ha"><span>면적 [m²]</span><input type="number" inputmode="decimal" value="${esc(c.area??'')}" placeholder="기본면적" onwheel="this.blur()" oninput="syIn(${act},'area',this.value)"></label>`:''}</div><div class="sy-bd">`;
  if(!p){h+=`<div class="sy-hint2">${syIc.warn}<span>DB에서 삭제된 제품입니다. ‘시스템 변경’에서 다시 선택하세요.</span></div>`}
  else{
   const f=(l,k,u,ph)=>`<div class="sy-f${['dft','svr','price','tprice'].includes(k)&&(k=='price'||k=='tprice'?(c[k]??'')==='':(syVal(c,p,k)===''||syVal(c,p,k)===0||syVal(c,p,k)==='0'))?' need':''}"><div class="sy-fl">${l}</div><div class="sy-iw"><input type="number" inputmode="decimal" value="${esc(k=='area'||k=='price'||k=='tprice'?(c[k]??''):syVal(c,p,k))}" placeholder="${ph||''}" onwheel="this.blur()" oninput="syIn(${act},'${k}',this.value)"><span class="sy-u">${u}</span></div></div>`;
   const m=mx(p),un=UN(p);
   h+=`<div class="sy-g4">${f('도막(DFT)','dft','㎛')}${f('SVR','svr','%')}${f('로스율','loss','%')}${f('희석율','tr','%')}</div>`;
   h+=`<div class="sy-g2">${f('제품단가('+F(m.m)+un+')','price','원','예: 45,000')}${f('희석제 단가','tprice','원','예: 3,000')}</div>`;
   h+=`<details class="sy-det" ${window.SDO===false?'':'open'} ontoggle="window.SDO=this.open"><summary><span class="sy-di">${syIc.doc}</span><b>제품 정보</b><span class="sy-dc">${syIc.chev}</span></summary>${PX(c.n)?`<div class="dsemb">${typeof dsSecs=="function"?dsSecs(p):""}</div>`:`<div class="sy-nt">제품 DB에서 같은 제품을 찾지 못해 소개 자료가 없습니다.<br>제품 DB에 같은 이름으로 등록하면 자동으로 연결됩니다.</div>`}</details><button type="button" class="sy-rs2" onclick="syReset(${act})">추천값 불러오기</button>`;
  }
  h+=`</div></div>`;
 return h}
function syCalc(){
 const box=$('#syres');if(!box)return;
 const L=SY.layers;
 if(!L.length){box.innerHTML='<div class="sy-nt">'+syIc.warn+'<span>본 자료는 참고용이며 현장 상황·작업자 숙련도에 따라 실제 사용량은 다를 수 있습니다. 산출 근거는 도료 소요량 공식이며, 활용에 따른 판단과 책임은 사용자에게 있으며, 제작자는 법령이 허용하는 범위에서 책임을 지지 않습니다.</span></div>';return}
 const labs=syLb(),D=L.map((c,i)=>syLay(i)),act=SY.act;
 const bh=$('#sy-bh');
 if(bh&&act>=0&&D[act]){const e=D[act].r?ev(D[act].c,D[act].p):null;bh.textContent='기준 면적 : '+F(D[act].Ac)+'㎡'+(e?' | 로스율 : '+F(e.loss)+'%':'')}
 let h='';
 if(act>=0&&D[act])h+=syLayerRes(act,labs[act],D[act]);
 else h+=`<div class="sy-hint2">${syIc.layers}<span>제품을 선택하면 소요량·자재비 결과가 표시됩니다</span></div>`;
 h+=syOutHTML(labs,D,syGr().map((g,k)=>k),1);
 h+='<button class="sy-q" onclick="syQuote()">'+QS('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12h7M9 16h7"/>')+'<span>'+(SY.groups.length>1?'견적서 생성 (시스템 선택)':'견적서 생성')+'</span></button>';
 h+='<div class="sy-nt">'+syIc.warn+'<span>본 자료는 참고용이며 현장 상황·작업자 숙련도에 따라 실제 사용량은 다를 수 있습니다. 산출 근거는 도료 소요량 공식이며, 활용에 따른 판단과 책임은 사용자에게 있으며, 제작자는 법령이 허용하는 범위에서 책임을 지지 않습니다.</span></div>';
 box.innerHTML=h;
}

function syOutHTML(labs,D,sel,btn){
 const G=syGr();let h='';
 sel.forEach(gi=>{const g=G[gi];if(!g)return;
  h+=`<div class="sy-sgl${gi?' nx':''}"><span>${gi+1}</span><b>${esc(g.name)}</b><small>${g.idx.length}개 제품</small>${btn?`<button onclick="syShareG(${gi})">공유</button><button class="q" onclick="syQuote([${gi}])">견적서</button>`:''}</div>`+syTotal(labs,D,g.idx,esc(g.name)+' 총 소요량 계산 결과')});
 return h}
function syLayerRes(i,lab,d){
 const ttl=`<small>[${lab}] ${esc(d.c.n)}</small>`;
 if(!d.r)return `<div class="rcw"><div class="rch">${syIc.drop}소요량 계산 결과 ${ttl}</div><div class="rcb"><div class="sy-e">도막두께(DFT)와 SVR 값을 입력하면 결과가 표시됩니다.</div></div></div>`;
 const hasA=d.Ac>0;
 let h=`<div class="rcw"><div class="rch">${syIc.drop}소요량 계산 결과 ${ttl}</div><div class="rcb"><div class="rcg">`
 +`<div class="rcc rth"><div class="rcl"><b>이론 소요량 <small>(${d.u}/㎡)</small></b></div><div class="rcf">DFT[㎛] ÷ (SVR[%] × 10)</div><div class="rcv">${F(d.a.th)}<small>${d.u}/㎡</small></div></div>`
 +`<div class="rcc rac"><div class="rcl"><b>실제 소요량 <small>(${d.u}/㎡)</small></b></div><div class="rcf">이론 ÷ (1 − Loss[%]÷100)</div><div class="rcv">${F(d.a.ac)}<small>${d.u}/㎡</small></div></div></div>`
 +`<div class="rcs"><div><span>소요량(예상)</span><b>${syf2(d.q)}<small>${d.u}</small></b><em>${hasA?d.k+'캔 ('+F(d.pk)+d.u+')':'면적 입력 필요'}</em></div><div><span>희석제 소요량</span><b>${syf2(d.tq)}<small>L</small></b><em>${d.t&&hasA?d.tk+'캔 ('+F(d.t.pk)+'L)':'-'}</em></div><div><span>총 소요량</span><b>${syJn(d.t?(d.u=='L'?{L:d.q+d.tq}:{[d.u]:d.q,L:d.tq}):{[d.u]:d.q})}</b></div></div></div></div>`;
 h+=`<div class="rcw sy-cost"><div class="rch">${syIc.drop}자재비 계산 결과 ${ttl}</div><div class="rcb"><div class="rcg">`
 +`<div class="rcc rth"><div class="rcl"><b>제품 금액</b></div><div class="rcv sy-m">${F(d.pa,0)}<small>원</small></div></div>`
 +`<div class="rcc rac"><div class="rcl"><b>희석제 금액</b></div><div class="rcv sy-m">${F(d.da,0)}<small>원</small></div></div></div>`
 +`<div class="sy-tot"><span>총 금액 <small>(제품 + 희석제)</small></span><b>${F(d.tot,0)}<small>원</small></b></div>`
 +((+d.c.price>0||+d.c.tprice>0)?'':'<div class="sy-e2">제품단가·희석제 단가를 입력하면 금액이 계산됩니다.</div>')+`</div></div>`;
 return h;
}

function syTotal(labs,D,ids,title){
 const Ds=ids.map(i=>[D[i],i]),ok=Ds.filter(x=>x[0].r).map(x=>x[0]),hd=`<div class="rch">${syIc.drop}${title}</div>`;
 if(!ok.length)return `<div class="rcw sy-sys">${hd}<div class="rcb"><div class="sy-e">도막두께(DFT)와 SVR 값이 있는 제품이 없어 합계를 계산할 수 없습니다.</div></div></div>`;
 const BU={};let tq=0,K=0,TK=0,pa=0,da=0,buy=0;
 ok.forEach(d=>{BU[d.u]=(BU[d.u]||0)+d.q;tq+=d.tq;K+=d.k;TK+=d.tk;pa+=d.pa;da+=d.da;buy+=d.buy});
 const TT=Object.assign({},BU);if(tq>0)TT.L=(TT.L||0)+tq;
 const noA=ok.every(d=>!(d.Ac>0));
 const I={drop:QS('<path d="M12 3c-3.4 4.3-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-2.6-6.7-6-11z"/>'),ck:QS('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),coin:QS('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/>'),can:QS('<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/>'),stk:QS('<ellipse cx="12" cy="6" rx="7" ry="2.8"/><path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6"/>')};
 let h=`<div class="rcw sy-sys">${hd}<div class="rcb">`
 +`<div class="sy-tiles"><div class="sy-tile t1"><i>${I.drop}</i><div><span>제품 합계 물량</span><b>${syJn(BU)}</b></div></div><div class="sy-tile t2"><i>${I.ck}</i><div><span>희석제 합계 물량</span><b>${syf2(tq)}<small>L</small></b></div></div><div class="sy-tile t3"><i>${I.coin}</i><div><span>총 금액</span><b style="font-size:${lbFs(F(pa+da,0))-1.5}px">${F(pa+da,0)}<small>원</small></b></div></div></div>`
 +`<div class="sy-sum3"><div><u>${I.drop}</u><span>총 소요량(제품+희석제)</span><b>${syJn(TT)}</b></div><div><u>${I.can}</u><span>환산 캔 수량</span><b>${K+TK}<small>캔</small></b><em>제품 ${K} · 희석제 ${TK}</em></div><div><u>${I.stk}</u><span>총 금액</span><b class="red" style="font-size:${lbFs(F(pa+da,0))}px">${F(pa+da,0)}<small>원</small></b></div></div>`+(()=>{const g0=SY.groups[(SY.layers[ids[0]]||{}).g];if(!g0)return '';const A0=+g0.area||+SY.area||0;return lbBlock(g0,A0,pa+da,'시스템 전체 1건')})();
 h+=`<div class="sy-rows">`+Ds.map(([d,i])=>{const k=syK(i),ic=`<i style="background:${syCol[k]}">${k+1}</i>`,t1=`<div class="sy-rm"><div class="sy-r1x"><b>${labs[i]}</b><span>${esc(d.c.n)}</span></div>`;return d.r?`<div class="sy-row" onclick="syAct(${i})">${ic}${t1}<div class="sy-r2x"><span>${syf2(d.q)}${d.u}${d.t?' + 희석제 '+syf2(d.tq)+'L':''}</span><span>${d.k}캔${d.t?' + '+d.tk+'캔':''}</span></div></div><b class="sy-ra">${F(d.tot,0)}원</b><s>›</s></div>`:`<div class="sy-row off">${ic}${t1}<div class="sy-r2x"><span>DFT·SVR 입력 필요</span></div></div></div>`}).join('')+`</div>`;
 if(noA)h+=`<div class="sy-e2 sy-hn">${syIc.layers}<span>기본면적을 입력하면 소요량·자재비가 계산됩니다</span></div>`;
 else h+=`<div class="sy-e2"><span class="sy-n1">캔 수량은 올림 환산이며, 금액은 ㎡당 소요량 비례(십원 미만 절사 · VAT 별도)입니다.</span>${buy>0?'<span class="sy-n2">캔 단위로 구매 시 약 <b>'+F(buy,0)+'원</b></span>':''}</div>`;
 h+=`</div></div>`;
 return h;
}

/* 입력 · 선택 동작 */
function syArea(v){SY.area=v;syS();syCalc()}
function syIn(i,k,v){if(!SY.layers[i])return;SY.layers[i][k]=v;syS();syCalc()}
function syAct(i){SY.act=SY.act==i?-1:i;syS();syRender();vib(20)}
function syReset(i){const c=SY.layers[i];if(!c)return;['dft','svr','loss','tr'].forEach(k=>{delete c[k]});syS();syRender();tt('제품의 추천값을 불러왔습니다')}
function syFold(g){const G=SY.groups[g];if(!G)return;G.c=G.c?0:1;syS();syRender();vib(15)}
function syAdd(){syPick(-1)}
function syNew(){syPick(-1)}
function syGa(g,v){if(!SY.groups[g])return;SY.groups[g].area=v;syS();syCalc()}
function syDel(){if(!SY.layers.length)return tt('삭제할 제품이 없습니다');const n=SY.layers.length,lb=syLb()[n-1];ask('마지막 코트('+lb+')를 삭제할까요?',()=>{SY.layers.pop();syNorm();syS();syRender()})}
function syQuote(sel){if(!SY.layers.length)return tt('견적서를 만들 제품을 먼저 추가하세요');
 if(!Array.isArray(sel)){if(SY.groups.length>1)return syOutPick('quote');sel=[0]}
 const E=esS();E.sy=1;E.pq=0;E.syg=sel.slice();E.hid=E.hid||{};Object.keys(E.hid).forEach(x=>{if(x[0]=='s')delete E.hid[x]});sv();window.ESRP=0;est()}
function syOutPick(kind){
 const G=syGr();let e=$('#syout');if(e)e.remove();
 e=document.createElement('div');e.id='syout';e.className='sypk';e.onclick=ev=>{if(ev.target===e)e.remove()};
 e.innerHTML=`<div class="sypk-b syo"><div class="sypk-h"><b>${kind=='quote'?'견적서':'공유'}할 시스템 선택</b><span>${G.length}개</span></div><div class="sypk-hint">출력할 시스템을 고르세요. 여러 개를 고르면 시스템별로 구분해서 출력합니다.</div><div class="syo-l">${G.map((g,k)=>`<label class="syo-i"><input type="checkbox" value="${k}" checked><span class="sy-sgn">${k+1}</span><b>${esc(g.name)}</b><small>${g.idx.length}개 제품</small></label>`).join('')}</div><div class="sypk-f"><button onclick="$('#syout').remove()">취소</button><button class="ok" onclick="syOutGo('${kind}')">확인</button></div></div>`;
 document.body.append(e)}
function syOutGo(kind){const sel=[...document.querySelectorAll('#syout input:checked')].map(i=>+i.value);if(!sel.length)return tt('시스템을 1개 이상 선택하세요');$('#syout').remove();kind=='quote'?syQuote(sel):syDoShare(sel)}
function syShareG(g){syDoShare([g])}
function syClr(){ask('도장 시스템의 모든 입력 내용을 지울까요?',()=>{SY={area:'',layers:[],groups:[],act:-1};syS();syRender()})}
function syDelG(g){const G=SY.groups[g];if(!G)return;ask('‘'+esc(G.name)+'’ 시스템을 삭제할까요?<br><small>이 시스템의 제품 '+SY.layers.filter(l=>l.g==g).length+'개가 함께 삭제됩니다 (저장된 시스템 목록은 유지)</small>',()=>{SY.layers=SY.layers.filter(l=>l.g!=g);syNorm();syS();syRender()})}

/* v269: 제품 선택 시트 · 저장된 시스템 시트 · 시스템 카드 직접 구성 */
const SYST=['하도','중도','상도'],syRk=x=>{const k=SYST.indexOf(x);return k<0?3:k};
let SYQ={g:-1,name:'',st:'하도',q:'',mf:'all',lim:60,n:0,draft:true,items:[]},SYLC={};
const syNm=()=>'시스템 '+(syLibGet().length+1);
function syAh(){try{const p=document.querySelector('#v3 .syp'),a=p&&p.querySelector(':scope>.sy-card:first-child');if(a)p.style.setProperty('--ah',a.offsetHeight+'px')}catch(e){}}
window.addEventListener('resize',()=>setTimeout(syAh,50));
function syClose(){window.SYLCC=null;const e=$('#sypk');if(e)e.remove()}
function syGn(g,v){const G=SY.groups[g];if(!G)return;G.name=v;syS();syCalc()}
function syLccSel(g,v){if(!SY.groups[g])return;SY.groups[g].lr=v;syS();syRender()}
function syToLcc(g){const G=SY.groups[g];if(!G)return;const r=G.lr||'cur',nm={cur:'기존',base:'범용',rec:'추천'}[r];
 if(!SY.layers.some(l=>l.g==g))return tt('보낼 제품이 없습니다');
 let an='';try{an=LCCX.diagInfo().n||''}catch(e){}
 try{LCCX.applySys(r,g);tt('LCC '+nm+' 사양으로 보냈습니다'+(an?'<br><small>'+esc(String(an).slice(0,18))+'</small>':''))}catch(e){console.error(e);tt('LCC로 보내지 못했습니다')}}
function syGSave(g,btn){const G=SY.groups[g];if(!G)return;const LB=syLb(),items=[];SY.layers.forEach((l,i)=>{if(l.g==g)items.push(Object.assign({n:l.n,lb:LB[i]=='미지정'?'':LB[i]},['price','tprice','dft','svr','loss','tr'].reduce((o,k)=>{if(l[k]!==undefined&&l[k]!=='')o[k]=l[k];return o},{})))});
 const nm=(G.name||'').trim()||('시스템 '+(g+1)),A=syLibGet(),it={name:nm,ts:Date.now(),items},k=A.findIndex(x=>x.name==nm);if(k>=0)A[k]=it;else A.unshift(it);syLibSet(A);try{syLibPage()}catch(e){}vib(20);
 if(btn){const o=btn.textContent;btn.textContent='저장됨 ✓';setTimeout(()=>{try{btn.textContent=o}catch(e){}},1500)}
 if(window.LCCEDIT&&window.LCCEDIT.g===g){const q=window.LCCEDIT;window.LCCEDIT=null;try{LCCX.applySys(q.r,g);tt('LCC 사양에 반영했습니다')}catch(e){console.error(e)}setTimeout(()=>navGo('lcc'),450)}}
function syLbL(i,x){const l=SY.layers[i];if(!l)return;const LB=syLb();l.lb=LB[i]==x?'':x;syS();syRender()}
function syMvL(i,d){const L=SY.layers,l=L[i];if(!l)return;let j=i+d;while(j>=0&&j<L.length&&L[j].g!=l.g)j+=d;if(j<0||j>=L.length)return;[L[i],L[j]]=[L[j],L[i]];SY.act=j;syS();syRender()}
function syRmL(i){const L=SY.layers;if(!L[i])return;L.splice(i,1);SY.act=-1;syNorm();syS();syRender()}
/* 제품 선택 시트 */
function syPick(g,st){
 const gi=(typeof g==='number'&&g>=0&&SY.groups[g])?g:-1;
 const miss=gi<0?'하도':(SYST.find(x=>!SY.layers.some((l,i)=>l.g==gi&&syLb()[i]==x))||'');
 SYQ={g:gi,name:gi<0?syNm():SY.groups[gi].name,st:st!==undefined?st:miss,q:'',mf:'all',lim:60,n:0,draft:gi<0,items:[]};
 let e=$('#sypk');if(e)e.remove();
 e=document.createElement('div');e.id='sypk';e.className='sypk';e.onclick=ev=>{if(ev.target===e)syPickEnd()};
 const mfs=[...new Set(DB.map(p=>p.mf||'미지정'))].sort();
 e.innerHTML=`<div class="sypk-b sypk-v2"><div class="sypk-h"><b>${gi<0?'시스템 추가':'시스템 변경'}</b><button class="sypk-x" onclick="syClose()" aria-label="닫기">✕</button></div><div class="sypk-nm"><label for="sypk-n">시스템 이름</label><input id="sypk-n" value="${esc(SYQ.name)}" placeholder="예: 3mm 방수 시스템" oninput="syPickNm(this.value)"></div><div id="syq-st" class="syq-st"></div><div id="syq-sel" class="syq-sel"></div><div class="sypk-r"><input id="sypk-q" type="search" placeholder="제품명 · 제조사 · 용도 검색" oninput="SYQ.q=this.value;SYQ.lim=60;syPickUi()"><select id="sypk-m" onchange="SYQ.mf=this.value;SYQ.lim=60;syPickUi()"><option value="all">제조사 전체</option>${mfs.map(m=>`<option>${esc(m)}</option>`).join('')}</select></div><div class="sypk-sc"><div id="sypk-l" class="sypk-l"></div></div><div class="sypk-f one"><button class="ok" id="syq-ok" onclick="${gi<0?'syDraftSave()':'syPickEnd()'}">${gi<0?'시스템 저장':'완료'}</button></div></div>`;
 document.body.append(e);syPickUi();
}
function syPickNm(v){SYQ.name=v;if(!SYQ.draft&&SYQ.g>=0&&SY.groups[SYQ.g]){SY.groups[SYQ.g].name=v;syS()}}
function syPickSt(x){SYQ.st=SYQ.st==x?'':x;syPickUi()}
function syPickUi(){
 const t=$('#syq-st');if(t)t.innerHTML='<span>추가할 단계</span>'+SYST.map(x=>`<button class="${SYQ.st==x?'on':''}" onclick="syPickSt('${x}')">${x}</button>`).join('')+`<button class="${SYQ.st===''?'on':''}" onclick="syPickSt('')">구분 없음</button>`;
 const l=$('#sypk-l');if(!l)return;
 const q=SYQ.q.trim().toLowerCase(),A=DB.filter(p=>(SYQ.mf=='all'||(p.mf||'미지정')==SYQ.mf)&&(!q||(p.n+' '+(p.g||'')+' '+(p.us||'')+' '+(p.mf||'')).toLowerCase().includes(q))),sh=A.slice(0,SYQ.lim),sc=l.parentNode?l.parentNode.scrollTop:0;
 l.innerHTML=sh.map(p=>{const j=DB.indexOf(p),c=SYQ.draft?SYQ.items.filter(x=>x.n==p.n).length:(SYQ.g>=0?SY.layers.filter(x=>x.g==SYQ.g&&x.n==p.n).length:0);return `<div class="sypk-i ${c?'on':''}" onclick="syPickAdd(${j})"><span class="sypk-ck">${c?(c>1?'×'+c:'✓'):'＋'}</span><span class="sypk-t"><b>${esc(p.n)}</b><small>${esc(p.g||p.us||'')}</small></span>${p.mf?`<span class="sy-mf">${esc(p.mf)}</span>`:''}</div>`}).join('')+(A.length>sh.length?`<button class="sypk-more" onclick="SYQ.lim+=60;syPickUi()">더 보기 (${A.length-sh.length}개 남음)</button>`:'')+(A.length?'':'<div class="sypk-e">일치하는 제품이 없습니다</div>');
 if(l.parentNode)l.parentNode.scrollTop=sc;
 const ok=$('#syq-ok');if(ok)ok.textContent=SYQ.draft?('시스템 저장'+(SYQ.items.length?' ('+SYQ.items.length+'개 제품)':'')):(SYQ.n?'완료 ('+SYQ.n+'개 추가됨)':'완료');
 const sl=$('#syq-sel');if(sl){sl.innerHTML=SYQ.draft?(SYQ.items.length?SYQ.items.map((x,k)=>`<div class="syq-r"><i style="background:${syCol[k%syCol.length]}">${k+1}</i><b>${esc(x.lb||'구분 없음')}</b><span>${esc(x.n)}</span><button onclick="syDraftRm(${k})" aria-label="제거">✕</button></div>`).join(''):'<div class="syq-e">아래 제품을 눌러 시스템에 담으세요</div>'):''}
}
function syPickAdd(j){
 const p=DB[j];if(!p)return;
 if(SYQ.draft){const r0=syRk(SYQ.st||''),it=SYQ.items;let at=-1;it.forEach((x,i)=>{if(syRk(x.lb||'')<=r0)at=i});it.splice(at+1,0,{n:p.n,lb:SYQ.st||''});SYQ.n++;if(SYQ.st=='하도')SYQ.st='중도';else if(SYQ.st=='중도')SYQ.st='상도';vib(15);syPickUi();return}
 let gi=SYQ.g;
 if(gi<0){gi=SY.groups.length;SY.groups.push({name:(SYQ.name||'').trim()||syNm(),area:'',c:0});SYQ.g=gi}
 const lb=SYQ.st||'',r=syRk(lb),L=SY.layers,LB=syLb();let at=-1,first=-1;
 L.forEach((l,i)=>{if(l.g!=gi)return;if(first<0)first=i;if(syRk(LB[i]=='미지정'?'':LB[i])<=r)at=i});
 const pos=at>=0?at+1:(first>=0?first:L.length);
 L.splice(pos,0,{n:p.n,lb,g:gi});SY.act=-1;syNorm();syS();
 SYQ.n++;if(SYQ.st=='하도')SYQ.st='중도';else if(SYQ.st=='중도')SYQ.st='상도';
 vib(15);syPickUi();syRender();
}
function syPickEnd(){syClose();syRender();vib(20)}
function syDraftRm(k){SYQ.items.splice(k,1);syPickUi()}
function syDraftSave(){
 if(!SYQ.items.length){const sl=$('#syq-sel');if(sl)sl.innerHTML='<div class="syq-e" style="color:#c9252f;font-weight:800">제품을 1개 이상 선택하세요</div>';return}
 const nm=(SYQ.name||'').trim()||syNm(),A=syLibGet(),it={name:nm,ts:Date.now(),items:SYQ.items.map(x=>({n:x.n,lb:x.lb}))},k=A.findIndex(x=>x.name==nm);
 if(k>=0)A[k]=it;else A.unshift(it);syLibSet(A);vib(30);syClose();syLibSheet()}
function syChg(){
 const G=syGr();if(!G.length)return tt('변경할 시스템이 없습니다<br><small>‘저장된 시스템’에서 불러오세요</small>');
 if(G.length==1)return syPick(0);
 let e=$('#sypk');if(e)e.remove();
 e=document.createElement('div');e.id='sypk';e.className='sypk';e.onclick=ev=>{if(ev.target===e)syClose()};
 e.innerHTML=`<div class="sypk-b sypk-v2"><div class="sypk-h"><b>변경할 시스템 선택</b><button class="sypk-x" onclick="syClose()" aria-label="닫기">✕</button></div><div class="sypk-sc"><div class="syl-ls">${G.map((g,k)=>`<div class="syl-c"><div class="syl-t"><b>${esc(g.name)}</b><span class="bdg b">${g.idx.length}개 제품</span></div><div class="syl-bt"><button class="ok" onclick="syPick(${k})">변경</button><button class="rd" onclick="syClose();syDelG(${k})">삭제</button></div></div>`).join('')}</div></div><div class="sypk-f one"><button class="ok" onclick="syClose()">닫기</button></div></div>`;
 document.body.append(e)}
/* 저장된 시스템 시트 */
let SYL2={k:'all',mn:-1};
function syLibSheet(){
 SYLC={};SYL2={k:'all',mn:-1};let e=$('#sypk');if(e)e.remove();
 e=document.createElement('div');e.id='sypk';e.className='sypk';e.onclick=ev=>{if(ev.target===e)syClose()};
 e.innerHTML=`<div class="sypk-b sypk-v2 sylb"><div class="sl-hero"><button class="sl-x" onclick="syClose()" aria-label="닫기">✕</button><span class="sl-lg">${syIx.layers}코트 온</span><b class="sl-tt">저장된 시스템</b><small>등록한 도장 시스템을 불러오거나 관리할 수 있습니다.</small><button class="sl-reg" onclick="syEdOpen(-1)">${syIx.plus}<span>사용자등록</span></button></div><div class="sl-bd"><div class="lc-sr"><label class="lc-s"><span>${syIx.search}</span><input id="syl-q" type="search" placeholder="시스템 이름 또는 제품명 검색" oninput="SYL2.mn=-1;syLibUi()" enterkeyhint="search"></label><label class="lc-f">${syIx.filter}<span id="lc-fl">필터</span><select id="lc-fs" onchange="syLib2F(this.value)" aria-label="필터"></select></label></div><div id="lc-pl" class="lc-pl"></div><div class="sypk-sc"><div id="syl-l" class="syl-ls lc-ls"></div></div></div></div>`;
 document.body.append(e);syLibUi();
}
function syPhResize(f,cb){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const r=Math.min(1,360/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*r));c.height=Math.max(1,Math.round(im.height*r));c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.74))};im.onerror=()=>tt('이미지를 불러오지 못했습니다');im.src=fr.result};fr.readAsDataURL(f)}
function syPhoto(k,inp){const f=inp.files&&inp.files[0];if(!f)return;syPhResize(f,u=>{const A=syLibGet();if(!A[k])return;A[k].photo=u;try{LS.syl=JSON.stringify(A)}catch(e){tt('저장 공간이 부족해 사진을 저장하지 못했습니다');return}syLibUi();try{syLibPage()}catch(_){}})}
function syPhotoX(k){const A=syLibGet();if(!A[k])return;delete A[k].photo;syLibSet(A);syLibUi();try{syLibPage()}catch(_){}}
function syEdPhoto(inp){const f=inp.files&&inp.files[0];if(!f)return;syPhResize(f,u=>{if(SYE){SYE.e.photo=u;syEdUi()}})}
function syLib2F(k){SYL2.k=SYL2.k==k&&k!='all'?'all':k;SYL2.mn=-1;syLibUi()}
function syLib2Mn(k,ev){if(ev)ev.stopPropagation();SYL2.mn=SYL2.mn===k?-1:k;syLibUi()}
function syLibUi(){
 const b=$('#syl-l');if(!b)return;const A=syLibGet(),q=(($('#syl-q')||{}).value||'').trim().toLowerCase(),K=SYL2.k;
 const hit=x=>K=='all'||(K=='basic'?x.basic:K=='fav'?x.fav:K=='spec'?x.spec:K=='est'?(x.use||'est')=='est':K=='lcc'?x.use=='lcc':(x.env==K||x.sub==K));
 const R=A.map((x,k)=>[x,k]).filter(([x])=>hit(x)&&(!q||(x.name+' '+(x.scope||'')+' '+x.items.map(i=>i.n+' '+(i.alt||[]).map(a=>a.n).join(' ')).join(' ')).toLowerCase().includes(q)));
 const pl=$('#lc-pl');if(pl){const P=(k,t)=>`<button type="button" class="${K==k?'on':''}" onclick="syLib2F('${k}')">${t}</button>`;pl.innerHTML=P('all','전체 ('+A.length+')')+P('basic','기본')+P('est','견적용')+P('lcc','LCC용')+['C2','C3','C4','C5','CX'].map(c=>P(c,c)).join('')}
 const fs=$('#lc-fs');if(fs){const O=[['all','전체'],['basic','기본'],['est','견적용'],['lcc','LCC용'],['spec','사양서'],['fav','즐겨찾기'],['철재','철재'],['콘크리트','콘크리트'],['옥상','옥상']];fs.innerHTML=O.map(([v,t])=>`<option value="${v}"${K==v?' selected':''}>${t}</option>`).join('')+(O.some(o=>o[0]==K)?'':`<option value="${K}" selected>${K}</option>`)}
 const cl={'하도':'c1','중도':'c2','상도':'c3'};
 const card=([x,k])=>{const rows=syLibRows(x),tot=rows.reduce((a,r)=>a+(r.w?0:r.d),0),show=rows.slice(0,4),more=rows.length-show.length,ty=x.spec?'사양서':x.basic?'기본':'일반';
  const us=x.use=='lcc'?'LCC용':'견적용',tg=x.basic?`<em class="lc-bd">${syIx.star}기본 사양</em>`:`<em class="lc-bd u${x.use=='lcc'?1:0}">${us}</em>`;
  return `<div class="lc-c${x.basic?' bs':''}"><label class="lc-th${x.photo?'':' e'}">${x.photo?`<img src="${x.photo}" alt="">`:`<span class="lc-ph">${syIx.cam}<small>사진 등록</small></span>`}<input type="file" accept="image/*" onchange="syPhoto(${k},this)" aria-label="사진 등록">${tg}${x.photo?`<button type="button" class="lc-px" aria-label="사진 삭제" onclick="event.preventDefault();event.stopPropagation();syPhotoX(${k})">✕</button>`:''}</label>
  <div class="lc-in"><div class="lc-tl"><b>${esc(x.name)}</b>${x.fav?`<span class="lc-fv">${syIx.heart}</span>`:''}</div>
  <div class="lc-m"><i class="lc-ty ${x.spec?'sp':''}">${x.spec?'사양서':us}</i><span>${esc(x.env||'--')}</span><span>${syIx.layers}${esc(x.sub||'-')}</span><span class="lc-sc">${syIx.shield}${esc(x.scope?x.scope:(x.life?x.life+'년':'-'))}</span></div>
  <div class="lc-bx"><div class="lc-rw">${show.map((r,j)=>`<div><em class="${cl[r.lb]||'c0'}">${esc(r.lb||'코트')}</em><span>${esc(r.n)}${r.a?' 외 '+r.a:''} · ${r.d?syFmtD(r.d):'-'}${r.c>1?'×'+r.c:''}${r.w?' (조건부)':''}</span></div>`).join('')||'<small>구성 없음</small>'}${more>0?`<small class="lc-mo">외 ${more}개 코트</small>`:''}</div><div class="lc-tt"><small>총 도막두께</small><b>${tot?syFmtT(tot):'-'}</b></div></div></div>
  <div class="lc-ac"><button type="button" class="u" onclick="syLibUse(${k})">${syIx.file}<span>${SYLC[k]?'✓ 불러옴 ×'+SYLC[k]:'불러오기'}</span></button><button type="button" class="e" onclick="syEdOpen(${k})">${syIx.edit}<span>수정</span></button><button type="button" class="d" onclick="syLib2Mn(${k},event)" aria-label="메뉴">⋮</button></div>
  ${SYL2.mn===k?`<div class="lc-mn"><button type="button" onclick="SYL2.mn=-1;syLibCopy(${k});syLibUi()">복사</button><button type="button" onclick="SYL2.mn=-1;syLibFav(${k});syLibUi()">${x.fav?'즐겨찾기 해제':'즐겨찾기'}</button><button type="button" onclick="SYL2.mn=-1;syLibUi();syLibView(${k})">보기</button></div>`:''}</div>`};
 b.innerHTML=R.length?R.map(card).join(''):`<div class="qhn0">${A.length?'검색 결과가 없습니다':'저장된 시스템이 없습니다<br><small>‘사용자등록’ 또는 ‘PDF등록’으로 시작하세요</small>'}</div>`;
}
const syNU=t=>{const m=String(t).match(/^([\d.,]+)(.*)$/);return m?`<b class="nu">${m[1]}</b><i class="un">${m[2]}</i>`:t};
let SYSEL={};
function syLibFl(){const n=Object.keys(SYSEL).length,B=n?`<i class="n">${n}</i>`:'';
const b=(c,fn,lab,d,badge)=>`<button type="button" class="${c}" onclick="${fn}" aria-label="${lab}" title="${lab}">${SV(d)}<span>${lab}</span>${badge||''}</button>`;
return b('p','syLibUseSel()','불러오기','<path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14"/>',B)
+b('rg','syRegMenu(this)','등록','<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M12 18v-6M9.5 14.5 12 12l2.5 2.5"/>')
+b('ed','syLibEditSel()','사양수정','<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>')
+b('dl','syLibDelSel()','사양삭제','<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13M10 11v6M14 11v6"/>')
+b('rd',"syLibReset('all')",'초기화','<path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v5h5"/>')}
function syLibEditSel(){const A=syLibGet(),ix=A.map((x,i)=>SYSEL[x.name]?i:-1).filter(i=>i>=0);if(!ix.length)return tt('수정할 사양을 체크하세요');if(ix.length>1)return tt('수정은 사양 1개만 체크하세요');syEdOpen(ix[0])}
function syLibSel(k,on,el){const x=syLibGet()[k];if(!x)return;if(on)SYSEL[x.name]=1;else delete SYSEL[x.name];const c=el&&el.closest('.lb-c');if(c)c.classList.toggle('sel',!!on);const f=$('#lb-fl');if(f)f.innerHTML=syLibFl()}
function syLibUseSel(){const A=syLibGet(),ix=A.map((x,i)=>SYSEL[x.name]?i:-1).filter(i=>i>=0);if(!ix.length)return tt('불러올 사양을 체크하세요');SYSEL={};if(ix.length==1)return syLibUse(ix[0]);ix.forEach(i=>syApplySys(A[i],{},i));tt(ix.length+'개 사양을 불러왔습니다')}
function syLibDelSel(){const A=syLibGet(),ix=A.filter(x=>SYSEL[x.name]);if(!ix.length)return tt('삭제할 사양을 체크하세요');ask('체크한 <b>사양 '+ix.length+'개</b>를 삭제할까요?',()=>{syLibSet(A.filter(x=>!SYSEL[x.name]));SYSEL={};SYLC={};syLibUi();try{syLibPage()}catch(e){}spfGc();tt('삭제했습니다')})}
function syLibReset(m){const A=syLibGet(),n=m=='all'?A.length:A.filter(x=>x.spec).length;if(!n)return tt('삭제할 사양이 없습니다');ask(m=='all'?'사양 DB의 <b>모든 사양 '+n+'개</b>를 삭제(초기화)할까요?<br><small>삭제 후에는 복구할 수 없습니다. 먼저 백업을 권장합니다.</small>':'<b>도장사양서에서 가져온 사양 '+n+'개</b>를 삭제할까요?<br><small>직접 등록한 사양은 유지됩니다.</small>',()=>{syLibSet(m=='all'?[]:A.filter(x=>!x.spec));SYSEL={};SYLC={};syLibUi();try{syLibPage()}catch(e){}spfGc();tt('삭제했습니다')})}
function syLibDel(k){const A=syLibGet(),x=A[k];if(!x)return;ask('저장된 시스템 ‘'+esc(x.name)+'’을(를) 목록에서 삭제할까요?',()=>{delete SYSEL[x.name];A.splice(k,1);syLibSet(A);SYLC={};syLibUi();try{syLibPage()}catch(e){}spfGc()})}

/* ===== v455 시스템 라이브러리 (목록·검색·필터·수정·복사·템플릿) ===== */
const SYENV={C2:'낮은 부식',C3:'중간 부식',C4:'높은 부식',C5:'매우높은 부식',CX:'극한 부식'},SYSUB=['철재','콘크리트','옥상'];
const SYTPL=[
 {name:'[기본] C5 중방식 철재',env:'C5',sub:'철재',life:12,items:[{lb:'하도',n:'에폭시 징크리치',dft:75},{lb:'중도',n:'에폭시 MIO',dft:125},{lb:'상도',n:'폴리우레탄',dft:60}]},
 {name:'[기본] C3 일반 철재',env:'C3',sub:'철재',life:18,items:[{lb:'하도',n:'에폭시 징크리치',dft:75},{lb:'중도',n:'에폭시 MIO',dft:100},{lb:'상도',n:'폴리우레탄',dft:55}]},
 {name:'옥상 방수 시스템',env:'',sub:'옥상',life:25,items:[{lb:'하도',n:'수용성 프라이머',dft:100},{lb:'중도',n:'우레탄 방수',dft:1000},{lb:'상도',n:'우레탄 상도',dft:500}]},
 {name:'콘크리트 외벽 재도장',env:'C3',sub:'콘크리트',life:18,items:[{lb:'하도',n:'수성 에폭시',dft:40},{lb:'중도',n:'아크릴 중도',dft:60},{lb:'상도',n:'아크릴 상도',dft:20}]}];
let SYF={k:'all',q:''},SYE=null;
const syIx={
 edit:SV('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
 copy:SV('<rect x="8.5" y="8.5" width="11" height="11" rx="2.2"/><path d="M15.5 8.5V6.2a2 2 0 0 0-2-2H6.2a2 2 0 0 0-2 2v7.3a2 2 0 0 0 2 2h2.3"/>'),
 layers:SV('<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>'),
 star:SV('<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 8.2l1.2 2.5 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z"/>'),
 heart:SV('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>'),
 filter:SV('<path d="M3 5h18l-7 8.5V20l-4-2v-4.5z"/>'),
 search:SV('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
 shield:SV('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>'),
 globe:SV('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 3.6 5.2 3.6 8.5S14.6 18 12 20.5M12 3.5C9.4 5.9 8.4 8.7 8.4 12s1 6.1 3.6 8.5"/>'),
 plus:SV('<path d="M12 5v14M5 12h14"/>'),
 file:SV('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
 steel:SV('<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>'),
 conc:SV('<path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6M8 11h.01M16 11h.01"/>'),
 roof:SV('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-5h4v5"/>')};
syIx.cam=SV('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>');
const syFmtT=t=>t>=1000?(+(t/1000).toFixed(2))+'<small>mm</small>':Math.round(t)+'<small>μm</small>';
const syFmtD=d=>d>=1000?(+(d/1000).toFixed(2))+'mm':Math.round(d)+'μm';
const syLibRows=x=>(x.items||[]).map(i=>{const p=PX(i.n),d=(i.dft!==undefined&&i.dft!==''?+i.dft:(p?+p.dft:0))||0;const c=+i.cnt>1?+i.cnt:1;return{lb:i.lb||'',n:i.n,d:d*c,c,a:(i.alt||[]).length,w:i.when?1:0}});
const syEnvTxt=x=>x.env?x.env+' ('+(SYENV[x.env]||'')+')':(x.sub=='옥상'?'옥상 (자외선/온도변화)':(x.sub||'-'));
function syThumb(x){const s=x.sub||'철재',c=s=='옥상'?['#8fc4ee','#e9eef6','#c8d3e2']:s=='콘크리트'?['#9ec3ec','#f1f4f9','#b7c4d8']:['#a8c8ea','#dfe7f3','#5f7ea6'];
 const g=s=='옥상'?'<rect x="0" y="62" width="138" height="32" fill="#dfe6ef"/><path d="M0 62h138" stroke="#b7c4d8"/><rect x="10" y="40" width="10" height="22" fill="#6f87ab"/><rect x="24" y="30" width="12" height="32" fill="#7d94b6"/><rect x="42" y="44" width="9" height="18" fill="#8aa0c0"/>':s=='콘크리트'?'<rect x="34" y="8" width="70" height="86" fill="#f4f7fb" stroke="#b7c4d8"/>'+[0,1,2,3,4].map(r=>[0,1,2].map(q=>`<rect x="${42+q*21}" y="${16+r*16}" width="12" height="9" fill="#9fb8dc"/>`).join('')).join(''):'<path d="M28 90V30M60 90V30M92 90V30M110 90V30M20 38h100M20 62h100M28 30l32 32M60 30l32 32M60 62L28 90M92 62L60 90" stroke="#4c6a93" stroke-width="3.5" fill="none"/>';
 return `<div class="sl-th"><svg viewBox="0 0 138 94" preserveAspectRatio="xMidYMid slice"><rect width="138" height="94" fill="${c[0]}"/><rect y="70" width="138" height="24" fill="${c[1]}" opacity=".7"/>${g}</svg></div>`}
function syLibList(){
 const A=syLibGet(),q=(SYF.q||'').trim().toLowerCase(),k=SYF.k;
 return A.map((x,i)=>[x,i]).filter(([x])=>(k=='all'||(k=='basic'?x.basic:k=='fav'?x.fav:k=='spec'?x.spec:(x.env==k||x.sub==k)))&&(!q||(x.name+' '+(x.scope||'')+' '+(x.items||[]).map(i=>i.n+' '+(i.alt||[]).map(a=>a.n).join(' ')).join(' ')+' '+(x.env||'')+' '+(x.sub||'')).toLowerCase().includes(q)));
}
const lbIx={
 cloud:SV('<path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.8 4.8 0 0 1 .5 9.5z"/>'),
 up:SV('<path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.8 4.8 0 0 1 .5 9.5"/><path d="M12 20v-7M9 15.5l3-3 3 3"/>'),
 dots:SV('<circle cx="12" cy="5.5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="18.5" r="1.4"/>'),
 star:SV('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>')};
function syLibMn(k,ev){if(ev)ev.stopPropagation();SYF.mn=SYF.mn===k?-1:k;syLibPage()}
function syLibFav(k){const A=syLibGet();if(!A[k])return;A[k].fav=!A[k].fav;syLibSet(A);SYF.mn=-1;syLibPage()}
function syLibFo(){SYF.fo=!SYF.fo;syLibPage()}
function syLibPage(){
 const e=$('#sylib');if(!e)return;const A=syLibGet(),R=syLibList(),fo=document.activeElement&&document.activeElement.id=='sl-q',pos=fo?document.activeElement.selectionStart:0;
 if(SYF.mn===undefined)SYF.mn=-1;
 const pill=(k,t,ic)=>`<button type="button" class="${SYF.k==k?'on':''}" onclick="SYF.mn=-1;syLibF('${k}')">${ic?ic:''}${t}</button>`;
 const card=([x,k])=>{const rows=syLibRows(x),tot=rows.reduce((a,r)=>a+(r.w?0:r.d),0),tg=x.spec?['사양서']:['견적 · LCC'];if(x.env)tg.push('ISO 12944');
  const show=rows.slice(0,6),more=rows.length-show.length;
  return `<div class="lb-c${x.basic?' bs':''}${SYSEL[x.name]?' sel':''}">${x.basic?`<div class="lb-bd">${lbIx.star}기본 사양</div>`:x.spec?`<div class="lb-bd sp">${lbIx.star}사양서</div>`:''}
  <div class="lb-th"><label class="lb-ck"><input type="checkbox" ${SYSEL[x.name]?'checked':''} onchange="syLibSel(${k},this.checked,this)" aria-label="사양 선택"><i></i></label>${ndSpPh(x)}<div class="lb-tx"><b class="lb-nm">${esc(x.name)}</b>${ndSpTags(x)}</div>${x.fav?`<span class="lb-fv">${syIx.heart}</span>`:''}<button type="button" class="lb-dt" onclick="syLibMn(${k},event)" aria-label="메뉴">${lbIx.dots}</button></div>
  ${SYF.mn===k?`<div class="lb-mn"><button type="button" onclick="SYF.mn=-1;syEdOpen(${k})">수정</button><button type="button" onclick="SYF.mn=-1;syLibCopy(${k})">복사</button><button type="button" onclick="syLibFav(${k})">${x.fav?'즐겨찾기 해제':'즐겨찾기'}</button><button type="button" onclick="SYF.mn=-1;syLibPage();syLibView(${k})">보기</button><button type="button" class="rd" onclick="SYF.mn=-1;syLibDel(${k})">삭제</button></div>`:''}
  <div class="lb-m"><span>${lbIx.cloud}<small>환경등급</small><b>${esc(x.env||'--')}</b></span><span>${syIx.layers}<small>기재</small><b>${esc(x.sub||'-')}</b></span><span>${syIx.shield}<small>예상 내구성</small><b>${x.life?x.life+'년':'-'}</b></span></div>
  ${x.scope?`<div class="lb-sc">${esc(x.scope)}</div>`:''}
  <div class="lb-b"><div class="lb-sy"><b>${syIx.layers}도장 시스템</b>${show.map((r,j)=>`<div class="lb-r"><u class="lb-n">${j+1}</u><em>${esc(r.lb||['하도','중도','상도'][j]||'코트')}</em><span>${esc(r.n)}${r.a?' 외 '+r.a:''}${r.c>1?'×'+r.c:''}${r.w?' (조건부)':''}</span>${r.d?`<span class="lb-d">${syNU(syFmtD(r.d))}</span>`:''}</div>`).join('')||'<small>구성 없음</small>'}${more>0?`<div class="lb-more">외 ${more}개 코트</div>`:''}</div>
  <div class="lb-tt"><small>총 도막두께</small><b>${tot?syNU(syFmtD(tot)):'-'}</b><div class="lb-tg">${tg.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div></div></div>`};
/* v488 검색 입력 중에는 입력칸을 다시 만들지 않고 목록만 갱신 → 한글 조합(IME) 유지 */
 if(SYF.qo){SYF.qo=0;const ls=e.querySelector('.lb-ls');if(ls){ls.innerHTML=R.length?R.map(card).join(''):`<div class="sl-em">${A.length?'조건에 맞는 시스템이 없습니다':'저장된 시스템이 없습니다<br><small>‘PDF등록’·‘일괄등록’으로 가져오거나 ‘사용자등록’으로 시작하세요</small>'}</div>`;return}}
 e.innerHTML=`<div class="lb-sr"><label class="lb-s"><span>${syIx.search}</span><input id="sl-q" type="search" placeholder="사양명 또는 제품명 검색" value="${esc(SYF.q)}" oninput="SYF.q=this.value;SYF.mn=-1;SYF.qo=1;syLibPage()" enterkeyhint="search"></label><button type="button" class="lb-f${SYF.fo?' on':''}" onclick="syLibFo()">${syIx.filter}<span>필터</span></button></div>
 <div class="lb-pl">${pill('all','전체')}${pill('basic','기본')}${pill('spec','사양서')}${pill('fav','즐겨찾기')}${['C2','C3','C4','C5','CX'].map(c=>pill(c,c)).join('')}</div>${SYF.fo?`<div class="lb-pl s2">${pill('철재','철재',syIx.steel)}${pill('콘크리트','콘크리트',syIx.conc)}${pill('옥상','옥상',syIx.roof)}</div>`:''}
 <div class="lb-ls">${R.length?R.map(card).join(''):`<div class="sl-em">${A.length?'조건에 맞는 시스템이 없습니다':'저장된 시스템이 없습니다<br><small>‘PDF등록’·‘일괄등록’으로 가져오거나 ‘사용자등록’으로 시작하세요</small>'}</div>`}</div>
 <div class="lb-fl" id="lb-fl">${syLibFl()}</div>`;
 if(fo){const q=$('#sl-q');if(q){q.focus();try{q.setSelectionRange(pos,pos)}catch(_){}}}
}
function syLibF(k){SYF.k=SYF.k==k&&k!='all'?'all':k;syLibPage()}
function syLibTap(ev,k){if(ev.target.closest('button'))return;syLibUse(k);try{const a=document.querySelector('#v3 .sy-ar');a&&a.scrollIntoView({behavior:'smooth',block:'start'})}catch(_){}}
function syLibCopy(k){const A=syLibGet(),x=A[k];if(!x)return;const c=JSON.parse(JSON.stringify(x));let nm=x.name+' (복사)',n=1;while(A.some(a=>a.name==nm)){n++;nm=x.name+' (복사'+n+')'}c.name=nm;c.ts=Date.now();c.basic=false;A.unshift(c);syLibSet(A);syLibPage();tt('시스템을 복사했습니다');vib(20)}
/* 수정/추가 시트 */
function syEdOpen(k){const x=k>=0?syLibGet()[k]:null;if(k>=0&&!x)return;
 SYE={k,e:x?JSON.parse(JSON.stringify(x)):{name:'',env:'',sub:'',life:'',basic:false,fav:false,items:[{lb:'하도',n:'',dft:''},{lb:'중도',n:'',dft:''},{lb:'상도',n:'',dft:''}]}};
 if(!SYE.e.items||!SYE.e.items.length)SYE.e.items=[{lb:'하도',n:'',dft:''}];syEdUi()}
function syEdDel(){const k=SYE.k,x=syLibGet()[k];if(!x)return;ask('시스템 ‘'+esc(x.name)+'’을(를) 삭제할까요?',()=>{const A=syLibGet();A.splice(k,1);syLibSet(A);syEdClose();SYLC={};syLibPage();syLibUi();spfGc()})}
/* 템플릿 */
/* ===== v459 도장사양서 시스템 (제조사 구분 없음) ===== */
const SYSPEC=(()=>{
 const A=(n,dft,o)=>Object.assign({n,dft},o||{});
 /* 공통 하도·상도 대체 제품 */
 const HA=[A('속건방청하도',50),A('센스멜 방청하도(KS)',50,{thin:'≤10%',th:'0.086 L/㎡',svr:58.1}),A('갈바니 IZ180N',60,{mix:'14.25:31.53 (kg, 주제:징크필러)',thin:'≤10%',th:'0.095 L/㎡',svr:63.2}),A('EZ175',50)];
 const HA_IN=HA.map(x=>Object.assign({},x));
 const TOP=[A('속건 철재상도',50,{thin:'≤50%',th:'0.10 L/㎡',svr:50}),A('코레탄 톱코우트 UT6581',50,{mix:'7:1 (부피비)',thin:'≤10%',th:'0.083 L/㎡',svr:60.2})];
 const base=(lb,n,dft,o)=>Object.assign({lb,n,dft},o||{});
 const fm=(ext)=>{ /* 내화 : ext=true → 외부용 */
  const it=[
   base('하도','EP170',50,{mix:'5.78:1.0 (kg, 주제:경화제)',thin:'≤10%',th:'0.086 L/㎡',svr:58.1,pot:'20℃ 4시간',mth:'B,S',nt:'하도 중 1개 선택 (대체 제품 참고)',alt:HA_IN}),
   base('하도실러','EP170',40,{thin:'≤30%',svr:58.1,mth:'B,S',when:{lb:'하도',n:'갈바니 IZ180N'},nt:'갈바니 IZ180N 완전 경화(20℃ 24시간) 후 수포(Popping) 방지용 미스트 코트'}),
   base('중도','FIREMASK SQ-2003(기둥)',2450,{thin:'≤1%',th:'3.6 L/㎡',svr:68.1,rc:'≥24시간',mth:'에어리스 스프레이',nt:'총 2,450㎛ 이상, 3~4회 분할(1회 습도막 ≤1,300㎛), 기상 불량 시 1회 추가. 완전건조 후 인정 도막두께 이상 확인'})];
  if(ext)it.push(base('상도실러','코레폭스 EH2580',100,{mix:'4:1 (부피비)',thin:'≤10%',th:'0.17 L/㎡',svr:58.8,pot:'20℃ 6시간',rc:'중도 후 3일(하절기)·7일(동절기) 이후',mth:'B,S',nt:'외부 내구성 확보용 실러, 1개 선택',alt:[A('코레폭스 EH6270',100,{mix:'1:1 (부피비)',thin:'≤25%',th:'0.16 L/㎡',svr:62.5,pot:'20℃ 4시간'}),A('코레폭스 EH4158HM',100,{mix:'1:1 (부피비)',thin:'≤20%',th:'0.125 L/㎡',svr:80,pot:'20℃ 5시간'})]}));
  it.push(base('상도','센스탄',50,{mix:'3:1 (부피비)',thin:'≤5%',th:'0.122 L/㎡',svr:41,pot:'20℃ 6시간',rc:'상도실러·중도 후 12시간(20℃) 이후',mth:'B,S',nt:'상도 중 1개 선택',alt:TOP}));
  return it};
 return [
  {name:'폴리아스파틱 칩 바닥',sub:'콘크리트',scope:'차고·주차장·공장·창고 바닥 (칩 도포 공법: 하도 → 컬러 플레이크 → 상도)',items:[
   base('하도','숲으로무용제하도',325,{mth:'R,B,S',thin:'≤5%',nt:'원문 250~400㎛ 중간값, 소지에 흡수되도록(피막 금지)'}),
   base('중도','폴리아스파틱중도',300,{mix:'1:1 (부피비)',mth:'RAKE·밀대·롤러',rc:'하도 후 4시간(20℃)',nt:'원문 200~400㎛ 중간값, 도장 직후 컬러 플레이크 살포 → 2~3시간 후 잔여 제거'}),
   base('상도','폴리아스파틱상도',275,{mix:'1:1 (부피비)',mth:'RAKE·밀대·롤러',nt:'원문 150~400㎛ 중간값'})]},
  {name:'폴리아스파틱 일반 바닥재',sub:'콘크리트',scope:'차고·주차장·공장·창고 바닥 (일반 마감)',items:[
   base('하도','숲으로무용제하도',325,{mth:'R,B,S',thin:'≤5%',nt:'원문 250~400㎛ 중간값 (원문 주의문에 100~200㎛ 표기가 있어 본문 기준 적용)'}),
   base('상도','폴리아스파틱상도',300,{mix:'1:1 (부피비)',mth:'RAKE·밀대·롤러',rc:'하도 후 4시간(20℃)',nt:'원문 200~400㎛ 중간값'})]},
  {name:'폴리아스파틱 방수 코팅 (총 3mm)',sub:'옥상',scope:'방수재 마감 상도 (스크래핑 + 본도장 총 3mm)',items:[
   base('하도','스포탄하도',50,{thin:'≤30%',th:'0.1 L/㎡',svr:50,mth:'R,S',nt:'50㎛ 이하, 얇고 균일하게'}),
   base('중도','스포탄노출방수재',500,{mix:'4.5:1 (무게비)',mth:'RAKE·로울러',rc:'하도 후 ≥2시간(20℃)',nt:'스크래핑 0.5~0.8mm'}),
   base('중도','스포탄노출방수재',2500,{mix:'4.5:1 (무게비)',mth:'RAKE·로울러',rc:'≥24시간(20℃)',nt:'총 도막 3mm가 되도록 (원문 1.5~2.5mm)'}),
   base('상도','폴리아스파틱상도',150,{mix:'1:1 (부피비)',mth:'RAKE·밀대·롤러',rc:'중도 후 24~48시간 이내',nt:'원문 100~200㎛ 중간값'})]},
  {name:'수성 에폭시 코팅 (벽면)',sub:'콘크리트',scope:'기계실·전기실·주차장 벽체, 일반공장·시험연구실 등',items:[
   base('하도','수니폭시하도',40,{mix:'11.5:4.5 (부피비)',thin:'≤20% (상수도)',pot:'1시간',mth:'B,R,S',nt:'소지 흡수가 심한 곳은 하도 추가'}),
   base('상도','수니폭시코팅(벽면)',40,{cnt:2,mix:'8.6:7.4 (부피비)',thin:'≤5% (상수도)',pot:'1시간',rc:'≥15시간(20℃), 하도 후 ≥24시간',mth:'B,R,S',nt:'표준 2회, 흡수·은폐 불량 시 1회 추가(2~3회)'})]},
  {name:'수성 메탈릭 · 콘크리트·몰탈 (신규)',sub:'콘크리트',scope:'콘크리트·시멘트몰탈 내/외부 수성 메탈릭 마감',items:[
   base('상도','숲으로메탈릭',20,{cnt:2,thin:'≤3% (물)',rc:'≥1시간(20℃)',mth:'R,S',nt:'롤러는 위→아래 한방향, 스프레이 터치업 금지'})]},
  {name:'수성 메탈릭 · 콘크리트·몰탈 보수(수성 구도막)',sub:'콘크리트',scope:'수성 구도막 위 보수도장 (백악화·노화 구도막은 믹싱 선행)',items:[
   base('하도','숲으로믹싱',5,{thin:'100~300% 희석',mth:'B,R,S'}),
   base('상도','숲으로메탈릭',20,{cnt:2,thin:'≤3% (물)',rc:'≥1시간(20℃)',mth:'R,S'})]},
  {name:'수성 메탈릭 · 철재·목재 (신규)',sub:'철재',scope:'철재·목재면 메탈릭 마감 (올인원 선행)',items:[
   base('하도','숲으로올인원',30,{mth:'B,R,S'}),
   base('상도','숲으로메탈릭',20,{thin:'≤3% (물)',rc:'≥1시간(20℃)',mth:'R,S',nt:'사양표 1회 기준 (본문은 20㎛ 2회 표기 — 은폐 부족 시 2회)'})]},
  {name:'수성 메탈릭 · 알키드·락카 구도막 보수',sub:'',scope:'알키드·락카 등 구도막 보수도장',items:[
   base('하도','숲으로올인원',30,{mth:'B,R,S'}),
   base('상도','숲으로메탈릭',20,{thin:'≤3% (물)',rc:'≥1시간(20℃)',mth:'R,S',nt:'사양표 1회 기준 (본문은 20㎛ 2회 표기 — 은폐 부족 시 2회)'})]},
  {name:'2시간 내화 철골 기둥 · 내부용',sub:'철재',scope:'2시간 내화구조가 요구되는 철골 기둥 (발포성 내화도료)',items:fm(false)},
  {name:'2시간 내화 철골 기둥 · 외부용',sub:'철재',scope:'2시간 내화구조가 요구되는 철골 기둥 — 외부 노출(보양 필수)',items:fm(true)},
  {name:'자연건조형 아크릴우레탄 철재 (하도+상도 90㎛)',sub:'철재',scope:'공업용 일반철재 상도 및 각종 산업·가전기기 보수도장용 하도 (2액형, 에어리스 스프레이)',items:[
   base('하도','스피롤탄 하도 적정색',50,{mix:'5:1 (부피비, 주제:경화제)',thin:'≤20% (전용 신나, 본문 5~10%)',th:'0.119 L/㎡',svr:42,mth:'에어리스 스프레이·붓·롤러',nt:'구석·용접선은 선행 도장(Stripe Coat) 후 전면 도장'}),
   base('상도','스피롤탄',40,{mix:'5:1 (부피비, 주제:경화제)',thin:'≤20% (전용 신나, 본문 10~20%)',th:'0.100 L/㎡',svr:40,mth:'에어리스 스프레이·붓·롤러',rc:'하도 후 ≥1시간, ≤24시간 (25℃, 하도 후 6시간~7일 이내 재도장)',pot:'25℃ 6시간 이내 사용'})]},
  {name:'우레탄 노출 방수 (KS F 3211 1류, 총 3mm)',sub:'옥상',scope:'옥상 및 기타 부위 우레탄 노출방수, 콘크리트·몰탈 노출방수',items:[
   base('하도','스포탄하도',50,{thin:'≤30%',th:'0.1 L/㎡',svr:50,mth:'B,R,S',nt:'소지 전처리 후 얇고 균일하게'}),
   base('중도','스포탄KS1류방수재',500,{mix:'3.5:1 (무게비)',mth:'RAKE·헤라·로울러',rc:'하도 후 ≥2시간(20℃)',nt:'스크래핑 0.5~0.8mm, 희석 금지'}),
   base('중도','스포탄KS1류방수재',2500,{mix:'3.5:1 (무게비)',th:'4.5 kg/㎡ (총 3mm)',mth:'RAKE·헤라·로울러',rc:'≥24시간(20℃)',nt:'총 도막 3mm'}),
   base('상도','스포탄상도',50,{thin:'≤10%',th:'0.10 L/㎡',svr:50,mth:'B,R,S',rc:'중도 후 24~48시간 이내',nt:'은폐·광택 부족 시 1회 추가'})]}
 ].map(x=>Object.assign({env:'',life:'',spec:1,src:'도장사양서'},x))})();

/* ===== v459 도장사양서 읽기 (제조사 무관 · 휴리스틱 · 결과는 항상 검토 후 저장) ===== */
const SYSTG_RE='하\\s*도\\s*실\\s*러|상\\s*도\\s*실\\s*러|하\\s*도|중\\s*도|상\\s*도';
const syStgN=s=>{s=String(s||'').replace(/\s+/g,'');return s=='하도실러'||s=='중도실러'||s=='상도실러'||s=='하도'||s=='중도'||s=='상도'?s:''};
function syNormLine(s){
 return String(s||'').replace(/[ 　]/g,' ')
  .replace(/(^|[^\d])(\d{1,3})\s*([.,])\s*(?=\d)/g,'$1$2$3')
  .replace(/(^|[^\d])(\d)\s+(\d)(?!\d)/g,'$1$2$3').replace(/([,.]\d{1,2})\s+(\d{1,2})(?!\d)/g,'$1$2')
  .replace(/(\d+\.\d+)\s(\d)(?=\s*(?:L|kg|㎏|㎛|μm|%|㎡))/g,'$1$2')
  .replace(/[(（]\s+/g,'(').replace(/\s+[)）]/g,')')
  .replace(/\s+([,;%])/g,'$1')
  .replace(/\s+/g,' ').trim();
}
function syParseSpec(raw,fname){
 const L=(raw||[]).map(syNormLine).filter(Boolean),N=L.length,num=s=>parseFloat(String(s).replace(/,/g,'')),
  toUm=(v,u)=>/㎜|mm/i.test(u||'')?v*1000:v,cmp=s=>String(s||'').replace(/[\s·.,()\[\]]/g,'').toLowerCase();
 if(!N)return[];
 /* 제목·적용범위 */
 const isT=l=>l.length<=50&&!/[.。]\s*$|다\s*$|니다/.test(l);let ti=L.slice(0,8).findIndex(l=>isT(l)&&/도장\s*사양서|시방서/.test(l)&&!/^본\s*시방/.test(l));if(ti<0)ti=Math.max(0,L.slice(0,8).findIndex(isT));
 let title=L[ti].replace(/도장\s*사양서|표준\s*시방서|시방서|도장\s*사양/g,'').replace(/^[\s\-–:·]+|[\s\-–:·]+$/g,'').trim()||String(fname||'').replace(/\.[^.]+$/,'');
 let scope='';{const si=L.findIndex(l=>/적\s*용\s*범\s*위/.test(l));if(si>=0){let t=[L[si].replace(/^.*?적\s*용\s*범\s*위\s*/,'')];for(let j=si+1;j<Math.min(N,si+7);j++){if(/^(?:시\s*공|표\s*면|선\s*행|[나다]\.|\d+\.\s*바탕)/.test(L[j]))break;t.push(L[j])}scope=t.join(' ').replace(/\s나\s*\.?\s*시\s*공.*$/,'').replace(/[*]\s*/g,'').replace(/\s+/g,' ').replace(/(\d)\.\s/g,'$1) ').trim().slice(0,110)}}
 /* 표 위치 찾기 */
 const hdrIdx=[];for(let i=0;i<N;i++){if(/제품명|도료명|품\s*명/.test(L[i])&&(/도막\s*두께|구분/.test(L[i])||/도막\s*두께/.test((L[i-1]||'')+(L[i+1]||''))))hdrIdx.push(i)}
 const isStop=l=>/^[*※▶■●]/.test(l)||/^[(（]\s*\d*\s*[)）]\s*(?:하\s*도|중\s*도|상\s*도)/.test(l)||/^제\s*제\s*품|^제\s*품\s*별|^도\s*장\s*방\s*법/.test(l)||/^\d\)\s*(?:내부|외부)/.test(l);
 const variants=[];let tableEnd=0;
 hdrIdx.forEach(h0=>{
  let heading='';for(let k=h0-1;k>=Math.max(0,h0-2);k--){const t=L[k].replace(/(도\s*장\s*사\s*양\s*서?\s*)+/g,'').replace(/^\d\)\s*/,'').trim();if(t&&t.length<=30&&!/\d{2,}|㎛|제품명|도막두께|구분|^구$|^분$/.test(t)&&!/^[*※]/.test(t)&&!/[,，.。]|다$|함$|음$|요$|을$|를$/.test(t.replace(/\(.*?\)/g,''))){heading=t;break}}
  if(!heading&&/^\d\)\s*\S+$/.test(L[h0-1]||''))heading=L[h0-1].replace(/^\d\)\s*/,'');
  /* 같은 줄에 붙은 제목 (도 장 사 양 새 콘크리트 및 몰탈면) */
  const um=/mm/i.test(L[h0]+(L[h0+1]||''))&&!/㎛|μm/.test(L[h0]+(L[h0+1]||''))?'mm':'㎛';
  const rows=[];let cur='',pend=null,lastExpl=-1,altPending=[];let j=h0+1,end=h0+1;
  const push=(o)=>{rows.push(o);return o};
  for(;j<N;j++){
   const l=L[j];if(j>h0+1&&isStop(l)&&!/^상기/.test(l)){break}
   if(/^[*※]/.test(l)&&j>h0+1)break;
   if(/^(?:구분|구|분|\(㎛\)|도막두께)/.test(l)&&/도막두께|\(㎛\)|제품명/.test(l)&&j<=h0+3)continue;
   if(/^상기\s*(?:\S+)\s*중\s*\d\s*개\s*선택/.test(l)){const st=syStgN((l.match(/상기\s*(\S+)\s*중/)||[])[1])||cur;const g=rows.filter(r=>r.lb==st||r.lb==cur);let a0=g.length-1;while(a0>0&&rows[rows.length-(g.length-a0)]&&true&&a0>0&&!rows[rows.length-(g.length-a0)].lbExpl)a0--;
    /* 같은 단계에서 연속된 행을 대체 제품 묶음으로 */
    const grp=[];for(let q=rows.length-1;q>=0&&rows[q].lb==st;q--){grp.unshift(rows[q])}
    const base=grp.find(r=>!/실러/.test(r.lb)&&!r.when)||grp[0];
    const alts=grp.filter(r=>r!==base&&!r.when);
    if(base&&alts.length){base.alt=(base.alt||[]).concat(alts.map(a=>({n:a.n,dft:a.dft})));alts.forEach(a=>{const ix=rows.indexOf(a);if(ix>=0)rows.splice(ix,1)})}
    end=j+1;continue}
   /* 단계 라벨 감지 */
   let m=l.match(new RegExp('^('+SYSTG_RE+')(?:\\s+(.*))?$')),rest=l,lb='';
   if(m){lb=syStgN(m[1]);rest=(m[2]||'').trim()}
   const mm=/^(?:실러)\s*(?:\((.*?)\))?\s*(.*)$/.exec(l);
   if(!m&&mm&&rows.length){const pr=rows[rows.length-1];if(!/실러$/.test(pr.lb)){pr.lb=pr.lb+'실러';pr.lbExpl=1;cur=pr.lb}
    if(mm[1]){const wh=mm[1].replace(/일\s*때|시공\s*시|적용/g,'').trim();pr.when={t:wh}}
    const nm=(mm[2]||'').trim();
    /* 실러 뒤의 나머지: 이름만 있는 대체 제품 (EH6270, EH4158HM) */
    const toks=nm.split(/[,，]/).map(x=>x.trim()).filter(x=>x&&/^[A-Za-z]{1,4}\d[\w\-]*$/.test(x.split(' ')[0]));
    if(toks.length&&!pr.when){const pf=(pr.n.match(/^(\S+)\s+[A-Z]{1,4}\d/)||[])[1]||'';pr.alt=(pr.alt||[]).concat(toks.map(t=>({n:(pf?pf+' ':'')+t.split(' ')[0],dft:pr.dft})))}
    continue}
   if(lb&&!rest.replace(/[A-Z.,\s]+/g,'')){ /* 단계만 있는 줄 (+방법 약어) : 병합셀 라벨 → 직전 라벨 없는 행들 재배정 */
    for(let q=rows.length-1;q>=0&&!rows[q].lbExpl;q--)rows[q].lb=lb;cur=lb;continue}
   if(lb){cur=lb}
   /* 희석제·합계 행 (일위대가형 표) : 직전 행에 희석 정보로 */
   if(/^(?:희\s*석\s*제|합\s*계)/.test(l)){if(/^희/.test(l)&&rows.length){const pr=rows[rows.length-1],pc=l.match(/(\d+(?:\.\d+)?)\s*%/),nmx=l.replace(/^희\s*석\s*제\s*/,'').replace(/\s*[A-Z]{1,4}(?:-[A-Z0-9]+){1,3}.*$/,'').replace(/\s*도료량.*$/,'').trim();if(pc&&!pr.thin)pr.thin='≤'+pc[1]+'%'+(nmx?' ('+nmx+')':'')}continue}
   /* 이름 + 두께 */
   let name='',dft=null,uu='',pendX=null;
   let t=rest.match(/^(.*?)\s*(\d[\d,]*(?:\.\d+)?)\s*(㎛|μm|µm|㎜|mm)/);
   if(t&&t[1]&&/[가-힣A-Za-z]/.test(t[1])){name=t[1];dft=toUm(num(t[2]),t[3]);
    /* 규격번호·도장횟수 열 제거, 이론소요량 열 읽기 */
    let ct=0;name=name.replace(/\s+(\d)$/,(m,a)=>{ct=+a;return ''}).replace(/\s+[A-Z]{1,4}(?:-[A-Z0-9]+){1,3}$/,'').replace(/\s*<[^>]{1,6}>/g,'').trim();
    if(!ct){const c2=name.replace(/\s+(\d)$/,'');}
    const tl=rest.slice(t.index+t[0].length).match(/([\d.]+)\s*(L|kg)\s*\/\s*(?:㎡|m2|m²|m')/i);
    pendX={cnt:ct>1?ct:0,th:tl?tl[1]+' '+tl[2].replace(/^l$/,'L')+'/㎡':'',svr:tl&&/^L$/i.test(tl[2])&&num(tl[1])>0&&dft>0?Math.round(dft/(num(tl[1])*10)*10)/10:0}}
   else if(!t){const t2=rest.match(/^(.*?[A-Za-z가-힣)\]])\s+(\d[\d,]*(?:\.\d+)?)(?=\s|$)/);if(t2&&/[가-힣A-Za-z]/.test(t2[1])&&num(t2[2])>=3&&num(t2[2])<=20000){name=t2[1];dft=toUm(num(t2[2]),um)}}
   if(!name){
    /* 두께만 있는 줄 → 직전 이름 행에 부여 */
    const o=rest.match(/^(\d[\d,]*(?:\.\d+)?)\s*(㎛|μm|㎜|mm)?(?:\s|$)/);
    if(o&&pend){pend.dft=toUm(num(o[1]),o[2]||um);pend=null;continue}
    /* 두께 없는 이름 줄 : 이름만 */
    const nm=rest.replace(/[,，]\s*$/,'').trim();
    const mn=rest.match(/^(.+?)\s+(?:RAKE|[BRS](?:[,.\s]*[BRS])*(?=\s|$)|헤라|로울|붓|롤러|스프레이)/);
    if(mn&&/[A-Za-z0-9]|하도|중도|상도|도료|코팅|방수|프라이머|실러|에폭시|우레탄|아크릴/.test(mn[1])&&mn[1].length<=24){pend=push({lb:cur,n:mn[1].trim(),dft:null,lbExpl:lb?1:0});continue}
    if(rest&&/^[가-힣A-Za-z0-9][^:：]{1,28}$/.test(nm)&&/[A-Za-z0-9]|하도|중도|상도|도료|코팅|방수|프라이머|실러|에폭시|우레탄|아크릴/.test(nm)&&!/\d\s*%|㎛/.test(nm)&&!/^(?:위한|우수|방지|모든|내후|내수|부착|유광|투명|적색|회색|녹색|미백|주문)/.test(nm)){
     const first=nm.split(/[,，]/)[0].trim();
     if(lb||!rows.length||rows[rows.length-1].dft==null||!/[,，]/.test(rest))pend=push({lb:cur,n:first,dft:null,lbExpl:lb?1:0});
     else{ /* 대체 후보 이름 (같은 단계 직전 행의 두께를 상속) */
      const pr=rows[rows.length-1];const nn=nm.split(/[,，]/).map(x=>x.trim()).filter(x=>x&&!/^(?:마감재|방청하도|내화도료|프라이머|실러|도료|색상|비고)$/.test(x));
      if(nn.length)nn.forEach(x=>{pr.alt=(pr.alt||[]);pr.alt.push({n:x,dft:pr.dft})})}
    }
    continue}
   name=name.replace(/[,，\s]+$/,'').replace(/^[-·•]\s*/,'').replace(/^[가-힣]\s+(?=\S{3,})/,'').trim();if(!name)continue;
   /* 직전 행과 이름·두께가 같고 이름 줄이 보충 (이름만 있던 pend)이면 합치기 */
   if(pend&&pend.n==name&&pend.dft==null){pend.dft=dft;pend=null;continue}
   const o=push({lb:cur,n:name,dft:dft,lbExpl:lb?1:0});pend=null;if(pendX){if(pendX.cnt)o.cnt=pendX.cnt;if(pendX.th)o.th=pendX.th;if(pendX.svr>5&&pendX.svr<=100)o.svr=pendX.svr}
   /* 쉼표로 붙은 대체 이름이 같은 줄에 있는 경우: "코레폭스 EH2580 ," */
  }
  end=Math.max(end,j);tableEnd=Math.max(tableEnd,end);
  /* 단계 미정 행 : 이름으로 추정 */
  let prevLb='';rows.forEach(r=>{if(!r.lb){r.lb=/하도|프라이머|방청/.test(r.n)?'하도':/상도|톱코/.test(r.n)?'상도':/중도/.test(r.n)?'중도':''}});
  const hasTop=rows.some(r=>/^상도/.test(r.lb)),hasBot=rows.some(r=>/^하도/.test(r.lb));
  rows.forEach(r=>{if(!r.lb&&hasTop&&hasBot)r.lb='중도'});
  /* 같은 단계·이름·두께 연속행 → 횟수 */
  rows.forEach(r=>{r.n=(r.n||'').replace(/\s+\(/g,'(')});const out=[];rows.forEach(r=>{if(r.dft==null)return;const p=out[out.length-1];if(p&&p.lb==r.lb&&p.n==r.n&&p.dft==r.dft&&!p.alt&&!r.alt&&!p.when&&!r.when){p.cnt=(p.cnt||1)+1}else out.push(r)});
  if(out.length)variants.push({heading,rows:out});
 });
 /* 본문 단계 블록 (표가 없거나, 표 행의 상세 보강) */
 const HD=/(?:^|\s)(?:[(（]\s*\d*\s*[)）]|\d+\s*[)）])\s*(하\s*도\s*실\s*러|상\s*도\s*실\s*러|하\s*도|중\s*도|상\s*도)(?:\s*[(（].*)?\s*$/;
 const SUB=/^[①-⑩]\s*(.+?)(?:\s*시공\s*시)?$/;
 const heads=[];L.forEach((l,i)=>{const m=l.match(HD);if(m)heads.push({i,lb:syStgN(m[1]),line:l})});
 const blockText=(a,b)=>L.slice(a,b).join(' ');
 const q1=s=>{const m=s.match(/[“"‘'「]\s*([^”"’'」]{2,24}?)\s*[”"’'」]/g)||[];for(const x of m){const n=x.replace(/^[“"‘'「]\s*|\s*[”"’'」]$/g,'');if(!/희석|SEAL|씨일|신너|DATA|Data|도장사양|사양서/i.test(n)&&/[가-힣A-Za-z]/.test(n))return n}return ''};
 const prodOf=s=>{const a=q1(s);if(a)return a;const m=s.match(/([가-힣A-Za-z0-9][가-힣A-Za-z0-9\-.]{2,22})의\s*(?:주제|도료)/);return m?m[1]:''};
 const info=(t,dft)=>{const o={};
  let m=t.match(/(?:혼합|주제)[^:：]{0,60}?(부피비|무게비|중량비|용적비)?\s*([\d.]+)\s*(kg)?\s*:\s*([\d.]+)\s*(kg)?\s*[(（]?\s*(부피비|무게비|중량비)?/);
  if(m)o.mix=m[2]+':'+m[4]+' ('+(m[1]||m[6]||(m[3]?'kg':'')||'비율').replace('중량비','무게비')+')';
  m=t.match(/희\s*석[^%]{0,80}?최대\s*(\d+(?:\.\d+)?)\s*%/)||t.match(/최대\s*(\d+(?:\.\d+)?)\s*%[^.]{0,12}?(?:까지)?\s*희석/);if(m)o.thin='≤'+m[1]+'%';
  m=t.match(/이[론롞]\s*소요량\s*[:：]?\s*[^\d\n]{0,14}?([\d.]+)\s*(L|kg|ℓ|㎏)\s*\/\s*㎡(?:\s*[(（]\s*[^)）\d]*?(\d[\d,]*)\s*(㎛|μm|㎜|mm)\s*기준)?/i);
  if(m){o.th=m[1]+' '+(m[2]=='ℓ'?'L':m[2].replace('㎏','kg'))+'/㎡';const ref=m[3]?toUm(num(m[3]),m[4]):dft;if(/^L$/i.test(m[2]=='ℓ'?'L':m[2])&&ref>0&&num(m[1])>0){const sv=ref/(num(m[1])*10);if(sv>5&&sv<=100)o.svr=Math.round(sv*10)/10}}
  m=t.match(/가사\s*시[간갂]\s*[:：]?\s*(?:(\d+)\s*℃\s*(?:에서)?\s*)?(\d+(?:\.\d+)?)\s*(시[간갂]|분)/);if(m)o.pot=(m[1]?m[1]+'℃ ':'')+m[2]+(m[3]=='분'?'분':'시간');
  m=t.match(/재도장\s*간[격갂]\s*(?:은|:)?[^.]{0,28}?(?:최소\s*)?(\d+(?:~\d+)?)\s*(시[간갂]|일|분)\s*(?:이상)?/);if(m)o.rc='≥'+m[1]+(m[2]=='분'?'분':m[2]=='일'?'일':'시간');
  return o};
 const rng=(t,um0)=>{ /* 두께 범위/단일 */
  const m=t.match(/(?:도막\s*두께|건조\s*도막(?:\s*두께)?|DFT|D\.F\.T\.?)\s*[:(]?\s*(\d[\d,]*(?:\.\d+)?)\s*(?:[~∼～\-]\s*(\d[\d,]*(?:\.\d+)?))?\s*(㎛|μm|µm|㎜|mm)/)||t.match(/(\d[\d,]*(?:\.\d+)?)\s*(?:[~∼～\-]\s*(\d[\d,]*(?:\.\d+)?))?\s*(㎛|μm|µm|㎜|mm)(?:\s*로)?\s*(?:\d+\s*회)?/);
  if(!m)return null;const a=toUm(num(m[1]),m[3]),b=m[2]?toUm(num(m[2]),m[3]):a;return{d:Math.round((a+b)/2),lo:a,hi:b}};
 /* 표 행 보강 */
 variants.forEach(v=>v.rows.forEach(r=>{
  const names=[r.n].concat((r.alt||[]).map(a=>a.n));
  names.forEach((nm,ix)=>{
   const keys=[cmp(nm),cmp(nm.replace(/\(.*?\)/g,''))].filter(k=>k.length>=3);let at=-1;
   for(const k of keys){for(let i=tableEnd;i<N;i++){if(/^[①-⑩]/.test(L[i])&&cmp(L[i]).includes(k)){at=i;break}}if(at>=0)break}
   if(at<0)for(const k of keys){for(let i=tableEnd;i<N;i++){if(!/^[*※]/.test(L[i])&&cmp(L[i]).includes(k)){at=i;break}}if(at>=0)break}
   if(at<0)return;
   let e=at+1;while(e<N&&e<at+46&&!HD.test(L[e])&&!/^[①-⑩]/.test(L[e]))e++;
   const t=blockText(at,e),inf=info(t,(ix?r.alt[ix-1].dft:r.dft));
   const tgt=ix?r.alt[ix-1]:r;Object.assign(tgt,inf);
   if(!ix){const r2=rng(t);const c=t.match(/(?:㎛|μm)\s*(?:으로|로)?\s*(\d+)\s*(?:[~∼-]\s*(\d+))?\s*회\s*도장/);if(c&&!/에\s*걸쳐/.test(t)&&(r.cnt||1)<+c[1])r.cnt=+c[1];
    const sp=t.match(/(\d+\s*~\s*\d+)\s*회\s*에\s*걸쳐/);if(sp)r.nt=sp[1].replace(/\s/g,'')+'회 분할 도장 (두께는 총 건조도막)';}
  });
 }));
 /* 표가 없을 때 : 본문 블록으로 변형 구성 */
 if(!variants.length&&heads.length){
  const vs=[];let curV=null;
  heads.forEach((h,hi)=>{
   const e=hi+1<heads.length?heads[hi+1].i:Math.min(N,h.i+60);
   /* 변형 제목: 바로 앞 줄이 '* 제목' */
   const pl=L[h.i-1]||'',vm=pl.match(/^[*※▶■●]\s*([^:：]{2,30})$/);
   if(!curV||vm&&!/도막|㎛/.test(pl)){curV={heading:vm?vm[1].trim():'',rows:[]};vs.push(curV)}
   else if(h.lb=='하도'&&curV.rows.some(r=>r.lb=='상도')){curV={heading:'',rows:[]};vs.push(curV)}
   let stop=e;for(let k=h.i+1;k<e;k++){if(/^[*※]\s*\S/.test(L[k])&&!/주의/.test(L[k])&&/사양|코팅|공법/.test(L[k])&&!/㎛|mm/.test(L[k])){stop=k;break}}
   const t=blockText(h.i+1,stop),nm=prodOf(t),r=rng(t),inf=info(t,r&&r.d);
   const c=t.match(/(\d+)\s*(?:~\s*(\d+))?\s*회\s*도?장?/);
   const row=Object.assign({lb:h.lb,n:nm||'',dft:r?r.d:null},inf);
   if(r&&r.lo!=r.hi)row.nt='원문 두께 범위 '+(r.lo>=1000?+(r.lo/1000).toFixed(2)+'~'+ +(r.hi/1000).toFixed(2)+'mm':r.lo+'~'+r.hi+'㎛')+' → 중간값 적용';
   if(c&&r&&+c[1]>1)row.cnt=+c[1];
   if(/플레이크|FLAKE|칩/i.test(t)&&h.lb=='중도')row.nt=(row.nt?row.nt+' · ':'')+'플레이크(칩) 살포';
   if(nm||r)curV.rows.push(row);
  });
  variants.push(...vs.filter(v=>v.rows.length))}
 /* 표에서 잘린 이름 보완 (예: 방수 → 방수재) */
 const body=L.join(' ');const esc2=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 variants.forEach(v=>v.rows.forEach(r=>{[r].concat(r.alt||[]).forEach(o=>{o.n=(o.n||'').replace(/^[가-힣]\s+(?=\S{3,})/,'').trim();if(!o.n||o.n.length<4)return;try{const m=body.match(new RegExp(esc2(o.n)+'(재|제|류)(?=[”"의를을와과는로이가\\s,.)])'));if(m)o.n=o.n+m[1]}catch(e){}})}));
 /* 결과 정리 */
 const subOf=s=>/철재|철골|강재|목재/.test(s)?'철재':/콘크리트|몰탈|시멘트|바닥|벽/.test(s)?'콘크리트':/옥상|방수|지붕/.test(s)?'옥상':'';
 const subV=(h)=>{const a=h.replace(/방수\s*코팅/,'옥상 방수');return /옥상|방수|지붕/.test(a)&&!/바닥|콘크리트/.test(a)?'옥상':subOf(h)||(h?'':(/방수/.test(title)?'옥상':'')||subOf(title+' '+scope))};
 const res=variants.map(v=>{
  const items=v.rows.filter(r=>r.n||r.dft!=null).map(r=>{const o={lb:r.lb||'',n:r.n||'',dft:r.dft!=null?Math.round(r.dft):''};['cnt','mix','thin','th','pot','rc','svr','nt','alt','when'].forEach(k=>{if(r[k]!==undefined&&r[k]!==''&&r[k]!==null)o[k]=r[k]});
   if(o.when&&o.when.t){const w=o.when.t,sel=v.rows.find(q=>q.alt&&(q.n+' '+q.alt.map(a=>a.n).join(' ')).includes(w.replace(/^(하도|중도|상도)\s*/,'')));const key=w.replace(/^(하도|중도|상도)\s*/,'').trim();const full=[sel&&sel.n].concat(((sel&&sel.alt)||[]).map(a=>a.n)).find(x=>x&&x.includes(key));o.when={lb:(w.match(/^(하도|중도|상도)/)||[])[1]||'하도',n:full||key}}
   return o});
  const hd0=(v.heading||'').replace(/\s*사양\s*$/,'').trim(),nm=((!hd0||title.includes(hd0))?title:(!title||hd0.includes(title))?hd0:title+' · '+hd0).trim();
  return{name:nm,scope:scope,sub:subV(v.heading||''),env:'',life:'',spec:1,src:fname||'',items}
 }).filter(s=>s.items.length);
 return res;
}

/* ===== v459 도장시스템추가 : 사양서 기반 시스템 (제조사 구분 없음) ===== */
const syItTxt=r=>esc((r.lb?r.lb+' ':'')+r.n)+(r.alt&&r.alt.length?' 외 '+r.alt.length:'')+' '+syFmtD(+r.dft||0)+(+r.cnt>1?'×'+r.cnt+'회':'')+(r.when?'(조건부)':'');
const syTot=t=>(t.items||[]).filter(r=>!r.when).reduce((a,r)=>a+(+r.dft||0)*(+r.cnt||1),0);
function syAddSys(t,extra){const A=syLibGet();let nm=t.name,n=1;while(A.some(x=>x.name==nm)){n++;nm=t.name+' ('+n+')'}
 const c=JSON.parse(JSON.stringify(t));c.name=nm;c.ts=Date.now();c.basic=/^\[기본\]/.test(nm);c.fav=false;Object.assign(c,extra||{});A.unshift(c);syLibSet(A);return nm}

/* 불러오기 : DB에 없는 제품도 직접 입력 제품으로 · 횟수 반영 · 택1(대체 제품) 선택 */
function syLibUse(k){
 if(window.SYLCC){const f=window.SYLCC;window.SYLCC=null;syClose();return f(k)}
 const x=syLibGet()[k];if(!x)return;
 if((x.items||[]).some(i=>i.alt&&i.alt.length))return syAltSheet(k);
 syApplySys(x,{},k)}
function syApplySys(x,sel,k){
 const its=x.items||[],R=its.map((it,i)=>{const c=sel[i]|0,a=c>0&&it.alt&&it.alt[c-1];return{it,i,d:a?Object.assign({lb:it.lb,cnt:it.cnt,mth:it.mth},a):it}});
 const keep=R.filter(r=>{const w=r.it.when;if(!w)return true;const b=R.find(q=>!q.it.when&&q.it.lb==w.lb);return !b||b.d.n==w.n});
 if(!keep.length)return tt('추가할 제품이 없습니다');
 if(window.SYM=='db'){window.SYM='sys';try{navGo('sys')}catch(e){T(3)}}
 let nm=x.name,n=1;while(SY.groups.some(g=>g.name==nm)){n++;nm=x.name+' ('+n+')'}
 const gi=SY.groups.length;SY.groups.push({name:nm,area:'',c:0});let miss=0;
 keep.forEach(({d})=>{const db=PX(d.n),o={n:db?db.n:d.n,lb:d.lb||'',g:gi};if(!db)miss++;
  if(d.dft!==undefined&&d.dft!==''){o.dft=+d.dft*(+d.cnt>1?+d.cnt:1)}
  ['price','tprice','loss','tr'].forEach(q=>{if(d[q]!==undefined)o[q]=d[q]});
  if(d.svr!==undefined&&(!x.spec||!(db&&+db.svr)))o.svr=d.svr;
  SY.layers.push(o)});
 SY.act=-1;syNorm();syS();syRender();vib(20);if(k!==undefined){SYLC[k]=(SYLC[k]||0)+1;syLibUi()}
 if(miss)tt('DB에 없는 제품 '+miss+'개는 직접 입력 제품으로 추가했습니다<br><small>단가를 입력하세요'+(keep.some(r=>!r.d.svr)?' (고형분 SVR 없는 제품은 SVR도 입력)':'')+'</small>')}
let SYALT=null;
function syAltSheet(k){if(!syLibGet()[k])return;SYALT={k,sel:{}};syAltUi()}
function syAltUi(){let e=$('#syalt');const fresh=!e;if(fresh){e=document.createElement('div');e.id='syalt';e.className='sypk';e.onclick=ev=>{if(ev.target===e)syAltClose()};document.body.append(e)}
 const x=syLibGet()[SYALT.k],S=SYALT.sel,its=x.items||[],selName=i=>{const it=its[i],c=S[i]|0;return c>0&&it.alt&&it.alt[c-1]?it.alt[c-1].n:it.n};
 e.innerHTML=`<div class="sypk-b sypk-v2"><div class="sypk-h"><b>제품 선택</b><button class="sypk-x" onclick="syAltClose()" aria-label="닫기">✕</button></div><div class="sypk-hint"><b>${esc(x.name)}</b><br>사양서에서 ‘택1’로 안내된 단계의 제품을 고르세요.</div><div class="sypk-sc">${its.map((it,i)=>{
  if(it.when){const b=its.findIndex(q=>!q.when&&q.lb==it.when.lb),on=b<0||selName(b)==it.when.n;return `<div class="sa-r${on?'':' off'}"><span class="sa-l">${esc(it.lb)}</span><div class="sa-n"><b>${esc(it.n)}</b> ${syFmtD(+it.dft||0)}<small>${on?'적용됩니다':esc(it.when.lb)+'가 ‘'+esc(it.when.n)+'’일 때만 적용'}</small></div></div>`}
  const o=[it].concat(it.alt||[]);
  return `<div class="sa-r"><span class="sa-l">${esc(it.lb)}</span><div class="sa-ch">${o.map((q,j)=>`<button type="button" class="${(S[i]|0)==j?'on':''}" ${o.length<2?'disabled':''} onclick="SYALT.sel[${i}]=${j};syAltUi()">${esc(q.n)}<small>${syFmtD(+q.dft||0)}${+it.cnt>1?'×'+it.cnt+'회':''}</small></button>`).join('')}</div></div>`}).join('')}</div><div class="sypk-f"><button onclick="syAltClose()">취소</button><button class="ok" onclick="syAltGo()">시스템에 추가</button></div></div>`}
function syAltClose(){const e=$('#syalt');if(e)e.remove();SYALT=null}
function syAltGo(){if(!SYALT)return;const k=SYALT.k,s=SYALT.sel,x=syLibGet()[k];syAltClose();if(x)syApplySys(x,s,k)}

/* 수정/추가 시트 (횟수·방법·희석·혼합비·재도장·이론소요·비고·대체 제품) */
const SYLB=['하도','하도실러','중도','중도실러','상도','상도실러','미지정'];
function syEdOpenDraft(d,im){SYE={k:-1,imp:im,e:JSON.parse(JSON.stringify(d))};if(!SYE.e.items||!SYE.e.items.length)SYE.e.items=[{lb:'하도',n:'',dft:''}];syEdUi()}
function syEdUi(){
 let e=$('#syed');const fresh=!e;if(fresh){e=document.createElement('div');e.id='syed';e.className='sypk syed';e.onclick=ev=>{if(ev.target===e)syEdClose()};document.body.append(e)}
 const s=SYE.e,sc=fresh?0:(e.querySelector('.sypk-sc')||{}).scrollTop||0,I=(i,k,lab,ph,w)=>`<label class="${w?'w2':''}"><small>${lab}</small><input type="text" value="${esc(s.items[i][k]??'')}" placeholder="${ph||''}" oninput="SYE.e.items[${i}].${k}=this.value"></label>`;
 e.innerHTML=`<div class="sypk-b syed-b"><div class="sypk-h"><b>${SYE.k<0?(SYE.imp!=null?'읽은 결과 확인':'새 시스템 추가'):'시스템 수정'}</b><button class="sypk-x" onclick="syEdClose()" aria-label="닫기">✕</button></div><div class="sypk-sc syed-sc">
 <label class="se-l">시스템명<input type="text" value="${esc(s.name)}" placeholder="예: [기본] C5 중방식 철재" oninput="SYE.e.name=this.value"></label>
 <div class="se-g"><span>용도</span><div class="se-ch"><button type="button" class="${(s.use||'est')=='est'?'on':''}" onclick="SYE.e.use='est';syEdUi()">견적용</button><button type="button" class="${s.use=='lcc'?'on':''}" onclick="SYE.e.use='lcc';syEdUi()">LCC용</button></div></div>
  <div class="se-g"><span>대표 사진 <small>(선택 · 목록 카드에 표시)</small></span><div class="se-ph"><label class="se-pl${s.photo?'':' e'}">${s.photo?`<img src="${s.photo}" alt="">`:`<span>${syIx.cam}<small>사진 등록</small></span>`}<input type="file" accept="image/*" onchange="syEdPhoto(this)" aria-label="사진 등록"></label>${s.photo?`<button type="button" class="se-pd" onclick="SYE.e.photo='';syEdUi()">사진 삭제</button>`:''}</div></div>
  <label class="se-l">적용 범위 <small>(선택)</small><input type="text" value="${esc(s.scope||'')}" placeholder="예: 주차장 바닥, 철골 기둥" oninput="SYE.e.scope=this.value"></label>
 <div class="se-t"><span>${syIx.star}기본 시스템 지정</span><button type="button" class="se-sw${s.basic?' on':''}" onclick="SYE.e.basic=!SYE.e.basic;syEdUi()" aria-pressed="${!!s.basic}"><i></i></button></div>
 <div class="se-t"><span>${syIx.heart}즐겨찾기</span><button type="button" class="se-sw${s.fav?' on':''}" onclick="SYE.e.fav=!SYE.e.fav;syEdUi()" aria-pressed="${!!s.fav}"><i></i></button></div>
 <div class="se-g"><span>적용 환경 <small>(ISO 12944)</small><button type="button" class="se-auto" onclick="syEdAuto()">자동 판정</button></span><div class="se-ch">${Object.keys(SYENV).map(c=>`<button type="button" class="${s.env==c?'on':''}" onclick="SYE.e.env=SYE.e.env=='${c}'?'':'${c}';syEdUi()">${c}</button>`).join('')}</div></div>
 ${s._why?`<div class="se-why">${esc(s._why)}</div>`:''}<div class="se-g"><span>대상</span><div class="se-ch">${SYSUB.map(c=>`<button type="button" class="${s.sub==c?'on':''}" onclick="SYE.e.sub=SYE.e.sub=='${c}'?'':'${c}';syEdUi()">${c}</button>`).join('')}</div></div>
 <label class="se-l">예상 수명 <small>(년, 선택)</small><input type="number" inputmode="decimal" value="${esc(s.life)}" placeholder="예: 12" onwheel="this.blur()" oninput="SYE.e.life=this.value"></label>
 <div class="se-g"><span>시스템 구성 <small>(제품명은 DB 제품 선택 또는 직접 입력 · DFT는 1회 도장 기준)</small></span>${s.items.map((c,i)=>{const p=P(c.n),has=c.cnt||c.mth||c.thin||c.mix||c.rc||c.th||c.nt||(c.alt&&c.alt.length)||c.when;const cur=c.lb||'미지정',pp=p;return `<div class="se-c"><div class="se-lb se-ch">${SYLB.slice(0,5).concat(cur=='상도실러'?['상도실러']:[]).map(x=>`<button type="button" class="${cur==x?'on':''}" onclick="SYE.e.items[${i}].lb=${cur==x?"'미지정'":"'"+x+"'"};syEdUi()">${x}</button>`).join('')}</div><div class="se-r"><input type="text" autocomplete="off" value="${esc(c.n)}" placeholder="제품명·코드 입력 (제품 DB 검색)" oninput="SYE.e.items[${i}].n=this.value;syEdHint(${i});syEdSg(${i},-1,this.value)" onfocus="syEdSg(${i},-1,this.value)" onblur="setTimeout(()=>syEdSgHide(${i},-1),250)"><div class="se-d"><input type="number" inputmode="decimal" id="se-d${i}" value="${esc(c.dft??'')}" placeholder="${p&&+p.dft?p.dft:'DFT'}" onwheel="this.blur()" oninput="SYE.e.items[${i}].dft=this.value"><em>μm</em></div><button type="button" class="se-x" onclick="SYE.e.items.splice(${i},1);syEdUi()" aria-label="삭제">✕</button></div><div class="se-sg" id="se-sg${i}_m" hidden></div>${pp?`<div class="se-hn">${esc([pp.mf,pp.g||pp.us].filter(Boolean).join(' · '))||'제품 DB 등록 제품'}</div>`:''}
  <button type="button" class="se-mo${has?' has':''}" onclick="SYE.e.items[${i}]._o=!SYE.e.items[${i}]._o;syEdUi()">${c._o?'▲ 접기':'▼ 상세'}<span>${[+c.cnt>1?c.cnt+'회':'',c.alt&&c.alt.length?'대체 '+c.alt.length:'',c.when?'조건부':'',c.mix?'혼합 '+esc(c.mix):'',c.thin?'희석 '+esc(c.thin):''].filter(Boolean).join(' · ')}</span></button>
  ${c._o?`<div class="se-x2">${I(i,'cnt','횟수','1')}${I(i,'mth','도장방법','B,R,S')}${I(i,'thin','희석(최대)','≤5%')}${I(i,'mix','혼합비','4:1 (부피비)')}${I(i,'rc','재도장 간격','≥24시간')}${I(i,'th','이론소요량','0.12 L/㎡')}${I(i,'pot','가사시간','20℃ 4시간')}${I(i,'svr','고형분 SVR(%)','58')}${I(i,'nt','비고','',1)}
   ${c.when?`<div class="se-wh w2">조건: ${esc(c.when.lb)} = <b>${esc(c.when.n)}</b> 선택 시에만 적용<button type="button" onclick="delete SYE.e.items[${i}].when;syEdUi()">해제</button></div>`:''}
   <div class="se-al w2"><small>대체 제품 (택1)</small>${(c.alt||[]).map((a,j)=>`<div class="se-ar"><input type="text" autocomplete="off" value="${esc(a.n)}" placeholder="제품명·코드 입력" oninput="SYE.e.items[${i}].alt[${j}].n=this.value;syEdSg(${i},${j},this.value)" onfocus="syEdSg(${i},${j},this.value)" onblur="setTimeout(()=>syEdSgHide(${i},${j}),250)"><div class="se-d"><input type="number" inputmode="decimal" value="${esc(a.dft??'')}" placeholder="μm" onwheel="this.blur()" oninput="SYE.e.items[${i}].alt[${j}].dft=this.value"><em>μm</em></div><button type="button" class="se-x" onclick="SYE.e.items[${i}].alt.splice(${j},1);syEdUi()" aria-label="삭제">✕</button></div><div class="se-sg" id="se-sg${i}_${j}" hidden></div>`).join('')}<button type="button" class="se-ad2" onclick="(SYE.e.items[${i}].alt=SYE.e.items[${i}].alt||[]).push({n:'',dft:SYE.e.items[${i}].dft});syEdUi()">+ 대체 제품 추가</button></div></div>`:''}</div>`}).join('')}<button type="button" class="se-add" onclick="SYE.e.items.push({lb:SYST[Math.min(SYE.e.items.length,2)],n:'',dft:''});syEdUi()">${syIx.plus}<span>코트 추가</span></button></div>
 <datalist id="sy-dl">${(typeof DB!='undefined'?DB:[]).slice(0,3000).map(p=>`<option value="${esc(p.n)}">`).join('')}</datalist></div>
 <div class="sypk-f ${SYE.k<0?'one':''}">${SYE.k<0?'':'<button class="rd" onclick="syEdDel()">삭제</button>'}<button class="ok" onclick="syEdSave()">저장</button></div></div>`;
 if(sc){const q=e.querySelector('.sypk-sc');if(q)q.scrollTop=sc}
}
/* 시스템 수정 시트: 제품명·코드 입력 시 제품 DB 목록 표시 */
const syEdN=v=>String(v||'').toLowerCase().replace(/[\s\-_.\/()·,]/g,'');
function syEdSgBox(i,j){return $('#se-sg'+i+'_'+(j<0?'m':j))}
function syEdSgHide(i,j){const b=syEdSgBox(i,j);if(b)b.hidden=true}
function syEdSg(i,j,v){
 const b=syEdSgBox(i,j);if(!b||!SYE)return;const q=syEdN(v);
 if(!q){b.hidden=true;return}
 const sc=p=>{const n=syEdN(p.n);if(n==q)return -1;if(n.startsWith(q))return 0;if(n.includes(q))return 1;const o=syEdN([p.mf,p.g,p.us,p.pre,p.nxt,p.tc].filter(Boolean).join(' '));return o.includes(q)?2:9};
 const A=DB.map(p=>[p,sc(p)]).filter(x=>x[1]<9).sort((a,c)=>a[1]-c[1]).slice(0,8);
 if(A.length&&A[0][1]<0&&A.length==1){b.hidden=true;return}
 b.innerHTML=A.length?A.map(([p])=>`<div class="se-sgi" onclick="syEdSgPick(${i},${j},${DB.indexOf(p)})"><b>${esc(p.n)}</b><small>${esc([p.mf,+p.dft?p.dft+'μm':''].filter(Boolean).join(' · '))}</small></div>`).join(''):'<div class="se-sgn">제품 DB에 없는 제품 · 입력한 이름 그대로 사용</div>';
 b.hidden=false}
function syEdSgPick(i,j,k){
 const p=DB[k];if(!p||!SYE)return;const c=SYE.e.items[i];if(!c)return;const t=j>=0?(c.alt||[])[j]:c;if(!t)return;
 t.n=p.n;if((t.dft===''||t.dft==null)&&+p.dft)t.dft=+p.dft;syEdUi();vib(15)}
function syEdHint(i){const p=P(SYE.e.items[i].n),d=$('#se-d'+i);if(d)d.placeholder=p&&+p.dft?p.dft:'DFT'}
function syEdClose(){const e=$('#syed');if(e)e.remove();SYE=null}
function syEdSave(){const s=SYE.e,nm=(s.name||'').trim();if(!nm)return tt('시스템 이름을 입력하세요');
 const items=s.items.filter(c=>(c.n||'').trim()).map(c=>{const o={n:c.n.trim(),lb:c.lb=='미지정'?'':(c.lb||'')};if(c.dft!==undefined&&c.dft!=='')o.dft=+c.dft;['price','tprice','loss','tr'].forEach(k=>{if(c[k]!==undefined)o[k]=c[k]});
  ['mth','thin','mix','rc','th','pot','nt'].forEach(k=>{const v=c[k]==null?'':String(c[k]).trim();if(v)o[k]=v});
  if(c.svr!==undefined&&c.svr!==''&&+c.svr>0)o.svr=+c.svr;if(+c.cnt>1)o.cnt=Math.round(+c.cnt);
  const al=(c.alt||[]).filter(a=>(a.n||'').trim()).map(a=>{const q=Object.assign({},a,{n:a.n.trim()});if(q.dft===''||q.dft==null)delete q.dft;else q.dft=+q.dft;return q});if(al.length)o.alt=al;
  if(c.when)o.when=c.when;return o});
 if(!items.length)return tt('제품을 1개 이상 입력하세요');
 const A=syLibGet(),it=Object.assign({},s,{name:nm,items,life:s.life===''?'':+s.life||'',ts:Date.now()});
 const im=SYE.imp;if(SYE.k>=0)A[SYE.k]=it;else A.unshift(it);syLibSet(A);syEdClose();syLibPage();syLibUi();vib(20);if(im==null)tt('저장했습니다');
 if(im!=null&&SYIMP&&SYIMP.list[im]){SYIMP.list[im].added=1;if($('#syimp'))spImpDone(nm,'저장하고 추가했습니다');else tta('✓ 저장했습니다',1600)}else if(im!=null)tta('✓ 저장했습니다',1600)}

/* 사양서 파일 읽기 (PDF·텍스트·JSON) → 초안 목록 → 확인 후 추가 */
let SYIMP=null;
function syImpPick(){let i=$('#syimp-f');if(i)i.remove();i=document.createElement('input');i.type='file';i.id='syimp-f';i.accept='.pdf,.txt,.md,.csv,.json,.png,.jpg,.jpeg,.webp,application/pdf,text/plain,application/json,image/*';i.style.display='none';i.onchange=()=>{const f=i.files&&i.files[0];i.remove();if(f)syImpFile(f)};document.body.append(i);i.click()}
async function syReadSpecFile(f,pg){
 let list=[];
 try{
  if(/\.json$/i.test(f.name)){const j=JSON.parse(await f.text()),a=Array.isArray(j)?j:(j.systems||[j]);list=a.filter(x=>x&&Array.isArray(x.items)&&x.items.length).map(x=>Object.assign({name:'시스템',spec:1,src:f.name},x))}
  else{let L=[];
   if(/\.pdf$/i.test(f.name)||f.type=='application/pdf'){L=await pdfText(f,30);if(L.filter(x=>x&&x.length>3).length<8){try{L=await ocrLines(f,pg)}catch(e){}}else{const hs=hlSlice(L);if(hs){const l2=syParseSpec(hs,f.name);if(l2.length){l2.forEach(x=>{x.hl=1});return l2}}}}
   else if(/^image\//.test(f.type)||/\.(png|jpe?g|webp|gif|bmp)$/i.test(f.name))L=await ocrImg(f,pg);
   else L=(await f.text()).split(/\r?\n/);
   list=syParseSpec(L,f.name)}
 }catch(e){throw e}
 return list}
async function syImpFile(f){
 tta('사양서를 읽는 중…<br><small>'+esc(f.name)+'</small>',0);let list=[];
 try{list=await syReadSpecFile(f,m=>tta(m,0))
 }catch(e){console.error(e);return ttaOff(),tt('사양서를 읽지 못했습니다<br><small>'+esc(e.message||e)+'</small>')}
 if(!list.length)return ttaOff(),tt('도장 시스템(하도·중도·상도 표)을 찾지 못했습니다<br><small>‘새 시스템 추가’로 직접 입력하거나 사양 표가 있는 페이지만 올려 보세요</small>');
 ttaOff();SYIMP={file:f.name,list,f:/\.json$/i.test(f.name)?null:f,fid:''};syImpUi()}
/* v485 사양서 일괄등록: 여러 파일을 한 번에 읽어 파일별로 구분한 확인 시트 → 전체 추가 */
function syImpBulkPick(){let i=$('#syimp-f');if(i)i.remove();i=document.createElement('input');i.type='file';i.multiple=true;i.id='syimp-f';i.accept='.pdf,.txt,.md,.csv,.json,.png,.jpg,.jpeg,.webp,application/pdf,text/plain,application/json,image/*';i.style.display='none';i.onchange=()=>{const fs=Array.from(i.files||[]);i.remove();if(fs.length)syImpBulk(fs)};document.body.append(i);i.click()}
async function syImpBulk(fs){
 const all=[],fails=[];let nok=0;
 for(let n=0;n<fs.length;n++){const f=fs[n],tag='<br><small>'+(n+1)+'/'+fs.length+' · '+esc(f.name)+'</small>';
  tta('사양서를 읽는 중…'+tag,0);
  try{const L=await syReadSpecFile(f,m=>tta(String(m)+tag,0));
   if(L.length){nok++;L.forEach(x=>{Object.defineProperty(x,'_f',{value:/\.json$/i.test(f.name)?null:f,enumerable:false,writable:true});x.src=x.src||f.name;all.push(x)})}
   else fails.push({n:f.name,m:'도장 시스템 표를 찾지 못함'})
  }catch(e){console.error(e);fails.push({n:f.name,m:String(e&&e.message||e)})}
 }
 ttaOff();
 if(!all.length)return tt('읽을 수 있는 사양서가 없습니다<br><small>'+fails.slice(0,3).map(x=>esc(x.n)+' — '+esc(x.m)).join('<br>')+'</small>');
 SYIMP={file:fs.length+'개 파일 중 '+nok+'개 읽음',list:all,f:null,fid:'',fm:new Map(),bulk:1,fails};syImpUi()}
function syImpUi(){let e=$('#syimp');const fresh=!e;if(fresh){e=document.createElement('div');e.id='syimp';e.className='sypk';e.onclick=ev=>{if(ev.target===e)syImpClose()};document.body.append(e)}
 const L=SYIMP.list,sc=fresh?0:(e.querySelector('.sypk-sc')||{}).scrollTop||0,todo=L.filter(x=>!x.added).length;
 e.innerHTML=`<div class="sypk-b sypk-v2"><div class="sypk-h"><b>사양서에서 읽은 시스템</b><span>${L.length}개</span><button class="sypk-x" onclick="syImpClose()" aria-label="닫기">✕</button></div><div class="sypk-hint"><b>${esc(SYIMP.file)}</b><br>${SYIMP.bulk?'여러 사양서에서 읽은 <b>초안</b>입니다. 파일별로 원본과 대조한 뒤 ‘전체 추가’로 한 번에 등록하세요. 틀린 곳은 ‘수정 후 추가’에서 고칠 수 있습니다.':'자동으로 읽은 <b>초안</b>입니다. 제품명·두께·횟수를 원본과 대조한 뒤 추가하세요. 틀린 곳은 ‘수정 후 추가’에서 고칠 수 있습니다.'}${SYIMP.fails&&SYIMP.fails.length?'<br><span style="color:#b3261e">읽지 못한 파일 '+SYIMP.fails.length+'개: '+SYIMP.fails.slice(0,3).map(x=>esc(x.n)).join(', ')+(SYIMP.fails.length>3?' 외':'')+'</span>':''}</div><div class="sypk-sc"><div class="syl-ls tp">${L.map((t,i)=>`<div class="syl-c"><div class="syl-t"><b>${esc(t.name)}</b><span class="bdg b">총 ${syFmtD(syTot(t))}</span></div>${SYIMP.bulk?`<div class="syl-s"><b>${esc(t.src||'')}</b></div>`:''}${t.scope?`<div class="syl-s">${esc(t.scope)}</div>`:''}<div class="syl-d w">${t.items.map(syItTxt).join(' · ')}</div><div class="syl-bt three"><button class="ed" ${t.added?'disabled':''} onclick="syImpEdit(${i})">수정 후 추가</button><button class="ok" ${t.added?'disabled':''} onclick="syImpAdd(${i})">${t.added?'추가됨':'추가'}</button><button class="ok" onclick="syImpUse(${i})" title="도장 시스템에 바로 적용">바로 적용</button></div></div>`).join('')}</div></div><div class="sypk-f"><button onclick="syImpClose()">닫기</button><button class="ok" ${todo?'':'disabled'} onclick="syImpAll()">전체 추가${todo?' ('+todo+')':''}</button></div></div>`;
 if(sc){const q=e.querySelector('.sypk-sc');if(q)q.scrollTop=sc}}
function syImpUse(i){const t=SYIMP.list[i];if(!t)return;if(!t.added){syAddSys(syImpClean(t));t.added=1}syImpClose();syLibPage();syLibUi();syLibUse(0);if(!document.getElementById('syalt'))tta('✓ 도장 시스템에 적용했습니다',1600)}
function syImpClose(){const e=$('#syimp');if(e)e.remove()}
function syImpClean(t){const c=JSON.parse(JSON.stringify(t));delete c.added;c.items=(c.items||[]).map(i=>(i.n||'').trim()?i:Object.assign({},i,{n:((i.lb||'코트')+' 제품명 입력')}));c.src=c.src||SYIMP.file;c.spec=1;const fid=syFileKeep(t);if(fid)c.fid=fid;return c}
/* v484 사양서 원본 파일 저장·보기: TDS 저장소와 분리된 전용 IndexedDB(spf_) — TDS 초기화·대기파일 목록과 섞이지 않음 */
const spfDb=(m,k,v)=>new Promise((ok,no)=>{try{const q=indexedDB.open('spf_'+EDITION,1);q.onupgradeneeded=()=>q.result.createObjectStore('f');q.onerror=()=>no(q.error);q.onsuccess=()=>{const d=q.result,tx=d.transaction('f',m=='get'||m=='keys'?'readonly':'readwrite'),s=tx.objectStore('f'),r=m=='get'?s.get(k):m=='keys'?s.getAllKeys():m=='del'?s.delete(k):s.put(v,k);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error);tx.oncomplete=()=>d.close();tx.onabort=()=>d.close()}}catch(e){no(e)}});
function syFileKeep(t){const I=SYIMP;if(t&&t._f&&I&&I.fm){const f=t._f;let id=I.fm.get(f);if(!id){id='sp'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);I.fm.set(f,id);f.arrayBuffer().then(buf=>spfDb('put',id,{name:f.name,type:ft(f),buf})).catch(()=>{})}return id}
if(!I||!I.f)return'';if(!I.fid){const id=I.fid='sp'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),f=I.f;f.arrayBuffer().then(buf=>spfDb('put',id,{name:f.name,type:ft(f),buf})).catch(()=>{})}return I.fid}
async function spfGc(){try{const used=new Set(syLibGet().map(x=>x.fid).filter(Boolean)),ks=await spfDb('keys');for(const k of ks)if(!used.has(k))await spfDb('del',k)}catch(e){}}
async function syLibView(k){const x=syLibGet()[k];if(!x)return;
 if(!x.fid)return tt('첨부된 사양서 파일이 없습니다<br><small>PDF등록으로 가져온 사양서만 원본을 볼 수 있습니다</small>');
 let f=null;try{f=await spfDb('get',x.fid)}catch(e){}
 if(!f||!f.buf)return tt('저장된 사양서 원본을 찾을 수 없습니다<br><small>다른 기기·브라우저에서 가져온 사양은 원본이 없습니다</small>');
 vwr(new Blob([f.buf],{type:f.type}),f.name,f.type||'')}
/* v484 더보기 메뉴: 메뉴 밖 빈 곳을 누르면 닫기 */
document.addEventListener('click',e=>{if(!(SYF.mn>=0)&&!(SYL2.mn>=0))return;if(e.target.closest&&e.target.closest('.lb-mn,.lc-mn,.lb-dt,.lc-ac .d'))return;SYF.mn=-1;SYL2.mn=-1;document.querySelectorAll('.lb-mn,.lc-mn').forEach(n=>n.remove())},true);
function spImpDone(nm,msg){const left=SYIMP?SYIMP.list.filter(x=>!x.added).length:0;tta('✓ '+msg+(nm?'<br><small>'+esc(nm)+'</small>':''),1600);vib(15);if(!left)syImpClose();else syImpUi()}
function syImpAdd(i){const t=SYIMP.list[i];if(!t||t.added)return;syAddSys(syImpClean(t));t.added=1;syLibPage();syLibUi();spImpDone(t.name,'추가했습니다')}
function syImpAll(){let n=0;SYIMP.list.slice().reverse().forEach(t=>{if(!t.added){syAddSys(syImpClean(t));t.added=1;n++}});syLibPage();syLibUi();tta('✓ '+n+'개 시스템을 추가했습니다',1600);vib(15);syImpClose()}
function syImpEdit(i){const t=SYIMP.list[i];if(!t||t.added)return;const d=syImpClean(t);let nm=d.name,n=1;const A=syLibGet();while(A.some(x=>x.name==nm)){n++;nm=d.name+' ('+n+')'}d.name=nm;syEdOpenDraft(d,i)}


/* 공유 */
function syText(sel){
 const L=SY.layers;if(!L.length)return '';
 const labs=syLb(),D=L.map((c,i)=>syLay(i)),G=syGr();sel=(sel&&sel.length?sel:G.map((g,k)=>k)).filter(k=>G[k]);
 if(!sel.some(k=>G[k].idx.some(i=>D[i].r)))return '';
 const o=['📋 도장 시스템 소요량·자재비',new Date().toLocaleDateString('ko-KR')];
 const one=(i)=>{const d=D[i];if(!d.r)return;
  o.push('',`[${labs[i]}] ${d.c.n}${d.p&&d.p.mf?' ('+d.p.mf+')':''}`,
  `소요량(이론/실제): ${F(d.a.th)} / ${F(d.a.ac)} ${d.u}/㎡`,
  `면적: ${F(d.Ac)}㎡ · 필요 물량: ${syf2(d.q)}${d.u}`+(d.t?` / 희석제 ${syf2(d.tq)}L`:''),
  `캔 수량: 제품 ${d.k}캔`+(d.t?` / 희석제 ${d.tk}캔`:''),
  `금액: 제품 ${F(d.pa,0)}원`+(d.t?` + 희석제 ${F(d.da,0)}원`:'')+` = ${F(d.tot,0)}원`)};
 sel.forEach((k,n)=>{const g=G[k],ids=g.idx,BU={};let tq=0,K=0,TK=0,pa=0,da=0;
  o.push('',n?'━━━━━━━━━━━━':'━━━━━━━━━━━━',`■ ${k+1}. ${g.name}`);ids.forEach(one);
  ids.map(i=>D[i]).filter(d=>d.r).forEach(d=>{BU[d.u]=(BU[d.u]||0)+d.q;tq+=d.tq;K+=d.k;TK+=d.tk;pa+=d.pa;da+=d.da});
  o.push('','💰 '+g.name+' 합계','제품 물량: '+Object.entries(BU).map(([a,v])=>syf2(v)+a).join(' + '),'희석제 물량: '+syf2(tq)+'L','환산 캔 수량: '+(K+TK)+'캔 (제품 '+K+' · 희석제 '+TK+')','총 금액: '+F(pa+da,0)+'원')});
 o.push('','※ 참조용 · 십원 미만 절사 · VAT 별도');
 return o.join('\n');
}
/* syShare: 이전 정의 제거(뒤쪽 정의가 사용됨) */

/* ===== v119: 언어 설정 (한국어 / English) ===== */
let LANG=(()=>{try{return LS.lang==='en'?'en':'ko'}catch(e){return 'ko'}})();
/* 전체 일치(노드 전체가 이 문구일 때만) */
const I18N_EX=new Map(Object.entries({
'원':'KRW','개':'','말':'can','캔':'cans','제품':'Product','희석제':'Thinner','홈':'Home','정보':'Info','계산':'Calc','시스템':'System','설정':'Settings',
'으로':' for','소요량 계산':'Calculation','건조시간':'Drying Time','기술자료':'Technical Data','일위대가표':'Unit Price Table','데이터베이스':'Database','도장시스템':'Coating System','도장 시스템':'Coating System','데이터 시트':'Data Sheet',
'도장':'Coat','하도':'Primer','중도':'Mid coat','상도':'Top coat','상도1':'Top coat 1','상도2':'Top coat 2','중도1':'Mid coat 1','중도2':'Mid coat 2',
'면적':'Area','단가':'Unit price','소계':'Subtotal','제품명':'Product','제조사':'Maker','규격':'Size','단위':'Unit','비중':'Sp. gravity','일반명':'Generic name','용도':'Use','수량':'Qty','품명':'Item','삭제':'Delete','저장':'Save','취소':'Cancel','확인':'OK','닫기':'Close','인쇄':'Print','적용':'Apply','공유':'Share','복사':'Copy','메일':'Mail','문자':'SMS','메신저':'Messenger','앱':'App','전체':'All','미첨부':'No TDS','미지정':'Unspecified','무희석':'No thinning','외':'etc.','신규':'New','미인식':'Not found','주제':'Base','경화제':'Hardener','경화':'Cure','최대':'Max','시간':'Time','주':'Base','출고':'Shipped','혼합':'Mixed','제작자':'Creator',
'파일명':'File name','문서내용':'Document','(오류)':'(error)','(미매칭)':'(unmatched)','(단액형)':'(single-pack)','단액형':'Single-pack','없음 (단액형)':'None (single-pack)',
'지촉':'Touch dry','고화':'Hard dry','완전경화':'Full cure','재도장 간격':'Recoat interval','가사시간':'Pot life','포장규격':'Package size','희석제코드':'Thinner code','추천도막':'Rec. DFT','희석율':'Thinning %','제품설명':'Description','표면처리':'Surface prep','선행도장':'Previous coat','후속도장':'Next coat','희석제 규격':'Thinner size','추천 희석율':'Rec. thinning %','전용 희석제':'Dedicated thinner','이론 도포율':'Theoretical coverage',
'프로그램':'Program','주요 기능':'Key features','산출 공식':'Formulas','안내':'Notice','앱 버전':'App version','업데이트':'Updated','등록 제품':'Products','기술자료 반영':'TDS applied','데이터 저장':'Data storage','기본 정보':'Basic Info','프로그램 정보':'Program Info','무단배포 금지':'No Redistribution',
'기본면적':'Base Area','이론 소요량':'Theoretical','실제 소요량':'Actual','제품 금액':'Product cost','희석제 금액':'Thinner cost','총 금액':'Total','자재비':'Material Cost','소요량(예상)':'Quantity (est.)','희석제 소요량':'Thinner qty','총 소요량':'Total qty','환산 캔 수량':'Cans (converted)','제품 합계 물량':'Product total','희석제 합계 물량':'Thinner total',
'제품 상세 정보':'Product Details','소요량 산출 기준':'Calculation Basis','소요량 계산 결과':'Consumption Result','자재비 계산 결과':'Material Cost Result','시스템 총 소요량 계산 결과':'System Total Result','도료 소요량 및 자재비':'Paint Consumption & Cost',
'시스템 변경':'Change System','추천값 불러오기':'Load defaults','도막(DFT)':'DFT','로스율':'Loss %','제품 추가':'Add product','제품 삭제':'Delete product','전체 초기화':'Reset all','Coat 추가':'Add Coat','Coat 삭제':'Delete Coat',
'언어':'Language','한국어':'한국어','■ 등록 제품':'■ Registered products'
}));
/* 부분 일치(문장·조각) — 긴 문구부터 적용 */
const I18N_SUB=Object.entries({
'본 자료는 참고용이며 현장 상황·작업자 숙련도·도장 방법·기후 조건에 따라 실제 사용량은 달라질 수 있습니다. 산출 근거는 도료 소요량 공식이며, 활용에 따른 판단과 책임은 사용자에게 있으며, 제작자는 법령이 허용하는 범위에서 책임을 지지 않습니다. 시공 전 반드시 제조사 최신 기술자료(TDS)·물질안전보건자료(MSDS)를 확인하세요.':'This data is for reference only. Actual usage may vary with site conditions, applicator skill, application method and weather. The basis is the paint consumption formula, and the user is responsible for its use. Always check the maker\'s latest TDS and MSDS before work.',
'본 자료는 참고용이며 현장 상황·작업자 숙련도에 따라 실제 사용량은 다를 수 있습니다. 산출 근거는 도료 소요량 공식이며, 활용에 따른 판단과 책임은 사용자에게 있으며, 제작자는 법령이 허용하는 범위에서 책임을 지지 않습니다.':'This data is for reference only. Actual usage may vary with site conditions and applicator skill. The basis is the paint consumption formula, and the user is responsible for its use.',
'본 자료는 참고용이며 현장 조건에 따라 실제 사용량은 다릅니다.':'For reference only. Actual usage varies with site conditions.',
'본 계산 결과는 입력하신 조건과 프로그램 기준에 따른 예상 수치입니다.':'Results are estimates based on your inputs and the program\'s formulas.',
'정확한 계산을 위해 입력하신 조건을 다시 한 번 확인해주세요.':'Please double-check your inputs for an accurate calculation.',
'※ kg 단위 제품은 비중을 곱해 kg/㎡로 환산합니다. 예) 추천도막두께 100㎛ · SVR 50% · Loss 10% → 이론 0.2 L/㎡ · 실제 약 0.222 L/㎡':'※ For kg-unit products, specific gravity is applied to convert to kg/㎡. e.g. DFT 100㎛ · SVR 50% · Loss 10% → theoretical 0.2 L/㎡ · actual ≈ 0.222 L/㎡',
'※ kg 단위 제품은 비중을 곱해 kg/㎡로 환산':'※ kg-unit products are converted to kg/㎡ using specific gravity',
'예) 추천도막두께 100㎛ · SVR 50% · Loss 10% → 이론 0.2 / 실제 약 0.22 L/㎡':'e.g. DFT 100㎛ · SVR 50% · Loss 10% → theoretical 0.2 / actual ≈ 0.22 L/㎡',
'정확한 계산':'Accurate calculation','더 효율적인 도장 작업을':'a more efficient painting job','완성하세요.':'made easy.',
'페인트 종류별 단가를 확인하세요.':'Check unit prices by paint type.','페인트 소요량 계산 기준을 확인하세요.':'Check the paint consumption basis.','하도·중도·상도 소요량과 자재비를 한 번에.':'Primer · Mid · Top coat quantities and costs at once.','기술자료 · DB':'Technical Data · DB',
'■ 소요량 공식 · ⚠ 경고':'■ Formulas · ⚠ Warning','■ 소요량 공식 · ⚠ 경고 · 용어 매칭표':'■ Formulas · ⚠ Warning · Term matching','■ 소요량 산출 공식':'■ Consumption formulas','⚠ 경고 안내':'⚠ Warning',
'이론 소요량 [L/㎡]':'Theoretical consumption [L/㎡]','이론 소요량 [L/m²]':'Theoretical consumption [L/m²]','실제 소요량 [L/㎡]':'Actual consumption [L/㎡]','실제 소요량 [L/m²]':'Actual consumption [L/m²]','총 소요량 [L]':'Total consumption [L]',
'추천도막두께[㎛] ÷ (SVR[%] × 10)':'Rec. DFT[㎛] ÷ (SVR[%] × 10)','도장면적[㎡] × 실제 소요량[L/㎡]':'Area[㎡] × Actual consumption[L/㎡]','이론 소요량 ÷ (1 − Loss[%] ÷ 100)':'Theoretical ÷ (1 − Loss[%] ÷ 100)','이론 ÷ (1 − Loss[%]÷100)':'Theoretical ÷ (1 − Loss[%]÷100)',
'이론 = 추천도막두께 ÷ (SVR×10) · 실제 = 이론 ÷ (1−Loss÷100)':'Theoretical = Rec. DFT ÷ (SVR×10) · Actual = Theoretical ÷ (1−Loss÷100)',
'소요량 산출 공식':'Consumption Formulas','이론 소요량 ':'Theoretical ','실제 소요량 ':'Actual ',
'면적을 입력하세요.':'Enter the area.','미입력시 추천 값 기본 로딩 됨':'Recommended values load when left blank',
'DB 관리 (업로드 · 제품추가 · 초기화)':'DB management (upload · add · reset)','■ DB 업데이트[엑셀 · CSV · JSON 형식]':'■ DB update [Excel · CSV · JSON]',
'■ 기술자료 산출을 위한 기본 항목(SVR·도막·출고/혼합규격·희석제·용도)이 DB에 저장됩니다.':'■ Basic items for calculation (SVR · DFT · package/mix size · thinner · use) are stored in the DB.',
'· CSV 열: 제품명,일반명,용도,출규,혼규,단위,추천도막,SVR,희석제코드,희석율,희석제명,규격,건조시간,TDS링크':'· CSV columns: 제품명,일반명,용도,출규,혼규,단위,추천도막,SVR,희석제코드,희석율,희석제명,규격,건조시간,TDS링크',
'■ 같은 제품명은 갱신, 새 제품은 추가됩니다.':'■ Same product names are updated; new ones are added.',
'■ 기술자료(TDS) 일괄 등록':'■ Bulk TDS registration',
'파일 이름을 제품명과 같게 저장해 올리면 자동으로 제품에 연결됩니다 (예: EH2350.pdf). DB에 없는 제품의 TDS는 문서에서 제품명·SVR·도막·비중·건조시간 등을 읽어 새 제품으로 자동 등록되며(‘검토 필요’ 표시), 아무 값도 읽지 못한 파일만 대기 보관됩니다. 대기 중 ':'Name files after the product and upload them to link automatically (e.g. EH2350.pdf). Unlinked files wait in storage and link automatically when a product of the same name is added. Waiting: ',
'■ 기술자료 DB 등록':'■ Register technical data','+ 제품추가':'+ Add product','CSV 등록':'Import CSV','DB 내보내기':'Export DB','■ 초기화':'■ Reset','⚠ 삭제한 데이터는 복구할 수 없습니다':'⚠ Deleted data cannot be recovered',
'일괄등록':'Bulk','데이터시트':'Datasheet','일괄등록 = 미매칭 대기 파일만 · 데이터시트 전체 = 첨부 TDS·건조시간·가사시간 전부 · DB = 직접 추가·수정한 제품':'Bulk = unmatched waiting files only · Datasheet = all attached TDS, drying and pot-life data · DB = products you added or edited',
'■ 기술자료(TDS PDF·사진)를 선택하면 글자·OCR로 항목을 모두 읽어':'■ Select a TDS (PDF/photo) and all items are read by text/OCR and ',
'바로 저장':'saved immediately',
'합니다 (제품명=파일명, 제품설명=제품명 아래 문구, 용도·비중·고형분 용적비 등, 여러 파일 가능).':' (product = file name, description = text under the name, use · specific gravity · volume solids, etc. Multiple files allowed).',
'· SVR = 고형분 용적비(%) 와 동일합니다.':'· SVR = volume solids (%).','· 아래 입력칸은 자동으로 찾지 못한 항목을 직접 보완할 때만 사용하세요.':'· Use the fields below only to fill items that were not found automatically.',
'일반명/용도':'Generic name / use','제조사 (예: KCC, 조광페인트)':'Maker (e.g. KCC, Chokwang)','출고규격(주제)':'Package size (base)','혼합규격(주제+경화제)':'Mixed size (base+hardener)','단위 L 또는 kg':'Unit: L or kg','SVR(고형분용적비 %)':'SVR (volume solids %)','추천도막두께(㎛)':'Rec. DFT (㎛)','이론소요량(도포율 ㎡/L) · 비우면 자동':'Theoretical coverage (㎡/L) · auto if blank','추천 희석율(%)':'Rec. thinning (%)','전용 희석제명':'Dedicated thinner name','희석제 코드(예: 002)':'Thinner code (e.g. 002)','희석제 규격(L/말)':'Thinner size (L/can)','용도 (데이터시트의 용도)':'Use (as in datasheet)','포장규격 전체 (예: 4L · 20L)':'All package sizes (e.g. 4L · 20L)','표면처리 (예: Sa 2½ 블라스트, 유분·염분 제거)':'Surface prep (e.g. Sa 2½ blast, remove oil/salt)','건조시간: 20℃/1시간/4시간/24시간/8시간/무제한; 30℃/…':'Drying: 20℃/1h/4h/24h/8h/unlimited; 30℃/…','가사시간 (예: 20℃ 8시간)':'Pot life (e.g. 20℃ 8h)','파일명 별칭(한글명 등, 쉼표로 구분) · 이 이름의 파일이 이 제품에 자동 연결됩니다':'File-name aliases (comma-separated) · files with these names link to this product',
'■ 제품 기술 자료 검색':'■ Search technical data','제품검색':'Search products','마지막 Coat를 삭제할까요?':'Delete the last Coat?',
'└ 전용 희석제:':'└ Dedicated thinner:','제품명 입력 · 일부 입력시 목록 표시':'Enter product name · list shows as you type','+ 생성':'+ Custom','㎛ · SVR(고형분 용적비)':'㎛ · SVR (volume solids)','% · 희석':'% · Thinning',
'추천 도막 · SVR · Loss · 희석율 (미입력 시 제품 추천값 적용)':'Rec. DFT · SVR · Loss · Thinning % (blank = product defaults)','제품단가[원]':'Product price [KRW]','TDS 미첨부':'No TDS','TDS 첨부':'Attach TDS','TDS삭제':'Delete TDS','TDS 공유':'Share TDS','제품소개':'Product intro',
'제품명 입력 (필수)':'Product name (required)','목록 선택':'Pick from list','직접 입력 모드 · 입력한 값으로 새 제품이 DB에 등록되고 바로 계산됩니다':'Custom mode · a new product is registered with your values and calculated right away','ℓ (리터)':'ℓ (liter)','일반명 · 용도':'Generic name · use','예: 에폭시 하도':'e.g. Epoxy primer','희석제명':'Thinner name','없으면 비움':'Leave blank if none',
'제품명만 필수입니다. 나머지는 비워 두면 추천값 없이 입력한 값으로 계산됩니다. 기술자료 파일을 올리면 자동으로 채워 등록합니다':'Only the product name is required. Blank items are calculated from what you enter, without defaults. Upload a TDS file to fill them automatically.',
'저장하고 계산':'Save & calculate','TDS로 자동입력':'Auto-fill from TDS','제품 수정':'Edit product','제품명을 입력하세요':'Enter a product name','같은 이름의 제품이 이미 있습니다':'A product with the same name already exists','목록에서 선택':'Pick from list','을 누르거나 제품명을 바꿔 주세요':' or change the product name','직접 입력한 제품을 등록했습니다':'Custom product registered','기술자료를 읽지 못했습니다':'Could not read the technical data',
'입력한 제품을 DB에 등록하고':'Register the entered product in the DB and','제품 수정 화면으로 이동할까요?':'go to the edit screen?','등록되지 않은 제품입니다':'Product is not registered','삭제할 TDS가 없습니다':'No TDS to delete','기본면적 적용':'Base area applies',
'소요량(실제)':'Qty (actual)','/㎡ · 제품 ㎡단가':'/㎡ · product ㎡ price','원 · 금액(희석제 포함)':' KRW · amount (incl. thinner)','원/㎡':'KRW/㎡','면적 입력 시 표시':'Shown after area entry','· 희석제':'· thinner','■ 도료 소요량 결과[참고용]':'■ Paint consumption result [reference]',
'A4 출력·공유':'A4 print · share','견적서':'Quotation','견적서 생성':'Create quotation','소요량(예상)':'Quantity (est.)','제품 ㎡단가 합계':'Product ㎡ price total','희석제 ㎡단가 합계':'Thinner ㎡ price total','합계 금액 (㎡당)':'Total amount (per ㎡)','십원 미만 절사 · VAT 별도 · 소요량 단위 L·kg/㎡':'Rounded down to 10 KRW · VAT excluded · unit L·kg/㎡',
'제품을 먼저 선택하세요':'Select a product first','등록된 TDS가 없습니다.':'No TDS registered.','로 PDF를 추가하거나 DB의 TDS링크 열에 주소를 넣으세요.':' to add a PDF, or put a URL in the TDS link column of the DB.','TDS 첨부 완료':'TDS attached','첨부 실패:':'Attach failed:','저장 공간이나 브라우저 설정을 확인하세요':'Check storage space or browser settings',
'제조사 전체':'All makers','■ 총':'■ Total','개 중':' of','개 표시됨':' shown','더 보기':'Show more','첨부된 TDS를 삭제할까요?':'Delete the attached TDS?','TDS를 삭제했습니다':'TDS deleted','⚠ 삭제 경고':'⚠ Delete warning','이 제품을 DB에서 삭제합니다.':'This product will be deleted from the DB.','삭제하면 되돌릴 수 없습니다. 계속할까요?':'This cannot be undone. Continue?',
'모든 입력 내용을 지울까요?':'Clear all inputs?','(고정된 기본면적은 유지됩니다)':'(The fixed base area is kept)','일치하는 제품이 없습니다':'No matching products','제품 정보를 수정하고 저장했습니다':'Product updated and saved','제품이 저장되었습니다':'Product saved','기술자료(TDS)도 함께 등록했습니다':'TDS registered as well','대기 중이던 기술자료':'Waiting TDS files','개를 자동 연결했습니다':' linked automatically',
'OCR 도구를 불러오지 못했습니다(온라인 필요)':'Could not load the OCR tool (online required)','OCR 언어 데이터를 내려받지 못했습니다(인터넷 연결 확인)':'Could not download OCR language data (check internet)','OCR로 글자를 인식하는 중… (':'Recognizing text with OCR… (','처음 한 번은 언어 데이터를 내려받아 시간이 걸립니다':'The first run downloads language data and takes longer','OCR 시간 초과':'OCR timed out','OCR로 글자를 인식하는 중…':'Recognizing text with OCR…',
'SVR(고형분 용적비)':'SVR (volume solids)','제품 · 희석제':'Product · thinner','PDF·이미지가 아님':'Not a PDF/image','기술자료에서 제품 정보를 읽는 중…':'Reading product info from the TDS…','글자 인식(OCR)으로 빠진 항목을 보완하는 중… (최대 1~2분)':'Filling missing items with OCR… (up to 1–2 min)','OCR 보완:':'OCR assist:','개를 읽어 바로 저장했습니다':' read and saved','개 · 기존 제품 갱신':' · existing products updated','읽은 항목 없음':'No items read','확인 필요':'Check needed',
'· 읽은 원문 보기 (':'· View source text (','줄)':' lines)',': OCR 보완 실패 (':': OCR assist failed (',': 글자를 읽지 못했습니다. 스캔본이면 OCR(인터넷 필요)이 필요합니다':': Could not read text. Scanned files need OCR (online).','읽지 못함:':'Unreadable:','제품 수정 ·':'Edit product ·','혼합규격(1말)':'Mixed size (1 can)','= 출고규격 주제':'= package size (base)','+ 경화제':'+ hardener','· 혼합비':'· mix ratio','출고·혼합규격(1말)':'Package/mixed size (1 can)',
'TDS 보기':'View TDS','✅ TDS 보기':'✅ View TDS','재도장 간격':'Recoat interval',
'지촉: 손에 묻지 않는 시간 · 고화: 눌러도 자국이 없는 시간 · 완전경화: 사용 가능 상태 · 재도장: 다음 코트 도장 가능 간격(최소~최대)':'Touch dry: not sticky to the hand · Hard dry: no mark when pressed · Full cure: ready for service · Recoat: interval before the next coat (min–max)',
'주제 출고규격':'Base package size','경화제 규격':'Hardener size','혼합비(주:경)':'Mix ratio (base:hardener)','TDS에서 자동 추출 · 원문과 대조 필요':'Auto-extracted from TDS · verify against the source','일반명:':'Generic name:','기본 제원':'Basic specs','혼합규격 (1말 기준)':'Mixed size (per can)','혼합비 (주제 : 경화제)':'Mix ratio (base : hardener)','출고규격 · 주제':'Package size · base','출고규격 · 경화제':'Package size · hardener','포장규격 (데이터시트 규격)':'Package size (datasheet)','데이터시트 미등록 · TDS를 첨부하면 자동 입력됩니다':'No datasheet · attach a TDS to fill automatically','이론 도장면적 (L·kg당 · 로스 제외)':'Theoretical coverage (per L·kg · excl. loss)','1말당 이론 도장면적 (혼합규격 기준 · 로스 제외)':'Theoretical coverage per can (mixed size · excl. loss)',
'PDF 읽기 도구를 불러오지 못했습니다(온라인 1회 필요)':'Could not load the PDF reader (online once required)','TDS에서 기술자료를 읽는 중…':'Reading the TDS…','행을 가져왔습니다':' rows imported','건조시간 표는 찾지 못했습니다.':'Drying-time table not found.','로 원문을 확인하세요':' to check the source','기본 정보를 기술자료 기준으로 업데이트했습니다':'Basic info updated from the TDS','TDS는 첨부되었습니다.':'TDS attached.','기술자료 자동 읽기는 실패했습니다 (':'Automatic TDS reading failed (',
'■ 최근 일괄 등록 결과':'■ Latest bulk registration','✅ 매칭':'✅ Matched','❌ 미매칭':'❌ Unmatched','기준)':' basis)','■ 연결되지 않은 파일':'■ Unlinked files','개 —':' —','제품 연결':'Link product','로 직접 지정하면 다음부터 같은 이름의 파일은 자동 연결됩니다':' to assign manually; files of the same name link automatically next time','제품명·일반명 검색':'Search product / generic name','비슷한 제품이 없습니다. 위 검색칸에 제품명을 입력하세요':'No similar products. Type a product name in the search box above','에 연결했습니다':' linked','이름의 파일은 다음부터 자동으로 연결됩니다':' – files of this name will link automatically from now on',
'기술자료 등록 중… (':'Registering technical data… (','TDS에서 건조시간 읽는 중… (':'Reading drying times from the TDS… (','기술자료 일괄 등록 완료':'Bulk TDS registration complete','개 (DB 화면에서 확인)':' (see DB screen)','기본 제원은 기술자료 기준으로 갱신 · 건조시간·재도장간격':'Basic specs updated from TDS · drying time · recoat interval','개 인식':' recognized','파일 이름으로 못 찾아 문서 안의 제품명으로 매칭':'Not found by file name; matched by product name in the document','미매칭':'Unmatched','개는 대기 보관 — 아래':' kept waiting — below','로 직접 지정하세요':' to assign manually',
'초기화할 미매칭 파일이 없습니다':'No unmatched files to reset','제품에 매칭·등록된 기술자료':'TDS already matched to products','개는 초기화 대상이 아닙니다':' are not reset','⚠ 경고':'⚠ Warning','제품과 매칭되지 않은 대기 파일':'Waiting files not matched to products','만 삭제할까요?':' only. Delete them?','매칭 등록된 기술자료':'Matched TDS','개와 추출된 건조시간·가사시간은 그대로 유지됩니다.':' and extracted drying/pot-life data are kept.','미매칭 대기 파일':'Unmatched waiting files','개를 초기화했습니다':' reset','개는 유지됨':' kept',
'DB를 기본 상태로 초기화합니다.':'The DB will be reset to default.','직접 추가·수정한 제품 데이터가':'Product data you added or edited will be','모두 삭제':'all deleted','되며 복구할 수 없습니다.':' and cannot be recovered.','첨부·추출한 기술자료(TDS)는 유지됩니다.':'Attached/extracted TDS data is kept.','DB를 초기화했습니다':'DB reset','초기화할 데이터시트가 없습니다':'No datasheet data to reset','데이터시트 전체 초기화 · 모든 데이터가 삭제됩니다.':'Reset all datasheets · all data will be deleted.','첨부된 기술자료 파일':'Attached TDS files','(미매칭 대기 파일 포함)와 제품별 건조시간·가사시간 정보':' (incl. unmatched waiting files) and drying/pot-life data per product','를 모두 삭제할까요?':'. Delete all?','제품 DB와 직접 추가한 제품은 유지됩니다. 되돌릴 수 없습니다.':'The product DB and products you added are kept. This cannot be undone.','데이터시트를 전체 초기화했습니다':'All datasheets reset','첨부 TDS':'Attached TDS','개 · 건조시간/가사시간':' · drying/pot-life data','개 삭제':' deleted',
'엑셀 읽기 도구는 온라인에서 처음 한 번 필요합니다. CSV는 오프라인 가능':'The Excel reader needs to be loaded online once. CSV works offline.','DB 업데이트 완료:':'DB update complete:','개 반영 (전체':' applied (total','개). 아래 목록에서 제품별 기본 항목을 확인하세요':'). Check each product\'s basic items in the list below.','불러오기 실패:':'Import failed:',
'Loss(로스율)':'Loss (%)','· 희석율':'· Thinning %','㎡단가':'㎡ price','필요 물량':'Required qty','/ 희석제':'/ thinner','총 자재비':'Total material cost','말당':'per can','합계 ㎡단가':'Total ㎡ price','총 자재비 합계':'Total material cost','(고정)':'(fixed)','· 기본면적':'· Base area','💰 합계':'💰 Total','※ 참조용 · 십원 미만 절사 · VAT 별도':'※ Reference only · rounded down to 10 KRW · VAT excluded',
'공유할 결과가 없습니다':'Nothing to share','제품을 선택하고 값을 입력하세요':'Select products and enter values','일위대가표 공유':'Share Unit Price Table','텍스트로 보내기':'Send as text','이미지로 보내기':'Send as image','메신저·앱으로 공유':'Share via messenger / app','A4 보고서(이미지) 출력·공유':'A4 report (image) print · share','텍스트로 보냅니다 (미리보기)':'Sending as text (preview)','이미지를 준비하는 중…':'Preparing image…','이미지 준비 완료 · 이미지로 보냅니다':'Image ready · sending as image','이미지를 만들지 못했습니다 (온라인 연결 필요) · 텍스트로 보내세요':'Could not create the image (online required) · send as text','이미지를 만들지 못했습니다':'Could not create the image','온라인 연결을 확인하거나 텍스트로 보내세요':'Check your connection or send as text',
'공유가 막혀 이미지를 저장했습니다':'Sharing blocked; image saved','이미지를 저장했습니다':'Image saved','에 첨부해 주세요':' – please attach it','이 브라우저는 공유창을 지원하지 않습니다':'This browser does not support sharing','메일·문자·복사를 이용하세요':'Use Mail, SMS or Copy','이미지를 복사했습니다':'Image copied','붙여넣기 하세요':'Paste it','이 기기는 이미지 복사를 지원하지 않아 저장했습니다':'Image copy is unsupported; saved instead','이미지 복사가 막혀 저장했습니다':'Image copy blocked; saved instead','복사했습니다':'Copied','카카오톡 등에 붙여넣기 하세요':'Paste into KakaoTalk or other apps','(기술자료)':'(TDS)','이 기기는 파일 공유를 지원하지 않아':'File sharing is unsupported;','제목만 공유했습니다':'only the title was shared','공유창을 지원하지 않아 파일을 저장했습니다':'Sharing unsupported; file saved','공유가 막혀 있어 파일을 저장했습니다':'Sharing blocked; file saved','공유할 수 없습니다':'Cannot share','TDS 링크를 복사했습니다':'TDS link copied','첨부된 TDS가 없습니다':'No TDS attached','이 화면에서는 인쇄가 막혀 있습니다':'Printing is blocked here','이미지 공유·저장을 이용하세요':'Use image share/save','인쇄창을 열 수 없습니다':'Cannot open the print dialog','공유 후 다른 앱에서 인쇄하세요':'Share, then print from another app',
'이론 :':'Theoretical:','실제 :':'Actual:','단가 :':'Price:','㎡단가 :':'㎡ price:','원/말':'KRW/can','로스율 :':'Loss:','희석율 :':'Thinning:','산출 세부 내역':'Calculation details','전용 희석제 없음':'No dedicated thinner','수량 · 합계금액':'Qty · total amount','필요수량 · 합계금액':'Required qty · total amount','자재 예상 수량 · 자재비':'Est. material qty · cost','필요수량':'Required qty','총 금액 :':'Total:','말 환산 금액 :':'Cost by cans:','필요 수량 · 자재비':'Required qty · cost','필요 수량':'Required qty','캔 환산 금액':'Cost by cans','· 말당':'· per can','산출 공식 · 경고 안내':'Formulas · Warning','산출 공식 · 경고 안내 · 용어 매칭표':'Formulas · Warning · Term matching','출력할 결과가 없습니다':'Nothing to print','이미지 공유·저장':'Share / save image',
'견적일자':'Date','수 신':'To','현장명':'Site','공사명':'Project','유효기간':'Valid until','결제조건':'Payment terms','1말 (':'1 can (','1캔 (':'1 can (','단가(원)':'Unit price (KRW)','금액(원)':'Amount (KRW)','견 적 서':'QUOTATION','■ 견적 세부 내역':'■ Quotation details','(일위대가표 기준 · 수량/단가는 수정 가능)':'(based on Unit Price Table · qty/price editable)','+ 항목 직접 추가':'+ Add item','공급가액':'Supply amount','부가세 (10%)':'VAT (10%)','합계 금액':'Total amount','비 고':'Remarks','견적서에 입력한 내용을 모두 지울까요?':'Clear everything entered in the quotation?','수량·단가 수정, 추가 항목, 상단 입력칸이 초기화됩니다':'Edited qty/prices, added items and header fields will be reset','입력 초기화':'Reset inputs','만드는 중…':'Creating…','견적서 이미지를 저장했습니다':'Quotation image saved','이미지 생성에 실패했습니다':'Image creation failed','온라인 연결을 확인해 주세요':'Please check your connection','보고서 이미지를 저장했습니다':'Report image saved',
'용어 매칭표':'Term matching','용어 매칭표 · 앞의 용어로 통일':'Term matching · unified to the first term','기술자료(TDS)를 읽을 때 오른쪽 표기는 왼쪽 표준용어로 자동 매칭되어 계산·DB 페이지의 같은 항목에 입력됩니다.':'When reading a TDS, terms on the right are matched to the standard term on the left and entered into the same field on the calculation and DB pages.',
'도료의 종류·수지·특성을 요약한 설명':'Summary of paint type, resin and characteristics','적용 대상·부위':'Target / area of use','고형분 용적비 — 도막으로 남는 고형분의 부피 비율':'Volume solids — share of volume that remains as film','액형(1·2액)과 주제:경화제 혼합 비율':'Pack type (1/2-pack) and base:hardener mix ratio','1회 도장 시 권장 건조도막두께':'Recommended dry film thickness per coat','이론 도포율(㎡/L) = SVR × 10 ÷ 추천도막두께':'Theoretical coverage (㎡/L) = SVR × 10 ÷ rec. DFT','온도별 건조·경화 시간표':'Drying / curing times by temperature','손가락에 묻지 않는 상태까지의 시간':'Time until not sticky to the finger','눌러도 자국이 없는 상태 · 서비스(사용) 가능 상태':'No mark when pressed · ready for service','보행 가능 수준으로 굳는 시간':'Time to harden enough to walk on','혼합 후 사용 가능한 시간':'Usable time after mixing','다음 코트를 도장할 수 있는 최소~최대 시간':'Minimum–maximum time before the next coat','앞(아래)에 도장하는 도료 · 도장시스템':'Paint applied before (below) · coating system','뒤(위)에 도장하는 도료 · 도장시스템':'Paint applied after (above) · coating system','도장 전 소지 조정 방법(사용방법)':'Substrate preparation before painting (method)','신너(신나) 및 세척제':'Thinner and cleaning solvent','주제+경화제 혼합 용량 (선적중량·혼합비율 표 포함)':'Base + hardener mixed volume (incl. shipping weight / mix ratio tables)','Part A · 베이스 성분':'Part A · base component','Part B · 경화 성분':'Part B · hardener component','도료 밀도 (중량 ÷ 부피)':'Paint density (weight ÷ volume)','포장 단위 (제품 1세트 용량)':'Package unit (volume per set)','로스율 — 도장 손실 계수':'Loss rate — application loss factor',
'고형분 용적비':'Volume solids','추천도막두께':'Rec. film thickness','이론소요량':'Theoretical consumption','포장 규격':'Package size','도료 특성':'Paint characteristics','선행 도장':'Previous coat','후속 도장':'Next coat','표면 처리':'Surface prep','이전 도장':'Previous coat','혼합비':'Mix ratio','혼합규격':'Mixed size','출고규격':'Package size','건조 시간':'Drying time','가사 시간':'Pot life','로스율':'Loss rate','희석 비율':'Thinning ratio',
'도장 시스템이 비어 있습니다':'The coating system is empty','‘시스템 변경’을 눌러 DB 제품을 선택하거나 검색해 최대 5개까지 고르세요.':'Tap ‘Change System’ to pick or search DB products (up to 5).','DB에서 삭제된 제품입니다. ‘시스템 변경’에서 다시 선택하세요.':'This product was deleted from the DB. Pick again via ‘Change System’.','출고':'Package','/ 혼합':'/ mixed','· 전체':'· all','기준 면적 :':'Base area :','| 로스율 :':'| Loss :',
'중 하나를 선택하면 해당 제품의 소요량 계산 결과와 자재비가 표시됩니다.':' – select one to see its consumption result and material cost.','도막두께(DFT)와 SVR 값을 입력하면 결과가 표시됩니다.':'Enter DFT and SVR to see the result.','(제품 + 희석제)':'(product + thinner)','제품단가·희석제 단가를 입력하면 금액이 계산됩니다.':'Enter product and thinner prices to calculate the cost.','도막두께(DFT)와 SVR 값이 있는 제품이 없어 합계를 계산할 수 없습니다.':'No product has DFT and SVR values, so the total cannot be calculated.','총 소요량(제품+희석제)':'Total qty (product+thinner)','DFT·SVR 입력 필요':'DFT·SVR required','기본면적(또는 코트별 면적)을 입력하면 물량·캔 수량·금액이 계산됩니다.':'Enter the base area (or per-coat area) to calculate quantity, cans and cost.','캔 수량은 올림 환산이며, 금액은 ㎡당 소요량 비례(십원 미만 절사 · VAT 별도)입니다.':'Cans are rounded up; cost is proportional to consumption per ㎡ (rounded down to 10 KRW · VAT excluded).','캔 단위로 구매 시 약':'If bought by whole cans, approx.',
'제품의 추천값을 불러왔습니다':'Product defaults loaded','최대 5개 제품까지 구성할 수 있습니다':'A system can have up to 5 products','삭제할 제품이 없습니다':'No products to delete','마지막 코트(':'Delete the last coat (',')를 삭제할까요?':')?','도장 시스템의 모든 입력 내용을 지울까요?':'Clear all coating system inputs?','도장 시스템 선택':'Select Coating System','제품을 선택하거나 검색해 최대 5개까지 고르세요. 선택한 순서대로 하도 → 중도 → 상도가 됩니다.':'Pick or search up to 5 products. In the order selected they become primer → mid → top coat.','제품명 · 제조사 · 용도 검색':'Search product · maker · use','더 보기 (':'Show more (','개 남음)':' left)','선택된 제품이 없습니다':'No products selected','최대 5개까지 선택할 수 있습니다':'You can select up to 5','제품을 1개 이상 선택하세요':'Select at least 1 product',
'📋 도장 시스템 소요량·자재비':'📋 Coating System Consumption & Cost','소요량(이론/실제):':'Consumption (theo./actual):','필요 물량:':'Required qty:','캔 수량: 제품':'Cans: product','금액: 제품':'Cost: product','+ 희석제':'+ thinner','💰 시스템 합계':'💰 System total','제품 물량:':'Product qty:','희석제 물량:':'Thinner qty:','환산 캔 수량:':'Cans (converted):','캔 (제품':'cans (product','총 금액:':'Total:','시스템을 선택하고 값을 입력하세요':'Select a system and enter values','결과를 복사했습니다':'Result copied','메신저에 붙여넣어 공유하세요':'Paste it into a messenger to share','이 환경에서는 공유를 지원하지 않습니다':'Sharing is not supported here',
'이 기기(브라우저) 안에만 저장':'Stored on this device (browser) only','Coat별 소요량 · 도장 시스템 · 건조시간/재도장 간격 · TDS 자동 읽기 · 보고서 공유':'Per-coat consumption · Coating system · Drying/recoat intervals · TDS auto-reading · Report sharing','도장 면적별 소요량·자재비 산출, 기술자료(TDS) DB 관리':'Consumption & material cost by painted area, TDS database management','무단 복제·배포를 금지하며, 소유권은 권리자에게 있습니다.':'Copying or redistribution without permission is prohibited. Ownership belongs to the rights holder.',
'언어 설정':'Language settings','화면 표시 언어를 선택하세요.':'Choose the display language.','제품명·설명 등 DB 데이터는 원문 그대로 표시됩니다.':'Product names and descriptions in the DB are shown as originally written.',
'도료 소요량 및 자재비':'Paint Consumption & Cost','시스템 총 소요량':'System total consumption','제품 합계':'Product total','희석제 합계':'Thinner total',
'소요량 ':'Qty ','자재비 ':'Cost ','도장 ':'Coat '
}).sort((a,b)=>b[0].length-a[0].length);
/* 숫자+단위 규칙 */
const I18N_RX=[
 [/총\s*(\d[\d,]*)개\s*중\s*(\d[\d,]*)개\s*표시됨/g,'Total $1 · showing $2'],
 [/\(검색\s*(\d[\d,]*)개\)/g,'(search: $1)'],
 [/(\d[\d,]*)\s*개\s*선택됨?/g,'$1 selected'],
 [/(\d[\d,]*)\s*개 제품 선택됨/g,'$1 products selected'],
 [/(\d[\d,.]*)\s*원/g,'$1 KRW'],
 [/(\d[\d,.]*)\s*(?:말|캔)(?![가-힣])/g,(m,n)=>n+(+n.replace(/,/g,'')==1?' can':' cans')],
 [/(\d[\d,.]*)\s*개월/g,'$1 mo'],[/(\d[\d,.]*)\s*주일?(?![가-힣])/g,'$1 wk'],[/(\d[\d,.]*)\s*시간/g,'$1 h'],[/(\d[\d,.]*)\s*분(?![가-힣])/g,'$1 min'],[/(\d[\d,.]*)\s*일(?![가-힣])/g,'$1 d'],
 [/(\d[\d,]*)\s*개(?![가-힣])/g,'$1']
];
const I18N_H=/[가-힣]/,I18N_CACHE=new Map();
const I18N_X=[],I18N_PRE=[];
let I18N_RE=null,I18N_MP=null,I18N_DBS=null,I18N_DBN=-1,I18N_DBT=0;
function i18nBuild(){const m=new Map(I18N_SUB);I18N_X.forEach(([k,v])=>m.set(k,v));const keys=[...m.keys()].filter(k=>k.length>=2).sort((a,b)=>b.length-a.length);I18N_MP=m;I18N_RE=new RegExp(keys.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g')}
function i18nDb(){
 const now=Date.now();if(I18N_DBS&&I18N_DBN===DB.length&&now-I18N_DBT<5000)return I18N_DBS;
 if(!I18N_RE)i18nBuild();
 const s=new Set(),add=v=>{v=v.trim();if(v.length>=4&&I18N_H.test(v)&&!I18N_EX.has(v)&&!I18N_MP.has(v))s.add(v)};
 DB.forEach(p=>['g','d','us','mf','n','tn','sp','pre','nxt','pks','dry','pot','memo'].forEach(k=>{const v=p[k];if(v&&typeof v=='string'){add(v);v.split(/\n/).forEach(add)}}));
 I18N_DBS=s;I18N_DBN=DB.length;I18N_DBT=now;I18N_CACHE.clear();return s}
function i18nCore(s){
 let r=s;
 I18N_PRE.forEach(([a,b])=>{r=r.replace(a,b)});
 I18N_RX.slice(0,4).forEach(([a,b])=>{r=r.replace(a,b)});
 if(!I18N_RE)i18nBuild();
 r=r.replace(I18N_RE,m=>I18N_MP.get(m));
 I18N_RX.slice(4).forEach(([a,b])=>{r=r.replace(a,b)});
 return r}
function trS(s){
 if(LANG!=='en'||typeof s!=='string'||!I18N_H.test(s))return s;
 const c=I18N_CACHE.get(s);if(c!==undefined)return c;
 let r=null;const t=s.trim(),db=i18nDb();
 if(db.has(t))r=s;
 else if(I18N_EX.has(t))r=s.replace(t,I18N_EX.get(t));
 else{
  const isD=x=>{x=x.trim();if(db.has(x))return true;const m=x.match(/^(.*?)\s*\([^)]*\)$/);return !!(m&&db.has(m[1].trim()))};
  for(const sep of [': ',' · ',' / ','\n','└ ','— ']){const i=s.indexOf(sep);if(i>0){const suf=s.slice(i+sep.length).trim();if(suf&&isD(suf)){r=i18nCore(s.slice(0,i))+s.slice(i);break}}}
  if(r===null&&isD(s))r=s;
  if(r===null){r=i18nCore(s);const t2=r.trim();if(I18N_EX.has(t2))r=r.replace(t2,I18N_EX.get(t2))}
 }
 I18N_CACHE.set(s,r);return r}

/* i18n extra entries (v200) */
const X=a=>a.forEach(([k,v])=>{I18N_X.push([k,v]);I18N_EX.set(k,v)});
X([['제품 선택 시 추천값 자동 적용 · DB에 없으면 DFT·SVR 입력','Pick a product to apply its defaults. Products not in the DB are also calculated once you enter DFT and SVR']]);
X([['보기','View'],['첨부','Attach'],['미첨부','No file']]); X([['제품 수기 추가','Add product'],['초기화','Reset'],['제품 검색','Product search'],['기본 제원','Basic specs'],['건조시간 · 재도장 간격','Drying time · Recoat interval'],['구분','Item'],['지촉','Touch dry'],['고화','Hard dry'],['완전경화','Full cure'],['재도장 간격','Recoat interval'],['제품 수정','Edit'],['삭제','Delete'],['검증','Verified'],['미검증','Unverified'],['TDS 첨부','TDS attached'],['상세 정보 · 출처','Details · Source'],['혼합규격','Mix size'],['혼합비','Mix ratio'],['출고규격','Shipped size'],['희석제','Thinner'],['추천도막','Rec. DFT'],['SVR (고형분 용적비)','SVR (solids by volume)'],['단액형','Single pack'],['무희석','No thinning']]); I18N_PRE.push([/^총 (\d+)개 중 (\d+)개 표시됨/g,'$2 of $1 shown'],[/^TDS 첨부 (\d+)$/g,'TDS attached $1']);
I18N_PRE.push(
 [/^전체 (\d+)$/g,'All $1'],[/^미첨부 (\d+)$/g,'No TDS $1'],
 [/(\d+)행: /g,'Row $1: '],[/가져오기 실행 \((\d+)개\)/g,(m,n)=>'Run import ('+n+(+n==1?' item)':' items)')],
 [/(\d+)개 제품을 CSV로 내보냅니다\./g,'Exporting $1 products as CSV.'],[/승인된 (\d+)개 제품을 (CSV|JSON)로 내보냅니다\./g,'Exporting $1 approved products as $2.'],
 [/백업\((.*?) · 제품 (\d+)개\)을 $/g,'Restore backup ($1 · $2 products) as '],
 [/제품 (\d+)개 포함/g,'$1 products included'],[/^제품 (\d+)개$/g,'$1 products'],[/^대상 (\d+) ·/g,'Targets $1 ·'],[/^(\d+)개 제품$/g,'$1 products'],
 [/추가 (\d+) · 갱신 (\d+) · 건너뜀 (\d+)/g,'Added $1 · Updated $2 · Skipped $3'],[/추가 (\d+) · 갱신 (\d+)/g,'Added $1 · Updated $2'],
 [/^(\d+)개 선택$/g,'$1 selected'],[/ 외 (\d+)개/g,' and $1 more'],[/대상 (\d+) · /g,'Targets $1 · ']
);
X([
['안녕하세요!','Hello!'],['오늘도 더 스마트한 도장공사를 위해','For smarter painting work today'],['TDS 등록','Register TDS'],['TDS 자동 분석','TDS auto-analysis'],['제품 DB','Product DB'],['제품 DB 관리','Manage product DB'],['계산하기','Calculate'],['도료 소요량 계산','Paint consumption calc'],['일위대가표 작성','Build unit price table'],['견적서','Quotation'],['견적서 · 보고서 출력','Print quotation · report'],['CSV 관리','CSV'],['CSV · 백업 · 설정','CSV · Backup · Settings'],['CSV · 백업','CSV · Backup'],['백업','Backup'],['최근 작업 내역','Recent activity'],['아직 작업 내역이 없습니다','No activity yet'],['관리자 모드','Admin mode'],['배포용 데이터 관리 · 이용조건 확인 · 내보내기','Manage distribution data · terms check · export'],['TDS등록','TDS'],['제품DB','Product DB'],['더보기','More'],['계산 ','Calc '],
['아직 백업하지 않았습니다. 데이터는 이 기기에만 저장됩니다.','No backup yet. Data is stored on this device only.'],['마지막 백업이 30일 이상 지났습니다. 데이터는 이 기기에만 저장됩니다.','The last backup is over 30 days old. Data is stored on this device only.'],
['등록된 제품이 없습니다','No products registered'],['TDS를 등록하거나 제품을 직접 추가하고, CSV로 가져올 수 있습니다.','Register a TDS, add a product manually, or import a CSV.'],['첫 제품을 등록하거나 CSV로 가져오세요.','Register your first product or import a CSV.'],['제품 직접 추가','Add manually'],['CSV 가져오기','Import CSV'],['백업 복원','Restore backup'],
['견적서 · 보고서','Quotation · Report'],['백업 · 복원','Backup · Restore'],['설정 · 언어','Settings · Language'],['자료 이용 안내','Data Use Notice'],['도장 시스템','Coating System'],
['제조사 기술자료(TDS)·표·이미지·로고의 권리는 각 제조사에 있습니다. 이 프로그램은 제조사 자료를 제공하지 않으며, 사용자가 이용 권한을 가진 자료만 등록해 주세요.','Rights to manufacturers\' technical data (TDS), tables, images and logos belong to each manufacturer. This program does not provide manufacturer material; register only material you are authorized to use.'],
['TDS 원문의 설명 문구·표·이미지는 저장하지 않습니다. 추출값은 참고용이므로 반드시 원문과 대조하고, 출처·개정일·확인일을 기록해 두세요.','Original TDS descriptions, tables and images are not stored. Extracted values are for reference; always compare them with the source and record the source, revision date and checked date.'],
['공개된 자료라는 이유만으로 복제·재배포가 허용되는 것은 아닙니다. 제품 DB를 외부로 공유·배포하기 전에 출처의 이용조건을 확인하세요.','Public availability alone does not permit copying or redistribution. Check the source\'s terms of use before sharing or distributing the product DB.'],
['데이터는 이 기기(브라우저 저장소)에만 저장되며, 브라우저 데이터 삭제나 기기 변경 시 사라질 수 있습니다. 백업 기능을 이용하세요. 외부 서버로 전송하지 않으며, PDF·엑셀·OCR·이미지 저장 도구를 처음 불러올 때만 공개 CDN(cdnjs, jsDelivr)에 접속하므로 접속 정보(IP 등)가 해당 CDN에 전달될 수 있습니다. 오픈소스: PDF.js·SheetJS CE·Tesseract.js(Apache-2.0), html2canvas(MIT).','Data is stored only on this device (browser storage) and may be lost if browser data is cleared or the device changes. Use the backup feature. Nothing is sent to external servers; an online connection is only needed the first time the PDF/OCR tools load.'],
['이 안내는 법률 자문이 아니며, 안내문만으로 법적 위험이 없어지는 것은 아닙니다. 배포 전에는 이용 권한과 법률 검토가 필요합니다.','This notice is not legal advice, and a notice alone does not remove legal risk. Usage rights and a legal review are required before distribution.'],
['확인했습니다','I understand'],
['제품설명 (직접 요약 · 원문 복사 금지)','Description (summarize yourself · do not copy)'],['용도 (직접 요약)','Use (summarize yourself)'],['출처 URL (TDS 링크)','Source URL (TDS link)'],['TDS 개정일 (예: 2025-05-14)','TDS revision date (e.g. 2025-05-14)'],['자료 확인일 (예: 2026-10-09)','Checked date (e.g. 2026-10-09)'],['사용자 메모','Memo'],['검증 상태: 미검증','Verification: unverified'],['검증 완료 (원문 대조함)','Verified (checked against source)'],
['■ 등록 · 가져오기','■ Register · Import'],['TDS 분석 결과는 검토 후 저장되고, CSV는 미리보기·검증 후 반영됩니다.','TDS results are saved after review; CSV is applied after preview and validation.'],
['■ 기술자료(TDS PDF·사진)를 선택하면 글자·OCR로 항목을 읽고,','■ Select a TDS (PDF/photo) and items are read by text/OCR; '],['검토 화면에서 확인한 뒤 등록','confirm them on the review screen before registering'],['합니다. 원문 설명·표·이미지는 저장하지 않습니다.','. Original descriptions, tables and images are not stored.'],
['관리자용','Admin edition'],['배포용','Distribution edition'],['v200-검토','v200-review'],['· 일위대가표','· Unit Price Table'],['등록 제품','Products'],
['링크 또는 PDF로 분석하고, 검토 후 등록합니다','Analyze from a link or PDF and register after review'],['링크 등록','By link'],['파일 첨부','Attach file'],['제조사 홈페이지 TDS URL','Manufacturer TDS URL'],
['일부 사이트는 로그인·접근 제한 때문에 자동으로 내려받을 수 없습니다. 이 경우 PDF를 직접 첨부하면 URL은 출처로 기록됩니다.','Some sites cannot be downloaded automatically because of login or access limits. In that case attach the PDF; the URL is recorded as the source.'],
['PDF 또는 이미지 파일 (최대 20MB)','PDF or image file (max 20MB)'],['출처 URL (선택)','Source URL (optional)'],['TDS 개정일 (선택)','TDS revision date (optional)'],['원본 PDF를 이 기기에 보관합니다 (기본: 분석 후 보관하지 않음)','Keep the original PDF on this device (default: not kept after analysis)'],
['이 자료를 이용할 권한이 있으며, 제조사의 이용조건을 확인했습니다.','I am authorized to use this material and have checked the manufacturer\'s terms of use.'],['분석 시작','Start analysis'],['저장 정책','Storage policy'],
['TDS 원문의 설명 문구·표·이미지는 저장하지 않고, 계산에 필요한 값(DFT·SVR·비중·혼합비 등)만 검토 후 등록합니다. 분석 결과는 바로 저장되지 않습니다.','Original TDS descriptions, tables and images are not stored. Only values needed for calculation (DFT, SVR, specific gravity, mix ratio, etc.) are registered after review. Results are not saved immediately.'],
['최근 등록','Recent registrations'],['등록 내역이 없습니다','No registrations yet'],['예: 2025-05-14','e.g. 2025-05-14'],
['자료 이용조건 확인에 체크해 주세요','Please confirm the terms of use'],['https:// 로 시작하는 주소를 입력하세요','Enter an address starting with https://'],['파일을 선택하세요','Select a file'],['주소에서 자료를 가져오는 중…','Fetching the file from the address…'],
['이 주소의 자료를 직접 가져오지 못했습니다. 접근 제한이거나 보안 정책 때문일 수 있습니다. PDF를 내려받아 ‘파일 첨부’에서 올려 주세요 (URL은 출처로 기록됩니다).','Could not fetch the file from this address (access limits or security policy). Download the PDF and upload it under ‘Attach file’ (the URL is recorded as the source).'],
['파일이 20MB를 초과합니다.','The file exceeds 20MB.'],['PDF 형식이 아닙니다. 올바른 PDF 또는 이미지 파일을 선택하세요.','Not a PDF. Select a valid PDF or image file.'],['분석에 실패했습니다: ','Analysis failed: '],['제품 DB에서 직접 입력할 수도 있습니다.','You can also enter it manually in the product DB.'],['문서를 분석하는 중…','Analyzing the document…'],
['추출 결과 확인','Review extracted values'],['추출값은 바로 저장되지 않습니다. 단위와 값을 원문과 대조해 수정한 뒤 등록하세요. 혼합비가 부피비인지 중량비인지 확인이 필요합니다.','Extracted values are not saved immediately. Compare units and values with the source, edit them, then register. Check whether the mix ratio is by volume or by weight.'],
['제품 유형 (짧게)','Product type (short)'],['추천 도막(DFT)','Rec. DFT'],['SVR(고형분 용적비)','SVR (volume solids)'],['단위 (L 또는 kg)','Unit (L or kg)'],['출고규격(주제)','Package size (base)'],['혼합규격(주제+경화제)','Mixed size (base+hardener)'],['혼합비 기준','Mix ratio basis'],['희석제 코드','Thinner code'],['추천 희석율','Rec. thinning'],['희석제 규격','Thinner size'],['표면처리 (짧게)','Surface prep (short)'],
['검토 필요','Needs review'],['미확인','Unknown'],['수정됨','Edited'],['확인됨','Confirmed'],['부피비','By volume'],['중량비','By weight'],['원문 확인: ','Source: '],['출처 URL','Source URL'],['TDS 개정일','TDS revision date'],['자료 확인일','Checked date'],['검토 완료','I checked the extracted values against the source (register as verified)'],['등록하기','Register'],
['⚠ 값을 확인하세요','⚠ Check the values'],[' 값이 올바른 범위가 아닙니다',' is out of range'],['희석율은 0~100% 범위여야 합니다','Thinning must be between 0 and 100%'],['⚠ 혼합규격은 출고규격(주제)보다 작을 수 없습니다','⚠ Mixed size cannot be smaller than package size (base)'],['kg 단위인데 비중이 없습니다 (L 기준으로 계산됩니다)','Unit is kg but specific gravity is missing (calculated on an L basis)'],['그대로 등록할까요?','Register anyway?'],['같은 이름의 제품이 이미 있습니다.','A product with the same name already exists.'],['입력한 값으로 갱신할까요?','Update it with the entered values?'],['제품을 등록했습니다','Product registered'],['검증 완료','Verified'],['미검증','Unverified'],[' · 원본 PDF 보관',' · original PDF kept'],
['이 자료를 이용할 권한이 있으며,','I am authorized to use this material and'],['제조사의 이용조건을 확인했습니까?','have checked the manufacturer\'s terms of use?'],['분석 결과는 검토 후 등록됩니다.','Results are registered after review.'],
['사용내역','Usage details'],['미검증 제품 · ','Unverified products · '],[' — 원문과 대조해 검증하세요.',' — verify against the source.'],['입력값 확인','Check inputs'],['SVR는 0~100% 범위여야 합니다','SVR must be between 0 and 100%'],['도막두께 값을 확인하세요','Check the film thickness'],['로스율은 0% 이상 100% 미만이어야 합니다','Loss must be at least 0% and below 100%'],['단가가 음수입니다','A price is negative'],['kg 단위 제품에 비중이 없어 L 기준으로 계산됩니다','kg-unit product has no specific gravity; calculated on an L basis'],['혼합비 기준(부피비·중량비) 확인 필요','Check the mix ratio basis (volume/weight)'],['면적이 음수입니다','Area is negative'],
['CSV 가져오기','Import CSV'],['미리보기와 검증 후 반영합니다','Applied after preview and validation'],['빈 CSV 양식 내려받기','Download blank CSV template'],['CSV · 엑셀 · JSON 파일 선택','Choose a CSV / Excel / JSON file'],['제품설명·용도 열도 가져오기 (기본: 제외 — 제조사 원문 문구 복제 방지)','Also import description / use columns (default: excluded — avoids copying manufacturer text)'],['중복 제품 처리','Duplicate products'],['기존 제품 갱신 (빈 값은 유지)','Update existing (blank values are kept)'],['건너뛰기 (새 제품만 추가)','Skip (add new products only)'],
['CSV 내보내기','Export CSV'],['범위와 포함 항목을 선택하세요','Choose scope and included items'],['내보낼 범위','Export scope'],['내 제품 DB 전체','Entire product DB'],['검증 완료 제품만','Verified products only'],['선택한 제품만','Selected products only'],['출처·개정일·확인일·검증 여부·메모 포함','Include source, revision, checked date, verified flag, memo'],['제품설명·용도 문구 포함 (기본: 제외)','Include description / use text (default: excluded)'],
['내보내기 파일은 개인·회사 DB용입니다. 외부에 공유·배포하기 전에 출처의 이용조건을 확인하세요.','The export is for your personal / company DB. Check the source\'s terms of use before sharing or distributing it.'],['제품명·제조사 검색','Search product · maker'],['제품이 없습니다','No products'],
['예시 행은 지우고 사용하세요','Delete the example row before use'],['빈 양식을 내려받았습니다','Template downloaded'],['첫 번째 예시 행은 지우고 사용하세요','Delete the first example row before use'],['내보낼 제품이 없습니다','No products to export'],['CSV를 내보냈습니다','CSV exported'],
['미리보기 · ','Preview · '],['신규','New'],['갱신','Update'],['오류','Error'],['주의','Warning'],['행','Row'],['도막','DFT'],['상태','Status'],['인식하지 못한 열(무시됨): ','Unrecognized columns (ignored): '],['오류 행은 가져오지 않습니다. 수정 후 다시 불러오세요.','Rows with errors are not imported. Fix them and load again.'],
['파일이 10MB를 초과합니다','The file exceeds 10MB'],['CSV · XLSX · JSON 파일만 가능합니다','Only CSV, XLSX and JSON files are supported'],['제품명 열을 찾지 못했습니다','Could not find a product-name column'],['JSON 형식이 올바르지 않습니다','Invalid JSON format'],['제품명 없음','Missing product name'],[' 숫자가 아님',' is not a number'],['희석율(%) 범위 오류','Thinning (%) out of range'],['SVR은 0 초과 100 이하','SVR must be above 0 and at most 100'],['추천도막 오류','Invalid rec. DFT'],['추천도막 1000㎛ 이상 — 단위 확인','Rec. DFT ≥ 1000㎛ — check the unit'],['비중 범위 오류','Specific gravity out of range'],['혼규 < 출규','Mixed size < package size'],['파일 내 중복','Duplicate in file'],['수식 형태 제품명','Formula-like product name'],
['가져오기를 완료했습니다','Import complete'],['범위: ','Scope: '],['메타 정보: ','Meta info: '],['포함','included'],['제외','excluded'],['제품설명·용도: ','Description · use: '],['TDS 원본 파일·이미지는 포함되지 않습니다.','TDS originals and images are not included.'],
['데이터 백업 · 복원','Data Backup · Restore'],['JSON은 제품 DB·작업 내용·설정을 모두 포함합니다','JSON includes the product DB, work and settings'],['마지막 백업: ','Last backup: '],['없음','None'],['· TDS PDF 원본은 백업에 포함되지 않습니다.','· Original TDS PDFs are not included in the backup.'],['JSON 백업 저장','Save JSON backup'],['백업 파일 복원','Restore a backup file'],['병합 (기존 유지, 같은 제품은 갱신)','Merge (keep existing, update same products)'],['전체 대체 (현재 데이터 삭제)','Replace all (deletes current data)'],['환경 설정','Preferences'],['표시 언어 · 단위','Display language · units'],['한국어','한국어'],
['단위: 미터법 (L · kg · ㎡ · ㎛) — 변경 불가','Units: metric (L · kg · ㎡ · ㎛) — not changeable'],['저장소 사용량: ','Storage used: '],['저장 위치 · 자료 이용','Storage · Data use'],['관리자용 빌드 · ','Admin build · '],['배포용 빌드 · ','Distribution build · '],
['데이터는 이 기기의 브라우저 저장소(localStorage · IndexedDB)에만 저장됩니다. 브라우저 데이터를 지우거나 기기를 바꾸면 사라질 수 있으니 정기적으로 백업하세요.','Data is stored only in this device\'s browser storage (localStorage · IndexedDB). It can be lost if you clear browser data or change devices, so back up regularly.'],['자료 이용 안내 보기','View data use notice'],['코트 온 백업 파일이 아닙니다','Not a Coat On backup file'],['백업 파일을 저장했습니다','Backup file saved'],['복원했습니다','Restored'],['로 복원할까요?','?'],['전체 대체','Replace all'],['병합','Merge'],['현재 제품 DB와 작업 내용이 삭제됩니다.','The current product DB and work will be deleted.'],
['코트 온 관리자','Coat On Admin'],['코트 온','Coat On'],['관리자용 빌드 · 배포용 데이터 관리','Admin build · distribution data management'],['전체 제품','All products'],['검증 완료','Verified'],['출처 기록','Source recorded'],['배포 승인','Approved'],['TDS 첨부','TDS attached'],['기본 탑재(원본)','Bundled (original)'],
['관리자용 빌드에는 기존 원본 DB가 포함되어 있습니다. 배포용 빌드는 기본 DB가 비어 있고 이 화면이 없습니다. 두 빌드를 서로 다른 주소에 배포하세요.','The admin build includes the original DB. The distribution build starts with an empty DB and has no admin screen. Host the two builds at different addresses.'],
['이용조건 확인 · 배포 승인','Terms check · Distribution approval'],['출처와 이용조건을 확인한 제품만 승인하세요','Approve only products whose source and terms you have checked'],['미승인','Not approved'],['승인됨','Approved'],['승인','Approve'],['검증','Verify'],['미지정 · 출처 없음','Unspecified · no source'],['미지정 · 출처 있음','Unspecified · source recorded'],[' · 출처 없음',' · no source'],[' · 출처 있음',' · source recorded'],
['배포용 데이터셋 내보내기','Export distribution dataset'],['승인된 제품만 · 설명·용도·메모·원본 제외','Approved products only · no descriptions, use, memo or originals'],['전체 원본 백업 (JSON)','Full original backup (JSON)'],['배포 승인된 제품이 없습니다','No approved products'],['이 제품은 출처 URL이 기록되어 있지 않습니다.','No source URL is recorded for this product.'],['이용조건을 확인했다면 승인할까요?','Approve it if you have checked the terms of use?'],['배포용 데이터셋을 내보냈습니다','Distribution dataset exported'],
['제품설명·용도·메모·TDS 원본은 포함되지 않습니다.','Descriptions, use, memo and TDS originals are not included.'],['배포 전 출처의 이용조건과 법률 검토를 확인하세요.','Check the source terms and complete a legal review before distribution.'],
['출처 ','Source '],['개정일 ','Revision '],['확인일 ','Checked '],['메모 ','Memo '],['출처 미기록','Source not recorded'],['미기록','not recorded'],
['[주제:경화제]','[base:hardener]'],['재도장간격','Recoat interval'],['· 제품','· Product'],['희석율(%)','Thinning (%)'],['면적[m²]','Area[m²]'],['면적[㎡]','Area[㎡]'],['희석제 단가[원]','Thinner price [KRW]'],['제품을 선택하세요','Select a product'],['초기화','Reset'],['㎡ 기준]','㎡ basis]'],['제품[','Product['],['희석제[','Thinner['],['소요량','Qty'],['전용 희석제','Dedicated thinner'],['건조시간','Drying time'],['제품단가[원/','Product price [KRW/'],['미선택','None'],['선택됨','selected'],
['등록 · 가져오기','Register · Import']
,['백업 · 설정','Backup · Settings'],['등록된 내용이 없습니다','Nothing registered'],['추천 도막','Rec. DFT']
]);

const I18N_T=new WeakMap(),I18N_A=new WeakMap(),I18N_AT=['placeholder','title','aria-label'];
const i18nSkip=n=>{const p=n.parentElement;return !p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName)||p.closest('.glt td,[data-notr]')};
function i18nNode(n){
 if(LANG!=='en')return;const v=n.nodeValue;if(!I18N_H.test(v)||i18nSkip(n))return;
 const r=trS(v);if(r!==v){I18N_T.set(n,{ko:v,en:r});n.nodeValue=r}
}
function i18nAttr(el){
 if(LANG!=='en'||!el.getAttribute)return;
 I18N_AT.forEach(a=>{const v=el.getAttribute(a);if(v&&I18N_H.test(v)){const r=trS(v);if(r!==v){let m=I18N_A.get(el);if(!m){m={};I18N_A.set(el,m)}m[a]={ko:v,en:r};el.setAttribute(a,r)}}});
}
function i18nTree(root){
 if(LANG!=='en'||!root)return;
 if(root.nodeType===3){i18nNode(root);return}
 if(root.nodeType!==1)return;
 i18nAttr(root);root.querySelectorAll&&root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(i18nAttr);
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())i18nNode(n);
}
function i18nRestore(){
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){const o=I18N_T.get(n);if(o){if(n.nodeValue===o.en)n.nodeValue=o.ko;I18N_T.delete(n)}}
 document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{const m=I18N_A.get(el);if(m){Object.keys(m).forEach(a=>{if(el.getAttribute(a)===m[a].en)el.setAttribute(a,m[a].ko)});I18N_A.delete(el)}});
}
const i18nMO=new MutationObserver(ms=>{
 if(LANG!=='en')return;
 for(const m of ms){
  if(m.type==='characterData')i18nNode(m.target);
  else if(m.type==='attributes')i18nAttr(m.target);
  else m.addedNodes.forEach(i18nTree);
 }
});
function applyLang(l){
 LANG=l==='en'?'en':'ko';
 try{LS.lang=LANG}catch(e){}
 document.documentElement.lang=LANG;document.body.classList.toggle('en',LANG==='en');
 I18N_CACHE.clear();
 if(LANG==='en'){i18nTree(document.body);document.title='Coat On'}
 else{i18nRestore();document.title='코트 온'}
 const st=document.getElementById('lgs');if(st)lgsRender();
}
i18nMO.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:I18N_AT});

/* 설정 시트 */
function lgsRender(){
 const e=document.getElementById('lgs');if(!e)return;
 e.querySelectorAll('.lgo').forEach(b=>b.classList.toggle('on',b.dataset.l===LANG));
}
function openSettings(){
 let e=document.getElementById('lgs');if(e)e.remove();
 e=document.createElement('div');e.id='lgs';e.onclick=ev=>{if(ev.target===e)e.remove()};
 const ck='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M7.8 12.4l2.9 2.9 5.6-5.8"/></svg>';
 e.innerHTML=`<div class="lgb"><div class="lgh"><span class="lgi"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3 3 16.5 0 19M12 2.5c-3 3-3 16.5 0 19"/></svg></span><b>언어 설정</b></div><div class="lgd">화면 표시 언어를 선택하세요.</div><div class="lgl"><button class="lgo" data-l="ko" data-notr onclick="applyLang('ko')"><span>한국어</span><i>${ck}</i></button><button class="lgo" data-l="en" data-notr onclick="applyLang('en')"><span>English</span><i>${ck}</i></button></div><div class="lgn">제품명·설명 등 DB 데이터는 원문 그대로 표시됩니다.</div><button class="lgc" onclick="document.getElementById('lgs').remove()"><span>닫기</span></button></div>`;
 document.body.append(e);lgsRender();
}
(()=>{const g=document.querySelector('#vh .hgr');if(g){g.setAttribute('onclick','openSettings()');g.setAttribute('aria-label','설정')}})();
/* 기존 텍스트 공유 문자열도 현재 언어로 */
{const _st=shareText,_sy=syText;shareText=function(){return trS(_st.apply(this,arguments))};syText=function(){return trS(_sy.apply(this,arguments))}}


/* ===== v200 검토버전: 에디션 · 데이터 정책 · 대시보드 · TDS 검토 등록 ===== */
const IS_ADMIN=EDITION==='admin';
const pqToday=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const pqSv=d=>`<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${d}</svg>`;
const PQI={
 tds:pqSv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h4"/>'),
 db:pqSv('<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'),
 calc:pqSv('<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>'),
 sys:pqSv('<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>'),
 quote:pqSv('<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h3"/>'),
 csv:pqSv('<path d="M4 4h16v16H4z"/><path d="M4 9h16M4 14h16M10 4v16"/>'),
 set:pqSv('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
 shield:pqSv('<path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>'),
 admin:pqSv('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><path d="M13 16.5h7M16.5 13v7"/>'),
 info:pqSv('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.4"/>'),
 globe:pqSv('<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3 3 16.5 0 19M12 2.5c-3 3-3 16.5 0 19"/>'),
 save:pqSv('<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h7V3M8 21v-7h8v7"/>'),
 plus:pqSv('<path d="M12 5v14M5 12h14"/>'),
 chev:pqSv('<path d="M9 6l6 6-6 6"/>'),
 warn:'<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" style="flex:none"><path d="M12 3.5 2.5 20h19z" fill="#f5a524"/><path d="M12 9.5v5M12 17.2v.3" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>'
};
const pqSheet=(id,html,cls)=>{let e=document.getElementById(id);if(e)e.remove();e=document.createElement('div');e.id=id;e.className='pqs';e.onclick=ev=>{if(ev.target===e)e.remove()};e.innerHTML='<div class="pqsb '+(cls||'')+'">'+html+'</div>';document.body.append(e);return e};
const pqX=id=>{const e=document.getElementById(id);if(e)e.remove()};
const pqNum=v=>{if(v===''||v==null)return NaN;const n=+String(v).replace(/,/g,'');return Number.isFinite(n)?n:NaN};

/* 최근 작업 */
const pqRc=()=>{try{return JSON.parse(LS.rc||'[]')}catch(e){return[]}};
function pqRcAdd(t,n,x){const a=pqRc().filter(y=>!(y.t==t&&y.n==n));a.unshift(Object.assign({t,n,d:pqToday()},x||{}));try{LS.rc=JSON.stringify(a.slice(0,60))}catch(e){}}

/* 하단 메뉴 */
const NAVI=n=>({2:0,0:1,3:2,5:4,4:4,1:4,7:4,8:4,9:4,10:4}[n]??-1);
const pqTitle=n=>({0:'일위대가표',1:'데이터 시트',2:'일위대가표',3:(window.SYM=='db'?'사양 DB':'도장 시스템'),4:'TDS 등록',5:'CSV · 백업',7:'관리자 모드',8:'실란트 소요량 · 메쉬 소요량',9:'LCC',10:'제품 비교'}[n]||'일위대가표');
const pqHs2=n=>({4:'TDS Registration',5:'CSV · Backup',7:'Admin Console',8:'Sealant · Mesh Quantity',9:'Life Cycle Cost',10:'Product Comparison'}[n]);

/* 대시보드 */
function dashRender(){try{dashRender0()}catch(err){const e=document.getElementById('dash');if(e)e.innerHTML='<div class="dsh"><div class="dsr"><b>최근 작업 내역</b><div class="dsl none">표시하지 못했습니다 · '+esc(String(err&&err.message||err).slice(0,80))+'</div></div></div>'}}
function dashRender0(){
 const e=document.getElementById('dash');if(!e)return;
 const vh=document.getElementById('vh');if(vh)vh.classList.add('cd');
 const N=s=>{const n=parseFloat(String(s==null?'':s).replace(/[^\d.\-]/g,''));return isFinite(n)?n:0},Fm=n=>Math.round(n).toLocaleString('ko-KR');
 const SV=(d,sw)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw||2}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
 const IC={
  calc:SV('<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8.5 7.5h7"/><path d="M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" stroke-width="2.6"/>'),
  shield:SV('<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M8.7 12l2.4 2.4 4.4-4.8"/>'),
  house:SV('<path d="M3.5 11.5L12 4l8.5 7.5"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5M10 11h.01M14 11h.01" stroke-width="2.4"/>'),
  cycle:SV('<path d="M20 11a8 8 0 0 0-14-4"/><path d="M5 3v4h4"/><path d="M4 13a8 8 0 0 0 14 4"/><path d="M19 21v-4h-4"/><circle cx="12" cy="12" r="2.4"/>'),
  chip:SV('<rect x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/><path d="M9.5 15l1.8-6 1.8 6M10 13.4h2.6M15 9v6" stroke-width="1.7"/>'),
  doc:SV('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5M10 8h2"/>'),
  bell:SV('<path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15z"/><path d="M10 21h4"/>',2.2),
  menu:SV('<path d="M4 7h16M4 12h16M4 17h16"/>',2.4),
  coins:SV('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4"/>',1.8),
  bld:SV('<rect x="5" y="3" width="10" height="18" rx="1.5"/><rect x="15" y="9" width="5" height="12" rx="1.5"/><path d="M8 7h4M8 11h4M8 15h4M17 13h1M17 17h1"/>',1.8),
  bars:SV('<rect x="4" y="12" width="4" height="8" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="16" y="9" width="4" height="11" rx="1"/>',2),
  pie:SV('<path d="M12 3v9h9"/><path d="M20.5 15A9 9 0 1 1 9 3.6"/>',2),
  cal:SV('<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M4 10h16"/>',2),
  arr:SV('<path d="M5 12h14M13 6l6 6-6 6"/>',2.4),
  chev:SV('<path d="M9 5l7 7-7 7"/>',2.4),
  up:SV('<path d="M12 19V5M6 11l6-6 6 6"/>',2.8),
  dn:SV('<path d="M12 5v14M6 13l6 6 6-6"/>',2.8)
 };
 /* ---- 데이터 ---- */
 const now=new Date(),ym=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'),cur=ym(now),prv=ym(new Date(now.getFullYear(),now.getMonth()-1,1));
 let Q=[];try{Q=(typeof qtLoad=='function'?qtLoad():[]).filter(r=>r&&r.ts).slice().sort((a,b)=>b.ts-a.ts)}catch(_){}
 let APT=[];try{const a0=JSON.parse(localStorage.getItem('apt26:list')||'[]');if(Array.isArray(a0))APT=a0.filter(e=>e&&e.ts).slice().sort((x,y)=>y.ts-x.ts)}catch(_){}
 const WORKT=/일위대가|시스템|재도장|공동|LCC|진단|면적/;
 let rc=pqRc();if(!Array.isArray(rc))rc=[];rc=rc.filter(x=>x&&typeof x=='object'&&WORKT.test(String(x.t||'')));
 const qa=r=>{const s=(r.st&&r.st.S)||{};let a=N(s.area);if(!a&&Array.isArray(s.coats))a=Math.max(0,...s.coats.map(c=>N(c&&c.area)));return a};
 /* 현재 작업 중인 일위대가표 · 도장 시스템 (실시간 입력값) */
 const live={pq:null,sy:null};
 try{const A0=+S.area||0,L=[];let cost=0;(S.coats||[]).forEach(c=>{if(!c||!c.n)return;const r=calc(c);if(!r)return;const Ac=+c.area||A0;L.push({c,Ac});cost+=r.reduce((z,x)=>z+x.amt,0)*Ac});
  if(L.length)live.pq={n:L.map(x=>x.c.n).join(' · '),area:A0||Math.max(0,...L.map(x=>x.Ac)),cost:Math.round(cost/10)*10,coats:L.map(x=>x.c)}}catch(_){}
 try{const ly=(SY&&SY.layers||[]).filter(c=>c&&c.n);if(ly.length)live.sy={n:ly.map(c=>c.n).join(' · '),area:+SY.area||0,coats:ly}}catch(_){}
 let aC=0,aP=0;Q.forEach(r=>{const m=ym(new Date(r.ts)),a=qa(r);if(m==cur)aC+=a;else if(m==prv)aP+=a});
 rc.forEach(x=>{if(x.m&&Q.length==0){const m=String(x.d||'').slice(0,7);if(m==cur)aC+=N(x.m);else if(m==prv)aP+=N(x.m)}});
 let aLive=0;if(!aC){aLive=Math.max(live.pq?live.pq.area:0,live.sy?live.sy.area:0);aC=aLive}
 const pct=(c,p)=>p>0?(c-p)/p*100:null;
 const dl=(v,suf)=>v==null?`<span class="cd-dm">${suf||'비교할 지난 기록 없음'}</span>`:`<span class="${v>=0?'cd-up':'cd-dn'}">${v>=0?IC.up:IC.dn}${Math.abs(v).toFixed(0)}%</span>`;
 let q0=0,qSrc='견적서 발송 시 표시';const q1=Q[1]?N(Q[1].total):0;
 if(Q[0]&&N(Q[0].total)){q0=N(Q[0].total);qSrc='최근 견적서 기준'}else if(live.pq&&live.pq.cost){q0=live.pq.cost;qSrc='현재 일위대가표 기준'}else if(APT[0]&&N(APT[0].total)){q0=N(APT[0].total);qSrc='공동주택 견적 기준'}
 let dQ=Q[0]&&q1>0&&q0?pct(q0,q1):null,dMo=pct(aC,aP);
 let nP=DB.length;const nPm=DB.filter(p=>String(p.ext||'').slice(0,7)==cur).length;let pD=nPm?`<span class="cd-up">${IC.up}이번 달 ${nPm}개</span>`:`<span class="cd-dm">이번 달 신규 없음</span>`;
 const sites=new Set(Q.map(r=>String(r.site||'').trim()).concat(APT.map(e=>String(e.name||'').trim())).filter(Boolean));let nS=sites.size;let sD='<span class="cd-dm">견적서·공동주택 기준</span>';
 /* 작업 현황: 공동주택 진행 상태 + 현재 작업 + 발송 견적 */
 let wRun=0,wHold=0,wDone=Q.length;
 APT.forEach(e=>{const t=e.stt||'대기';if(t=='완료')wDone++;else if(t=='대기')wHold++;else wRun++});
 if(live.pq)wRun++;if(live.sy)wRun++;
 const wMax=Math.max(1,wRun,wDone,wHold);
 /* 최근 산출 내역 */
 const tdy=pqToday(),seen=new Set();
 let recent=[];
 const pushR=o=>{const k=o.t+'|'+o.n;if(seen.has(k))return;seen.add(k);recent.push(o)};
 if(live.pq)pushR({t:'일위대가표',n:live.pq.n,d:tdy,ts:Date.now()});
 if(live.sy)pushR({t:'도장시스템',n:live.sy.n,d:tdy,ts:Date.now()-1});
 APT.forEach(e=>pushR({t:'재도장공사',n:String(e.name||'무제'),d:qtFmt(e.ts).slice(0,10),ts:e.ts}));
 Q.forEach(r=>pushR({t:'견적서',n:String(r.site||r.recv||r.no||''),d:qtFmt(r.ts).slice(0,10),ts:r.ts}));
 rc.forEach(x=>pushR({t:x.t,n:x.n,d:String(x.d||''),ts:Date.parse(x.d)||0}));
 recent=recent.sort((a,b)=>b.ts-a.ts).slice(0,5);
 const cc=t=>/일위대가/.test(t)?'c1':/시스템/.test(t)?'c2':/재도장|공동/.test(t)?'c3':/LCC/.test(t)?'c4':/진단/.test(t)?'c5':/견적/.test(t)?'c6':/면적/.test(t)?'c7':'c0';
 /* 제품별 사용 비중 */
 const catOf=n=>{const p=DB.find(x=>x.n==n),s=n+' '+(p?((p.g||'')+' '+(p.us||'')+' '+(p.d||'')):'');let t='';try{t=pqType(s)}catch(_){}return (t.split('·')[0])||'기타'};
 const use={};let used=0;const addU=(n,a)=>{const k=catOf(n);use[k]=(use[k]||0)+a;used+=a};
 Q.slice(0,30).forEach(r=>{const s=(r.st&&r.st.S)||{};(s.coats||[]).forEach(c=>{const n=c&&String(c.n||'').trim();if(!n)return;addU(n,N(c.area)||N(s.area)||1)})});
 if(live.pq)live.pq.coats.forEach(c=>addU(String(c.n),+c.area||+S.area||1));
 if(live.sy)live.sy.coats.forEach(c=>addU(String(c.n),+c.area||+SY.area||1));
 let fromDB=false;if(!used){fromDB=true;DB.forEach(p=>{const k=catOf(p.n);use[k]=(use[k]||0)+1;used+=1})}
 let ent=Object.entries(use).sort((a,b)=>b[1]-a[1]);if(ent.length>6){const r=ent.slice(5).reduce((s,x)=>s+x[1],0);ent=ent.slice(0,5).concat([['기타',r]])}
 const PAL=['#2d7df6','#27b59a','#7b6cf0','#f5a02a','#9aa7ff','#aab4c8'];
 const SM=false;let ctr=null;
 let acc=0;const R=40,CF=2*Math.PI*R;
 const arcs=ent.map((x,i)=>{const f=x[1]/used,o=`<circle cx="50" cy="50" r="${R}" fill="none" stroke="${PAL[i%6]}" stroke-width="20" stroke-dasharray="${Math.max(0,f*CF-.8).toFixed(2)} ${CF.toFixed(2)}" stroke-dashoffset="${(-acc*CF).toFixed(2)}" transform="rotate(-90 50 50)"/>`;acc+=f;return o}).join('');
 const legend=ent.map((x,i)=>`<div><i style="background:${PAL[i%6]}"></i><span>${esc(x[0])}</span><b>${Math.round(x[1]/used*100)}%</b></div>`).join('');
 const donut=ent.length?`<svg viewBox="0 0 100 100" class="cd-dn2"><circle cx="50" cy="50" r="${R}" fill="none" stroke="#e8eef8" stroke-width="20"/>${arcs}</svg><div class="cd-dc"><small>${fromDB?'등록 제품':'총 사용량'}</small><b>${ctr||(fromDB?Fm(used)+' 개':Fm(used)+' ㎡')}</b></div>`:`<svg viewBox="0 0 100 100" class="cd-dn2"><circle cx="50" cy="50" r="${R}" fill="none" stroke="#e8eef8" stroke-width="20"/></svg><div class="cd-dc"><small>총 사용량</small><b>0 ㎡</b></div>`;
 const go=f=>`onclick="${f}"`;
 const tile=(cls,ic,t,s,f)=>`<button class="cd-tl ${cls}" ${go(f)}><span class="cd-ti">${IC[ic]}</span><b>${t}</b><small>${s}</small><span class="cd-ta">${IC.arr}</span></button>`;
 let h=`<div class="cdw">`;
 h+=`<div class="cd-tiles">${tile('t1','calc','일위대가표','PQC','T(0)')}${tile('t2','shield','도장시스템','Paint System','T(3)')}${tile('t3','house','공동주택<br>재도장공사','Repainting','hqOpen()')}${tile('t4','cycle','LCC<br>생애주기','Life Cycle','T(9)')}${tile('t5','chip','AI진단','Inspection','cdDiag()')}</div>`;
 h+=`<div class="cd-g2"><div class="cd-cd cd-wk"><div class="cd-h"><span class="cd-hi">${IC.doc}</span><b>최근 작업 현황</b>${SM?'<em class="cd-ex">예시</em>':''}<a ${go('cdAll()')}>전체보기 ${IC.arr}</a></div><div class="cd-st"><div><small>진행중</small><b>${wRun}<em>건</em></b><i style="--w:${wRun/wMax*100}%;--c:#2d7df6"></i></div><div><small>완료</small><b>${wDone}<em>건</em></b><i style="--w:${wDone/wMax*100}%;--c:#1fb5a0"></i></div><div><small>보류</small><b>${wHold}<em>건</em></b><i style="--w:${wHold/wMax*100}%;--c:#f2a13a"></i></div></div></div>`;
 h+=`<div class="cd-cd cd-mo"><div class="cd-h"><span class="cd-hi fill">${IC.calc}</span><b>이번 달 총 산출량</b></div><div class="cd-dt">${IC.cal}<span>${cur.replace('-','.')}</span></div><div class="cd-big">${Fm(aC)}<em>㎡</em></div><div class="cd-df">${dl(dMo)}<small>(전월 대비)</small></div></div></div>`;
 h+=`<div class="cd-g3"><div class="cd-cd cd-s"><span class="cd-si">${IC.coins}</span><div><small>예상 견적 금액</small><b>${q0?'₩ '+Fm(q0):'₩ 0'}</b>${dl(dQ,qSrc)}</div></div><div class="cd-cd cd-s"><span class="cd-si">${IC.doc}</span><div><small>등록된 제품 수</small><b>${Fm(nP)}<em>개</em></b>${pD}</div></div><div class="cd-cd cd-s"><span class="cd-si">${IC.bld}</span><div><small>등록된 현장 수</small><b>${Fm(nS)}<em>개</em></b>${sD}</div></div></div>`;
 h+=`<div class="cd-g2 cd-g2b"><div class="cd-cd cd-rc"><div class="cd-h"><span class="cd-hi fill2">${IC.bars}</span><b>최근 산출 내역</b><a ${go('cdAll()')}>전체보기 ${IC.arr}</a></div>${recent.length?recent.map(x=>`<div class="cd-rw"><span class="cd-ch ${cc(x.t)}">${esc(x.t)}</span><span class="cd-rn">${esc(x.n)}</span><span class="cd-rd">${esc(x.d)}</span><span class="cd-rv">${IC.chev}</span></div>`).join(''):'<div class="cd-none">아직 작업 내역이 없습니다</div>'}</div>`;
 h+=`<div class="cd-cd cd-pr"><div class="cd-h"><span class="cd-hi fill2">${IC.pie}</span><b>제품별 사용 비중</b></div><div class="cd-dw">${donut}</div><div class="cd-lg">${legend||'<div class="cd-none" style="grid-column:1/-1">사용 기록이 쌓이면 표시됩니다</div>'}</div></div></div>`;
 h+=`<div class="cd-bn"><svg class="cd-rl" viewBox="0 0 120 80" fill="none"><rect x="14" y="14" width="64" height="24" rx="10" transform="rotate(-24 46 26)" fill="#7fd0ff"/><path d="M74 14l16 8-4 10-22-8" stroke="#cfeeff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M70 30l-14 28" stroke="#cfeeff" stroke-width="5" stroke-linecap="round"/><rect x="48" y="56" width="12" height="20" rx="5" fill="#eaf6ff"/></svg><div class="cd-bt"><b>더 정확한 계산, 더 나은 결과</b><small>COAT ON이 도장산업의 가치를 높입니다.</small></div><button ${go('cdGuide()')}>이용 가이드 ${IC.arr}</button></div></div>`;
 if(IS_ADMIN)h=h.replace(/<\/div>$/,'<button class="dsa" onclick="T(7)">'+PQI.admin+'<span><b>관리자 모드</b><small>배포용 데이터 관리 · 이용조건 확인 · 내보내기</small></span>'+PQI.chev+'</button></div>');
 e.innerHTML=h;
 /* ---- 헤더 ---- */
 if(vh){let hd=vh.querySelector('.cdh');
  if(!hd){hd=document.createElement('div');hd.className='cdh';vh.insertBefore(hd,vh.firstChild)}
  const bk=LS.lbk,warn=DB.length&&(!bk||(Date.now()-new Date(bk).getTime())>30*864e5);
  cdHero(hd);setTimeout(()=>cdHero(hd),500);setTimeout(()=>cdHero(hd),1800);
  hd.innerHTML=`<div class="cdh-top"><div class="cdh-br"><img src="icon-192.png" alt=""><div><div class="cdh-nm">COAT <i>ON</i></div><div class="cdh-sb">Paint Quantity &amp; Unit Price Table</div></div></div><div class="cdh-ic"><button onclick="cdBell()" aria-label="알림">${IC.bell}${warn?'<i class="cdh-dot"></i>':''}</button><button onclick="moreOpen()" aria-label="메뉴">${IC.menu}</button></div></div><p class="cdh-hi">안녕하세요!<br>오늘도 더 효율적인 도장 작업을 위한<br>COAT ON과 함께하세요.</p><svg class="cdh-sl" viewBox="0 0 300 100" fill="none"><text x="14" y="46" transform="rotate(-11 14 46)">Better Calculation</text><text x="52" y="76" transform="rotate(-11 52 76)">for a Quality Finish</text><path d="M14 96C84 86 170 66 290 34" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".92"/></svg>`;
 }
}
function cdHero(hd){try{const hh=document.querySelector('#vh .hhero');if(!hh||!hd)return;const cs=getComputedStyle(hh);if(/url\(/.test(cs.backgroundImage)){hd.style.backgroundImage=cs.backgroundImage;hd.style.backgroundSize='auto,cover';hd.style.backgroundPosition='0% 0%,78% 40%';hd.style.backgroundRepeat='repeat,no-repeat'}}catch(_){}}
function cdBell(){const bk=LS.lbk;if(DB.length&&(!bk||(Date.now()-new Date(bk).getTime())>30*864e5)){ask((bk?'마지막 백업이 30일 이상 지났습니다.':'아직 백업하지 않았습니다.')+'<br><small>데이터는 이 기기에만 저장됩니다. 지금 백업할까요?</small>',()=>{try{goCsv('set')}catch(_){}})}else tt('새 알림이 없습니다')}
function cdAll(){try{if(typeof qhOpen=='function')qhOpen();else if(typeof est=='function')est()}catch(_){}}
function cdGuide(){try{(window.ugOpen||helpOpen)()}catch(_){}}
function cdDiag(){T(9);setTimeout(()=>{const b=[...document.querySelectorAll('button,[role=tab],.tab,a')].find(x=>x.offsetParent&&/^\s*(③\s*)?(AI\s*)?(현장\s*)?진단\s*$/.test(x.textContent));if(b)b.click()},350)}

function pqQuote(){if(typeof est=='function')est()}


/* 소요량 공식 · 경고 · 용어 매칭표 (홈 하단 안내 → 더보기로 이동) */
function infoOpen(){
 const d=document.getElementById('hinfo');if(!d)return;
 const c=d.cloneNode(true);c.querySelectorAll('summary').forEach(x=>x.remove());c.removeAttribute('id');c.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));
 let g='';try{g=glossHTML()}catch(_){}
 pqSheet('pqinfo','<div class="pqmh"><b>소요량 공식 · 경고 · 용어 매칭표</b></div><div class="pqif">'+c.innerHTML.replace(/<div class="?hgl"?><\/div>/,'')+'<div class="pqig">'+g+'</div></div><button class="pqbc" onclick="pqX(\'pqinfo\')">닫기</button>');
}

/* 더보기 · 자료 이용 안내 */
function moreOpen(){
 const L=[['db','제품 DB','T(1)','제품 정보 · TDS 관리'],['save','백업 · 복원','goCsv(\'set\')','CSV · JSON 백업'],['calc','노무비 설정','lbSheet()','노임단가 · 할증'],['fm','충진','T(8)'],['ap','도면','apOpen()'],['hq','공동','hqOpen()'],['lc','LCC','T(9)'],['quote','사용법','helpOpen()'],['set','화면 모드 (주간·야간)','themeOpen()','전체 화면에 적용'],['set','설정 · 언어','openSettings()'],['shield','자료 이용 안내','legalOpen()'],['info','정보','showInfo()']];
 if(IS_ADMIN)L.push(['admin','관리자 모드','T(7)']);
 pqSheet('pqmore','<div class="pqmh"><b>더보기</b></div>'+'<div class="pqmg">'+L.map(([i,t,f,d])=>`<button class="pqml" onclick="pqX('pqmore');${f}"><span class="pqi">${PQI[i]}</span><span class="pqt"><b>${t}</b>${d?`<small>${d}</small>`:''}</span></button>`).join('')+'</div>'+'<button class="pqbc" onclick="pqX(\'pqmore\')">닫기</button>');
}
function legalOpen(first){
 const li=['본 프로그램은 도장공사의 소요량·일위대가 산출용 계산 도구입니다. 계산 결과는 참고용이며 계약·정산의 근거가 아닙니다.','제품 적용 전 제조사의 최신 TDS·MSDS를 확인하세요. 실제 사용량은 현장 조건에 따라 달라질 수 있습니다.','제품명·상표·기술자료의 권리는 각 제조사에 있으며 제조사와 제휴 관계가 없습니다. 이용 권한이 있는 자료만 등록하세요.','데이터는 이 기기에만 저장되고 외부로 전송되지 않습니다. 백업을 권장하며, PDF·OCR 도구를 처음 불러올 때만 공개 CDN에 접속합니다.','오픈소스: PDF.js·SheetJS·Tesseract.js(Apache-2.0), html2canvas(MIT). 이 안내는 법률 자문이 아닙니다.'];
 pqSheet('pqlg',`<div class="pqmh"><span class="pqi">${PQI.shield}</span><b>자료 이용 안내</b></div><div class="pqlgl">${li.map(x=>`<div>${PQI.shield}<span>${x}</span></div>`).join('')}</div><button class="pqbc ok" onclick="${first?"LS.lgok='1';":''}pqX('pqlg')">${first?'확인했습니다':'닫기'}</button>`);
}

/* 제품 메타(출처·검증) 표시 */
const vbadge=p=>(p.ver?'<span class="bdg g">검증</span>':'<span class="bdg y">미검증</span>')+(IS_ADMIN&&p.lic?'<span class="bdg b">배포승인</span>':'');
const metaLine=p=>{const s=p.src||'',lk=/^https?:\/\//i.test(s)?`<a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s.length>38?s.slice(0,38)+'…':s)}</a>`:esc(s||'미기록');return `<div class="hint pqmeta">출처 ${lk} · 개정일 ${esc(p.rev||'-')} · 확인일 ${esc(p.chk||'-')}${p.memo?' · 메모 '+esc(p.memo):''}</div>`};

/* ----- TDS 등록 (링크 · 파일) ----- */
let TP={tab:'file',file:null},TV=null;
const pqType=t=>{t=String(t||'').toLowerCase();const o=[];[[/하도|프라이머|primer|방청|숍프라이머/,'하도'],[/중도|intermediate|미스트코트/,'중도'],[/상도|top\s*coat|finish|마감/,'상도'],[/방오|antifoul/,'방오도료'],[/내화|intumescent|fire/,'내화도료'],[/징크|zinc|아연/,'징크'],[/퍼티|putty/,'퍼티'],[/실러|sealer/,'실러'],[/희석제|신너|시너|thinner/,'희석제'],[/에폭시|epoxy/,'에폭시'],[/우레탄|urethane/,'우레탄'],[/아크릴|acrylic/,'아크릴'],[/락카|lacquer/,'락카']].forEach(([r,l])=>{if(r.test(t)&&!o.includes(l))o.push(l)});return o.slice(0,3).join('·')};
function tpRender(){
 const e=document.getElementById('v4');if(!e)return;
 const all=pqRc().filter(x=>/TDS|등록/.test(x.t)),rc=TP.all?all.slice(0,10):all.slice(0,3);
 const I=(d,w)=>`<svg viewBox="0 0 24 24" width="${w||20}" height="${w||20}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${d}</svg>`;
 const DOC='<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',LINK='<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',CAL='<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01"/>';
 e.innerHTML=`<div class="pq tx"><div class="tx-tabs"><button id="tpt_link" class="${TP.tab=='link'?'on':''}" onclick="tpTab('link')">${I(DOC,22)}<span>링크 등록</span></button><button id="tpt_file" class="${TP.tab=='file'?'on':''}" onclick="tpTab('file')">${I(DOC,22)}<span>파일 첨부</span></button><button id="tpt_all" class="${TP.tab=='all'?'on':''}" onclick="tpTab('all')">${I('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M3 8v13h12" />',22)}<span>ALL</span></button></div>
 <div class="tx-card">
 <div id="tp_link" ${TP.tab=='link'?'':'hidden'}><div class="tx-h"><i>1</i><b>제조사 홈페이지 TDS URL</b></div><div class="tx-in"><input id="tp_url" class="pqin" placeholder="https://..." inputmode="url"></div><div class="tx-n">일부 사이트는 로그인·접근 제한 때문에 자동으로 내려받을 수 없습니다. 이 경우 PDF를 직접 첨부하면 URL은 출처로 기록됩니다.</div></div>
 <div id="tp_file" ${TP.tab=='file'?'':'hidden'}><div class="tx-h"><i>1</i><b>PDF 또는 이미지 파일 (최대 20MB)</b></div>
 <label class="tx-drop tdsfb"><span class="tx-di">${I('<path d="M6 3h9l4 4v6"/><path d="M15 3v4h4"/><path d="M6 3v18h7"/><circle cx="17.5" cy="17.5" r="4"/><path d="M17.5 15.5v4M15.5 17.5h4"/>',44)}</span><span class="tx-dt"><b>TDS 첨부 (PDF · 이미지)</b><small>파일을 선택하거나 드래그하여 업로드하세요.</small></span><input id="tp_f" type="file" accept=".pdf,application/pdf,image/*" onchange="tpPick(this)"></label><div id="tp_fn" class="tx-fn"></div>
 <label class="tx-lb" for="tp_src">${I(LINK,20)}<b>출처 URL (선택)</b></label><div class="tx-in"><input id="tp_src" class="pqin" placeholder="https://..." inputmode="url"></div>
 <label class="tx-lb" for="tp_rev">${I(CAL,20)}<b>TDS 개정일 (선택)</b></label><div class="tx-in"><input id="tp_rev" class="pqin" placeholder="예: 2025-05-14"><span class="tx-ic" onclick="document.getElementById('tp_rev').focus()">${I(CAL,22)}</span></div></div>
 <div id="tp_all" ${TP.tab=='all'?'':'hidden'}><div class="tx-h"><i>1</i><b>TDS 파일 일괄 등록 (여러 파일 선택)</b></div>
 <label class="tx-drop tdsfb"><span class="tx-di">${I('<path d="M6 3h9l4 4v6"/><path d="M15 3v4h4"/><path d="M6 3v18h7"/><circle cx="17.5" cy="17.5" r="4"/><path d="M17.5 15.5v4M15.5 17.5h4"/>',44)}</span><span class="tx-dt"><b>TDS 일괄 첨부 (PDF · 이미지)</b><small>여러 파일을 한꺼번에 선택하세요.</small></span><input id="tp_bf" type="file" multiple accept=".pdf,application/pdf,image/*" onchange="tpBulk(this.files);this.value=''"></label>
 <div class="tx-n">파일 이름을 제품명과 같게 저장해 올리면 자동으로 제품에 연결됩니다 (예: EH2350.pdf). DB에 없는 제품의 TDS는 문서에서 제품명·SVR·도막·비중·건조시간 등을 읽어 새 제품으로 자동 등록되며(‘검토 필요’ 표시), 아무 값도 읽지 못한 파일만 대기 보관됩니다.</div><div id="tp_allr"></div></div>
 <label class="tx-ck"><input type="checkbox" id="tp_keep"><i></i><span>원본 PDF를 이 기기에 보관합니다 (기본: 분석 후 보관하지 않음)</span></label>
 <label class="tx-ck"><input type="checkbox" id="tp_ok"><i></i><span>이 자료를 이용할 권한이 있으며, 제조사의 이용조건을 확인했습니다.</span></label>
 <button class="tx-go" onclick="tpStart()">${I('<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="M21 3 10 13"/>',22)}<b>분석 시작</b>${I('<path d="M9 6l6 6-6 6"/>',22)}</button><div id="tp_st"></div></div>
 <div class="tx-pol">${I('<path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',40)}<div><b>저장 정책</b><small>TDS 원문의 설명 문구·표·이미지는 저장하지 않고, 계산에 필요한 값(DFT·SVR·비중·혼합비 등)만 검토 후 등록합니다. 분석 결과는 바로 저장되지 않습니다.</small></div></div>
 <div class="tx-card tx-rc"><div class="tx-rh">${I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',28)}<b>최근 등록</b>${all.length>3||TP.all?`<a onclick="TP.all=!TP.all;tpRender()">${TP.all?'접기':'전체보기'} ${I('<path d="M9 6l6 6-6 6"/>',16)}</a>`:''}</div>${rc.length?rc.map(x=>`<div class="tx-r" onclick="tpGoRc(this.dataset.n)" data-n="${esc(x.n)}"><span class="tx-ri">${I(DOC,20)}</span><span class="tx-rb">${esc(x.t)}</span><span class="tx-rn">${esc(x.n)}</span><span class="tx-rd">${esc(x.d)}</span>${I('<path d="M9 6l6 6-6 6"/>',18)}</div>`).join(''):'<div class="tx-none">등록 내역이 없습니다</div>'}</div></div>`;
}
async function tpBulk(fs){try{await bulk(fs)}catch(e){}tpAllR()}
async function tpAllR(){const e=document.getElementById('tp_allr');if(!e)return;try{await rPend()}catch(x){}const q=id=>[...document.querySelectorAll('#'+id)].find(x=>!e.contains(x));const b=q('brs'),pd=q('pend');e.innerHTML=(b?b.innerHTML:'')+(pd?pd.innerHTML:'')}
/*tpAllR hook*/
function tpGoRc(n){try{T(1);setTimeout(()=>{const q=document.getElementById('q');if(q){q.value=n;if(typeof dbl=='function')dbl()}},120)}catch(e){}}
function tpTab(t){TP.tab=t;['link','file','all'].forEach(k=>{const a=document.getElementById('tp_'+k),b=document.getElementById('tpt_'+k);if(a)a.hidden=k!=t;if(b)b.classList.toggle('on',k==t)})}
function tpPick(i){const f=i.files[0];TP.file=f||null;const n=document.getElementById('tp_fn');if(n)n.textContent=f?f.name+' · '+(f.size/1048576).toFixed(1)+'MB':''}
function tpSay(m,err){const e=document.getElementById('tp_st');if(!e)return;e.innerHTML=m?`<div class="pqst ${err?'er':''}">${err?'':'<i class="pqbar"></i>'}<span>${m}</span></div>`:''}
async function tpStart(){
 if(!document.getElementById('tp_ok').checked)return tt('자료 이용조건 확인에 체크해 주세요');
 let f=TP.file,src=(document.getElementById('tp_src').value||'').trim(),rev=(document.getElementById('tp_rev').value||'').trim();
 if(TP.tab=='link'){
  const url=(document.getElementById('tp_url').value||'').trim();
  if(!/^https?:\/\/\S+$/i.test(url))return tt('https:// 로 시작하는 주소를 입력하세요');
  src=url;tpSay('주소에서 자료를 가져오는 중…');
  try{const c=new AbortController(),tm=setTimeout(()=>c.abort(),12000),r=await fetch(url,{signal:c.signal});clearTimeout(tm);if(!r.ok)throw new Error('http');const b=await r.blob();if(b.size>20971520)throw new Error('size');f=new File([b],decodeURIComponent((url.split('?')[0].split('/').pop()||'tds.pdf')),{type:b.type||'application/pdf'})}
  catch(e){tpTab('file');document.getElementById('tp_src').value=url;tpSay('이 주소의 자료를 직접 가져오지 못했습니다. 접근 제한이거나 보안 정책 때문일 수 있습니다. PDF를 내려받아 ‘파일 첨부’에서 올려 주세요 (URL은 출처로 기록됩니다).',1);return}
 }
 if(!f)return tt('파일을 선택하세요');
 if(f.size>20971520)return tpSay('파일이 20MB를 초과합니다.',1);
 const img=/^image\//.test(f.type)||/\.(png|jpe?g|webp|bmp)$/i.test(f.name);
 if(!img){const h=new Uint8Array(await f.slice(0,5).arrayBuffer());if(String.fromCharCode(...h)!=='%PDF-')return tpSay('PDF 형식이 아닙니다. 올바른 PDF 또는 이미지 파일을 선택하세요.',1)}
 try{const r=await tdsExtract(f,m=>tpSay(m));tpSay('');tvOpen(r,{f,src,rev,keep:document.getElementById('tp_keep').checked})}
 catch(e){tpSay('분석에 실패했습니다: '+esc(e.message||String(e))+'<br>제품 DB에서 직접 입력할 수도 있습니다.',1)}
}
async function tdsExtract(f,say,opt){
 const isImg=/^image\//.test(f.type)||/\.(png|jpe?g|webp|bmp)$/i.test(f.name);
 say('문서를 분석하는 중…');
 let L=isImg?await ocrImg(f,say):await pdfLines(f,say),sp=parseAll(L);
 const pt=parsePot(L),dry=isImg?'':parseDry(L);
 if(!isImg&&!L.ocr&&!(opt&&opt.noOcr)&&(!sp.svr||!sp.sg)){try{say('글자 인식(OCR)으로 빠진 항목을 보완하는 중… (최대 1~2분)');const O=await ocrLines(f,say),s2=parseAll(O);for(const k in s2)if((sp[k]==null||sp[k]==='')&&s2[k]!=null&&s2[k]!=='')sp[k]=s2[k];L=L.concat(O)}catch(e){}}
 const p={n:((typeof fb=='function'?fb(f.name):f.name.replace(/\.[^.]+$/,''))||'').trim()||sp.hname||'',tc:'',ts:18,un:'ℓ',pk:'',mk:'',tr:0,tn:''};
 applySpec(p,sp,true);
 if(pt)p.pot=pt;if(dry)p.dry=dry;
 if(!p.g)p.g=pqType((sp.g||'')+' '+(sp.us||'')+' '+(sp.hname||'')+' '+p.n);   /* 일반명: 수지 조성 + 역할 요약 */
 if(p.d)p.d=endSum(String(p.d).replace(/\s+/g,' ').trim(),100);
 if(p.sp)p.sp=sm20(p.sp);
 if(!p.pre)p.pre='도장사양에 따름';if(!p.nxt)p.nxt='도장사양에 따름';
 try{pqNorm(p)}catch(e){}
 return{p,L:[...L],isImg}
}

/* 추출 결과 검토 */
const PQF=[['n','제품명','t'],['mf','제조사','t'],['g','일반명','t'],['pk','출규','n',''],['mk','혼규','n',''],['un','단위 (L 또는 kg)','t'],['sg','비중','n',''],['svr','SVR','n','%'],['dft','추천도막','n','㎛'],['mixt','혼합비기준','s'],['tn','희석제명','t'],['tc','희석제코드','t'],['tr','희석율(%)','n','%'],['ts','희석제규격','n','L'],['dry','건조시간','t'],['pot','가사시간','t'],['sp','표면처리 (20자 이내)','t'],['pre','선행도장','t'],['nxt','후속도장','t'],['pks','포장규격','t'],['d','제품설명 (100자 이내)','t'],['us','용도 (20자 이내)','t'],['memo','메모','t']];
const PQEV={svr:/고형분|solid/i,dft:/도막|DFT|건조/i,sg:/비중|specific|density/i,tr:/희석/,pot:/가사|pot\s*life/i,dry:/건조|지촉|dry/i,pk:/규격|포장|주제|혼합|ℓ|리터|\bL\b/i,mk:/규격|포장|혼합|ℓ|리터|\bL\b/i,tn:/희석제|신너|시너|thinner/i,sp:/표면|소지|처리|surface/i,mf:/제조|manufacturer|KCC|조광|삼화|노루/i};
function pqEvid(k,L,v){const rx=PQEV[k];if(!rx||!L)return '';const s=v===''||v==null?'':String(v);for(const l of L){const t=String(l);if(!rx.test(t))continue;if(/^\d/.test(s)&&!t.replace(/,/g,'').includes(s))continue;return t.replace(/\s+/g,' ').trim().slice(0,70)}return ''}
function tvOpen(r,ctx){
 return pdForm(r,ctx);
 TV={r,ctx,init:{}};const p=r.p;
 const rows=PQF.map(([k,l,kind,u])=>{let v=k=='tr'?(p.tr?+(p.tr*100).toFixed(1):''):(p[k]??'');if(k=='mixt')v=p.mixt||'';TV.init[k]=String(v);const f=String(v)!==''&&k!='mixt';
  const ev=f?pqEvid(k,r.L,v):'';
  const inp=kind=='s'?`<select data-k="${k}" onchange="tvEd(this)"><option value="">미확인</option><option ${v=='부피비'?'selected':''}>부피비</option><option ${v=='중량비'?'selected':''}>중량비</option></select>`:`<input data-k="${k}" value="${esc(v)}" ${kind=='n'?'inputmode="decimal"':''} oninput="tvEd(this)">`;
  return `<div class="tvr" data-r="${k}"><div class="tvk">${l}${u?`<small> ${u}</small>`:''}</div>${inp}<span class="bdg ${f?'y':'n'}" data-b="${k}">${f?'검토 필요':'미확인'}</span>${ev?`<div class="tve"><span>원문 확인: </span><span data-notr>${esc(ev)}</span></div>`:''}</div>`}).join('');
 pqSheet('pqtv',`<div class="pqmh"><span class="pqi">${PQI.tds}</span><b>${ctx.mode=='edit'?'제품 수정':ctx.mode=='new'?'제품 추가':'추출 결과 확인'}</b></div><div class="pqn">${ctx.mode?'항목은 CSV 항목과 같습니다. 값을 입력·수정한 뒤 저장하세요. 혼합비가 부피비인지 중량비인지 확인이 필요합니다.':'추출값은 바로 저장되지 않습니다. 단위와 값을 원문과 대조해 수정한 뒤 등록하세요. 혼합비가 부피비인지 중량비인지 확인이 필요합니다.'}</div><div class="tvl">${rows}</div>
 <div class="tvm"><label class="pql">출처 URL</label><input id="tv_src" class="pqin" value="${esc(ctx.src||'')}"><div class="tvg"><div><label class="pql">TDS 개정일</label><input id="tv_rev" class="pqin" value="${esc(ctx.rev||'')}" placeholder="2025-05-14"></div><div><label class="pql">자료 확인일</label><input id="tv_chk" class="pqin" value="${esc(ctx.chk||pqToday())}"></div></div></div>
 <label class="pqk"><input type="checkbox" id="tv_ok" ${ctx.ver?'checked':''} onchange="tvOk()"><span>검토 완료</span></label>
 <div class="pqg2"><button class="pqbc" onclick="pqX('pqtv')">취소</button><button class="pqbc ok" onclick="tvSave()">${ctx.mode=='edit'?'저장하기':'등록하기'}</button></div>`,'tvs');if(ctx.ver)tvOk();
}
function tvEd(el){const k=el.dataset.k,b=document.querySelector(`[data-b="${k}"]`);if(!b)return;const v=el.value.trim(),ok=document.getElementById('tv_ok').checked;if(v===''){b.className='bdg n';b.textContent='미확인';return}if(ok){b.className='bdg g';b.textContent='확인됨'}else if(v!==TV.init[k]){b.className='bdg b';b.textContent='수정됨'}else{b.className='bdg y';b.textContent='검토 필요'}}
function tvOk(){document.querySelectorAll('#pqtv [data-k]').forEach(tvEd)}
function tvSave(){
 const g=k=>{const e=document.querySelector(`#pqtv [data-k="${k}"]`);return e?e.value.trim():''},n=g('n');
 if(!n)return tt('제품명을 입력하세요');if(TV.ctx.mode=='new'&&!g('mf'))return tt('제조사를 입력하세요');
 const p={n},num=k=>{const v=g(k);return v===''?null:pqNum(v)};
 const bad=[];
 ['mf','g','tn','tc','dry','pot','sp','pre','nxt','pks','d','us','memo','cat','cert','frt','fin'].forEach(k=>{let v=g(k);if(v)p[k]=v});
 let un=g('un').toLowerCase();p.un=/kg|㎏/.test(un)?'kg':'ℓ';
 const rw=[];
 [['dft','추천 도막',1,5000],['svr','SVR',0.1,100],['sg','비중',0.1,10],['pk','출고규격',0.01,10000],['mk','혼합규격',0.01,10000],['ts','희석제 규격',0.01,10000]].forEach(([k,l,lo,hi])=>{const v=num(k);if(v==null)return;if(Number.isNaN(v)||!isFinite(v)){bad.push(l+': 숫자로 읽을 수 없습니다');return}p[k]=v;if(!(v>=lo&&v<=hi))rw.push(l+' '+v+' (일반 범위 '+lo+'~'+hi+')')});
 const tr=num('tr');if(tr!=null){if(Number.isNaN(tr)||!isFinite(tr))bad.push('희석율: 숫자로 읽을 수 없습니다');else{p.tr=+(tr/100).toFixed(4);if(!(tr>=0))rw.push('희석율 '+tr+'% (0% 이상이어야 합니다)')}}
 if(bad.length)return tt('⚠ 오류가 있어 등록할 수 없습니다<br><small>'+bad.join('<br>')+'</small>');
 if(p.pk&&p.mk&&p.mk<p.pk)rw.push('혼합규격이 출고규격(주제)보다 작습니다');
 const mt=g('mixt');if(mt)p.mixt=mt;
 p.pk=p.pk||p.mk||'';p.mk=p.mk||p.pk||'';p.ts=p.ts||(p.tn&&p.tn!='무희석'?18:0);if(p.svr&&p.dft)p.th=+(p.svr*10/p.dft).toFixed(4);
 const warn=rw.map(x=>'범위 벗어남: '+x);if(p.un=='kg'&&!p.sg)warn.push('kg 단위인데 비중이 없습니다 (L 기준으로 계산됩니다)');
 p.src=document.getElementById('tv_src').value.trim();p.rev=document.getElementById('tv_rev').value.trim();p.chk=document.getElementById('tv_chk').value.trim();if(!TV.ctx.mode){p.ext=pqToday();p.dsrc='TDS'}p.ver=document.getElementById('tv_ok').checked?1:0;
 pqNorm(p);
 const go=async()=>{try{const old=TV.ctx.edit,jo=old?DB.findIndex(q=>q.n==old):-1,j=jo>=0?jo:DB.findIndex(q=>q.n==n);if(j<0)DB.push({tc:'',ts:18,url:'',un:'ℓ',...p});else{const o=DB[j];DB[j]={...o,...p};if(TV.ctx.mode=='edit')['mf','g','tn','tc','dry','pot','sp','pre','nxt','pks','d','us','memo','cat','cert','frt','fin','dft','svr','sg','tr','ts','mixt'].forEach(k=>{if(g(k)==='')delete DB[j][k]});if(TV.ctx.mode=='edit'&&!(DB[j].svr&&DB[j].dft))delete DB[j].th;if(old&&n!=old){S.coats.forEach(c=>{if(c.n==old)c.n=n});try{(SY.layers||[]).forEach(c=>{if(c.n==old)c.n=n})}catch(e){}const fo=await idb('get',old).catch(()=>0);if(fo){await idb('put',n,fo).catch(()=>0);await idb('del',old).catch(()=>0)}}}
  if(TV.ctx.keep){try{await idb('put',n,{name:TV.ctx.f.name,type:TV.ctx.f.type||'application/pdf',buf:await TV.ctx.f.arrayBuffer()})}catch(e){}}
  sv();try{await mark()}catch(e){}pqRcAdd(TV.ctx.mode=='edit'?'제품 수정':TV.ctx.mode=='new'?'제품 추가':'TDS 등록',n);pqX('pqtv');dbl();cards();try{if(document.getElementById('v3')&&!document.getElementById('v3').hidden)syRender()}catch(e){}tt('✅ '+(TV.ctx.mode=='edit'?'저장되었습니다':'등록되었습니다')+'<br><small>'+esc(n)+(p.ver?' · 검증 완료':' · 미검증')+(TV.ctx.keep?' · 원본 PDF 보관':'')+(rw.length?'<br>범위 벗어난 값 '+rw.length+'건 포함':'')+'</small>');tpRender()}catch(e){tt('⚠ 등록 중 오류가 발생했습니다<br><small>'+esc(String(e&&e.message||e))+'</small>')}};
 const dup=DB.some(q=>q.n==n&&q.n!=TV.ctx.edit);
 const next=()=>dup?ask('같은 이름의 제품이 이미 있습니다.<br>입력한 값으로 갱신할까요?',go):go();
 warn.length?ask('⚠ 확인이 필요한 항목이 있습니다<br><small>'+warn.join('<br>')+'</small><br>그대로 등록할까요?',next):next();
}

/* ===== v200 검토버전 (2): CSV · 백업 · 설정 · 관리자 · 계산 검증 ===== */
const CSVH=[['제품명','n'],['제조사','mf'],['일반명','g'],['출규','pk'],['혼규','mk'],['단위','un'],['비중','sg'],['SVR','svr'],['추천도막','dft'],['혼합비기준','mixt'],['희석제명','tn'],['희석제코드','tc'],['희석율(%)','trp'],['희석제규격','ts'],['건조시간','dry'],['가사시간','pot'],['표면처리','sp'],['선행도장','pre'],['후속도장','nxt'],['포장규격','pks'],['TDS출처URL','src'],['TDS개정일','rev'],['자료확인일','chk'],['검증여부','ver'],['메모','memo']];
const CSVD=[['제품설명','d'],['용도','us']];
const CSVMAP=(()=>{const m={};CSVH.concat(CSVD).forEach(([t,k])=>m[t]=k);Object.assign(m,{'제품유형':'g','TDS링크':'src','규격':'ts','희석율':'tr','사용용도':'us','이론도포율':'th','1회도막':'_d1','횟수':'_cn','총도막':'_tot','총 도막':'_tot','총도막(㎛)':'_tot','총도막(μm)':'_tot','총도막(um)':'_tot','총도막두께':'_tot','총 도막두께':'_tot','총도막 (㎛)':'_tot','영문':'_en','기준색상':'_cl','혼합규격당도장면적(이론)':'_ar'});return m})();
const CSVNUM=['pk','mk','sg','svr','dft','ts','th'];
const pqCell=v=>{let s=v==null?'':String(v);if(/^[=+\-@\t\r]/.test(s)&&!/^-?\d+(\.\d+)?$/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
const pqCsv=(rows)=>'\uFEFF'+rows.map(r=>r.map(pqCell).join(',')).join('\r\n');
let CS={tab:'csv',scope:'all',desc:false,meta:true,sel:new Set(),q:'',mode:'upd',prev:null};
function goCsv(t){CS.tab=t||'csv';T(5)}
function csvRender(){
 const e=document.getElementById('v5');if(!e)return;
 const tabs=`<div class="pqtabs"><button class="${CS.tab=='csv'?'on':''}" onclick="CS.tab='csv';csvRender()">CSV 관리</button><button class="${CS.tab=='set'?'on':''}" onclick="CS.tab='set';csvRender()">백업 · 설정</button></div>`;
 e.innerHTML=`<div class="pq">${tabs}${CS.tab=='csv'?csvTab():setTab()}</div>`;
 if(CS.tab=='csv')csvPrevRender();
}
function csvTab(){
 const list=csvScopeList();
 return `<div class="pqc"><div class="pqh"><span class="pqi">${PQI.csv}</span><div><b>CSV 가져오기</b><small>미리보기와 검증 후 반영합니다</small></div></div>
 <button class="pqb o" onclick="csvTemplate()">빈 CSV 양식 내려받기</button>
 <label class="pql">CSV · 엑셀 · JSON 파일 선택</label><input class="pqin" type="file" accept=".csv,.xlsx,.json" onchange="csvLoad(this.files[0]);this.value=''">
 <label class="pqk"><input type="checkbox" id="cs_desc" ${CS.desc?'checked':''} onchange="CS.desc=this.checked;if(CS.file)csvLoad(CS.file)"><span>제품설명·용도 열도 가져오기 (기본: 제외 — 제조사 원문 문구 복제 방지)</span></label>
 <label class="pql">중복 제품 처리</label><select class="pqin" onchange="CS.mode=this.value"><option value="upd" ${CS.mode=='upd'?'selected':''}>기존 제품 갱신 (빈 값은 유지)</option><option value="skip" ${CS.mode=='skip'?'selected':''}>건너뛰기 (새 제품만 추가)</option></select>
 <div id="cs_prev"></div></div>
 <div class="pqc"><div class="pqh"><span class="pqi">${PQI.csv}</span><div><b>CSV 내보내기</b><small>범위와 포함 항목을 선택하세요</small></div></div>
 <label class="pql">내보낼 범위</label><select class="pqin" onchange="CS.scope=this.value;csvRender()"><option value="all" ${CS.scope=='all'?'selected':''}>내 제품 DB 전체</option><option value="ver" ${CS.scope=='ver'?'selected':''}>검증 완료 제품만</option><option value="sel" ${CS.scope=='sel'?'selected':''}>선택한 제품만</option></select>
 ${CS.scope=='sel'?csvSelList():''}
 <label class="pqk"><input type="checkbox" ${CS.meta?'checked':''} onchange="CS.meta=this.checked"><span>출처·개정일·확인일·검증 여부·메모 포함</span></label>
 <label class="pqk"><input type="checkbox" ${CS.desc?'checked':''} onchange="CS.desc=this.checked"><span>제품설명·용도 문구 포함 (기본: 제외)</span></label>
 <div class="pqn">대상 ${list.length}개 · 내보내기 파일은 개인·회사 DB용입니다. 외부에 공유·배포하기 전에 출처의 이용조건을 확인하세요.</div>
 <button class="pqb" onclick="csvExport()">CSV 내보내기</button></div>`;
}
function csvScopeList(){return CS.scope=='ver'?DB.filter(p=>p.ver):CS.scope=='sel'?DB.filter(p=>CS.sel.has(p.n)):DB.slice()}
function csvSelList(){const q=CS.q.toLowerCase(),L=DB.map((p,j)=>[p,j]).filter(([p])=>!q||(p.n+(p.mf||'')).toLowerCase().includes(q)).slice(0,60);
 return `<input class="pqin" placeholder="제품명·제조사 검색" value="${esc(CS.q)}" oninput="CS.q=this.value;csvSelRe()"><div class="pqls" id="cs_sel">${csvSelRows(L)}</div>`}
function csvSelRows(L){return L.map(([p,j])=>`<label class="pqk sm"><input type="checkbox" ${CS.sel.has(p.n)?'checked':''} onchange="csvSelTog(${j},this.checked)"><span>${esc(p.n)}${p.mf?' · '+esc(p.mf):''}</span></label>`).join('')||'<div class="pqn">제품이 없습니다</div>'}
function csvSelRe(){const q=CS.q.toLowerCase(),L=DB.map((p,j)=>[p,j]).filter(([p])=>!q||(p.n+(p.mf||'')).toLowerCase().includes(q)).slice(0,60),e=document.getElementById('cs_sel');if(e)e.innerHTML=csvSelRows(L)}
function csvSelTog(j,on){const p=DB[j];if(!p)return;on?CS.sel.add(p.n):CS.sel.delete(p.n)}
function pqRowVals(p,incM,incD){const r=CSVH.filter(([t,k])=>incM||!['src','rev','chk','ver','memo'].includes(k)).map(([t,k])=>k=='trp'?(p.tr?+(p.tr*100).toFixed(2):''):k=='ver'?(p.ver?'검증완료':''):p[k]??'');if(incD)CSVD.forEach(([t,k])=>r.push(p[k]??''));return r}
function pqHead(incM,incD){const h=CSVH.filter(([t,k])=>incM||!['src','rev','chk','ver','memo'].includes(k)).map(x=>x[0]);if(incD)CSVD.forEach(x=>h.push(x[0]));return h}
function csvTemplate(){const ex={n:'(예) 제품명',mf:'제조사',g:'하도·에폭시',pk:'20',mk:'20',un:'L',sg:'1.4',svr:'60',dft:'75',mixt:'부피비',tn:'희석제명',tc:'002',trp:'10',ts:'',dry:'20℃/4시간/16시간///',pot:'20℃ 4시간',sp:'유분·먼지 제거, 건조',pre:'',nxt:'',pks:'20L',src:'https://…',rev:'2025-05-14',chk:pqToday(),ver:'',memo:'',d:'2액형 에폭시 중도 도료',us:'강교 및 철 구조물의 방청하도 및 중도'};
 const H=CSVH.concat(CSVD);dl(new Blob([pqCsv([H.map(x=>x[0]),H.map(x=>ex[x[1]]??'')])],{type:'text/csv'}),'코트온_제품DB_템플릿.csv');tt('빈 양식을 내려받았습니다<br><small>전체 '+H.length+'개 항목 · 첫 번째 예시 행은 지우고 사용하세요</small>')}
function csvExport(){
 const L=csvScopeList();if(!L.length)return tt('내보낼 제품이 없습니다');
 const lbl={all:'내 제품 DB 전체',ver:'검증 완료 제품',sel:'선택한 제품'}[CS.scope];
 ask(`${L.length}개 제품을 CSV로 내보냅니다.<br><small>범위: ${lbl}<br>메타 정보: ${CS.meta?'포함':'제외'} · 제품설명·용도: ${CS.desc?'포함':'제외'}<br>TDS 원본 파일·이미지는 포함되지 않습니다.</small>`,()=>{
  dl(new Blob([pqCsv([pqHead(CS.meta,CS.desc),...L.map(p=>pqRowVals(p,CS.meta,CS.desc))])],{type:'text/csv'}),`코트온_제품DB_${pqToday()}.csv`);tt('CSV를 내보냈습니다<br><small>'+L.length+'개 제품</small>')})
}
/* 가져오기 미리보기 · 검증 */
async function csvLoad(f){
 if(!f)return;CS.file=f;
 try{
  if(f.size>10485760)throw new Error('파일이 10MB를 초과합니다');
  const x=f.name.split('.').pop().toLowerCase();let h,R;
  if(x=='json'){const a=JSON.parse(await f.text());if(!Array.isArray(a))throw new Error('JSON 형식이 올바르지 않습니다');
   CS.prev=csvJudge(a.map(o=>({...o})).filter(o=>o&&typeof o=='object'),true)}
  else{let rows;if(x=='csv')rows=csv(await f.text());else if(x=='xlsx'){await lx();const wb=XLSX.read(await f.arrayBuffer());rows=wb.SheetNames.map(s=>XLSX.utils.sheet_to_json(wb.Sheets[s],{header:1,defval:''})).find(r=>r.some(a=>String(a).includes('제품명')))}else throw new Error('CSV · XLSX · JSON 파일만 가능합니다');
   if(!rows)throw new Error('제품명 열을 찾지 못했습니다');
   const hi=rows.findIndex(r=>r.some(a=>String(a).trim()=='제품명'));if(hi<0)throw new Error('제품명 열을 찾지 못했습니다');
   h=rows[hi].map(a=>String(a).trim());const unk=h.filter(t=>t&&!CSVMAP[t]);
   const objs=rows.slice(hi+1).filter(r=>r.some(a=>String(a).trim()!=='')).map(r=>{const o={};h.forEach((t,j)=>{const k=CSVMAP[t];if(k&&r[j]!=null&&String(r[j]).trim()!=='')o[k]=String(r[j]).trim()});return o});
   CS.prev=csvJudge(objs,false);CS.prev.unk=unk}
  CS.prev.file=f.name;csvPrevRender()
 }catch(e){CS.prev={err:e.message||String(e)};csvPrevRender()}
}
function csvJudge(objs,isJson){
 const seen=new Set(),rows=[];let nw=0,up=0,er=0,wn=0;
 objs.forEach((o,i)=>{
  const p={},errs=[],warns=[];
  Object.keys(o).forEach(k=>{if(k=='d'||k=='us'){if(!CS.desc)return}p[k]=o[k]});
  if(!p.n||!String(p.n).trim())errs.push('제품명 없음');
  p.n=String(p.n||'').trim();
  if(/^[=+@]/.test(p.n)||/^-[^\d]/.test(p.n)){p.n=p.n.replace(/^[=+@-]+\s*/,'');warns.push('제품명 앞 기호 제거')}
  /* v592: 오류·주의 대신 자동 보정 — 숫자가 아니거나 범위를 벗어난 값은 0(=값 없음)으로 비움 */
  CSVNUM.forEach(k=>{if(p[k]===undefined||p[k]==='')return;const v=pqNum(p[k]);if(Number.isNaN(v)){delete p[k];warns.push(k.toUpperCase()+' 숫자 아님→0')}else p[k]=v});
  ['pk','mk','sg','svr','dft','ts','th'].forEach(k=>{if(p[k]===0)delete p[k]});
  /* 총 도막 우선: 총도막 열 → 1회도막×횟수 → 추천도막(dft) */
  const d1=pqNum(p._d1),cn=pqNum(p._cn),tt0=pqNum(p._tot);
  let tot;if(!Number.isNaN(tt0)&&tt0>0)tot=tt0;else if(!Number.isNaN(d1)&&!Number.isNaN(cn)&&d1>0&&cn>0)tot=d1*cn;
  if(tot!==undefined&&(p.dft===undefined||Math.abs(tot-p.dft)>1e-6)){if(p.dft!==undefined)warns.push('총도막으로 대체');p.dft=+tot.toFixed(2)}
  if(typeof p.dft=='number'){if(!(p.dft>0))delete p.dft;else if(p.dft>20000){p.dft=20000;warns.push('도막 20,000㎛로 제한')}}
  if(p.trp!==undefined){const v=pqNum(p.trp);if(Number.isNaN(v)||v<0){warns.push('희석율 0');p.tr=0}else p.tr=+(v/100).toFixed(4);delete p.trp}
  else if(p.tr!==undefined){let v=pqNum(p.tr);if(Number.isNaN(v)||v<0){warns.push('희석율 0');p.tr=0}else{p.tr=v>1?+(v/100).toFixed(4):v}}
  if(typeof p.svr=='number'&&!(p.svr>0&&p.svr<=100)){delete p.svr;warns.push('SVR 범위 밖→0')}
  if(typeof p.sg=='number'&&!(p.sg>0&&p.sg<=10)){delete p.sg;warns.push('비중 범위 밖→0')}
  if(p.pk&&p.mk&&p.mk<p.pk){p.mk=p.pk;warns.push('혼규를 출규로 맞춤')}
  Object.keys(p).forEach(k=>{if(k[0]=='_')delete p[k]});
  if(p.un){const u=String(p.un).toLowerCase();p.un=/kg|㎏/.test(u)?'kg':'ℓ'}
  if(p.ver!==undefined)p.ver=/^(1|y|yes|true|검증|검증완료|확인)$/i.test(String(p.ver).trim())?1:0;
  if(isJson&&o.ver)p.ver=o.ver?1:0;
    let st='new';
  if(!errs.length){if(seen.has(p.n)){const pr=rows.find(r=>r.p.n==p.n&&r.st!='err');if(pr){Object.keys(p).forEach(k=>{pr.p[k]=p[k]});pr.warns.push('중복 행 병합('+(i+1)+'행)')}errs.push('중복 행 병합');st='dup'}else{seen.add(p.n);const ex=DB.some(q=>q.n==p.n);st=ex?'upd':'new'}}
  if(st=='dup'){wn++;return}
  if(errs.length)st='err';
  if(st=='new')nw++;else if(st=='upd')up++;else er++;if(warns.length)wn++;
  rows.push({i:i+1,p,errs,warns,st})});
 return{rows,nw,up,er,wn}
}
function csvPrevRender(){
 const e=document.getElementById('cs_prev');if(!e)return;const P=CS.prev;
 if(!P){e.innerHTML='';return}
 if(P.err){e.innerHTML=`<div class="pqst er"><span>${esc(P.err)}</span></div>`;return}
 const sh=P.rows.slice(0,8),bad=P.rows.filter(r=>r.errs.length).slice(0,8);
 e.innerHTML=`<div class="pqsec">미리보기 · ${esc(P.file||'')}</div><div class="csum"><span>전체 <b>${P.rows.length}</b></span><span class="g">신규 <b>${P.nw}</b></span><span class="b">갱신 <b>${P.up}</b></span>${P.er?`<span class="r">제외 <b>${P.er}</b></span>`:''}<span class="y">자동보정 <b>${P.wn}</b></span></div>
 ${P.unk&&P.unk.length?`<div class="pqn">인식하지 못한 열(무시됨): ${esc(P.unk.slice(0,6).join(', '))}</div>`:''}
 <div class="pqtb"><div class="pqtr h"><span>행</span><span>제품명</span><span>SVR</span><span>도막</span><span>상태</span></div>${sh.map(r=>`<div class="pqtr"><span>${r.i}</span><span>${esc(r.p.n||'-')}</span><span>${r.p.svr??'-'}</span><span>${r.p.dft??'-'}</span><span class="${r.st=='err'?'r':r.st=='upd'?'b':'g'}">${r.st=='err'?'제외':r.st=='upd'?'갱신':'신규'}</span></div>`).join('')}</div>
 ${bad.length?`<div class="pqn">${bad.map(r=>`${r.i}행: ${esc(r.errs.join(', '))}`).join('<br>')}<br>제품명이 없는 행만 제외하고 나머지는 모두 가져옵니다.</div>`:''}
 <button class="pqb" ${P.nw+P.up?'':'disabled'} onclick="csvApply()">가져오기 실행 (${P.nw+P.up}개)</button>`;
}
function csvApply(){
 const P=CS.prev;if(!P||!P.rows)return;const ok=P.rows.filter(r=>r.st!='err');let a=0,u=0,s=0;
 ok.forEach(({p,st})=>{pqNorm(p);const j=DB.findIndex(q=>q.n==p.n);
  if(j<0){DB.push({d:'',tc:'',ts:18,url:'',un:'ℓ',...p,pk:p.pk||p.mk||'',mk:p.mk||p.pk||'',ext:pqToday()});a++}
  else if(CS.mode=='skip')s++;
  else{const o=DB[j];Object.keys(p).forEach(k=>{if(p[k]!==''&&p[k]!==undefined)o[k]=p[k]});o.ext=pqToday();if(+o.svr&&+o.dft)o.th=+(o.svr*10/o.dft).toFixed(4);u++}});
 sv();pqRcAdd('CSV 가져오기',P.file||'CSV');CS.prev=null;dbl();cards();csvRender();
 tt('가져오기를 완료했습니다<br><small>추가 '+a+' · 갱신 '+u+(s?' · 건너뜀 '+s:'')+'</small>')
}
/* 백업 · 설정 */
function setTab(){
 const bk=LS.lbk,wn=DB.length&&(!bk||(Date.now()-new Date(bk).getTime())>30*864e5)?`<div class="dsw" style="margin-bottom:10px">${PQI.warn}<span>${bk?'마지막 백업이 30일 이상 지났습니다.':'아직 백업하지 않았습니다.'} 데이터는 이 기기에만 저장됩니다.</span><button onclick="bkDo()">백업</button></div>`:'';
 return `<div class="pqc"><div class="pqh"><span class="pqi">${PQI.save}</span><div><b>데이터 백업 · 복원</b><small>JSON은 제품 DB·작업 내용·설정을 모두 포함합니다</small></div></div>
 <div class="pqn">마지막 백업: <b>${LS.lbk?esc(LS.lbk.slice(0,10)):'없음'}</b> · TDS PDF 원본은 백업에 포함되지 않습니다.</div>
 <button class="pqb" onclick="bkDo()">JSON 백업 저장</button>
 <label class="pql">백업 파일 복원</label><input class="pqin" type="file" accept=".json" onchange="bkRestore(this.files[0]);this.value=''">
 <select class="pqin" id="bk_mode"><option value="merge">병합 (기존 유지, 같은 제품은 갱신)</option><option value="replace">전체 대체 (현재 데이터 삭제)</option></select><div id="bk_st"></div></div>
 ${wn}<div class="pqc"><div class="pqh"><span class="pqi">${PQI.globe}</span><div><b>환경 설정</b><small>표시 언어 · 단위</small></div></div>
 <div class="pqg2"><button class="pqbc ${LANG=='ko'?'ok':''}" onclick="applyLang('ko');csvRender()">한국어</button><button class="pqbc ${LANG=='en'?'ok':''}" onclick="applyLang('en');csvRender()">English</button></div>
 <div class="pqn">단위: 미터법 (L · kg · ㎡ · ㎛) — 변경 불가</div><div class="pqn">저장소 사용량: ${window.__pqUs!=null?window.__pqUs+' MB':'확인 불가'}</div></div>
 <div class="pqc"><div class="pqh"><span class="pqi">${PQI.shield}</span><div><b>저장 위치 · 자료 이용</b><small>${esc(APPV.v)}</small></div></div>
 <div class="pqn">데이터는 이 기기의 브라우저 저장소(localStorage · IndexedDB)에만 저장됩니다. 브라우저 데이터를 지우거나 기기를 바꾸면 사라질 수 있으니 정기적으로 백업하세요.</div>
 <button class="pqb o" onclick="legalOpen()">자료 이용 안내 보기</button></div>`;
}
(async()=>{try{if(navigator.storage&&navigator.storage.estimate){const q=await navigator.storage.estimate();window.__pqUs=Math.round((q.usage||0)/1048576*10)/10}}catch(e){}})();
function bkDo(){
 const o={app:'CoatOn',edition:EDITION,version:APPV.v,date:new Date().toISOString(),db:DB,st:S,sy:SY,syl:syLibGet(),lang:LANG,ar:(window.apGet?apGet():undefined),hq:(window.hqGet?hqGet():undefined),rp:(window.LCCX?LCCX.get():undefined),pm:(window.pmGet?pmGet():undefined),note:'TDS PDF 원본은 포함되지 않습니다'};
 dl(new Blob([JSON.stringify(o)],{type:'application/json'}),`코트온_backup_${pqToday()}.json`);LS.lbk=new Date().toISOString();tt('백업 파일을 저장했습니다<br><small>제품 '+DB.length+'개 포함</small>');if(CS.tab=='set')csvRender()
}
async function bkRestore(f){
 if(!f)return;const st=document.getElementById('bk_st'),mode=(document.getElementById('bk_mode')||{}).value||'merge';
 try{
  if(f.size>52428800)throw new Error('파일이 너무 큽니다');
  const o=JSON.parse(await f.text());
  if(!o||(o.app!=='CoatOn'&&o.app!=='코트 온'&&o.app!=='PQC')||!Array.isArray(o.db)||o.db.some(p=>!p||typeof p.n!=='string'))throw new Error('코트 온 백업 파일이 아닙니다');
  ask(`백업(${esc((o.date||'').slice(0,10))} · 제품 ${o.db.length}개)을 ${mode=='replace'?'<b>전체 대체</b>':'병합'}로 복원할까요?${mode=='replace'?'<br><small>현재 제품 DB와 작업 내용이 삭제됩니다.</small>':''}`,()=>{
   try{if(o.rp&&window.LCCX)LCCX.set(o.rp)}catch(e){}    try{if(o.pm&&window.pmSetAll)pmSetAll(o.pm)}catch(e){}    try{if(o.hq&&window.hqSetAll)hqSetAll(o.hq)}catch(e){}
   try{if(o.ar&&window.apSetAll&&(mode=='replace'||!((apGet()||{}).parts||[]).length))apSetAll(o.ar)}catch(e){}
   if(mode=='replace'){DB.splice(0,DB.length,...o.db);if(o.st){Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,o.st)}if(o.sy){Object.keys(SY).forEach(k=>delete SY[k]);Object.assign(SY,o.sy);syNorm()}if(Array.isArray(o.syl))syLibSet(o.syl)}
   else{o.db.forEach(p=>{const j=DB.findIndex(q=>q.n==p.n);if(j<0)DB.push(p);else DB[j]={...DB[j],...p}})}
   sv();syS();cards();dbl();syRender();pqRcAdd('백업 복원',f.name);csvRender();tt('복원했습니다<br><small>제품 '+DB.length+'개</small>')})
 }catch(e){if(st)st.innerHTML=`<div class="pqst er"><span>${esc(e.message||String(e))}</span></div>`}
}
/* 관리자 모드 (관리자용 빌드 전용) */
let AD={q:'',f:'all'};
function admRender(){
 const e=document.getElementById('v7');if(!e)return;
 if(!IS_ADMIN){e.innerHTML='';return}
 const n=DB.length,ver=DB.filter(p=>p.ver).length,src=DB.filter(p=>p.src).length,lic=DB.filter(p=>p.lic).length,tk=(typeof TK!=='undefined'?TK.length:0);
 const q=AD.q.toLowerCase(),L=DB.map((p,j)=>[p,j]).filter(([p])=>(AD.f=='all'||(AD.f=='y')==!!p.lic)&&(!q||(p.n+(p.mf||'')).toLowerCase().includes(q))).slice(0,60);
 e.innerHTML=`<div class="pq"><div class="pqc"><div class="pqh"><span class="pqi">${PQI.admin}</span><div><b>코트 온 관리자</b><small>관리자용 빌드 · 배포용 데이터 관리</small></div></div>
 <div class="adg"><div><b>${n}</b><small>전체 제품</small></div><div><b>${ver}</b><small>검증 완료</small></div><div><b>${src}</b><small>출처 기록</small></div><div><b>${lic}</b><small>배포 승인</small></div><div><b>${tk}</b><small>TDS 첨부</small></div><div><b>${DEF.length}</b><small>기본 탑재(원본)</small></div></div>
 <div class="pqn er">관리자용 빌드에는 기존 원본 DB가 포함되어 있습니다. 배포용 빌드는 기본 DB가 비어 있고 이 화면이 없습니다. 두 빌드를 서로 다른 주소에 배포하세요.</div></div>
 <div class="pqc"><div class="pqh"><span class="pqi">${PQI.shield}</span><div><b>이용조건 확인 · 배포 승인</b><small>출처와 이용조건을 확인한 제품만 승인하세요</small></div></div>
 <div class="pqg2"><input class="pqin" placeholder="제품명·제조사 검색" value="${esc(AD.q)}" oninput="AD.q=this.value;admList()"><select class="pqin" onchange="AD.f=this.value;admList()"><option value="all">전체</option><option value="n" ${AD.f=='n'?'selected':''}>미승인</option><option value="y" ${AD.f=='y'?'selected':''}>승인됨</option></select></div>
 <div class="pqls tall" id="ad_l">${admRows(L)}</div></div>
 <div class="pqc"><div class="pqh"><span class="pqi">${PQI.csv}</span><div><b>배포용 데이터셋 내보내기</b><small>승인된 제품만 · 설명·용도·메모·원본 제외</small></div></div>
 <div class="pqg2"><button class="pqb" onclick="admExport('csv')">CSV (${lic}개)</button><button class="pqb o" onclick="admExport('json')">JSON (${lic}개)</button></div>
 <button class="pqb o" onclick="bkDo()">전체 원본 백업 (JSON)</button></div></div>`;
}
function admRows(L){return L.map(([p,j])=>`<div class="adr"><div class="adn"><b>${esc(p.n)}</b><small>${esc(p.mf||'미지정')} · ${p.src?'출처 있음':'출처 없음'}</small></div><button class="adt ${p.ver?'on':''}" onclick="admTog(${j},'ver')">검증</button><button class="adt ${p.lic?'on':''}" onclick="admTog(${j},'lic')">승인</button></div>`).join('')||'<div class="pqn">해당 제품이 없습니다</div>'}
function admList(){const q=AD.q.toLowerCase(),L=DB.map((p,j)=>[p,j]).filter(([p])=>(AD.f=='all'||(AD.f=='y')==!!p.lic)&&(!q||(p.n+(p.mf||'')).toLowerCase().includes(q))).slice(0,60),e=document.getElementById('ad_l');if(e)e.innerHTML=admRows(L)}
function admTog(j,k){const p=DB[j];if(!p)return;if(k=='lic'&&!p.lic&&!p.src)return ask('이 제품은 출처 URL이 기록되어 있지 않습니다.<br>이용조건을 확인했다면 승인할까요?',()=>{p.lic=1;sv();admRender()});p[k]=p[k]?0:1;sv();admRender()}
function admExport(fmt){
 const L=DB.filter(p=>p.lic);if(!L.length)return tt('배포 승인된 제품이 없습니다');
 ask(`승인된 ${L.length}개 제품을 ${fmt.toUpperCase()}로 내보냅니다.<br><small>제품설명·용도·메모·TDS 원본은 포함되지 않습니다.<br>배포 전 출처의 이용조건과 법률 검토를 확인하세요.</small>`,()=>{
  if(fmt=='csv')dl(new Blob([pqCsv([pqHead(true,false).filter(h=>h!='메모'),...L.map(p=>{const m=pqRowVals(p,true,false),h=pqHead(true,false),i=h.indexOf('메모');m.splice(i,1);return m})])],{type:'text/csv'}),`코트온_배포용데이터셋_${pqToday()}.csv`);
  else dl(new Blob([JSON.stringify(L.map(p=>{const o={};CSVH.forEach(([t,k])=>{if(k=='memo')return;if(k=='trp'){if(p.tr)o.tr=p.tr}else if(p[k]!==undefined&&p[k]!=='')o[k]=p[k]});return o}))],{type:'application/json'}),`코트온_배포용데이터셋_${pqToday()}.json`);
  tt('배포용 데이터셋을 내보냈습니다<br><small>'+L.length+'개 제품</small>')})
}
/* 계산 검증 · 경고 */
{const _calc=calc;calc=function(c){const p=PC(c.n);if(p){const e=ev(c,p);if(!(e.svr>0&&e.svr<=100&&e.dft>0&&e.loss>=0&&e.loss<100&&e.tr>=0&&isFinite(e.tr)))return null}return _calc(c)}}
function pqWarnList(items,area){
 const W=[],uv=[];
 items.forEach(({c,lb})=>{const p=P(c.n);if(!p)return;const e=ev(c,p),m=[];
  if(!p.ver)uv.push(p.n);
  if(e.svr>100||e.svr<0)m.push('SVR는 0~100% 범위여야 합니다');
  if(e.dft<0||e.dft>5000)m.push('도막두께 값을 확인하세요');
  if(e.loss<0||e.loss>=100)m.push('로스율은 0% 이상 100% 미만이어야 합니다');
  if(e.tr<0)m.push('희석율은 0% 이상이어야 합니다');
  if(+c.price<0||+c.tprice<0)m.push('단가가 음수입니다');
  if(UN(p)=='kg'&&!(+p.sg>0))m.push('kg 단위 제품에 비중이 없어 L 기준으로 계산됩니다');
  if(+p.mk>+p.pk&&!p.mixt)m.push('혼합비 기준(부피비·중량비) 확인 필요');
  if(m.length)W.push(`[${lb}] ${esc(p.n)}: ${m.join(' · ')}`)});
 if(+area<0)W.unshift('면적이 음수입니다');
 return{W,uv:[...new Set(uv)]}
}
function pqVw(sel,items){
 const c=document.querySelector(sel);if(!c||!items.length)return;
 const {W,uv}=pqWarnList(items,sel=='#rs'?S.area:SY.area);if(!W.length&&!uv.length)return;
 const wh=`<div class="pqw">${PQI.warn}<div>${uv.length?`<b>사용내역</b><small>미검증 제품 · ${uv.slice(0,4).map(esc).join(', ')}${uv.length>4?' 외 '+(uv.length-4)+'개':''} — 원문과 대조해 검증하세요.</small>`:''}${W.length?`<b>입력값 확인</b><small>${W.slice(0,5).join('<br>')}</small>`:''}</div></div>`,q=sel=='#syres'?c.querySelector('.sy-q'):null;if(q)q.insertAdjacentHTML('afterend',wh);else c.insertAdjacentHTML('afterbegin',wh)
}
{const _r=res;res=function(){_r.apply(this,arguments);try{pqVw('#rs',S.coats.map((c,i)=>({c,lb:od(i+1)})))}catch(e){}}}
{const _s=syCalc;syCalc=function(){_s.apply(this,arguments);try{const L=syLb();pqVw('#syres',SY.layers.map((c,i)=>({c,lb:L[i]})))}catch(e){}}}
{const _d=dbl;dbl=function(){_d.apply(this,arguments);if(!DB.length){const e=document.getElementById('dbl');if(e)e.insertAdjacentHTML('beforeend',`<div class="dse"><b>등록된 제품이 없습니다</b><small>첫 제품을 등록하거나 CSV로 가져오세요.</small><div class="dseb"><button onclick="T(4)">TDS 등록</button><button onclick="newP()">제품 직접 추가</button><button onclick="goCsv('csv')">CSV 가져오기</button></div></div>`)}}}
{const _cf=clrForm;clrForm=function(){_cf.apply(this,arguments);const v=document.getElementById('a_ver');if(v)v.value=''}}
if(LS.lgok!=='1')setTimeout(()=>{try{legalOpen(true)}catch(e){}},700);

afTds=async function(files){const f=[...(files||[])][0];if(!f)return;ask('이 자료를 이용할 권한이 있으며,<br>제조사의 이용조건을 확인했습니까?<br><small>분석 결과는 검토 후 등록됩니다.</small>',async()=>{try{const r=await tdsExtract(f,m=>tt(m));tvOpen(r,{f,src:'',rev:'',keep:false})}catch(e){tt('기술자료를 읽지 못했습니다<br>'+esc(e.message||e))}})};
if(LS.dv!='2'){DB=[...DEF,...DB.filter(p=>!DEF.some(q=>q.n==p.n))];LS.dv='2';sv()}
cards();T((()=>{try{return +(sessionStorage.vw??2)}catch(e){return 2}})());if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
if(LANG==='en')applyLang('en');

/* v230: 제품 선택 목록 · 키보드 겹침 보정 */
function sgFit(i,force){
 const b=document.getElementById('cb'+i);if(!b||b.hidden)return;
 const inp=b.parentElement&&b.parentElement.querySelector('.pin input');if(!inp)return;
 const vv=window.visualViewport,top=vv?vv.offsetTop:0,H=vv?vv.height:innerHeight;
 document.body.classList.add('sgon');
 /* 입력칸이 가려졌을 때만, 포커스 1회(또는 키보드 안정 후 1회) 스크롤 → 반복 스크롤로 인한 떨림 제거 */
 if(sgFit._k!==i||force){
  const hdr=Math.max(0,...['#hx','#saw'].map(q=>{const e=document.querySelector(q);return e&&e.offsetParent!==null?e.getBoundingClientRect().bottom:0})),want=Math.max(top+hdr+10,top+60),r=inp.getBoundingClientRect();
  if(r.top<top+hdr+2||r.top>top+H*.45){const dy=r.top-want;if(Math.abs(dy)>6)window.scrollBy({top:dy,left:0,behavior:'instant'})}
  sgFit._k=i;
 }
 const lt=b.getBoundingClientRect().top;
 b.style.maxHeight=Math.max(110,Math.min(H*.6,top+H-lt-10))+'px';
}
{const _s=sgst;sgst=function(i,q){_s.apply(this,arguments);clearTimeout(sgst._t);sgFit(i);sgst._t=setTimeout(()=>sgFit(i,true),380)}}
{const _c=cards;cards=function(){document.body.classList.remove('sgon');sgFit._k=null;const y=window.scrollY,cs=document.getElementById('cs'),h=cs?cs.offsetHeight:0;if(cs)cs.style.minHeight=h+'px';const r=_c.apply(this,arguments);if(cs)requestAnimationFrame(()=>{cs.style.minHeight='';});window.scrollTo({top:y,left:0,behavior:'instant'});return r}}
document.addEventListener('focusout',e=>{if(e.target&&e.target.closest&&e.target.closest('.pin'))setTimeout(()=>{if(!document.activeElement||!document.activeElement.closest||!document.activeElement.closest('.pin')){document.body.classList.remove('sgon');sgFit._k=null}},250)});
if(window.visualViewport){let ft;const f=()=>{clearTimeout(ft);ft=setTimeout(()=>{const b=document.querySelector('.cb:not([hidden])');if(b)sgFit(+b.id.slice(2),true)},180)};visualViewport.addEventListener('resize',f)}

/* ===== v232: 견적 발송 내역 · VER 관리 ===== */
const qtLoad=()=>{try{return JSON.parse(LS.qh||'[]')}catch(e){return[]}};
const qtSave=a=>{try{LS.qh=JSON.stringify(a);return true}catch(e){tt('발송 내역을 저장하지 못했습니다<br>저장 공간을 확인하세요');return false}};
function qtHash(){const E=esS(),R=esRows();return JSON.stringify([E.v,E.sp||{},E.nt||'',E.x,R.map(r=>{const o=E.o[r.k]||{};return[r.k,r.n,o.q!==undefined?o.q:r.q,o.p!==undefined?o.p:r.p]})])}
function qtVer(no){const H=qtLoad().filter(r=>r.no==no);if(!H.length)return 1;const mx=H.reduce((a,b)=>a.ver>=b.ver?a:b);return mx.h===qtHash()?mx.ver:mx.ver+1}
const qtLabel=E=>E.no?E.no+' · VER '+qtVer(E.no):'';
const qtFmt=ts=>{const d=new Date(ts),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())};
function qtHtml(src0){const src=src0||document.querySelector('#es .esh');if(!src)return '';const el=src.cloneNode(true),oi=[...src.querySelectorAll('input,textarea')],ci=[...el.querySelectorAll('input,textarea')];ci.forEach((x,i)=>{const d=document.createElement('div');d.textContent=oi[i].value;d.className='ev '+x.className;x.replaceWith(d)});el.removeAttribute('style');return el.outerHTML}
function qtCommit(kind){
 const E=esS(),no=String(E.no||'').trim();if(!no)return;
 esIssue();const H=qtLoad(),h=qtHash(),same=[...H].reverse().find(r=>r.no==no&&r.h===h);
 if(same){if(!same.ch.includes(kind))same.ch.push(kind);same.lt=Date.now();qtSave(H);qtBadge();return same}
 const ver=Math.max(0,...H.filter(r=>r.no==no).map(r=>r.ver))+1,tot=document.getElementById('esT');
 const st=JSON.parse(JSON.stringify(S));delete st.qs;
 const rec={id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),no,ver,ts:Date.now(),h,ch:[kind],recv:(E.v||[])[1]||'',site:(E.v||[])[3]||'',total:tot?tot.textContent:'',st:{S:st,SY:JSON.parse(JSON.stringify(typeof SY!=='undefined'?SY:{}))},html:qtHtml(esDocEl('f')),html2:qtHtml(esDocEl('d'))};
 H.push(rec);while(H.length>120)H.shift();
 if(qtSave(H)){qtBadge();if($('#es'))esRe();tt('발송 내역에 저장했습니다<br><small>'+esc(no)+' · VER '+ver+'</small>')}
 return rec}
function qtBadge(){const n=qtLoad().length,b=document.getElementById('qhn');if(b)b.textContent=n}
/* 견적서 페이지: 발송 내역 버튼 · 안내 */
{const _e=est;est=function(){_e.apply(this,arguments);const z=document.querySelector('#es .zh');if(z){const b=document.createElement('button');b.className='qhb';b.onclick=qhOpen;b.innerHTML='발송 내역<b id="qhn">'+qtLoad().length+'</b>';z.append(b)}}}
{const _f=esFre;esFre=function(){_f.apply(this,arguments);const E=esS(),f=document.querySelector('#es .zf'),g=f&&f.querySelector('.zig');if(!g)return;const H=qtLoad().filter(r=>r.no==E.no),mx=H.length?H.reduce((a,b)=>a.ver>=b.ver?a:b):null;
 const h=mx?`<div class="qth y">이미 발송한 견적입니다 · 마지막 <b>VER ${mx.ver}</b> (${qtFmt(mx.ts)}) · ${mx.h===qtHash()?'변경 없이 다시 보내면 같은 VER로 기록됩니다':'수정 내용으로 보내면 <b>VER '+qtVer(E.no)+'</b>로 기록됩니다'}</div>`:'<div class="qth">발송할 때 견적번호가 확정됩니다 · 수정해서 다시 보내면 VER 2, VER 3로 구분됩니다</div>';
 g.insertAdjacentHTML('afterend',h)}}
/* 발송 내역 */
function qhOpen(){
 pqX&&0;let e=document.getElementById('qh');if(e)e.remove();e=document.createElement('div');e.id='qh';e.onclick=ev=>{if(ev.target===e)qhClose()};
 e.innerHTML='<div class="qhs"><div class="qhh"><b>견적 발송 내역</b><button class="qhx" onclick="qhClose()" aria-label="닫기">✕</button></div><input class="qhq" placeholder="견적번호 · 수신 · 현장명 검색" oninput="qhList(this.value)"><div id="qhl" class="qhl"></div><button class="qhall" onclick="qhAll()">전체 삭제</button></div>';
 document.body.append(e);qhList('')}
function qhClose(){const e=document.getElementById('qh');if(e)e.remove();qtBadge()}
function qhList(q){
 const el=document.getElementById('qhl');if(!el)return;q=(q||'').trim().toLowerCase();
 const H=qtLoad().filter(r=>!q||(r.no+' '+r.recv+' '+r.site+' VER'+r.ver+' VER '+r.ver).toLowerCase().includes(q)).sort((a,b)=>b.ts-a.ts);
 el.innerHTML=H.length?H.map(r=>`<div class="qhi"><div class="qht"><b>${esc(r.no)}</b><span class="bdg b">VER ${r.ver}</span><span class="qhm">${qtFmt(r.ts)}</span></div><div class="qhd"><span>${esc(r.recv||'-')}</span><span>${esc(r.site||'-')}</span></div><div class="qhf"><span class="qhc">${r.ch.map(esc).join(' · ')}</span><b>${esc(r.total||'')}원</b></div><div class="qhbt"><button onclick="qhView('${r.id}')">보기</button><button class="ok" onclick="qhEdit('${r.id}')">수정 발송</button><button class="rd" onclick="qhDel('${r.id}')">삭제</button></div></div>`).join(''):'<div class="qhn0">발송 내역이 없습니다<br><small>견적서를 생성·PDF 저장·인쇄하면 자동으로 기록됩니다</small></div>'}
const qhFind=id=>qtLoad().find(r=>r.id==id);
function qhDel(id){const r=qhFind(id);if(!r)return;ask('발송 내역을 삭제할까요?<br><b>'+esc(r.no)+' · VER '+r.ver+'</b><br><small>삭제하면 되돌릴 수 없습니다</small>',()=>{qtSave(qtLoad().filter(x=>x.id!=id));qhList((document.querySelector('#qh .qhq')||{}).value);qtBadge();if($('#es'))esFre()})}
function qhAll(){const n=qtLoad().length;if(!n)return tt('삭제할 내역이 없습니다');ask('⚠ 발송 내역 '+n+'건을 모두 삭제할까요?<br><small>삭제하면 되돌릴 수 없습니다 (견적번호 순번은 유지됩니다)</small>',()=>{qtSave([]);qhList('');qtBadge();if($('#es'))esFre()})}
function qhEdit(id){const r=qhFind(id);if(!r)return;
 ask('이 견적을 불러와 수정합니다.<br><b>'+esc(r.no)+' · VER '+r.ver+'</b><br><small>현재 일위대가표·도장 시스템·견적서 작성 내용이 이 발송 시점의 값으로 바뀝니다.<br>수정 후 발송하면 VER '+(Math.max(...qtLoad().filter(x=>x.no==r.no).map(x=>x.ver))+1)+'로 기록됩니다.</small>',()=>{
  const keep=S.qs,st=JSON.parse(JSON.stringify(r.st.S));Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,st);S.qs=keep;
  if(typeof SY!=='undefined'&&r.st.SY){Object.keys(SY).forEach(k=>delete SY[k]);Object.assign(SY,JSON.parse(JSON.stringify(r.st.SY)));try{syS()}catch(e){}}
  sv();try{cards()}catch(e){}qhClose();est()})}
function qhView(id){const r=qhFind(id);if(!r)return;let e=document.getElementById('qv');if(e)e.remove();e=document.createElement('div');e.id='qv';
 e.innerHTML=`<div class="qvt">${esc(r.no)} · VER ${r.ver}</div><button class="qvc" onclick="qvClose()">닫기</button>${r.html2?'<div class="estb qvtb"><button data-k="d" onclick="qvTab(\''+r.id+'\',\'d\')">일위대가표 · 가로</button><button data-k="f" class="on" onclick="qvTab(\''+r.id+'\',\'f\')">견적서 · 세로</button></div>':''}<div class="qvw"><div class="qvp">${r.html}</div></div><div class="zbx"><button onclick="esZ(-.25)">−</button><span class="zpc">${Math.round((window.ESZ||1)*100)}%</span><button onclick="esZ(.25)">＋</button><button onclick="esZ(0)">맞춤</button></div><div class="qvb"><button onclick="qvAct('${r.id}','pdf')">PDF 저장</button><button onclick="qvAct('${r.id}','print')">인쇄</button><button class="ok" onclick="qvShare('${r.id}')">공유</button></div>`;
 document.body.append(e);const p=e.querySelector('.qvp .esh');if(p)esZoomSet(p);esPinch(e.querySelector('.qvw'))}
function qvTab(id,k){const r=qhFind(id),p=document.querySelector('#qv .qvp');if(!r||!p)return;p.innerHTML=k=='d'?(r.html2||''):r.html;window.ESZ=1;const e=p.querySelector('.esh');if(e)esZoomSet(e);document.querySelectorAll('#qv .estb button').forEach(b=>b.classList.toggle('on',b.dataset.k==k));document.querySelectorAll('.zpc').forEach(b=>b.textContent='100%')}
function qvClose(){const e=document.getElementById('qv');if(e)e.remove()}
function qvAdd(id,kind){const H=qtLoad(),r=H.find(x=>x.id==id);if(r){if(!r.ch.includes(kind))r.ch.push(kind);r.lt=Date.now();qtSave(H)}}
async function qvAct(id,kind){
 const r=qhFind(id),el=document.querySelector('#qv .qvp .esh');if(!r||!el)return;
 try{const cv=await esCv(el),base='견적서_'+r.no+'_VER'+r.ver;
  if(kind=='pdf'){await ldj();const pdf=esFitPdf(cv,window.jspdf.jsPDF);dl(pdf.output('blob'),base+'.pdf');qvAdd(id,'PDF');tt('PDF를 저장했습니다<br><small>'+esc(base)+'.pdf</small>')}
  else{const bl=await new Promise(ok=>cv.toBlob(ok,'image/png'));if(kind=='print'){prnBlob(bl,base+'.png');qvAdd(id,'인쇄')}else{await shareBlob(bl,base+'.png');qvAdd(id,'이미지')}}
 }catch(x){tt('처리에 실패했습니다<br>온라인 연결을 확인해 주세요')}}
if(typeof X==='function')X([['견적 발송 내역','Quotation Sent History'],['발송 내역','Sent history'],['견적번호 · 수신 · 현장명 검색','Search no. · recipient · site'],['발송 내역이 없습니다','No sent history'],['견적서를 생성·PDF 저장·인쇄하면 자동으로 기록됩니다','Recorded automatically when you generate, save as PDF or print'],['보기','View'],['수정 발송','Edit & resend'],['전체 삭제','Delete all'],['이미 발송한 견적입니다 · 마지막 ','Already sent · last '],['발송할 때 견적번호가 확정됩니다 · 수정해서 다시 보내면 VER 2, VER 3로 구분됩니다','The number is fixed when sent · resending an edited quote is tracked as VER 2, VER 3'],['발송 내역에 저장했습니다','Saved to sent history'],['발송 내역을 삭제할까요?','Delete this sent record?'],['삭제하면 되돌릴 수 없습니다','This cannot be undone'],['이 견적을 불러와 수정합니다.','Load this quotation to edit it.']]);

/* v233: 한 줄 맞춤 · 카드 넘침 방지 */
function pqFitLn(el,max,min){if(!el)return;const set=v=>el.style.setProperty('font-size',v+'px','important');set(max);let f=max,g=0;while(el.scrollWidth>el.clientWidth+1&&f>min&&g++<90){f-=.25;set(f)}}
function pqFitSys(){document.querySelectorAll('#syres .sy-n1').forEach(e=>pqFitLn(e,11.5,7));document.querySelectorAll('#syres .sy-sys .rcv.sy-m').forEach(e=>pqFitLn(e,17,9))}
function pqFitInfo(){document.querySelectorAll('#inf .ifn2 b').forEach(e=>pqFitLn(e,12.5,7));document.querySelectorAll('#inf .ifn2 small').forEach(e=>pqFitLn(e,11,7))}
{const _s=syCalc;syCalc=function(){_s.apply(this,arguments);try{pqFitSys()}catch(e){}}}
{const _i=showInfo;showInfo=function(){_i.apply(this,arguments);try{pqFitInfo()}catch(e){}}}
addEventListener('resize',()=>{try{pqFitSys();pqFitInfo()}catch(e){}});

/* ===== v234: 통합 공유 (이미지 · 텍스트 · PDF) ===== */
const pqN=v=>parseFloat(String(v==null?'':v).replace(/,/g,''))||0;
function repText(el){
 const c=el.cloneNode(true);c.querySelectorAll('input,textarea').forEach(x=>{const d=document.createElement('span');d.textContent=x.value||'';x.replaceWith(d)});
 const t=n=>[...n.childNodes].map(x=>x.textContent||'').join(' ').replace(/\s+/g,' ').trim(),L=[];
 c.querySelectorAll('.epct,.epr,.ept,.ettl,.eptr:not(.h):not(.none),.etr:not(.h):not(.none),.ekr.ei,.eptot .trw,.epn').forEach(n=>{
  const k=n.className||'';
  if(/\bepct\b/.test(k))L.push('','['+t(n)+']');
  else if(/\bepr\b/.test(k)){const a=n.querySelector('span'),b=n.querySelector('b');if(a&&b&&t(b)&&t(b)!='-')L.push(t(a)+': '+t(b))}
  else if(/\bept\b/.test(k))L.push('','■ '+t(n));
  else if(/\bettl\b/.test(k))L.push('제목: '+t(n));
  else if(/\bekr\b/.test(k)){const q=[...n.children].map(t);L.push(q[1]+(q[2]&&q[2]!='-'?' ('+q[2]+(q[3]||'')+')':'')+' : '+q[6]+' × '+q[4]+' = '+q[7]+'원')}
  else if(/\bsgh\b/.test(k))L.push('','■ '+t(n));
  else if(/\beptr\b/.test(k))L.push([...n.children].map(t).filter(Boolean).join(' / '));
  else if(/\betr\b/.test(k)){const q=[...n.children].map(t);L.push(q[0]+(q[1]?' — '+q[1]:'')+' : '+q[2]+' × '+q[3]+' = '+q[4]+'원')}
  else if(/\btrw\b/.test(k))L.push(t(n.children[0])+': '+t(n.children[1])+'원');
  else if(/\bepn\b/.test(k))L.push('','비고: '+t(n.querySelector('div')||n))});
 return [(el.querySelector&&/일 위 대 가 표/.test((el.querySelector('.epk')||{}).textContent||''))?'일위대가표':'견적서',...L].join('\n')}
function esText(){let el=document.querySelector('#es .esh');if(!el){try{esRe()}catch(x){}el=document.querySelector('#es .esh')}return el?esSf(()=>repText(el),''):''}
async function shFile(bl,name,title){
 const f=new File([bl],name,{type:bl.type});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title});return true}dl(bl,name);tt('파일을 저장했습니다<br><small>'+esc(name)+'</small>');return true}
 catch(x){if(x&&x.name=='AbortError')return false;try{dl(bl,name);tt('공유가 막혀 파일을 저장했습니다<br><small>'+esc(name)+'</small>');return true}catch(y){tt('공유할 수 없습니다');return false}}}
async function shPdf(cv){await ldj();const pdf=esFitPdf(cv,window.jspdf.jsPDF);return{blob:pdf.output('blob'),pages:1}}
/* o:{title,name,text,el:()=>Element,commit:kind=>void,extra:[[label,fn]]} */
function shUni(o){
 const text=typeof o.text=='function'?o.text():o.text;
 if(!text&&!o.el)return tt('공유할 내용이 없습니다');
 let e=document.getElementById('sh');if(e)e.remove();
 e=document.createElement('div');e.id='sh';e.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:70;display:flex;align-items:flex-end;justify-content:center';e.onclick=ev=>{if(ev.target===e)e.remove()};
 e.innerHTML=`<div class="shb"><div class="shh"><b>${o.title}</b><button id="shx" class="shx" aria-label="닫기">✕</button></div><div class="shtab sh3t"><button data-f="text">텍스트</button><button data-f="image">이미지</button><button data-f="pdf">PDF</button></div><div id="shp" class="shp"></div><div id="shs" class="hint" style="min-height:18px;margin:0 0 8px"></div><div class="shrow"><button id="shgo" class="ok shw">공유</button><div id="shsec" class="sh3"></div></div>${(o.extra||[]).map((x,i)=>`<button class="nv shw" data-x="${i}">${x[0]}</button>`).join('')}</div>`;
 document.body.append(e);
 let fmt='text';
 const C={},st=m=>{const s=document.getElementById('shs');if(s)s.textContent=m};
 const cv=async()=>{if(C.cv)return C.cv;st('보고서를 만드는 중…');C.cv=await esCv(o.el());return C.cv};
 const cv2=async()=>{if(C.cv2)return C.cv2;C.cv2=await esCv(o.el2());return C.cv2};
 const blob=async f=>{if(C[f])return C[f];const c=await cv();if(f=='image'){C.image=await new Promise(ok=>c.toBlob(ok,'image/jpeg',.88));if(o.el2){const c2=await cv2();C.image2=await new Promise(ok=>c2.toBlob(ok,'image/jpeg',.88))}}else{const cs=o.el2?[c,await cv2()]:[c];await ldj();C.pdf=esFitPdfN(cs,window.jspdf.jsPDF).output('blob');C.pages=cs.length}return C[f]};
 const ext={image:'jpg',pdf:'pdf'},lab={image:'이미지',text:'텍스트',pdf:'PDF'};
 const done=()=>{if(o.commit)try{o.commit(lab[fmt])}catch(x){}};
 const sec=document.getElementById('shsec'),pv=document.getElementById('shp');
 const btn=(t,fn,cls)=>{const b=document.createElement('button');b.textContent=t;if(cls)b.className=cls;b.onclick=fn;sec.append(b)};
 const copyText=async()=>{try{await navigator.clipboard.writeText(text)}catch(x){const a=document.createElement('textarea');a.value=text;document.body.append(a);a.select();document.execCommand('copy');a.remove()}done();tt('복사했습니다<br>카카오톡 등에 붙여넣기 하세요')};
 const render=async()=>{
  e.querySelectorAll('.shtab button').forEach(b=>{b.className=b.dataset.f==fmt?'ok':'';b.disabled=!o.el&&b.dataset.f!='text'});try{LS.shf=fmt}catch(x){}
  sec.innerHTML='';
  if(fmt=='text'){pv.innerHTML='<pre style="margin:0;white-space:pre-wrap;word-break:break-word;font:12.5px/1.6 system-ui,sans-serif"></pre>';pv.firstChild.textContent=text;st('텍스트로 보냅니다 (미리보기)');
   btn('메일',()=>{done();location.href='mailto:?subject='+encodeURIComponent(o.title)+'&body='+encodeURIComponent(text)});btn('문자',()=>{done();location.href='sms:?&body='+encodeURIComponent(text)});btn('복사',copyText)}
  else{pv.innerHTML='<div class="shw0">준비 중…</div>';
   btn('저장',async()=>{try{const b=await blob(fmt);if(o.el2&&fmt=='image'){dl(b,o.name+'_견적서.jpg');dl(C.image2,o.name+'_일위대가표.jpg')}else dl(b,o.name+'.'+ext[fmt]);done();tt((fmt=='pdf'?'PDF':'이미지')+'를 저장했습니다<br><small>'+esc(o.name+'.'+ext[fmt])+'</small>')}catch(x){tt('만들지 못했습니다<br>온라인 연결을 확인하거나 텍스트로 보내세요')}});
   btn('인쇄',async()=>{try{prnBlob(await blob(fmt),o.name+'.'+ext[fmt]);done()}catch(x){tt('인쇄 준비에 실패했습니다')}});
   if(fmt=='image')btn('복사',async()=>{try{if(navigator.clipboard&&window.ClipboardItem){await blob('image');const b=await new Promise(ok=>C.cv.toBlob(ok,'image/png'));await navigator.clipboard.write([new ClipboardItem({'image/png':b})]);done();tt('이미지를 복사했습니다<br>붙여넣기 하세요')}else{dl(await blob('image'),o.name+'.jpg');tt('이 기기는 이미지 복사를 지원하지 않아 저장했습니다')}}catch(x){tt('이미지 복사에 실패했습니다')}});
   const f=fmt;try{const c=await cv();if(fmt!=f||!document.getElementById('shp'))return;pv.innerHTML='';const im=document.createElement('img');im.src=(()=>{const k=Math.min(1,900/c.width),t=document.createElement('canvas');t.width=Math.max(1,Math.round(c.width*k));t.height=Math.max(1,Math.round(c.height*k));t.getContext('2d').drawImage(c,0,0,t.width,t.height);return t.toDataURL('image/jpeg',.6)})();im.style.cssText='width:100%;display:block;border-radius:8px';pv.append(im);if(o.el2){const c2=await cv2();if(fmt!=f||!document.getElementById('shp'))return;const t2=document.createElement('canvas'),k2=Math.min(1,900/c2.width);t2.width=Math.max(1,Math.round(c2.width*k2));t2.height=Math.max(1,Math.round(c2.height*k2));t2.getContext('2d').drawImage(c2,0,0,t2.width,t2.height);const i2=document.createElement('img');i2.src=t2.toDataURL('image/jpeg',.6);i2.style.cssText='width:100%;display:block;border-radius:8px;margin-top:8px';pv.append(i2)}
    if(f=='pdf'){await blob('pdf');st('A4 PDF '+C.pages+'쪽으로 보냅니다')}else st('이미지로 보냅니다')}catch(x){pv.innerHTML='<div class="shw0">미리보기를 만들지 못했습니다</div>';st('이미지·PDF를 만들지 못했습니다 (온라인 연결 필요) · 텍스트로 보내세요')}}};
 e.querySelectorAll('.shtab button').forEach(b=>b.onclick=()=>{fmt=b.dataset.f;render()});
 document.getElementById('shx').onclick=()=>e.remove();
 e.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{e.remove();o.extra[+b.dataset.x][1]()});
 document.getElementById('shgo').onclick=async()=>{
  if(fmt=='text'){if(navigator.share){try{await navigator.share({title:o.title,text});done()}catch(x){if(!(x&&x.name=='AbortError')){await copyText()}}}else{await copyText()}return}
  try{const b=await blob(fmt);if(o.el2&&fmt=='image'){const fs=[new File([b],o.name+'_견적서.jpg',{type:'image/jpeg'}),new File([C.image2],o.name+'_일위대가표.jpg',{type:'image/jpeg'})];if(navigator.canShare&&navigator.canShare({files:fs})){await navigator.share({files:fs,title:o.title});done()}else{dl(b,o.name+'_견적서.jpg');dl(C.image2,o.name+'_일위대가표.jpg');done()}}else if(await shFile(b,o.name+'.'+ext[fmt],o.title))done()}catch(x){tt('만들지 못했습니다<br>온라인 연결을 확인하거나 텍스트로 보내세요')}};
 render()}
/* 보고서별 연결 */
const shToday=()=>new Date().toISOString().slice(0,10);
function shQEl(){
 const E=esS(),sv0=[E.sy,E.pq,E.hid];E.sy=0;E.pq=1;E.hid={};let h;
 try{h=esHTMLD()}finally{E.sy=sv0[0];E.pq=sv0[1];E.hid=sv0[2]}
 const d=document.createElement('div');d.innerHTML=h;const el=d.firstElementChild;
 const k=el.querySelector('.epk');if(k)k.textContent='일 위 대 가 표';
 el.querySelectorAll('.epr').forEach(r=>{const a=r.querySelector('span');if(a&&/견적번호|유효기간|결제조건/.test(a.textContent))r.remove()});
 let sum=0;el.querySelectorAll('.ei[data-k]').forEach(tr=>{const g=e=>parseFloat(String(e&&e.value).replace(/,/g,''))||0,am=Math.round(g(tr.querySelector('input[data-f=q]'))*g(tr.querySelector('input[data-f=p]')));sum+=am;const c=tr.querySelector('.am');if(c)c.textContent=F(am,0)});
 const v=Math.round(sum*.1),q=x=>el.querySelector(x);if(q('#esS'))q('#esS').textContent=F(sum,0);if(q('#esV'))q('#esV').textContent=F(v,0);if(q('#esT'))q('#esT').textContent=F(sum+v,0);
 ['esS','esV','esT'].forEach(x=>{const e=q('#'+x);if(e)e.removeAttribute('id')});
 el.style.zoom='1';return el}
function shQuote(){const E=esS();E.pq=1;E.sy=0;E.hid=E.hid||{};Object.keys(E.hid).forEach(x=>{if(x[0]=='c')delete E.hid[x]});sv();window.ESRP=0;est()}
function shr(){if(!S.coats.some(c=>calc(c)))return tt('공유할 결과가 없습니다<br>제품을 선택하고 값을 입력하세요');
 shUni({title:'일위대가표',name:'일위대가표_'+shToday(),text:()=>repText(shQEl()).replace(/^견적서/,'일위대가표'),el:()=>shQEl(),extra:[['견적 생성',()=>shQuote()]]})}
function syEsEl(sel){
 esDef();const E=esS(),keep={sy:E.sy,pq:E.pq,syg:E.syg,hid:E.hid};let html='';
 try{E.sy=1;E.pq=0;E.syg=sel.slice();E.hid={};html=esHTML()}finally{E.sy=keep.sy;E.pq=keep.pq;E.syg=keep.syg;E.hid=keep.hid}
 const d=document.createElement('div');d.innerHTML=html;return d.firstElementChild}
function syReportEl(sel){return syEsEl(Array.isArray(sel)&&sel.length?sel:syGr().map((g,k)=>k))}
function syDoShare(sel){const t=syText(sel);if(!t)return tt('공유할 결과가 없습니다<br>시스템을 선택하고 값을 입력하세요');
 const G=syGr(),nm=sel.length==1&&G[sel[0]]?G[sel[0]].name.replace(/[\\/:*?"<>|\s]+/g,''):'';
 shUni({title:'도장 시스템 공유',name:'도장시스템_'+(nm?nm+'_':'')+shToday(),text:()=>repText(syEsEl(sel)),el:()=>syReportEl(sel)})}
function syShare(){if(!SY.layers.some(l=>calc(l)))return tt('공유할 결과가 없습니다<br>시스템을 선택하고 값을 입력하세요');
 if(SY.groups.length>1)return syOutPick('share');syDoShare([0])}
function esShare(){const E=esS();shUni({title:'견적서·일위대가표 생성',name:'견적서_'+(E.no||'')+'_VER'+qtVer(E.no),text:()=>[repText(esDocEl('f')),'',repText(esDocEl('d'))].join('\n'),el:()=>esDocEl('f'),el2:()=>esDocEl('d'),commit:k=>qtCommit(k)})}
function qvShare(id){const r=qhFind(id);if(!r)return;shUni({title:'견적서 공유',name:'견적서_'+r.no+'_VER'+r.ver,text:()=>repText(document.querySelector('#qv .qvp .esh')),el:()=>document.querySelector('#qv .qvp .esh'),commit:k=>qvAdd(id,k)})}
if(typeof X==='function')X([['이미지','Image'],['텍스트','Text'],['보고서를 만드는 중…','Building the report…'],['텍스트로 보냅니다 (미리보기)','Sending as text (preview)'],['이미지로 보냅니다','Sending as image'],['A4 보고서 미리보기','A4 report preview'],['이미지·PDF를 만들지 못했습니다 (온라인 연결 필요) · 텍스트로 보내세요','Could not build the image/PDF (online required) · send as text'],['인쇄','Print'],['저장','Save']]);

/* ===== v282 노무비(인건비) · 사용법 ===== */
function lbS(){let o={};try{o=JSON.parse(LS.lab||'{}')||{}}catch(e){}return Object.assign({},{on:1,rp:263017,rn:172068,sc:0,tl:0},o)}
function lbSave(o){try{LS.lab=JSON.stringify(o)}catch(e){}}
function lbCalc(c,Ac){
 const s=lbS();if(!s.on||!c||!(Ac>0))return null;
 let pp=0,pn=0,days=0;const B=c.lmd=='B',bq=+c.bq||0;
 if(B){if(bq>0){pp=(+c.bp||0)/bq;pn=(+c.bn||0)/bq}}else{pp=+c.lp||0;pn=+c.ln||0}
 if(!(pp>0||pn>0))return null;
 const m=1+(+s.sc||0)/100,qp=pp*Ac*m,qn=pn*Ac*m,cp=f10(qp*s.rp),cn=f10(qn*s.rn),lab=cp+cn,tool=f10(lab*(+s.tl||0)/100);
 if(B&&bq>0)days=Ac/bq*m;
 return{s,pp,pn,qp,qn,cp,cn,lab,tool,tot:lab+tool,days,m,B}}
function lbChip(i){const c=SY.layers[i];if(!c)return '';const A=+((SY.groups[c.g]||{}).area)||+SY.area||0;return lbCalc(c,+c.area||A)?'<span class="sy-lbc">노무</span>':''}
function lbTg(kind,i){return kind=='g'?SY.groups[i]:(S.lab=S.lab||{})}
function lbSet(kind,i,k,v,re){const c=lbTg(kind,i);if(!c)return;c[k]=v;if((k=='lp'||k=='ln')&&c.ps)delete c.ps;
 if(kind=='g'){syS();re?syRender():syCalc()}else{sv();re?cards():res()}}
function lbForm(kind,i,c){
 const s=lbS();if(!s.on)return '';
 const B=c.lmd=='B',f=(l,k,u,ph)=>`<div class="lbi"><span>${l}</span><div><input type="number" inputmode="decimal" value="${esc(c[k]??'')}" placeholder="${ph||''}" onwheel="this.blur()" oninput="lbSet('${kind}',${i},'${k}',this.value)"><em>${u}</em></div></div>`;
 return `<div class="lbc${window.LBO===false?' cmin':''}"><div class="lbh" onclick="lbCt(event,this)"><span class="lbic">${QS('<path d="M4.5 21c0-3.6 3.4-5.8 7.5-5.8s7.5 2.2 7.5 5.8z" fill="currentColor" stroke="none"/><path d="M8.6 12.2v1.3a3.4 3.4 0 0 0 6.8 0v-1.3z" fill="currentColor" stroke="none"/><path d="M7 12.2a5 5 0 0 1 10 0z" fill="#ffc83a" stroke="none"/><rect x="5.4" y="11.4" width="13.2" height="1.9" rx=".95" fill="#ffc83a" stroke="none"/><rect x="10.9" y="5.6" width="2.2" height="3" rx=".6" fill="#ffc83a" stroke="none"/>')}</span><div><b>노무비 산출 기준</b><small>${kind=='g'?'이 시스템 전체 1건':'전체 1건 (기본면적 기준)'} · 노임 ${F(s.rp,0)}/${F(s.rn,0)}원</small></div><div class="lbm"><button class="${B?'':'on'}" onclick="lbSet('${kind}',${i},'lmd','A',1)">품셈</button><button class="${B?'on':''}" onclick="lbSet('${kind}',${i},'lmd','B',1)">생산성</button></div><span class="lbcv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span></div><div class="lbg">${B?f('팀 생산성','bq','㎡/일')+f('도장공','bp','명')+f('보통인부','bn','명'):f('도장공','lp','인/㎡')+f('보통인부','ln','인/㎡')}</div><div class="lbn">${B?'팀 생산성 = 한 팀의 하루 시공 면적(㎡/일), 인원은 명':'표준품셈의 ㎡당 인(人) 수 · 비우면 미계산'}</div>${(!B&&c.ps)?`<div class="lbn" style="color:#1a56c8"><b>품셈 출처</b> ${esc(c.ps.n)} · ${esc(c.ps.s)}${c.ps.v?' · 검증 '+esc(c.ps.v):' · <span style="color:#e8780a;font-weight:700">검증 전</span>'}</div>`:''}</div>`}
function lbCt(ev,el){if(ev.target.closest('.lbm'))return;const c=el.closest('.lbc');if(!c)return;window.LBO=!c.classList.toggle('cmin')}
function lbFs(t){const n=String(t).length;return n>12?9.5:n>10?10.5:n>8?12:n>6?13:14.5}
function lbBlock(c,Ac,mat,hd){
 const L=lbCalc(c,Ac);if(!L)return '';
 const fi=x=>F(+x.toFixed(2),2),won=x=>{const t=F(x,0);return `<b style="font-size:${lbFs(t)}px">${t}<small>원</small></b>`};
 return `<div class="lbblk">${hd?`<div class="lbhd">${QS('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6"/>')}노무비 <small>${hd}</small></div>`:''}<div class="lbrg"><div><span>도장공</span><b>${fi(L.qp)}<small>인</small></b><em>${F(L.cp,0)}원</em></div><div><span>보통인부</span><b>${fi(L.qn)}<small>인</small></b><em>${F(L.cn,0)}원</em></div><div><span>노무비 계</span>${won(L.tot).replace('<b ','<b class="red" ')}<em>${L.s.tl>0?'공구손료 '+F(L.tool,0)+'원 포함':'㎡당 '+F(L.tot/Ac,0)+'원'}</em></div></div>${(!L.B&&c&&c.ps)?`<div class="lbd">품셈 출처 <b>${esc(c.ps.n)}</b> · ${esc(c.ps.s)}${c.ps.v?'':' · 검증 전'}</div>`:''}${L.days>0?`<div class="lbd">예상 작업일수 <b>${fi(L.days)}일</b> (팀 기준)</div>`:''}${mat!==undefined?`<div class="lbt"><span>재료비 + 노무비 <small>(VAT 별도)</small></span>${won(mat+L.tot).replace('<b ','<b class="red" ')}</div>`:''}</div>`}
function lbSheet(){
 const s=lbS();
 const row=(l,k,u,note)=>`<label class="lbsr"><span>${l}${note?`<small>${note}</small>`:''}</span><div><input type="number" inputmode="decimal" value="${esc(s[k])}" oninput="lbCfg('${k}',this.value)"><em>${u}</em></div></label>`;
 pqSheet('pqlab',`<div class="pqmh"><b>노무비 설정</b></div><div class="lbsw"><label class="lbsr"><span>노무비 계산 사용<small>끄면 도장 시스템·일위대가표·견적서에서 노무비 항목이 숨겨집니다</small></span><input type="checkbox" ${s.on?'checked':''} onchange="lbCfg('on',this.checked?1:0)"></label></div><div class="lbsw">${row('도장공 노임단가','rp','원/인','2026 상반기 시중노임단가 기본값')}${row('보통인부 노임단가','rn','원/인','2026 상반기 시중노임단가 기본값')}${row('할증','sc','%','고소·소규모·야간 등 현장 조건')}${row('공구손료','tl','%','노무비에 대한 비율')}</div><div class="lbn2">노임단가는 매년 상·하반기에 공표됩니다. 계약 기준 시점의 단가를 확인해서 직접 수정하세요. 품셈의 인/㎡ 값은 각 제품의 '노무비 산출 기준'에 입력합니다.</div><div class="pqg2"><button class="pqbc" onclick="lbCfgReset()">기본값 복원</button><button class="pqbc ok" onclick="pqX('pqlab')">완료</button></div>`)}
function lbCfg(k,v){const s=lbS();s[k]=k=='on'?+v:(v===''?0:+v);lbSave(s);try{if($('#v3'))syRender();if($('#cs'))cards()}catch(e){}}
function lbCfgReset(){lbSave({});pqX('pqlab');lbSheet();try{syRender();cards()}catch(e){}tt('노무비 설정을 기본값으로 되돌렸습니다')}
function helpHtml(){
 const C=(t,b,o)=>`<details class="hlpc"><summary>${t}</summary><div class="hlpb">${b}</div></details>`;
 return (`<div class="hlpl">`
 +C('1. 시작하기','<p>이 앱의 데이터(제품 DB, 입력값, 저장된 시스템, 견적서 입력)는 <b>이 기기에만</b> 저장됩니다. 인터넷 없이도 계산·견적서 작성이 됩니다.</p><p>브라우저 데이터를 지우거나 기기를 바꾸면 사라질 수 있으니 <b>더보기 → 백업 · 복원 → JSON 백업 저장</b>을 주기적으로 해 두세요.</p><p>이미지·PDF·엑셀 변환 도구는 처음 한 번만 인터넷이 필요합니다.</p>',1)
 +C('2. 화면 구성','<p>하단 메뉴: <b>홈 · 일위대가표 · 도장 시스템 · 견적서 · 더보기</b></p><ul><li><b>홈</b>: 최근 작업 내역</li><li><b>일위대가표</b>: 제품 하나하나(코트)를 직접 계산. 기본면적 아래의 <b>실란트 소요량 · 메쉬 소요량</b> 버튼으로 충진 · 메쉬 계산 화면을 엽니다.</li><li><b>도장 시스템</b>: 하도 · 중도 · 상도를 묶은 시스템 단위로 계산</li><li><b>견적서</b>: 계산 결과로 견적서 작성 · 공유</li><li><b>LCC</b>(더보기 → LCC): 도장 수명 · 보수 시기 · 생애주기 비용 분석 (14번 참고)</li><li><b>더보기</b>: 제품 DB, 백업 · 복원, 노무비 설정, 사용법, 설정 · 언어, 자료 이용 안내, 정보</li></ul>')
 +C('3. 제품 데이터베이스','<p>더보기 → <b>제품 DB</b>에서 엽니다.</p><ul><li><b>검색창</b>: 제품명 · 제조사 · 설명으로 찾습니다. 오른쪽 버튼은 검색 · 필터를 한 번에 초기화합니다.</li><li><b>칩</b>: 전체 / TDS 있음 / 미첨부로 거릅니다. <b>필터</b>를 누르면 제조사를 고를 수 있습니다.</li><li><b>분류 타일</b>: 전체 · 수성 · 유성 · 방수재 · 바닥재 · 중방식 · 공업 · 기타. 희석제가 상수도물이면 수성, 그 밖에는 제품 이름 · 일반명 · 용도의 글자로 자동 구분하며 숫자는 해당 제품 수입니다. PDF 등록 화면의 ‘도료 구분’에서 바꿀 수 있습니다.</li><li><b>정렬</b>: 추천순(최근 등록 · 매칭 우선) · 이름순 · TDS 있음순</li><li><b>카드</b>: 제품명, 제조사, 검증 여부, 설명, 용도 태그, TDS 첨부 여부를 보여 줍니다. 카드를 누르면 데이터 시트가 열립니다.</li><li>오른쪽 위 <b>＋</b>는 제품 수기 추가, <b>톱니</b>는 TDS 등록 · CSV 관리 · 제품 수기 추가 · 초기화 메뉴를 펼칩니다.</li></ul>')
 +C('4. 데이터 시트 (제품 정보)','<ul><li><b>상단 고정 영역</b>: 제품명, 제조사, 검증/미검증, TDS 첨부 표시와 일반명 · 용도 · 표면처리 요약이 스크롤해도 고정됩니다. ‹ 로 목록으로 돌아갑니다.</li><li><b>기본 제원</b>: 제품설명 · 용도 · 표면처리, 혼합규격, 혼합비, 출고규격, 희석제(희석율 포함), SVR, 추천도막, 이론 도장면적, 혼합규격당 도장면적. 값이 없는 칸은 \'-\'로 표시됩니다.</li><li><b>건조시간 · 재도장 간격</b>: 온도별 지촉 · 고화 · 완전경화 표와 재도장 최소 · 최대 간격. TDS에서 자동 추출한 값은 원문과 꼭 대조하세요.</li><li><b>상세 정보 · 출처</b>: 비중, 가사시간, 선행 · 후속도장, TDS 포장규격, 출처, 개정일, 확인일</li><li>각 제목 줄을 누르면 섹션이 접힙니다. 하단 버튼은 항상 화면 맨 아래에 고정됩니다.</li></ul><p><b>하단 버튼</b>: <b>TDS 보기</b>(첨부한 PDF 열기, 없으면 \'미첨부\') · <b>첨부</b>(TDS 파일 추가) · <b>TDS삭제</b>(첨부한 TDS만 삭제, 제품은 남음) · <b>제품 수정</b>(값 직접 수정)</p>')
 +C('5. TDS 등록','<ol><li>제품 DB 화면 → 톱니 → <b>TDS 등록</b>을 엽니다.</li><li><b>파일 첨부</b>(PDF · 이미지) 또는 <b>링크 등록</b> 탭을 고르고 제품명 · 출처 · 개정일을 확인합니다.</li><li>글자 · OCR로 항목(규격 · SVR · 도막 · 희석제 · 건조시간 · 가사시간 · 용도 · 표면처리 등)을 읽어 <b>검토 화면</b>에 보여 줍니다. 값을 고친 뒤 등록합니다.</li><li>제품설명은 핵심만 50자 이내로 요약됩니다. 원문 설명 문구 · 표 · 이미지는 저장하지 않고 계산에 필요한 값만 저장합니다.</li></ol><p>여러 파일을 한꺼번에 올리는 <b>일괄 등록</b>도 가능하며, 제품을 못 찾은 파일은 대기 목록에 보관되어 나중에 직접 지정할 수 있습니다. 하단 <b>최근 등록 내역</b>에서 이전 작업을 확인합니다.</p><p class="hlpw">※ TDS 읽기는 PDF 도구를 처음 불러올 때만 인터넷이 필요합니다.</p>')
 +C('6. CSV · 백업 · 복원','<p>더보기 → <b>백업 · 복원</b>. 위쪽 탭이 <b>CSV 관리</b> / <b>백업 · 설정</b>으로 나뉩니다.</p><ul><li><b>빈 CSV 양식 내려받기</b>: 제품 DB의 모든 항목(제품명 · 제조사 · 규격 · SVR · 도막 · 희석제 · 건조시간 · 가사시간 · 선행/후속도장 · 출처 · 설명 · 용도 등)이 열로 들어 있는 양식입니다. 첫 예시 행은 지우고 쓰세요.</li><li><b>가져오기</b>: CSV · 엑셀 · JSON 파일을 고르면 미리보기와 검증(오류 · 경고)을 거쳐 반영합니다. 중복 제품은 \'갱신\' 또는 \'건너뛰기\'를 고릅니다. 제품설명 · 용도 열은 \'가져오기\' 체크를 켠 경우에만 반영됩니다.</li><li><b>내보내기</b>: 전체 / 검증 완료 / 선택한 제품 범위를 고르고 출처 · 설명 포함 여부를 정합니다.</li><li><b>JSON 백업 저장</b>: 제품 DB · 작업 내용 · 시스템 · 설정을 모두 저장합니다. TDS 원본 PDF는 포함되지 않습니다.</li><li><b>백업 파일 복원</b>: \'병합\'(기존 유지, 같은 제품 갱신) 또는 \'전체 대체\'(현재 데이터 삭제)를 고릅니다.</li><li>마지막 백업이 30일 지나면 경고가 표시됩니다.</li></ul>')
 +C('7. 도장 면적 산출 (유형별 도면)','<p>면적을 직접 계산하기 어려울 때 쓰는 보조 페이지입니다. 일위대가표 화면의 <b>도장 면적 산출 · 도면</b> 버튼으로 엽니다.</p><ol><li>위쪽에서 <b>유형</b>(아파트 · 주택 · 옥상 · 주차장 · 철재 · 차량 · 직접)을 고릅니다. 유형마다 기본 부위가 준비되어 있고, 아래 <b>부위 추가</b>로 벽면 · 바닥 · 파라펫 · 기둥 · 구획선 · 강관 · H형강 · 평판 · 탱크 · 직접 면적을 더할 수 있습니다.</li><li>부위를 펼쳐 <b>치수 · 수량 · 공제(창 · 문) · 도장 면(한 면/양면)</b>을 입력하면 <b>도면이 입력값에 맞게 바뀌고</b> 부위 면적(㎡)이 계산됩니다.</li><li>맨 아래에 <b>이 유형 합계</b>와 <b>전체 합계</b>가 표시됩니다. <b>이 유형 적용</b> 또는 <b>전체 적용</b>을 누르면 합계가 일위대가표의 <b>기본면적</b>으로 들어갑니다.</li></ol><p><b>계산식</b></p><ul><li>벽면 = (가로 × 높이 × 수량 − 공제) × 도장 면 수</li><li>바닥 · 천장 = 가로 × 세로 × 수량 − 공제</li><li>경사 지붕 = 밑변 × 길이 × √(1 + (경사/10)²)</li><li>파라펫 = 길이 × (높이 × 면 수 + 상단 폭)</li><li>기둥 = 둘레 × 높이 × 수량 (사각 2(a+b), 원형 π×지름)</li><li>구획선 = 선 길이 × 선 폭 × 수량</li><li>강관 = π × 외경 × 길이 × 수량 × 면 수</li><li>H형강 = (4B + 2H − 2tw) × 길이 × 수량</li><li>탱크 = π × 지름 × 높이 (+ 지붕 · 바닥 π×지름²/4) × 수량</li><li>차량(근사) = 2(L×W + L×H + W×H) × 외판 계수(기본 0.3) × 대수</li></ul><p class="hlpw">※ 도면은 개략도이고 면적은 입력한 치수 기준입니다. 차량처럼 곡면이 많은 대상은 근사값이므로 실측 면적이 있으면 \'직접 면적\' 부위를 쓰세요. 입력 내용은 기기에 저장되고 JSON 백업에 포함됩니다.</p>')
 +C('8. 공동주택 견적 (내역서 · 원가계산서)','<p>일위대가표 화면의 <b>공동주택 견적 · 내역서</b> 버튼으로 엽니다. 아파트 단지 보수공사 6개 공종(외벽 도장 · 내벽 도장 · 옥상 우레탄 방수 · 지하주차장 에폭시 · 보차도 포장 · 지붕 싱글)을 <b>면적 산출 → 공종별 내역서 → 원가계산서</b>까지 계산합니다.</p><ol><li><b>단지 정보</b>: 단지 이름, 평면 형식(계단실형 / 복도형), 동별 층수, 세대 타입별 공급면적 · 세대수를 입력합니다.</li><li>위쪽 칩에서 공종을 고릅니다. 면적은 <b>① 직접 입력 &gt; ② 동별 · 구역 산출 &gt; ③ 세대 정보 추정</b> 순서로 적용됩니다.</li><li><b>시공 조건</b>(도장 방식, 두께, 바탕처리 범위 등)을 고르면 내역서 수량이 바뀝니다.</li><li><b>공종별 내역서</b>에서 항목별 수량 · 금액, <b>공사 원가계산서</b>에서 간접노무비 · 보험료 · 안전관리비 · 일반관리비 · 이윤 · 부가세를 확인합니다.</li><li><b>단가 수정</b>: 재료 · 노무 · 경비 단가는 기본값(엑셀 기준)이며 항목별로 바꿀 수 있습니다.</li><li>‘단지 견적 합계에 포함’을 켠 공종만 하단 합계에 더해집니다.</li><li><b>면적 → 일위대가표</b>는 이 공종 면적을 기본면적으로 보내고, <b>내역서 CSV 저장</b>은 엑셀로 열 수 있는 파일을 만듭니다.</li></ol><p>백업 JSON에도 함께 저장됩니다.</p>')
 +C('9. 일위대가표 (코트별 계산)','<ol><li>맨 위 <b>기본면적</b>(㎡)을 입력합니다. 코트마다 면적을 따로 넣으면 그 값이 우선합니다.</li><li>제품명을 입력해 선택하면 DFT·SVR·Loss·희석율이 자동으로 채워집니다. DB에 없으면 <b>+ 생성</b>으로 직접 입력합니다. 제품 DB 화면의 데이터 시트에서 확인한 값과 같은 값이 쓰입니다.</li><li><b>제품단가(원/1말)</b>는 <b>혼합규격 1말 기준</b>으로 입력하고, <b>희석제 단가</b>도 입력합니다.</li><li>입력이 필요한 칸은 <b>연한 빨간 테두리</b>로 표시되고, 값이 들어가면 사라집니다.</li><li>결과에서 이론·실제 소요량, 캔(말) 수, ㎡당 단가, 총 금액을 확인합니다.</li></ol><p>하단 버튼: <b>+ Coat 추가 / − Coat 삭제 / 공유 / 전체 초기화</b>. 세부 내역·출력의 <b>견적서 생성</b>으로 바로 견적서를 만듭니다.</p><p><b>부자재(메쉬·실란트)</b>: 코트 목록 아래 「부자재 소요량」 카드에서 체크하면 일위대가표 행(품명·규격·수량·단가·금액)으로 합산됩니다. <b>에폭시 내화 제품을 선택하면 메쉬가 자동 포함</b>되며, 형강 규격·적용 부위·롤 규격은 「설정」 버튼에서 입력합니다. 메쉬·실란트 금액은 총 금액, 세부 내역, 견적서에 함께 반영됩니다.</p>')
 +C('10. 도장 시스템','<ol><li>상단 <b>기본면적</b>은 화면 위에 고정되어 있습니다.</li><li><b>시스템+</b>: 시스템 이름을 쓰고 단계(하도·중도·상도·구분 없음)를 고른 뒤 제품을 눌러 담고 <b>시스템 저장</b>.</li><li><b>저장S</b>(저장된 시스템): 저장한 시스템 목록에서 <b>불러오기</b>로 화면에 반영합니다.</li><li><b>변경</b>: 화면의 시스템에 제품을 추가·변경합니다.</li><li>시스템 카드: 이름·시스템별 면적 입력, <b>저장 / 삭제 / 제품+</b>. ⌄ 버튼으로 접고 펼칩니다.</li><li>제품 줄을 누르면 펼쳐져 <b>단계 변경, ▲▼ 순서, 삭제</b>와 소요량 산출 기준(DFT·SVR·Loss·희석율·면적·단가)을 입력할 수 있습니다.</li></ol>')
 +C('11. 실란트 · 메쉬 소요량','<ol><li>일위대가표 화면에서 기본면적 아래 <b>실란트 소요량 · 메쉬 소요량</b> 버튼을 누릅니다. 오른쪽 위 선택 메뉴로 <b>실란트 / 메쉬 / 작업 내역 / 일위대가표</b>를 오갑니다.</li></ol><p><b>실란트</b> (실란트 · 실리콘 · 퍼티 충진량)</p><ol><li><b>제품 정보</b>: 제품명, 비중, 포장 규격을 입력합니다. <b>첨부</b>로 데이터시트를 올리면 제조사 · 값이 자동으로 채워집니다.</li><li><b>단면 프로파일 선택</b>: 줄눈 · 원형 등 충진 단면을 고릅니다.</li><li><b>충진 부위 입력</b>: 폭 · 깊이 · 길이, 충진 갯수, 로스율을 부위별로 넣으면 필요 용량과 포장 수가 계산됩니다. 줄눈은 폭에 맞는 권장 깊이를 안내합니다.</li></ol><p><b>메쉬</b> (에폭시 내화 메쉬 소요량)</p><ol><li><b>형강 규격 선택</b> 또는 직접 입력(H · B · tw · tf)</li><li>부재 길이 · 수량을 넣고, 메쉬를 붙일 부위를 도형이나 목록에서 선택합니다.</li><li><b>세부 조건</b>에서 플랜지 연장 · 도막 두께 · 겹침 길이 · 접합부 띠 폭 · 로스 · 단가를 조정합니다.</li></ol><p>계산 결과는 <b>작업 내역</b>에 쌓입니다.</p>')
 +C('12. 노무비(인건비) 계산','<p><b>노무비 = 노무량(인/㎡) × 면적 × 노임단가(원/인)</b><br>※ 1인 = 한 사람이 하루(1일) 일한 양</p><ol><li>더보기 → <b>노무비 설정</b>(아래 <b>내화도료 품셈 기준</b> 버튼: KCC SQ-1003·2003·2007 중도 도막·이론 소요량·횟수 확인, 인/㎡는 현장 실적 입력)에서 도장공·보통인부 노임단가, 할증(%), 공구손료(%)를 확인·수정합니다. (기본값: 2026 상반기 시중노임단가)</li><li><b>노무비 산출 기준</b>에 입력합니다. 인건비는 제품마다가 아니라 <b>시스템 전체에 1건</b>입니다. 도장 시스템은 각 시스템 카드 맨 아래, 일위대가표는 코트 목록 맨 아래에 있습니다. 입력 방식은 둘 중 하나를 고릅니다.</li></ol><div class="hlpx"><b>방식 ① 품셈</b> — 표준품셈에 적힌 <b>㎡당 필요한 인(人) 수</b>를 그대로 입력<br>예) 하도~상도 전체 공정에 도장공 0.05 인/㎡ · 보통인부 0.02 인/㎡ → 100㎡면 도장공 5인, 인부 2인</div><div class="hlpx"><b>방식 ② 생산성</b> — 현장에서 실제로 하는 속도를 입력<br><b>팀 생산성</b> = 한 팀이 <b>하루에 칠하는 면적(㎡/일)</b><br><b>도장공 · 보통인부 (명)</b> = 그 팀에 몇 명이 일하는지<br>예) 도장공 2명 + 보통인부 1명 팀이 하루 80㎡를 칠한다면<br>· 도장공 2 ÷ 80 = 0.025 인/㎡<br>· 보통인부 1 ÷ 80 = 0.0125 인/㎡<br>· 100㎡ 시공 → 도장공 2.5인, 인부 1.25인, <b>예상 작업일수 1.25일</b><br>(팀을 2배로 늘리면 인원 합계는 같고 작업일수만 절반이 됩니다)</div><ol start="3"><li><b>할증</b>은 고소·소규모·야간 등 현장 조건으로 인(人) 수를 늘리는 비율, <b>공구손료</b>는 노무비에 더하는 비율입니다. 0이면 적용되지 않습니다.</li><li>결과에 도장공·보통인부 공수와 금액, <b>재료비+노무비</b>가 표시되고, 견적서에는 시스템(또는 일위대가표 전체)마다 인건비 줄이 1세트(도장공·보통인부·공구손료) 들어갑니다.</li></ol><p>값을 비워 두면 노무비는 계산하지 않습니다. 품셈 값이 있으면 ①, 현장 실적이 있으면 ②가 편합니다.</p><p class="hlpw">※ 품셈 계수는 앱에 내장하지 않았습니다. 최신 표준품셈과 계약 조건에 맞는 값을 직접 입력하세요.</p>')
 +C('13. 견적서','<ol><li>하단 <b>견적서</b> 또는 계산 화면의 <b>견적서 생성</b>으로 엽니다.</li><li><b>공급자 정보</b>와 <b>견적 정보</b>(일자·견적번호·현장명·수신·유효기간·결제조건)를 입력합니다.</li><li><b>도장 품목</b>에 계산 결과가 자동 반영됩니다. 수량·단가는 직접 고칠 수 있고, <b>품목+ / 도장S / 일위대가표</b> 버튼으로 항목을 추가·가져옵니다.</li><li><b>견적서 생성</b>으로 이미지·텍스트로 공유하고, 보낸 기록은 <b>발송 내역</b>에서 확인합니다. <b>미리보기</b>로 먼저 확인할 수 있습니다.</li></ol>')
 +C('14. LCC (생애주기 비용 분석)','<p>더보기 → <b>LCC</b>에서 엽니다. 도장이 <b>지금 어떤 상태인지, 언제 다시 칠해야 하는지, 어떤 도장사양이 평가기간 동안 총비용이 가장 적은지</b>를 계산합니다. 위쪽 탭은 <b>대시보드 · 자산 · 진단 · 사양 · 비교 · 보고서</b>이며, 앞 탭에 입력한 값이 뒤 탭 계산에 그대로 이어집니다.</p><div class="hlpx"><b>계산 흐름</b><br>① 자산: 부식환경 등급(C1~CX)과 조건 보정 → 수명계수<br>② 사양: 기준수명 × 수명계수 = 추정수명 → 보수주기<br>③ 비교: 보수 시점마다 초기비용 × 면적(인상률 반영)을 더해 LCC 계산<br>④ 대시보드 · 보고서: 위 결과를 요약</div><p><b>① 대시보드</b> (입력 없음 · 결과 요약)</p><ul><li><b>보여 주는 것</b>: 총 생애주기 비용, 예상 수명, 초기 공사비, 추천 사양 LCC와 현재 사양 대비 증감(%)</li><li><b>비용 구성 비율</b>: 초기 도료비 · 초기 노무/바탕비 · 재도장 도료비 · 재도장 노무비 · 물가 상승분 (현재 사양 기준 도넛)</li><li><b>설비 생애주기 현황</b>: 시공 → 운영 → 1~3차 재도장 예정 연월 (자산 탭에서 선택한 자산의 경과 년과 보수주기로 계산)</li><li>위쪽 선택 상자로 전체 프로젝트 또는 자산 하나를 고릅니다. 상세보기를 누르면 해당 탭으로 이동합니다.</li></ul><p><b>② 자산</b></p><ul><li><b>입력</b>: 자산 유형(플랜트 · 공동주택 · 물류창고 · 교량 · 기타 직접 입력), 자산(구역)명, 면적(㎡), 마지막 도장 후 경과 년, 요구 내구성(L · M · H · VH). <b>+ 추가</b>로 자산을 여러 개 만들 수 있습니다.</li><li><b>부식환경 측정</b>: 측정장소를 고르면 대기환경 측정값(SO₂ 월평균)이 채워집니다. 염화물(mg/㎡·일) · SO₂ · 평균 습도(%)를 입력하고, 한 자산 안에서 환경이 다르면 <b>세부 구역</b>으로 나눕니다(면적 비중으로 가중 평균). 측정이 어려우면 시편 부식속도(µm/년)나 등급을 직접 지정합니다.</li><li><b>조건 보정</b>: 화학물질 노출 · 고온 결로 · 바탕 상태 · 시공 품질 · 유지관리를 고르면 수명계수로 곱해집니다. 사용자 인자를 더할 수 있고, 운영 · 안전 영향 4항목은 보수 우선순위에 반영됩니다.</li><li><b>분석</b>: 염화물 · SO₂ · 습도를 ISO 12944-2 부식환경 등급(C1~CX)으로 판정합니다.</li><li><b>결과</b>: 보수 시기 판정. 잔여 수명 = 예상 수명 − 경과 년 → 0년 이하 즉시 · 2년 이하 1~2년 내 · 5년 이하 3~5년 내 · 5년 초과 정상. 적용 부식환경, 예상 수명, 잔여 수명, 요구 내구성 충족 여부, 가장 가혹한 세부 구역도 보여 줍니다. 하단에서 JSON · CSV로 저장합니다.</li></ul><p><b>③ 진단</b> (현장진단 화면)</p><ul><li><b>입력</b>: 사진을 촬영하거나 올린 뒤, 사진에 보이는 항목(녹 · 균열 · 박리 · 블리스터 · 초킹)을 직접 고릅니다. 한 사진에서 여러 항목을 함께 고를 수 있습니다.</li><li><b>분석</b>: 항목별 등급과 상태 점수, 위험 등급 구간을 계산하고 검사 이력에 저장합니다.</li><li><b>LCC로 넘어가는 값</b>: 항목별 결함값이 자산에 들어가 Zone 등급(R 3개월 내 · O 6개월 내 · Y 1년 내 · G 3년 내 재평가)이 정해지고, 상태 점수에서 나온 보정계수가 <b>현재 사양의 수명</b>에 곱해집니다. 보정 체크를 끄면 보정 없이 계산합니다.</li><li><b>결과</b>: 진단 결과 · 항목별 세부 · 이력과, 이 결과가 LCC에 반영됐는지 보여 주는 LCC 연결 카드(수명 보정값 · 사양별 LCC)</li></ul><p><b>④ 사양</b></p><ul><li><b>3개 사양</b>: 도장사양(현재 적용 중) · 범용사양(일반적인 사양) · 추천사양(부식환경과 자산 유형에 맞춰 내장 사양 중 비용이 낮은 것을 자동 추천, <b>환경 맞춤 자동 추천</b> 버튼으로 다시 추천)</li><li><b>입력</b>: 사양 이름(직접 입력 또는 <b>도장S</b>로 도장 시스템에 저장한 시스템 불러오기), 내구성등급(L · M · H · VH)과 소비자 요구 연한(기준수명), 표면처리 노무비(원/㎡ = 노무단가 ÷ 일 작업량), 코트별 제품 · DFT · 고형분 · 로스 · 희석율 · 캔 가격 · 포장(DB 제품 선택 가능)</li><li><b>분석</b>: 소요량 = DFT ÷ (10 × 고형분) ÷ (1 − 로스), 초기비용 = 재료비 + 표면처리 노무비, 추정수명 = 기준수명 × 환경 · 조건계수. 환경 등급이 내구성등급의 적용 한계(L→C2, M→C3, H→C4, VH→C5)를 넘으면 한 단계마다 ×0.75로 감점합니다.</li><li><b>결과</b>: 3색 사양 카드 · 비교표(내구연한 · 초기 시공비 · 누적비용 · 재도장 횟수 · 도막두께 · 환경 적합 · 종합 평가) · 비용 비교 차트 · LCC 최적 사양, 그리고 아래 편집 영역의 <b>일위대가표</b>(하도 · 중도 · 상도 · 희석제의 소요량 · 단가 · 금액). <b>시스템수정</b>은 도장 시스템 화면에서 코트를 고쳐 저장하면 이 사양에 반영됩니다.</li></ul><p><b>⑤ 비교</b></p><ul><li><b>입력</b>: 평가기간(년), 보수 시점당 인상률(%). LCC 전체에 적용되는 값입니다.</li><li><b>분석</b>: 처음 시공비에 더해 보수주기마다 재도장 비용(초기비용 × 면적 × (1 + 인상률 × 횟수))을 평가기간 끝까지 누적합니다. 할인율(현재가치 환산)은 적용하지 않습니다.</li><li><b>결과</b>: 사양 비교표(총 DFT · 추정수명 · 보수주기 · 환경 적합 · 요구 내구성 충족 · 초기 원/㎡ · 초기 총액 · LCC · 연환산 원/㎡·년 · 도료 물량 · 현재 대비 %), 최저 LCC 사양과 절감액, 수명 · 비용 막대, 누적 LCC 선 그래프</li></ul><p><b>⑥ 보고서</b> (입력 없음 · 전체 자산 종합)</p><ul><li>보고서 헤더(평가기간 · 면적 합계 · 환경 · 보고서 ID · 작성일), KPI 4개(총 LCC · 절감액 · 예상 도장수명 · 긴급 보수), 누적 LCC 꺾은선(10 · 20 · 30년 보기), Zone별 보수 우선순위(R · O · Y · G 자산 수), 사양별 비용 비교, 핵심 권고사항(총 LCC가 가장 낮은 사양 안내), 자산별 요약표</li><li><b>보고서 저장 (.html)</b> · <b>Word 저장 (.doc)</b>으로 파일을 만들고, <b>추천사양 → 일위대가표</b>는 추천사양의 코트와 면적을 일위대가표로 보냅니다. 보고서 ID는 저장할 때마다 일련번호가 올라갑니다.</li></ul><p class="hlpw">※ 수명계수와 등급 구간은 선별용 가정값이니 현장 데이터로 교정하세요. 내장 사양(범용 · 추천)의 단가 · 노무비 · 수명은 예시값이므로 실제 견적으로 바꾸세요. 면적은 자산 탭에 직접 입력하며 도장 면적 산출 · 공동주택 견적과는 자동으로 이어지지 않습니다. LCC 입력값은 이 기기에 자동 저장되고 JSON 백업에 포함됩니다.</p>')
+C('15. 계산식과 용어','<ul><li><b>이론 소요량</b> = DFT[㎛] ÷ (SVR[%] × 10) (L/㎡)</li><li><b>실제 소요량</b> = 이론 ÷ (1 − Loss[%] ÷ 100)</li><li>kg 단위 제품은 비중을 곱해 kg/㎡로 환산</li><li>캔 수량은 올림, 금액은 십원 미만 절사, VAT 별도</li><li><b>DFT</b> 건조 도막 두께 · <b>SVR</b> 고형분 용적비 · <b>Loss</b> 도장 손실률 · <b>희석율</b> 희석제 비율</li></ul>')
 +C('16. 주의사항 · 문제 해결','<ul><li>계산 결과는 <b>참고용</b>이며 활용에 따른 판단과 책임은 사용자에게 있습니다.</li><li>결과가 나오지 않으면 DFT · SVR이 비어 있는지 확인하세요(빨간 테두리 칸).</li><li>제품 DB 목록이 비어 보이면 검색어 · 칩 · 분류 타일 · 제조사 필터가 걸려 있는지 확인하세요. 검색창 오른쪽 버튼으로 한 번에 초기화됩니다.</li><li>건조시간이 \'-\'이면 TDS를 등록하거나 제품 수정에서 직접 입력하세요.</li><li>이미지 · PDF · 엑셀 기능이 안 되면 인터넷에 연결한 뒤 한 번 사용해 도구를 불러오세요.</li><li>기기 변경 · 데이터 삭제에 대비해 JSON 백업을 보관하세요.</li></ul>')
 +`</div>`)}


{const _rl=res;res=function(){_rl.apply(this,arguments);try{
 const el=$('#rs');if(!el)return;const A=+S.area||0;if(!(A>0))return;
 let mat=0;S.coats.forEach(c=>{const r=calc(c);if(!r)return;const Ac=+c.area||A;mat+=f10(r[0].amt*Ac)+(r[1]?f10(r[1].amt*Ac):0)});
 const b=lbBlock(S.lab||{},A,mat,'전체 1건 · 기본면적 기준');if(!b)return;
 const h=`<div class="rcw lbres"><div class="rch">${QS('<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6"/>')}노무비 계산 결과</div><div class="rcb">${b}</div></div>`;
 const d=el.querySelector('.rsd');if(d)d.insertAdjacentHTML('beforebegin',h);else el.insertAdjacentHTML('beforeend',h)
}catch(e){}}}

{const _cd=cards;cards=function(){_cd.apply(this,arguments);try{document.querySelectorAll('#cs .rec').forEach(pqFitW)}catch(e){}}}

/* v288: 기존 제품 1회 표준화 (백업 후 적용) */
setTimeout(()=>{try{if(LS.bp505!=='1'&&DB.length){try{LS.dbbak505=JSON.stringify(DB)}catch(e){}let c=0;DB.forEach(p=>{if(bigPack(p))c++});sv();LS.bp505='1';if(c){try{dbl();cards()}catch(e){}tt('제품 '+c+'개의 출고·혼합규격을 대포장 기준으로 바꿨습니다')}}}catch(e){}},2500);
setTimeout(()=>{try{if(LS.nm288!=='1'&&DB.length){LS.dbbak288=JSON.stringify(DB);DB.forEach(pqNorm);sv();LS.nm288='1';try{dbl();cards()}catch(e){}tt('제품 '+DB.length+'개의 설명·용도·표면처리를 표준 형식으로 정리했습니다<br><small>정리 전 데이터는 기기에 백업해 두었습니다</small>')}else if(LS.nm288!=='1')LS.nm288='1'}catch(e){}},1200);
