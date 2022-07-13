class MealView {
  #parentElement = document.querySelector('#meals-container');

  #displayMeal(meal) {
    const markup = this.#generateMarkup(meal);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  showMeals(meals) {
    this.#clear();
    meals.forEach(meal => this.#displayMeal(meal));
  }

  #generateMarkup(meal) {
    return `<div class="meal flex-container">
            <div class="meal__image-container">
              <img
                class="meal__image"
                src="${meal.image}"
                alt="${meal.title}"
              />
            </div>
            <div class="meal__heading">
              <h2 class="meal__title">
                ${meal.title} <span class="meal__calories">(${meal.nutrition.nutrients[0].amount} kcal)</span>
              </h2>
              <p>Preptime: ${meal.readyInMinutes} mins</p>
              <p>Servings: ${meal.servings}</p>
            </div>
            <div class="meal__ingredients"></div>
            <div class="meal__data"></div>
          </div>`;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new MealView();
