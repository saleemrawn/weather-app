import { getDataFromStorage } from "./storage";

export function showSearchOverlay() {
  const container = document.querySelector("main");

  container.insertAdjacentHTML(
    "beforebegin",
    `
    <div class="search-overlay-container">
      <div class="logo-container">
        <h1 class="logo">weather<span>forecast</span></h1>
      </div>
      <form id="search-overlay-form">
        <input type="search" id="search-overlay-input" name="search-overlay-input" placeholder="Search location..." />
        <button id="overlay-clear-button" type="reset" title="Clear"><i class="fa-solid fa-xmark"></i></button>
        <button id="overlay-search-button" type="submit" title="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
    `
  );
}

export function hideSearchOverlay() {
  const overlay = document.querySelector(".search-overlay-container");
  overlay.classList.add("fade-out");
  overlay.addEventListener("transitionend", () => overlay.remove());
}

export function showLoader() {
  const container = document.querySelector("body");
  container.insertAdjacentHTML(
    "beforebegin",
    `<div class="loader-container">
      <div class="loader"></div>
    </div>`
  );
}

export function hideLoader() {
  const container = document.querySelector(".loader-container");

  container.classList.add("fade-out");
  container.addEventListener("transitionend", () => container.remove());
}

export function setSearchInputValue(val) {
  const search = document.getElementById("search");
  search.value = val;
}

export function toggleForecastButtonSelected() {
  const hourlyButton = document.querySelector(".hourly-button");
  const sevenDayButton = document.querySelector(".seven-day-button");

  if (hourlyButton.classList.contains("selected")) {
    hourlyButton.classList.remove("selected");
    sevenDayButton.classList.add("selected");
    return;
  }

  hourlyButton.classList.add("selected");
  sevenDayButton.classList.remove("selected");
}

export function toggleTempUnitButton() {
  const celciusButton = document.getElementById("celcius");
  const fahrenheitButton = document.getElementById("fahrenheit");

  if (getDataFromStorage("tempUnit") === "celcius") {
    celciusButton.setAttribute("checked", "checked");
    return;
  }

  if (getDataFromStorage("tempUnit") === "fahrenheit") {
    fahrenheitButton.setAttribute("checked", "checked");
    return;
  }
}

export function toggleCelciusValues() {
  const celciusTemps = document.querySelectorAll(".celcius");
  const fahrenheitTemps = document.querySelectorAll(".fahrenheit");

  celciusTemps.forEach((temp) => temp.classList.remove("hide"));
  fahrenheitTemps.forEach((temp) => temp.classList.add("hide"));
}

export function toggleFahrenheitValues() {
  const celciusTemps = document.querySelectorAll(".celcius");
  const fahrenheitTemps = document.querySelectorAll(".fahrenheit");

  celciusTemps.forEach((temp) => temp.classList.add("hide"));
  fahrenheitTemps.forEach((temp) => temp.classList.remove("hide"));
}
