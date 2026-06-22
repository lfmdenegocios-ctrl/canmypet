/* CanMyPet — awwwards motion layer (progressive enhancement) */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- smooth scroll (Lenis) ---------- */
  var lenis = null;
  function initLenis() {
    if (reduce || !window.Lenis) return;
    try {
      lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    } catch (e) {}
  }
  initLenis();

  // smooth in-page anchors (works with or without Lenis)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    var t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { offset: -80 });
    else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---------- custom cursor ---------- */
  if (fine && !reduce) {
    root.classList.add('cur');
    var dot = document.createElement('div'); dot.className = 'cur-dot';
    var ring = document.createElement('div'); ring.className = 'cur-ring';
    document.body.appendChild(dot); document.body.appendChild(ring);
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });
    (function ringLoop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(ringLoop);
    })();
    var hoverSel = 'a,button,input,select,.tag,.card,.fcard,.rel,summary,.chip';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) { ring.classList.add('hover'); dot.classList.add('hover'); }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) { ring.classList.remove('hover'); dot.classList.remove('hover'); }
    });
  }

  /* ---------- film grain ---------- */
  if (!reduce) { var g = document.createElement('div'); g.className = 'grain'; document.body.appendChild(g); }

  /* ---------- staggered reveals ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    // group siblings so cards/steps cascade
    var groups = {};
    document.querySelectorAll('.reveal').forEach(function (el) {
      var p = el.parentNode;
      groups[p ? (p.__gid || (p.__gid = Math.random())) : 'x'] = true;
    });
    document.querySelectorAll('.reveal').forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains('reveal'); });
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 90, 450) + 'ms';
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- kinetic hero headline ---------- */
  var kin = document.querySelector('.kin');
  if (kin && !reduce) {
    kin.classList.add('arm');
    kin.querySelectorAll('.word').forEach(function (w, i) { w.style.transitionDelay = (i * 75) + 'ms'; });
    var hl = kin.querySelector('.hl'); if (hl) hl.classList.add('arm');
    var hasIntro = !!document.getElementById('intro');
    var delay = hasIntro ? 1750 : 250;
    setTimeout(function () {
      kin.classList.add('in');
      if (hl) setTimeout(function () { hl.classList.add('drawn'); }, kin.querySelectorAll('.word').length * 75 + 150);
    }, delay);
  } else if (kin) { kin.classList.add('in'); }

  /* ---------- count-up stats ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, raw = el.textContent.trim();
        var m = raw.match(/^(\d+)(.*)$/); if (!m) return;
        var end = parseInt(m[1], 10), suffix = m[2], t0 = null, dur = 1300;
        function step(t) {
          if (!t0) t0 = t; var p = Math.min((t - t0) / dur, 1);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        el.textContent = '0' + suffix; requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.stat .num').forEach(function (el) { cio.observe(el); });
  }

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduce) {
    document.querySelectorAll('.btn-primary,.btn-dark').forEach(function (b) {
      b.classList.add('mag');
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        b.style.transform = 'translate(' + x * 0.3 + 'px,' + y * 0.4 + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- card tilt ---------- */
  if (fine && !reduce) {
    document.querySelectorAll('.card').forEach(function (c) {
      c.setAttribute('data-tilt-on', '');
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(800px) rotateX(' + (-py * 6) + 'deg) rotateY(' + (px * 7) + 'deg) translateY(-6px)';
      });
      c.addEventListener('mouseleave', function () { c.style.transform = ''; });
    });
  }

  /* ---------- nav hide on scroll / shadow ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var last = 0;
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      header.classList.toggle('scrolled', y > 8);
      if (y > last && y > 200) header.classList.add('hide');
      else header.classList.remove('hide');
      last = y;
    }
    addEventListener('scroll', onScroll, { passive: true });
    if (lenis) lenis.on('scroll', onScroll);
  }

  /* ---------- hero parallax (blobs + floaties) ---------- */
  var hero = document.querySelector('.hero');
  if (hero && fine && !reduce) {
    var movers = hero.querySelectorAll('.blob,.floaties span');
    hero.addEventListener('mousemove', function (e) {
      var cx = e.clientX / innerWidth - 0.5, cy = e.clientY / innerHeight - 0.5;
      movers.forEach(function (el, i) {
        var d = (i % 3 + 1) * 12;
        el.style.translate = (cx * d) + 'px ' + (cy * d) + 'px';
      });
    });
  }

  /* ---------- rotating search placeholder ---------- */
  var input = document.getElementById('food-input');
  if (input && !reduce) {
    var samples = ['chocolate', 'grapes', 'banana', 'salmon', 'onion', 'peanut butter', 'cheese', 'watermelon'];
    var i = 0, base = 'Try “', tail = '”…';
    setInterval(function () {
      if (document.activeElement === input || input.value) return;
      i = (i + 1) % samples.length;
      input.setAttribute('placeholder', base + samples[i] + tail);
    }, 2600);
  }
})();
