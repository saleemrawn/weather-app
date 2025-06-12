import { format } from "date-fns";
import { weatherService } from "./weather.js";
import { importAllImages, convertToCelcius } from "./helpers.js";

export default function loadHourlyForecast() {
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
