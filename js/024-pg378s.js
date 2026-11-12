(function(){
const OPT=[['fill','실란트'],['mesh','메쉬'],['hist','작업 내역'],['ap','도장면적'],['hq','공동'],['lcc','LCC'],['cmp','제품 비교']];
let pl=null;
function mk(){if(pl&&document.body.contains(pl))return pl;pl=document.createElement('select');pl.id='pgp';pl.className='scpill';pl.innerHTML=OPT.map(o=>'<option value="'+o[0]+'">'+o[1]+'</option>').join('');
 pl.onchange=function(){const v=this.value;try{
  if(v=='fill'||v=='mesh'||v=='hist'){apClose();hqClose();const e=document.getElementById('v8');if(e&&e.hidden)T(8);fmTab(v)}
  else if(v=='ap'){hqClose();apOpen()}
  else if(v=='hq'){apClose();hqOpen()}
  else if(v=='lcc'){apClose();hqClose();T(9)}
  else if(v=='cmp'){apClose();hqClose();T(10)}
 }catch(x){}};document.body.appendChild(pl);return pl}
function tick(){try{
 const ap=document.getElementById('ap'),hq=document.getElementById('hq'),v8=document.getElementById('v8'),v9=document.getElementById('v9'),v10=document.getElementById('v10');
 let cur=null,tEl=null;
 if(ap){cur='ap';tEl=ap.querySelector('.aph b')}else if(hq){cur='hq';tEl=hq.querySelector('.aph b')}
 else if(v8&&!v8.hidden){cur=(typeof FM!='undefined'&&FM&&FM.tab)||'fill';tEl=document.getElementById('ttl')}
 else if(v9&&!v9.hidden){cur='lcc';tEl=document.getElementById('ttl')}
 else if(v10&&!v10.hidden){cur='cmp';tEl=document.getElementById('ttl')}
 const s=mk();
 if(!cur||!tEl){s.style.display='none';return}
 s.style.display='';if(s.value!==cur)s.value=cur;
 const U=Math.min(window.innerWidth,560)/852,off=Math.max(0,(window.innerWidth-560)/2);
 let top=Math.round(U*114),L=null;
 if(cur=='fill'||cur=='mesh'||cur=='hist'){const rg=document.createRange();rg.selectNodeContents(tEl);const r=rg.getBoundingClientRect(),h=s.offsetHeight||30,w=s.offsetWidth||96;L=r.right+10;const mx=window.innerWidth-w-8;if(L>mx)L=mx;L=L+(mx-L)*0.5;top=Math.round(r.top+r.height/2-h/2)}
 if(L==null)L=window.innerWidth-(s.offsetWidth||96)-off-Math.round(U*52);
 s.style.setProperty('right','auto','important');s.style.setProperty('left',Math.round(L)+'px','important');s.style.setProperty('top',top+'px','important');s.style.setProperty('border-radius','999px','important');s.style.setProperty('z-index','400','important');
}catch(e){}}
setInterval(tick,250);window.addEventListener('load',tick);
})();
