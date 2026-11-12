(function(){
var KC=function(l){return l=='하도'?'k1':l=='중도'?'k2':l=='상도'?'k3':/실러/.test(l)?'k4':'k0'};
var KS=['cnt','mth','thin','mix','rc','th','pot','svr'];
function vals(p,c){var o={},d=+c.dft||+p.dft||0,sv=+p.svr||0;
 if(p.mth)o.mth=p.mth;
 if(+p.tr>0)o.thin='≤'+Math.round(p.tr*1000)/10+'%';
 if(p.mixt&&!/^\s*$/.test(p.mixt))o.mix=p.mixt;
 var rc=p.rc||p.nxt;if(rc)o.rc=rc;
 if(sv&&d)o.th=(Math.round(d/(sv*10)*100)/100).toFixed(2)+' L/㎡';else if(+p.th&&+p.th>0&&p.dft)o.th=(Math.round(p.dft/(sv*10||1)*100)/100).toFixed(2)+' L/㎡';
 if(p.pot)o.pot=p.pot;
 if(sv)o.svr=sv;
 return o}
function fill(c){if(!c||!c.n||c._af===c.n)return null;var p=typeof P=='function'&&P(c.n);if(!p)return null;c._af=c.n;
 if((c.dft===''||c.dft==null)&&+p.dft)c.dft=+p.dft;
 var v=vals(p,c);KS.forEach(function(k){if(v[k]!=null&&(c[k]===''||c[k]==null))c[k]=v[k]});return v}
var o=window.syEdUi;
window.syEdUi=syEdUi=function(){
 try{if(SYE&&SYE.e)(SYE.e.items||[]).forEach(fill)}catch(e){}
 var r=o.apply(this,arguments);
 try{var e=document.getElementById('syed');if(e&&SYE&&SYE.e)e.querySelectorAll('.sx-cd').forEach(function(d,i){var c=SYE.e.items[i];if(!c)return;d.className='sx-cd '+KC(c.lb||'미지정')})}catch(x){}
 return r};
var oh=window.syEdHint;
window.syEdHint=syEdHint=function(i){var r=oh.apply(this,arguments);
 try{var c=SYE.e.items[i];if(c&&c.n&&c._af!==c.n&&typeof P=='function'&&P(c.n)){fill(c);syEdUi()}}catch(e){}
 return r};
})();
