(function(){
var F1=function(x){return (Math.round(x*10)/10).toLocaleString('en-US')},F0=function(x){return Math.round(x).toLocaleString('en-US')};
var P=function(d,c,w){return '<svg class="'+(c||'')+'" viewBox="0 0 24 24" style="'+(w||'')+'">'+d+'</svg>'};
var CH='<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
var IC={
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
 gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2.6"/><path d="M8 7.5h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>',
 chart:'<path d="M4 20V11M9 20V6M14 20v-6"/><circle cx="17" cy="14" r="3.2"/><path d="M19.4 16.4L21.5 18.5"/>',
 db:'<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/>',
 ai:'<rect x="6" y="6" width="12" height="12" rx="2.4"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/><path d="M9.5 15l2.5-6 2.5 6M10.4 13h3.2"/>',
 doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 11h7M9 15h7M9 8h3"/>',
 home:'<path d="M3.5 11L12 4l8.5 7"/><path d="M6 10v10h4.5v-5.5h3V20H18V10"/>',
 more:'<circle cx="5.5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18.5" cy="12" r="1.6"/>'
};
function ic(k,c){return P(IC[k],c||'i')}
/* ---------- 데이터 ---------- */
function model(){var M={ok:false};
 try{var L=window.LCCX;if(!L||!L.get||!L.all)return M;var RS=L.get(),as=RS.assets||[];if(!as.length)return M;
  var a=as[RS.i]||as[0],q=L.all(a),hz=RS.hz||30,d=L.diagInfo();
  var co=function(m,x){var l=m.sc.cs.reduce(function(s,y){return s+y.acv},0)*x.ar,n=Math.ceil(hz/Math.max(1,m.c));return l*1.4*3.0*n/Math.max(1,hz)/1000};
  var opt=q.m.map(function(m,i){return {i:i,nm:L.RN[i],e:m.e,tot:m.tot,init:m.sc.init*a.ar/1000,co:co(m,a)*hz,cu:m.cu}});
  var best=0;opt.forEach(function(o){if(o.tot<=opt[best].tot)best=o.i});
  var T0=0,Tb=0,c0=0,cb=0,lf=[];
  as.forEach(function(x){try{var r=L.all(x);T0+=r.m[0].tot;var bi=0;r.m.forEach(function(m,i){if(m.tot<=r.m[bi].tot)bi=i});Tb+=r.m[bi].tot;c0+=co(r.m[0],x);cb+=co(r.m[bi],x);lf.push(r.m[0].e)}catch(e){}});
  var sv=T0>0?(T0-Tb)/T0*100:0;
  var z=a.zones&&a.zones[0]||{};var o0=opt[0],ob=opt[best];
  var N=Math.min(hz,30),ser=[];for(var y=0;y<=N;y+=Math.max(1,Math.floor(N/6))){ser.push((o0.cu[y]||0)-(ob.cu[y]||0))}
  M={ok:true,a:a,n:as.length,opt:opt,best:best,sv:sv,saved:(T0-Tb)/1e5,co:Math.max(0,c0-cb),cp:c0>0?(c0-cb)/c0*100:0,ser:ser,hz:hz,
   env:d.env,envT:d.envT,zone:d.zone,age:+d.age||0,e0:o0.e,rh:z.rh,cl:z.cl,so2:z.so2,
   lmin:Math.min.apply(null,lf),lmax:Math.max.apply(null,lf)};
 }catch(e){}return M}
function cnt(){var o={dg:0};try{o.dg=(JSON.parse(localStorage.getItem('pqu:lcci:h')||'[]')||[]).length}catch(e){}return o}
/* ---------- 그림 ---------- */
var LET=['A','B','C'],COL=['#8bc34a','#2f9bff','#8b5cf6'];
function ring(M){var tot=0,o=M.opt;o.forEach(function(x){tot+=x.tot});var R=46,C=2*Math.PI*R,off=0,seg='';
 [0,2,1].forEach(function(i){var f=tot>0?o[i].tot/tot:1/3,len=f*C;seg+='<circle cx="60" cy="60" r="'+R+'" fill="none" stroke="'+COL[i]+'" stroke-width="22" stroke-dasharray="'+Math.max(0,len-1.2)+' '+(C-len+1.2)+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 60 60)"/>';off+=len});
 return '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="'+R+'" fill="none" stroke="#e7eefb" stroke-width="22"/>'+seg+'<circle cx="60" cy="60" r="35" fill="#fff"/></svg>'}
function spark(ser){var n=ser.length,W=250,H=80,mx=Math.max.apply(null,ser.concat([1])),pts=ser.map(function(v,i){return [8+i*(W-16)/Math.max(1,n-1),H-8-(v/mx)*(H-24)]});
 var d=pts.map(function(p,i){return (i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)}).join('');
 return '<svg class="sp" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"><defs><linearGradient id="lhsa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b9bff" stop-opacity=".35"/><stop offset="1" stop-color="#3b9bff" stop-opacity="0"/></linearGradient></defs><path d="'+d+'L'+pts[n-1][0]+' '+H+'L'+pts[0][0]+' '+H+'Z" fill="url(#lhsa)"/><path d="'+d+'" fill="none" stroke="#2f9bff" stroke-width="2"/>'+pts.map(function(p){return '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="3.2" fill="#fff" stroke="#2f9bff" stroke-width="1.8"/>'}).join('')+'</svg>'}
var RUST='<svg class="ph" viewBox="0 0 170 142"><defs><filter id="lhrb"><feGaussianBlur stdDeviation="2.2"/></filter><filter id="lht"><feTurbulence type="fractalNoise" baseFrequency=".05 .08" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .27  0 0 0 0 .1  0 0 0 1.4 -.4"/></filter><linearGradient id="lhrg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9dfe6"/><stop offset="1" stop-color="#aab5c2"/></linearGradient></defs><rect width="170" height="142" fill="url(#lhrg2)"/><g filter="url(#lhrb)"><path d="M0 30C25 22 38 52 60 46S92 20 108 40s-4 40 14 52 38 6 48 20v30H0z" fill="#b2642a" opacity=".85"/><path d="M40 0C60 22 76 8 98 24s20 30 8 48-34 10-44 30-24 8-62 40V0z" fill="#8c4a1c" opacity=".7"/><path d="M110 70C128 60 150 66 170 54v40c-20 6-34-6-60 8z" fill="#cf8a3c" opacity=".7"/></g><rect width="170" height="142" filter="url(#lht)" opacity=".5"/></svg>';
var SKY='<svg class="sk" viewBox="0 0 300 46" preserveAspectRatio="none"><path d="M0 46V34h12V24h8v10h10V16h6V8h4v8h8v18h10V26h12v20zM110 46V30h10V18h6v12h12V22h8v24zM190 46V28h14V14h5V6h3v8h6v14h12V20h10v26zM262 46V32h10V22h8v24z" fill="#8fb4e6"/></svg>';
function layers(c){return '<svg class="ly" viewBox="0 0 127 104"><defs></defs><g stroke="#fff" stroke-width="1.2"><path d="M10 80l44-18 62 14-44 20z" fill="'+c[4]+'"/><path d="M10 70l44-18 62 14-44 20z" fill="'+c[3]+'"/><path d="M10 60l44-18 62 14-44 20z" fill="'+c[2]+'"/><path d="M10 48l44-18 62 14-44 20z" fill="'+c[1]+'"/><path d="M10 36l44-18 62 14-44 20z" fill="'+c[0]+'"/></g></svg>'}
var GLOBE='<svg class="mgl" viewBox="0 0 96 70"><path d="M8 58C10 36 24 24 40 22c-6 10-4 22 2 30-10 8-22 10-34 6z" fill="#34c26a"/><circle cx="58" cy="36" r="26" fill="#3f9bf0"/><path d="M44 26c6-6 14-4 16 2s-6 6-4 12-12 4-14-4 0-8 2-10zM66 44c5-2 10 1 10 5s-5 7-9 5-3-8-1-10z" fill="#5ec27a"/><ellipse cx="50" cy="24" rx="11" ry="6" fill="#fff" opacity=".25"/></svg>';
var BLD='<svg class="ki" viewBox="0 0 52 52" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 46V24h12v22M18 46V10h14v36M32 46V20h14v26M4 46h44"/><path d="M23 16h4M23 23h4M23 30h4M10 30h4M10 37h4M37 28h4M37 35h4"/></svg>';
var LEAF='<svg class="ki" viewBox="0 0 32 32"><path d="M27 5C14 5 6 11.5 6 20c0 2.7 1 4.7 1 4.7s2 1 4.7 1C22 25.7 27 18 27 5z" fill="#37d67a"/><path d="M8 25c3.5-6.5 8-10.5 13-13.5" fill="none" stroke="#0e4a2a" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/></svg>';
var CLOUD='<svg class="ki" viewBox="0 0 52 52"><path d="M14 40a9 9 0 0 1-1.5-17.8A11.500 11.500 0 0 1 34.500 19 8.500 8.500 0 0 1 35 40z" fill="#fff"/><text x="26" y="34" text-anchor="middle" font-size="11" font-weight="800" fill="#2a5fc0" font-family="Poppins,sans-serif">CO₂</text></svg>';
var COIN='<svg viewBox="0 0 42 42"><ellipse cx="21" cy="12" rx="13" ry="5.500" fill="#ffc23d"/><path d="M8 12v7c0 3 6 5.500 13 5.500S34 22 34 19v-7" fill="#f6a21e"/><path d="M8 20v7c0 3 6 5.500 13 5.500S34 30 34 27v-7" fill="#ee8a0c"/></svg>';
var SHIELD='<svg class="ic" viewBox="0 0 48 48"><path d="M24 4l17 6v12c0 11-7 18-17 22C14 40 7 33 7 22V10z" fill="#2a79f0"/><path d="M16 24l6 6 11-12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var LEAFI='<svg class="ic" viewBox="0 0 48 48"><path d="M42 7C22 7 9 17 9 31c0 4 1.500 7 1.500 7s3 1.500 7 1.500C34 39.500 42 28 42 7z" fill="#34c26a"/><path d="M12 38c5-10 12-16 20-21" fill="none" stroke="#fff" stroke-width="2.500" stroke-linecap="round"/></svg>';
var BARS='<svg class="ic" viewBox="0 0 62 62"><rect x="6" y="30" width="10" height="26" rx="3" fill="#2a79f0"/><rect x="21" y="16" width="10" height="40" rx="3" fill="#2a79f0"/><rect x="36" y="22" width="10" height="34" rx="3" fill="#6bb0ff"/><path d="M6 20l16-10 13 8 20-14" fill="none" stroke="#1b63e6" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var SCALE='<svg class="ic" viewBox="0 0 48 48" fill="none" stroke="#1b63e6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 8v32M14 40h20M10 14h28"/><path d="M10 14l-6 14h12zM38 14l-6 14h12z"/><circle cx="24" cy="8" r="2.500" fill="#1b63e6"/></svg>';
var THERM='<svg viewBox="0 0 36 42" fill="none" stroke="#2a79f0" stroke-width="2.600" stroke-linecap="round"><path d="M14 26V8a4 4 0 0 1 8 0v18a7 7 0 1 1-8 0z"/><path d="M18 14v14" stroke="#ef4444"/></svg>';
var DROP='<svg viewBox="0 0 36 42" fill="none" stroke="#2a79f0" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5C12 14 7 20 7 27a11 11 0 0 0 22 0C29 20 24 14 18 5z"/><path d="M13 28a5 5 0 0 0 5 5" stroke="#6bb0ff"/></svg>';
var CLK='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
var DOC='<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7M9 8h3"/></svg>';
var ZT={G:'양호',Y:'주의',O:'불량',R:'위험'},ENVT={C1:'매우 낮음',C2:'낮음',C3:'중간',C4:'높음',C5:'매우 높음',CX:'극심'},ENVC={C1:'#3fb86b',C2:'#3fb86b',C3:'#3fb86b',C4:'#f59e0b',C5:'#ef6a2a',CX:'#dc2626'};
function html(){
 var M=model(),C=cnt(),ok=M.ok,o=M.opt||[],b=ok?o[M.best]:null,o0=ok?o[0]:null;
 var cmpB=ok?(M.best==0?o[1]:o[M.best]):null;
 var nm=function(i){return LET[i]+'안 ('+(o[i]?o[i].nm:'')+')'},eok=function(v){return F1(v/1e5)+'억'};
 var logo='<div class="lh-logo">COAT ON<svg viewBox="0 0 150 44"><defs><linearGradient id="lhsw" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#cfe8ff"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><path d="M2 42C30 10 86 -4 148 10C96 10 46 18 2 42z" fill="url(#lhsw)"/></svg></div>';
 var h='<section class="lh-hero"><div class="lh-img"></div><div class="lh-sh"></div>'
 +'<div class="lh-top"><button class="lh-ib" data-go="bell" aria-label="알림">'+ic('bell','')+(ok&&M.zone&&(M.zone=='R'||M.zone=='O')?'<i></i>':'')+'</button><button class="lh-ib" data-go="set" aria-label="설정">'+ic('gear','')+'</button></div>'
 +logo+'<div class="lh-sub">Smart Coating Solution</div><h1>더 스마트한 진단,<br><em>더 가치있는 솔루션</em></h1></section>'
 +'<div class="lh-kpi"><button class="k k1" data-go="env">'+BLD+'<div><small>진단 대상 '+(ok?(M.a.t||'자산'):'자산')+'</small><b>'+(ok?esc(M.a.n):'미등록')+CH+'</b></div></button>'
 +'<div class="k k2">'+LEAF+'<div><small>LCC 절감효과</small><b>'+(ok?F1(Math.max(0,M.sv))+'<em>%</em>':'–')+'</b></div></div>'
 +'<div class="k k3">'+CLOUD+'<div><small>탄소저감 효과</small><b>'+(ok?F1(M.co)+'<em>tCO₂</em>':'–')+'</b></div></div></div>'
 +'<nav class="lxsb lh-st" aria-label="LCC 단계">'+[['환경개요','env'],['도막 결함','dg'],['ISO 사양추천','sp'],['비용분석','cmp'],['보수계획','rp']].map(function(t,i){return '<button type="button" data-go="'+t[1]+'"><i>'+(i+1)+'</i><span>'+t[0]+'</span></button>'}).join('')+'</nav>';
 /* LCC 분석 */
 h+='<section class="lh-card"><div class="lh-ch">'+BARS+'<div class="mtx"><h3>LCC 분석</h3><p>최적의 도장시스템을 제안합니다</p></div><button class="lh-more" data-go="lcc0">상세보기 '+CH+'</button></div><div class="lh-lcc"><div class="lh-lcc-w">'
 +(ok?'<div class="lh-ring">'+ring(M)+'<div class="ct"><small>최적안</small><b>'+LET[M.best]+'안</b><i>'+P('<path d="M5 12.5l4.5 4.5L19 7.5"/>')+'</i></div></div>'
  +'<div class="lh-lg">'+[0,1,2].map(function(i){return '<div style="--c:'+COL[i]+'"><b>'+nm(i)+'</b><b>'+F0(o[i].e)+'년 / '+eok(o[i].tot)+'</b>'+(i==M.best?'<u>추천</u>':'')+'</div>'}).join('')+'</div>'
  :'<div class="lh-ring">'+ring({opt:[{tot:1},{tot:1},{tot:1}]})+'<div class="ct"><small>최적안</small><b>–</b></div></div>')
 +'</div><div class="lh-sv"><div class="t">'+COIN+'LCC 절감 효과</div><div class="v">'+(ok?F1(Math.max(0,M.sv))+'<em>%</em>':'–')+'</div><div class="d">'+(ok?'▲ '+F1(Math.max(0,M.saved))+'억 절감':'자산을 등록하세요')+'</div>'+(ok?spark(M.ser):'')+'</div></div></section>';
 /* 현장 진단 / 환경 */
 var life=ok?Math.max(0,M.e0-M.age):0,pr=ok&&M.e0>0?Math.max(4,Math.min(100,life/M.e0*100)):0;
 var env=ok?M.env:'–',ec=ENVC[env]||'#3fb86b';
 h+='<div class="lh-two"><button class="lh-card" data-go="dg" style="text-align:left"><div class="lh-ch">'+SHIELD+'<div class="mtx"><h3>현장 진단 현황</h3></div><span class="ch">'+CH+'</span></div>'
 +'<div class="lh-dg">'+RUST+'<div><div class="rw"><span>부식등급</span><span class="or">'+(ok?esc(M.env):'–')+'</span></div><div class="rw"><span>도막상태</span><span>'+(ok?(ZT[M.zone]||'–'):'–')+'</span></div><div class="rw"><span>잔존수명</span><span>'+(ok?F1(life)+'년':'–')+'</span></div></div></div><div class="lh-bar"><i style="width:'+pr.toFixed(0)+'%"></i></div></button>'
 +'<button class="lh-card" data-go="env" style="text-align:left"><div class="lh-ch">'+LEAFI+'<div class="mtx"><h3>환경 분석</h3></div><span class="ch">'+CH+'</span></div>'
 +'<div class="lh-env" style="--ec:'+ec+'"><div class="rw"><div class="m">'+THERM+'<div><small>염분</small><b>'+(ok&&M.cl!=null?F1(+M.cl):'–')+'</b></div></div><div class="m">'+DROP+'<div><small>습도</small><b>'+(ok&&M.rh!=null?F0(+M.rh)+'%':'–')+'</b></div></div></div>'
 +'<div class="bd"><small>부식환경</small><b>'+(ok?(ENVT[env]||'–'):'–')+'</b><s>('+(ok?esc(env):'–')+'등급)</s></div>'+SKY
 +'<div class="lf">'+CLK+'예측 수명 <b>'+(ok?(Math.round(M.lmin)==Math.round(M.lmax)?F0(M.lmin):F0(M.lmin)+'~'+F0(M.lmax))+'년':'–')+'</b></div></div></button></div>';
 /* 사양 추천 및 비교 */
 var LC=[['#9fd0ff','#7cb9f5','#e8d9a8','#c9ab6d','#9b7a45'],['#a9b8f5','#8ea4ec','#e8d9a8','#c9ab6d','#9b7a45']];
 var opCard=function(x,cls,pill){return '<div class="lh-op '+cls+'"><span class="pl">'+LET[x.i]+'안 | '+esc(x.nm)+'</span><div class="bd">'+layers(LC[cls=='a'?0:1])+'<ul><li>수명 : '+F0(x.e)+'년</li><li>공사비 : '+eok(x.init)+' 원</li><li>LCC : '+eok(x.tot)+' 원</li><li>CO₂ : '+F0(x.co)+' t</li></ul></div>'+(pill?'<span class="lh-rb">추천</span>':'')+'</div>'};
 h+='<section class="lh-card"><div class="lh-ch">'+SCALE+'<div class="mtx"><h3 style="font-size:calc(var(--k)*28)">도장 사양 추천 및 비교</h3></div><button class="lh-more" style="background:none;padding:0" data-go="cmp">전체보기 '+CH+'</button></div>'
 +(ok?'<div class="lh-cmp">'+opCard(o0,'a',M.best==0)+opCard(cmpB,'b',cmpB.i==M.best)+'</div>':'<div class="lh-cmp" style="color:#3a4d73;font-weight:600;padding:calc(var(--k)*30)">자산을 등록하면 사양별 수명·공사비·LCC가 비교됩니다.</div>')+'</section>';
 h+='<div class="lh-ban">'+GLOBE+'<div class="mtx"><small>지속가능한 미래를 위한 선택</small><b>COAT ON이 함께합니다</b></div><button class="go" data-go="rp">'+DOC+'종합 보고서 보기 '+CH.replace('<svg','<svg class="c"')+'</button></div>';
 h+='<nav class="lh-nav"><button data-go="home">'+ic('home','')+'<span>홈</span></button><button data-go="calc">'+ic('calc','')+'<span>산출</span></button><button class="on" data-go="lcc0">'+ic('chart','')+'<span>분석</span></button><button data-go="db">'+ic('db','')+'<span>DB</span></button><button data-go="menu">'+ic('more','')+'<span>더보기</span></button></nav>';
 return h}
function esc(v){return String(v==null?'':v).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function lccTab(i){try{T(9);setTimeout(function(){try{LCCX.tab(i)}catch(e){}},30)}catch(e){}}
function go(k){try{
  if(k=='home')return T(2);
  if(k=='calc')return T(0);
  if(k=='db'){window.SYM='db';window.SYK=1;return T(3)}
  if(k=='lcc0')return lccTab(0);
  if(k=='env')return lccTab(1);
  if(k=='dg')return lccTab(2);
  if(k=='cmp')return lccTab(4);
  if(k=='rp')return lccTab(5);
  if(k=='set'&&typeof openSettings=='function')return openSettings();
  if(k=='bell'){var M=model();return tt(M.ok&&(M.zone=='R'||M.zone=='O')?'긴급 보수 대상이 있습니다 (R·O 등급)':'새 알림이 없습니다')}
  if(k=='menu'){var q=document.getElementById('qmb');if(q){q.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientY:0}));q.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,clientY:0}))}return}
 }catch(e){}}
