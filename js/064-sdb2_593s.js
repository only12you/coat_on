(function(){var busy=0;function fx(){if(busy)return;busy=1;try{var root=document.getElementById('sylib');if(!root)return;
root.querySelectorAll('.lb-c').forEach(function(c){var t=c.querySelector('.tkp'),g=c.querySelector('.lb-tgs');if(t&&g&&!g.querySelector('.tkp2')){var k=document.createElement('span');k.className='tkp2';k.textContent=t.textContent;g.insertBefore(k,g.firstChild);t.style.display='none'}});
var c0=root.querySelector('.lb-c'),cb=document.getElementById('cpbar');
if(c0&&cb){var h=c0.getBoundingClientRect().height;if(h>20)cb.style.height=h+'px';
var nm=c0.querySelector('.lb-nm'),b=cb.querySelector('.cpt b'),sm=cb.querySelector('.cpt small');
if(nm&&b){var fs=getComputedStyle(nm);b.style.setProperty('font-size',fs.fontSize,'important');b.style.setProperty('font-weight',fs.fontWeight,'important')}
if(sm){var f2=getComputedStyle(c0.querySelector('.lb-tgs>span.cc')||c0.querySelector('.lb-tgs>span')||sm);var base=parseFloat(f2.fontSize)||9;sm.style.setProperty('font-size',(base*1.05).toFixed(2)+'px','important')}}
}catch(e){}finally{busy=0}}
try{new MutationObserver(function(){setTimeout(fx,30)}).observe(document.body,{childList:true,subtree:true})}catch(e){}fx()})()
