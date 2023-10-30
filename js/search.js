const searchInput = document.getElementsByClassName('search-input');
const searchResults = document.getElementsByClassName('search-results');
const resultsList = document.getElementsByClassName('results-list');

searchInput.addEventListener('input', function () {

    const searchTerm = searchInput.value.toLowerCase();
    const sampleData = [
        '想和你看五月的晚霞', '陳華', '突然好想你', '五月天', '披星戴月的想你', '告五人'
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