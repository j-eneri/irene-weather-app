function formatDate(date) {
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

let dayTime = document.querySelector("#current");
let now = new Date();
dayTime.innerHTML = formatDate(now);

function weatherConditionInfo(response) {
  console.log(response);
  let city = document.querySelector("h1");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let mainIcon = document.querySelector("#main-weather-icon");

  celsiusTemp = response.data.main.temp;

  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(celsiusTemp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCities);

function searchLocation(position) {
  let apiKey = "f999d2e5cbb5cd86b1abf56409434d08";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios(apiUrl).then(weatherConditionInfo);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
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

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displyFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displyCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

cities("london");
