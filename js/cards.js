import { songsLibrary } from "./songs.js";
import { addToPlayerFromCard } from "./music-player-controls.js";
import { addToSongsList } from "./db.js";
import { playCounts } from "./db.js";
import { name } from "./db.js";
import { updateSongsView } from "./upload.js";
import { isPlaying } from "./music-player-controls.js";
import { isPlayingOther } from "./music-player-controls.js";
import { ToPause } from "./music-player-controls.js";
import { ToPlay } from "./music-player-controls.js";

let nowBtn = undefined;

export function cardPause() {
    if (nowBtn) {
        nowBtn.classList.remove("fa-pause");
        nowBtn.classList.add("fa-play");
        nowBtn.classList.remove("toPlay");
    }
}

export function cardPlay() {
    if (nowBtn) {
        nowBtn.classList.remove("fa-play");
        nowBtn.classList.add("fa-pause");
        nowBtn.classList.add("toPlay");
    }
}

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
                if(!playIcon.classList.contains("fa-pause")) {
                    playIcon.classList.remove('toPlay');
                }
            });
        })

        const playBtn = card.querySelector(".fa-play");
        const plusBtn = card.querySelector(".fa-plus");
        
        playBtn.addEventListener('click', ()=>{
            if (nowBtn == undefined && !isPlayingOther) {
                nowBtn = playBtn;
                playBtn.classList.remove("fa-play");
                playBtn.classList.add("fa-pause");
                addToPlayerFromCard(card.id);
                updateSongsView(card.id);
                return;
            }
            if (nowBtn != playBtn) {
                nowBtn.classList.remove("fa-pause");
                nowBtn.classList.add("fa-play");
                nowBtn.classList.remove("toPlay");
                nowBtn = playBtn;
                playBtn.classList.remove("fa-play");
                playBtn.classList.add("fa-pause");
                addToPlayerFromCard(card.id);
                updateSongsView(card.id);
                return;
            }
            if (isPlayingOther && isPlaying) {
                playBtn.classList.add("fa-play");
                playBtn.classList.remove("fa-pause");
                plusBtn.classList.remove("toPlay");
                ToPause();
                return;
            }
            if (isPlayingOther && !isPlaying) {
                playBtn.classList.remove("fa-play");
                playBtn.classList.add("fa-pause");
                ToPlay();
                return;
            }
        })

        plusBtn.addEventListener('click', ()=>{
            if(plusBtn.classList.contains("fa-plus")) {
                plusBtn.classList.remove("fa-plus");
                plusBtn.classList.add("fa-check");
            }
            addToSongsList(card.id);
        })
  })
}

export function addToPlayInClass(id) {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        if(card.id == id) {
            const btn = card.querySelector(".fa-play")
            btn.classList.remove("fa-play");
            btn.classList.add("fa-pause");
            const playIcons = card.querySelectorAll('i');
            playIcons.forEach((playIcon) => {
                playIcon.classList.add('toPlay');
            });
        }
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
    let totAdded = 0;
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

export function cardRender()
{
    let cardsSections = document.querySelectorAll('.cards-section');
    cardsSections.forEach((cardsSection) => {
        let cardsContent = cardsSection.querySelector('.cards');
        let title = cardsSection.id;
        if(genCardHTML(title) == "OK") {
           return;
        }
        else {
           if(cardsContent) cardsContent.innerHTML = genCardHTML(title);
        }
    })
}

// Randomly choose one
function getRandomElement(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function genCardHTML(type) {
    let cardsHTML = '';
    let sortedLibrary = songsLibrary.slice();
    sortedLibrary = sortedLibrary.sort(function(a, b) {
        return b.view - a.view;
    });
    let cnt = 0;
    
    switch (type) {

        case "search-results":
            return "OK";
      
        case "personal-recommendation-cards":
            let selectedSongs = [];
            if(name == "") {
                while(selectedSongs.length < songsLibrary.length/3) {
                    let song = getRandomElement(songsLibrary);
                    if(!selectedSongs.includes(song)) {
                        selectedSongs.push(song);
                    }
                }
            }
            else {
                let sum = 0; let probability = {}; let prevSum = 0;
                Object.keys(playCounts).forEach(key => {
                    sum += playCounts[key];
                });
                console.log(playCounts, sum);
                Object.keys(playCounts).forEach(key => {
                    prevSum += playCounts[key]/sum;
                    probability[key] = prevSum;
                });
                probability[Object.keys(playCounts)[Object.keys(playCounts).length-1]] = 1;
    
                while(selectedSongs.length < songsLibrary.length/3) {
                    let randomValue = Math.random();
                    let selectedType = Object.keys(probability).find(type => randomValue < probability[type]);
                    let eligibleSongs = songsLibrary.filter(song => song.type === selectedType && !selectedSongs.includes(song));
                    if(eligibleSongs.length == 0) continue;
                    let selectedSong = getRandomElement(eligibleSongs);
                    if (!selectedSong) console.log(randomValue, selectedType, eligibleSongs, selectedSong);
                    selectedSongs.push(selectedSong);
                }
                console.log(selectedSongs, probability);
            }

          selectedSongs.forEach((song) => {
              cardsHTML += 
                  `<div class="card border-0 p-3" id="${song.id}">
                      <div class="img-box">
                        <img class="card-image rounded" src="${song.image}" alt="${song.title}">
                        <i class="fa-solid fa-plus"></i>
                        <i class="fa-solid fa-play"></i>
                      </div>
                      <div class="card-body">
                          <h4 class="card-song-title text-light song-title">${song.title}</h4>
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
                      <div class="img-box">
                        <img class="card-image rounded" src="${song.image}" alt="${song.title}">
                        <i class="fa-solid fa-plus"></i>
                        <i class="fa-solid fa-play"></i>
                      </div>
                      <div class="card-body">
                          <h4 class="card-song-title text-light song-title">${song.title}</h4>
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
                          <div class="img-box">
                            <img class="card-image rounded" src="${song.image}" alt="${song.title}">
                            <i class="fa-solid fa-plus"></i>
                            <i class="fa-solid fa-play"></i>
                          </div>
                          <div class="card-body">
                              <h4 class="card-song-title text-light song-title">${song.title}</h4>
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