import { songsLibrary } from "./songs.js";

export function AddEventToCard() {
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

export function cardScroll(){
  const cardsSection = document.querySelectorAll('.cards-section');
  console.log(cardsSection.length);
  cardsSection.forEach((cardSection) => {
    const cards = cardSection.querySelector('.cards');
    if(!cards) return;
    const card = cards.querySelectorAll('.card');
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
    let spaceToScroll = cards.scrollWidth - cards.offsetWidth;
    console.log("spaceToScroll: ", spaceToScroll);
    rightBtn.addEventListener('click', () => {
      console.log(cardWidth);
      if(totAdded == spaceToScroll*-1) {
        cards.style.transform = `translateX(${totAdded-cardWidth}px)`;
        setTimeout(()=>{cards.style.transform = `translateX(${spaceToScroll*-1}px)`;}, 190);
      }
      else {
        totAdded -= cardWidth;
        cards.style.transform = `translateX(${totAdded}px)`;
        if((totAdded)*-1 > spaceToScroll + cardWidth/2)  {
          setTimeout(()=>{cards.style.transform = `translateX(${spaceToScroll*-1}px)`;}, 270);
          totAdded = spaceToScroll*-1;
        }
      }
    });
    leftBtn.addEventListener('click', () => {
      console.log(cardWidth);
      if(totAdded == 0) {
        cards.style.transform = `translateX(${cardWidth}px)`;
        setTimeout(()=>{cards.style.transform = `translateX(0px)`;}, 190);
      }
      else {
        totAdded += cardWidth;
        cards.style.transform = `translateX(${totAdded}px)`;
        if(totAdded > cardWidth/2)  {
          setTimeout(()=>{cards.style.transform = `translateX(0px)`;}, 270);
          totAdded = 0;
        }
      }
    })
  });
}

let cardsHTML;
const typeArr = ['mandopop', 'englishpop'];

export function cardRender()
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
