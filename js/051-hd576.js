(function(){
let D=null;
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.sy-hdl');if(!b)return;e.preventDefault();D={i:+b.dataset.i,y:e.clientY,id:e.pointerId};b.classList.add('drag');try{document.body.style.userSelect='none'}catch(x){}},true);
document.addEventListener('pointermove',e=>{if(!D)return;const dy=e.clientY-D.y,T=46;if(Math.abs(dy)<T)return;const d=dy>0?1:-1;D.y=e.clientY;try{const before=SY.act;syMvL(D.i,d);if(SY.act!==D.i){D.i=SY.act}}catch(x){console.error(x)}},true);
const end=()=>{if(!D)return;D=null;document.body.style.userSelect='';document.querySelectorAll('.sy-hdl.drag').forEach(b=>b.classList.remove('drag'))};
document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true);
})();
