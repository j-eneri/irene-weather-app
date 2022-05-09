


  // function displayWeatherCondition(response) {
  //   document.querySelector("#city").innerHTML = response.data.name;
  //   document.querySelector("#temperature").innerHTML = Math.round(
  //     response.data.main.temp
  //   );
  //   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //   document.querySelector("#wind").innerHTML = Math.round(
  //     response.data.wind.speed
  //   );
  //   document.querySelector("#description").innerHTML =
  //     response.data.weather[0].main;
  // }

  // function searchCity(city) {
  //   var apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  //   var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
  //     .concat(city, "&appid=")
  //     .concat(apiKey, "&units=metric");
  //   axios.get(apiUrl).then(displayWeatherCondition);
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   var city = document.querySelector("#city-input").value;
  //   searchCity(city);
  // }
  // var searchForm = document.querySelector("#search-form");
  // searchForm.addEventListener("submit", handleSubmit);

  function searchLocation(position) {
    var apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
      .concat(position.coords.latitude, "&lon=")
      .concat(position.coords.longitude, "&appid=")
      .concat(apiKey, "&units=metric");
    axios.get(apiUrl).then(displayWeatherCondition);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  var currentLocationButton = document.querySelector(
    "#current-location-button"
  );
  currentLocationButton.addEventListener("click", getCurrentLocation);
  searchCity("New York");
