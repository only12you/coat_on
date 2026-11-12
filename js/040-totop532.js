/* v532 상단 좌우 여백 탭 → 맨 위로 빠르게 스크롤 (스크롤이 내려가 있을 때만 활성) */
(function(){
 const L=document.createElement('div'),R=document.createElement('div');
 [L,R].forEach((e,i)=>{e.className='tt532 '+(i?'r':'l');e.setAttribute('aria-hidden','true');document.body.appendChild(e)});
 let cur=null;
 const top=el=>el===document||el===document.documentElement||el===document.body||!el||el===window?Math.max(window.scrollY||0,document.documentElement.scrollTop||0,document.body.scrollTop||0):el.scrollTop;
 const upd=()=>{const on=!!cur&&(cur===window||cur.isConnected!==false)&&top(cur)>140;L.classList.toggle('on',on);R.classList.toggle('on',on)};
 document.addEventListener('scroll',e=>{let t=e.target;if(t===document||t===document.documentElement||t===document.body)t=window;cur=t;upd()},true);
 const go=e=>{e.preventDefault();e.stopPropagation();const t=cur;if(!t)return;try{if(t===window)window.scrollTo({top:0,behavior:'smooth'});else t.scrollTo({top:0,behavior:'smooth'})}catch(_){try{t===window?window.scrollTo(0,0):t.scrollTop=0}catch(__){}}};
 [L,R].forEach(e=>{e.addEventListener('click',go);e.addEventListener('touchend',ev=>{if(e.classList.contains('on'))go(ev)},{passive:false})});
 setInterval(upd,600);
})();
