const reloadContent = document.getElementById('reload-content');

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
  <div class="cards-section mandopop">
    <h3 class="card-mandopop-title">華語流行</h3>
    <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
    <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
    <div class="cards-container">
      <div class="cards"></div>
    </div>
  </div>

  <!-- english pop -->
  <div class="cards-section pop">
    <h3 class="card-englishpop-title">西洋流行</h3>
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

            <div id="search-results" class="cards-section">
                <h1 id="no-result" class="card-mandopop-title">我們好像沒有這首歌：(</h1>
                <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
                <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
                <div class="cards-container">
                    <div id="results-list"></div>
                </div>
            </div>
        </div>
        
        <div class="cards-section">
            <h3 class="card-mandopop-title">你可能會喜歡</h3>
            <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
            <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
            <div class="cards-container">
                <div class="cards"></div>
            </div>
        </div>
    </div>
`;

