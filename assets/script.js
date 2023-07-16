var apiKey = "3bdc417e78dfd8db03774da5b237d55a";

$(document).ready(function () {

// todo: fix comment
    //search city
function getCities() {
    var cities = localStorage.getItem("cities")
     if (!cities) {
        return []
     } 
     return JSON.parse(cities)
}

// todo: fix comment
//event listener
// todo: format
$("#search-btn").on("click", function(event) {
event.preventDefault()

var searchBox = $("#search-input")
    // todo: call api for city as a new function. if not valid, don't add to list and alert user. if valid, add to list and display
    
    if (!getCities().includes(searchBox.val())) {
        
        localStorage.setItem("cities", JSON.stringify([...getCities(), searchBox.val()]));
    }
    // todo: display the cities on html through a new function
});



})



//Current weather
// function currentWeather()

// //5 day weather
// function futureWeather()

//local storage for past searched cities