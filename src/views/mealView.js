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

  #generateMarkup(meal) {
    return `<div class="meal flex-container" data-id=${meal.id}>
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
              <div class="meal__calories">${meal.nutrients[0].amount} Calories</div>
            </div>
          </div>`;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new MealView();
