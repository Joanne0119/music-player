const navbar = document.querySelector('nav');
const logoImg = document.querySelector('.logo-img');
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

window.addEventListener('scroll', () => {
  navbar.classList.toggle('sticky', window.scrollY > 0);

  if (window.scrollY > 0) {
    logoImg.src = "images/Coffee beans black.png";
  } else {
    logoImg.src = "images/Coffee beans white.png";
  }
  
})

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
});