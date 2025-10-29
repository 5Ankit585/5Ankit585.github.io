// Theme Toggle Functions
function toggleTheme() {
  document.body.classList.toggle('dark');
  saveTheme();
}

function loadTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const checkbox = document.getElementById('checkbox');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark');
      checkbox.checked = true;
    } else {
      document.body.classList.remove('dark');
      checkbox.checked = false;
    }
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
}

function saveTheme() {
  try {
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
    }
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .cta-button').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const sectionId = link.getAttribute('href');
      const target = document.querySelector(sectionId);
      if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Hamburger Menu for Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('mobile-open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('mobile-open');
  });
});

// Scroll-to-top button
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Parallax effect on hero image
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector('.profile-img');
  if (heroImg) {
    heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Section fade-in animation on scroll
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Contact Form Validation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message || !email.includes('@')) {
    e.preventDefault();
    alert('Please fill all fields correctly.');
    return false;
  }
});

// Flip Card Interactions (optional analytics)
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    // Placeholder for tracking: gtag('event', 'flip_card_view', { section: card.closest('section').id });
    console.log('Flip card interacted');
  });
});

// New: Full Project Card Click to Navigate
document.querySelectorAll('.project-card').forEach(card => {
  const projectUrl = card.getAttribute('data-url');
  if (projectUrl) {
    card.style.cursor = 'pointer'; // Visual cue
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking the link itself
      if (e.target.closest('.project-link')) return;
      window.open(projectUrl, '_blank');
    });
  }
});

// Initialize on load
loadTheme();