const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const resultsList = document.getElementById('results-list');

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    
    const sampleData = [
        '電腦', '電電腦', '鍵盤', '鍵鍵盤', '鍵盤滑鼠', '滑鼠'
    ];

    resultsList.innerHTML = '';
    const filteredResults = sampleData.filter(item => item.toLowerCase().includes(searchTerm));
    
    if (filteredResults.length > 0 && filteredResults.length != sampleData.length) {
        searchResults.style.display = "block";
        filteredResults.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = result;
            resultsList.appendChild(listItem);
        });
    }

});