const navbar = document.querySelector('nav');

addEventListener('scroll', () => {
  navbar.classList.toggle('sticky', window.scrollY > 0);
})