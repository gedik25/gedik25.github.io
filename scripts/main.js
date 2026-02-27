document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Fade-in on scroll using IntersectionObserver
    var observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .timeline-item, .contact-card, .interests-section').forEach(function (el) {
        el.classList.add('fade-observe');
        observer.observe(el);
    });

    // Contact form handler
    var form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('.btn-submit');
            btn.textContent = 'Gönderildi!';
            btn.style.background = '#7eb8a2';
            setTimeout(function () {
                btn.textContent = 'Gönder';
                btn.style.background = '';
                form.reset();
            }, 2000);
        });
    }
});
