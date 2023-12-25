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

export function loadWebContent() {

    songsLibrary.forEach(song => {
        playCounts[song.type] = playCounts[song.type] || 1;
    });

    const libraryHtml = `
      <div class="library-section">
          <h1>播放清單</h1>
      <div class="songs-container"></div>
      </div>
    `;

    const homeHtml = `
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
        <div class="carousel-item active">
          <img src="images/好不容易.jpeg" class="d-block w-100 " alt="好不容易">
          <div class="carousel-caption d-none d-md-block">
            <h5>好不容易</h5>
            <p>告五人</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="images/too much.jpg" class="d-block w-100" alt="too much">
          <div class="carousel-caption d-none d-md-block">
            <h5>Too Much</h5>
            <p>The Kid LAROI, Jung Kook, Central Cee</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="images/seven.jpg" class="d-block w-100" alt="seven">
          <div class="carousel-caption d-none d-md-block text-dark">
            <h5>Seven</h5>
            <p>Jung Kook feat. Latto</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="images/Super shy.webp" class="d-block w-100 super-shy-img" alt="Super shy" style="object-position: 5% 5%;">
          <div class="carousel-caption d-none d-md-block">
            <h5>Super Shy</h5>
            <p>New Jeans</p>
          </div>
        </div>
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

    <!--cards mandopop -->
    <div class="cards-section" id="mandopop-cards">
      <h3 class="card-title">華語流行</h3>
      <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
      <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
      <div class="cards-container">
        <div class="cards"></div>
      </div>
    </div>

    <!-- english pop -->
    <div class="cards-section" id="englishpop-cards">
      <h3 class="card-title">西洋流行</h3>
      <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
      <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
      <div class="cards-container">
        <div class="cards"></div>
      </div>
    </div>
    </main>
    `;

    const searchHtml = `
      <div class="main">
          <div class="search-section">
              <h1>今天想聽什麼呢？</h1>
              <div class="search-input-section">
                  <input type="text" id="search-input" placeholder="搜尋喜歡的歌名、歌手...">
              </div>

              <div class="cards-section" id="search-results">
                  <h1 id="no-result" class="card-mandopop-title">我們好像沒有這首歌：(</h1>
                  <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
                  <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
                  <div class="cards-container">
                      <div id="results-list"></div>
                  </div>
              </div>
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
            loadHomePage(homeHtml);
            break;
        case 'library':
            loadLibraryPage(libraryHtml);
            break;
        case 'search':
            loadSearchPage(searchHtml);
            break;
        default:
            loadHomePage(homeHtml);
    }

    navHome.addEventListener('click', () => {
        loadHomePage(homeHtml);
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

function loadHomePage(html) {
    if(!reloadContent) return;
    reloadContent.innerHTML = html;
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

