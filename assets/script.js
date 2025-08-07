
document.addEventListener('DOMContentLoaded', function() {
  var scrollProgress = document.querySelector('.scroll-progress');
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function() {
    var scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
    if (window.scrollY > 50) { navbar && navbar.classList.add('scrolled'); } else { navbar && navbar.classList.remove('scrolled'); }
  });

  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });

  // Track store item clicks
  document.querySelectorAll('.buy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var itemName = this.closest('.store-item')?.querySelector('h3')?.textContent || 'Unknown';
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', { 'event_category': 'Store', 'event_label': itemName });
      }
    });
  });

  // Track contact form submissions
  var contactForm = document.querySelector('form[data-track="contact"]');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'submit', { 'event_category': 'Contact', 'event_label': 'Contact_Form_Submit' });
      }
    });
  }

});
