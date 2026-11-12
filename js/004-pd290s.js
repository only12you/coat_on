const PDI={doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',fac:'<path d="M3 21V10l6 3V10l6 3V6h6v15z"/>',tag:'<path d="M3 12V4h8l10 10-8 8z"/><path d="M7.5 8h.01"/>',box:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',flask:'<path d="M9 3h6M10 3v6l-5 10a1.5 1.5 0 0 0 1.4 2h11.2a1.5 1.5 0 0 0 1.4-2l-5-10V3"/>',drop:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',roll:'<rect x="4" y="3" width="14" height="5" rx="1.5"/><path d="M18 5.5h2v5h-8v3M12 13.5v7"/>',clock:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',scale:'<path d="M12 4v16M5 20h14M5 8h14M5 8l-3 7a3 3 0 0 0 6 0zM19 8l-3 7a3 3 0 0 0 6 0z"/>',area:'<path d="M3 17l5-5 4 4 8-9"/><path d="M3 21h18"/>',note:'<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 17h4"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',chev:'<path d="M6 9l6 6 6-6"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',clip:'<path d="M20.5 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.8-8.8a3.3 3.3 0 0 1 4.7 4.7l-8.8 8.8a1.7 1.7 0 0 1-2.4-2.4l8-8"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.2M12 7.7v.01"/>'};
const pi=n=>`<svg class="pdis" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PDI[n]||PDI.doc}</svg>`;
const pQ=k=>document.querySelector('#pqtv [data-k="'+k+'"]'),pE=id=>document.getElementById(id);
function endSum(t,max){t=String(t||'').replace(/\s+/g,' ').trim();max=max||100;if(t.length<=max)return t;
 const ender=x=>x.replace(/(합니다|입니다|됩니다|있습니다|줍니다|나타냅니다)$/,m=>({합니다:'함',입니다:'임',됩니다:'됨',있습니다:'있음',줍니다:'줌',나타냅니다:'나타냄'}[m])).replace(/(하며|이며|되며)$/,m=>({하며:'함',이며:'임',되며:'됨'}[m]));
 const lim=max-0;let w=t.slice(0,lim),cut=-1,list=false;
 const se=[...w.matchAll(/[.。](?=\s|$)/g)].map(m=>m.index+1).filter(i=>i>=max*.4);
 if(se.length)cut=se[se.length-1];
 else{const cm=[...w.matchAll(/[,，·\/](?=\s|[가-힣A-Za-z])/g)].map(m=>m.index).filter(i=>i>=max*.4);
  if(cm.length){cut=cm[cm.length-1];list=true}
  else{const cj=[...w.matchAll(/(?:하며|이며|되며|하고|이고|되고|하여|으로|이나)\s/g)].map(m=>m.index+m[0].length-1).filter(i=>i>=max*.4);
   if(cj.length)cut=cj[cj.length-1];else{cut=w.lastIndexOf(' ');if(cut<max*.4)cut=lim;list=true}}}
 let o=t.slice(0,cut).replace(/[\s,，·\/.。]+$/,'');
 o=o.replace(/\s(?:및|과|와|또는|그리고|에|의|을|를|은|는|이|가|로|으로|에서|에게)$/,'').replace(/(?<=[가-힣])(?:및|과|와)$/,'');
 o=ender(o);
 if(!/(함|임|됨|음|다|요|등|[.])$/.test(o)){if(list||!/[가-힣]$/.test(o)||true)o=o+' 등'}
 if(o.length>max){o=o.slice(0,max-2).replace(/\s+\S*$/,'')+' 등'}
 return o.length>max?o.slice(0,max):o}
