(function(){
const V='var(--rc2)',EX=/(dot|swit|knob|toggle|track|prog|spinner|radio|handle|\bsw\b|thumb|scroll|scpill|#mh|#lhd|\.mh-|\.lh-|\bmh-|\blh-)/i;
const split=s=>{const o=[];let d=0,c='';for(const ch of s){if(ch=='(')d++;if(ch==')')d--;if(ch==' '&&d==0){if(c)o.push(c);c=''}else c+=ch}if(c)o.push(c);return o};
const isZero=t=>/^0(px|%)?$/.test(t);
function nv(val){if(!val)return null;const v=val.trim();if(/50%/.test(v)||/var\(--rc2\)/.test(v))return null;const t=split(v.replace(/\s*!important/,'').replace(/\s*\/\s*.*$/,''));if(!t.length)return null;if(t.every(isZero))return null;return t.map(x=>isZero(x)?'0':V).join(' ')}
function fixRule(r){if(r.__rc)return;if(r.cssRules&&!r.style){for(const x of r.cssRules)fixRule(x);return}if(!r.style||!r.selectorText)return;r.__rc=1;if(EX.test(r.selectorText))return;
 const st=r.style,names=[];for(let i=0;i<st.length;i++){const n=st[i];if(/radius$/.test(n))names.push(n)}
 if(r.cssRules&&r.style&&r.cssRules.length)for(const x of r.cssRules)fixRule(x);
 for(const n of names){const val=st.getPropertyValue(n),nw=nv(val);if(nw)st.setProperty(n,nw,'important')}}
function sheets(){for(const ss of document.styleSheets){let rs;try{rs=ss.cssRules}catch(e){continue}if(!rs)continue;for(const r of rs)fixRule(r)}}
function inl(root){if(root.closest&&root.closest('#mh,#lhd'))return;const l=root.nodeType==1?[root,...root.querySelectorAll('[style*="radius"]')]:[];for(const e of l){if(!e.style||!/radius/.test(e.getAttribute('style')||''))continue;if(EX.test(e.className||''))continue;const v=e.style.borderRadius,nw=nv(v);if(nw)e.style.setProperty('border-radius',nw,'important')}}

function comp(root){if(root.closest&&root.closest('#mh,#lhd'))return;const rs=document.documentElement.style.getPropertyValue('--rc2');const els=root.nodeType==1?[root,...root.querySelectorAll('*')]:[];for(const e of els){if(e.namespaceURI&&e.namespaceURI.indexOf('svg')>=0)continue;if(e.closest&&e.closest('#mh,#lhd'))continue;const c=getComputedStyle(e),v=c.borderTopLeftRadius;if(v==='0px'||v.indexOf('%')>=0)continue;if(EX.test(typeof e.className=='string'?e.className:''))continue;const w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)continue;const px=parseFloat(v);if(Math.abs(w-h)<3&&px>=w/2-1)continue;if(e.__rcd===v)continue;const t=document.createElement('i').style;t.borderRadius='var(--rc2)';const ref=getComputedStyle(document.body).getPropertyValue('--rc2');e.style.setProperty('border-radius',V,'important');e.__rcd=getComputedStyle(e).borderTopLeftRadius}}
function run(){try{sheets();inl(document.body);comp(document.body)}catch(e){}}
run();window.addEventListener('load',()=>{run();setTimeout(run,800);setTimeout(run,2500)});
setInterval(run,1500);let t=0;new MutationObserver(m=>{let s=0,n=[];for(const x of m){for(const a of x.addedNodes){if(a.nodeType!=1)continue;if(a.tagName=='STYLE'||a.tagName=='LINK')s=1;n.push(a)}}if(s)run();n.forEach(a=>{try{inl(a);comp(a)}catch(e){}})}).observe(document.documentElement,{childList:true,subtree:true});
})();
