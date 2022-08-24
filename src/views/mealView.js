class MealView {
  #parentElement = document.querySelector('#meals-container');

  #createMealContainer(meal) {
    const markup = this.#generateMarkup(meal);
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  showMeals(meals) {
    this.#clear();
    meals.forEach(meal => this.#createMealContainer(meal));
  }

  addHandlerShowMealDetails(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const meal = e.target.closest('.meal');

      if (!meal) return;
      handler(meal.dataset.id);
    });
  }

  addHandlerRefreshRecipe(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const icon = e.target.closest('.meal__icon');
      const meal = e.target.closest('.meal');

      if (!icon) return;
      e.stopImmediatePropagation();
      handler(meal.dataset.id, meal.dataset.type);
    });
  }

  #generateMarkup(meal) {
    return `<div class="meal" data-id=${meal.id} data-type=${meal.dishType}>
            <h2>${meal.dishType[0].toUpperCase() + meal.dishType.slice(1)}</h2>
              <div class="flex-container">
                <div class="meal__image-container">
                  <img
                  class="meal__image"
                  src="${meal.image}"
                  alt="${meal.title}"
                  />
                </div>
                <div class="meal__heading">
                  <h2 class="meal__title">
                    ${meal.title} 
                  </h2>
                  <div class="meal__calories">${
                    meal.nutrients[0].amount
                  } Calories</div>
                  <i class="meal__icon fa fa-refresh fa-lg" aria-hidden="true"></i>
                </div>
              </div>
            </div>`;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new MealView();
