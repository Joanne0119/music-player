const navbar = document.querySelector('nav');
const cards = document.querySelectorAll('.card');

addEventListener('scroll', () => {
  navbar.classList.toggle('sticky', window.scrollY > 0);
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