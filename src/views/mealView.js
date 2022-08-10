class MealView {
  #parentElement = document.querySelector('#meals-container');
  id;

  constructor() {
    this.id = 0;
  }

  #createMealContainer(meal) {
    const markup = this.#generateMarkup(meal);
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  showMeals(meals) {
    this.#clear();
    meals.forEach(meal => this.#createMealContainer(meal));
  }

  addHandlerShowMealDetails(handler) {
    const all = document.querySelectorAll('#meals-container > div');
    all.forEach(el =>
      el.addEventListener('click', function () {
        handler(this.dataset.id);
      })
    );
  }

  getMealId() {
    console.log(this.dataset.id);
    return this.dataset.id;
    // console.log(this.dataset.id);
    // const id = this.dataset.id;
    // const id = e.target.closest('.meal').dataset.id;
    // this.id = id;
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
