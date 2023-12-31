import { mealsDB, commentsDB } from './api.js';
import '../popup.css';
import commentsCounter from './commentsCounter.js';
import addComment from './addComment.js';

const commentsPopup = async (id) => {
  const response = await fetch(mealsDB);
  const data = await response.json();
  const selectedMeal = data.meals.find((item) => item.idMeal === id);

  const responseComments = await fetch(
    `${commentsDB}item_id=${selectedMeal.idMeal}`
  );

  const dataComments = await responseComments.json();

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

  const titleComments = document.createElement('h2');
  titleComments.classList.add('title-comments');
  titleComments.innerText = 'Comments';

  window.appendChild(titleComments);

  const comments = document.createElement('ul');
  comments.classList.add('comments-list');

  if (dataComments && dataComments.length > 0) {
    dataComments.forEach((item) => {
      const commentsItem = document.createElement('li');
      commentsItem.classList.add('comments-list-item');
      commentsItem.innerHTML = `${item.creation_date} ${item.username}: ${item.comment}`;
      comments.appendChild(commentsItem);
    });
  }
  window.appendChild(comments);
  const inputContainer = document.createElement('form');
  inputContainer.classList.add('input-container');
  inputContainer.innerHTML = '<h3>Add a comment</h3>';
  window.appendChild(inputContainer);

  const inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.classList.add('input');
  inputName.setAttribute('placeholder', 'Your name');
  inputName.setAttribute('required', '');

  const inputComment = document.createElement('input');
  inputComment.setAttribute('type', 'text');
  inputComment.classList.add('input');
  inputComment.setAttribute('placeholder', 'Your insights');
  inputComment.setAttribute('required', '');

  const commentButton = document.createElement('button');
  commentButton.setAttribute('type', 'submit');
  commentButton.classList.add('comment-button');
  commentButton.innerText = 'Comment';

  inputContainer.appendChild(inputName);
  inputContainer.appendChild(inputComment);
  inputContainer.appendChild(commentButton);

  inputContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    addComment(id, inputName.value, inputComment.value);
    inputName.value = '';
    inputComment.value = '';
  });
  commentsCounter();
};

export default commentsPopup;
