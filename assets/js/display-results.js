var searchFormEl = document.querySelector('#search-form');

function getGeoParams() {
    // Get the search params for the GeoCode API from the URL and convert to array
    var searchParamsArr = document.location.search.split('&');
  
    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();

    console.log(query);
  
  }

  getGeoParams();