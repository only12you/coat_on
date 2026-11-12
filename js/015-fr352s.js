(function(){
const NS='fr352',n=v=>{v=parseFloat(String(v==null?'':v).replace(/,/g,''));return isFinite(v)?v:0};
const FR=[
 {k:'1003',nm:'SQ-1003',sub:'내화 1시간',tm:'1시간',dft:0.65,th:1.00,cnt:'1회 이상'},
 {k:'2003',nm:'SQ-2003',sub:'기둥 · 내화 2시간',tm:'2시간',dft:2.45,th:3.60,cnt:'3회 이상'},
 {k:'2007',nm:'SQ-2007',sub:'보 · 내화 2시간',tm:'2시간',dft:2.80,th:4.12,cnt:'4회 이상'}];
const LAB={'1003':[['유성내화 3코트 · 1시간 기둥·보',0.086]],'2003':[['조합페인트 마감 · 기둥 2시간',0.172],['폴리우레탄 마감 · 기둥 2시간',0.13]],'2007':[['조합페인트 마감 · 보 2시간',0.174],['폴리우레탄 마감 · 보 2시간',0.152]]};
const ld=()=>{try{return JSON.parse(LS[NS]||'{}')||{}}catch(e){return {}}},sv=o=>{try{LS[NS]=JSON.stringify(o)}catch(e){}};
let st=Object.assign({k:'1003',A:'',loss:'',lp:'',ln:''},ld());
const cur=()=>FR.find(x=>x.k==st.k)||FR[0];
function calcR(){const f=cur(),A=n(st.A),th=A*f.th,loss=n(st.loss),real=loss>0&&loss<100?th/(1-loss/100):th;
 let lab=null;const lp=n(st.lp),ln=n(st.ln);if(A>0&&(lp>0||ln>0)&&typeof lbCalc=='function'){lab=lbCalc({lmd:'A',lp:lp,ln:ln},A)}
 return{f,A,th,real,loss,lab}}
function out(){const r=calcR(),F2=(x,d)=>F(+x.toFixed(d),d);
 return `<div class="frk"><div><small>이론 소요량</small><b>${r.A>0?F2(r.th,1):'-'}<i>L</i></b></div><div><small>${r.loss>0?'실제 소요량(Loss '+F2(r.loss,1)+'%)':'실제 소요량'}</small><b>${r.A>0&&r.loss>0?F2(r.real,1):'-'}<i>L</i></b></div><div><small>노무비</small><b>${r.lab?F(r.lab.tot,0):'-'}<i>원</i></b></div></div>${r.lab?`<div class="frn">도장공 ${F2(r.lab.qp,2)}인 · 보통인부 ${F2(r.lab.qn,2)}인${r.lab.tool>0?' · 공구손료 포함':''}</div>`:'<div class="frn">도장공 품(위 참고값 선택 또는 직접 입력)을 넣으면 노무비가 계산됩니다</div>'}`}
function body(){const f=cur(),chip=x=>`<button type="button" class="${x.k==st.k?'on':''}" onclick="frPick('${x.k}')"><b>${x.nm}</b><small>${x.sub}</small></button>`;
 const inp=(l,k,u,ph)=>`<label class="frf"><span>${l}</span><div><input type="number" inputmode="decimal" step="any" value="${st[k]==null?'':st[k]}" placeholder="${ph||''}" oninput="frSet('${k}',this.value)" onwheel="this.blur()"><em>${u}</em></div></label>`;
 return `<div class="pqmh"><b>내화도료 품셈 기준 (KCC)</b></div>
 <div class="frc">${FR.map(chip).join('')}</div>
 <div class="frt"><div><span>내화시간</span><b>${f.tm}</b></div><div><span>중도 건조도막</span><b>${f.dft.toFixed(2)}mm</b></div><div><span>중도 이론 소요량</span><b>${f.th.toFixed(2)}L/㎡</b></div><div><span>최소 도장 횟수</span><b>${f.cnt}</b></div><div class="w"><span>시공방법</span><b>에어리스 스프레이</b></div></div>
 <div style="margin:8px 0"><b style="font-size:12.5px">도장공 품 · 시공사 일위대가 참고값</b><div class="frc" style="margin-top:6px">${(LAB[f.k]||[]).map((x,i)=>`<button type="button" class="${n(st.lp)==x[1]?'on':''}" onclick="frLab(${i})"><b>${x[1]}인/㎡</b><small>${x[0]}</small></button>`).join('')}</div><div class="frn" style="margin-top:6px">대신산업 일위대가 기준(도장공 노임 141,733원) · 하도·중도·상도 전 공정 포함 · 보통인부 항목 없음 · 공구손료 5%</div></div>
 <div class="frg">${inp('도장 면적','A','㎡','0')}${inp('Loss (선택)','loss','%','0')}${inp('도장공 투입량','lp','인/㎡','현장 실적')}${inp('보통인부 투입량','ln','인/㎡','현장 실적')}</div>
 <div id="frout">${out()}</div>
 <div class="frw"><b>참고 · 산출 근거</b><ul><li>위 소요량은 <b>중도 이론값</b>입니다. 현장 손실, 하도·상도 사용량은 별도로 계산합니다.</li><li>표준품셈 「철골 내화 피복뿜칠」은 질석계 습식 시공 기준이라 발포성 내화도료 에어리스 시공에 <b>그대로 적용할 수 없습니다</b>.</li><li><b>도장공 품</b>은 공개된 시공사 일위대가(대신산업)의 값을 <b>참고용</b>으로만 제공합니다. 표준품셈의 공식 값이 아니며 사용 제품 · 도장 횟수 · 도막 두께가 다르면 달라집니다. 선택하지 않으면 비어 있습니다.</li><li><b>보통인부</b>는 도장공 품을 대신하지 않습니다. 자재 운반 · 정리 등 <b>별도 보조 작업이 내역에 있을 때만</b> 실제 작업량 기준으로 입력하고, 없으면 비워서 중복 산정을 피하세요. (0.04~0.08인 범위는 원문 확인 전이라 자동 입력하지 않습니다)</li><li>일위대가의 노무비(1시간 12,189원/㎡)는 노임 141,733원 기준입니다. 이 앱은 노무비 설정의 노임단가로 계산하므로 금액이 아니라 <b>품(인/㎡)</b>을 비교하세요. 공구손료 5%는 노무비 설정에서 입력합니다.</li><li>이 일위대가는 유성 내화(플레임체크) + 징크 하도 + 마감 구성이라 위 KCC 제품(SQ)과 제품이 다릅니다. KCC 제품의 도막은 이보다 얇아(1시간 0.65 vs 0.7mm, 기둥 2.45 vs 2.65mm, 보 2.80 vs 3.3mm) 실제 품은 달라질 수 있으니 현장 실적으로 보정하세요.</li></ul></div>
 <div class="pqbr"><button class="pqbc" onclick="frApply()">일위대가표 노무 기준에 적용</button><button class="pqbc ok" onclick="pqX('pqfr')">완료</button></div>`}
window.frOpen=function(){pqSheet('pqfr',body())};
window.frPick=k=>{st.k=k;sv(st);frOpen()};
window.frLab=i=>{const x=(LAB[st.k]||[])[i];if(!x)return;st.lp=String(x[1]);const nl=!n(st.loss);if(nl)st.loss='30';sv(st);frOpen();tt('도장공 '+x[1]+'인/㎡ 참고값을 넣었습니다'+(nl?'<br><small>Loss 30% 입력 (일위대가: 실제 = 이론 ÷ 0.7)</small>':''))};
window.frSet=(k,v)=>{st[k]=v;sv(st);const o=document.getElementById('frout');if(o)o.innerHTML=out()};
window.frApply=()=>{const lp=n(st.lp),ln=n(st.ln);if(!(lp>0||ln>0))return tt('도장공·보통인부 인/㎡를 먼저 입력하세요<br><small>위 참고값을 선택하거나 직접 입력하세요</small>');
 S.lab=S.lab||{};S.lab.lmd='A';S.lab.lp=String(lp||'');S.lab.ln=String(ln||'');try{sv()}catch(e){}try{cards()}catch(e){}pqX('pqfr');tt('일위대가표 노무 기준에 적용했습니다<br><small>'+cur().nm+' · 도장공 '+lp+' / 보통인부 '+ln+' 인/㎡</small>')};
const ol=window.lbSheet;
if(typeof ol=='function')window.lbSheet=function(){ol.apply(this,arguments);const e=document.getElementById('pqlab');if(!e)return;const b=e.querySelector('.pqg2');if(!b||e.querySelector('.frgo'))return;const g=document.createElement('button');g.type='button';g.className='pqbc frgo';g.textContent='도장 품셈 · 노무비 산출';g.onclick=()=>{pqX('pqlab');frOpen()};b.insertBefore(g,b.firstChild)};
})();
