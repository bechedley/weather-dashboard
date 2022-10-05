// Access user input
var searchFormEl = document.querySelector("#city-search");
var searchAgain = document.querySelector("#search-again")
var searchAgainText = document.querySelector("#search-again-heading");
var searchList = document.getElementById("search-list");

var citySearches = [];

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;

    if (!searchInputVal) {
        console.error("You need a search input value!");
        return;
    }

    // Save search query to array

    var citySearchesText = {
        searchInputVal: searchInputVal.trim()
    };

    if (citySearchesText === "") {
        return;
    }

    citySearches.push(citySearchesText);

    console.log(citySearches);

    storeSearches();
    renderSearches();

    // Create query string from user input
    var queryString = './search-results.html?q=' + searchInputVal;

    // open new page for results
    location.assign(queryString);


}

// Retrieve stored history on load
function init() {
    var storedCitySearches = JSON.parse(localStorage.getItem("citySearches"));

    if (storedCitySearches !== null) {
        citySearches = storedCitySearches;
    }

    console.log(citySearches);

    renderSearches();
}

// Save searches
function storeSearches() {
    // Stringify and set key in localStorage to searches array
    localStorage.setItem("citySearches", JSON.stringify(citySearches));
}

// Render searches
function renderSearches() {
    // Update text content of search history
    //if (searches !== null) {
    searchAgainText.textContent = "SEARCH AGAIN";
   // }

    // Add searches to recent searches
    searchList.innerHTML = '';
    searchAgainText.after(searchList);

    //Create for loop to render each search query to a new line item
    for (var i = 0; i < citySearches.length; i++) {
        var citySearch = citySearches[i];

        var searchBtn = document.createElement("button");
        searchBtn.setAttribute("id", citySearch.searchInputVal);
        searchBtn.classList.add("btn", "btn-lg", "btn-block", "button-history");
        searchBtn.setAttribute("type", "button");
        searchBtn.textContent = citySearch.searchInputVal;
        searchList.setAttribute("data-index", i);

        searchList.appendChild(searchBtn);
    }
}

init();


// Search Event Listener
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// Add event listener to search history
searchList.addEventListener("click", function (event) {
    var element = event.target;

    // Checks if element is a button
    if (element.matches("button") === true) {
        // Get the button id
        var newSearchQuery = element.getAttribute("id");
        //var newSearch = button[index].textContent;
        console.log(newSearchQuery);

        var newQueryString = './search-results.html?q=' + newSearchQuery;

        // open new page for results
        location.assign(newQueryString);

    }
});