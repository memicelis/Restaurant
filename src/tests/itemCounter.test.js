import mealsCounter from '../../src/modules/itemCounter.js';

describe('Testing item counter', () => {
  beforeEach(() => {
    // Setup the document body before each test
    document.body.innerHTML = `
      <div id="meals-count">Meals</div>
    `;
  });

  it('Updates meals counter when there are meals cards on meals page', () => {
    //Arrange elements
    const mealsLink = document.getElementById('meals-count');
    const mealCard1 = document.createElement('div');
    mealCard1.className = 'meal-card';
    const mealCard2 = document.createElement('div');
    mealCard2.className = 'meal-card';

    document.body.appendChild(mealCard1);
    document.body.appendChild(mealCard2);

    // Act
    mealsCounter();
    // Assertions
    expect(mealsLink.innerHTML).toBe('Meals(2)');
  });

  it('Updates meals counter when there are no meals on meals page', () => {
    // Arrange
    const mealsLink = document.getElementById('meals-count');
    // Act
    mealsCounter();
    // Assertions
    expect(mealsLink.innerHTML).toBe('Meals(0)');
  });
});
