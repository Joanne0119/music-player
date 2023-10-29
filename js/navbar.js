const navbar = document.querySelector('nav');
const logoImg = document.querySelector('.logo-img');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('sticky', window.scrollY > 0);

  if (window.scrollY > 0) {
    logoImg.src = "images/Coffee beans black.png";
  } else {
    logoImg.src = "images/Coffee beans white.png";
  }
  
})