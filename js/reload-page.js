const reloadContent = document.querySelector('#reload-content');
const navHome = document.querySelector('.nav-home');
const navLibrary = document.querySelector('.nav-library');
const navSearch = document.querySelector('.nav-search');
const navLogin = document.querySelector('.nav-login');

import { AddEventToCard } from "./cards.js";
import { cardScroll } from "./cards.js";
import { cardRender } from "./cards.js";
import { renderLibrary } from "./library.js";
import { activateSearch } from "./search.js";
import { name } from "./db.js";
import { signOut } from "./login-and-sign-up.js";
import { playCounts } from "./db.js";
import { songsLibrary } from "./songs.js";
import { sortedTypeLibrary } from "./songs.js";

export function loadWebContent() {
    
    let sum = 0;
    Object.keys(playCounts).forEach(key => {
        sum += playCounts[key];
    });

    songsLibrary.forEach(song => {
        if(playCounts[song.type]) {
            playCounts[song.type] = 
                (playCounts[song.type] < sum/100 * 3) ? sum/100 * 3:playCounts[song.type];
        }
        else {
            playCounts[song.type] = sum/100 * 3
        }
    });

    const libraryHtml = `
      <div class="library-section">
          <h1>播放清單</h1>
      <div class="songs-container"></div>
      </div>
    `;
    
    let carouselHtml = ``;

    let top4 = [{view:-1}, {view:-1}, {view:-1}, {view:-1}];
    songsLibrary.forEach(song => {
        if (song.view > top4[3].view) {
            top4[3] = song;
            top4.sort((a,b) => b.view - a.view);
        }
    });

    top4.forEach(song => {
        let active = (song == top4[0]) ? " active" : "";
        carouselHtml += `
          <div class="carousel-item${active}">
            <img src="${song.image}" class="d-block w-100 " alt="${song.title}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${song.title}</h5>
              <p>${song.singer}</p>
            </div>
          </div>
        `;
    });

    let cardSectionHtml = ``;

    sortedTypeLibrary.forEach(type => {
        cardSectionHtml += `
            <div class="cards-section" id="${type}-cards">
              <h3 class="card-title">${type}</h3>
              <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
              <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
              <div class="cards-container">
                <div class="cards"></div>
              </div>
            </div>
        `;
    });

    let homeHtml = `
    <!-- contain carousel and cards section -->
    <main> 
    <!-- carousel -->
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;

    homeHtml += cardSectionHtml + "</main>";

    const searchHtml = `
      <div class="main">
          <div class="search-section">
              <h1>今天想聽什麼呢？</h1>
              <div class="search-input-section">
                  <input type="text" id="search-input" placeholder="搜尋喜歡的歌名、歌手、曲風...">
              </div>

              <div class="cards-section" id="search-results">
                  <h1 id="no-result" class="card-mandopop-title">我們好像沒有這首歌：(</h1>
                  <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
                  <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
                  <div class="cards-container">
                      <div id="results-list"></div>
                  </div>
              </div>

              <div class="type-search-results"></div>
          </div>
          
          <div class="cards-section" id="personal-recommendation-cards">
              <h3 class="card-title">專為 ${name.length == 0 ? "未登入的使用者":name } 打造的推薦歌單</h3>
              <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
              <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
              <div class="cards-container">
                  <div class="cards"></div>
              </div>
          </div>

          <div class="cards-section" id="recommendation-cards">
              <h3 class="card-title">其他人都在聽</h3>
              <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
              <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
              <div class="cards-container">
                  <div class="cards"></div>
              </div>
          </div>

      </div>
    `;

    const urlParams = new URLSearchParams(window.location.search);
    const toload = urlParams.get('toload');
    
    switch (toload) {
        case 'home':
            loadHomePage(homeHtml, carouselHtml);
            break;
        case 'library':
            loadLibraryPage(libraryHtml);
            break;
        case 'search':
            loadSearchPage(searchHtml);
            break;
        default:
            loadHomePage(homeHtml, carouselHtml);
    }

    navHome.addEventListener('click', () => {
        loadHomePage(homeHtml, carouselHtml);
    });
    
    navLibrary.addEventListener('click', () => {
        loadLibraryPage(libraryHtml);
    });
    
    navSearch.addEventListener('click', () => {
        loadSearchPage(searchHtml);
    });

    navLogin.innerHTML = name.length == 0 ? "登入":"登出";
    navLogin.href = name.length == 0 ? "login-and-sign-up.html":"index.html";;
    navLogin.addEventListener('click', () => {
        signOut();
    });
}

function loadHomePage(homeHtml, carouselHtml) {
    if(!reloadContent) return;
    reloadContent.innerHTML = homeHtml;
    let carouselContent = document.querySelector('.carousel-inner');
    carouselContent.innerHTML = carouselHtml;
    navHome.classList.remove("active");
    navLibrary.classList.remove("active");
    navSearch.classList.remove("active");
    navHome.classList.add("active");
    cardRender();
    cardScroll();
    AddEventToCard();
}

function loadLibraryPage(html) {
    if(!reloadContent) return;
    reloadContent.innerHTML = html;
    navHome.classList.remove("active");
    navLibrary.classList.remove("active");
    navSearch.classList.remove("active");
    navLibrary.classList.add("active");
    renderLibrary();
}

function loadSearchPage(html) {
    if(!reloadContent) return;
    reloadContent.innerHTML = html;
    navHome.classList.remove("active");
    navLibrary.classList.remove("active");
    navSearch.classList.remove("active");
    navSearch.classList.add("active");
    cardRender();
    cardScroll();
    AddEventToCard();
    activateSearch();
}

