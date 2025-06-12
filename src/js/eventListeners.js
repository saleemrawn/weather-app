import {
  addHourlyForecastToDOM,
  addSevenDayForecastToDOM,
  addTodayForecastToDOM,
  hideSearchOverlay,
  setSearchInputValue,
  showSearchOverlay,
  toggleCelciusValues,
  toggleFahrenheitValues,
  toggleForecastButtonSelected,
  toggleTempUnitButton,
} from "./domController.js";
import { loadForecastButtons } from "./forecast-buttons.js";
import loadHeader from "./header.js";
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
  addTodayForecastToDOM();
  addHourlyForecastToDOM();
  loadEventListeners();
  loadTempUnit();
}

async function handleSearchLocationEvent() {
  const form = document.getElementById("search-header-form");
  const formData = new FormData(form);
  const query = formData.get("search");

  await weatherService.fetchForecastData(query);
  setSearchInputValue(weatherService.getLocationName());
  addTodayForecastToDOM();
  addHourlyForecastToDOM();
  loadTempUnit();
}

async function handleSearchOverlayEvent() {
  const form = document.getElementById("search-overlay-form");
  const formData = new FormData(form);
  const query = formData.get("search-overlay-input");

  await weatherService.fetchForecastData(query);
  loadHeader();
  setSearchInputValue(weatherService.getLocationName());
  loadForecastButtons();
  addTodayForecastToDOM();
  addHourlyForecastToDOM();
  loadTempUnit();
  hideSearchOverlay();
}

function loadEventListeners() {
  const form = document.getElementById("search-header-form");
  const searchOverlayForm = document.getElementById("search-overlay-form");
  const hourlyButton = document.querySelector(".hourly-button");
  const sevenDayButton = document.querySelector(".seven-day-button");
  const celciusButton = document.getElementById("celcius");
  const fahrenheitButton = document.getElementById("fahrenheit");

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
