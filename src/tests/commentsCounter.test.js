import commentsCounter from '../modules/commentsCounter.js';

describe('Testing comments counter on comments popup', () => {
  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = `
        <p class="title-comments"></p>
      `;
  });

  it('Updates comments count when there are .comment-list-item elements', () => {
    const title = document.querySelector('.title-comments');

    const comment1 = document.createElement('li');
    comment1.className = 'comments-list-item';

    const comment2 = document.createElement('li');
    comment2.className = 'comments-list-item';

    // Append the div elements to document.body
    document.body.appendChild(comment1);
    document.body.appendChild(comment2);

    // Call your function
    commentsCounter();
    // Assertions

    expect(title.innerHTML).toBe('Comments(2)');
  });

  it('Updates meals count when there are no .comment-list-item elements', () => {
    // Create a div element with an ID matching your HTML structure
    const title = document.querySelector('.title-comments');

    commentsCounter();

    // Assertions
    expect(title.innerHTML).toBe('Comments(0)');
  });
});
