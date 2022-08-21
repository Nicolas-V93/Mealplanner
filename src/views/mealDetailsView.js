import { MAX_SERVING } from '../config';
import Fraction from 'fraction.js';

class mealDetailsView {
  #parentElement = document.querySelector('#meal-details');
  #currentMeal;
  #unitType = 'metric';

  showMealDetails(selectedMeal) {
    this.#clear();
    this.#currentMeal = selectedMeal;
    const markup = this.#generateMarkup(selectedMeal, this.#unitType);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerUpdateServings(handler) {
    this.#parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { update } = btn.dataset;

      if (update > 0 && update <= MAX_SERVING)
        handler(this.#currentMeal, +update);
    });
  }

  addHandlerToggleUnit() {
    this.#parentElement.addEventListener('click', e => {
      const slider = e.target.closest('.details__switch-button-checkbox');
      if (!slider) return;

      this.#toggleIngredients(e);
    });
  }

  #toggleIngredients(e) {
    const currentType = e.target.dataset.unit === 'metric' ? 'us' : 'metric';
    e.target.dataset.unit = currentType;

    if (currentType === 'metric') e.target.removeAttribute('checked');
    else e.target.setAttribute('checked', 'checked');

    this.#unitType = currentType;

    const ingredientsContainer = document.querySelector(
      '.details__ingredients-all'
    );
    ingredientsContainer.innerHTML = '';

    const markup = this.#currentMeal.extendedIngredients
      .map(ing => this.#generateMarkupIngredient(ing, this.#unitType))
      .join('');

    ingredientsContainer.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup(meal, unit = 'metric') {
    return `<div class="details__image-container">
              <img
                class="details__img"
                src=${meal.image}
                alt="${meal.title}"
              />
            </div>
  
            <div class="details__info">
              <div class="details__info__item">
                <i class="details__icon fa-solid fa-clock"></i>
                <p>${meal.readyInMinutes} minutes</p>
              </div>
              <div class="details__info__item">
                <i class="details__icon fa-solid fa-utensils"></i>
                <p>${meal.servings} servings</p>
                <button class="btn btn--update-servings" data-update=${
                  meal.servings - 1
                }><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                <button class="btn btn--update-servings" data-update=${
                  meal.servings + 1
                }><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
              </div>
            </div>
  
            <div class="details__switch-button">
                <input class="details__switch-button-checkbox" type="checkbox" data-unit=${unit} ${
      unit === 'us' ? 'checked' : ''
    }/>
                <label class="details__switch-button-label" for="">
                <span class="details__switch-button-label-span">Metric</span>
                </label>
            </div>

            <div class="details__ingredients-all">
              ${meal.extendedIngredients
                .map(ing => this.#generateMarkupIngredient(ing, unit))
                .join('')}
            </div>
  
            <div class="details__nutrients">
              <div class="details__nutrients__item">
                <div class="details__nutrients__name">Calories</div>
                <div class="details__nutrients__values">${
                  meal.nutrients.find(n => n.name === 'Calories').amount
                }</div>
              </div>
              <div class="details__nutrients__item">
                <div class="details__nutrients__name">Carbs</div>
                <div class="details__nutrients__values">${
                  meal.nutrients.find(n => n.name === 'Carbohydrates').amount
                }</div>
              </div>
              <div class="details__nutrients__item">
                <div class="details__nutrients__name">Protein</div>
                <div class="details__nutrients__values">${
                  meal.nutrients.find(n => n.name === 'Protein').amount
                }</div>
              </div>
              <div class="details__nutrients__item">
                <div class="details__nutrients__name">Fat</div>
                <div class="details__nutrients__values">${
                  meal.nutrients.find(n => n.name === 'Fat').amount
                }</div>
              </div>
            </div>
  
            <div class="details__instructions">
              ${meal.instructions}
            </div>`;
  }

  #generateMarkupIngredient(ing, type = 'metric') {
    return `<div class="details__ingredient">
              <div class="details__ingredient__description">${ing.name}</div>
              <div class="details__ingredient__unit">
              ${this.#optimizeIngredient(ing, type)} ${
      ing.measures[type].unitShort
    }
              </div>
            </div>`;
  }

  #optimizeIngredient(ing, type) {
    if (
      ['tsps', 'tsp', 'Tbsps', 'Tbsp'].some(
        unit => unit === ing.measures[type].unitShort
      )
    ) {
      return new Fraction(ing.measures[type].amount).toFraction(true);
    }

    return Math.round(ing.measures[type].amount);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

{
  /* <ol>
  <li class="details__instructions__item">
    In a large pan with lid heat olive oil over medium high heat. Add onions and
    cook for 1 minute. Add garlic and cook until onions are translucent and
    garlic is fragrant.
  </li>
  <li class="details__instructions__item">
    Add quinoa to pan, stir to combine. Slowly add in broth and bring to a boil.
  </li>
  <li class="details__instructions__item">
    Cover and reduce heat to low, cook for 15 minutes.
  </li>
  <li class="details__instructions__item">
    In the last 2-3 minutes of cooking add in broccolini on top of the quinoa
    (do not stir) and cover.
  </li>
  <li class="details__instructions__item">
    Uncover and toss broccolini and quinoa together.
  </li>
  <li class="details__instructions__item">
    Season to taste with salt and pepper.
  </li>
  <li class="details__instructions__item">Add walnuts and serve hot.</li>
</ol>; */
  // <div class="details__ingredient">
  //   <div class="details__ingredient__image-container">
  //     <img
  //       class="details__img"
  //       src="https://spoonacular.com/cdn/ingredients_100x100/bell-pepper-orange.png"
  //       alt="apple"
  //     />
  //   </div>
  //   <div class="details__ingredient__description">fresh green beans</div>
  //   <div class="details__ingredient__unit">2 pounds</div>
  // </div>;
  // ${meal.extendedIngredients.forEach(ing => {
  //               `<div class="details__ingredient">
  //                 <div class="details__ingredient__image-container">
  //                   <img
  //                     class="details__img"
  //                     src="https://spoonacular.com/cdn/ingredients_100x100/bell-pepper-orange.png"
  //                     alt="${ing.name}"
  //                   />
  //                 </div>
  //                 <div class="details__ingredient__description">${ing.name}</div>
  //               <div class="details__ingredient__unit">${ing.measures.metric.amount}</div>
  //             </div>`;
  //             })}
}

export default new mealDetailsView();
