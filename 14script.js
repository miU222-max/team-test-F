// Simple interactions for 14top.html

document.addEventListener('DOMContentLoaded', ()=>{
  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.18});
  reveals.forEach(r=>obs.observe(r));

  // splat click effect
  const splatLayer = document.getElementById('splat-layer');
  const inkClasses = ['ink1','ink2','ink3'];
  document.body.addEventListener('click', (e)=>{
    // ignore clicks on links to preserve navigation behavior
    if(e.target.closest('a')) return;
    const x = e.clientX;
    const y = e.clientY;
    const size = 80 + Math.random()*160;
    const ink = document.createElement('div');
    ink.className = `splat-anim ${inkClasses[Math.floor(Math.random()*inkClasses.length)]} expand`;
    ink.style.left = x + 'px';
    ink.style.top = y + 'px';
    ink.style.width = size + 'px';
    ink.style.height = size + 'px';
    splatLayer.appendChild(ink);
    // small ripple pieces
    const pieces = 6 + Math.floor(Math.random()*6);
    for(let i=0;i<pieces;i++){
      const p = document.createElement('div');
      p.className = `splat-anim ${inkClasses[Math.floor(Math.random()*inkClasses.length)]}`;
      p.style.width = (10+Math.random()*36)+'px';
      p.style.height = p.style.width;
      p.style.left = x + (Math.random()-0.5)*size*1.4 + 'px';
      p.style.top = y + (Math.random()-0.5)*size*1.4 + 'px';
      p.style.opacity = 0.9;
      p.style.transform = `translate(-50%,-50%) scale(${0.2+Math.random()*0.6})`;
      p.style.transition = 'transform .6s ease, opacity .6s ease';
      splatLayer.appendChild(p);
      setTimeout(()=>{
        p.style.transform = `translate(-50%,-50%) scale(${1.6+Math.random()*0.8})`;
        p.style.opacity = '0';
      },10);
      setTimeout(()=> p.remove(),700 + Math.random()*300);
    }
    // cleanup main ink
    setTimeout(()=> ink.remove(),800);
  });

  // internal link handling for slide/fade
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(a => {
    a.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if(!target) return;
      // distance-based behavior
      const rect = target.getBoundingClientRect();
      const dist = Math.abs(rect.top);
      // quick fade for small distances
      if(dist < 300){
        // fade out main and scroll then fade in
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.transition = 'opacity .35s ease';
        document.body.style.opacity = '0.4';
        setTimeout(()=>{
          target.scrollIntoView({behavior:'instant', block:'start'});
          document.body.style.opacity = '1';
          setTimeout(()=> document.documentElement.style.scrollBehavior = 'smooth',350);
        },250);
      } else {
        // slide: perform smooth scroll but add a little offset animation
        const start = window.scrollY;
        const end = start + rect.top - 20;
        const dur = 650;
        let st = null;
        function step(ts){
          if(!st) st = ts;
          const t = Math.min(1,(ts-st)/dur);
          const eased = (--t)*t*t+1; // ease out
          window.scrollTo(0, start + (end-start)*eased);
          if(t<1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    });
  });

});
