#!/usr/bin/env python3
"""K-apt 자료로 apt-db.json(단지 DB) 만들기 — 기본정보(사용승인일·최고층수·도로명·복도유형 등)를 내장하고 데이터 확인 표시(q)를 붙입니다.
사용: python3 tools/apt-db-build.py 기본정보.xlsx apt-db.json [출력.json]
 - 기본정보.xlsx : K-apt ‘단지 기본정보’ 엑셀(그대로)
 - apt-db.json   : 현재 단지 DB(면적정보 d·동별 층수 f 를 그대로 유지)
값은 고치지 않고 ‘확인 필요’ 표시만 붙입니다. 같은 입력이면 항상 같은 결과가 나옵니다."""
import sys,json,re
import pandas as pd
src,dbp=sys.argv[1],sys.argv[2];out=sys.argv[3] if len(sys.argv)>3 else dbp
J=json.load(open(dbp,encoding='utf-8'))
b=pd.read_excel(src,header=1,dtype={'단지코드':str,'사용승인일':str})
b=b[b['단지코드'].astype(str).str.match(r'^A\d{8}$')]
b=b.sort_values('가입일',kind='stable').drop_duplicates('단지코드',keep='last')   # 같은 코드 중복(주소만 다름) → 가입일 최신 1건
CR={'계단식':'계단식','복도식':'복도식','혼합식':'혼합식'}
def num(v,d=0):
    try:
        x=float(v);return int(round(x)) if x==x else d
    except Exception:return d
def sdx(L,s):
    s=str(s).strip()
    if s not in L:L.append(s)
    return L.index(s)
info={};byc={}
for r in b.itertuples(index=False):
    g=lambda k:getattr(r,k) if hasattr(r,k) else None
    d=r._asdict() if hasattr(r,'_asdict') else {}
    c=d['단지코드']
    byc[c]=r
for c,r in byc.items():
    row=b[b['단지코드']==c].iloc[0] if False else None
# 빠른 처리를 위해 dict 행으로 변환
rows=b.to_dict('records')
def S(v):
    return '' if v is None or (isinstance(v,float) and v!=v) else str(v).strip()
amap={x[0]:x for x in J['d']}
sd,sg=J['sd'],J['sg']
new=[];cnt={'info':0,'infoOnly':0,'flFix':0}
for r in rows:
    c=r['단지코드'];ap=re.sub(r'\D','',S(r.get('사용승인일')))[:8]
    fl=num(r.get('최고층수'));fl2=num(r.get('최고층수(건축물대장상)'));q=0
    if not(1<=fl<=70):
        if 1<=fl2<=70:fl=fl2;cnt['flFix']+=1
        else:fl=0;q|=16
    ug=max(0,num(r.get('지하층수')));ug=ug if ug<=10 else 0
    cr=CR.get(S(r.get('복도유형')),'')
    hh=num(r.get('세대수'));dn=num(r.get('동수'))
    x=amap.get(c)
    if x:
        t=x[8];sh=sum(z[1] for z in t)
        if hh>0 and sh!=hh:q|=4
        if any(z[0]<10 or z[0]>300 for z in t):q|=1
        ba,ea=x[6],x[7]
        if ba==0 or (ea>0 and (ba<ea or ba>3*ea)):q|=2
        if x[5]==0:
            if dn>0:x[5]=dn
            else:q|=8
    else:
        em=S(r.get('읍면'));dl=S(r.get('동리'))
        ad=(em+' '+dl).strip()
        x=[c,S(r.get('단지명')),sdx(sd,S(r.get('시도'))),sdx(sg,S(r.get('시군구'))),ad,max(1,dn),0,0,[],hh];new.append(x);amap[c]=x
        q|=32;cnt['infoOnly']+=1
    info[c]=[S(r.get('단지분류')),S(r.get('도로명주소')),ap,fl,ug,cr,q];cnt['info']+=1
# 면적정보에만 있는 단지: 기본정보 없음 표시는 앱이 i 없음으로 판단. 면적 값 이상 표시만 따로
only={}
for x in J['d']:
    if x[0] in info:continue
    q=0;t=x[8]
    if any(z[0]<10 or z[0]>300 for z in t):q|=1
    ba,ea=x[6],x[7]
    if ba==0 or (ea>0 and (ba<ea or ba>3*ea)):q|=2
    if x[5]==0:q|=8
    if q:only[x[0]]=q
J['d']=J['d']+new
J['i']=info
J['iq']=only
J['im']={'s':'K-apt 단지 기본정보','v':'2026-10','n':len(info)}
for k in ('v','sd','sg','d','f','fm','im','i','iq'):pass
json.dump({k:J[k] for k in ['v','sd','sg','d','f','fm','im','i','iq']},open(out,'w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
print('기본정보 반영',cnt,'면적 없는 단지 추가',len(new),'면적정보만 있는 단지 중 확인 표시',len(only),'→',out)
