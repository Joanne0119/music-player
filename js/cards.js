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

function cardScroll(){
  const cardsSection = document.querySelectorAll('.cards-section');

  cardsSection.forEach((cardSection) => {
    const cards = cardSection.querySelector('.cards');
    const card = cards.querySelectorAll('.card');
    const leftBtn = cardSection.querySelector('.left-btn');
    const rightBtn = cardSection.querySelector('.right-btn');
    const cardsWidth = Number(cards.scrollWidth);
    const cardsSectionWidth = Number(cardSection.offsetWidth);
    const cardWidth = Number(card[0].offsetWidth);
    console.log(cardsWidth);
    console.log(cardsSectionWidth);
    console.log(rightBtn);
    if(cardsWidth >= (cardsSectionWidth + 5)) {
      rightBtn.classList.remove('display-none');
      leftBtn.classList.remove('display-none');
    }
    else {
      leftBtn.classList.add('display-none');
      rightBtn.classList.add('display-none');
    }
    let totAdded = 0
    rightBtn.addEventListener('click', () => {
      totAdded -= cardWidth;
      cards.style.transform = `translateX(${totAdded}px)`;
    });
    leftBtn.addEventListener('click', () => {
      totAdded += cardWidth;
      cards.style.transform = `translateX(${totAdded}px)`;
    })
  });
}

cardScroll();
window.onresize = cardScroll;
AddEventToCard();
