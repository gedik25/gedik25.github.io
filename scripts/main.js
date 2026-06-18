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

    // Project filtering handler
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Remove active class from all filter buttons
                filterBtns.forEach(function (b) {
                    b.classList.remove('active');
                });
                // Add active class to clicked button
                btn.classList.add('active');

                var filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(function (card) {
                    var category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    // Scroll to Top behavior
    var scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Dynamic Tab Title Focus/Blur
    var originalTitle = document.title;
    window.addEventListener('blur', function () {
        document.title = 'Buralardayım, beklerim! 👋';
    });
    window.addEventListener('focus', function () {
        document.title = originalTitle;
    });
});


