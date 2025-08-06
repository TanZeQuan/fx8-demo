// Language change function
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

// button link testing
 document.getElementById("start-trading-btn").addEventListener("click", function () {
    document.querySelector("#app-section").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("start-button").addEventListener("click", function () {
     document.querySelector("#app-section").scrollIntoView({ behavior: "smooth" });
  });

