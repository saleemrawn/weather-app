export function loadForecastButtons() {
  const container = document.querySelector(".today-weather-container");
  container.insertAdjacentHTML(
    "afterend",
    `<div class="forecast-buttons-container">
          <button type="button" class="hourly-button selected">Hourly</button>
          <button type="button" class="seven-day-button">7-Day Outlook</button>
        </div>`
  );
}
