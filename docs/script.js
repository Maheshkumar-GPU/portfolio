// =========================================
// THEME TOGGLE
// =========================================
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// =========================================
// HAMBURGER MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// =========================================
// NAVBAR SCROLL SHADOW
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// =========================================
// ACTIVE NAV LINK (IntersectionObserver)
// =========================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const observerOptions = { rootMargin: '-40% 0px -55% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals in a grid/timeline
      const parent = entry.target.parentElement;
      const siblings = [...parent.querySelectorAll('.reveal')];
      const index = siblings.indexOf(entry.target);
      const delay = Math.min(index * 80, 400);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// =========================================
// BACK TO TOP
// =========================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================
// CONTACT FORM VALIDATION
// =========================================
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(input, errorEl, message) {
  input.classList.add('invalid');
  errorEl.textContent = message;
  return false;
}

function clearError(input, errorEl) {
  input.classList.remove('invalid');
  errorEl.textContent = '';
  return true;
}

nameInput.addEventListener('input', () => {
  nameInput.value.trim().length >= 1
    ? clearError(nameInput, nameError)
    : setError(nameInput, nameError, 'Name is required');
});

emailInput.addEventListener('input', () => {
  validateEmail(emailInput.value.trim())
    ? clearError(emailInput, emailError)
    : setError(emailInput, emailError, 'Please enter a valid email');
});

messageInput.addEventListener('input', () => {
  messageInput.value.trim().length >= 10
    ? clearError(messageInput, messageError)
    : setError(messageInput, messageError, 'Message must be at least 10 characters');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  if (!nameInput.value.trim()) {
    setError(nameInput, nameError, 'Name is required');
    valid = false;
  } else {
    clearError(nameInput, nameError);
  }

  if (!validateEmail(emailInput.value.trim())) {
    setError(emailInput, emailError, 'Please enter a valid email');
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (messageInput.value.trim().length < 10) {
    setError(messageInput, messageError, 'Message must be at least 10 characters');
    valid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (!valid) return;

  // Simulate sending
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});
