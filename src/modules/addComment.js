import { commentsDB } from './api.js';
import commentsCounter from './commentsCounter.js';

const addComment = async (id, user, text) => {
  fetch(commentsDB, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: user,
      comment: text,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const responseComments = await fetch(`${commentsDB}item_id=${id}`);

  const dataComments = await responseComments.json();
  let comments = document.querySelector('.comments-list');
  comments.innerHTML = '';
  dataComments.forEach((item) => {
    const commentsItem = document.createElement('li');
    commentsItem.classList.add('comments-list-item');
    commentsItem.innerHTML = `${item.creation_date} ${item.username}: ${item.comment}`;
    comments.appendChild(commentsItem);
  });
  commentsCounter();
};
export default addComment;
