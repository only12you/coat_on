(function(){
var F=function(x){return Math.round(x).toLocaleString('en-US')},F1=function(x){return (Math.round(x*10)/10).toLocaleString('en-US')};
var S=function(d,c){return '<svg class="'+(c||'')+'" viewBox="0 0 24 24">'+d+'</svg>'};
var CH='<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
var IC={
 menu:'<path d="M4 7h16M4 12h16M4 17h11"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
 gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2.6"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>',
 chart:'<path d="M4 20V11M9 20V6M14 20v-6"/><circle cx="17" cy="14" r="3.2"/><path d="M19.4 16.4L21.5 18.5"/>',
 db:'<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/>',
 brain:'<path d="M9.5 4.2A3 3 0 0 0 6.6 7a3 3 0 0 0-1.4 5 3.2 3.2 0 0 0 1.9 4.6A3 3 0 0 0 12 18.5V5.3a2 2 0 0 0-2.5-1.1zM14.5 4.2A3 3 0 0 1 17.4 7a3 3 0 0 1 1.4 5 3.2 3.2 0 0 1-1.9 4.6A3 3 0 0 1 12 18.5"/><path d="M9 10h1.5M13.5 10H15M9 14h1.5M13.5 14H15"/>',
 doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7M9 8h3"/>',
 home:'<path d="M3.5 11L12 4l8.5 7"/><path d="M6 10v10h4.5v-5.5h3V20H18V10"/>',
 more:'<circle cx="5.5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18.5" cy="12" r="1.6"/>',
 leaf:'<path d="M20 4C10 4 4.5 9 4.5 15.5c0 2 .8 3.5.8 3.5s1.5.7 3.5.7C15.3 19.7 20 14 20 4z"/><path d="M5.3 19C8 14 11 11 15 8.5"/>',
 cam:'<path d="M4 8h3l1.6-2.2h6.8L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.6"/>',
 leafc:'<path d="M20 4C10 4 4.5 9 4.5 15.5c0 2 .8 3.5.8 3.5s1.5.7 3.5.7C15.3 19.7 20 14 20 4z"/><path d="M5.3 19C8 14 11 11 15 8.5"/>'
};
function ic(k,c){return S(IC[k],c||'i')}
/* 데이터 집계 (LCC 모듈 값 사용) */
function stats(){var r={n:0,sv:null,co:null,cp:null,dur:null,life:null,urg:0};
 try{var L=window.LCCX;if(!L||!L.get)return r;var RS=L.get(),as=(RS.assets||[]).filter(function(x){return !/\(예시\)/.test((x&&x.n)||'')});r.n=as.length;if(!as.length)return r;
  var hz=RS.hz||30,T0=0,T2=0,c0=0,c2=0,lf=[];
  var co=function(m,a){var l=m.sc.cs.reduce(function(x,y){return x+y.acv},0)*a.ar,n=Math.ceil(hz/Math.max(1,m.c));return l*1.4*3.0*n/Math.max(1,hz)/1000};
  as.forEach(function(a){try{var q=L.all(a),m0=q.m[0],m2=q.m[2];T0+=m0.tot;T2+=m2.tot;lf.push(m0.e);c0+=co(m0,a);c2+=co(m2,a);if(q.B&&(q.B.z=='R'||q.B.z=='O'))r.urg++}catch(e){}});
  if(T0>0)r.sv=(T0-T2)/T0*100;r.co=c0-c2;r.cp=c0>0?(c0-c2)/c0*100:0;
  if(lf.length){var av=lf.reduce(function(x,y){return x+y},0)/lf.length;r.life=av;r.dur=Math.max(0,Math.min(100,av/hz*100))}
 }catch(e){}return r}
function cnt(){var o={db:0,sy:0,dg:0};try{o.db=(typeof DB!='undefined'&&DB.length)||0}catch(e){}try{o.sy=(typeof syLibGet=='function'&&syLibGet().length)||0}catch(e){}try{o.dg=(JSON.parse(localStorage.getItem('pqu:lcci:h')||'[]')||[]).length}catch(e){}return o}
var Z=function(v,u,d){return v==null?'<b>–</b>':'<b>'+v+(u?'<em>'+u+'</em>':'')+(d||'')+'</b>'};
function ring(){return '<i class="mh-rg"></i>'}
var MI={
 coin:'<svg viewBox="0 0 32 32"><ellipse cx="16" cy="9" rx="9" ry="4" fill="#ffb02e"/><path d="M7 9v5c0 2.2 4 4 9 4s9-1.8 9-4V9" fill="#f6921e"/><path d="M7 15v5c0 2.2 4 4 9 4s9-1.8 9-4v-5" fill="#ee7d0f"/></svg>',
 shield:'<svg viewBox="0 0 32 32"><path d="M16 3l11 4v8c0 7-4.6 11.4-11 14C9.600 26.400 5 22 5 15V7z" fill="#2a79f0"/><path d="M11 16l4 4 7-8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 leaf:'<svg viewBox="0 0 32 32"><path d="M27 5C14 5 6 11.500 6 20c0 2.700 1 4.700 1 4.700s2 1 4.700 1C22 25.700 27 18 27 5z" fill="#2cbf6a"/><path d="M8 25c3.500-6.500 8-10.500 13-13.500" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>'};
var PIC={
 globe:'<svg class="p" viewBox="0 0 66 54"><circle cx="38" cy="29" r="22" fill="#3f8fe8"/><path d="M24 20c5-5 11-3 13 1s-4 5-3 9-8 2-11-1-1-6 1-9zM44 33c4-2 8 0 9 3s-3 6-7 5-4-6-2-8z" fill="#5ec27a"/><ellipse cx="30" cy="20" rx="9" ry="5" fill="#fff" opacity=".28"/><path d="M8 40c10 8 28 10 44 2" fill="none" stroke="#9bd0ff" stroke-width="2" opacity=".7"/></svg>',
 plant:'<svg class="p" viewBox="0 0 66 54"><g fill="#c6d3e4" stroke="#8ea4c0" stroke-width="1"><rect x="6" y="26" width="10" height="24" rx="2"/><rect x="20" y="14" width="9" height="36" rx="2"/><rect x="33" y="22" width="11" height="28" rx="2"/><rect x="48" y="30" width="12" height="20" rx="2"/></g><g fill="#eef3fa"><rect x="22" y="8" width="5" height="8" rx="2"/><rect x="36" y="14" width="5" height="9" rx="2"/></g><path d="M0 50h66" stroke="#8ea4c0" stroke-width="2"/></svg>',
 dbs:'<svg class="p" viewBox="0 0 66 54"><ellipse cx="34" cy="14" rx="18" ry="7" fill="#7cc0ff"/><path d="M16 14v10c0 4 8 7 18 7s18-3 18-7V14" fill="#3f8cf0"/><path d="M16 26v10c0 4 8 7 18 7s18-3 18-7V26" fill="#2c6fe0"/><ellipse cx="34" cy="14" rx="11" ry="3.500" fill="#b6dcff"/></svg>',
 rust:'<svg class="p" viewBox="0 0 66 54"><rect x="6" y="6" width="54" height="42" rx="5" fill="#b7bcc4"/><path d="M8 30c8-6 14 4 22-2s12 6 20 0l10 8v8c0 1-1 2-2 2H12c-3 0-4-1-4-4z" fill="#b8693b" opacity=".85"/><path d="M12 14h12M12 10v8M54 40H42M54 44v-8" stroke="#35d1c5" stroke-width="2.500" fill="none" stroke-linecap="round"/></svg>'};
function slide(kind,s,c){
 var m='';
 if(kind==0){
  var ec=s.sv==null?'–':Math.max(0,Math.round(s.sv)),du=s.dur==null?'–':Math.round(s.dur),en=s.cp==null?'–':Math.max(0,Math.round(s.cp));
  return '<div class="mh-s"><div><span class="mh-pill">LCC 분석 '+CH+'</span><h2>최적의 도장시스템,<br>지금 바로 확인하세요!</h2><p>경제성 · 내구성 · 환경성을<br>통합한 LCC 분석</p><button class="mh-go" data-go="lcc0">분석하기 '+CH+'</button></div>'
  +'<div class="mh-ring">'+ring()+'<div><b>LCC</b><small>Life Cycle Cost</small></div></div>'
  +'<div class="mh-m"><div>'+MI.coin+'<span><small>경제성</small><b>'+ec+(ec=='–'?'':'%')+'</b></span></div><div>'+MI.shield+'<span><small>내구성</small><b>'+du+(du=='–'?'':'%')+'</b></span></div><div>'+MI.leaf+'<span><small>환경성</small><b>'+en+(en=='–'?'':'%')+'</b></span></div></div></div>'}
 if(kind==1){
  return '<div class="mh-s"><div><span class="mh-pill">AI 진단 '+CH+'</span><h2>사진 한 장으로<br>도막 상태를 진단하세요</h2><p>녹 · 균열 · 박리 · 블리스터 등<br>도막 결함을 판정합니다</p><button class="mh-go" data-go="dg">진단하기 '+CH+'</button></div>'
  +'<div class="mh-ring">'+ring()+'<div><b>AI</b><small>Coating Diagnosis</small></div></div>'
  +'<div class="mh-m"><div>'+MI.shield+'<span><small>진단 이력</small><b>'+c.dg+'건</b></span></div><div>'+MI.leaf+'<span><small>보수 긴급</small><b>'+s.urg+'곳</b></span></div></div></div>'}
 if(kind==3){return '<div class="mh-s"><div><span class="mh-pill">사양 비교 '+CH+'</span><h2>도장 사양을<br>한눈에 비교하세요</h2><p>도장사양 · 범용사양 · 추천사양<br>수명과 LCC를 함께 봅니다</p><button class="mh-go" data-go="cmp">비교하기 '+CH+'</button></div>'
  +'<div class="mh-ring">'+ring()+'<div><b>SPEC</b><small>Compare</small></div></div>'
  +'<div class="mh-m"><div>'+MI.coin+'<span><small>자산</small><b>'+s.n+'개</b></span></div><div>'+MI.shield+'<span><small>사양 DB</small><b>'+c.sy+'건</b></span></div></div></div>'}
 return '<div class="mh-s"><div><span class="mh-pill">보고서 '+CH+'</span><h2>분석 결과를<br>보고서로 만드세요</h2><p>LCC 분석 · 사양 비교 결과를<br>PDF 보고서로 출력합니다</p><button class="mh-go" data-go="rp">보고서 보기 '+CH+'</button></div>'
  +'<div class="mh-ring">'+ring()+'<div><b>RPT</b><small>Report</small></div></div>'
  +'<div class="mh-m"><div>'+MI.coin+'<span><small>자산</small><b>'+s.n+'개</b></span></div><div>'+MI.shield+'<span><small>사양 DB</small><b>'+c.sy+'건</b></span></div></div></div>'}
function html(){
 var s=stats(),c=cnt();
 var sv=s.sv==null?null:Math.max(0,s.sv),cp=s.cp==null?null:Math.max(0,s.cp);
 var co=s.co==null?null:Math.max(0,s.co);
 var logo='<div class="mh-logo">COAT ON<svg viewBox="0 0 92 30"><defs><linearGradient id="mhsw" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset=".6" stop-color="#bfe0ff"/><stop offset="1" stop-color="#6db2ff"/></linearGradient></defs><path d="M2 28C20 6 52 -2 90 6C58 6 30 12 2 28z" fill="url(#mhsw)"/></svg></div>';
 return '<section class="mh-hero"><div class="mh-img"></div><div class="mh-sh"></div>'
 +'<div class="mh-top"><button class="mh-ib" data-go="menu" aria-label="메뉴">'+ic('menu','')+'</button><div class="r"><button class="mh-ib" data-go="bell" aria-label="알림">'+ic('bell','')+(s.urg?'<i></i>':'')+'</button><button class="mh-ib" data-go="set" aria-label="설정">'+ic('gear','')+'</button></div></div>'
 +logo+'<div class="mh-sub">Smart Coating Solution</div><h1>더 스마트한 선택,<br>더 가치있는 솔루션</h1></section>'
 +'<div class="mh-kpi"><div class="k">'+S(IC.leaf,'').replace('<svg','<svg style="fill:#37d67a;stroke:#37d67a;stroke-width:1"')+'<div><small>LCC 절감효과</small>'+(sv==null?'<b>–</b>':'<b>'+F1(sv)+'<em>%</em></b>')+'</div></div>'
 +'<div class="k"><svg viewBox="0 0 32 32"><path d="M10 25a6 6 0 0 1-.8-11.900A7.500 7.500 0 0 1 23.600 11 5.500 5.500 0 0 1 23 25z" fill="#fff"/><text x="16" y="21" text-anchor="middle" font-size="8.500" font-weight="800" fill="#2a5fc0" font-family="Poppins,sans-serif">CO₂</text></svg><div><small>탄소배출 저감</small>'+(co==null?'<b>–</b>':'<b>'+F1(co)+'<em>tCO₂</em><span class="dn">▼ '+F1(cp)+'%</span></b>')+'</div></div>'
 +'<button class="go" data-go="lcc0" aria-label="LCC 보기">'+CH+'</button></div>'
 +'<div class="mh-tiles">'
 +'<button class="mh-t t1" data-go="calc">'+ic('calc')+'<b>산출</b><small>견적·물량산출</small><span class="c">'+CH+'</span></button>'
 +'<button class="mh-t t2" data-go="lcc0">'+ic('chart')+'<b>분석</b><small>LCC·성능분석</small><span class="c">'+CH+'</span></button>'
 +'<button class="mh-t t3" data-go="db">'+ic('db')+'<b>DB</b><small>제품·사양</small><span class="c">'+CH+'</span></button>'
 +'<button class="mh-t t4" data-go="dg">'+ic('brain')+'<b>AI 진단</b><small>도막·열화분석</small><span class="c">'+CH+'</span></button>'
 +'<button class="mh-t t5" data-go="rp">'+ic('doc')+'<b>보고서</b><small>분석보고서</small><span class="c">'+CH+'</span></button></div>'
 +'<div class="mh-lcc"><div class="mh-sl" id="mhsl">'+slide(0,s,c)+slide(1,s,c)+slide(3,s,c)+slide(2,s,c)+'</div><div class="mh-dots" id="mhdt"><i class="on"></i><i></i><i></i><i></i></div></div>'
 +'<div class="mh-g">'
 +'<button class="mh-c c1" data-go="lcc0"><div class="h">'+ic('leafc')+'<b>환경·ESG 분석</b><span class="a">'+CH+'</span></div><div class="bd"><small>탄소배출 절감량</small>'+(co==null?'<b>–</b>':'<b>'+F1(co)+'<em>tCO₂</em></b>')+PIC.globe+'</div></button>'
 +'<button class="mh-c c2" data-go="env"><div class="h">'+ic('leafc')+'<b>플랜트 도장분석</b><span class="a">'+CH+'</span></div><div class="bd"><small>산업시설 최적화<br>수명 예측</small>'+PIC.plant+'</div></button>'
 +'<button class="mh-c c3" data-go="db"><div class="h">'+ic('db')+'<b>데이터베이스</b><span class="a">'+CH+'</span></div><div class="bd"><small>제품 · 사양 DB</small><b>총 '+F(c.db+c.sy)+'<em>건</em></b>'+PIC.dbs+'</div></button>'
 +'<button class="mh-c c4" data-go="dg"><div class="h">'+ic('cam')+'<b>도막 진단 (AI)</b><span class="a">'+CH+'</span></div><div class="bd"><small>사진으로 진단하는<br>스마트 진단</small>'+PIC.rust+'</div></button></div>'
 +'<nav class="mh-nav"><button class="on" data-go="home">'+ic('home','')+'<span>홈</span></button><button data-go="calc">'+ic('calc','')+'<span>산출</span></button><button data-go="lcc0">'+ic('chart','')+'<span>분석</span></button><button data-go="db">'+ic('db','')+'<span>DB</span></button><button data-go="menu">'+ic('more','')+'<span>더보기</span></button></nav>'}
function lccTab(i){try{T(9);setTimeout(function(){try{LCCX.tab(i)}catch(e){}},30)}catch(e){}}
function go(k){
 try{
  if(k=='home')return;
  if(k=='calc')return T(0);
  if(k=='db'){window.SYM='db';window.SYK=1;return T(3)}
  if(k=='lcc0')return lccTab(0);
  if(k=='env')return lccTab(1);
  if(k=='dg')return lccTab(2);
  if(k=='rp')return lccTab(5);
  if(k=='sp')return lccTab(3);
  if(k=='cmp')return lccTab(4);
  if(k=='set'&&typeof openSettings=='function')return openSettings();
  if(k=='bell'){var s=stats();return tt(s.urg?('긴급 보수 대상 '+s.urg+'곳 (R·O 등급)'):'새 알림이 없습니다')}
  if(k=='menu'){var q=document.getElementById('qmb');if(q){q.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientY:0}));q.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,clientY:0}))}return}
 }catch(e){}}
