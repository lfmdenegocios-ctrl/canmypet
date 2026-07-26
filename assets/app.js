/* CanMyPet — shared interactions (dataset-aware) */
(function () {
  var p = location.pathname;
  var inFoods = /\/foods\//.test(p);
  var inTools = /\/tools\//.test(p);

  function foodHref(f) {
    var base = inFoods ? '' : inTools ? '../foods/' : 'foods/';
    if (f.rich) return base + f.rich; // hand-crafted dog page
    return base + 'result.html?food=' + f.slug + '&species=dog';
  }
  function go(f) { if (f) location.href = foodHref(f); }

  function firstMatch(term) {
    if (window.PETIBLE) {
      var hits = window.PETIBLE.search(term);
      if (hits.length) return hits[0];
    }
    return null;
  }

  // ----- homepage / generic search (skipped on pages that handle their own) -----
  var form = document.getElementById('food-search');
  var input = document.getElementById('food-input');
  if (form && input && !window.__PETIBLE_CUSTOM_SEARCH) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = firstMatch(input.value);
      if (f) { go(f); }
      else { location.href = (inTools ? '../foods/' : inFoods ? '' : 'foods/') + 'index.html'; }
    });

    // autocomplete dropdown
    var ac = document.createElement('div');
    ac.className = 'ac'; ac.style.display = 'none';
    form.appendChild(ac);
    function closeAc() { ac.style.display = 'none'; ac.innerHTML = ''; }
    input.addEventListener('input', function () {
      var q = input.value.trim();
      if (!q || !window.PETIBLE) { closeAc(); return; }
      var hits = window.PETIBLE.search(q).slice(0, 6);
      if (!hits.length) { closeAc(); return; }
      ac.innerHTML = '';
      hits.forEach(function (f) {
        var verdict = f.dog ? f.dog.v : 'caution';
        var item = document.createElement('a');
        item.className = 'ac-item'; item.href = foodHref(f);
        item.innerHTML = '<span class="ac-emoji">' + f.emoji + '</span><span class="ac-name">' + f.name + '</span><span class="ac-dot" style="background:var(--' + verdict + ')"></span>';
        ac.appendChild(item);
      });
      ac.style.display = 'block';
    });
    document.addEventListener('click', function (e) { if (!form.contains(e.target)) closeAc(); });
  }

  // quick suggestion tags
  document.querySelectorAll('#quick-tags .tag').forEach(function (t) {
    t.addEventListener('click', function () {
      var f = firstMatch(t.textContent);
      if (f) go(f);
    });
  });

  // duplicate marquee content for seamless loop
  var mq = document.getElementById('marquee');
  if (mq) { mq.innerHTML += mq.innerHTML; }

  // scroll reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // mobile menu
  var mb = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');
  if (mb && links) {
    mb.addEventListener('click', function () {
      var open = links.style.display === 'flex';
      if (open) { links.removeAttribute('style'); return; }
      links.style.display = 'flex'; links.style.position = 'absolute'; links.style.top = '74px';
      links.style.left = '0'; links.style.right = '0'; links.style.flexDirection = 'column';
      links.style.background = '#fff'; links.style.padding = '20px 24px';
      links.style.borderBottom = '1px solid var(--line)'; links.style.gap = '14px';
    });
  }

  // newsletter band → MailerLite (delegated: works on every page with .nl-form)
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.classList || !f.classList.contains('nl-form')) return;
    e.preventDefault();
    var btn = f.querySelector('button[type=submit]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    var fd = new FormData(f);
    fetch(f.action, { method: 'POST', body: fd })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!(j && j.success)) throw new Error('ml');
        var pdf = f.getAttribute('data-pdf') || 'assets/fridge-guide.pdf';
        var inner = f.closest ? f.closest('.nl-inner') : null;
        var html = '<div class="nl-copy"><h3>You\'re in! 🎉</h3><p style="margin-bottom:10px">Check your inbox — and here\'s your guide right away:</p>' +
          '<a class="nl-btn" href="' + pdf + '" target="_blank" rel="noopener">⬇️ Download the Fridge Guide (PDF)</a></div>';
        if (inner) inner.innerHTML = html; else f.outerHTML = html;
      })
      .catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Get the free guide →'; }
        alert('Something went wrong — please try again in a moment.');
      });
  });
})();

