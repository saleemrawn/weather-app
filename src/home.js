import "./home.css";
import freshLocalImage from "./home-benefit-1.jpg";
import cozyAmbienceImage from "./home-benefit-2.jpg";
import guiltyFreeImage from "./home-benefit-3.jpg";
import menuImage from "./home-menu.jpg";
import bookingsImage from "./home-bookings.jpg";

export default function loadHome() {
  const content = document.querySelector("#content");

  content.innerHTML = `
        <div class="home-container">
          <div class="home-hero">
            <h1>Satisfy Your Cravings, Delight Your Senses.</h1>
          </div>
          <div class="benefits">
            <div class="benefit-1">
              <h2>Fresh & Local</h2>
              <p>
                Our commitment to using fresh, locally sourced ingredients ensures every meal is both healthy and full of
                flavor.
              </p>
              <img src="${freshLocalImage}" alt="plate of fries and sides" />
            </div>
            <div class="benefit-2">
            <h2>Cozy Ambience</h2>
              <p>
                With a cozy ambiance and attentive service, Savory & Sweet creates the perfect setting for any occasion.
              </p>
              <img src="${cozyAmbienceImage}" alt="restaurant bar" />
            </div>
            <div class="benefit-3">
            <h2>Guilty-Free</h2>
              <p>
                Enjoy guilt-free indulgence, knowing that our sustainable practices make every dish as kind to the planet
                as it is to your taste buds.
              </p>
              <img src="${guiltyFreeImage}" alt="two women eating" />
            </div>
          </div>
          <div class="menu">
            <div class="menu-left-col">
              <div class="menu-intro">
                <h2>Our menu</h2>
                <p>
                  We offer a delightful fusion of savory dishes and indulgent desserts, each crafted with the finest,
                  locally sourced ingredients. From hearty, flavorful mains to mouthwatering sweet treats, every dish is
                  designed to provide a memorable dining experience. Whether you're craving something light and fresh or
                  rich and satisfying, we have something to please every palate.
                </p>
              </div>
              <div class="allergy">
                <h3>Allergies & Dietary Requirements</h3>
                <p>
                  At Savory & Sweet, we take allergy concerns seriously. Our staff is trained to assist with ingredient
                  information, and we offer options for various dietary restrictions. Please inform us of any allergies, and
                  we'll ensure your meal is prepared with the utmost care to avoid cross-contamination. Your safety and
                  comfort are our top priorities.
                </p>
              </div>
              <div class="drinks">
                <h3>Drink</h3>
                <p>
                  At Savory & Sweet, we offer a carefully curated selection of drinks to complement your meal. Our menu
                  features refreshing non-alcoholic options like fresh juices, iced teas, and handcrafted sodas, as well as
                  a variety of expertly crafted cocktails, wines, and beers for those looking to enjoy a drink with their
                  meal. Whatever your preference, we have something to elevate your dining experience.
                </p>
              </div>
            </div>
            <div class="menu-right-col">
              <img src="${menuImage}" alt="baskets of naan bread & pakoras" />
            </div>
          </div>
          <div class="bookings">
            <div class="booking-left-col">
              <img src="${bookingsImage}" alt="buffet table" />
            </div>
            <div class="booking-right-col">
               <div class="reservations">
                 <h2>Reservations</h2>
                 <p>For reservations, we kindly invite you to contact us directly by phone at 0208 123 4567. Our team is available to assist you in securing your preferred dining time and ensuring a memorable experience. We recommend booking in advance, particularly during peak hours, to guarantee your table.</p>
                 <p>Should you have any special requests or dietary preferences, please feel free to inform us, and we will do our utmost to accommodate your needs.</p>
               </div>
          
               <div class="opening-times">
                  <h2>Opening times</h2>
                  <div class="lunch-times">
                    <h3>Lunch</h3>
                    <p>Monday - Friday</p>
                    <p>12pm - 4pm</p>
                  </div>
                  <div class="dinner-times">
                    <h3>Dinner</h3>
                    <p>Monday - Saturday</p>
                    <p>6pm - 11pm</p>
                  </div>
              </div>
            </div>
          </div>
        </div>`;
}
