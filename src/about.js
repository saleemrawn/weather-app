import "./about.css";
import aboutImage from "./about-image.jpg";

export default function loadAbout() {
  const content = document.querySelector("#content");

  content.innerHTML = `
        <div class="about-container">
          <div class="about-hero">
              <h1>About us</h1>
          </div>

          <div class="about-info">
            <div class="description">
              <p>At Savory & Sweet, we believe that food is more than just a meal—it’s an experience. Nestled in the heart of the city, our restaurant offers a delightful fusion of savory flavors and sweet indulgences, crafted from the freshest ingredients. Whether you're enjoying a cozy dinner with loved ones or celebrating a special occasion, our menu is designed to please every palate.</p>
              <p>With a welcoming atmosphere and impeccable service, Savory & Sweet is the perfect place to savor life’s little pleasures, one bite at a time.</p>
            </div>
            <img src="${aboutImage}" alt="chefs cooking, people eating" />
          </div>
        </div>`;
}
