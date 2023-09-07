const commentsCounter = async () => {
  const comments = document.querySelectorAll('.comments-list-item');
  const title = document.querySelector('.title-comments');

  const numberOfElements = comments.length;
  title.innerHTML = `Comments(${numberOfElements})`;
};

export default commentsCounter;
