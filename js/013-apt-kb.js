(function(){
const NUM=e=>e&&e.tagName=='INPUT'&&(e.type=='number'||/^(numeric|decimal)$/.test(e.getAttribute('inputmode')||''));
const st=document.createElement('style');st.textContent='html body.aptkb #hq .apbar,html body.aptkb #hq .apbar:not(#_a){display:none!important}';document.head.appendChild(st);
let bar,t0;
function mk(){if(bar)return bar;bar=document.createElement('div');bar.id='aptkbd';bar.style.cssText='position:fixed;left:0;right:0;bottom:0;height:46px;display:none;justify-content:flex-end;align-items:center;padding:0 12px;background:#f3f6fb;border-top:1px solid #d5dbe8;z-index:2147483647';const b=document.createElement('button');b.type='button';b.textContent='완료';b.style.cssText='border:0;border-radius:10px;background:#2f6fe0;color:#fff;font:700 16px system-ui,sans-serif;padding:8px 24px;width:auto';b.addEventListener('pointerdown',e=>e.preventDefault());b.addEventListener('mousedown',e=>e.preventDefault());b.addEventListener('click',()=>{const a=document.activeElement;if(a&&a.blur)a.blur()});bar.appendChild(b);document.body.appendChild(bar);return bar}
function place(){if(!bar)return;const v=window.visualViewport;bar.style.bottom=(v?Math.max(0,window.innerHeight-(v.height+v.offsetTop)):0)+'px'}
document.addEventListener('focusin',e=>{const el=e.target;if(!NUM(el))return;if(!el.getAttribute('inputmode'))el.setAttribute('inputmode',(el.step&&el.step!='1')?'decimal':'numeric');el.setAttribute('enterkeyhint','done');clearTimeout(t0);document.body.classList.add('aptkb');setTimeout(()=>{try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(x){}},300)});
document.addEventListener('focusout',e=>{if(!NUM(e.target))return;t0=setTimeout(()=>{if(!NUM(document.activeElement)){document.body.classList.remove('aptkb');if(bar)bar.style.display='none'}},120)});
document.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const el=e.target;if(el&&el.tagName=='INPUT'&&!/^(checkbox|radio|button|submit|file)$/.test(el.type)){e.preventDefault();el.blur()}},true);
if(window.visualViewport){visualViewport.addEventListener('resize',place);visualViewport.addEventListener('scroll',place)}
})();
