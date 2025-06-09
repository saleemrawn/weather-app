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
      <div class="today-date">${format(new Date(today.datetime), "EEEE co MMMM")}</div>
      <div class="today-location-name">${weatherService.getLocationName()}</div>
    </div>

    <div class="today-bottom-row">
      <div class="today-bottom-left-col">
        <div class="today-temp">${today.tempmax}</div>
        <div class="today-description"><img src="${images[`${today.icon}.svg`]}" class="weather-icon ${
      today.icon
    }" alt="${today.icon}" />${weatherService.getTodayDescription()}
        </div>
      </div>

      <div class="today-bottom-right-col">
        <div class="temp-feel">
          <div class="temp-feel-value">${today.feelslikemax}</div>
          <div class="temp-feel-label">Temp. feels like</div>
        </div>
        <div class="precip">
           <div class="precip-value">${today.precipprob}%</div>
           <div class="precip-label">Chance of precipitation</div>
        </div>
        <div class="humidity">
          <div class="humidity-value">${today.humidity}%</div>
          <div class="humidity-label">Humidity</div>
        </div>
        <div class="visibility">
          <div class="visibility-value">${today.visibility}</div>
          <div class="visibility-label">Visibility</div>
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
        <div class="date">
          <p>${format(new Date(day.datetime), "EEE co")}</p>
        </div>
        <div class="weather-icon">
          <img src="${images[`${day.icon}.svg`]}" class="weather-icon ${day.icon}" alt="${day.icon}" />
        </div>
        <div class="temp">
          <p>${day.temp}</p>
        </div>
        <div class="temp-feel">
          <p>Temp. feels like</p>
          <p>${day.feelslikemax}</p>
        </div>
        <div class="precip">
          <p>Chance of precipitation</p>
          <p>${day.precipprob}%</p>
        </div>
        <div class="humidity">
          <p>Humidity</p>
          <p>${day.humidity}%</p>
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
