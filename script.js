// If URL has a hash, remove it and scroll to top
if (window.location.hash) {
  history.replaceState(null, null, '');
  window.scrollTo(0, 0);
}

// Scroll to top before the page unloads (refresh or close)
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Smooth scroll to sections when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Handle contact form submit: prevent reload, show alert, reset form
function handleSubmit(event) {
  event.preventDefault();
  alert("Your message has been sent! ✅");
  event.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  // Fade-in effect for elements with fade-init class
  const faders = document.querySelectorAll('.fade-init');
  const options = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(fader => observer.observe(fader));

  // Staggered fade-in for certificates images
  const staggerCertificates = document.querySelectorAll('.certificates-gallery .stagger-fade');
  if (staggerCertificates.length > 0) {
    const observerCert = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          staggerCertificates.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    observerCert.observe(staggerCertificates[0]);
  }

  // Dark mode toggle button
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (toggleBtn) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️'; // Sun icon for light mode toggle
    } else {
      toggleBtn.textContent = '🌙'; // Moon icon for dark mode toggle
    }

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Fade-in all elements with class stagger-fade with delay
  document.querySelectorAll('.stagger-fade').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });

  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMenu');

  if (burger && menu && closeBtn) {
    burger.addEventListener('click', () => menu.classList.add('open'));
    closeBtn.addEventListener('click', () => menu.classList.remove('open'));

    document.querySelectorAll('.mobile-links a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        menu.classList.remove('open');
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        menu.classList.remove('open');
      }
    }, { passive: true });
  }
});
