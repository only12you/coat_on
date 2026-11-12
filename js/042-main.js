function rdOpen(){try{const o=document.getElementById('rdm');if(o)o.remove();const e=document.createElement('div');e.id='rdm';
e.innerHTML='<div class="rdms" role="dialog" aria-modal="true"><div class="rdmh"><b>세부 내역</b><button type="button" class="rdmx" aria-label="닫기" onclick="rdClose()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><div class="rdmb">'+rdHTML()+'</div></div>';
e.addEventListener('click',ev=>{if(ev.target===e)rdClose()});document.body.appendChild(e)}catch(x){tt('세부 내역을 열지 못했습니다')}}
function rdClose(){const o=document.getElementById('rdm');if(o)o.remove()}
document.addEventListener('keydown',e=>{if(e.key==='Escape')rdClose()});
