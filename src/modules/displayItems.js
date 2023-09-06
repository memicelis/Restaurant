import mealsDB from './api.js';
import commentsPopup from './comments.js';

const itemsContainer = document.getElementById('main-section');

const displayMeals = async () => {
  const response = await fetch(mealsDB);

  const data = await response.json();
  data.meals.forEach((item) => {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = item.strMealThumb;
    image.alt = item.strMeal;
    mealCard.appendChild(image);

    const title = document.createElement('p');
    title.textContent = item.strMeal;
    mealCard.appendChild(title);

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comments';
    commentButton.classList.add('btn');
    mealCard.appendChild(commentButton);
    commentButton.addEventListener('click', () => {
      commentsPopup(item.idMeal);
    });

    const reservationsButton = document.createElement('button');
    reservationsButton.textContent = 'Reservations';
    reservationsButton.classList.add('btn');
    mealCard.appendChild(reservationsButton);

    itemsContainer.appendChild(mealCard);
  });
};

export default displayMeals;
