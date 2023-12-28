import { songsLibrary } from "./songs.js";
import { AddEventToCard } from "./cards.js";
import { cardScroll } from "./cards.js";
import { sortedTypeLibrary } from "./songs.js";
import { cardRender } from "./cards.js";

function MarkSearchTerm(string, target) {

    const fId = string.toLowerCase().indexOf(target);
    if (fId !== -1) {
        return (string.substring(0, fId)
                + "<span class=\"search-result-highlight\">"
                + string.substring(fId, fId+target.length)
                + "</span>"
                + string.substring(fId+target.length));
    }
    else {
        return (string);
    }
}

export function activateSearch() {
    const searchResults = document.querySelector('#search-results');
    const typeSearchResults = document.querySelector('.type-search-results');
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('results-list');
    const noResult = document.getElementById('no-result');
    searchInput.addEventListener('input', function () {

        const searchTerm = searchInput.value.toLowerCase();
        resultsList.innerHTML = '';
        typeSearchResults.innerHTML = '';
        let titleResults = songsLibrary.filter(item =>
            item.title.toLocaleLowerCase().includes(searchTerm)
        );
        
        let singerResults = songsLibrary.filter(item =>
            item.singer.toLocaleLowerCase().includes(searchTerm)
        );

        let typeResults = sortedTypeLibrary.filter(item =>
            item.toLocaleLowerCase().includes(searchTerm)
        );
    
        if (titleResults.length > 0 && titleResults.length != songsLibrary.length) {
            titleResults.forEach(result => {
                console.log(result);
                const htmlString = `
                    <div class="card border-0 p-3" id="${result.id}">
                        <div class="img-box">
                            <img class="card-image rounded" src="${result.image}" alt="${result.title}">
                            <i class="fa-solid fa-plus"></i>
                            <i class="fa-solid fa-play"></i>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title text-light song-title">${MarkSearchTerm(result.title, searchTerm)}</h4>
                            <p class="card-text text-light singer">${MarkSearchTerm(result.singer, searchTerm)}</p>
                        </div>
                    </div>
                `;
                resultsList.innerHTML += htmlString;
                singerResults = singerResults.filter(item => {
                    return item !== result;
                });
            });
        } 
        if (singerResults.length > 0 && singerResults.length != songsLibrary.length) {
            singerResults.forEach(result => {
                const htmlString = `
                    <div class="card border-0 p-3" id="${result.id}">
                        <div class="img-box">
                            <img class="card-image rounded" src="${result.image}" alt="${result.title}">
                            <i class="fa-solid fa-plus"></i>
                            <i class="fa-solid fa-play"></i>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title text-light song-title">${MarkSearchTerm(result.title, searchTerm)}</h4>
                            <p class="card-text text-light singer">${MarkSearchTerm(result.singer, searchTerm)}</p>
                        </div>
                    </div>
                `;
                resultsList.innerHTML += htmlString;
            });
        }

        if (typeResults.length > 0 && typeResults.length != sortedTypeLibrary.length) {
            typeResults.forEach(result => {
                const htmlString = `
                    <div class="cards-section" id="${result}-cards">
                        <h3 class="card-title">${MarkSearchTerm(result, searchTerm)}</h3>
                        <div class="left-btn display-none"><i class="fa-solid fa-angle-left"></i></div>
                        <div class="right-btn display-none"><i class="fa-solid fa-angle-right"></i></div>
                        <div class="cards-container">
                        <div class="cards"></div>
                        </div>
                    </div>
                `;
                typeSearchResults.innerHTML += htmlString;
            });
        }

        const rightBtn = document.querySelectorAll('.right-btn');
        const leftBtn = document.querySelectorAll('.left-btn');

        if(!(titleResults.length > 0 && titleResults.length != songsLibrary.length) &&
           !(singerResults.length > 0 && singerResults.length != songsLibrary.length)) {
            resultsList.classList.remove("cards");
            noResult.style.display = "block";
            rightBtn[0].classList.add("display-none");
            leftBtn[0].classList.add("display-none");
        }
        else {
            noResult.style.display = "none";
            resultsList.classList.add("cards");
        }

        if(!(typeResults.length > 0 && typeResults.length != sortedTypeLibrary.length)) {
            typeSearchResults.innerHTML = "";
        }
        else {
            cardRender();
            if(!(titleResults.length > 0 && titleResults.length != songsLibrary.length) &&
               !(singerResults.length > 0 && singerResults.length != songsLibrary.length)) {
                searchResults.style.display = "none";
            }
        }

        if ( (titleResults.length > 0 && titleResults.length != songsLibrary.length) ||
             (singerResults.length > 0 && singerResults.length != songsLibrary.length) ||
             (typeResults.length > 0 && typeResults.length != sortedTypeLibrary.length)) { 
            AddEventToCard();
            cardScroll();
        }

    });
}

