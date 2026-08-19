// Triple A Tailoring Services — shared front-end behaviour (no framework, no build step)
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Gallery filters (Gallery/Portfolio page)
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var cat = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var show = cat === 'all' || item.getAttribute('data-cat') === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Lightbox
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lightbox__cap');
    var closeBtn = lightbox.querySelector('.lightbox__close');
    document.querySelectorAll('.gallery-item img, .card__media img[data-lightbox]').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.getAttribute('src');
        lbImg.alt = img.getAttribute('alt') || '';
        if (lbCap) { lbCap.textContent = img.getAttribute('alt') || ''; }
        lightbox.classList.add('is-open');
      });
    });
    function closeLightbox() { lightbox.classList.remove('is-open'); lbImg.src = ''; }
    if (closeBtn) { closeBtn.addEventListener('click', closeLightbox); }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) { closeLightbox(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeLightbox(); }
    });
  }

  // Simple testimonial slider auto-rotate on Home (cards already visible/stacked on mobile; this just highlights one at a time on wide screens if data-slider present)
  var slider = document.querySelector('[data-testi-slider]');
  if (slider) {
    var cards = slider.querySelectorAll('.testi-card');
    var idx = 0;
    if (cards.length > 1) {
      setInterval(function () {
        cards[idx].style.outline = 'none';
        idx = (idx + 1) % cards.length;
        cards[idx].style.outline = '2px solid #E8672C';
      }, 3500);
    }
  }

  // Basic client-side form handling: no backend wired up yet, so show a friendly
  // confirmation and prompt WhatsApp as the reliable fallback (forms are placeholders
  // until a form backend / email address is connected).
  document.querySelectorAll('form[data-placeholder-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.getAttribute('data-success-message') || 'Thank you — this form is not yet connected to email. Please also reach us on WhatsApp so we see your request right away.';
      var note = form.querySelector('.form-submit-note');
      if (note) {
        note.textContent = msg;
        note.style.display = 'block';
      } else {
        alert(msg);
      }
    });
  });
});
