// 외부 라이브러리를 앱 폴더(lib/)에 내려받는 도구 — 인터넷이 되는 컴퓨터에서 한 번만 실행하세요.
// 사용: 앱 폴더에서  node tools/fetch-libs.js
// 받은 lib/ 폴더를 GitHub에 함께 올리면, 앱이 인터넷 없이도 PDF·엑셀·이미지 저장·글꼴을 사용합니다.
// (lib/ 에 파일이 없으면 앱은 지금처럼 인터넷에서 받아 씁니다.)
const fs=require('fs'),path=require('path'),https=require('https');
const OUT=path.join(__dirname,'..','lib');
const get=u=>new Promise((ok,no)=>https.get(u,r=>{if(r.statusCode>=300&&r.statusCode<400&&r.headers.location)return ok(get(new URL(r.headers.location,u).href));if(r.statusCode!==200){r.resume();return no(new Error(u+' → '+r.statusCode))}const c=[];r.on('data',d=>c.push(d));r.on('end',()=>ok(Buffer.concat(c)))}).on('error',no));
const save=async(u,rel)=>{const f=path.join(OUT,rel);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,await get(u));console.log('받음',rel)};
(async()=>{
 const CJ='https://cdnjs.cloudflare.com/ajax/libs/';
 await save(CJ+'xlsx/0.18.5/xlsx.full.min.js','xlsx.full.min.js');
 await save(CJ+'html2canvas/1.4.1/html2canvas.min.js','html2canvas.min.js');
 await save(CJ+'jspdf/2.5.1/jspdf.umd.min.js','jspdf.umd.min.js');
 await save(CJ+'pdf.js/3.11.174/pdf.min.js','pdfjs/pdf.min.js');
 await save(CJ+'pdf.js/3.11.174/pdf.worker.min.js','pdfjs/pdf.worker.min.js');
 const list=JSON.parse((await get('https://api.cdnjs.com/libraries/pdf.js/3.11.174?fields=files')).toString()).files.filter(f=>f.startsWith('cmaps/'));
 for(const f of list)await save(CJ+'pdf.js/3.11.174/'+f,'pdfjs/'+f);
 await save('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2','fonts/PretendardVariable.woff2');
 fs.writeFileSync(path.join(OUT,'fonts','pretendard.css'),'@font-face{font-family:"Pretendard Variable";font-weight:45 920;font-style:normal;font-display:swap;src:local("Pretendard Variable"),url(PretendardVariable.woff2) format("woff2-variations")}\n');
 const files=[];(function w(d){for(const n of fs.readdirSync(d)){const p=path.join(d,n);fs.statSync(p).isDirectory()?w(p):files.push(path.relative(path.join(__dirname,'..'),p).replace(/\\/g,'/'))}})(OUT);
 fs.writeFileSync(path.join(OUT,'files.json'),JSON.stringify(files));
 console.log('\n완료:',files.length,'개 파일. lib/ 폴더를 GitHub에 올리세요. (OCR 글자 인식 도구는 용량이 커서 포함하지 않았고, 처음 사용할 때 인터넷에서 받습니다.)');
})().catch(e=>{console.error('실패:',e.message);process.exit(1)});