window.mhRender=function(){var m=document.getElementById('mh');if(!m)return;
 var im='';try{var hn=document.querySelector('#hx .hni');var bi=hn?getComputedStyle(hn).backgroundImage:'';if(bi&&bi!='none'){im=bi.replace(/^url\(["']?/,'').replace(/["']?\)$/,'')}if(im)window.__mhim=im;im=window.__mhim||(document.getElementById('hxbg')||{}).src||((document.querySelector('#vh .hbg')||{}).src)||''}catch(e){}
 m.innerHTML=html();
 if(im){var d=m.querySelector('.mh-img');if(d)d.style.backgroundImage='url("'+im+'")'}
 var sl=document.getElementById('mhsl');if(sl)sl.addEventListener('scroll',function(){var i=Math.round(sl.scrollLeft/sl.clientWidth);var ds=document.querySelectorAll('#mhdt i');ds.forEach(function(x,j){x.classList.toggle('on',j==i)})},{passive:true});
};
(function(){try{var hn0=document.querySelector('#hx .hni');var b0=hn0?getComputedStyle(hn0).backgroundImage:'';if(b0&&b0!='none')window.__mhim=b0.replace(/^url\(["']?/,'').replace(/["']?\)$/,'')}catch(e){}var m=document.createElement('div');m.id='mh';m.hidden=true;document.body.appendChild(m);
 m.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(b){try{navigator.vibrate&&navigator.vibrate(10)}catch(x){}go(b.getAttribute('data-go'))}});
 /* 폰트: Pretendard (온라인일 때 로드, 서비스워커가 캐시) */
 try{var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css';fetch('lib/fonts/pretendard.css',{method:'HEAD',cache:'no-store'}).then(function(r){if(r.ok)l.href='lib/fonts/pretendard.css'}).catch(function(){}).then(function(){document.head.appendChild(l)})}catch(e){}
 /* 앱 시작 시 홈 대시보드 */
 var first=true;try{first=!sessionStorage.mhd}catch(e){}
 if(first){try{sessionStorage.mhd='1'}catch(e){}setTimeout(function(){try{T(2)}catch(e){}},0)}
})();
})();
