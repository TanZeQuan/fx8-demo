const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const productObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, delay);
      productObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.product-item');
  items.forEach(item => {
    productObserver.observe(item);
  });
});

document.documentElement.style.scrollBehavior = 'smooth';
