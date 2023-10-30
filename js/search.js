const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const resultsList = document.getElementById('results-list');

searchInput.addEventListener('input', function () {

    const searchTerm = searchInput.value.toLowerCase();
    
    const songData = [
        [['想和你看五月的晚霞'], ['陳華']],
        [['突然好想你'], ['五月天']],
        [['披星戴月的想你'], ['告五人']],
        [['LMF'], ['POPO J']]
    ]

    

    resultsList.innerHTML = '';
    const filteredResults = songData.filter(item => item[0][0].toLowerCase().includes(searchTerm) || item[1][0].toLowerCase().includes(searchTerm));
    console.log(filteredResults);
    if (filteredResults.length > 0 && filteredResults.length != songData.length) {
        searchResults.style.display = "block";
        filteredResults.forEach(result => {

            const htmlString = `
                <div class="card border-0 p-3" >
                    <img class="card-image rounded" src="images/${result[0]}.jpg" alt="${result[0]}">
                    <i class="fa-solid fa-plus"></i>
                    <i class="fa-solid fa-play"></i>
                    <div class="card-body">
                        <h4 class="card-title text-light song-title">${result[0]}</h4>
                        <p class="card-text text-light singer">${result[1]}</p>
                    </div>           
                </div>
                
            `;
            
            resultsList.innerHTML += htmlString;
        });
    } 
    else {
        searchResults.style.display = "none";
    }

});