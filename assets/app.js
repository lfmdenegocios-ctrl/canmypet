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
})();
