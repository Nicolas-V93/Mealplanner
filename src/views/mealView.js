class MealView {
  #parentElement = document.querySelector('#meals-container');

  #createMealContainer(meal) {
    const markup = this.#generateMarkup(meal);
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  showMeals(meals) {
    this.#clear();
    document.querySelector('.section-meals').classList.remove('hidden');
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
            <p class="meal__category">${
              meal.dishType[0].toUpperCase() + meal.dishType.slice(1)
            }</p>
            <div class="meal__image-container">
              <img
                class="meal__image"
                src="${meal.image}"
                alt="${meal.title}"
              />
            </div>
            <div class="meal__content">
              <div class="meal__heading">
                <p>${meal.title} </p>
                <i
                  class="meal__icon fa fa-refresh fa-lg"
                  aria-hidden="true"
                ></i>
              </div>
              <div class="meal_data">
                <p class="tag">${Math.round(
                  meal.nutrients.find(n => n.name === 'Calories').total.amount
                )} Calories                 
                </p>
                <p class="meal__serving">(${Math.round(
                  meal.nutrients.find(n => n.name === 'Calories').perServing
                )} kcal/serving)</p>
                <p>${
                  meal.nutrients.find(n => n.name === 'Calories').total.servings
                } servings</p>
              </div>
            </div>
          </div>`;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new MealView();