/* ---------- Per-pet serving calculator (food pages) ----------
   Standard veterinary energy maths: RER = 70 x kg^0.75; maintenance energy is
   RER x 1.6 for a neutered adult dog and x1.2 for a cat. Treats should stay within
   10% of daily calories, so the daily ceiling for one food is that 10% converted
   into grams using the food's kcal/100g. Caution foods get a lower practical cap,
   because "within the calorie budget" is not the same as "advisable". */
(function () {
  var boxes = document.querySelectorAll('.svc');
  if (!boxes.length) return;

  Array.prototype.forEach.call(boxes, function (box) {
    var kcal100 = parseFloat(box.getAttribute('data-k'));
    var sp = box.getAttribute('data-sp') === 'cat' ? 'cat' : 'dog';
    var caution = box.getAttribute('data-caution') === '1';
    var unitName = box.getAttribute('data-unit');
    var unitWeight = parseFloat(box.getAttribute('data-uw'));
    var unit = 'lb';
    var input = box.querySelector('.svc-w');
    var out = box.querySelector('.svc-out');

    box.querySelectorAll('.svc-u').forEach(function (b) {
      b.addEventListener('click', function () {
        box.querySelectorAll('.svc-u').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
        unit = b.getAttribute('data-u');
      });
    });

    function render() {
      var w = parseFloat(input.value);
      if (!(w > 0)) {
        out.innerHTML = '<div class="svc-res"><p style="margin:0;font-weight:700">Enter your ' + sp + "'s weight above and we'll work out the exact amount.</p></div>";
        return;
      }
      var kg = unit === 'lb' ? w * 0.453592 : w;
      if (kg > 120) kg = 120;
      var rer = 70 * Math.pow(kg, 0.75);
      var mer = rer * (sp === 'cat' ? 1.2 : 1.6);
      var treatKcal = mer * 0.10;
      var usableKcal = caution ? treatKcal * 0.4 : treatKcal;
      var grams = (usableKcal / kcal100) * 100;

      var gTxt = grams >= 100 ? Math.round(grams / 5) * 5 : (grams >= 20 ? Math.round(grams) : Math.round(grams * 10) / 10);
      var oz = Math.round((grams / 28.35) * 10) / 10;

      var eq = '';
      if (unitName && unitWeight > 0) {
        var n = grams / unitWeight;
        var nTxt = n >= 2 ? Math.round(n) : (n >= 0.5 ? (Math.round(n * 10) / 10) : null);
        if (nTxt) eq = '<p class="svc-eq">≈ ' + nTxt + ' ' + unitName + (nTxt > 1 && !/cup|tbsp|oz/.test(unitName) ? 's' : '') + '</p>';
        else eq = '<p class="svc-eq">Less than half a ' + unitName + ' — a small taste, not a portion.</p>';
      }

      var warn = caution
        ? '<div class="svc-warn"><b>This is a ceiling, not a recommendation.</b> This food is on the “in moderation” list, so we’ve already reduced the figure well below the full treat allowance. Offer it occasionally rather than daily, and stop at the first sign of an upset stomach.</div>'
        : '';

      out.innerHTML =
        '<div class="svc-res">' +
          '<div class="svc-big">' + gTxt + ' g <small>maximum per day (' + oz + ' oz) for a ' + (Math.round(kg * 10) / 10) + ' kg ' + sp + '</small></div>' +
          eq +
          '<div class="svc-bd"><b>How we got there:</b> a ' + (Math.round(kg * 10) / 10) + ' kg ' + sp +
            ' needs roughly <b>' + Math.round(mer) + ' kcal</b> a day. Treats should stay under 10% of that — about <b>' + Math.round(treatKcal) + ' kcal</b>' +
            (caution ? ', and we cap this food at ' + Math.round(usableKcal) + ' kcal' : '') +
            '. At ' + kcal100 + ' kcal per 100 g, that works out to the amount above.</div>' +
          warn +
        '</div>';
      try { if (window.gtag) gtag('event', 'serving_calc', { species: sp }); } catch (e) {}
    }

    var go = box.querySelector('.svc-go');
    if (go) go.addEventListener('click', render);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') render(); });
  });
})();
