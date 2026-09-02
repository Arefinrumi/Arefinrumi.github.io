/* ============================================================
   S. M. Arefin Rumi — portfolio
   Vanilla JS. No dependencies, no build step.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. THEME — persisted, respects OS default on first visit
     ---------------------------------------------------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeBtn');
  var STORE = 'arefin-theme';

  function readStored() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }
  function writeStored(v) {
    try { localStorage.setItem(STORE, v); } catch (e) { /* private mode */ }
  }

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label',
        t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0b0f14' : '#f7f9fb');
  }

  // Dark is the house style. A visitor's explicit choice wins and is remembered;
  // otherwise we open dark regardless of OS preference.
  var stored = readStored();
  applyTheme(stored === 'light' ? 'light' : 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      writeStored(next);
    });
  }

  /* ----------------------------------------------------------
     2. MOBILE NAV
     ---------------------------------------------------------- */
  var burger = document.getElementById('burger');
  var navLinks = document.querySelector('.nav-links');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ----------------------------------------------------------
     3. STICKY NAV BORDER
     ---------------------------------------------------------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('stuck', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------
     4. HERO TERMINAL — typewriter
     ---------------------------------------------------------- */
  var term = document.getElementById('termBody');

  var SCRIPT = [
    { t: 'cmd',  text: 'whoami' },
    { t: 'out',  text: 'S. M. Arefin Rumi' },
    { t: 'out',  text: 'DevOps & Infrastructure Engineer @ Synesis IT PLC' },
    { t: 'out',  text: 'Dhaka, Bangladesh  ·  9+ years in production' },
    { t: 'gap' },
    { t: 'cmd',  text: 'cat ./stack.yml' },
    { t: 'kv',   k: 'cloud',    v: 'OCI · Cloudflare · AWS' },
    { t: 'kv',   k: 'ci_cd',    v: 'Jenkins · GitLab CI · Ansible · ArgoCD' },
    { t: 'kv',   k: 'runtime',  v: 'Docker · NGINX · Kubernetes' },
    { t: 'kv',   k: 'data',     v: 'Percona XtraDB · MySQL · HAProxy' },
    { t: 'kv',   k: 'observe',  v: 'Prometheus · Grafana · Zabbix · Sentry' },
    { t: 'gap' },
    { t: 'cmd',  text: 'systemctl status platform.service' },
    { t: 'ok',   text: '● platform.service — active (running)' },
    { t: 'dim',  text: '  uptime 99.9%   ·   national scale   ·   0 pages tonight' },
    { t: 'gap' },
    { t: 'cmd',  text: 'ls ./projects' },
    { t: 'out',  text: 'hls-edge-cdn/   pxc-galera-cluster/   jitsi-ansible-iac/' },
    { t: 'out',  text: 'secure-cicd/    jibri-fleet/' },
    { t: 'end' }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderAll() {
    // Instant, fully-rendered version (reduced motion, or no animation wanted)
    var html = '';
    SCRIPT.forEach(function (l) {
      if (l.t === 'cmd') html += '<span class="pr">$</span> <span class="cmd">' + esc(l.text) + '</span>\n';
      else if (l.t === 'kv') html += '  <span class="key">' + esc(l.k) + ':</span> ' + esc(l.v) + '\n';
      else if (l.t === 'ok') html += '<span class="ok">' + esc(l.text) + '</span>\n';
      else if (l.t === 'dim') html += '<span class="dim">' + esc(l.text) + '</span>\n';
      else if (l.t === 'gap') html += '\n';
      else if (l.t === 'end') html += '<span class="pr">$</span> <span class="cur"></span>';
      else html += esc(l.text) + '\n';
    });
    term.innerHTML = html;
  }

  function play() {
    var html = '';
    var i = 0;

    function nextLine() {
      if (i >= SCRIPT.length) return;
      var l = SCRIPT[i++];

      if (l.t === 'gap') { html += '\n'; term.innerHTML = html; return setTimeout(nextLine, 90); }

      if (l.t === 'end') {
        html += '<span class="pr">$</span> <span class="cur"></span>';
        term.innerHTML = html;
        return;
      }

      if (l.t === 'cmd') {
        // type the command out character by character
        var full = l.text, pos = 0;
        html += '<span class="pr">$</span> <span class="cmd">';
        (function typeChar() {
          if (pos < full.length) {
            html += esc(full.charAt(pos++));
            term.innerHTML = html + '</span><span class="cur"></span>';
            return setTimeout(typeChar, 26 + Math.random() * 34);
          }
          html += '</span>\n';
          term.innerHTML = html;
          setTimeout(nextLine, 240);
        })();
        return;
      }

      // output lines appear whole — that's how terminals behave
      if (l.t === 'kv') html += '  <span class="key">' + esc(l.k) + ':</span> ' + esc(l.v) + '\n';
      else if (l.t === 'ok') html += '<span class="ok">' + esc(l.text) + '</span>\n';
      else if (l.t === 'dim') html += '<span class="dim">' + esc(l.text) + '</span>\n';
      else html += esc(l.text) + '\n';

      term.innerHTML = html + '<span class="cur"></span>';
      setTimeout(nextLine, 95);
    }

    nextLine();
  }

  if (term) {
    if (reduced) renderAll();
    else setTimeout(play, 420);
  }

  /* ----------------------------------------------------------
     5. SCROLL REVEAL
     ---------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger siblings for a gentler cascade
        var sibs = Array.prototype.slice.call(el.parentNode.children);
        var idx = Math.min(sibs.indexOf(el), 5);
        setTimeout(function () { el.classList.add('in'); }, idx * 70);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------
     6. STAT COUNTERS
     ---------------------------------------------------------- */
  var stats = document.querySelectorAll('.stats b[data-count]');

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (String(target).split('.')[1] || '').length;
    var start = performance.now();
    var dur = 1100;

    function frame(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }

  if (!reduced && 'IntersectionObserver' in window && stats.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        animateCount(e.target);
        so.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (el) { so.observe(el); });
  }

  /* ----------------------------------------------------------
     7. ACTIVE NAV HIGHLIGHT
     ---------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var linkFor = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var current = null;
    var ao = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        if (id === current) return;
        if (current && linkFor[current]) linkFor[current].classList.remove('active');
        if (linkFor[id]) linkFor[id].classList.add('active');
        current = id;
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { ao.observe(s); });
  }

  /* ----------------------------------------------------------
     8. COPY EMAIL
     ---------------------------------------------------------- */
  var copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      var done = function () {
        var was = copyBtn.textContent;
        copyBtn.textContent = '✓ copied to clipboard';
        copyBtn.classList.add('done');
        setTimeout(function () {
          copyBtn.textContent = was;
          copyBtn.classList.remove('done');
        }, 1900);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () { fallback(email, done); });
      } else {
        fallback(email, done);
      }
    });
  }

  function fallback(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
  }

  /* ----------------------------------------------------------
     9. FOOTER YEAR
     ---------------------------------------------------------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
