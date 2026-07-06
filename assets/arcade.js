/* CanMyPet Arcade engine — shared juice + retention layer for all games.
   Drop-in: <script src="../assets/arcade.js"></script> exposes window.CMP.
   No build step, no deps, ES5-safe. All state in localStorage. */
(function(){
  "use strict";
  function get(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}}
  function set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

  /* ---------- Sound (synthesized WebAudio, no files) ---------- */
  var actx=null, muted=get("cmp_muted",false);
  function ac(){ if(muted) return null;
    try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)();
      if(actx.state==="suspended") actx.resume(); return actx; }catch(e){ return null; } }
  function beep(freq,dur,type,vol,when){ var c=ac(); if(!c) return;
    var t=c.currentTime+(when||0), o=c.createOscillator(), g=c.createGain();
    o.type=type||"sine"; o.frequency.value=freq; o.connect(g); g.connect(c.destination);
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(vol||0.2,t+0.012);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.start(t); o.stop(t+dur+0.03); }
  var SFX={
    correct:function(){ beep(660,0.11,"triangle",0.25); beep(990,0.12,"triangle",0.2,0.07); },
    wrong:function(){ beep(196,0.24,"sawtooth",0.16); },
    combo:function(n){ beep(620+(n||1)*70,0.11,"square",0.18); },
    level:function(){ [523,659,784,1046].forEach(function(f,i){ beep(f,0.16,"triangle",0.22,i*0.085); }); },
    over:function(){ [392,330,262].forEach(function(f,i){ beep(f,0.22,"sine",0.2,i*0.12); }); },
    tick:function(){ beep(880,0.04,"square",0.06); },
    click:function(){ beep(520,0.04,"sine",0.1); },
    flip:function(){ beep(420,0.05,"sine",0.1); beep(560,0.05,"sine",0.1,0.04); }
  };
  function mute(v){ muted=(v==null?!muted:!!v); set("cmp_muted",muted); return muted; }

  /* ---------- Confetti (one-shot canvas burst) ---------- */
  function confetti(opts){ opts=opts||{};
    if(typeof document==="undefined") return;
    var cv=document.createElement("canvas");
    cv.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998";
    document.body.appendChild(cv);
    var dpr=Math.min(window.devicePixelRatio||1,2), W=cv.width=innerWidth*dpr, H=cv.height=innerHeight*dpr;
    var ctx=cv.getContext("2d"), cols=opts.colors||["#2FBF87","#FF6B5E","#E7A327","#0E5A41","#FAF7F0"];
    var n=opts.count||120, cx=(opts.x!=null?opts.x:innerWidth/2)*dpr, cy=(opts.y!=null?opts.y:innerHeight*0.4)*dpr;
    var P=[],i;
    for(i=0;i<n;i++){ var a=Math.random()*Math.PI*2, sp=(4+Math.random()*9)*dpr;
      P.push({x:cx,y:cy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-6*dpr,
        s:(5+Math.random()*7)*dpr,c:cols[i%cols.length],r:Math.random()*6,vr:(Math.random()-0.5)*0.4,life:1}); }
    var t0=performance.now();
    (function frame(t){ var dt=Math.min((t-t0)/16.7,3); t0=t; ctx.clearRect(0,0,W,H); var alive=false;
      for(i=0;i<P.length;i++){ var p=P[i]; if(p.life<=0) continue; alive=true;
        p.vy+=0.35*dpr*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.r+=p.vr*dt; p.life-=0.012*dt;
        ctx.save(); ctx.globalAlpha=Math.max(p.life,0); ctx.translate(p.x,p.y); ctx.rotate(p.r);
        ctx.fillStyle=p.c; ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.6); ctx.restore(); }
      if(alive) requestAnimationFrame(frame); else cv.remove();
    })(t0);
  }

  /* ---------- Floating popup ("+10", "Combo x3!") ---------- */
  var styled=false;
  function injectStyle(){ if(styled) return; styled=true;
    var s=document.createElement("style");
    s.textContent="@keyframes cmpFloat{0%{opacity:0;transform:translate(-50%,0) scale(.7)}"+
      "18%{opacity:1;transform:translate(-50%,-14px) scale(1.08)}100%{opacity:0;transform:translate(-50%,-64px) scale(1)}}"+
      ".cmp-pop{position:fixed;z-index:9999;pointer-events:none;font-family:'Plus Jakarta Sans',system-ui,sans-serif;"+
      "font-weight:800;font-size:26px;text-shadow:0 2px 8px rgba(0,0,0,.18);animation:cmpFloat 1s ease forwards}"+
      "@keyframes cmpToastIn{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}"+
      ".cmp-toast{position:fixed;left:50%;bottom:30px;transform:translateX(-50%);z-index:10000;background:#16241F;color:#fff;"+
      "font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-weight:700;font-size:14.5px;padding:11px 18px;border-radius:999px;"+
      "box-shadow:0 10px 30px rgba(0,0,0,.25);animation:cmpToastIn .25s ease}"+
      "@keyframes cmpFlash{from{opacity:.5}to{opacity:0}}"+
      ".cmp-flash{position:fixed;inset:0;z-index:9997;pointer-events:none;animation:cmpFlash .35s ease forwards}"+
      ".cmp-mute{position:fixed;right:14px;bottom:14px;z-index:9996;width:42px;height:42px;border-radius:50%;border:none;"+
      "background:#fff;box-shadow:0 6px 18px rgba(14,90,65,.18);font-size:19px;cursor:pointer;line-height:42px;text-align:center}"+
      ".cmp-lb{margin:12px auto 0;max-width:340px;text-align:left;font-family:'Plus Jakarta Sans',system-ui,sans-serif}"+
      ".cmp-lb-h{font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#5d6b63;margin:0 0 6px;text-align:center}"+
      ".cmp-lb-empty{font-size:13px;color:#9fb0a7;text-align:center;margin:6px 0}"+
      ".cmp-lb-row{display:flex;justify-content:space-between;padding:6px 12px;border-radius:9px;font-weight:700;font-size:14px;color:#3a4a42}"+
      ".cmp-lb-row:nth-child(even){background:#fff}"+
      ".cmp-lb-row.me{background:#E4F6EC;color:#0c5e38;border:1px solid #1FA463}"+
      ".cmp-lb-rk{color:#9fb0a7;display:inline-block;width:22px}";
    document.head.appendChild(s);
  }
  function popup(text,opts){ opts=opts||{}; injectStyle();
    var d=document.createElement("div"); d.className="cmp-pop"; d.textContent=text;
    d.style.left=(opts.x!=null?opts.x:innerWidth/2)+"px";
    d.style.top=(opts.y!=null?opts.y:innerHeight*0.4)+"px";
    d.style.color=opts.color||"#0E5A41";
    document.body.appendChild(d); setTimeout(function(){ d.remove(); },1050);
  }
  function flash(color){ injectStyle(); var d=document.createElement("div");
    d.className="cmp-flash"; d.style.background=color||"rgba(226,72,61,.45)";
    document.body.appendChild(d); setTimeout(function(){ d.remove(); },360); }
  var toastT=null;
  function toast(msg){ injectStyle(); var ex=document.querySelector(".cmp-toast"); if(ex)ex.remove();
    var d=document.createElement("div"); d.className="cmp-toast"; d.textContent=msg;
    document.body.appendChild(d); clearTimeout(toastT); toastT=setTimeout(function(){ d.remove(); },2600); }

  /* ---------- Personal best ---------- */
  function best(key,val){ var k="cmp_best_"+key, cur=get(k,0);
    if(val!=null && val>cur){ set(k,val); return val; } return cur; }

  /* ---------- Daily streak + seed ---------- */
  function dayNum(){ return Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5); }
  function streak(){ var s=get("cmp_streak",{last:null,count:0,best:0});
    if(s.last!=null && s.last<dayNum()-1) s.count=0; return s; }
  function streakBump(){ var s=get("cmp_streak",{last:null,count:0,best:0}), dn=dayNum();
    if(s.last===dn) return s;
    if(s.last===dn-1) s.count++; else s.count=1;
    s.last=dn; if(s.count>(s.best||0)) s.best=s.count; set("cmp_streak",s); return s; }
  function dailyDone(key){ return get("cmp_daily_"+key,-1)===dayNum(); }
  function dailyScore(key){ return get("cmp_dscore_"+key,0); }
  function markDaily(key,score){ set("cmp_daily_"+key,dayNum()); set("cmp_dscore_"+key,score||0); return streakBump(); }
  function dailySeed(salt){ var s=(salt||"")+"|"+dayNum(), h=2166136261>>>0;
    for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
  function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0;
    var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t;
    return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr,seed){ var r=mulberry32(seed||1), a=arr.slice(), i,j,t;
    for(i=a.length-1;i>0;i--){ j=Math.floor(r()*(i+1)); t=a[i]; a[i]=a[j]; a[j]=t; } return a; }

  /* ---------- Share ---------- */
  function share(text,url){ url=url||location.href; var full=text+"\n"+url;
    if(navigator.share){ navigator.share({title:"CanMyPet Arcade",text:text,url:url}).catch(function(){}); }
    else if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(full).then(
      function(){ toast("Copied! Paste it anywhere 📋"); },function(){ toast(full); }); }
    else { toast("Copy: "+full); } }

  /* ---------- Mute button (floating, optional) ---------- */
  function muteButton(){ injectStyle();
    if(document.querySelector(".cmp-mute")) return;
    var b=document.createElement("button"); b.className="cmp-mute"; b.setAttribute("aria-label","Toggle sound");
    function paint(){ b.textContent=muted?"🔇":"🔊"; } paint();
    b.onclick=function(){ mute(); paint(); if(!muted) SFX.click(); };
    document.body.appendChild(b); return b; }

  /* ---------- Progress reader (for the arcade hub) ----------
     Reads stars saved by each game. Pass the localStorage key the game uses.
     Safe or Toxic uses cmp_sot_prog_<species> = {u:unlocked, s:{level:stars}}. */
  function starsFromProg(lsKey){ var p=get(lsKey,null); if(!p||!p.s) return {got:0,max:0};
    var got=0,max=0,k; for(k in p.s){ if(p.s.hasOwnProperty(k)){ got+=(p.s[k]||0); } }
    return {got:got,max:30}; }

  /* ---------- Global leaderboard (Supabase, "just for fun") ----------
     Public REST via the publishable key; scores are client-submitted (spoofable),
     table CHECK constraints bound the damage. Fails silent/offline. */
  var SB_URL="https://rboloeewgypkabzrhvjx.supabase.co/rest/v1/cmp_scores";
  var SB_KEY="sb_publishable_NzK-67xPbG5fJsWiHq80eA_FIKscEfN";
  function sbH(extra){ var h={apikey:SB_KEY,Authorization:"Bearer "+SB_KEY}; if(extra){for(var k in extra)h[k]=extra[k];} return h; }
  function cleanName(n){ return (String(n||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,3))||"PUP"; }
  function submitScore(game,name,score){
    if(!/^[a-z0-9_-]{1,20}$/.test(game)||typeof fetch==="undefined") return Promise.resolve(null);
    score=Math.max(0,Math.min(5000000,Math.round(+score||0)));
    return fetch(SB_URL,{method:"POST",headers:sbH({"Content-Type":"application/json",Prefer:"return=minimal"}),
      body:JSON.stringify({game:game,name:cleanName(name),score:score})}).catch(function(){return null;});
  }
  function leaderboard(game,limit){ limit=limit||10;
    if(typeof fetch==="undefined") return Promise.resolve([]);
    return fetch(SB_URL+"?game=eq."+encodeURIComponent(game)+"&order=score.desc,created_at.asc&limit="+limit+"&select=name,score",
      {headers:sbH()}).then(function(r){return r.json();}).catch(function(){return [];});
  }
  function renderBoard(el,rows,meName,meScore){ if(!el) return; injectStyle();
    var h="<div class='cmp-lb'><div class='cmp-lb-h'>🌍 Global top 10</div>";
    if(!rows||!rows.length){ h+="<p class='cmp-lb-empty'>Loading… or be the first on the board!</p>"; }
    else { var shownMe=false; rows.forEach(function(r,i){ var mine=(!shownMe && r.name===meName && +r.score===+meScore); if(mine)shownMe=true;
      h+="<div class='cmp-lb-row"+(mine?" me":"")+"'><span><span class='cmp-lb-rk'>"+(i+1)+"</span>"+String(r.name).replace(/[<>&]/g,"")+"</span><b>"+(+r.score)+"</b></div>"; }); }
    el.innerHTML=h+"</div>";
  }
  function globalBoard(game,name,score,el){
    var clean=cleanName(name);
    var p=(+score>0)?submitScore(game,clean,score):Promise.resolve(null);
    return p.then(function(){ return leaderboard(game,10); }).then(function(rows){ renderBoard(el,rows,clean,Math.round(+score||0)); return rows; });
  }

  window.CMP={
    get:get,set:set,
    sfx:SFX,mute:mute,isMuted:function(){return muted;},muteButton:muteButton,
    confetti:confetti,popup:popup,flash:flash,toast:toast,
    best:best,
    streak:streak,streakBump:streakBump,markDaily:markDaily,dailyDone:dailyDone,dailyScore:dailyScore,
    dailySeed:dailySeed,seededShuffle:seededShuffle,
    share:share,starsFromProg:starsFromProg,
    submitScore:submitScore,leaderboard:leaderboard,globalBoard:globalBoard
  };
})();
