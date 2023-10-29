const navbar = document.querySelector('nav');
const cards = document.querySelectorAll('.card');
const logoImg = document.querySelector('.logo-img');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('sticky', window.scrollY > 0);

  if (window.scrollY > 0) {
    logoImg.src = "images/Coffee beans black.png";
  } else {
    logoImg.src = "images/Coffee beans white.png";
  }
  
})


cards.forEach((card) => {
  const playIcon = card.querySelector('i');
  console.log(playIcon);
  card.addEventListener('mouseenter', () => {
    console.log('mouse Enter');
    playIcon.classList.add('toPlay');
  })
  card.addEventListener('mouseleave', () => {
    console.log('mouse Leave');
    playIcon.classList.remove('toPlay');
  })
})