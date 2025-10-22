// 13script.js - ペンライトの点灯・色変更、背景の小さな動き
document.addEventListener('DOMContentLoaded', ()=>{
  const pen = document.getElementById('penlight');
  const palette = document.getElementById('palette');
  const glow = pen.querySelector('.glow');
  let on = false;
  let color = '#0a84ff';

  function setColor(c){
    color = c;
    glow.style.background = c;
    pen.style.boxShadow = `0 6px 28px ${c}33, inset 0 -2px 6px #0005`;
    // tiny pulsing animation
    pen.animate([
      {transform:'translateY(0) scale(1)'},
      {transform:'translateY(-2px) scale(1.02)'},
      {transform:'translateY(0) scale(1)'}
    ],{duration:1000,iterations:1});
  }

  pen.addEventListener('click', ()=>{
    on = !on;
    pen.classList.toggle('on', on);
    if(on){
      glow.style.background = color;
      // animate subtle ripple on background
      document.body.style.setProperty('--accent', color);
      startPulse();
    } else {
      glow.style.background = 'transparent';
      stopPulse();
    }
  });

  palette.querySelectorAll('.color').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const c = e.currentTarget.dataset.color;
      setColor(c);
      // if currently on, briefly emphasize
      if(on){
        glow.animate([{opacity:0.1, transform:'scale(0.9)'},{opacity:0.25, transform:'scale(1)'}],{duration:420,iterations:1});
      }
    })
  });

  // small floating light particles for ambience
  let particleTimer = null;
  function spawnParticle(){
    const p = document.createElement('div');
    p.className = 'stage-particle';
    const size = Math.random()*6 + 6;
    p.style.width = p.style.height = size + 'px';
    p.style.left = (20 + Math.random()*60) + '%';
    p.style.top = (10 + Math.random()*60) + '%';
    p.style.background = color;
    p.style.opacity = '0.06';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), 2800);
  }

  function startPulse(){
    if(particleTimer) return;
    particleTimer = setInterval(spawnParticle, 420);
  }
  function stopPulse(){
    clearInterval(particleTimer); particleTimer = null;
  }

  // init color
  setColor(color);
});

// styles for dynamically created particles (fallback in JS-driven pages)
const style = document.createElement('style');
style.textContent = `
.stage-particle{position:fixed;border-radius:50%;filter:blur(16px);pointer-events:none;transform:translateY(0) scale(1);animation:rise 2600ms linear}
@keyframes rise{0%{transform:translateY(0) scale(0.9);opacity:0.08}100%{transform:translateY(-80px) scale(1.1);opacity:0}}
`;
document.head.appendChild(style);
