 // Language change function
        function changeLanguage(lang) {
            alert(`语言已切换到 ${lang}`);
        }
        document.addEventListener('DOMContentLoaded', () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in-up');
                        }
                    });
                },
                {
                    threshold: 0.2,
                }
            );

            document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
        });
        // Header scroll effect
        function handleHeaderScroll() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        // Mobile menu toggle
        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            const mobileBtn = document.getElementById('mobileMenuBtn');
            const icon = mobileBtn.querySelector('i');

            navLinks.classList.toggle('mobile-active');

            if (navLinks.classList.contains('mobile-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }

        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 4 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';

            document.getElementById('particles').appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 6000);
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function () {
            // Header scroll effect
            window.addEventListener('scroll', handleHeaderScroll);

            // Mobile menu toggle
            document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);

            // Language dropdown functionality
            const languageBtn = document.getElementById('languageBtn');
            const languageDropdown = document.getElementById('languageDropdown');

            // Close dropdown when clicking outside
            document.addEventListener('click', function (e) {
                if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                    languageDropdown.style.display = 'none';
                }
            });

            // Create particles continuously
            setInterval(createParticle, 300);

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
        // mobile toggle dropdown //
        document.addEventListener('DOMContentLoaded', function () {
            const languageBtn = document.getElementById('languageBtn');
            const languageDropdown = document.getElementById('languageDropdown');

            // Toggle dropdown on button click
            languageBtn.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent click bubbling to document
                const isVisible = languageDropdown.style.display === 'block';
                languageDropdown.style.display = isVisible ? 'none' : 'block';
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function (e) {
                if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                    languageDropdown.style.display = 'none';
                }
            });
        });
        
// Add entrance animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.asset-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Liquid animation function
function animateLiquid() {
    const liquidElements = document.querySelectorAll('.liquid');
    liquidElements.forEach(liquid => {
        const targetWidth = liquid.style.getPropertyValue('--target-width') || '0%';
        liquid.style.width = targetWidth;
    });
}

// Initialize liquid animations when page loads
window.addEventListener('load', animateLiquid);

// Re-animate liquid on hover
document.querySelectorAll('.asset-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const liquid = card.querySelector('.liquid');
        liquid.style.animation = 'fillUp 3s ease-in-out forwards, pulse 1.5s infinite';
    });

    card.addEventListener('mouseleave', () => {
        const liquid = card.querySelector('.liquid');
        liquid.style.animation = 'fillUp 3s ease-in-out forwards';
    });
});

/*********** Footer fade-in animation ***********/
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        } else {
            entry.target.classList.remove('fade-in');
        }
    });
}, {
    threshold: 0.1, // trigger when 10% is visible
});

document.querySelectorAll('.fade-element').forEach(el => {
    footerObserver.observe(el);
});

/*********** AVIA reveal animation ***********/
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
        } else {
            entry.target.classList.remove('reveal-in'); // optional reset
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-element').forEach(el => {
    revealObserver.observe(el);
});

/*********** Policy animation ***********/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
        } else {
            entry.target.classList.remove('reveal-in'); // optional reset
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-zoom-rotate').forEach((el) => {
    observer.observe(el);
});