function pdSum(el){const m=+el.dataset.max||100,v=el.value;if(v.length>m){const n=endSum(v,m);el.value=n;tt&&tt('글자수('+m+'자)를 넘어 마무리 표현으로 요약했습니다')}pdSync(el)}
const pf=(ic,lab,inner,req,cls)=>`<div class="pfl${cls?' '+cls:''}"><label>${pi(ic)}<b>${lab}</b>${req?'<em>*</em>':''}</label>${inner}</div>`;
const pin=(k,v,ph,o={})=>`<div class="pbx"><input ${k.startsWith('pd_')?'id':'data-k'}="${k}" value="${esc(v)}" placeholder="${ph}"${o.num?' inputmode="decimal"':''}${o.max&&!o.sum?` maxlength="${o.max}"`:''}${o.sum?` data-max="${o.max}" onchange="pdSum(this)" onpaste="setTimeout(()=>pdSum(this),30)"`:''}${o.list?` list="${o.list}"`:''} oninput="pdSync(this)">${o.max?`<span class="pdc2">${String(v).length}/${o.max}</span>`:''}${o.suf?`<span class="pdu" ${o.sid?`id="${o.sid}"`:''}>${o.suf}</span>`:''}${o.sel||''}</div>`;
const pdOpt=(a,v)=>a.map(x=>`<option${x==v?' selected':''}>${x}</option>`).join('');
const pdParse=t=>String(t||'').split(/[;\n]/).map(x=>x.trim()).filter(Boolean).map(r=>r.split('/').map(x=>x.trim()));
const pdTn=t=>{const n=parseFloat(String(t).replace(/[^\d.\-]/g,''));return isNaN(n)?null:n};
function pdCols(p){const m=new Map([[5,[]],[20,[]],[30,[]]]);pdParse(p.dry).forEach(c=>{const t=pdTn(c[0]);m.set(t==null?c[0]:t,c.slice(1).map(x=>x=='-'?'':x))});return [...m.entries()].sort((a,b)=>(typeof a[0]=='number'?a[0]:999)-(typeof b[0]=='number'?b[0]:999)).slice(0,5).map(([t,v])=>({t,v}))}
function pdGrid(cols){const R=['지촉','고화','완전경화','재도장 최소','재도장 최대'],cl=t=>{const n=+t;return n<=12?'c1':n<=25||isNaN(n)?'c2':'c3'};
 return `<div class="pdg" style="--n:${cols.length}"><div class="pgh c0">구분</div>`+cols.map((c,i)=>`<div class="pgh ${cl(c.t)}"><input class="pdt" data-c="${i}" value="${esc(c.t)}" inputmode="decimal" oninput="pdDry()"><i>°C</i></div>`).join('')+R.map((r,j)=>`<div class="pgl">${r}</div>`+cols.map((c,i)=>`<div class="pgv"><input data-c="${i}" data-r="${j}" value="${esc(c.v[j]||'')}" placeholder="-" oninput="pdDry()"></div>`).join('')).join('')+`</div>`}
function pdCollect(){const cols=[];document.querySelectorAll('#pqtv .pdt').forEach(t=>{cols.push({t:t.value.trim(),v:[0,1,2,3,4].map(j=>{const e=document.querySelector(`#pqtv .pgv input[data-c="${t.dataset.c}"][data-r="${j}"]`);return e?e.value.trim():''})})});return cols}
function pdDry(){const out=pdCollect().filter(c=>c.t!==''&&c.v.some(x=>x)).map(c=>{const t=/^[\d.]+$/.test(c.t)?c.t+'℃':c.t;return t+'/'+c.v.map(x=>x===''?'-':/^\d+(\.\d+)?$/.test(x)?x+'시간':x).join('/')}).join(';');const h=pQ('dry');if(h)h.value=out;document.querySelectorAll('#pqtv .pgh').forEach(()=>0)}
function pdAddCol(){const c=pdCollect();if(c.length>=5)return tt('온도 열은 최대 5개입니다');c.push({t:'',v:[]});pE('pdgw').innerHTML=pdGrid(c)}
function pdArea(from){const g=k=>{const e=pQ(k);return e?+String(e.value).replace(/,/g,''):NaN},s=g('svr'),d=g('dft'),sg=g('sg'),kg=(pQ('un')||{}).value=='kg'&&sg>0,a=pE('pd_area'),u=pE('pd_asuf');if(u)u.textContent=kg?'m²/kg':'m²/L';if(from=='area'){const v=+a.value;if(s>0&&v>0)pQ('dft').value=+(s*10/(v*(kg?sg:1))*(kg?1:1)).toFixed(1)}else if(s>0&&d>0)a.value=+(s*10/d/(kg?sg:1)).toFixed(2)}
function pdTds(){const n=((pQ('n')||{}).value||'').trim(),h=n&&(TK.includes(n)||(P(n)&&P(n).url)),b=document.querySelectorAll('#pqtv .pft button');if(b.length==2){b[0].classList.toggle('on',!!h);b[1].classList.toggle('on',!h)}return !!h}
function pdAtt(){const n=((pQ('n')||{}).value||'').trim();if(!n)return tt('제품명을 먼저 입력하세요');att(n);let k=0;const t=setInterval(()=>{pdTds();if(++k>20||!pE('pqtv'))clearInterval(t)},1000)}
function pdReset(){ask('입력한 내용을 모두 지울까요?',()=>pdForm({p:{},L:null},TV.ctx))}
function pdSync(el){const k=el.dataset.k||el.id,g=x=>{const e=pQ(x);return e?+String(e.value).replace(/,/g,''):NaN};
 if(k=='pd_pack'){const m=String(el.value).match(/^\s*([\d.]+)\s*(?:[:：]\s*([\d.]+))?\s*$/);if(m){const a=+m[1],b=+(m[2]||0);pQ('pk').value=a;pQ('mk').value=+(a+b).toFixed(3)}}
 if(k=='mk'){const mk=g('mk'),pk=g('pk');if(mk>pk&&pk>0)pE('pd_pack').value=pk+' : '+(+(mk-pk).toFixed(2))}
 const mx=+el.dataset.max||(el.maxLength>0?el.maxLength:0);if(mx>0){const c=el.parentElement.querySelector('.pdc2');if(c){c.textContent=el.value.length+'/'+mx;c.style.color=el.value.length>mx?'#c9252f':''}}}
