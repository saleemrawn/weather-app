import { weatherService } from "./weather.js";
import { format } from "date-fns";
import { importAllImages } from "./helpers.js";

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
        <div class="today-temp">${today.tempmax}</div>
        <div class="today-description"><img src="${images[`${today.icon}.svg`]}" class="today-weather-icon ${
      today.icon
    }" alt="${today.icon}" />${weatherService.getTodayDescription()}
        </div>
      </div>

      <div class="today-bottom-right-col">
        <div class="today-data-container">
          <div class="today-data-value">${today.feelslikemax}</div>
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
  container.insertAdjacentHTML("afterbegin", '<div class="forecast-card-container"></div>');

  const cardContainer = document.querySelector(".forecast-card-container");

  days.forEach((day) => {
    cardContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="forecast-card">
        <div class="forecast-date">${format(new Date(day.datetime), "EEE do")}</div>
        <div class="forecast-weather-icon">
          <img src="${images[`${day.icon}.svg`]}" class="weather-icon ${day.icon}" alt="${day.icon}" />
        </div>
        <div class="forecast-temp">${day.temp}</div>
        <div class="forecast-data-container">
          <div class="forecast-card-title">Temp. feels like</div>
          <div class="forecast-card-value">${day.feelslikemax}</div>
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

export function setSearchInputValue(val) {
  const search = document.getElementById("search");
  search.value = val;
}
