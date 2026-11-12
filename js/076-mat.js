/* v593p7 자재정보(건재·도료) — Activity Report 연동. 저장: LS.mat (기존 저장소와 분리) */
(function(){
const BIG={b:{'내·외장재':['G/S','G/T','M/T','기타','상품'],'보온재':['G/W','M/W','기타','상품'],'창호':['기타']},
 p:{'건축':['수성','유성','에폭시','우레탄','내화','기타'],'플랜트':['에폭시','우레탄','내열','방식','기타'],'일반공업':['에폭시','우레탄','아크릴','기타'],'기타':[]}};
const UNITS=['㎡','m','EA','kg','L','식'],COATS=['1st','2nd','3rd','4th','5th'];
const AR={'내·외장재':'내외장재'};
const arKey=(k,it)=>{ // Activity Report 자재 행 (g,i)
 if(k=='b')return {g:AR[it.big]||it.big,i:it.big=='창호'?'':it.mid};
 if(it.big=='건축'){if(it.mid=='수성')return{g:'유통도료',i:'수성'};if(it.mid=='에폭시')return{g:'유통도료',i:'에폭시'};if(it.mid=='내화')return{g:'유통도료',i:'내화도료'};return{g:'상품',i:''}}
 if(it.big=='플랜트')return{g:'유통도료',i:'플랜트'};if(it.big=='일반공업')return{g:'공업도료',i:'일반공업'};return{g:'상품',i:''}};
let M,TAB='b',BG={b:'내·외장재',p:'건축'},FL={b:'',p:''},EL=null;
const DEF=()=>({sp:'',n:3,b:[],p:[]});
const load=()=>{let o;try{o=JSON.parse(LS.mat||'null')}catch(e){}M=Object.assign(DEF(),o||{});M.b=M.b||[];M.p=M.p||[]};
const save=()=>{try{LS.mat=JSON.stringify(M)}catch(e){}};
const num=v=>parseFloat(String(v==null?'':v).replace(/,/g,''))||0;
const fm=(v,d)=>F(v,d==null?0:d);
function pc(it){ // 도료 이론 소요량
 const a=num(it.area);if(!(a>0)||!it.name)return null;
 let p;try{p=PX(it.name)}catch(e){}if(!p)return null;
 let r;try{r=calc({n:it.name,price:num(it.price)})}catch(e){}if(!r||!r[0]||r[0].nc)return null;
 const x=r[0],u=(typeof UN=='function'?UN(p):p.un)=='kg'?'kg':'L';
 return{th:x.th*a,ac:x.ac*a,pk:x.pk,u,perm:x.th}}
function calcB(it){const q=num(it.qty),p=num(it.price);return{q,u:it.unit||'㎡',amt:Math.round(q*p)}}
function calcP(it){const c=pc(it),pr=num(it.price);if(c)return{q:c.th,u:c.u,amt:Math.round(c.th/c.pk*pr),c};const q=num(it.qty);return{q,u:it.unit||'L',amt:Math.round(q*pr),c:null}}
function totals(){const tb=M.b.reduce((s,i)=>s+calcB(i).amt,0),tp=M.p.reduce((s,i)=>s+calcP(i).amt,0);return{tb,tp,t:tb+tp}}
/* ---- 화면 ---- */
const opt=(a,v)=>a.map(x=>`<option${x==v?' selected':''}>${esc(x)}</option>`).join('');
function cardB(it,i){const c=calcB(it);return `<div class="mtc" data-k="b${i}"><div class="mtch"><b>${i+1}</b><select onchange="matSet('b',${i},'mid',this.value,1)">${opt(BIG.b[it.big]||[],it.mid)}</select><button class="mtx" onclick="matDel('b',${i})" aria-label="삭제">✕</button></div>
<label class="mtf w2"><span>실제 적용 제품</span><input value="${esc(it.name||'')}" placeholder="제품명 입력" oninput="matSet('b',${i},'name',this.value)"></label>
<div class="mtg"><label class="mtf"><span>물량(면적)</span><input inputmode="decimal" value="${esc(it.qty||'')}" oninput="matSet('b',${i},'qty',this.value)"></label><label class="mtf"><span>단위</span><select onchange="matSet('b',${i},'unit',this.value)">${opt(UNITS,it.unit||'㎡')}</select></label><label class="mtf"><span>단가(원/단위)</span><input inputmode="decimal" value="${esc(it.price||'')}" oninput="matSet('b',${i},'price',this.value)"></label></div>
<div class="mta">금액 <b data-am>${fm(c.amt)}</b>원</div></div>`}
function cardP(it,i){const c=calcP(it);const own=it.big=='기타';
 return `<div class="mtc" data-k="p${i}"><div class="mtch"><b class="mtcn">${esc(COATS[it.coat||0]||'1st')}</b><select onchange="matSet('p',${i},'coat',+this.value,1)">${COATS.map((x,k)=>`<option value="${k}"${k==(it.coat||0)?' selected':''}>Coat ${x}</option>`).join('')}</select>${own?`<input class="mtmi" placeholder="중유형(직접)" value="${esc(it.mid||'')}" oninput="matSet('p',${i},'mid',this.value)"><input class="mtmi" placeholder="소유형(직접)" value="${esc(it.small||'')}" oninput="matSet('p',${i},'small',this.value)">`:`<select onchange="matSet('p',${i},'mid',this.value,1)">${opt(BIG.p[it.big]||[],it.mid)}</select>`}<button class="mtx" onclick="matDel('p',${i})" aria-label="삭제">✕</button></div>
<label class="mtf w2"><span>적용 제품 (제품 DB 선택 또는 직접 입력)</span><input list="mtdl" value="${esc(it.name||'')}" placeholder="제품명" oninput="matSet('p',${i},'name',this.value)" onchange="matSet('p',${i},'name',this.value,0,1)"></label>
<div class="mtg"><label class="mtf"><span>적용 면적(㎡)</span><input inputmode="decimal" value="${esc(it.area||'')}" oninput="matSet('p',${i},'area',this.value)"></label><label class="mtf"><span data-pl>${c.c?'단가(원/말)':'단가(원/단위)'}</span><input inputmode="decimal" value="${esc(it.price||'')}" oninput="matSet('p',${i},'price',this.value)"></label><label class="mtf" data-mq${c.c?' hidden':''}><span>수량 직접입력</span><input inputmode="decimal" value="${esc(it.qty||'')}" oninput="matSet('p',${i},'qty',this.value)"></label></div>
<div class="mta"><span data-th>${thTxt(c)}</span>금액 <b data-am>${fm(c.amt)}</b>원</div></div>`}
function thTxt(c){return c.c?`이론 ${fm(c.c.th,1)}${c.c.u} (실제 ${fm(c.c.ac,1)}${c.c.u}) · ${fm(c.c.th/c.c.pk,1)}말`:'제품 DB에 없거나 SVR 없음 → 수량 직접입력'}
function summary(){const T=totals();const row=(k,it,n,a,u,q)=>`<div class="mtr"><span>${k}</span><span>${esc(it.name||'-')}</span><span>${n}</span><span>${a}</span></div>`;
 const rb=M.b.map(it=>{const c=calcB(it);return `<div class="mtr"><span>건재 · ${esc(it.big)}${it.mid?' '+esc(it.mid):''}</span><span>${esc(it.name||'-')}</span><span>${fm(c.q,1)}${esc(c.u)}</span><span>${fm(c.amt)}</span></div>`}).join('');
 const rp=M.p.map(it=>{const c=calcP(it);return `<div class="mtr"><span>도료 · ${esc(COATS[it.coat||0])} ${esc(it.big)}${it.mid?' '+esc(it.mid):''}</span><span>${esc(it.name||'-')}</span><span>${fm(c.q,1)}${esc(c.u)}</span><span>${fm(c.amt)}</span></div>`}).join('');
 return `<div class="mtr h"><span>구분</span><span>제품 / 사양</span><span>물량</span><span>금액(원)</span></div>${rb+rp||'<div class="mtr none">입력한 자재가 없습니다</div>'}<div class="mtr t"><span>건재 합계</span><span></span><span></span><span>${fm(T.tb)}</span></div><div class="mtr t"><span>도료 합계</span><span></span><span></span><span>${fm(T.tp)}</span></div><div class="mtr t g"><span>총 합계 (VAT 별도)</span><span></span><span></span><span>${fm(T.t)}</span></div>`}
function render(){const e=EL;if(!e)return;const k=TAB,big=BG[k],mids=BIG[k][big]||[],lst=(k=='b'?M.b:M.p).map((it,i)=>({it,i})).filter(o=>o.it.big==big&&(!FL[k]||o.it.mid==FL[k]));
 const dl=(()=>{try{return DB.map(p=>`<option value="${esc(p.n)}">`).join('')}catch(x){return ''}})();
 e.querySelector('.mtb').innerHTML=`<div class="mtbx"><div class="mth2"><span class="mtic">${k=='b'?'🏢':'🎨'}</span><b>${k=='b'?'건재':'도료'}</b></div>
<div class="mtbg">${Object.keys(BIG[k]).map(x=>`<button class="${x==big?'on':''}" onclick="matBig('${x}')">${x}</button>`).join('')}</div>
${mids.length?`<div class="mtmid">${mids.map(x=>`<button class="${x==FL[k]?'on':''}" onclick="matMid('${x}')">${x}</button>`).join('')}</div>`:(k=='p'?'<div class="mthint">기타 유형은 제품 카드에서 중·소유형을 직접 입력하세요</div>':'')}
<div id="mtl">${lst.map(o=>k=='b'?cardB(o.it,o.i):cardP(o.it,o.i)).join('')||'<div class="mtem">아래 버튼으로 제품을 추가하세요</div>'}</div>
<button class="mtadd" onclick="matAdd()">＋ ${k=='b'?'제품 추가':'Coat / 제품 추가'}</button></div><datalist id="mtdl">${dl}</datalist>`;
 e.querySelectorAll('.mtt button').forEach(b=>b.classList.toggle('on',b.dataset.t==k));
 e.querySelector('.mtn').innerHTML=[1,2,3,4,5].map(n=>`<button class="${n==M.n?'on':''}" onclick="matN(${n})">${n}회</button>`).join('');
 e.querySelector('.mts').innerHTML=summary()}
function open(ret){load();let e=document.getElementById('mt');if(e)e.remove();e=EL=document.createElement('div');e.id='mt';
 e.innerHTML=`<div class="mth"><button class="mtbk" onclick="matClose()" aria-label="닫기">‹</button><div><b>자재정보 선택</b><small>현장 사양과 당사 제품을 선택하세요 · ${window.COATON_BUILD||''}</small></div></div>
<div class="mtsc"><div class="mtbx mtsp"><div class="mth2"><span class="mtic">🏗</span><b>현장 사양 (현장스펙)</b></div><div class="mtspr"><label class="mtf"><span>도장 사양</span><input list="mtspl" value="${esc(M.sp)}" placeholder="예: 방수 3mm" oninput="M_sp(this.value)"><datalist id="mtspl"><option value="방수 3mm"><option value="외부 도장"><option value="내부 도장"><option value="주차장"><option value="옥상 방수"></datalist></label><div class="mtf"><span>도장 횟수 (Coat)</span><div class="mtn"></div></div></div></div>
<div class="mtt"><button data-t="b" onclick="matTab('b')">🏠 건재</button><button data-t="p" onclick="matTab('p')">🖌 도료</button></div><div class="mtb"></div>
<div class="mtbx"><div class="mth2"><span class="mtic">🧮</span><b>선택 내역 및 산출 정보</b></div><div class="mts"></div></div><div style="height:90px"></div></div>
<div class="mtbar"><button onclick="matCopy()">복사</button><button onclick="matSave(1)">저장</button><button class="ok" onclick="matSend()">Activity Report로 보내기</button></div>`;
 document.body.append(e);e.dataset.ret=ret||'';render()}
window.matOpen=open;
window.M_sp=v=>{M.sp=v;save()};
window.matClose=()=>{const e=document.getElementById('mt'),r=e&&e.dataset.ret;if(e)e.remove();EL=null;if(r=='embed'){try{parent.postMessage({coatonClose:1},'*')}catch(x){}return}if(r)location.href=r};
window.matTab=k=>{TAB=k;if(k=='p'&&!M.p.length){const big=BG.p,mid=(BIG.p[big]||[])[0]||'';for(let c=0;c<Math.min(5,M.n||1);c++)M.p.push({big,mid,small:'',coat:c,name:'',area:'',price:'',qty:'',unit:'L'});save()}render()};
window.matBig=b=>{BG[TAB]=b;FL[TAB]='';render()};
window.matMid=m=>{FL[TAB]=FL[TAB]==m?'':m;render()};
window.matN=n=>{M.n=n;save();render()};
window.matAdd=()=>{const k=TAB,big=BG[k],mid=FL[k]||(BIG[k][big]||[])[0]||'';
 if(k=='b')M.b.push({big,mid,name:'',qty:'',unit:'㎡',price:''});else{const used=M.p.filter(x=>x.big==big).length;M.p.push({big,mid,small:'',coat:Math.min(used,4),name:'',area:'',price:'',qty:'',unit:'L'})}
 save();render()};
window.matDel=(k,i)=>{(k=='b'?M.b:M.p).splice(i,1);save();render()};
window.matSet=(k,i,f,v,re,chg)=>{const it=(k=='b'?M.b:M.p)[i];if(!it)return;it[f]=v;save();if(re){render();return}
 const card=EL&&EL.querySelector(`.mtc[data-k="${k}${i}"]`);if(card){const c=k=='b'?calcB(it):calcP(it);card.querySelector('[data-am]').textContent=fm(c.amt);
  if(k=='p'){const th=card.querySelector('[data-th]');if(th)th.textContent=thTxt(c);const pl=card.querySelector('[data-pl]');if(pl)pl.textContent=c.c?'단가(원/말)':'단가(원/단위)';const mq=card.querySelector('[data-mq]');if(mq)mq.hidden=!!c.c}}
 const s=EL&&EL.querySelector('.mts');if(s)s.innerHTML=summary()};
window.matSave=t=>{save();if(t)tt('자재정보를 저장했습니다')};
/* ---- Activity Report 내보내기 ---- */
function pack(){const rows={};
 const add=(g,it,spec,q,u,amt)=>{const key=g.g+'|'+g.i,r=rows[key]=rows[key]||{g:g.g,i:g.i,names:[],q:0,u:'',amt:0};if(it.name)r.names.push(it.name);if(!r.u)r.u=u;if(r.u==u)r.q+=q;r.amt+=amt};
 M.b.forEach(it=>{const c=calcB(it);if(it.name||c.amt||c.q)add(arKey('b',it),it,'',c.q,c.u,c.amt)});
 M.p.forEach(it=>{const c=calcP(it);if(it.name||c.amt||c.q)add(arKey('p',it),it,'',c.q,c.u,c.amt)});
 return{v:1,t:Date.now(),sp:M.sp||'',n:M.n,rows:Object.values(rows).map(r=>({g:r.g,i:r.i,spec:[M.sp,r.names.join(', ')].filter(Boolean).join(' / '),qty:+r.q.toFixed(1),unit:r.u,amt:+(r.amt/1e6).toFixed(2)})),total:totals()}}
window.matPack=()=>{load();return pack()};
window.matSend=()=>{save();const o=pack();if(!o.rows.length)return tt('보낼 자재가 없습니다<br>제품을 추가하세요');try{localStorage.setItem('coaton:mat',JSON.stringify(o))}catch(e){}
 const r=EL&&EL.dataset.ret;if(r=='embed'){try{parent.postMessage({coatonMat:o},'*')}catch(x){}return}tt('Activity Report로 보냈습니다');setTimeout(()=>{if(r)location.href=r;else tt('Activity Report에서 “CoatOn 자재 불러오기”를 누르세요')},400)};
window.matCopy=async()=>{save();const t=JSON.stringify(pack());try{await navigator.clipboard.writeText(t);tt('복사했습니다<br><small>Activity Report의 “붙여넣기”에 사용하세요</small>')}catch(e){prompt('복사하세요',t)}};
/* URL 진입 */
addEventListener('load',()=>{try{const q=new URLSearchParams(location.search);if(q.get('mat')){setTimeout(()=>open(q.get('ret')||'activity.html'),900)}}catch(e){}});
})();
