/* ══════════════════════════════════════════════
   ANUSHKA WAGHMODE — PORTFOLIO JS
   Features: Typewriter intro · Cursor glow · SVG CGPA graph
══════════════════════════════════════════════ */

/* ════════════════════════════════════
   1. TYPEWRITER INTRO SCREEN
════════════════════════════════════ */
(function () {
  const screen    = document.getElementById('introScreen');
  const greeting  = document.getElementById('introGreeting');
  const nameEl    = document.getElementById('introName');
  const cursorEl  = document.getElementById('introCursor');
  const subtitle  = document.getElementById('introSubtitle');
  const barWrap   = document.getElementById('introBarWrap');
  const bar       = document.getElementById('introBar');

  const GREETING_TEXT  = "Hello, I'm";
  const NAME_TEXT      = 'Anushka Waghmode';
  const SUBTITLE_TEXT  = 'Computer Science Engineer · Developer · Creator';

  let charIdx = 0;

  function typeGreeting() {
    greeting.classList.add('visible');
    greeting.textContent = GREETING_TEXT;
    setTimeout(typeName, 600);
  }

  function typeName() {
    if (charIdx < NAME_TEXT.length) {
      nameEl.textContent = NAME_TEXT.slice(0, charIdx + 1);
      charIdx++;
      const delay = 60 + Math.random() * 60;
      setTimeout(typeName, delay);
    } else {
      setTimeout(showSubtitle, 400);
    }
  }

  function showSubtitle() {
    subtitle.textContent = SUBTITLE_TEXT;
    subtitle.classList.add('visible');
    cursorEl.classList.add('hide-cursor');
    setTimeout(startLoading, 500);
  }

  function startLoading() {
    barWrap.classList.add('visible');
    let pct = 0;
    const interval = setInterval(() => {
      pct += 2 + Math.random() * 3;
      if (pct >= 100) {
        pct = 100;
        bar.style.width = '100%';
        clearInterval(interval);
        setTimeout(exitIntro, 350);
      } else {
        bar.style.width = pct + '%';
      }
    }, 40);
  }

  function exitIntro() {
    screen.classList.add('hide');
    document.body.classList.remove('intro-active');
    screen.addEventListener('transitionend', () => { screen.remove(); }, { once: true });
  }

  setTimeout(typeGreeting, 300);
})();


/* ════════════════════════════════════
   2. CUSTOM CURSOR + GLOW
════════════════════════════════════ */
const cursor     = document.getElementById('cursor');
const cursorDot  = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let glowX = 0,  glowY = 0;
let isMoving = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
  if (!isMoving) {
    isMoving = true;
    document.body.classList.add('cursor-ready');
  }
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';

  glowX += (mouseX - glowX) * 0.06;
  glowY += (mouseY - glowY) * 0.06;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top  = glowY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-item, .pill, .contact-card, .cert-card, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    cursorGlow.style.width  = '600px';
    cursorGlow.style.height = '600px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(232,201,126,0.12) 0%, rgba(232,201,126,0.04) 40%, transparent 70%)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    cursorGlow.style.width  = '400px';
    cursorGlow.style.height = '400px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(232,201,126,0.07) 0%, rgba(232,201,126,0.03) 40%, transparent 70%)';
  });
});


