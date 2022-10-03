var searchFormEl = document.querySelector('#search-form');
var cityCurrent = document.querySelector('#city-current');
var cityCurrentTemp = document.querySelector('#city-current-temp');
var cityCurrentIcon = document.querySelector('#city-current-icon');
var cityCurrentDegrees = document.querySelector('#city-current-degrees');
var cityCurrentWind = document.querySelector('#city-current-wind');
var cityCurrentHumidity = document.querySelector('#city-current-humidity');
var cityFooter = document.querySelector('#city-current-footer');
var forecast5 = document.querySelector('#five-day');
var forecastHeading = document.querySelector('#five-day-heading');
var searchHistory = document.querySelector('#search-again');
var searchHistoryHeading = document.querySelector('#search-again-heading');


var apiKey = "2bafc48ac1a4eb00abcb0c3125a4f17f";
var currentDay = moment().format("Do MMMM YYYY");

function getGeoParams() {
    // Get the search params for the GeoCode API from the URL and convert to array
    var searchParamsArr = document.location.search.split('&');
  
    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();

    console.log(query);

    // Pass query to geocode function and run
    getGeoCodes(query);

    cityFooter.textContent = query + " - " + currentDay;
  
  }

  // Get geocodes from API
  function getGeoCodes(query) {

    //API URL with variable parameters
    var locQueryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + query + "&limit=1&appid=" + apiKey;
  
    // Fetch geocode API results
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {

        console.log(locRes);
  
          var lat = locRes[0].lat;
          var lon = locRes[0].lon;

          console.log("The latitude is " + lat + " and the longitude is " + lon);


          //Pass longitude and latitude and run weather function
          getWeather(lat,lon);

      })
      .catch(function (error) {
        console.error(error);
    })
  }

  function printForecast(resultObj) {

    console.log(resultObj);

    // Determine icon img src
    var forecastIconRes = resultObj.weather[0].icon;
    var forecastIconSrc = "https://openweathermap.org/img/wn/" + forecastIconRes + "@2x.png";

    // Isolate date from time stamp
    var dateNew = resultObj.dt_txt;
    var dateOnly = dateNew.split(" ").shift();

    console.log(dateOnly);

    
    // Create elements to display results
    var dayCard = document.createElement('div');
    dayCard.classList.add("card", "col-2", "day-card")
    forecastHeading.after(dayCard);

    var cardDate = document.createElement('div');
    cardDate.classList.add("card-header", "day-header", "white-text");
    dayCard.appendChild(cardDate);
    cardDate.textContent = moment(dateOnly, "YYYY-MM-DD").format("DD/MM/YYYY");

    var cardBody = document.createElement('div');
    cardBody.classList.add("card-body")
    cardDate.after(cardBody);
    var cardTemp = document.createElement("h6");
    cardTemp.classList.add("card-title", "navy-text");
    cardBody.appendChild(cardTemp);
    cardTemp.textContent = "Temperature:"

    var cardRow = document.createElement('div')
    cardRow.classList.add("row");
    cardTemp.appendChild(cardRow);
    var cardIcon = document.createElement('img');
    cardIcon.src = forecastIconSrc;
    cardIcon.setAttribute("alt", "weather icon");
    cardRow.appendChild(cardIcon);

    var cardDegrees = document.createElement("h4");
    cardDegrees.classList.add("navy-text");
    cardDegrees.innerHTML = resultObj.main.temp + "°c";
    cardIcon.after(cardDegrees);

    var cardUl = document.createElement('ul');
    cardUl.classList.add("list-group", "list-group-flush");
    cardDegrees.appendChild(cardUl);
    var windLi = document.createElement("li");
    windLi.classList.add("list-group-item", "navy-text", "border-0");
    windLi.innerHTML = "Wind speed: " + resultObj.wind.speed + "m/sec";
    cardUl.appendChild(windLi);

    var humidityLi = document.createElement("li");
    humidityLi.classList.add("list-group-item", "navy-text")
    humidityLi.innerHTML = "Humidity: " + resultObj.main.humidity + "%";
    cardUl.appendChild(humidityLi);

  }

  function getWeather(lat,lon) {

    //API URL with variable parameters
    var locWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
  
    // Fetch forecast API results
    fetch(locWeatherUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {

        console.log(locRes);

        // Render current weather info
        var currentTempRes = locRes.list[0].main.temp;
        var currentWindRes = locRes.list[0].wind.speed;
        var currentHumidityRes = locRes.list[0].main.humidity;
        var currentIconRes = locRes.list[0].weather[0].icon;
        
        var iconSrc = "https://openweathermap.org/img/wn/" + currentIconRes + "@2x.png"

        console.log(currentTempRes);

        cityCurrentTemp.textContent = "Current temperature:";
        cityCurrentIcon.setAttribute("src", iconSrc);
        cityCurrentDegrees.textContent = currentTempRes + "°c";
        cityCurrentWind.innerHTML = "Wind speed: " + currentWindRes + "m/sec";
        cityCurrentHumidity.innerHTML = "Humidity: " + currentHumidityRes + "%";

        var timeStamp = locRes.list[0].dt_txt;
        console.log(timeStamp);

        // Isolate indexes of midday timestamps to render 5 day forecast
        if (timeStamp.includes("00:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 4 || i == 12 || i == 20 || i == 28 || i == 36) {
                
                
                printForecast(locRes.list[i]);
        }
        }}

        if (timeStamp.includes("03:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 3 || i == 11 || i == 19 || i == 27 || i == 35) {
                
                
                printForecast(locRes.list[i]);
        }
        }}

        if (timeStamp.includes("06:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 2 || i == 10 || i == 18 || i == 26 || i == 34) {
                
                
                printForecast(locRes.list[i]);
        }
        }}

        if (timeStamp.includes("09:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 1 || i == 9 || i == 17 || i == 25 || i == 33) {
                
                
                printForecast(locRes.list[i]);
        }
        }}

        if (timeStamp.includes("12:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32) {
                
                
                printForecast(locRes.list[i]);
        }
        }}

        if (timeStamp.includes("15:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39) {
                
                
                printForecast(locRes.list[i]);
        }
        }}

        if (timeStamp.includes("18:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 6 || i == 14 || i == 22 || i == 30 || i == 38) {
                
                
                printForecast(locRes.list[i]);
        }
        }}

        if (timeStamp.includes("21:00:00")) {

            for (var i = 0; i < locRes.list.length; i++) {

                if (i == 5 || i == 13 || i == 21 || i == 29 || i == 37) {
                
                
                printForecast(locRes.list[i]);
        }
        }}
    })
      .catch(function (error) {
        console.error(error);
    })
  }

  getGeoParams();