(function(){
function place(i,j){try{const b=syEdSgBox(i,j);if(!b||b.hidden)return;
 const row=b.previousElementSibling&&b.previousElementSibling.classList.contains('se-r')?b.previousElementSibling:(b.parentElement.querySelector('.se-r')||b);
 const r=row.getBoundingClientRect(),vv=window.visualViewport,vt=vv?vv.offsetTop:0,vh=vv?vv.height:innerHeight;
 b.classList.add('fx');b.style.left=r.left+'px';b.style.width=r.width+'px';b.style.maxHeight='187px';
 const h=Math.min(b.scrollHeight+2,187),below=vt+vh-r.bottom-8,above=r.top-vt-8;
 let up=below<h&&above>below,mh=Math.min(187,Math.max(70,up?above:below));
 b.style.maxHeight=mh+'px';const hh=Math.min(b.scrollHeight+2,mh);
 b.style.top=(up?Math.max(vt+4,r.top-hh-2):r.bottom+2)+'px'}catch(e){}}
const g=window.syEdSg;if(typeof g!='function')return;
window.syEdSg=function(i,j,v){g(i,j,v);place(i,j)};
const re=()=>document.querySelectorAll('#syed .se-sg:not([hidden])').forEach(b=>{const m=/se-sg(\d+)_(m|\d+)/.exec(b.id);if(m)place(+m[1],m[2]=='m'?-1:+m[2])});
if(window.visualViewport){visualViewport.addEventListener('resize',re);visualViewport.addEventListener('scroll',re)}
document.addEventListener('scroll',re,true);
})();
