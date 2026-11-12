(function(){
const SV=(p,c)=>`<svg class="${c||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const IC={
 flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 14h9"/>',
 can:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
 box:'<path d="M4 8h16v12H4zM3 4h18v4H3zM10 12h4"/>',
 layers:'<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>',
 shield:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
 timer:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9.5 3h5M12 3v2.5"/>',
 drop:'<path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3z"/>',
 grid:'<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16"/>',
 doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',
 brush:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',back:'<path d="M15 5l-7 7 7 7"/>',chev:'<path d="M6 9l6 6 6-6"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',clip:'<path d="M20 11l-8.5 8.5a5 5 0 0 1-7-7L13 4a3.3 3.3 0 0 1 4.7 4.7L9.2 17.2a1.7 1.7 0 0 1-2.4-2.4L14 7.6"/>',
 eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',snow:'<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 12h8"/>',
 filter:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
 refresh:'<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/>',
 wb:'<path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3z"/>',ob:'<path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
 pw:'<circle cx="12" cy="12" r="2.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M18.4 5.6l-2 2M7.6 16.4l-2 2"/>',
 ct:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>',ot:'<path d="M5 12h.01M12 12h.01M19 12h.01"/>',all:'<path d="M5 8h14l-1.5 12h-11zM4 8l1-3h14l1 3"/>'};
IC.wp='<path d="M4 12a8 8 0 0 1 16 0z"/><path d="M12 12v6a2 2 0 0 0 4 0"/><path d="M12 3v1"/>';IC.fl='<path d="M3 18l3-7h12l3 7z"/><path d="M12 11v7M8 11l-2 7M16 11l2 7"/>';IC.hd=IC.ct||'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>';IC.ind=IC.pw||'<circle cx="12" cy="12" r="2.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>';
const I=(n,c)=>SV(IC[n]||'',c);
const CAT={wb:'수성',ob:'유성',wp:'방수재',fl:'바닥재',hd:'중방식',ind:'공업',ot:'기타'};
window.PQCAT=CAT;const CATK={};Object.keys(CAT).forEach(k=>CATK[CAT[k]]=k);
/* 수성: 희석제가 상수도물(물)일 때. 희석제 정보가 없을 때만 글자로 판단 */
window.WBX=function(t,tn){var raw=String(tn||'').trim();
 if(raw){return /(^|[^가-힣])물($|[^가-힣])/.test(raw)||/담수|상수도|수돗물|청수|정제수|증류수|순수|^DI$|water/i.test(raw)}
 var s=String(t||'').replace(/\s+/g,'').replace(/내(?:염해?|해)?수성/g,'');return /수성|수용성|수계|에멀|워터|water/i.test(s)};
/* 도료 구분: 수성 · 유성 · 방수재 · 바닥재 · 중방식 · 공업 · 기타 (분체·코팅제 구분 없음) */
window.pqCatKey=function(p){p=p||{};var c=String(p.cat||'').trim();if(CATK[c])return CATK[c];
 var T1=[p.g,p.us,p.n,p.cat].filter(Boolean).join(' '),T2=[T1,p.d].filter(Boolean).join(' ');
 if(/방수|waterproof/i.test(T1)||/방수\s*(재|제|용|도료|공법|층)/.test(T2))return 'wp';
 if(/바닥|floor|셀프\s*레벨|self.?level|논슬립|주차장/i.test(T1)||/바닥\s*(재|용|마감|도장)/.test(T2))return 'fl';
 if(/중방식|징크|zinc|아연|MIO|글라스\s*플레이크|glass\s*flake|라이닝|탱크|플랜트|해양|선박|교량|강교|파이프라인|내식|고내식|방식|heavy.?duty/i.test(T1)||/중방식|징크\s*리치|zinc.?rich|글라스\s*플레이크/i.test(T2))return 'hd';
 if(WBX(T2,p.tn))return 'wb';
 if(/공업|기계|건설\s*기계|자동차|차량|가전|가구|목재|목공|산업|industrial|OEM|리피니쉬|코일|금속\s*제품|농기계|분체|powder/i.test(T1))return 'ind';
 if(String(p.tn||'').trim()||/유성|용제|신나|시너|래커|락카|알키드|에나멜|바니쉬|프라이머|하도|중도|상도|페인트|도료/.test(T2))return 'ob';
 return 'ot'};
const catOf=p=>pqCatKey(p);
const CCOL={wb:['#4aa0f2','#1f6fd8'],ob:['#ff9a45','#e8650f'],wp:['#2bc0b4','#0f8f86'],fl:['#e6b04a','#b9811f'],hd:['#8a6be0','#5c3fc4'],ind:['#3dbb7e','#1d8f55'],ot:['#8d9bb4','#5d6c88']};
const canSvg=(c)=>{const [a,b]=CCOL[c]||CCOL.ot;return `<svg viewBox="0 0 64 64"><defs><linearGradient id="cg${c}" x1="0" x2="1"><stop offset="0" stop-color="${b}"/><stop offset=".45" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><ellipse cx="32" cy="55" rx="21" ry="5" fill="#1d3a73" opacity=".13"/><path d="M12 15v38c0 3 9 5.5 20 5.5S52 56 52 53V15z" fill="url(#cg${c})"/><ellipse cx="32" cy="15" rx="20" ry="5.5" fill="#d9e1ee"/><ellipse cx="32" cy="15" rx="15" ry="3.6" fill="#f2f5fa"/><rect x="12" y="27" width="40" height="17" fill="#fff" opacity=".92"/><path d="M12 27c0 2 9 3.5 20 3.5S52 29 52 27M12 44c0 2 9 3.5 20 3.5S52 46 52 44" fill="none" stroke="${b}" stroke-width=".8" opacity=".5"/><rect x="20" y="33" width="24" height="3" rx="1.5" fill="${b}"/><rect x="24" y="38.5" width="16" height="2.2" rx="1.1" fill="${a}"/></svg>`};
let CF='all',SO='rec',FP=false;
const isTds=p=>TK.includes(p.n)||p.url;
function tagsOf(p){const a=[],us=String(p.us||'').trim();
 if(us)a.push(us.length>9?us.slice(0,8)+'…':us);
 const t=dbxTags(p);t.split(' · ').filter(Boolean).forEach(x=>a.push(x));
 a.push(CAT[catOf(p)]);
 return [...new Set(a)].slice(0,3)}
function initDom(){
 if(!document.getElementById('dsq')){
  const w=document.createElement('div');w.id='dsq';w.className='dsq';
  const lab=document.querySelector('#v1 .dbq .dbin');
  w.innerHTML=I('search');if(lab)w.appendChild(lab);
  const sc=document.createElement('button');sc.type='button';sc.className='dsscan';sc.setAttribute('aria-label','검색 초기화');sc.innerHTML=I('scan');sc.onclick=()=>{const q=document.getElementById('q');if(q){q.value='';CF='all';TF='all';MF='all';dbl();q.focus()}};w.appendChild(sc);
  const dbl0=document.getElementById('dbl');dbl0.parentNode.insertBefore(w,document.querySelector('#v1 details.dbs')||dbl0);
  const ch=document.getElementById('dbch');if(ch){w.after(ch)}
  const fp=document.createElement('div');fp.id='dbfp';fp.hidden=true;const mf=document.getElementById('mfw');if(mf)fp.appendChild(mf);ch.after(fp);
  const tl=document.createElement('div');tl.id='dst';tl.className='dst';fp.after(tl);
 }
 const hb=document.getElementById('hx');
 if(hb&&!hb.querySelector('.dshb')){const d=document.createElement('div');d.className='dshb';d.innerHTML=`<button type="button" aria-label="제품 추가" onclick="newP()">${I('plus')}</button>`;hb.appendChild(d)}
}
window.dsTools=()=>{const v=document.getElementById('v1');if(v)v.classList.toggle('tools')};
window.dsCat=k=>{CF=k;dbl()};window.dsSort=v=>{SO=v;dbl()};window.dsFp=()=>{FP=!FP;dbl()};
dbl=function(){
 try{initDom()}catch(e){}
 const q=((document.getElementById('q')||{}).value||'').toLowerCase(),has=isTds;
 const base=DB.map((p,j)=>[p,j]).filter(([p])=>(p.n+p.g+p.d+p.e+(p.mf||'')).toLowerCase().includes(q)&&(MF=='all'||(p.mf||'미지정')==MF));
 const cnt={all:DB.length,wb:0,ob:0,wp:0,fl:0,hd:0,ind:0,ot:0};DB.forEach(p=>cnt[catOf(p)]++);
 const na=DB.filter(has).length;
 let L=base.filter(([p])=>(TF=='all'||(TF=='y')==!!has(p))&&(CF=='all'||catOf(p)==CF));
 L.sort((a,b)=>(LAST.includes(b[0].n)-LAST.includes(a[0].n))||(TLAST.includes(b[0].n)-TLAST.includes(a[0].n)));
 if(SO=='name')L.sort((a,b)=>a[0].n.localeCompare(b[0].n,'ko',{numeric:true}));
 if(SO=='tds')L.sort((a,b)=>(!!has(b[0])-!!has(a[0])));
 LFJ=L.map(x=>x[1]);
 const mfs=[...new Set(DB.map(p=>p.mf||'미지정'))].sort();
 const w=document.getElementById('mfw');if(w)w.innerHTML=`<select class=mfsel aria-label="제조사 선택" onchange="MF=this.value;dbl()"><option value=all>제조사 전체</option>${mfs.map(m=>`<option ${MF==m?'selected':''}>${esc(m)}</option>`).join('')}</select>`;
 const fp=document.getElementById('dbfp');if(fp)fp.hidden=!FP;
 const c=document.getElementById('dbch');if(c)c.innerHTML=[['all','전체 '+DB.length,'all'],['y','TDS 있음 '+na,'doc'],['n','미첨부 '+(DB.length-na),'doc']].map(([k,l,ic])=>`<button type="button" class="${TF==k?'qon':''}" onclick="TF='${k}';dbl()">${I(ic)}<span>${l}</span></button>`).join('')+`<button type="button" class="dsft${FP||MF!='all'?' on':''}" onclick="dsFp()">${I('filter')}<span>필터</span></button>`;
 const t=document.getElementById('dst');if(t)t.innerHTML=[['all','전체'],['wb','수성'],['ob','유성'],['wp','방수재'],['fl','바닥재'],['hd','중방식'],['ind','공업'],['ot','기타']].map(([k,l])=>`<button type="button" class="t-${k}${CF==k?' on':''}" onclick="dsCat('${k}')">${I(k)}<b>${l}</b><em>${cnt[k]}</em></button>`).join('');
 const card=([p,j])=>{const k=catOf(p),d=p.d||p.g||p.us||'',v=p.ver;
  return `<article class="dc c-${k}" onclick="dsOpen(${j})"><div class="dc-th">${canSvg(k)}</div><div class="dc-mid"><div class="dc-1"><b>${esc(p.n)}</b>${p.mf?`<span class="bd mk">${esc(p.mf)}</span>`:''}<span class="bd ${v?'vf':'uv'}">${v?'검증':'미검증'}</span></div><p class="dc-d">${d?esc(d):'등록된 설명이 없습니다'}</p><div class="dc-tg">${tagsOf(p).map(x=>`<span>${esc(x)}</span>`).join('')}</div></div><div class="dc-r"><span class="dc-tds" data-ti="${esc(p.n.replace(/"/g,''))}"></span><i>›</i></div></article>`};
 document.getElementById('dbl').innerHTML=`<div class="dsl-h"><span class="li">${I('list')}</span><b>총 ${L.length}개 제품${q||CF!='all'||TF!='all'||MF!='all'?` <small style="font-weight:500;color:#6b7b95">(전체 ${DB.length})</small>`:''}</b><span class="dspc"></span><select aria-label="정렬" onchange="dsSort(this.value)"><option value="rec"${SO=='rec'?' selected':''}>추천순</option><option value="name"${SO=='name'?' selected':''}>이름순</option><option value="tds"${SO=='tds'?' selected':''}>TDS 있음순</option></select></div><div class="dcw">${L.length?L.slice(0,LIM).map(card).join(''):'<div class="dsl-no">조건에 맞는 제품이 없습니다</div>'}</div>${L.length>LIM?'<button type="button" class="dsl-more" onclick="LIM+=100;dbl()">더 보기</button>':''}`;
 mark();
};
/* ---------- 데이터 시트 상세 ---------- */
const TCOL=t=>t<=7?'hc1':t<=15?'hc2':t<=25?'hc3':'hc4';
function dsTemp(c){return dbxTv(c)}
window.dsClose=()=>{const e=document.getElementById('dsp');if(e)e.remove();document.documentElement.classList.remove('pdlock')};
window.addEventListener('load',()=>{try{if(typeof cards=='function')cards()}catch(e){}});
window.dsSecs=function(p){
 const m=mx(p),u=UN(p),two=m.b>0,Fv=x=>F(x),nv=v=>v==null||v===''||v==='-';
 const cell=(ic,col,l,v,o)=>{o=o||{};const e=nv(v);return `<div class="dsx${o.w?' w':''}"><span class="xi ${col}">${I(ic)}</span><div class="xt"><small>${l}</small><b class="${e?'nv':''}${o.sm?' sm':''}">${e?'-':(o.raw?v:esc(v))}</b></div></div>`};
 const tn=p.tn&&p.tn!='무희석'?p.tn+(p.tc&&p.tc!=p.tn?' ('+p.tc+')':''):'무희석';
 const tnv=tn+(+p.tr?' · 희석율 '+F(p.tr*100,1)+'%':'');
 const t=thc(p),area=t?(u=='kg'&&+p.sg>0?F(t/p.sg)+'㎡/kg':F(t)+'㎡/L'):'';
 const spec=cell('doc','b','제품설명',p.d,{w:1})
  +cell('can','o','용도',p.us,{w:1})
  +cell('brush','g','표면처리',p.sp,{w:1})
  +cell('flask','b','혼합규격',F(m.m)+u)
  +cell('flask','g','혼합비'+(two?' ('+(u=='kg'?'무게비':'부피비')+')':''),two?F(m.a/m.b)+' : 1':'단액형')
  +cell('box','v','출고규격',two?F(m.a)+u+' : '+F(m.b)+u:F(m.a)+u)
  +cell('layers','g','희석제',tnv,{sm:1})
  +cell('shield','o','SVR (고형분 용적비)',p.svr?p.svr+'%':'')
  +cell('timer','r','추천도막'+(rgT(p)&&rgT(p).d?' (TDS 범위 '+rgT(p).d+')':''),p.dft?p.dft+'μm':'')
  +cell('drop','b','이론 도장면적 (L·kg당 · 로스 제외)'+(+p.ths>0?(p.thr?' · TDS '+p.thr+' 범위 중간값':' · TDS 기재'):''),rgT(p)?rgT(p).a:area,{sm:1})
  +cell('drop','o','이론 소요량 (로스 제외 · 계산값과 동일)',rgT(p)?rgT(p).q:(thq(p)?F(thq(p),3)+(u=='kg'?' kg/㎡':' L/㎡'):''),{sm:1})
  +cell('grid','p','혼합규격당 도장면적',rgT(p)&&rgT(p).c?rgT(p).c:(cov1(p)?F(cov1(p),1)+'㎡':''));
 const R=String(p.dry||'').split(/[;\n]/).map(x=>x.trim()).filter(Boolean).map(r=>r.split('/').map(x=>x.trim())).sort((a,b)=>dsTemp(a)-dsTemp(b)).slice(0,5);
 let dry='';
 if(R.length){const n=R.length,cols=n+1,hc=c=>{const tv=dsTemp(c);return `<div class="h ${TCOL(tv)}">${I(tv<=12?'snow':'sun')}<span>${esc(dbxTl(c))}</span></div>`};
  const row=(l,k)=>`<div class="l">${l}</div>`+R.map((c,i)=>{const v=dbxF(c[k]);return `<div class="${v=='-'?'nv ':''}${i==n-1?'ec':''}">${v}</div>`}).join('');
  dry=`<div class="dsd" style="--n:${n}"><div class="h h0">구분</div>`+R.map((c,i)=>hc(c).replace('class="h ','class="h '+(i==n-1?'ec ':''))).join('')+row('지촉',1)+row('고화',2)+row('완전경화',3)+'</div>';
  const rc=R.filter(c=>(c[4]&&c[4]!='-')||(c[5]&&c[5]!='-'));
  dry+=`<div class="dsr2"><b>${I('clock')}재도장 간격</b>`+(rc.length?rc.map(c=>`<div class="rw">${esc(dbxTl(c))} 기준 최소 <b>${dbxF(c[4])}</b> <i>→</i> <span class="mx">최대 ${dbxF(c[5])}</span></div>`).join(''):'<div class="rw">재도장 간격 정보 없음</div>')+'</div>';
  dry+=`<div class="dsn">${I('info')}<div>지촉: 손에 묻지 않는 시간 · 고화: 눌러도 자국이 없는 시간 · 완전경화: 사용 가능 상태<span class="rc">재도장: 다음 코트 도장 가능 간격(최소~최대)${p.dsrc?' · TDS에서 자동 추출 · 원문과 대조 필요':''}</span></div></div>`;
 }else dry=`<div class="dsno">건조시간 정보가 없습니다.<br>TDS를 등록하면 자동으로 채워집니다.</div>`;
 const link=p.src?`<a href="${esc(p.src)}" target="_blank" rel="noopener">${esc(String(p.src).replace(/^https?:\/\//,'').slice(0,40))}</a>`:'';
 const rowv=(l,v,raw)=>`<div class="dsrow"><span>${l}</span><b class="${nv(v)?'nv':''}">${nv(v)?'-':(raw?v:esc(v))}</b></div>`;
 const det=rowv('비중',p.sg?F(+p.sg,2):'')+rowv('가사시간',p.pot)+rowv('선행도장',p.pre)+rowv('후속도장',p.nxt)+rowv('포장규격(TDS)',p.pks)+rowv('출처',link||p.mf||'',!!link)+rowv('TDS 개정일',p.rev)+rowv('자료확인일',p.chk);
 const sec=(ic,tt2,body)=>`<details class="dss" open><summary><span class="si">${I(ic)}</span><b>${tt2}</b>${I('chev','cv')}</summary>${body}</details>`;
 return sec('doc','기본 제원',`<div class="dsg">${spec}</div>`)+sec('clock','건조시간 · 재도장 간격',dry)+sec('info','상세 정보 · 출처',det)};
