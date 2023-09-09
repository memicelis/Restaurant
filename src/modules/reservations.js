import { mealsDB, reservationsDB } from './api.js';
import reservationsCounter from './reservationsCounter.js';
import addReservation from './addReservation.js';
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

  const closeButton = document.createElement('a');
  closeButton.classList.add('close');
  closeButton.innerHTML = 'X';
  closeButton.addEventListener('click', () => {
    popup.remove();
  });

  window.appendChild(closeButton);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
  window.appendChild(imageContainer);
  const image = document.createElement('img');
  image.classList.add('popup-image');
  image.src = selectedMeal.strMealThumb;

  imageContainer.appendChild(image);

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
  window.appendChild(reservations);
  if (dataReservations && dataReservations.length > 0) {
    dataReservations.forEach((item) => {
      const reserveItem = document.createElement('li');
      reserveItem.classList.add('reserve-list-item');
      reserveItem.innerHTML = `${item.date_start} - ${item.date_end} by ${item.username}`;
      reservations.appendChild(reserveItem);
    });
  }

  const inputContainer = document.createElement('form');
  inputContainer.classList.add('input-container');
  inputContainer.innerHTML = '<h3>Add a comment</h3>';
  window.appendChild(inputContainer);

  const inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.classList.add('input');
  inputName.setAttribute('placeholder', 'Your name');
  inputName.setAttribute('required', '');

  const inputStartDate = document.createElement('input');
  inputStartDate.setAttribute('type', 'date');
  inputStartDate.classList.add('input-date');
  inputStartDate.setAttribute('id', 'start-date');
  inputStartDate.setAttribute('required', '');

  const inputEndDate = document.createElement('input');
  inputEndDate.setAttribute('type', 'date');
  inputStartDate.setAttribute('id', 'end-date');
  inputEndDate.classList.add('input-date');
  inputEndDate.setAttribute('required', '');

  const labelStartDate = document.createElement('label');
  labelStartDate.setAttribute('for', 'start-date');
  labelStartDate.textContent = 'Start Date';

  const labelEndDate = document.createElement('label');
  labelEndDate.setAttribute('for', 'end-date');
  labelEndDate.textContent = 'End Date';

  const reserveButton = document.createElement('button');
  reserveButton.setAttribute('type', 'submit');
  reserveButton.classList.add('comment-button');
  reserveButton.innerText = 'Reserve';

  inputContainer.appendChild(inputName);
  inputContainer.appendChild(labelStartDate);
  inputContainer.appendChild(inputStartDate);
  inputContainer.appendChild(labelEndDate);
  inputContainer.appendChild(inputEndDate);
  inputContainer.appendChild(reserveButton);

  inputContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    addReservation(
      id,
      inputName.value,
      inputStartDate.value,
      inputEndDate.value
    );
    inputName.value = '';
    inputStartDate.value = '';
    inputEndDate.value = '';
  });
  reservationsCounter();
};

export default reservationsPopup;
