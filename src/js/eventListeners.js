import {
  addHourlyForecastToDOM,
  addSevenDayForecastToDOM,
  addTodayForecastToDOM,
  setSearchInputValue,
  toggleCelciusValues,
  toggleFahrenheitValues,
  toggleForecastButtonSelected,
  toggleTempUnitButton,
} from "./domController.js";
import { getDataFromStorage, saveDataToStorage } from "./storage.js";
import { weatherService } from "./weather.js";

export async function loadApp() {
  if (getDataFromStorage("weatherLocation") === null) {
    showSearchOverlay();
    loadEventListeners();
    return;
  }

  weatherService.setForecastData(getDataFromStorage("weatherData"));
  setSearchInputValue(weatherService.getLocationName());
  addTodayForecastToDOM();
  addHourlyForecastToDOM();
  loadEventListeners();
  loadTempUnit();
}

async function handleSearchLocationEvent() {
  const form = document.getElementById("weather-form");
  const formData = new FormData(form);
  const query = formData.get("search");

  await weatherService.fetchForecastData(query);
  setSearchInputValue(weatherService.getLocationName());
  addTodayForecastToDOM();
  addHourlyForecastToDOM();
  loadTempUnit();
}

function loadEventListeners() {
  const form = document.getElementById("weather-form");
  const hourlyButton = document.querySelector(".hourly-button");
  const sevenDayButton = document.querySelector(".seven-day-button");
  const celciusButton = document.getElementById("celcius");
  const fahrenheitButton = document.getElementById("fahrenheit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearchLocationEvent();
  });

  hourlyButton.addEventListener("click", () => {
    toggleForecastButtonSelected();
    addHourlyForecastToDOM();
    loadTempUnit();
  });

  sevenDayButton.addEventListener("click", () => {
    toggleForecastButtonSelected();
    addSevenDayForecastToDOM();
    loadTempUnit();
  });

  celciusButton.addEventListener("click", () => {
    toggleCelciusValues();
    saveDataToStorage("tempUnit", "celcius");
    loadTempUnit();
  });

  fahrenheitButton.addEventListener("click", () => {
    toggleFahrenheitValues();
    saveDataToStorage("tempUnit", "fahrenheit");
    loadTempUnit();
  });
}

function loadTempUnit() {
  if (localStorage.getItem("tempUnit") === null || localStorage.getItem("tempUnit") === "celcius") {
    toggleCelciusValues();
    saveDataToStorage("tempUnit", "celsius");
    toggleTempUnitButton();
    return;
  }

  if (localStorage.getItem("tempUnit") === "fahrenheit") {
    toggleFahrenheitValues();
    toggleTempUnitButton();
    return;
  }
}