window.dsOpen=function(j){
 const p=DB[j];if(!p)return;dsClose();
 const sub=[p.g,p.us?'용도 '+p.us:'',p.sp?'표면처리 '+p.sp:''].filter(Boolean).join(' · ');
 const nm=esc(p.n.replace(/"/g,''));
 const e=document.createElement('div');e.id='dsp';e.className='dsp';
 e.innerHTML=`<div class="dsp-in"><header class="dsh"><img alt="" src="${(document.getElementById('hxbg')||{}).src||''}" onerror="this.style.display='none'"><div class="dsh-t"><button type="button" aria-label="뒤로" onclick="dsClose()">${I('back')}</button><b>데이터 시트</b></div><div class="dsh-n"><h2>${esc(p.n)}</h2>${p.mf?`<span class="bd mk">${esc(p.mf)}</span>`:''}<span class="bd ${p.ver?'vf':'uv'}">${p.ver?'검증':'미검증'}</span><span class="bd tdsb" data-ti="${nm}"></span></div><p class="dsh-s">${sub?esc(sub):'등록된 일반명·용도가 없습니다'}</p></header><main class="dsm">${dsSecs(p)}</main><div class="dsa"><button type="button" class="qbv no" data-t="${nm}" onclick="tds(DB[${j}].n)">${I('doc')}<span>미첨부</span></button><button type="button" onclick="att(DB[${j}].n)">${I('clip')}<span>첨부</span></button><button type="button" class="d" onclick="dsDel(${j})">${I('trash')}<span>TDS삭제</span></button><button type="button" class="d pd" onclick="dsDelP(${j})">${I('trash')}<span>제품삭제</span></button><button type="button" class="e" onclick="dsClose();edt(${j})">${I('edit')}<span>제품 수정</span></button></div></div>`;
 document.body.appendChild(e);document.documentElement.classList.add('pdlock');
 try{mark()}catch(_){}
};
window.dsDelP=j=>{const p=DB[j];if(!p)return;const n=p.n;ask('⚠ 제품 삭제<br><b>'+esc(n)+'</b><br>이 제품을 DB에서 삭제합니다.<br>삭제하면 되돌릴 수 없습니다. 계속할까요?',async()=>{try{await idb('del',n)}catch(_){}const k=DB.indexOf(p);if(k>-1)DB.splice(k,1);sv();dsClose();dbl();try{cards()}catch(_){}tt('제품을 삭제했습니다')})};
window.dsDel=j=>{const n=DB[j]&&DB[j].n;if(!n)return;tdel(n)};
/* 헤더 */
{const _h=hdr;hdr=function(n){_h(n);document.body.classList.toggle('pg1',n==1);if(n==1){try{initDom()}catch(e){}const a=document.getElementById('hs1'),b=document.getElementById('ttl'),c=document.getElementById('hs2');if(a)a.textContent='Paint & Coatings';if(b)b.textContent='제품 데이터베이스';if(c)c.textContent='신뢰할 수 있는 도료 정보를 한곳에서 —\n더 나은 선택을 위한 시작입니다.'}}}
})();
