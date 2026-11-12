window.syRegMenu=function(btn){const o=document.getElementById('lbrg');if(o){o.remove();return}
 const r=btn.getBoundingClientRect(),m=document.createElement('div');m.id='lbrg';
 const it=[['일괄','PDF 여러 개를 한 번에 등록','syImpBulkPick()','<path d="M5 8v13h11"/><path d="M8 3h6l4 4v10H8z"/><path d="M13 9v6M10 12h6"/>'],['개별','PDF를 한 개씩 등록','syImpPick()','<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M12 18v-6M9.5 14.5 12 12l2.5 2.5"/>'],['사용자','직접 입력해서 등록','syEdOpen(-1)','<circle cx="10" cy="8" r="3.4"/><path d="M3.5 20c.5-3.6 3.2-5.8 6.5-5.8s6 2.2 6.5 5.8M19 8v6M16 11h6"/>']];
 m.innerHTML=it.map(([t,d,f,ic])=>'<button type="button" data-f="'+f+'"><span class="rgi">'+SV(ic)+'</span><span class="rgt"><b>'+t+'</b><small>'+d+'</small></span></button>').join('');
 m.style.cssText='position:fixed;z-index:2147483300;bottom:'+(innerHeight-r.top+8)+'px;left:'+Math.max(8,Math.min(r.left,innerWidth-236))+'px';
 m.onclick=e=>{const b=e.target.closest('button');if(!b)return;m.remove();try{new Function(b.dataset.f)()}catch(x){console.error(x)}};
 document.body.append(m);
 setTimeout(()=>{const off=e=>{if(!m.contains(e.target)){m.remove();document.removeEventListener('pointerdown',off,true)}};document.addEventListener('pointerdown',off,true)},0)};
