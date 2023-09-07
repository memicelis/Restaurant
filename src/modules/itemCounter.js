import { mealsDB } from './api.js';

const mealsLink = document.getElementById('meals-count');
const mealsCounter = async () => {
  const response = await fetch(mealsDB);
  const data = await response.json();
  mealsLink.innerHTML = `Meals(${data.meals.length})`;
};

export default mealsCounter;
