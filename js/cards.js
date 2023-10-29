const cards = document.querySelectorAll('.card');

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