/* ════════════════════════════════════
   3. NAVBAR SCROLL
════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


/* ════════════════════════════════════
   4. HAMBURGER MENU
════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ════════════════════════════════════
   5. SCROLL REVEAL
════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ════════════════════════════════════
   6. SVG CGPA GRAPH ANIMATION
════════════════════════════════════ */
function animateCgpaGraph() {
  const BASELINE = 260;
  const TOP      = 40;
  const RANGE    = BASELINE - TOP;
  const MIN_CGPA = 6;
  const MAX_CGPA = 10;

  const data = [
    { cgpa: 7.76, clipId: 'bar1ClipRect', glowId: 'glow1', dotId: 'dot1', valId: 'val1', cx: 180 },
    { cgpa: 8.23, clipId: 'bar2ClipRect', glowId: 'glow2', dotId: 'dot2', valId: 'val2', cx: 350 },
    { cgpa: 9.73, clipId: 'bar3ClipRect', glowId: 'glow3', dotId: 'dot3', valId: 'val3', cx: 520 },
  ];

  data.forEach(d => {
    d.clipRect = document.getElementById(d.clipId);
    d.glow     = document.getElementById(d.glowId);
    d.dot      = document.getElementById(d.dotId);
    d.val      = document.getElementById(d.valId);
    d.barH     = ((d.cgpa - MIN_CGPA) / (MAX_CGPA - MIN_CGPA)) * RANGE;
    d.barY     = BASELINE - d.barH;
  });

  const trendLine  = document.getElementById('trendLine');
  const trendBadge = document.getElementById('trendBadge');
  const trendText  = document.getElementById('trendText');

  const DURATION = 1300;
  const startTime = performance.now();

  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function frame(now) {
    const t = Math.min((now - startTime) / DURATION, 1);
    const e = ease(t);

    data.forEach(d => {
      const h = d.barH * e;
      const y = BASELINE - h;

      if (d.clipRect) {
        d.clipRect.setAttribute('y', y);
        d.clipRect.setAttribute('height', h);
        d.clipRect.setAttribute('x', d.cx - 40);
      }
      if (d.glow) {
        d.glow.setAttribute('y', y - 1);
        d.glow.setAttribute('opacity', e * 0.9);
      }
      if (d.dot) {
        d.dot.setAttribute('cy', y);
        d.dot.setAttribute('opacity', e);
      }
      if (d.val) {
        d.val.setAttribute('y', Math.max(y - 8, 22));
        d.val.setAttribute('opacity', e > 0.65 ? (e - 0.65) / 0.35 : 0);
      }
    });

    // Trend line
    if (t > 0.2 && trendLine) {
      const pts = data.map(d => {
        const h = d.barH * e;
        const y = BASELINE - h;
        return d.cx + ',' + y;
      });
      trendLine.setAttribute('points', pts.join(' '));
    }

    // Trend badge fade in
    if (trendBadge && trendText) {
      const bOpacity = t > 0.85 ? (t - 0.85) / 0.15 : 0;
      trendBadge.setAttribute('opacity', bOpacity);
      trendText.setAttribute('opacity', bOpacity);
    }

    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

const cgpaWrap = document.getElementById('cgpaGraphWrap');
if (cgpaWrap) {
  const cgpaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(animateCgpaGraph, 200);
        cgpaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cgpaObserver.observe(cgpaWrap);
}


/* ════════════════════════════════════
   7. PROJECT HOVER PREVIEW
════════════════════════════════════ */
const projectItems = document.querySelectorAll('.project-item');
const previewCards = document.querySelectorAll('.project-preview');
const previewMap = {
  steampunk:    document.getElementById('previewSteampunk'),
  loadbalancer: document.getElementById('previewLoadbalancer'),
  portfolio:    document.getElementById('previewPortfolio'),
  idp:          document.getElementById('previewIdp'),
};
let previewTimeout = null;

function positionPreview(card, x, y) {
  const cardW = 340, margin = 20;
  const cardH = card.offsetHeight || 380;
  const vw = window.innerWidth, vh = window.innerHeight;
  let left = x + 24, top = y - 60;
  if (left + cardW > vw - margin) left = x - cardW - 24;
  if (top + cardH > vh - margin)  top  = vh - cardH - margin;
  if (top < margin)  top  = margin;
  if (left < margin) left = margin;
  card.style.left = left + 'px';
  card.style.top  = top  + 'px';
}

if (window.matchMedia('(hover: hover)').matches) {
  projectItems.forEach(item => {
    const card = previewMap[item.dataset.project];
    item.addEventListener('mouseenter', (e) => {
      clearTimeout(previewTimeout);
      previewCards.forEach(c => { if (c !== card) c.classList.remove('active'); });
      if (card) { positionPreview(card, e.clientX, e.clientY); card.classList.add('active'); }
    });
    item.addEventListener('mousemove', (e) => {
      if (card && card.classList.contains('active')) positionPreview(card, e.clientX, e.clientY);
    });
    item.addEventListener('mouseleave', () => {
      previewTimeout = setTimeout(() => { if (card) card.classList.remove('active'); }, 100);
    });
  });
  previewCards.forEach(card => {
    card.addEventListener('mouseenter', () => { clearTimeout(previewTimeout); card.classList.add('active'); });
    card.addEventListener('mouseleave', () => { previewTimeout = setTimeout(() => card.classList.remove('active'), 150); });
  });
}


/* ════════════════════════════════════
   8. SMOOTH SCROLL
════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});


/* ════════════════════════════════════
   9. PILL RIPPLE
════════════════════════════════════ */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform:translate(-50%,-50%) scale(20); opacity:0; } }`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.style.cssText = `position:absolute;width:6px;height:6px;background:rgba(232,201,126,0.5);border-radius:50%;left:${e.offsetX}px;top:${e.offsetY}px;transform:translate(-50%,-50%) scale(0);animation:rippleAnim 0.5s ease-out forwards;pointer-events:none;`;
    this.style.position = 'relative'; this.style.overflow = 'hidden';
    this.appendChild(r);
    setTimeout(() => r.remove(), 500);
  });
});


/* ════════════════════════════════════
   10. STAT COUNTERS
════════════════════════════════════ */
function animateCounter(el, target, duration = 1200) {
  const start   = performance.now();
  const isFloat = target % 1 !== 0;
  const suffix  = (el.textContent.match(/[^0-9.]+$/) || [''])[0];
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const e = 1 - Math.pow(1 - progress, 3);
    el.textContent = (isFloat ? (target * e).toFixed(2) : Math.floor(target * e)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseFloat(entry.target.textContent));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));


/* ════════════════════════════════════
   11. EDU CARDS STAGGER
════════════════════════════════════ */
const eduCards = document.querySelectorAll('.edu-card');
const eduObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = Array.from(eduCards).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 150);
      eduObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
eduCards.forEach(c => eduObserver.observe(c));


/* ════════════════════════════════════
   12. ACTIVE NAV HIGHLIGHT
════════════════════════════════════ */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));