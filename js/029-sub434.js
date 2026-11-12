(function(){const ids=['calc','ana','db','adm'];let n=0;
function cp(){const g=document.getElementById('gnav');if(!g)return false;const cs=getComputedStyle(g);let ok=0;ids.forEach(id=>{const k='--art-'+id,v=(g.style.getPropertyValue(k)||cs.getPropertyValue(k)||'').trim();if(v){document.documentElement.style.setProperty(k,v);ok++}});return ok==ids.length}
const t=setInterval(()=>{if(cp()||++n>20)clearInterval(t)},300);
})();
