(function(){var SK="pq:splash",d=document,e;function ok(){try{return sessionStorage.getItem(SK)==="1"}catch(x){return false}}
function hide(go){e=d.getElementById("splash");if(!e)return;e.classList.add("hide");try{sessionStorage.setItem(SK,"1")}catch(x){}setTimeout(function(){e.style.display="none"},400);if(go!==false){try{if(window.navGo)navGo("home");else T(2)}catch(x){try{T(2)}catch(y){}}}}
window.splashOpen=function(){e=d.getElementById("splash");if(!e)return;e.style.display="";void e.offsetWidth;e.classList.remove("hide")};
window.splashHide=hide;
function init(){e=d.getElementById("splash");if(!e)return;if(ok()){e.style.display="none";return}
d.getElementById("spBtn").onclick=function(){hide(true)};d.addEventListener("keydown",function(ev){if(e.style.display!=="none"&&!e.classList.contains("hide")&&(ev.key==="Enter"||ev.key===" "||ev.key==="Escape")){ev.preventDefault();hide(true)}})}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",init);else init()})();
