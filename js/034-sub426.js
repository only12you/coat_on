/* 부자재(메쉬·실란트) 소요량 → 일위대가표 행으로 합산 (v426) */
(function(){
const SB=()=>{S.sb=S.sb||{};return S.sb};
const isEpF=p=>{if(!p)return false;const t=[p.n,p.g,p.d,p.us,p.mf].join(' ');return /내화|fire\s?mask|파이어\s?마스크/i.test(t)&&/에폭시|epoxy|fire\s?mask|파이어\s?마스크/i.test(t)};
const epC=()=>S.coats.map((c,i)=>({c,i,p:P(c.n)})).filter(x=>x.p&&isEpF(x.p));
const meshOn=()=>{const s=SB();return s.mesh===1||(s.mesh===undefined&&epC().length>0)};
const sealOn=()=>SB().seal===1;
const f=(x,d=1)=>(+x||0).toLocaleString('ko-KR',{maximumFractionDigits:d});
window.subRows=function(){const R=[];try{
 if(meshOn()){const M=FM.mesh,c=cM();if(c.A>0){
  const ur=c.rolls>0&&(M.pu=='롤'||+M.rp>0),pr=ur?(+M.rp>0?+M.rp:(M.pu=='롤'?+M.price||0:0)):(M.pu=='롤'?0:+M.price||0);
  R.push({k:'mesh',n:'내화 메쉬 · '+(M.name||'메쉬'),s:ur?`1롤 (${f(M.wr,2)}m×${f(M.lr,0)}m)`:'㎡',q:ur?c.rolls:+c.At.toFixed(2),p:pr,u:ur?'롤':'㎡',m:`소요 ${f(c.A,2)}㎡ · 로스 ${M.loss}% 포함 ${f(c.At,2)}㎡`})}}
 if(sealOn()){const c=cF();if(c.n>0){
  R.push({k:'seal',n:(FM.pname||'실란트'),s:`1개 (${f(FM.pk,2)}${FM.pu}${FM.pn?' '+FM.pn:''})`,q:c.n,p:+FM.price||0,u:'개',m:`충진 ${f(c.Vt/1000,2)}L (로스 포함)`});
  if(FM.mode=='j'&&c.rod>0){const a=Math.ceil(c.rod*1.05),b=Math.ceil(c.tape*1.05);R.push({k:'rod',n:'└ 백업재',s:'m',q:a,p:+FM.rodp||0,u:'m',m:''});if(b>0)R.push({k:'tape',n:'└ 보호(마스킹) 테이프',s:'m',q:b,p:+FM.tapep||0,u:'m',m:''})}}}
}catch(e){}return R};
function sum(){const R=subRows(),el=id=>document.getElementById(id);
 const m=R.find(r=>r.k=='mesh'),s=R.find(r=>r.k=='seal');
 const a=el('sbm_s');if(a&&m)a.innerHTML=`<div>소요 면적<b>${f(FM.mesh&&cM().A,2)}㎡</b></div><div>수량<b>${f(m.q)} ${m.u}</b></div><div>금액<b>${m.p>0?f(Math.round(m.q*m.p),0)+'원':'-'}</b></div>`;
 const b=el('sbs_s');if(b&&s){const t=R.filter(r=>r.k!='mesh').reduce((z,r)=>z+Math.round(r.q*r.p),0);b.innerHTML=`<div>충진량<b>${f(cF().Vt/1000,2)}L</b></div><div>수량<b>${f(s.q)} ${s.u}</b></div><div>금액<b>${t>0?f(t,0)+'원':'-'}</b></div>`}}
window.sbSet=function(k,on){SB()[k]=on?1:0;sv();ui();res()};
window.sbGo=function(w){FM.tab=w;fmSave();T(8)};
window.sbMs=function(k,v){fmMs(k,v);res();sum()};
window.sbFs=function(k,v){fmSet(k,v);res();sum()};
function ui(){const cs=document.getElementById('cs');if(!cs)return;let e=document.getElementById('sbx');if(!e){e=document.createElement('div');e.id='sbx';cs.insertAdjacentElement('afterend',e)}
 /* 코트 카드 배지 */
 document.querySelectorAll('#cs .cc .mhint').forEach(x=>x.remove());
 const ep=epC(),cards=document.querySelectorAll('#cs .cc');
 if(meshOn())ep.forEach(x=>{const h=cards[x.i]&&cards[x.i].querySelector('.chn');if(h)h.insertAdjacentHTML('beforeend','<span class="mhint">+ 메쉬</span>')});
 if(!S.coats.some(c=>c&&c.n)&&!meshOn()&&!sealOn()&&SB().mesh===undefined&&SB().seal===undefined){/* 제품 미선택이어도 수동 추가 가능하도록 카드는 유지 */}
 try{const a=document.activeElement;if(a&&a.tagName=='INPUT'&&a.type!='checkbox'&&e.contains(a)&&e.firstChild){sum();return}}catch(_){}
 const M=FM.mesh,mo=meshOn(),so=sealOn(),auto=SB().mesh===undefined&&ep.length>0,mc=cM();
 const dft=ep.length?(ev(ep[0].c,ep[0].p).dft||0):0;
 const seq=`<details class=sbd><summary>메쉬 설치 순서 (KCC NEXWEB Mesh 기준)</summary>① 하도 도포 후 충분히 건조 → ② 중도(FIREMASK 3500 등)를 <b>인정 도막두께의 약 ½</b>로 도장${dft?` (예: ${f(dft)}㎛ → 1차 약 ${f(dft/2)}㎛)`:''} → ③ 도료가 건조되기 전에 메쉬를 설치하고 롤러로 완전 밀착 (메쉬는 Flange 크기에 맞춰 미리 절단) → ④ 고화건조 후 오염되기 전에 <b>인정 도막두께 이상</b>이 되도록 후속 도장.<br>※ NEXWEB Mesh 기본값: Ceramic/Glass fiber 교차 구조, 40g/㎡, 폭 1.0m, 1롤 150㎡(1.0m×150m). 메쉬 화면에서 수정할 수 있습니다. 중도는 두 번에 나눠 바르지만 <b>총 도막두께는 같아 도료 소요량은 변하지 않고</b>, 메쉬는 별도 자재로 추가됩니다.</details>`;
 e.innerHTML=`<div class=sbc><div class=sbh><b>부자재 소요량</b><small>메쉬 · 실란트 — 일위대가표 행으로 합산</small></div>
 <div class=sbi><label class=sbt><input type=checkbox ${mo?'checked':''} onchange="sbSet('mesh',this.checked)"><b>내화 메쉬</b>${auto&&mo?'<em>에폭시 내화 선택 · 자동</em>':''}</label>
 ${mo?`${mc.A>0?`<div class=sbg id=sbm_s></div>`:`<div class=sbw>메쉬 소요 면적이 아직 없습니다. 아래 버튼에서 형강 부위를 선택하거나 일반·수기로 입력하세요.</div>`}
 <div class=sbp><span>롤 단가</span><input type=number inputmode=decimal value="${M.rp||''}" placeholder="롤당 가격" oninput="sbMs('rp',this.value)"><b>원/롤</b></div>
 ${mc.warn?`<div class=sbw>${mc.warn}</div>`:''}
 <button class=sbb onclick="sbGo('mesh')">메쉬 설정 (형강 · 일반/수기 · 롤 규격) ›</button>${seq}`:`<div class=sbn>${ep.length?'에폭시 내화 제품이 선택되어 있습니다. 메쉬가 필요하면 체크하세요.':'에폭시 내화 제품(예: FIREMASK 3500)을 선택하면 메쉬가 자동으로 포함됩니다. 직접 넣으려면 체크하세요.'}</div>`}</div>
 <div class=sbi><label class=sbt><input type=checkbox ${so?'checked':''} onchange="sbSet('seal',this.checked)"><b>실란트 · 충진재</b></label>
 ${so?`${cF().n>0?`<div class=sbg id=sbs_s></div>`:`<div class=sbw>충진 부위(폭·깊이·길이)가 아직 입력되지 않았습니다. 아래 버튼에서 입력하세요.</div>`}
 <div class=sbp><span>1개 단가</span><input type=number inputmode=decimal value="${FM.price||''}" placeholder="카트리지·소시지 1개 가격" oninput="sbFs('price',this.value)"><b>원</b></div>
 <button class=sbb onclick="sbGo('fill')">제품 · 단면 · 충진 부위 설정 ›</button>`:`<div class=sbn>줄눈·코킹 등 실란트 충진이 견적에 포함되면 체크하세요.</div>`}</div>
 <div class=sbn>금액은 아래 「소요량 계산 결과」 총 금액, 「세부 내역」, 견적서에 함께 반영됩니다.</div></div>`;
 sum()}
const _res=res;res=function(){_res.apply(this,arguments);try{ui()}catch(e){}};
setTimeout(()=>{try{res()}catch(e){}},0);
})();
