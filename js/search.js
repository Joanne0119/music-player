
import { songsLibrary } from "./songs.js";
import { AddEventToCard } from "./cards.js";
import { cardScroll } from "./cards.js";

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
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('results-list');
    const noResult = document.getElementById('no-result');
    const rightBtn = document.querySelector('.right-btn');
    const leftBtn = document.querySelector('.left-btn');
    searchInput.addEventListener('input', function () {

        const searchTerm = searchInput.value.toLowerCase();
        resultsList.innerHTML = '';
        let titleResults = songsLibrary.filter(item =>
            item.title.toLocaleLowerCase().includes(searchTerm)
        );
        
        let singerResults = songsLibrary.filter(item =>
            item.singer.toLocaleLowerCase().includes(searchTerm)
        );

        let typeResults = songsLibrary.filter(item =>
            item.type.toLocaleLowerCase().includes(searchTerm)
        );
    
        if (titleResults.length > 0 && titleResults.length != songsLibrary.length) {
            titleResults.forEach(result => {
                const htmlString = `
                    <div class="card border-0 p-3" id="${result.id}">
                        <img class="card-image rounded" src="${result.image}" alt="${result.title}">
                        <i class="fa-solid fa-plus"></i>
                        <i class="fa-solid fa-play"></i>
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
                typeResults = typeResults.filter(item => {
                    return item !== result;
                });
            });
        } 
        if (singerResults.length > 0 && singerResults.length != songsLibrary.length) {
            singerResults.forEach(result => {
                const htmlString = `
                    <div class="card border-0 p-3" id="${result.id}">
                        <img class="card-image rounded" src="${result.image}" alt="${result.title}">
                        <i class="fa-solid fa-plus"></i>
                        <i class="fa-solid fa-play"></i>
                        <div class="card-body">
                            <h4 class="card-title text-light song-title">${MarkSearchTerm(result.title, searchTerm)}</h4>
                            <p class="card-text text-light singer">${MarkSearchTerm(result.singer, searchTerm)}</p>
                        </div>
                    </div>
                `;
                resultsList.innerHTML += htmlString;
                typeResults = typeResults.filter(item => {
                    return item !== result;
                });
            });
        }
        if (typeResults.length > 0 && typeResults.length != songsLibrary.length) {
            typeResults.forEach(result => {
                const htmlString = `
                    <div class="card border-0 p-3" id="${result.id}">
                        <img class="card-image rounded" src="${result.image}" alt="${result.title}">
                        <i class="fa-solid fa-plus"></i>
                        <i class="fa-solid fa-play"></i>
                        <div class="card-body">
                            <h4 class="card-title text-light song-title">${MarkSearchTerm(result.title, searchTerm)}</h4>
                            <p class="card-text text-light singer">${MarkSearchTerm(result.singer, searchTerm)}</p>
                        </div>
                    </div>
                `;
                resultsList.innerHTML += htmlString;
            });
        }
        if(!(titleResults.length > 0 && titleResults.length != songsLibrary.length) &&
           !(singerResults.length > 0 && singerResults.length != songsLibrary.length) &&
           !(typeResults.length > 0 && typeResults.length != songsLibrary.length)) {
            resultsList.classList.remove("cards");
            noResult.style.display = "block";
            rightBtn.classList.add("display-none");
            leftBtn.classList.add("display-none");
        }
        else {
            noResult.style.display = "none";
            resultsList.classList.add("cards");
            AddEventToCard();
            cardScroll();
        }
    });
}

