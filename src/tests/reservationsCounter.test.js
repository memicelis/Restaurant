import reservationsCounter from '../modules/reservationsCounter.js';

describe('Testing reservations counter on reservations popup', () => {
  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = `
        <p class="title-reservations"></p>
      `;
  });

  it('Updates reservations count when there are reservations', () => {
    const title = document.querySelector('.title-reservations');

    const reserve1 = document.createElement('li');
    reserve1.className = 'reserve-list-item';

    const reserve2 = document.createElement('li');
    reserve2.className = 'reserve-list-item';

    // Append the div elements to document.body
    document.body.appendChild(reserve1);
    document.body.appendChild(reserve2);

    // Call your function
    reservationsCounter();
    // Assertions

    expect(title.innerHTML).toBe('Reservations(2)');
  });

  it('Updates reservations count when there are no reservations', () => {
    // Create a div element with an ID matching your HTML structure
    const title = document.querySelector('.title-reservations');

    reservationsCounter();

    // Assertions
    expect(title.innerHTML).toBe('Reservations(0)');
  });
});