function heroImg(){if(window.__mhp)return window.__mhp;var im='';
 try{for(var si=0;si<document.styleSheets.length&&!im;si++){var rs;try{rs=document.styleSheets[si].cssRules}catch(e){continue}for(var ri=0;ri<rs.length;ri++){var r=rs[ri];if(r.selectorText&&/\.lxh\b/.test(r.selectorText)&&r.style&&r.style.backgroundImage&&r.style.backgroundImage.indexOf('url(')>-1){var mm=r.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);if(mm){im=mm[1];break}}}}}catch(e){}
 if(im){window.__mhp=im;return im}

 try{var t=document.createElement('div');t.className='lxh';t.style.cssText='position:absolute;visibility:hidden;width:10px;height:10px';(document.getElementById('v9')||document.body).appendChild(t);var bg=getComputedStyle(t).backgroundImage;t.remove();var m=bg.match(/url\(["']?([^"')]+)["']?\)/);if(m)im=m[1]}catch(e){}
 if(!im){try{var hn=document.querySelector('#hx .hni');var bi=hn?getComputedStyle(hn).backgroundImage:'';var m2=bi.match(/url\(["']?([^"')]+)["']?\)/);if(m2)im=m2[1]}catch(e){}}
 if(im)window.__mhp=im;return im}
