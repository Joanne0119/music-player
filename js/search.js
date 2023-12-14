
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
        const filteredResults = songsLibrary.filter(item =>
            item.title.toLocaleLowerCase().includes(searchTerm) || item.singer.toLocaleLowerCase().includes(searchTerm)
        );
    
        if (filteredResults.length > 0 && filteredResults.length != songsLibrary.length) {
            resultsList.classList.add("cards");
            filteredResults.forEach(result => {
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
            noResult.style.display = "none";
            AddEventToCard();
            cardScroll();
        } 
        else {
            resultsList.classList.remove("cards");
            noResult.style.display = "block";
            rightBtn.classList.toggle("display-none");
            leftBtn.classList.toggle("display-none");
        }
    });
}

