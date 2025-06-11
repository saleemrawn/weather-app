import {
  addHourlyForecastToDOM,
  addSevenDayForecastToDOM,
  addTodayForecastToDOM,
  setSearchInputValue,
  toggleForecastButtonSelected,
} from "./domController.js";
import { getDataFromStorage } from "./storage.js";
import { weatherService } from "./weather.js";

export async function loadApp() {
  await weatherService.fetchForecastData(getDataFromStorage("weatherLocation"));
  setSearchInputValue(weatherService.getLocationName());
  addTodayForecastToDOM();
  addHourlyForecastToDOM();
  loadEventListeners();
}

async function handleSearchLocationEvent() {
  const form = document.getElementById("weather-form");
  const formData = new FormData(form);
  const query = formData.get("search");

  await weatherService.fetchForecastData(query);
  setSearchInputValue(weatherService.getLocationName());
  addTodayForecastToDOM();
  addHourlyForecastToDOM();
}

function loadEventListeners() {
  const form = document.getElementById("weather-form");
  const hourlyButton = document.querySelector(".hourly-button");
  const sevenDayButton = document.querySelector(".seven-day-button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearchLocationEvent();
  });

  hourlyButton.addEventListener("click", () => {
    toggleForecastButtonSelected();
    addHourlyForecastToDOM();
  });

  sevenDayButton.addEventListener("click", () => {
    toggleForecastButtonSelected();
    addSevenDayForecastToDOM();
  });
}
