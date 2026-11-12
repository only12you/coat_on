(function(){
 var vv=window.visualViewport,R=document.documentElement,B=document.body;
 function inF(e){return e&&e.tagName&&/^(INPUT|SELECT|TEXTAREA)$/.test(e.tagName)&&e.closest&&e.closest('#v8')}
 function top(){var h=document.getElementById('hx');if(h&&h.offsetParent!==null&&h.offsetHeight)R.style.setProperty('--scTop',h.offsetHeight+'px')}
 function sync(){top();var t=vv?Math.max(0,Math.round(vv.offsetTop||0)):0;R.style.setProperty('--vvt',t+'px')}
 function band(){var nav=document.querySelector('#v8 .scnav'),hx=document.getElementById('hx'),t=vv?vv.offsetTop:0,H=vv?vv.height:innerHeight;
  var hb=Math.max(nav?nav.getBoundingClientRect().bottom:0,hx?hx.getBoundingClientRect().bottom:0);return {t:t,H:H,hb:hb}}
 var done=null;
 function fitIn(force){var e=document.activeElement;if(!inF(e))return;if(done===e&&!force)return;var b=band(),r=e.getBoundingClientRect();
  if(r.top<b.hb+8||r.bottom>b.t+b.H-12){var dy=r.top-(b.hb+46);if(Math.abs(dy)>4)window.scrollBy({top:dy,left:0,behavior:'instant'})}
  done=e}
 document.addEventListener('focusin',function(ev){if(!inF(ev.target))return;B.classList.add('fmkb');done=null;sync();
  clearTimeout(fitIn._a);clearTimeout(fitIn._b);fitIn._a=setTimeout(function(){sync();fitIn()},380);fitIn._b=setTimeout(function(){sync();fitIn()},800)});
 document.addEventListener('focusout',function(ev){if(!inF(ev.target))return;setTimeout(function(){if(!inF(document.activeElement)){B.classList.remove('fmkb');done=null;R.style.setProperty('--vvt','0px')}},260)});
 if(vv){var q;['resize','scroll'].forEach(function(n){vv.addEventListener(n,function(){sync();if(n=='resize'){clearTimeout(q);q=setTimeout(function(){fitIn(true)},200)}})})}
 addEventListener('resize',top);new MutationObserver(function(){clearTimeout(top._t);top._t=setTimeout(top,50)}).observe(document.getElementById('app')||B,{attributes:true,attributeFilter:['hidden']});
 top();
 /* 입력할 때 미리보기·결과를 다시 그려도 화면 높이가 줄지 않도록 고정 → 화면이 위로 튕기지 않음 */
 window.fmPvDraw=function(){var p=document.getElementById('fpv');if(!p||typeof FM=='undefined'||FM.tab!='fill')return;var n=fmPrev();if(p._s===n)return;
  var h=Math.ceil(p.getBoundingClientRect().height);if(h>(p._mh||0))p._mh=h;p.style.minHeight=(p._mh||0)+'px';p.innerHTML=n;p._s=n};
 window.fmAct=function(i){if(FM.fpi!==i){FM.fpi=i;fmPvDraw()}};
 window.fmOut=function(){var y=window.scrollY,o=document.getElementById('scR'),ix=-1;
  try{var ae=document.activeElement;if(o&&ae&&ae.tagName=='INPUT'&&o.contains(ae))ix=Array.prototype.indexOf.call(o.querySelectorAll('input'),ae)}catch(e){}
  if(o){var h=Math.ceil(o.getBoundingClientRect().height);o.style.minHeight=h+'px';o.innerHTML=FM.tab=='fill'?outFill():outMesh();
   if(ix>=0){try{var nn=o.querySelectorAll('input')[ix];if(nn){var vv0=nn.value;nn.focus({preventScroll:true});nn.value='';nn.value=vv0}}catch(e){}}
   requestAnimationFrame(function(){requestAnimationFrame(function(){o.style.minHeight=''})})}
  fmPvDraw();
  if(Math.abs(window.scrollY-y)>1)window.scrollTo({top:y,left:0,behavior:'instant'})};
})();
