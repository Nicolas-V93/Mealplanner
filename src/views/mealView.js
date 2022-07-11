class MealView {
  #parentElement = document.querySelector('#meals');

  displayMeal(meal) {
    const markup = this.#generateMarkup(meal);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup(meal) {
    return `<div class="card">
          <div class="card__image-container">
            <img
              class="card__image"
              src="${meal.image}"
              alt="${meal.title}"
            />
          </div>
          <div class="card__header">
            <h2>${meal.title}</h2>
            <p>Preptime: ${meal.readyInMinutes}</p>
            <p>Servings: ${meal.servings}</p>
            <p>Bookmark icon</p>
          </div>
          <div class="card__ingredients">...</div>
          <div class="card__data">Add nutrition data here</div>
        </div>
        `;
  }
}

export default new MealView();
