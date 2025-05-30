document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header height
                    behavior: 'smooth'
                });
                // Close mobile nav if open and link is clicked
                if (navLinks.classList.contains('active')) {
                    toggleNav();
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const icon = menuToggle.querySelector('i');

    const toggleNav = () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    menuToggle.addEventListener('click', toggleNav);

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('main section[id]');
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 80; // Adjusted for header
            let sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', navHighlighter);
    navHighlighter(); // Initial call

    // Impact counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText.replace('+', '').replace('-', '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = (counter.getAttribute('data-target').startsWith('-') ? '-' : (counter.getAttribute('data-target').startsWith('+') ? '+' : '')) + Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = (counter.getAttribute('data-target').startsWith('-') ? '-' : (counter.getAttribute('data-target').startsWith('+') ? '+' : '')) + target;
            }
        };
        updateCount();
    };

    const observerOptions = {
        root: null,
        threshold: 0.3 // Trigger when 30% of the element is visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Basic form validation feedback (can be expanded)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // You would add actual form submission logic here (e.g., to Formspree, Netlify Forms, or a backend)
            e.preventDefault(); // Prevent actual submission for this static example
            alert('Thank you for your message! We will get back to you soon.');
            this.reset(); // Reset form fields
        });
    }

    // Animate elements on scroll (simple version)
    const animatedElements = document.querySelectorAll('.content-section .section-header, .content-section .container > *:not(.section-header)');
    const fadeInOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused'; // Keep animation paused initially
        fadeInOnScrollObserver.observe(el);
    });

});
