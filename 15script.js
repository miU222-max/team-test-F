// 15script.js - 軽量で“かわいい動き”を付与
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', () => {
    // タイプライター
    $$('[data-typewriter]').forEach(el => typeWriter(el, {speed: 38, delay: 300}));

    // スクロール・リビール
    observeReveal();

    // スムーススクロール（ページ内）
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = $(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      });
    });

    // トップに戻る
    const back = $('#backToTop');
    const onScroll = () => {
      if (!back) return;
      const show = window.scrollY > 320;
      back.classList.toggle('show', show);
    }
    if (back) {
      back.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
      window.addEventListener('scroll', onScroll, {passive: true});
      onScroll();
    }
  });

  function typeWriter(el, {speed=40, delay=0}={}){
    const text = el.textContent.trim();
    el.textContent = '';
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    el.after(caret);

    let i = 0;
    const write = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(write, speed);
      }
    };
    setTimeout(write, delay);
  }

  function observeReveal(){
    const targets = $$('.reveal');
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach(t => t.classList.add('show'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    }, {threshold: 0.15});

    targets.forEach(t => io.observe(t));
  }
})();
