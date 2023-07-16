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
// todo: call api for city as a new function. if not valid, don't add to list and alert user. if valid, add to list and display
function getCityFromApi(city) {
    var currentDate = dayjs()
    var currentCityEl = $("#currentCity")
    var iconEl = $("#icon")
    var tempEl = $("#temp")
    var windEl = $("#wind")
    var humidityEl = $("#humidity")

    
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
        method: 'GET', 
        dataType: 'json', 
        success: function(response) {
          console.log(response);
        currentCityEl.text(`${dayjs.unix(response.dt).format('MMM D, YYYY')}, ${response.name}`)
        var icon = $(`<img src = 'https://openweathermap.org/img/wn/${response.weather[0].icon}.png' alt='${response.weather[0].description}'/>`)
        console.log(icon)
        iconEl.append(icon)
        tempEl.text(response.main.temp)
        windEl.text(response.wind.speed)
        humidityEl.text(response.main.humidity)

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&appid=${apiKey}`,
            method: 'GET',
            dataType: 'JSON',
            success: function(fiveday) {
                console.log(fiveday)
            var list = fiveday.list.filter(el =>{ 
               console.log( dayjs.unix(el.dt).format('MMM D, YYYY: HH:mm:ss'))
                return (!currentDate.startOf("d")===dayjs.unix(el.dt).startOf("d"))
            }) ;


            var l2 = $.grep(fiveday.list, function(el) {
                return !currentDate.startOf("d")===dayjs.unix(el.dt).startOf("d");
              });
            console.log(l2)
            }
        })
        },
      });
}


displayCities()
//search button click event
    $("#search-btn").on("click", function (event) {
        event.preventDefault()

        var searchBox = $("#search-input")

        getCityFromApi(searchBox.val())

        if (!getCities().includes(searchBox.val())) {
            localStorage.setItem("cities", JSON.stringify([...getCities(), searchBox.val()]));
        }
        displayCities()
    });

})


// //5 day weather
// function futureWeather()