(function(){
var SCOPE=['body'];
var FS=[10,11.5,13,16,20,28];
function snapF(f){return f<=10.7?10:f<=12.25?11.5:f<=14.5?13:f<=18?16:f<=24?20:28}
function snapW(w,f){w=+w||400;return w<=500?400:w<=700?(f>=16?800:600):800}
function norm(root){
 var all=[].slice.call(root.querySelectorAll('*'));if(root!==document.body)all.unshift(root);
 for(var i=0;i<all.length;i++){var e=all[i];if(e.__sn||e.closest('svg')&&e.tagName!='svg'||e.closest('#v0,#saw'))continue;var tg=e.tagName;
  if(/^(INPUT|SELECT|TEXTAREA)$/.test(tg))continue;
  if(/^(SCRIPT|STYLE|OPTION|SVG|PATH|BR|IMG)$/i.test(tg))continue;
  var r=e.getBoundingClientRect();if(r.width<1||r.height<1)continue;e.__sn=1;
  var own=false;for(var c=e.firstChild;c;c=c.nextSibling){if(c.nodeType==3&&c.nodeValue.trim()){own=true;break}}
  var cs=getComputedStyle(e);
  if(own){var f=parseFloat(cs.fontSize),t=snapF(f);
   if(Math.abs(f-t)>.05)e.classList.add('std-f'+(t==11.5?'115':t));
   var w=snapW(cs.fontWeight,t);if(String(w)!=cs.fontWeight)e.classList.add('std-w'+(w==400?4:w==600?6:8))}
  if((tg=='BUTTON'||e.getAttribute('role')=='button')&&(e.textContent||'').trim().length>0){var h=r.height;
   if(h>=17&&h<=70&&r.width>=36&&cs.borderTopLeftRadius.indexOf('%')<0&&!(h<=34&&r.width<=40)){
    var k=e.closest('.h-tabs')?46:h<=29?24:h<=31?30:h<=43?38:48;if(e.scrollHeight>k+2)continue;e.classList.add('std-b'+k)}}
 }}
var q=0;function run(){q=0;SCOPE.forEach(function(s){var r=document.querySelector(s);if(r){if(!r.hasAttribute('data-std'))r.setAttribute('data-std','1');norm(r)}})}
function sched(){if(q)return;q=setTimeout(run,90)}
/* 새로 생긴 요소는 첫 화면 그리기 전(마이크로태스크)에 바로 표준화 → 열린 뒤 커졌다 작아지는 깜빡임 방지 */
function nowAdded(list){for(var i=0;i<list.length;i++){var m=list[i];for(var j=0;j<m.addedNodes.length;j++){var n=m.addedNodes[j];if(n.nodeType!=1||n.closest('#v0,#saw'))continue;try{norm(n)}catch(e){}}}}
try{new MutationObserver(function(l){nowAdded(l);sched()}).observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}
/* 숨겨져 있던 화면이 나타날 때(class·style·hidden 변경)도 그리기 전에 표준화 */
try{new MutationObserver(function(l){var seen=[];for(var i=0;i<l.length;i++){var t=l[i].target;if(!t||t.nodeType!=1||t===document.documentElement||seen.indexOf(t)>=0||t.closest('#v0,#saw'))continue;seen.push(t)}
 if(seen.indexOf(document.body)>=0)seen=[document.body];
 seen.slice(0,40).forEach(function(t){try{norm(t)}catch(e){}})}).observe(document.body,{attributes:true,subtree:true,attributeFilter:['style','hidden','class','data-pg','open','aria-hidden']})}catch(e){}
document.addEventListener('transitionend',sched,true);sched();
window.stdRun=run})();
