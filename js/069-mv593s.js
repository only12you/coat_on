(function(){var busy=0;function mv(){if(busy)return;busy=1;try{var h=document.getElementById('hq');if(!h){busy=0;return}
 var q=h.querySelector('.aph .axq'),sg=h.querySelector('.sxseg');if(q&&sg)sg.appendChild(q);
 var s=h.querySelector('.aph .axs'),bar=h.querySelector('#hqbar');if(s&&bar)bar.appendChild(s)}catch(e){}busy=0}
try{new MutationObserver(mv).observe(document.body,{childList:true,subtree:true})}catch(e){}mv()})();
