try{PQI.cmp=pqSv('<rect x="3.5" y="4" width="7" height="16" rx="1.6"/><rect x="13.5" y="4" width="7" height="16" rx="1.6"/><path d="M6 15v2M17 11v6M6 9.5h2M17 8h.01"/>')}catch(e){}
/* v492 제품 비교 페이지 — 제조사 비표시 · 결과는 '어떤 제품 우위'로 표기 */
(function(){
'use strict';
const Q=s=>document.querySelector(s);
const E=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const N=(x,d)=>isFinite(x)?(+x).toLocaleString('ko-KR',{maximumFractionDigits:d==null?0:d}):'-';
const COL={a:'#1f6fe5',b:'#e8730c'},LAB={a:'A',b:'B'};
const blank=()=>({n:'',svr:'',dft:'',pk:'',un:'L',sg:'',price:'',touch:'',hard:'',voc:'',eco:0,certs:'',refs:'',adv:''});
let C={tab:'spec',mode:'same',area:'',dft:100,loss:10,dftSet:0,a:blank(),b:blank(),cur:-1},SAVED=[],OPEN={a:0,b:0},INIT=0;
try{const j=JSON.parse(LS.cmp||'null');if(j&&typeof j=='object')C={...C,...j,a:{...blank(),...(j.a||{})},b:{...blank(),...(j.b||{})}}}catch(e){}
try{const j=JSON.parse(LS.cmps||'[]');if(Array.isArray(j))SAVED=j.filter(x=>x&&x.a&&x.b)}catch(e){}
const store=()=>{try{LS.cmp=JSON.stringify(C)}catch(e){}};
const storeList=()=>{try{LS.cmps=JSON.stringify(SAVED)}catch(e){}};
const toast=m=>{try{tt(m)}catch(e){}};

/* 제조사명은 어디에도 표시하지 않음: 제품명에 섞여 있는 제조사 표기도 제거 */
const MK=/KCC|건설화학|조광페인트|삼화페인트|노루페인트|강남제비스코|제비스코|던에드워드|한진화학|국제페인트|부자페인트|아크조노벨|AkzoNobel|Jotun|조턴|PPG|Hempel|헴펠|Sigmakalon|시그마칼론/gi;
const clean=p=>{const n=String((p&&p.n)||'').trim(),mf=String((p&&p.mf)||'').trim();let r=n;if(mf.length>1)r=r.split(mf).join(' ');r=r.replace(MK,' ').replace(/\s{2,}/g,' ').replace(/^[\s\-_·•,()\[\]\/]+|[\s\-_·•,()\[\]\/]+$/g,'').trim();return r||'제품'};
const dbl=()=>{try{return Array.isArray(DB)?DB:[]}catch(e){return[]}};
const norm=s=>String(s||'').toLowerCase().replace(/[\s\-_·.()\/]/g,'');

/* ---------- 계산 ---------- */
function one(p,w){
 const area=+C.area||0,loss=Math.min(60,Math.max(0,+C.loss||0));
 const svr=+p.svr||0,dft=C.mode=='own'?(+p.dft||+C.dft||0):(+C.dft||0),ok=svr>0&&dft>0;
 const kg=p.un=='kg'&&+p.sg>0,pk=+p.pk||0,pkL=pk>0?(kg?pk/(+p.sg):pk):0,price=+p.price||0,priceL=pkL>0&&price>0?price/pkL:0;
 const cov=ok?svr*10/dft:0,acL=ok?(dft/(svr*10))/(1-loss/100):0,covA=acL>0?1/acL:0,litres=ok&&area>0?Math.ceil(area*acL):0;
 return{w,name:(p.n||'').trim()||('제품 '+LAB[w]),has:!!(p.n||'').trim(),svr,dft,ok,cov,covA,acL,litres,
  cans:pkL>0&&litres>0?Math.ceil(litres/pkL):0,areaCan:pkL>0?pkL*covA:0,priceL,cost:priceL>0?litres*priceL:0,costM2:priceL>0?priceL*acL:0,
  touch:+p.touch||0,hard:+p.hard||0,voc:+p.voc||0,eco:!!p.eco,pkL,price,loss};
}
function rows(a,b){
 const R=[],add=(k,l,f,va,vb,hi,cnt,both)=>{let w=null;const okv=both?(va>0&&vb>0):true;if(okv&&va!==vb&&Math.abs(va-vb)/Math.max(Math.abs(va),Math.abs(vb),1e-9)>=0.0005)w=(hi?va>vb:va<vb)?'a':'b';R.push({k,l,f,va,vb,w,cnt})};
 add('svr','고형분 용적비 (SVR)',v=>v>0?N(v,1)+'%':'-',a.svr,b.svr,1,0,1);
 add('cov','이론 도포율 @ 도막 '+(C.mode=='own'?'추천':N(+C.dft)+'㎛'),v=>v>0?(+v).toFixed(2)+' ㎡/L':'-',a.cov,b.cov,1,0,1);
 add('covA','실제 도포율 (Loss '+N(a.loss,0)+'%)',v=>v>0?(+v).toFixed(2)+' ㎡/L':'-',a.covA,b.covA,1,1,1);
 add('areaCan','1말(혼합규격) 도장면적',v=>v>0?N(v,1)+' ㎡':'-',a.areaCan,b.areaCan,1,0,1);
 add('litres','총 소요량',v=>v>0?N(v)+' L':'-',a.litres,b.litres,0,0,1);
 add('cost','총 자재비',v=>v>0?'₩'+N(v):'-',a.cost,b.cost,0,1,1);
 add('costM2','㎡당 자재비',v=>v>0?'₩'+N(v):'-',a.costM2,b.costM2,0,0,1);
 add('touch','지촉건조',v=>v>0?N(v)+'분':'-',a.touch,b.touch,0,1,1);
 add('hard','경화건조',v=>v>0?N(v)+'시간':'-',a.hard,b.hard,0,1,1);
 add('voc','VOC 함량',v=>v>0?N(v)+' g/L':'-',a.voc,b.voc,0,1,1);
 {const w=a.eco&&!b.eco?'a':!a.eco&&b.eco?'b':null;R.push({k:'eco',l:'친환경 인증',f:v=>v?'있음':'-',va:a.eco?1:0,vb:b.eco?1:0,w,cnt:1})}
 return R;
}
function verdict(a,b,R){
 const V={ready:a.ok&&b.ok,w:null,basis:'',tie:false};
 if(!V.ready)return V;
 if(a.cost>0&&b.cost>0){V.basis='총 자재비';const d=Math.abs(a.cost-b.cost)/Math.max(a.cost,b.cost);if(d>=0.005)V.w=a.cost<b.cost?'a':'b';else V.tie=true}
 else{V.basis='실제 도포율';const d=Math.abs(a.covA-b.covA)/Math.max(a.covA,b.covA);if(d>=0.005)V.w=a.covA>b.covA?'a':'b';else V.tie=true}
 const cr=R.filter(r=>r.cnt&&r.w);V.total=cr.length;V.won=V.w?cr.filter(r=>r.w==V.w).length:0;
 V.other=V.w?cr.filter(r=>r.w&&r.w!=V.w).map(r=>r.l.replace(/ \(.*\)/,'')):[];
 return V;
}
const pct=(x,d)=>(x>=0?'+':'−')+N(Math.abs(x),d==null?1:d)+'%';

/* ---------- 결과 화면 ---------- */
function dot(w){return `<i class="cp-dot" style="background:${COL[w]}">${LAB[w]}</i>`}
function condLine(){return (C.mode=='own'?'각 제품 추천 도막':'동일 도막 '+N(+C.dft)+'㎛')+' · '+(+C.area>0?N(+C.area)+'㎡':'면적 미입력')+' · Loss '+N(+C.loss)+'%'}
function verdictHtml(a,b,R,V){
 if(!V.ready)return `<div class="cp-vd off"><div class="cp-vt"><span class="cp-chip">종합 결과</span></div><b class="cp-vm">비교할 값을 입력하세요</b><p>두 제품의 <b>SVR(%)</b>과 <b>도막 두께(㎛)</b>를 입력하면 어떤 제품이 우위인지 자동으로 표시됩니다. 단가·규격까지 입력하면 자재비로 판정합니다.</p></div>`;
 if(!V.w)return `<div class="cp-vd tie"><div class="cp-vt"><span class="cp-chip">종합 결과</span><span class="cp-vb">${V.basis} 기준</span></div><b class="cp-vm">두 제품 동등</b><p>${V.basis} 차이가 0.5% 미만입니다. 건조시간·VOC·인증 등 다른 항목으로 비교하세요.</p><div class="cp-wn">${condLine()}</div></div>`;
 const W=V.w==='a'?a:b,L=V.w==='a'?b:a,c=COL[V.w];
 const cs=L.cost>0&&W.cost>0?L.cost-W.cost:0,cp=L.cost>0&&cs?cs/L.cost*100:0,cg=L.covA>0?(W.covA/L.covA-1)*100:0,lr=L.litres>0?(L.litres-W.litres)/L.litres*100:0;
 const t3=[
  ['고형분 (SVR)',(W.svr-L.svr>=0?'+':'−')+N(Math.abs(W.svr-L.svr),1)+'%p',N(L.svr,1)+'% → '+N(W.svr,1)+'%'],
  ['소요량',L.litres>0?pct(-lr,1):'-',L.litres>0?N(L.litres)+'L → '+N(W.litres)+'L':'면적 입력 필요'],
  ['자재비 차이',cs?'₩'+N(Math.abs(cs)):'-',cs?pct(-cp,1)+' ('+N(+C.area)+'㎡)':'단가·규격 입력 필요']];
 let sum=cs?`자재비 <b>${N(Math.abs(cp),1)}% 절감</b>`:'';
 sum+=(sum?' · ':'')+`실제 도포면적 <b>${pct(cg,1)}</b>`;
 return `<div class="cp-vd" style="--c:${c}"><div class="cp-vt"><span class="cp-chip">종합 결과</span><span class="cp-vb">${V.basis} 기준</span></div>
 <div class="cp-vw">${dot(V.w)}<b class="cp-vm">${E(W.name)} <em>우위</em></b></div>
 <p>${condLine()} — ${sum}</p>
 <div class="cp-t3">${t3.map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div>
 <div class="cp-wn">비교 ${V.total}개 항목 중 ${V.won}개 우위${V.other.length?` · 제품 ${LAB[V.w=='a'?'b':'a']} 우위 항목: ${E(V.other.join(', '))}`:''}</div></div>`;
}
function specHtml(a,b,R,V){
 const bar=x=>`<div class="cp-br"><div class="cp-bl"><span>${E(x.name)}</span><b>${x.svr>0?N(x.svr,1)+'%':'-'}</b></div><div class="cp-bk"><i style="width:${Math.min(100,x.svr)}%;background:${COL[x.w]}"></i></div></div>`;
 const win=w=>V.w===w?'<span class="cp-wb">우위</span>':'';
 const tbl=R.filter(r=>r.va>0||r.vb>0||r.k=='eco'&&(r.va||r.vb)).map(r=>`<tr><td>${r.l}</td><td class="${r.w=='a'?'win':''}">${r.f(r.va)}${r.w=='a'?' ▲':''}</td><td class="${r.w=='b'?'win':''}">${r.f(r.vb)}${r.w=='b'?' ▲':''}</td></tr>`).join('');
 return `<div class="cp-pair"><div class="cp-ph" style="--c:${COL.a}">${dot('a')}<b>${E(a.name)}</b>${win('a')}</div><div class="cp-ph" style="--c:${COL.b}">${dot('b')}<b>${E(b.name)}</b>${win('b')}</div></div>
 <div class="cp-blk"><h4>고형분 용적비 (SVR %)</h4>${bar(a)}${bar(b)}</div>
 <div class="cp-blk"><h4>이론 도포율 (㎡/L) · ${C.mode=='own'?'제품별 추천 도막':'도막 '+N(+C.dft)+'㎛'}</h4><div class="cp-pair"><div class="cp-tile" style="--c:${COL.a}"><span>${LAB.a}</span><b>${a.cov>0?a.cov.toFixed(2):'-'}</b><small>실제 ${a.covA>0?a.covA.toFixed(2):'-'} ㎡/L</small></div><div class="cp-tile" style="--c:${COL.b}"><span>${LAB.b}</span><b>${b.cov>0?b.cov.toFixed(2):'-'}</b><small>실제 ${b.covA>0?b.covA.toFixed(2):'-'} ㎡/L</small></div></div></div>
 <div class="cp-blk"><h4>항목별 비교표</h4><table class="cp-tb"><thead><tr><th>항목</th><th style="color:${COL.a}">${LAB.a}</th><th style="color:${COL.b}">${LAB.b}</th></tr></thead><tbody>${tbl||'<tr><td colspan=3 class="cp-no">입력된 값이 없습니다</td></tr>'}</tbody></table><small class="cp-note">▲ = 해당 항목 우위 · 건조시간·VOC·인증은 입력한 경우에만 비교합니다.</small></div>`;
}
function costHtml(a,b,V){
 const bx=x=>`<div class="cp-cb${V.w===x.w?' win':''}" style="--c:${COL[x.w]}"><div class="cp-cbh">${dot(x.w)}<span>${E(x.name)}</span>${V.w===x.w?'<span class="cp-wb">우위</span>':''}</div>
  <div class="cp-kv"><span>소요량</span><b>${x.litres>0?N(x.litres)+' L':'-'}</b></div><div class="cp-kv"><span>필요 수량</span><b>${x.cans>0?N(x.cans)+'말':'-'}</b></div>
  <div class="cp-kv"><span>총 자재비</span><b class="big">${x.cost>0?'₩'+N(x.cost):'-'}</b></div><div class="cp-kv"><span>㎡당</span><b>${x.costM2>0?'₩'+N(x.costM2):'-'}</b></div></div>`;
 let sv='';
 if(a.cost>0&&b.cost>0){const d=a.cost-b.cost;sv=Math.abs(d)/Math.max(a.cost,b.cost)<0.005?`<div class="cp-sv tie"><b>자재비 동등</b></div>`:`<div class="cp-sv" style="--c:${COL[d>0?'b':'a']}"><div><small>${E((d>0?b:a).name)} 선택 시 자재비 절감</small><b>₩${N(Math.abs(d))} (${N(Math.abs(d)/Math.max(a.cost,b.cost)*100,1)}%)</b></div><i>우위</i></div>`}
 else sv=`<div class="cp-sv tie"><b>단가·혼합규격을 입력하면 자재비 차이가 계산됩니다</b></div>`;
 const A=[1000,5000,10000,30000,50000];if(+C.area>0&&!A.includes(+C.area))A.push(+C.area);A.sort((x,y)=>x-y);
 const lines=a.costM2>0&&b.costM2>0?A.map(m=>{const ca=a.costM2*m,cb=b.costM2*m,d=ca-cb,w=Math.abs(d)/Math.max(ca,cb)<0.005?'':d>0?'b':'a';return `<tr class="${m==+C.area?'cur':''}"><td>${N(m)}㎡</td><td>₩${N(ca)}</td><td>₩${N(cb)}</td><td class="${w?'win':''}">${w?LAB[w]+' ₩'+N(Math.abs(d)):'-'}</td></tr>`}).join(''):'';
 return `<div class="cp-pair">${bx(a)}${bx(b)}</div>${sv}${lines?`<div class="cp-blk"><h4>면적별 자재비 비교 (같은 조건)</h4><table class="cp-tb"><thead><tr><th>면적</th><th style="color:${COL.a}">${LAB.a}</th><th style="color:${COL.b}">${LAB.b}</th><th>차액(우위)</th></tr></thead><tbody>${lines}</tbody></table></div>`:''}
 <small class="cp-note">자재비 = 소요량(L, 올림) × 단가. 단가는 입력한 말당 단가 ÷ 혼합규격으로 환산합니다. 인건비·운반비·손실 외 부대비용은 포함하지 않습니다.</small>`;
}
const lines=t=>String(t||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
function proofHtml(a,b,edit){
 const card=(w,x)=>{const o=C[w];const sec=(k,t,ph)=>edit?`<label>${t}<textarea class="cp-ta" rows="3" placeholder="${ph}" oninput="CMP.txt('${w}','${k}',this.value)">${E(o[k])}</textarea></label>`:(lines(o[k]).length?`<div class="cp-ps"><b>${t}</b><ul>${lines(o[k]).map(i=>`<li>${E(i)}</li>`).join('')}</ul></div>`:'');
  return `<div class="cp-card" style="--c:${COL[w]}"><div class="cp-ch">${dot(w)}<b>${E(x.name)}</b></div>${sec('adv','스펙 시트에 나타나지 않는 시공·품질 장점','한 줄에 하나씩 입력')}${sec('certs','공인 인증 · 시험 성적서','예: KS 인증, 시험성적서 번호')}${sec('refs','주요 납품 · 시공 실적','예: 현장명 / 적용 부위')}</div>`};
 return card('a',a)+card('b',b)+(edit?'<small class="cp-note">입력한 내용은 이 기기에 저장되며 이미지 저장 시 함께 출력됩니다. 근거 자료가 있는 내용만 기재하세요.</small>':'');
}
function tabsHtml(){return `<div class="cp-tabs">${[['spec','1:1 스펙 분석'],['cost','경제성 계산'],['proof','강점 · 인증 · 실적']].map(([k,t])=>`<button type="button" class="${C.tab==k?'on':''}" onclick="CMP.tab('${k}')">${t}</button>`).join('')}</div>`}
function resHtml(){
 const a=one(C.a,'a'),b=one(C.b,'b'),R=rows(a,b),V=verdict(a,b,R);
 const body=C.tab=='cost'?costHtml(a,b,V):C.tab=='proof'?proofHtml(a,b,true):specHtml(a,b,R,V);
 return verdictHtml(a,b,R,V)+tabsHtml()+`<div class="cp-body">${body}</div>`;
}
function reportHtml(){
 const a=one(C.a,'a'),b=one(C.b,'b'),R=rows(a,b),V=verdict(a,b,R),ph=proofHtml(a,b,false);
 const d=new Date(),ds=d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0');
 return `<div class="cp-rh"><b>제품 비교 · 분석 보고서</b><small>${ds}</small></div>${verdictHtml(a,b,R,V)}<h3 class="cp-rt">1:1 스펙 분석</h3>${specHtml(a,b,R,V)}<h3 class="cp-rt">경제성 계산</h3>${costHtml(a,b,V)}${ph?`<h3 class="cp-rt">강점 · 인증 · 실적</h3>${ph}`:''}<div class="cp-warn">본 자료는 참고용이며 현장 조건·시공 방법에 따라 실제 사용량·비용은 달라질 수 있습니다. 시공 전 제조사 최신 기술자료(TDS)를 확인하세요. 활용에 따른 판단과 책임은 사용자에게 있습니다.</div>`;
}

/* ---------- 입력 화면 ---------- */
const num=(w,k,l,ph,u)=>`<label class="cp-f"><span>${l}</span><div class="cp-iw"><input class="cp-in" type="number" inputmode="decimal" step="any" placeholder="${ph||''}" value="${E(C[w][k])}" oninput="CMP.set('${w}','${k}',this.value)" onwheel="this.blur()">${u?`<em>${u}</em>`:''}</div></label>`;
function cardHtml(w){
 const o=C[w],kg=o.un=='kg';
 return `<div class="cp-card" style="--c:${COL[w]}" id="cp-c-${w}"><div class="cp-ch">${dot(w)}<b>제품 ${LAB[w]} <small>${w=='a'?'(기준)':'(비교)'}</small></b><button type="button" class="cp-lk" onclick="CMP.clr('${w}')">비우기</button></div>
 <div class="cp-pk"><label class="cp-f"><span>제품명 <small>(입력하면 제품 DB 목록 표시)</small></span><input class="cp-in" id="cp-n-${w}" type="text" autocomplete="off" placeholder="제품명 검색 또는 직접 입력" value="${E(o.n)}" oninput="CMP.nm('${w}',this.value)" onfocus="CMP.nm('${w}',this.value,1)"></label><div class="cp-l" id="cp-l-${w}" hidden></div></div>
 <div class="cp-g2">${num(w,'svr','SVR (고형분 용적비)','예: 60','%')}${num(w,'dft','추천 도막 (DFT)','예: 100','㎛')}</div>
 <div class="cp-g2">${num(w,'pk','혼합규격 (1말)','예: 18',o.un)}<label class="cp-f"><span>규격 단위</span><select class="cp-in" onchange="CMP.unit('${w}',this.value)"><option value="L"${kg?'':' selected'}>L (리터)</option><option value="kg"${kg?' selected':''}>kg</option></select></label></div>
 ${kg?`<div class="cp-g2">${num(w,'sg','비중 (kg/L)','예: 1.45','')}<div></div></div>`:''}
 ${num(w,'price','말당 단가 (혼합규격 1말 기준)','예: 250,000 → 250000','원')}
 <details class="cp-dt"${OPEN[w]?' open':''} ontoggle="CMP.opn('${w}',this.open)"><summary>건조시간 · VOC · 인증 (선택 입력)</summary><div class="cp-g2">${num(w,'touch','지촉건조','예: 120','분')}${num(w,'hard','경화건조','예: 16','시간')}</div><div class="cp-g2">${num(w,'voc','VOC 함량','예: 270','g/L')}<label class="cp-ck"><input type="checkbox" ${o.eco?'checked':''} onchange="CMP.eco('${w}',this.checked)"><i></i><span>친환경 인증 있음</span></label></div></details></div>`;
}
function savedHtml(){
 return `<div class="cp-sv-row"><select class="cp-in" onchange="CMP.load(this.value)"><option value="-1">저장된 비교 ${SAVED.length?'('+SAVED.length+')':'없음'}</option>${SAVED.map((s,i)=>`<option value="${i}"${i==C.cur?' selected':''}>${E(s.name)}</option>`).join('')}</select><button type="button" class="cp-bt s" onclick="CMP.save()">저장</button><button type="button" class="cp-bt" onclick="CMP.del()"${C.cur<0?' disabled':''}>삭제</button></div>`;
}
function render(){
 const e=Q('#v10');if(!e)return;
 if(e.querySelector('#cpf')){try{e.querySelector('#cpf').contentWindow.CMPAPP.refresh()}catch(x){}return}
 e.innerHTML='<iframe id="cpf" src="compare.html" title="제품 비교" style="display:block;width:100%;height:calc(100dvh - 170px);min-height:560px;border:0;border-radius:14px;background:#f3f4f6"></iframe>';return;
 if(!INIT){INIT=1;try{if(!(+C.area>0)&&+S.area>0)C.area=S.area}catch(x){}}
 e.innerHTML=`<div class="cp">
 <div class="cp-hero"><b>제품 비교 · 분석</b><small>두 제품의 소요량·자재비·건조시간을 같은 조건에서 비교해 우위 제품을 보여 줍니다. 제조사는 표시하지 않습니다.</small></div>
 <section class="cp-s">${savedHtml()}</section>
 <section class="cp-s"><h3>01 비교 제품</h3>${cardHtml('a')}<div class="cp-swap"><button type="button" class="cp-bt" onclick="CMP.swap()">⇅ A ↔ B 바꾸기</button></div>${cardHtml('b')}</section>
 <section class="cp-s"><h3>02 비교 조건</h3><div class="cp-card"><div class="cp-seg"><button type="button" class="${C.mode=='same'?'on':''}" onclick="CMP.mode('same')">동일 도막 기준</button><button type="button" class="${C.mode=='own'?'on':''}" onclick="CMP.mode('own')">제품별 추천 도막</button></div>
  <div class="cp-g2">${condNum('area','도장 면적','예: 10000','㎡')}${condNum('dft','목표 도막 (DFT)','예: 100','㎛')}</div><div class="cp-g2">${condNum('loss','Loss (손실률)','예: 10','%')}<div></div></div>
  <small class="cp-note">이론 도포율 = SVR × 10 ÷ DFT [㎡/L] · 실제 소요량 = 이론 소요량 ÷ (1 − Loss%) · 총 소요량 = 면적 × 실제 소요량</small></div></section>
 <section class="cp-s"><h3>03 비교 결과</h3><div id="cp-res">${resHtml()}</div></section>
 <section class="cp-s"><div class="cp-ex"><button type="button" class="cp-bt s" onclick="CMP.img()">이미지로 저장</button><button type="button" class="cp-bt" onclick="CMP.reset()">전체 초기화</button></div>
 <div class="cp-warn">본 자료는 참고용이며 현장 조건에 따라 실제 사용량·비용은 달라질 수 있습니다. 시공 전 제조사 최신 기술자료(TDS)를 확인하세요. 활용에 따른 판단과 책임은 사용자에게 있습니다.</div></section></div>`;
}
const condNum=(k,l,ph,u)=>`<label class="cp-f"><span>${l}</span><div class="cp-iw"><input class="cp-in" type="number" inputmode="decimal" step="any" placeholder="${ph}" value="${E(C[k])}" oninput="CMP.cond('${k}',this.value)" onwheel="this.blur()"><em>${u}</em></div></label>`;
function upd(){store();const r=Q('#cp-res');if(r)r.innerHTML=resHtml()}

/* ---------- 제품 DB 검색 ---------- */
function suggest(w,q,force){
 const l=Q('#cp-l-'+w);if(!l)return;const k=norm(q);
 if(!k&&!force){l.hidden=true;return}
 const D=dbl(),res=[];
 for(let i=0;i<D.length&&res.length<400;i++){const p=D[i];if(!p||!p.n)continue;const h=norm([p.n,p.g,p.us,p.mf,p.d].join(' '));if(!k||h.includes(k))res.push([i,p,k&&norm(p.n).startsWith(k)?0:1])}
 res.sort((x,y)=>x[2]-y[2]);const L=res.slice(0,30);
 if(!L.length){l.innerHTML=`<div class="cp-nl">${D.length?'일치하는 제품이 없습니다 · 값을 직접 입력하세요':'제품 DB가 비어 있습니다 · 값을 직접 입력하세요'}</div>`;l.hidden=false;return}
 l.innerHTML=L.map(([i,p])=>`<button type="button" class="cp-it" onclick="CMP.pick('${w}',${i})"><b>${E(clean(p))}</b><small>${E([p.g||p.us||'',+p.svr?'SVR '+p.svr+'%':'',+p.dft?p.dft+'㎛':''].filter(Boolean).join(' · '))}</small></button>`).join('')+(res.length>30?`<div class="cp-nl">상위 30개 표시 · 검색어를 더 입력하세요</div>`:'');
 l.hidden=false;
}
document.addEventListener('click',e=>{if(e.target.closest&&!e.target.closest('.cp-pk'))document.querySelectorAll('.cp-l').forEach(l=>l.hidden=true)});

/* ---------- 외부 인터페이스 ---------- */
const API={
 nm(w,v,force){C[w].n=v;suggest(w,v,force);upd()},
 pick(w,i){const p=dbl()[i];if(!p)return;const o=C[w];o.n=clean(p);o.svr=+p.svr||'';o.dft=+p.dft||'';o.un=/kg|㎏/i.test(p.un||'')?'kg':'L';o.sg=+p.sg||'';o.pk=+p.mk||+p.pk||'';
  if(w=='a'&&+p.dft&&!C.dftSet)C.dft=+p.dft;store();render()},
 set(w,k,v){C[w][k]=v;upd()},
 cond(k,v){C[k]=v;if(k=='dft')C.dftSet=1;upd()},
 unit(w,v){C[w].un=v;store();render()},
 eco(w,v){C[w].eco=v?1:0;upd()},
 txt(w,k,v){C[w][k]=v;store()},
 opn(w,v){OPEN[w]=v?1:0},
 mode(m){C.mode=m;store();render()},
 tab(t){C.tab=t;store();upd()},
 clr(w){C[w]=blank();store();render()},
 swap(){const t=C.a;C.a=C.b;C.b=t;store();render()},
 save(){const a=(C.a.n||'').trim(),b=(C.b.n||'').trim();if(!a&&!b)return toast('저장할 제품 정보를 먼저 입력하세요');
  const name=((a||'제품 A')+' vs '+(b||'제품 B')).slice(0,60),rec={name,a:{...C.a},b:{...C.b},area:C.area,dft:C.dft,loss:C.loss,mode:C.mode,dftSet:C.dftSet};
  const j=SAVED.findIndex(s=>s.name==name);if(j>=0)SAVED[j]=rec;else SAVED.unshift(rec);C.cur=SAVED.findIndex(s=>s.name==name);storeList();store();render();toast('비교를 저장했습니다<br><small>'+E(name)+'</small>')},
 load(i){i=+i;if(i<0||!SAVED[i]){C.cur=-1;store();render();return}const s=SAVED[i];C={...C,a:{...blank(),...s.a},b:{...blank(),...s.b},area:s.area,dft:s.dft,loss:s.loss,mode:s.mode||'same',dftSet:s.dftSet||0,cur:i};store();render()},
 del(){const i=C.cur;if(i<0||!SAVED[i])return;ask('저장된 비교를 삭제할까요?<br><small>'+E(SAVED[i].name)+'</small>',()=>{SAVED.splice(i,1);C.cur=-1;storeList();store();render()})},
 reset(){ask('입력한 비교 내용을 모두 지울까요?<br><small>저장된 비교 목록은 유지됩니다</small>',()=>{C={...C,a:blank(),b:blank(),area:'',dft:100,loss:10,dftSet:0,mode:'same',cur:-1,tab:'spec'};INIT=0;store();render()})},
 async img(){
  try{
   await ldp();
   const box=document.createElement('div');box.style.cssText='position:fixed;left:-9999px;top:0;width:560px';box.innerHTML='<div class="cp cpx">'+reportHtml()+'</div>';document.body.append(box);
   await new Promise(r=>setTimeout(r,60));
   const el=box.firstChild,cv=await html2canvas(el,{scale:2,backgroundColor:'#f1f6fd',windowWidth:560,scrollX:0,scrollY:0});box.remove();
   const d=new Date(),nm='제품비교_'+d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'.png';
   cv.toBlob(b=>{if(!b)return toast('이미지를 만들지 못했습니다');dl(b,nm);toast('이미지를 저장했습니다')},'image/png');
  }catch(e){try{document.querySelectorAll('body>div[style*="-9999px"]').forEach(x=>x.remove())}catch(x){}toast('이미지를 만들지 못했습니다<br><small>네트워크 연결 후 다시 시도하세요</small>')}
 },
 report:reportHtml,render
};
window.CMP=API;
window.cmpRender=render;
})();
