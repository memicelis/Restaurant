import { mealsDB, reservationsDB } from './api.js';
import reservationsCounter from './reservationsCounter.js';
import '../popup.css';

const reservationsPopup = async (id) => {
  const response = await fetch(mealsDB);
  const data = await response.json();
  const selectedMeal = data.meals.find((item) => item.idMeal === id);

  const responseReservations = await fetch(
    `${reservationsDB}item_id=${selectedMeal.idMeal}`
  );

  const dataReservations = await responseReservations.json();

  const popup = document.createElement('div');
  popup.classList.add('popup');
  document.body.appendChild(popup);

  const window = document.createElement('div');
  window.classList.add('window');
  popup.appendChild(window);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
  window.appendChild(imageContainer);
  const image = document.createElement('img');
  image.classList.add('popup-image');
  image.src = selectedMeal.strMealThumb;

  imageContainer.appendChild(image);

  const closeButton = document.createElement('a');
  closeButton.classList.add('close');
  closeButton.innerHTML = 'X';
  closeButton.addEventListener('click', () => {
    popup.remove();
  });

  window.appendChild(closeButton);

  const mealName = document.createElement('p');
  mealName.classList.add('title');
  mealName.innerHTML = `${selectedMeal.strMeal}`;

  window.appendChild(mealName);

  const detailsPopup = document.createElement('div');
  detailsPopup.classList.add('details');
  detailsPopup.id = 'details';
  detailsPopup.innerHTML = ` 
    <p class="meal" id="meal">Name: ${selectedMeal.strMeal}</p>
    <p class="meal" id="meal">Category: ${selectedMeal.strCategory}</p>
    <p class="meal" id="meal">Origin: ${selectedMeal.strArea}</p>
    <p class="meal" id="meal">Video: <a href="${selectedMeal.strYoutube}" class="meal" id="meal" target="_blank">Youtube</a></p>`;

  window.appendChild(detailsPopup);

  const titleReservations = document.createElement('h2');
  titleReservations.classList.add('title-reservations');
  titleReservations.innerText = 'Reservations';

  window.appendChild(titleReservations);

  const reservations = document.createElement('ul');
  reservations.classList.add('reservations-list');

  if (dataReservations && dataReservations.length > 0) {
    window.appendChild(reservations);
    dataReservations.forEach((item) => {
      const reserveItem = document.createElement('li');
      reserveItem.classList.add('reserve-list-item');
      reserveItem.innerHTML = `${item.date_start} - ${item.date_end} by ${item.username}`;
      reservations.appendChild(reserveItem);
    });
  }
  reservationsCounter();
};

export default reservationsPopup;
