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
        <div class="today-temp">${today.tempmax}<sup>&#176;F</sup></div>
        <div class="today-description"><img src="${images[`${today.icon}.svg`]}" class="today-weather-icon ${
      today.icon
    }" alt="${today.icon}" />${weatherService.getTodayDescription()}
        </div>
      </div>

      <div class="today-bottom-right-col">
        <div class="today-data-container">
          <div class="today-data-value">${today.feelslikemax}<sup>&#176;F</sup></div>
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
        <div class="forecast-temp">${day.temp}<sup>&#176;F</sup></div>
        <div class="forecast-data-container">
          <div class="forecast-card-title">Temp. feels like</div>
          <div class="forecast-card-value">${day.feelslikemax}<sup>&#176;F</sup></div>
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
        <div class="forecast-temp">${hour.temp}<sup>&#176;F</sup></div>
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

export function addForecastButtonsToDOM() {
  const container = document.querySelector(".forecast-weather-container");
  container.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="forecast-buttons">
      <button type="button">Hourly</button>
      <button type="button">7-Day Outlook</button>
    </div>
    `
  );
}

export function setSearchInputValue(val) {
  const search = document.getElementById("search");
  search.value = val;
}
