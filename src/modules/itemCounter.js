const mealsLink = document.getElementById('meals-count');
const mealsCounter = () => {
  const meals = document.querySelectorAll('.meal-card');
  const numberOfElements = meals.length;
  mealsLink.innerHTML = `Meals(${numberOfElements})`;
};

export default mealsCounter;
