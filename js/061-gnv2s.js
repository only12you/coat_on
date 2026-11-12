(function(){
var I={home:'<path d="M3.5 11L12 4l8.5 7"/><path d="M6 10v10h4.5v-5.5h3V20H18V10"/>',calc:'<rect x="5" y="3" width="14" height="18" rx="2.6"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>',chart:'<path d="M4 20V11M9 20V6M14 20v-6"/><circle cx="17" cy="14" r="3.2"/><path d="M19.4 16.4L21.5 18.5"/>',db:'<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/>',more:'<circle cx="5.5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18.5" cy="12" r="1.6"/>'};
var B=[['home','홈'],['calc','산출'],['chart','분석'],['db','DB'],['more','더보기']];
function mk(){var n=document.getElementById('gnv2');if(n)return n;n=document.createElement('nav');n.id='gnv2';n.setAttribute('aria-label','하단 메뉴');
 n.innerHTML=B.map(function(b){return '<button type="button" data-g="'+b[0]+'"><svg viewBox="0 0 24 24">'+I[b[0]]+'</svg><span>'+b[1]+'</span></button>'}).join('');
 n.addEventListener('click',function(e){var b=e.target.closest('[data-g]');if(!b)return;var k=b.getAttribute('data-g');try{navigator.vibrate&&navigator.vibrate(10)}catch(x){}
  try{if(k=='home'){try{window.navSubClose&&navSubClose()}catch(x){}try{hqdClose()}catch(x){}if(window.navHome)navHome();else T(2)}else{var cid={calc:'calc',chart:'ana',db:'db',more:'adm'}[k];if(window.navSub){navSub(cid);setTimeout(hh,0)}}}catch(x){}});
 document.body.appendChild(n);return n}
function mark(){var n=mk(),pg=document.body.dataset.pg,k={'2':'home','0':'calc','8':'calc','9':'chart','10':'chart','1':'db','4':'db','5':'db','7':'more'}[pg]||(pg=='3'?(window.SYM=='db'?'db':'calc'):'');
 n.querySelectorAll('[data-g]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-g')==k)})}
function hh(){var n=mk();try{document.documentElement.style.setProperty('--gnh',n.offsetHeight+'px')}catch(e){}}
mk();mark();hh();window.addEventListener('resize',hh);
new MutationObserver(function(){mark();hh()}).observe(document.body,{attributes:true,attributeFilter:['data-pg','class']});
setInterval(function(){mark();hh()},400);
})();
