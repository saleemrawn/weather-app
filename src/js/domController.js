import { weatherService } from "./weather.js";
import { format } from "date-fns";

export function addTodayForecastToDOM() {
  const container = document.querySelector(".today-weather-container");
  const today = weatherService.getTodayForecast();

  container.innerHTML = "";

  container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="today-top-row">
    <p>Today</p>
    <p>${today.tempmax}</p>
    <h1>${weatherService.getLocationName()}</h1>
    <p><img class="${today.icon}" alt="${today.icon}" />${weatherService.getTodayDescription()}</p>
    </div>
    <div class="today-bottom-row">
        <div class="temp-feel">
          <p>Temp. feels like</p>
          <p>${today.feelslikemax}</p>
        </div>
        <div class="precip">
          <p>Chance of precipitation</p>
          <p>${today.precipprob}%</p>
        </div>
        <div class="humidity">
          <p>Humidity</p>
          <p>${today.humidity}%</p>
        </div>
    </div>
    `
  );
}

export function addSevenDayForecastToDOM() {
  const container = document.querySelector(".forecast-weather-container");
  const days = weatherService.getSevenDayForecast();

  container.innerHTML = "";

  days.forEach((day) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="forecast-card">
        <div class="date">
          <p>${format(new Date(day.datetime), "EEE co")}</p>
        </div>
        <div class="weather-icon">
          <img class="${day.icon}" alt="${day.icon}">
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
