//Feature 1
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

//Feature 2

function searchCities(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-cities");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCities);

//Bonus Feature
function toFahrenheit(event) {
  event.preventDefault();

  let changeTemp = document.querySelector("#temperature");
  changeTemp.innerHTML = 66;
}

function toCelsius(event) {
  let changeTempBack = document.querySelector("#temperature");
  changeTempBack.innerHTML = 19;
}
let tempFahr = document.querySelector("#fahrenheit");
tempFahr.addEventListener("click", toFahrenheit);

let tempCels = document.querySelector("#celsius");
tempCels.addEventListener("click", toCelsius);
