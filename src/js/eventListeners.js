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
  loadEventListeners();

  if (getDataFromStorage("weatherLocation") === null) {
    showSearchOverlay();
    return;
  }

  await weatherService.fetchForecastData(getDataFromStorage("weatherLocation"));
  loadHeader();
  setSearchInputValue(weatherService.getLocationName());
  loadForecastButtons();
  loadTodayForecast();
  loadHourlyForecast();
  loadTempUnit();
  hideLoader();
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
  window.addEventListener("load", () => hideLoader());

  addGlobalEventListener("submit", "#search-header-form", (event) => {
    event.preventDefault();
    handleSearchLocationEvent();
  });

  addGlobalEventListener("submit", "#search-overlay-form", (event) => {
    event.preventDefault();
    handleSearchOverlayEvent();
  });

  addGlobalEventListener("click", ".hourly-button", () => {
    toggleForecastButtonSelected();
    loadHourlyForecast();
    loadTempUnit();
  });

  addGlobalEventListener("click", ".seven-day-button", () => {
    toggleForecastButtonSelected();
    loadSevenDayForecast();
    loadTempUnit();
  });

  addGlobalEventListener("click", "#celcius", () => {
    toggleCelciusValues();
    saveDataToStorage("tempUnit", "celcius");
    loadTempUnit();
  });

  addGlobalEventListener("click", "#fahrenheit", () => {
    toggleFahrenheitValues();
    saveDataToStorage("tempUnit", "fahrenheit");
    loadTempUnit();
  });
}

function addGlobalEventListener(type, selector, callback, parent = document) {
  parent.addEventListener(type, (event) => {
    if (event.target.matches(selector)) {
      callback(event);
    }
  });
}

function loadTempUnit() {
  if (getDataFromStorage("tempUnit") === null || getDataFromStorage("tempUnit") === "celcius") {
    toggleCelciusValues();
    saveDataToStorage("tempUnit", "celsius");
    toggleTempUnitButton();
    return;
  }

  if (getDataFromStorage("tempUnit") === "fahrenheit") {
    toggleFahrenheitValues();
    toggleTempUnitButton();
    return;
  }
}
