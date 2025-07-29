// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('show') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Language dropdown
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
    languageBtn.classList.toggle('active');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-dropdown')) {
        languageDropdown.classList.remove('show');
        languageBtn.classList.remove('active');
    }
});

// Change language function
function changeLanguage(language) {
    languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${language}`;
    languageDropdown.classList.remove('show');
    languageBtn.classList.remove('active');
    console.log('Language changed to:', language);
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll animations
function animateOnScroll() {
    const serviceCards = document.querySelectorAll('.about-service-card');
    serviceCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
            card.style.transitionDelay = `${index * 0.1}s`;
        }
    });
}

// Initialize animations
window.addEventListener('load', () => {
    animateOnScroll();
});
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Restart animation when clicking on cards
document.querySelectorAll('.asset-card').forEach(card => {
    card.addEventListener('click', () => {
        const liquid = card.querySelector('.liquid');
        liquid.style.animation = 'none';
        liquid.offsetHeight; // Trigger reflow
        liquid.style.animation = null;
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


// 滚动动画控制器
document.addEventListener('DOMContentLoaded', function () {
    // 进度条动画
    const progressBars = document.querySelectorAll('.avia-progress-fill');
    progressBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.animation = `fillLiquid 2.5s ease-in-out forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(bar);
    });


    // 按钮波纹效果
    const buttons = document.querySelectorAll('.apply-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // 初始化所有动画
    animateOnScroll();
});
