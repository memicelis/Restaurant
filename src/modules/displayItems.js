const itemsContainer = document.getElementById('main-section');

const displayMeals = async () => {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=l'
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    data.meals.forEach((item) => {
      const mealCard = document.createElement('div');
      mealCard.classList.add('meal-card');

      const image = document.createElement('img');
      image.classList.add('image');
      image.src = item.strMealThumb;
      image.alt = item.strMeal;
      mealCard.appendChild(image);

      const title = document.createElement('p');
      title.textContent = item.strMeal;
      mealCard.appendChild(title);

      const commentButton = document.createElement('button');
      commentButton.textContent = 'Comments';
      commentButton.classList.add('btn');
      mealCard.appendChild(commentButton);

      const reservationsButton = document.createElement('button');
      reservationsButton.textContent = 'Reservations';
      reservationsButton.classList.add('btn');
      mealCard.appendChild(reservationsButton);

      itemsContainer.appendChild(mealCard);
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default displayMeals;
