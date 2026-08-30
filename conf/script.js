document.addEventListener('DOMContentLoaded', function () {

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function () {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current == 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    themeToggle.innerHTML = next === 'dark' 
      ? '<i data-lucide="sun" class="w-4 h-4"></i>'
      : '<i data-lucide="moon" class="w-4 h-4"></i>';
    lucide.createIcons();
  });

  // ── Marquee
  var marqueeEl = document.getElementById('marquee');
    new Splide(marqueeEl, {
      type: 'loop',
      drag: false,
      arrows: false,
      pagination: false,
      autoWidth: true,
      gap: '3rem',
      clones: 20,
      autoScroll: {
        speed: 1,
        pauseOnHover: true,
        pauseOnFocus: false,
      },
    }).mount(window.splide.Extensions);

  var marqueeTilted = document.getElementById('marquee-tilted');
    new Splide(marqueeTilted, {
      type: 'loop',
      drag: false,
      arrows: false,
      pagination: false,
      autoWidth: true,
      gap: '3rem',
      clones: 20,
      autoScroll: {
        speed: 1,
        pauseOnHover: true,
        pauseOnFocus: false,
      },
    }).mount(window.splide.Extensions);

  // ── Mobile Menu
  const toggle = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('menuClose');
  const menu = document.getElementById('mobileMenu');

  window.openMenu = function () {
    menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeMenu = function () {
    menu.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (toggle) toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
  });

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if(scrollTopBtn){
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth'});
    });
  }

  // ── Active Nav Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var href = a.getAttribute('href');
          if (href === '#contact') return ;
          var isActive = href === '#' + entry.target.id;
          if (isActive) {
            a.classList.add('text-nb-yellow', 'font-bold');
            a.classList.remove('text-nb-text');
          } else {
            a.classList.remove('text-nb-yellow', 'font-bold');
            a.classList.add('text-nb-text');
          }
        });
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(function (s) { navObserver.observe(s); });

  // ── Scroll-triggered section animations
  const animatedSections = document.querySelectorAll('.section-animate');

  const scrollObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  animatedSections.forEach(function (s) { scrollObserver.observe(s); });

  // ── Lightbox
  var projects = {
    'ecashbook': [
      'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
      'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
      'https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4',
    ],
    'masjidhub': [
      'https://fastly.picsum.photos/id/10/5000/3333.jpg?hmac=43eoIe3W2TvvE1tS2n8RmEkd8mNEf-OmdGah8WMOJ5Y',
      'https://fastly.picsum.photos/id/12/5000/3333.jpg?hmac=30L1T6ND3w5zfdwSGOvH2NtdQQ5ODgEsEHII1ElVYJ8',
    ],
    'wordpress-theme': [
      'https://fastly.picsum.photos/id/20/5000/3333.jpg?hmac=YQ1YqCj07SSr7wBLIL6KOB14iI8zNH2NA6avmFOmYHg',
      'https://fastly.picsum.photos/id/26/5000/3333.jpg?hmac=SvLQEbt8Wg4stf6YtNDqOmhH89dyXqOB5_zcaZZFsgY',
    ],
  };

  var currentImages = [];
  var currentIndex = 0;

  window.openLightbox = function (projectKey) {
    currentImages = projects[projectKey] || [];
    currentIndex = 0;
    showLightboxImage();
    document.getElementById('lightbox').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  function showLightboxImage() {
    document.getElementById('lightbox-img').src = currentImages[currentIndex];
    document.getElementById('lightbox-counter').textContent =
      '0' + (currentIndex + 1) + ' / 0' + currentImages.length;
    var nav = document.getElementById('lightbox-nav');
    if (currentImages.length <= 1) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
  }

  window.prevImage = function () {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showLightboxImage();
  };

  window.nextImage = function () {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showLightboxImage();
  };

  window.closeLightbox = function () {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function (e) {
    var lb = document.getElementById('lightbox');
    if (lb && !lb.classList.contains('hidden')) {
      if (e.key === 'ArrowRight') window.nextImage();
      if (e.key === 'ArrowLeft') window.prevImage();
    }
  });

  // ── Current year in footer
  var yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // lucid icon
  lucide.createIcons();

});