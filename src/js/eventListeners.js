import {
  hideLoader,
  hideSearchOverlay,
  setSearchInputValue,
  showLoader,
  showSearchOverlay,
  toggleCelciusValues,
  toggleFahrenheitValues,
  toggleForecastButtonSelected,
  toggleTempUnitButton,
} from "./domController.js";
import loadForecastButtons from "./forecast-buttons.js";
import loadHeader from "./header.js";
import loadTodayForecast from "./today-forecast.js";
import loadHourlyForecast from "./hourly-forecast.js";
import loadSevenDayForecast from "./seven-day-forecast.js";
import { getDataFromStorage, saveDataToStorage } from "./storage.js";
import { weatherService } from "./weather.js";

export async function loadApp() {
  if (getDataFromStorage("weatherLocation") === null) {
    showSearchOverlay();
    loadEventListeners();
    return;
  }

  weatherService.setForecastData(getDataFromStorage("weatherData"));
  loadHeader();
  setSearchInputValue(weatherService.getLocationName());
  loadForecastButtons();
  loadTodayForecast();
  loadHourlyForecast();
  loadEventListeners();
  loadTempUnit();
}

async function handleSearchLocationEvent() {
  const form = document.getElementById("search-header-form");
  const formData = new FormData(form);
  const query = formData.get("search");

  showLoader();
  await weatherService.fetchForecastData(query);
  setSearchInputValue(weatherService.getLocationName());
  loadTodayForecast();
  loadHourlyForecast();
  loadTempUnit();
  hideLoader();
}

async function handleSearchOverlayEvent() {
  const form = document.getElementById("search-overlay-form");
  const formData = new FormData(form);
  const query = formData.get("search-overlay-input");

  showLoader();
  await weatherService.fetchForecastData(query);
  loadHeader();
  setSearchInputValue(weatherService.getLocationName());
  loadForecastButtons();
  loadTodayForecast();
  loadHourlyForecast();
  loadTempUnit();
  hideSearchOverlay();
  hideLoader();
}

function loadEventListeners() {
  const form = document.getElementById("search-header-form");
  const searchOverlayForm = document.getElementById("search-overlay-form");
  const hourlyButton = document.querySelector(".hourly-button");
  const sevenDayButton = document.querySelector(".seven-day-button");
  const celciusButton = document.getElementById("celcius");
  const fahrenheitButton = document.getElementById("fahrenheit");

  window.addEventListener("load", () => hideLoader());

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearchLocationEvent();
  });

  searchOverlayForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearchOverlayEvent();
  });

  hourlyButton.addEventListener("click", () => {
    toggleForecastButtonSelected();
    loadHourlyForecast();
    loadTempUnit();
  });

  sevenDayButton.addEventListener("click", () => {
    toggleForecastButtonSelected();
    loadSevenDayForecast();
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
