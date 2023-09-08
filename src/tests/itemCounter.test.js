import mealsCounter from '../../src/modules/itemCounter.js';

describe('Testing item counter on homepage', () => {
  beforeEach(() => {
    // Clear the document body before each test
    document.body.innerHTML = `
      <div id="meals-count">Meals</div>
    `;
  });

  it('Updates meals count when there are .meal-card elements', () => {
    const mealsLink = document.getElementById('meals-count');

    const mealCard1 = document.createElement('div');
    mealCard1.className = 'meal-card';

    const mealCard2 = document.createElement('div');
    mealCard2.className = 'meal-card';

    // Append the div elements to document.body
    document.body.appendChild(mealCard1);
    document.body.appendChild(mealCard2);

    // Call your function
    mealsCounter();
    // Assertions

    expect(mealsLink.innerHTML).toBe('Meals(2)');
  });

  it('Updates meals count when there are no .meal-card elements', () => {
    // Create a div element with an ID matching your HTML structure
    const mealsLink = document.getElementById('meals-count');

    mealsCounter();

    // Assertions
    expect(mealsLink.innerHTML).toBe('Meals(0)');
  });
});
