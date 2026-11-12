(function(){
const K=1.2;
function scale(){const v=document.getElementById('v9');if(!v||!document.body.classList.contains('lccrpt')||document.body.dataset.pg!='9')return;
 const L=[];v.querySelectorAll('*').forEach(e=>{if(e.dataset.fz||/^(SCRIPT|STYLE|IMG|PATH|CIRCLE|RECT|LINE|G|DEFS)$/i.test(e.tagName))return;
  let own=false;for(const n of e.childNodes)if(n.nodeType==3&&n.nodeValue.trim()){own=true;break}
  if(!own)return;L.push([e,parseFloat(getComputedStyle(e).fontSize)])});
 L.forEach(([e,f])=>{if(!(f>0))return;e.dataset.fz=f;e.style.setProperty('font-size',(f*K).toFixed(2)+'px','important')});
 /* 칸을 넘치는 글자는 20% 확대 안에서 필요한 만큼만 줄임(최소 원래 크기) */
 L.forEach(([e,f])=>{if(!(f>0))return;let k=K,n=0;const bad=()=>{const p=e.parentElement;if(!p)return false;const r=e.getBoundingClientRect(),q=p.getBoundingClientRect();return e.scrollWidth>e.clientWidth+1||(r.width>0&&(r.right>q.right+1||r.left<q.left-1))||p.scrollWidth>p.clientWidth+2||(p.parentElement&&p.parentElement.scrollWidth>p.parentElement.clientWidth+2)};
  while(n<10&&k>1.001&&bad()){k=Math.max(1,k-.025);e.style.setProperty('font-size',(f*k).toFixed(2)+'px','important');n++}})}
let t=0;const q=()=>{clearTimeout(t);t=setTimeout(scale,60)};
try{new MutationObserver(q).observe(document.getElementById('v9'),{childList:true,subtree:true})}catch(e){}
document.addEventListener('DOMContentLoaded',q);setTimeout(q,600);
})();
