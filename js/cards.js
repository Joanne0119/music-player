function AddEventToCard() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const playIcons = card.querySelectorAll('i');
    
    card.addEventListener('mouseenter', () => {
      console.log('mouse Enter');
      playIcons.forEach((playIcon) => {
        playIcon.classList.add('toPlay');
      });
    })
    card.addEventListener('mouseleave', () => {
      console.log('mouse Leave');
      playIcons.forEach((playIcon) => {
        playIcon.classList.remove('toPlay');
      });
    })
  })
}

AddEventToCard();
