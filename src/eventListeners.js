import { updateNavSelected } from "./helper.js";

export default function loadEventListeners() {
  const homeButton = document.querySelector(".home-btn");
  const menuButton = document.querySelector(".menu-btn");
  const aboutButton = document.querySelector(".about-btn");

  homeButton.addEventListener("click", (button) => {
    loadHome();
    updateNavSelected(button);
  });

  menuButton.addEventListener("click", (button) => {
    loadMenu();
    updateNavSelected(button);
  });

  aboutButton.addEventListener("click", (button) => {
    loadAbout();
    updateNavSelected(button);
  });
}

import loadHome from "./home.js";
import loadMenu from "./menu.js";
import loadAbout from "./about.js";
