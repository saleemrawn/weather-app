import "./menu.css";
import lunchImage from "./menu-lunch.jpg";
import dinnerImage from "./menu-dinner.jpg";
import dessertImage from "./menu-dessert.jpg";

export default function loadMenu() {
  const content = document.querySelector("#content");

  content.innerHTML = `
        <div class="our-menu-container">
          <div class="hero">
              <h1>Our menu</h1>
          </div>

          <div class="lunch">
            <div class="lunch-left-col">
              <h2>Lunch</h2>
              <div class="lunch-item">
                <h3>Grilled Chicken Caesar Salad</h3>
                <p>Tender grilled chicken breast, romaine lettuce, Parmesan cheese, and croutons, served with Caesar dressing.</p>
                <p class="price">£10.95</p>
              </div>

              <div class="lunch-item">
                <h3>Vegetable Stir-Fry with Jasmine Rice</h3>
                <p>A vibrant mix of seasonal vegetables stir-fried with soy sauce and served over fragrant jasmine rice.</p>
                <p class="price">£8.95</p>
              </div>

              <div class="lunch-item">
                <h3>Classic Beef Burger</h3>
                <p>Juicy beef patty, cheddar cheese, lettuce, tomato, and pickles, served with crispy fries.</p>
                <p class="price">£12.50</p>
              </div>

              <div class="lunch-item">
                <h3>Salmon and Avocado Sushi Roll</h3>
                <p>Fresh salmon, creamy avocado, and cucumber wrapped in sushi rice and nori, served with soy sauce and wasabi.</p>
                <p class="price">£11.25</p>
              </div>

              <div class="lunch-item">
                <h3>Spaghetti Aglio e Olio</h3>
                <p>Spaghetti tossed in olive oil, garlic, chili flakes, and parsley, finished with Parmesan.</p>
                <p class="price">£9.75</p>
              </div>
            </div>

            <div class="lunch-right-col">
              <img src="${lunchImage}" alt="sushi" />
            </div>
          </div>

          <div class="dinner">
            <div class="dinner-left-col">
              <h2>Dinner</h2>
              <div class="dinner-item">
                <h3>Pan-Seared Sea Bass</h3>
                <p>A delicate fillet of sea bass served with sautéed spinach, roasted potatoes, and lemon butter sauce.</p>
                <p class="price">£18.50</p>
              </div>

              <div class="dinner-item">
                <h3>Beef Wellington</h3>
                <p>Succulent beef fillet wrapped in puff pastry with mushroom duxelles and prosciutto, served with roasted vegetables and a rich red wine sauce.</p>
                <p class="price">£24.95</p>
              </div>

              <div class="dinner-item">
                <h3>Vegetarian Lasagna</h3>
                <p>Layers of pasta, ricotta cheese, spinach, and a rich tomato sauce, baked to perfection and served with a side of garlic bread.</p>
                <p class="price">£15.75</p>
              </div>

              <div class="dinner-item">
                <h3>Lamb Shank with Minted Gravy</h3>
                <p>Slow-cooked lamb shank in a flavorful minted gravy, served with mashed potatoes and steamed vegetables.</p>
                <p class="price">£21.00</p>
              </div>

              <div class="dinner-item">
                <h3>Chicken Marsala</h3>
                <p>Pan-fried chicken breasts simmered in a Marsala wine sauce, accompanied by creamy mashed potatoes and roasted carrots.</p>
                <p class="price">£17.95</p>
              </div>
            </div>

            <div class="dinner-right-col">
              <img src="${dinnerImage}" alt="plates of lasagna" />
            </div>
          </div>

          <div class="desserts">
            <div class="desserts-left-col">
              <h2>Desserts</h2>

              <div class="dessert-item">
                <h3>Chocolate Lava Cake</h3>
                <p>A rich, warm chocolate cake with a molten center, served with vanilla ice cream.</p>
                <p class="price">£6.50</p>
              </div>

              <div class="dessert-item">
                <h3>Classic Tiramisu</h3>
                <p>A traditional Italian dessert with layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder.</p>
                <p class="price">£5.95</p>
              </div>

              <div class="dessert-item">
                <h3>Lemon Posset</h3>
                <p>A smooth, tangy lemon custard topped with fresh berries and a shortbread biscuit.</p>
                <p class="price">£5.50</p>
              </div>

              <div class="dessert-item">
                <h3>Sticky Toffee Pudding</h3>
                <p>A moist date cake drenched in rich toffee sauce, served with vanilla custard.</p>
                <p class="price">£6.00</p>
              </div>

              <div class="dessert-item">
                <h3>Panna Cotta with Berry Compote</h3>
                <p>Silky panna cotta served with a sweet berry compote and a sprig of mint.</p>
                <p class="price">£6.25</p>
              </div>              
            </div>
            <div class="desserts-right-col">
              <img src="${dessertImage}" alt="plate of chocolate & raspberries" />
            </div>
          </div>
        </div>`;
}
