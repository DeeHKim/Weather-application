(function() {

//Functionality to ping given weather api endpoint and display relevant information to html.

//Used javascript's 'window.fetch' request api for cleaner code (functional in Chrome and FireFox).
//XMLhttprequest can be used instead for cross-browser functionality (and older browser support).

function getLocation() {

  fetch('https://weathersync.herokuapp.com/ip', {
    method: 'get'
  }).then(function(response){
    return response.json();
  }).then(function(loc) {
    return fetch('https://weathersync.herokuapp.com/weather/' + loc.location.latitude + ',' + loc.location.longitude, {
      method: 'get'
    }).then(function(res) {
      return res.json();
    }).then(function(data) {
      var location = document.getElementById('location');
      var temp = document.getElementById('temp');
      var image = document.getElementById('display');
      var condition = document.getElementById('condition');

      location.innerHTML = data.name;
      temp.innerHTML = Math.floor((data.main.temp - 273.15) * (9/5) + 32) + '&deg;' + "F"; //kelvin to farenheit
      image.innerHTML = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png''>"
      condition.innerHTML = data.weather[0].main;
    })
  })
};

getLocation();

})()
