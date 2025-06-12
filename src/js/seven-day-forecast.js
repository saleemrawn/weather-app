import { format } from "date-fns";
import { weatherService } from "./weather.js";
import { importAllImages, convertToCelcius } from "./helpers.js";

export default function loadSevenDayForecast() {
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
