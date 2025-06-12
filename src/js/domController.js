import { weatherService } from "./weather.js";
import { format } from "date-fns";
import { importAllImages, convertToCelcius } from "./helpers.js";

export function addTodayForecastToDOM() {
  const container = document.querySelector(".today-weather-container");
  const today = weatherService.getTodayForecast();
  const images = importAllImages(require.context("../img", false, /\.(png|jpe?g|svg)$/));

  container.innerHTML = "";

  container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="today-top-row">
      <div class="today-date">${format(new Date(today.datetime), "EEEE do MMMM")}</div>
      <div class="today-location-name">${weatherService.getLocationName()}</div>
    </div>

    <div class="today-bottom-row">
      <div class="today-bottom-left-col">
        <div class="today-temp celcius">${convertToCelcius(today.tempmax)}<sup>&#176;C</sup></div>
        <div class="today-temp fahrenheit hide">${today.tempmax}<sup>&#176;F</sup></div>
        <div class="today-description"><img src="${images[`${today.icon}.svg`]}" class="today-weather-icon ${
      today.icon
    }" alt="${today.icon}" />${weatherService.getTodayDescription()}
        </div>
      </div>

      <div class="today-bottom-right-col">
        <div class="today-data-container">
        <div class="today-data-value celcius">${convertToCelcius(today.feelslikemax)}<sup>&#176;C</sup></div>
          <div class="today-data-value fahrenheit hide">${today.feelslikemax}<sup>&#176;F</sup></div>
          <div class="today-data-label">Temp. feels like</div>
        </div>
        <div class="today-data-container">
           <div class="today-data-value">${today.precipprob}%</div>
           <div class="today-data-label">Chance of precipitation</div>
        </div>
        <div class="today-data-container">
          <div class="today-data-value">${today.humidity}%</div>
          <div class="today-data-label">Humidity</div>
        </div>
        <div class="today-data-container">
          <div class="today-data-value">${today.visibility}</div>
          <div class="today-data-label">Visibility</div>
        </div>
      </div>

    </div>
    `
  );
}

export function addSevenDayForecastToDOM() {
  const container = document.querySelector(".forecast-weather-container");
  const days = weatherService.getSevenDayForecast();
  const images = importAllImages(require.context("../img", false, /\.(png|jpe?g|svg)$/));

  container.innerHTML = "";

  container.insertAdjacentHTML("afterbegin", '<div class="seven-day-forecast-container"></div>');
  const cardContainer = document.querySelector(".seven-day-forecast-container");

  days.forEach((day) => {
    cardContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="forecast-card">
        <div class="forecast-date">${format(new Date(day.datetime), "EEE do")}</div>
        <div class="forecast-weather-icon">
          <img src="${images[`${day.icon}.svg`]}" class="weather-icon ${day.icon}" alt="${day.icon}" />
        </div>
        <div class="forecast-temp celcius">${convertToCelcius(day.temp)}<sup>&#176;C</sup></div>
        <div class="forecast-temp fahrenheit hide">${day.temp}<sup>&#176;F</sup></div>
        <div class="forecast-data-container">
          <div class="forecast-card-title">Temp. feels like</div>
          <div class="forecast-card-value celcius">${convertToCelcius(day.feelslikemax)}<sup>&#176;C</sup></div>
          <div class="forecast-card-value fahrenheit hide">${day.feelslikemax}<sup>&#176;F</sup></div>
        </div>
        <div class="forecast-data-container">
          <div class="forecast-card-title">Chance of precipitation</div>
          <div class="forecast-card-value">${day.precipprob}%</div>
        </div>
        <div class="forecast-data-container">
          <div class="forecast-card-title">Humidity</div>
          <div class="forecast-card-value">${day.humidity}%</div>
        </div>
      </div>
      `
    );
  });
}

export function addHourlyForecastToDOM() {
  const container = document.querySelector(".forecast-weather-container");
  const images = importAllImages(require.context("../img", false, /\.(png|jpe?g|svg)$/));
  const days = weatherService.getSevenDayForecast();

  container.innerHTML = "";

  container.insertAdjacentHTML("afterbegin", '<div class="hourly-forecast-container"></div>');
  const cardContainer = document.querySelector(".hourly-forecast-container");

  days.forEach((day) => {
    day.hours.forEach((hour) => {
      cardContainer.insertAdjacentHTML(
        "beforeend",
        `
      <div class="forecast-card">
      <div class="forecast-date">${format(
        new Date("", "", "", hour.datetime.slice(0, 2), hour.datetime.slice(3, 5), hour.datetime.slice(6, 8)),
        "p"
      )}</div>
        <div class="forecast-weather-icon">
          <img src="${images[`${hour.icon}.svg`]}" class="weather-icon ${hour.icon}" alt="${hour.icon}" />
        </div>
        <div class="forecast-temp celcius">${convertToCelcius(hour.temp)}<sup>&#176;C</sup></div>
        <div class="forecast-temp fahrenheit hide">${hour.temp}<sup>&#176;F</sup></div>
        <div class="forecast-data-container">
          <div class="forecast-card-title">Chance of precipitation</div>
          <div class="forecast-card-value">${hour.precipprob}%</div>
        </div>
        <div class="forecast-data-container">
          <div class="forecast-card-title">Humidity</div>
          <div class="forecast-card-value">${hour.humidity}%</div>
        </div>
      </div>
      `
      );
    });
  });
}

export function showSearchOverlay() {
  const container = document.querySelector("main");

  container.insertAdjacentHTML(
    "beforebegin",
    `
    <div class="search-overlay-container">
      <div class="logo-container">
        <h1 class="logo">weather<span>forecast</span></h1>
      </div>
      <form id="search-overlay-form">
        <input type="search" id="search-overlay-input" name="search-overlay-input" placeholder="Search location..." />
        <button id="overlay-clear-button" type="reset" title="Clear"><i class="fa-solid fa-xmark"></i></button>
        <button id="overlay-search-button" type="submit" title="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
    `
  );
}

export function hideSearchOverlay() {
  const overlay = document.querySelector(".search-overlay-container");
  overlay.classList.add("fade-out");
}

export function setSearchInputValue(val) {
  const search = document.getElementById("search");
  search.value = val;
}

export function toggleForecastButtonSelected() {
  const hourlyButton = document.querySelector(".hourly-button");
  const sevenDayButton = document.querySelector(".seven-day-button");

  if (hourlyButton.classList.contains("selected")) {
    hourlyButton.classList.remove("selected");
    sevenDayButton.classList.add("selected");
    return;
  }

  hourlyButton.classList.add("selected");
  sevenDayButton.classList.remove("selected");
}

export function toggleTempUnitButton() {
  const celciusButton = document.getElementById("celcius");
  const fahrenheitButton = document.getElementById("fahrenheit");

  if (localStorage.getItem("tempUnit") === "celcius") {
    celciusButton.setAttribute("checked", "checked");
    return;
  }

  fahrenheitButton.setAttribute("checked", "checked");
}

export function toggleCelciusValues() {
  const celciusTemps = document.querySelectorAll(".celcius");
  const fahrenheitTemps = document.querySelectorAll(".fahrenheit");

  celciusTemps.forEach((temp) => temp.classList.remove("hide"));
  fahrenheitTemps.forEach((temp) => temp.classList.add("hide"));
}

export function toggleFahrenheitValues() {
  const celciusTemps = document.querySelectorAll(".celcius");
  const fahrenheitTemps = document.querySelectorAll(".fahrenheit");

  celciusTemps.forEach((temp) => temp.classList.add("hide"));
  fahrenheitTemps.forEach((temp) => temp.classList.remove("hide"));
}
