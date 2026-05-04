/* =====================================================
   NAVBAR — scroll behaviour + mobile toggle
   ===================================================== */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
const navLinks  = document.querySelectorAll('.nav-link');

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 400);
  highlightActiveLink();
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  // animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)'  : '';
  spans[1].style.opacity   = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = spans[1].style.opacity = spans[2].style.transform = '';
  });
});

/* =====================================================
   ACTIVE NAV LINK on scroll
   ===================================================== */
function highlightActiveLink() {
  const scrollY = window.scrollY + 120;
  document.querySelectorAll('section[id]').forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* =====================================================
   FADE-IN on scroll (Intersection Observer)
   ===================================================== */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings in a grid
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)')
      );
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* =====================================================
   SMOOTH SCROLL (polyfill-safe)
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* =====================================================
   INIT
   ===================================================== */
highlightActiveLink();