function lhK(){var m=document.getElementById('lhd');if(m&&m.clientWidth)m.style.setProperty('--k',(m.clientWidth/852)+'px')}
window.addEventListener('resize',lhK);
window.lhRender=function(){var m=document.getElementById('lhd');if(!m)return;lhK();m.innerHTML=html();lhK();var im=heroImg();if(im){var d=m.querySelector('.lh-img');if(d)d.style.backgroundImage='url("'+im+'")'}};

var busy=false,last=0;
function mount(){var v=document.getElementById('v9');if(!v)return;
 var on=document.body.dataset.pg=='9'&&window.LCCX&&LCCX.get&&LCCX.get().tab==0;
 if(!on){v.classList.remove('lcd-on');return}
 var d=document.getElementById('lhd');
 if(!d){d=document.createElement('div');d.id='lhd';d.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(b){try{navigator.vibrate&&navigator.vibrate(10)}catch(x){}go(b.getAttribute('data-go'))}})}
 v.classList.add('lcd-on');
 if(d.parentNode!==v){v.appendChild(d);last=0}
 var n=Date.now();if(n-last>80){last=n;lhRender()}
}
(function(){var v=document.getElementById('v9');if(!v)return;
 new MutationObserver(function(){if(busy)return;busy=true;try{mount()}catch(e){}busy=false}).observe(v,{childList:true});
 try{new MutationObserver(function(){mount()}).observe(v,{attributes:true,attributeFilter:['hidden']})}catch(e){}
 window.addEventListener('resize',function(){lhK()});
 setTimeout(mount,300);
})();
})();
