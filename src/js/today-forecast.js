import { format } from "date-fns";
import { weatherService } from "./weather.js";
import { importAllImages, convertToCelcius } from "./helpers.js";

export default function loadTodayForecast() {
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
