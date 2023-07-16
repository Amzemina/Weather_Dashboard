var apiKey = "3bdc417e78dfd8db03774da5b237d55a";

$(document).ready(function () {


//Gets city list from localstorage
function getCities() {
    var cities = localStorage.getItem("cities")
     if (!cities) {
        return []
     } 
     return JSON.parse(cities)
}

//displays cities from localstorage
function displayCities() {
    var cityListEl = $("#cityList")
    //Stops from displaying duplicated list
    cityListEl.empty()

    getCities().forEach(city => { 
        var cityEl = $("<div>")
        cityEl.text(city)
        cityListEl.append(cityEl)
    });
}
displayCities()
//search button click event
// todo: format
$("#search-btn").on("click", function(event) {
event.preventDefault()

var searchBox = $("#search-input")
    // todo: call api for city as a new function. if not valid, don't add to list and alert user. if valid, add to list and display
    if (!getCities().includes(searchBox.val())) {
        localStorage.setItem("cities", JSON.stringify([...getCities(), searchBox.val()]));
    }
    displayCities()
});

})



//Current weather
// function currentWeather()

// //5 day weather
// function futureWeather()

//local storage for past searched cities