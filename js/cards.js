import { songsLibrary } from "./songs.js";
import { addToPlayerFromCard } from "./music-player-controls.js";
import { addToSongsList } from "./db.js";
import { playCounts } from "./db.js";

export function AddEventToCard() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const playIcons = card.querySelectorAll('i');
    
    card.addEventListener('mouseenter', () => {
      playIcons.forEach((playIcon) => {
        playIcon.classList.add('toPlay');
      });
    })
    card.addEventListener('mouseleave', () => {
      playIcons.forEach((playIcon) => {
        playIcon.classList.remove('toPlay');
      });
    })

    const playBtn = card.querySelector(".fa-play");
    playBtn.addEventListener('click', ()=>{
      addToPlayerFromCard(card.id);
    })

    const plusBtn = card.querySelector(".fa-plus");
    plusBtn.addEventListener('click', ()=>{
      addToSongsList(parseInt(card.id));
    })
  })
}

export function cardScroll(){
  const cardsSection = document.querySelectorAll('.cards-section');
  cardsSection.forEach((cardSection) => {
    const cards = cardSection.querySelector('.cards');
    if(!cards) return;
    const card = cards.querySelectorAll('.card');
    const leftBtn = cardSection.querySelector('.left-btn');
    const rightBtn = cardSection.querySelector('.right-btn');
    const cardsWidth = Number(cards.scrollWidth);
    const cardsSectionWidth = Number(cardSection.offsetWidth);
    const cardWidth = (card.length > 0)?(Number(card[0].offsetWidth)) : 0;
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
    rightBtn.addEventListener('click', () => {
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

export function cardRender()
{
    let cardsSections = document.querySelectorAll('.cards-section');
    cardsSections.forEach((cardsSection) => {
        let cardsContent = cardsSection.querySelector('.cards');
        let title = cardsSection.id;
        if(cardsContent) cardsContent.innerHTML = genCardHTML(title);
    })
}

// Randomly choose one
function getRandomElement(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function genCardHTML(type) {
    let cardsHTML = '';
    let sortedLibrary = songsLibrary.sort(function(a, b) {
        return b.views - a.views;
    });
    let cnt = 0;
    
    switch (type) {

      case "search-results":
          return;
      
      case "personal-recommendation-cards":
          let sum = 0; let probability = {}; let max = 0;
          Object.keys(playCounts).forEach(key => {
              sum += playCounts[key];
          });
          Object.keys(playCounts).forEach(key => {
              probability[key] = playCounts[key]/sum;
              max = max>probability[key] ? max:probability[key];
          });
    
          let selectedSongs = [];
          while(selectedSongs.length < songsLibrary.length/3) {
              let randomValue = Math.random();
              if(randomValue >= max) continue;
              let selectedType = Object.keys(probability).find(type => randomValue < probability[type]);
              let eligibleSongs = songsLibrary.filter(song => song.type === selectedType && !selectedSongs.includes(song));
              let selectedSong = getRandomElement(eligibleSongs);
              selectedSongs.push(selectedSong);
          }

          selectedSongs.forEach((song) => {
              cardsHTML += 
                  `<div class="card border-0 p-3" id="${song.id}">
                      <img class="card-image rounded" src="${song.image}" alt="${song.title}">
                      <i class="fa-solid fa-plus"></i>
                      <i class="fa-solid fa-play"></i>
                      <div class="card-body">
                          <h4 class="card-title text-light song-title">${song.title}</h4>
                          <p class="card-text text-light singer">${song.singer}</p>
                      </div>
                  </div>`;
            
          });
          break;
  
      case "recommendation-cards":
          
          cnt = 0;
          sortedLibrary.forEach((song) => {
              cardsHTML += 
                  `<div class="card border-0 p-3" id="${song.id}">
                      <img class="card-image rounded" src="${song.image}" alt="${song.title}">
                      <i class="fa-solid fa-plus"></i>
                      <i class="fa-solid fa-play"></i>
                      <div class="card-body">
                          <h4 class="card-title text-light song-title">${song.title}</h4>
                          <p class="card-text text-light singer">${song.singer}</p>
                      </div>
                  </div>`;
              cnt++;
              if(cnt >= 20) return;
          });
          break;

      default:
          cnt = 0;
          sortedLibrary.forEach((song) => {
              if(song.type+"-cards" === type) {
                  cardsHTML += 
                      `<div class="card border-0 p-3" id="${song.id}">
                          <img class="card-image rounded" src="${song.image}" alt="${song.title}">
                          <i class="fa-solid fa-plus"></i>
                          <i class="fa-solid fa-play"></i>
                          <div class="card-body">
                              <h4 class="card-title text-light song-title">${song.title}</h4>
                              <p class="card-text text-light singer">${song.singer}</p>
                          </div>
                      </div>`;
                  cnt++;
                  if(cnt >= 20) return;
              }
          });
          break;
    }
    return cardsHTML;
}

window.onresize = cardScroll;