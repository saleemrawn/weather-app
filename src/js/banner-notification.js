export function showBanner(error) {
  const container = document.querySelector("header");

  container.insertAdjacentHTML(
    "beforebegin",
    `<div class="banner-container">
            <div class="banner-message">
            <i class="fa-solid fa-circle-exclamation"></i>${getFormattedError(error)}</div>
    </div>`
  );
}

export function hideBannerAfterDelay() {
  const banner = document.querySelector(".banner-container");
  setTimeout(() => banner.classList.add("fade-out"), 3000);
  banner.addEventListener("transitionend", () => banner.remove());
}

function getFormattedError(error) {
  if (error.message.includes("400")) {
    return "No results found, please try again.";
  }

  if (error.message.includes("500")) {
    return "Internal server error, please try again later.";
  }

  return error;
}
