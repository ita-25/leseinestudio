/* =========================================================
   LA SEINE STUDIO — SHARED SITE SCRIPT
   Loaded on every page. Sections below are independent —
   safe to edit one without breaking the others.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. CURTAIN INTRO (runs once, only if curtain exists on page)
     --------------------------------------------------------- */
  const curtainL = document.getElementById('curtainL');
  const curtainR = document.getElementById('curtainR');
  if (curtainL && curtainR) {
    setTimeout(() => {
      curtainL.classList.add('open');
      curtainR.classList.add('open');
    }, 400);
  }

  /* ---------------------------------------------------------
     2. STICKY HEADER (adds frosted background on scroll)
     --------------------------------------------------------- */
  const header = document.getElementById('header');
  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
    updateHeader();
    window.addEventListener('scroll', updateHeader);
  }

  /* ---------------------------------------------------------
     3. MOBILE MENU — open, close on link, close on burger
        click again, close on outside click, close on Escape.
        (Fix: header z-index now sits above the mobile menu,
        so the burger stays clickable while the menu is open.)
     --------------------------------------------------------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');

  function closeMenu() {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    burger.classList.add('active');
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
  }

  if (burger && mobileMenu && overlay) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------------------------------------------------------
     4. SCROLL REVEAL — fades/slides sections into view
     --------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------
     5. HERO PARTICLES — only runs if a particle field exists
     --------------------------------------------------------- */
  const field = document.getElementById('particleField');
  if (field) {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 5 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animation = `floatP ${8 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite`;
      field.appendChild(p);
    }
  }

  /* ---------------------------------------------------------
     6. FILTER TABS — Stories & Gallery pages
     --------------------------------------------------------- */
  const tabs = document.querySelectorAll('.filter-tab');
  if (tabs.length) {
    const items = document.querySelectorAll('[data-category]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        items.forEach(item => {
          item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
        });
      });
    });
  }

  /* ---------------------------------------------------------
     7. FORMS — newsletter & contact (no backend yet,
        shows a confirmation message in place of the form)
     --------------------------------------------------------- */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.parentElement.querySelector('.form-note');
      if (note) note.classList.add('visible');
      form.reset();
    });
  });

});
                              
