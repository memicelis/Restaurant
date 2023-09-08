import addLike from './addLike.js';
import { mealsDB, likesDB } from './api.js';
import commentsPopup from './comments.js';
import mealsCounter from './itemCounter.js';
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

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    mealCard.appendChild(titleContainer);

    const title = document.createElement('p');
    title.textContent = item.strMeal;
    titleContainer.appendChild(title);

    const likeButton = document.createElement('a');
    likeButton.classList.add('like-icon');
    likeButton.innerHTML = '💙';
    titleContainer.appendChild(likeButton);

    const likesCounter = document.createElement('p');
    likesCounter.classList.add('num-likes');
    likesCounter.innerText = `${likesMap[item.idMeal]} Likes` || '0 Likes';
    mealCard.appendChild(likesCounter);

    likeButton.addEventListener('click', () => {
      addLike(item.idMeal, likesCounter);
    });

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
  mealsCounter();
};
export default displayMeals;
