// Load saved theme from localStorage and update checkbox state
function loadTheme() {
  const checkbox = document.getElementById('checkbox');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    checkbox.checked = true;
  } else {
    document.body.classList.remove('dark');
    checkbox.checked = false;
  }
}

// Save theme to localStorage
function saveTheme() {
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelector('nav').addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const sectionId = e.target.getAttribute('href');
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

// Scroll-to-top button
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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

// Initialize theme on page load
loadTheme();
