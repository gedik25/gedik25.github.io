// Apply saved theme before DOM renders to prevent flash
(function () {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark');
})();

document.addEventListener('DOMContentLoaded', function () {

    // Theme toggle
    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            document.body.classList.toggle('dark');
            var isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Typewriter effect for site title
    var titleEl = document.getElementById('site-title');
    var sloganEl = document.getElementById('site-slogan');
    if (titleEl && titleEl.dataset.text) {
        var parts = titleEl.dataset.text.split('|');
        var firstName = parts[0] || '';
        var lastName = parts[1] || '';
        var fullText = firstName + lastName;
        var i = 0;

        var cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        titleEl.textContent = '';
        titleEl.appendChild(cursor);

        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            titleEl.innerHTML = firstName + '<span class="glow">' + lastName + '</span>';
            if (sloganEl) sloganEl.classList.add('visible');
        } else {
            function typeNext() {
                if (i < fullText.length) {
                    var isLastName = i >= firstName.length;

                    if (i === firstName.length && !titleEl.querySelector('span.glow')) {
                        cursor.remove();
                        var span = document.createElement('span');
                        titleEl.appendChild(span);
                        titleEl.appendChild(cursor);
                    }

                    var glowSpan = titleEl.querySelector('span:not(.typewriter-cursor)');
                    if (isLastName && glowSpan) {
                        glowSpan.textContent += fullText[i];
                    } else {
                        cursor.before(document.createTextNode(fullText[i]));
                    }

                    i++;
                    setTimeout(typeNext, 90 + Math.random() * 60);
                } else {
                    setTimeout(function () {
                        cursor.remove();
                        var span = titleEl.querySelector('span:not(.typewriter-cursor)');
                        if (span) span.classList.add('glow');
                        if (sloganEl) sloganEl.classList.add('visible');
                    }, 400);
                }
            }
            setTimeout(typeNext, 300);
        }
    }

    // Intersection Observer — scroll-triggered reveal animations
    var revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(function (el, i) {
            el.style.transitionDelay = (i * 80) + 'ms';
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function (el) { el.classList.add('visible'); });
    }

    // Active nav link highlight
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Contact form handler
    var form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('.btn-submit');
            btn.textContent = 'Gönderildi!';
            btn.style.background = '#16A34A';
            setTimeout(function () {
                btn.textContent = 'Gönder';
                btn.style.background = '';
                form.reset();
                togglePhone();
            }, 2000);
        });
    }
});

function togglePhone() {
    var phoneGroup = document.getElementById('phone-group');
    var phoneInput = document.getElementById('phone');
    var prefPhone = document.getElementById('pref-phone');
    if (!phoneGroup || !phoneInput || !prefPhone) return;

    if (prefPhone.checked) {
        phoneGroup.style.display = 'block';
        phoneInput.required = true;
    } else {
        phoneGroup.style.display = 'none';
        phoneInput.required = false;
        phoneInput.value = '';
    }
}
