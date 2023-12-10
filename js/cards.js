import { songsLibrary } from "./songs.js";

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
    const card = cards.querySelectorAll('.card') || '';
    const leftBtn = cardSection.querySelector('.left-btn');
    const rightBtn = cardSection.querySelector('.right-btn');
    const cardsWidth = Number(cards.scrollWidth);
    const cardsSectionWidth = Number(cardSection.offsetWidth);
    const cardWidth = (card.length > 0)?(Number(card[0].offsetWidth)) : 0;
    console.log(cardsWidth);
    console.log(cardsSectionWidth);
    console.log(cardWidth);
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

let cardsHTML;
const typeArr = ['mandopop', 'englishpop'];

function cardRender()
{
  let cardsContainer = document.querySelectorAll('.cards');
  let i = 0;
  cardsContainer.forEach((cardContainer) => {
    cardContainer.innerHTML = '';
    cardContainer.innerHTML = genCardHTML(typeArr[i]);
    console.log(typeArr[i]);
    i++;
  })
}

function genCardHTML(type){
  cardsHTML = '';
  songsLibrary.forEach((song) => {
    if(song.type === type){
      cardsHTML += 
      `<div class="card border-0 p-3">
        <img class="card-image rounded" src="${song.image}" alt="${song.title}">
        <i class="fa-solid fa-plus"></i>
        <i class="fa-solid fa-play"></i>
        <div class="card-body">
          <h4 class="card-title text-light song-title">${song.title}</h4>
          <p class="card-text text-light singer">${song.singer}</p>
        </div>
      </div>`
    }
  })
  return cardsHTML;
}

cardRender();
cardScroll();
window.onresize = cardScroll;
AddEventToCard();
