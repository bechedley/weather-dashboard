// Access user input
var searchFormEl = document.querySelector("#city-search");

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;

    if (!searchInputVal) {
        console.error("You need a search input value!");
        return;
    }

    // Create query string from user input
    var queryString = './search-results.html?q=' + searchInputVal;

    location.assign(queryString);
}


// Search Event Listener
searchFormEl.addEventListener('submit', handleSearchFormSubmit);