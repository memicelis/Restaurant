const mealsCounter = () => {
  const mealsLink = document.getElementById('meals-count');
  const meals = document.querySelectorAll('.meal-card');
  const numberOfElements = meals.length;
  mealsLink.innerHTML = `Meals(${numberOfElements})`;
};

export default mealsCounter;