function pdForm(r,ctx){TV={r,ctx,init:{}};const p=r.p,v=k=>k=='tr'?(p.tr?+(p.tr*100).toFixed(1):''):(p[k]??''),edit=ctx.mode=='edit',un=p.un=='kg'?'kg':'L';
 const pack=+p.pk>0?(+p.mk>+p.pk?(+p.pk)+' : '+(+(p.mk-p.pk).toFixed(2)):''+(+p.pk)):'';
 const cols=pdCols(p),hasT=pdTds0(p),hid=k=>`<input type="hidden" data-k="${k}" value="${esc(v(k))}">`;
 const sec=(n,t,s,x)=>`<div class="psh"><span class="psn">${n}</span><b>${t}</b><small>${s}</small>${x||''}</div>`;
 const raw=(id,val,ph)=>`<div class="pbx"><input id="${id}" value="${esc(val)}" placeholder="${ph}"></div>`;
 const html=`<div class="pfh"><button class="pfbk" onclick="pqX('pqtv')" aria-label="뒤로">${pi('back')}</button><span class="pfhi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21H12M14 3l5 5v3M14 3v5h5M8.5 12.5h4M8.5 16.5h2.5"/>${edit?'<path d="M15.5 20.5l.6-2.4 4.2-4.2a1.2 1.2 0 0 1 1.7 1.7l-4.2 4.2z"/>':'<path d="M18 14v6M15 17h6"/>'}</svg></span><div><b>${edit?'제품 수정':'제품 추가'}</b><small>${edit?'제품 정보를 수정하세요.':ctx.mode?'새로운 제품 정보를 입력하세요.':'TDS에서 추출한 값을 확인·수정한 뒤 등록하세요.'}</small></div></div>
<div class="pfb"><div class="pfc">${sec(1,'기본 정보','제품명, 내화 시간, 마감 체계, 용도, 표면처리를 입력합니다.')}<div class="pg2">
${pf('doc','제품명',pin('n',v('n'),'제품명을 입력하세요.',{max:100}),1)}${pf('fac','제조사',pin('mf',v('mf'),'제조사를 입력하세요.',{list:'pd_mfl',sel:pi('chev')}),1)}
${pf('note','제품설명',pin('d',v('d'),'수지 · 역할 · 성능 중심 요약 (100자 이내, 예: 2액형 에폭시 방청 하도 도료)',{max:100,sum:1}),0,'pw')}
${pf('tag','일반명',pin('g',v('g'),'예) 폴리아마이드 에폭시 방청하도',{max:100}))}${pf('tag','도료 구분 (희석제 기준 자동)',`<div class="pbx"><select data-k="cat">${Object.values(window.PQCAT).map(x=>`<option value="${x}"${x==window.PQCAT[window.pqCatKey(p)]?' selected':''}>${x}</option>`).join('')}</select></div>`)}${pf('doc','TDS 첨부 여부',`<div class="pft"><button type="button" class="${hasT?'on':''}" onclick="pdAtt()">${pi('check')}첨부</button><button type="button" class="${hasT?'':'on'}" onclick="tt('첨부 삭제는 제품 목록의 삭제 버튼에서 합니다')">미첨부</button></div>`)}
${pf('clock','내화 시간 (내화도료)',pin('frt',v('frt'),'내화도료만 · 예) 2시간',{list:'pd_frl'}))}${pf('roll','마감 체계',pin('fin',v('fin'),'상도 제품 선택 또는 입력',{list:'pd_fnl'}))}${pf('box','용도 (적용 부위)',pin('us',v('us'),'예) 철구조물·교량·파이프·탱크 외부',{list:'pd_usl'}),0,'pw')}
${pf('roll','표면처리',pin('sp',v('sp'),'예) Sa 2.5 · 동력공구 · 용제크리닝 · 수분·오염·먼지·녹 제거'),0,'pw')}
</div></div>
<div class="pfc">${sec(2,'제품 상세 정보','규격·물성·시간 정보를 입력합니다.',`<span class="pfn">${pi('info')}* 표시는 필수 입력입니다.</span>`)}
<div class="pin"><div class="pit">${pi('note')}<b>기본 제원</b></div><div class="pg2">
${pf('box','포장단위 (주제 : 경화제)',pin('pd_pack',pack,'예) 16 : 4 (단액형 15)',{num:0}))}${pf('flask','혼합규격',pin('mk',v('mk'),'예) 20',{num:1}))}
${pf('scale','단위 (L, kg)',`<div class="pbx"><select data-k="un" onchange="pdSync(this)"><option value="L"${un=='L'?' selected':''}>L</option><option value="kg"${un=='kg'?' selected':''}>kg</option></select></div>`)}${pf('scale','비중 (kg/L)',pin('sg',v('sg'),'예) 1.2',{num:1}))}
${pf('flask','SVR (고형분 용적비)',pin('svr',v('svr'),'예) 42',{num:1,suf:'%'}))}${pf('roll','추천도막 (1회도장)',pin('dft',v('dft'),'예) 50',{num:1,suf:'μm'}))}
${pf('drop','희석제',pin('tn',v('tn'),'예) 신나 (없으면 비움)'))}${pf('drop','희석제 규격',pin('ts',v('ts'),'예) 18',{num:1,suf:'L'}))}
${pf('drop','희석제 코드',pin('tc',v('tc'),'예) 002'))}${pf('drop','희석율',pin('tr',v('tr'),'예) 5',{num:1,suf:'%'}))}
</div></div>
<details class="pin pdd"><summary><span class="pit">${pi('clock')}<b>건조시간 · 재도장 · 가사시간</b><small>온도별 건조시간과 재도장 간격, 가사시간을 입력합니다.</small></span>${pi('chev')}</summary><div class="pdb"><input type="hidden" data-k="dry" value="${esc(p.dry||'')}"><div id="pdgw">${pdGrid(cols)}</div><button type="button" class="pdadd" onclick="pdAddCol()">${pi('plus')}온도 추가</button><div class="pg2">${pf('clock','가사시간',pin('pot',v('pot'),'예) 20℃ 8시간'))}</div></div></details></div>
<div class="pfc">${sec(3,'도장 사양','선행·후속 도장 제품명을 입력합니다.')}<div class="pg2">
${pf('doc','선행도장',pin('pre',v('pre'),'제품명 또는 도장사양에 따름'))}${pf('doc','후속도장',pin('nxt',v('nxt'),'제품명 또는 도장사양에 따름'))}</div></div>
<div class="pfc">${sec(4,'자료 정보','TDS 출처와 확인 이력을 기록합니다.')}<div class="pg2">
${pf('link','출처',raw('tv_src',ctx.src||'','TDS 출처 (URL 또는 문서명)'),0,'pw')}${pf('note','TDS 개정일자',raw('tv_rev',ctx.rev||'','예) 2025-05-14'))}${pf('note','자료 확인일',raw('tv_chk',ctx.chk||pqToday(),'확인일'))}
<label class="pdk pw"><input type="checkbox" id="tv_ok" ${ctx.ver?'checked':''}><span>검증 완료</span></label></div></div>
${['pk','pks','memo','cat','cert','mixt'].map(hid).join('')}
<datalist id="pd_mfl">${[...new Set(DB.map(q=>q.mf).filter(Boolean))].sort().map(m=>`<option value="${esc(m)}">`).join('')}</datalist><datalist id="pd_frl">${['30분','1시간','1.5시간','2시간','3시간'].map(m=>`<option value="${m}">`).join('')}</datalist><datalist id="pd_fnl">${['조합페인트','폴리우레탄','불소수지','에폭시','실리콘','아크릴',...DB.map(q=>q.n)].map(m=>`<option value="${esc(m)}">`).join('')}</datalist><datalist id="pd_usl">${['철구조물','교량','파이프','탱크 외부','선박','콘크리트'].map(m=>`<option value="${m}">`).join('')}</datalist></div>
<div class="pfa"><button type="button" class="ps" onclick="tvSave()">${pi('check')}${edit?'저장하기':'등록하기'}</button><button type="button" class="pa" onclick="pdAtt()">${pi('clip')}첨부하기</button><button type="button" class="pr" onclick="pdReset()">${pi('trash')}초기화</button><button type="button" class="pc" onclick="pqX('pqtv')">${pi('x')}취소</button></div>`;
 pqSheet('pqtv',html,'tvs pdf2');pdDry()}
function pdTds0(p){return !!(p.n&&(TK.includes(p.n)||p.url))}
