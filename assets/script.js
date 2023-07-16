var apiKey = "3bdc417e78dfd8db03774da5b237d55a";

$(document).ready(function () {
//search city
function getCities() {
    var cities = localStorage.getItem("cities")
     if (!cities) {
        
        return []
     } 
     
     return JSON.parse(cities)
}
//event listener
$("#search-btn").on("click", function(event) {
event.preventDefault()

var searchBox = $("#search-input")

    localStorage.setItem("cities", JSON.stringify($.merge(getCities(), [searchBox.val()])))
   
});
})
//Current weather
// function currentWeather()

// //5 day weather
// function futureWeather()

//local storage for past searched cities