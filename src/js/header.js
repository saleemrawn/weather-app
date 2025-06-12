export default function loadHeader() {
  const container = document.querySelector("body");
  container.insertAdjacentHTML(
    "afterbegin",
    `<header>
      <div class="logo-container">
        <h1 class="logo">weather<span>forecast</span></h1>
      </div>
      <form id="search-header-form">
        <input type="search" id="search" name="search" placeholder="Search location..." />
        <button id="clear-button" type="reset" title="Clear"><i class="fa-solid fa-xmark"></i></button>
        <button id="search-button" type="submit" title="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>
      <div class="unit-pref-container">
        <div class="celcius-container">
          <input type="radio" id="celcius" name="tempUnit" title="Celcius" checked />
          <label for="celcius">&#8451;</label>
        </div>
        <div class="fahrenheit-container">
          <input type="radio" id="fahrenheit" name="tempUnit" title="Fahrenheit" />
          <label for="fahrenheit">&#8457;</label>
        </div>
      </div>
    </header>`
  );
}
