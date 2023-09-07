import { mealsDB, likesDB } from './api.js';
import commentsPopup from './comments.js';
import reservationsPopup from './reservations.js';

const itemsContainer = document.getElementById('main-section');

const displayMeals = async () => {
  const response = await fetch(mealsDB);
  const data = await response.json();

  const responseLikes = await fetch(likesDB);
  const dataLikes = await responseLikes.json();
  const likesMap = {};
  dataLikes.forEach((like) => {
    likesMap[like.item_id] = like.likes;
  });
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

    const likesCounter = document.createElement('p');
    likesCounter.classList.add('num-likes');
    likesCounter.innerText = `Number of likes: ${likesMap[item.idMeal]}` || 0;
    mealCard.appendChild(likesCounter);

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
    reservationsButton.addEventListener('click', () => {
      reservationsPopup(item.idMeal);
    });

    itemsContainer.appendChild(mealCard);
  });
};
export default displayMeals;
