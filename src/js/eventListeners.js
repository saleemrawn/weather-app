import { addSevenDayForecastToDOM, addTodayForecastToDOM, setSearchInputValue } from "./domController.js";
import { getDataFromStorage } from "./storage.js";
import { weatherService } from "./weather.js";

const form = document.getElementById("weather-form");

export async function loadApp() {
  await weatherService.fetchForecastData(getDataFromStorage("weatherLocation"));
  setSearchInputValue(weatherService.getLocationName());
  addTodayForecastToDOM();
  addSevenDayForecastToDOM();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSearchLocationEvent();
});

async function handleSearchLocationEvent() {
  const formData = new FormData(form);
  const query = formData.get("search");

  await weatherService.fetchForecastData(query);
  setSearchInputValue(weatherService.getLocationName());
  addTodayForecastToDOM();
  addSevenDayForecastToDOM();
}
