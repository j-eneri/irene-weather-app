function formatDate(times) {
  let date = new Date(times);

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Firday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hour}:${minute}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecast");

  let days = ["Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <div class="forecst-date">${day}</div>
              
            <img
              src="http://openweathermap.org/img/wn/50d@2x.png"
              alt=""
              width="42"
            />

          <div class="forecast-temperatures">
            <span class="forecast-temp-max"> 19˚ </span>
            <span class="forecast-temp-min"> 11˚ </span>
          </div>
        </div>       
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "f999d2e5cbb5cd86b1abf56409434d08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function weatherConditionInfo(response) {
  let city = document.querySelector("h1");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let daytime = document.querySelector("#current");
  let description = document.querySelector("#description");
  let mainIcon = document.querySelector("#main-weather-icon");

  celsiusTemp = response.data.main.temp;

  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(celsiusTemp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  daytime.innerHTML = formatDate(response.data.dt * 1000);
  description.innerHTML = response.data.weather[0].description;
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function cities(city) {
  let apiKey = "f999d2e5cbb5cd86b1abf56409434d08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherConditionInfo);
}

function searchCities(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-cities");
  let city = cityInput.value;
  cities(city);
}

function displyFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahernheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahernheitTemp);
}

function displyCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}

// function searchLocation(position) {
//   let apiKey = "f999d2e5cbb5cd86b1abf56409434d08";
//   let longitude = position.coords.longitude;
//   let latitude = position.coords.latitude;
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//   console.log(apiUrl);
//   axios(apiUrl).then(weatherConditionInfo);
// }

// function currentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchLocation);
// }

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCities);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displyFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displyCelsius);

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", currentLocation);

cities("london");
