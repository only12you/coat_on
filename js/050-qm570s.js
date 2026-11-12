(function(){
const P=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
const G=[['산출',[['home','홈','<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.8V20h13V9.8"/>'],['calc','일위대가표','<rect x="3.5" y="4.5" width="17" height="15" rx="2.6"/><path d="M3.5 9.8h17M3.5 14.8h17M9.3 9.8v9.7"/>'],['sys','도장시스템','<rect x="3.5" y="3.5" width="14" height="6" rx="1.8"/><path d="M17.5 6.5H20v5.5h-8v3"/><rect x="10" y="15" width="4" height="6" rx="1.2"/>'],['quote','견적서','<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/>'],['fill','실란트','<path d="M4 15l8-10 5 4-8 10z"/><path d="M13 4l3-2 5 4-2 3"/>'],['mesh','메쉬','<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16"/>']]],
['분석',[['hq','공동주택','<rect x="3.5" y="9" width="7" height="12" rx="1"/><rect x="10.5" y="3" width="10" height="18" rx="1"/>'],['lcc','LCC','<circle cx="12" cy="12" r="9"/><path d="M7 9.5l2 6 3-5 3 5 2-6"/>'],['area','면적','<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8.5 15.5l7-7M11.5 8.5h4v4"/>'],['cmp','제품 비교','<rect x="3.5" y="4" width="7" height="16" rx="1.6"/><rect x="13.5" y="4" width="7" height="16" rx="1.6"/>']]],
['DB',[['db','제품 DB','<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>'],['spdb','사양 DB','<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'],['aptdb','단지 DB','<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>'],['pum','노무비 설정','<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c0-3.6 3-6 6.5-6"/><circle cx="17.5" cy="16.5" r="2"/>'],['backup','백업·복원','<path d="M7 18a4 4 0 0 1-.6-7.9A5.5 5.5 0 0 1 17 8.7 4.7 4.7 0 0 1 17.5 18z"/>']]]];
function mk(){
 if(document.getElementById('qmb'))return;
 const b=document.createElement('button');b.id='qmb';b.type='button';b.setAttribute('aria-label','더보기');b.title='더보기';
 b.innerHTML=P('<circle cx="7" cy="7" r="1.6"/><circle cx="17" cy="7" r="1.6"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>');
 const o=document.createElement('div');o.id='qmo';o.hidden=true;
 o.addEventListener('click',e=>{if(e.target===o)close()});
 document.body.append(b,o);
 try{const y=localStorage.getItem('qm570y');if(y)b.style.setProperty('--qy',y)}catch(e){}
 let d=null;
 b.addEventListener('pointerdown',e=>{d={y:e.clientY,m:0,bt:parseFloat(getComputedStyle(b).bottom)};try{b.setPointerCapture(e.pointerId)}catch(x){}});
 b.addEventListener('pointermove',e=>{if(!d)return;const dy=e.clientY-d.y;if(Math.abs(dy)>6)d.m=1;if(d.m){let v=Math.min(innerHeight-70,Math.max(70,d.bt-dy));b.style.setProperty('--qy',v+'px')}});
 b.addEventListener('pointerup',()=>{if(!d)return;const m=d.m;d=null;if(m){try{localStorage.setItem('qm570y',b.style.getPropertyValue('--qy'))}catch(e){}return}if(document.getElementById('gsub')){try{navSubClose()}catch(e){}return}if(document.getElementById('qmo').hidden)open();else close()});
}
const CT=[['home','홈',G[0][1][0][2],[]],
['calc','산출','<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',G[0][1].slice(1)],
['ana','분석','<path d="M5 20V11M10 20V4M15 20v-9M20 20v-5"/>',G[1][1]],
['db','DB','<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',G[2][1].filter(x=>x[0]!='backup')],
['adm','관리','<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',[G[2][1].find(x=>x[0]=='backup'),['settings','설정','<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/>'],['help','사용법','<path d="M12 6c-2-1.5-5-1.5-8 0v13c3-1.5 6-1.5 8 0 2-1.5 5-1.5 8 0V6c-3-1.5-6-1.5-8 0zM12 6v13"/>'],['legal','자료이용안내','<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6h.01"/>'],['info','정보','<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>'],['mat','자재정보','<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M10 10v10"/>'],['act','Activity Report','<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h3"/>']]]];
const XI=P('<path d="M6 6l12 12M18 6L6 18"/>'),MI=P('<circle cx="7" cy="7" r="1.6"/><circle cx="17" cy="7" r="1.6"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>');
let OPN='';
function close(){const o=document.getElementById('qmo'),b=document.getElementById('qmb');o.hidden=true;b.innerHTML=MI;b.classList.remove('x');OPN=''}
function draw(){
 const o=document.getElementById('qmo'),b=document.getElementById('qmb'),r=b.getBoundingClientRect();let cur='';try{cur=(window.NAV&&NAV.cur)||''}catch(e){}
 const own=CT.find(c=>c[3].some(x=>x[0]==cur));
 const dn=r.top+r.height/2<innerHeight/2;
 o.innerHTML='<div class="qmp" style="'+(dn?'top:'+(r.bottom+8)+'px;max-height:'+(innerHeight-r.bottom-16)+'px':'bottom:'+(innerHeight-r.top+8)+'px;max-height:'+(r.top-16)+'px')+'">'+CT.map(c=>{const on=OPN==c[0],act=(own&&own[0]==c[0])||(c[0]=='home'&&cur=='home');return '<div class="qmc'+(on?' op':'')+'"><button type="button" class="qct'+(act?' on':'')+'" data-c="'+c[0]+'">'+P(c[2])+'<span>'+c[1]+'</span>'+(c[3].length?'<i>›</i>':'')+'</button>'+(on?'<div class="qsub">'+c[3].map(x=>'<button type="button" data-id="'+x[0]+'"'+(x[0]==cur?' class="on"':'')+'>'+P(x[2])+'<span>'+x[1]+'</span></button>').join('')+'</div>':'')+'</div>'}).join('')+'</div>';
 o.querySelectorAll('.qct').forEach(x=>x.onclick=()=>{const c=CT.find(y=>y[0]==x.dataset.c);if(!c[3].length){close();try{navGo(c[0])}catch(e){console.error(e)}return}const fr=b.getBoundingClientRect();close();try{navSub(c[0]);const gp=document.querySelector('#gsub .gsp');if(gp&&fr.top>innerHeight*.45)gp.style.setProperty('bottom',(innerHeight-fr.top+10)+'px','important')}catch(e){console.error(e)}});
 o.querySelectorAll('.qsub button').forEach(x=>x.onclick=()=>{close();try{navGo(x.dataset.id)}catch(e){console.error(e)}})}
function open(){const o=document.getElementById('qmo'),b=document.getElementById('qmb');b.innerHTML=XI;b.classList.add('x');OPN='';o.hidden=false;draw()}
if(document.readyState!='loading')mk();else document.addEventListener('DOMContentLoaded',mk);
})();
