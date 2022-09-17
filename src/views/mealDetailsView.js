import { MAX_SERVING } from '../config';
import Fraction from 'fraction.js';
import Modal from './modal.js';

class MealDetailsView extends Modal {
  #parentElement = document.querySelector('#meal-details');
  #currentMeal;
  #unitType = 'metric';

  showMealDetails(selectedMeal) {
    this.#clear();
    this.#currentMeal = selectedMeal;
    const markup = this.#generateMarkup(selectedMeal, this.#unitType);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);

    const modal = new Modal(this.#parentElement);
    modal.addHandlerCloseModal();

    if (!this.#parentElement.hasAttribute('open')) {
      modal.openModal();
    }
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
      '.details__ingredients'
    );
    ingredientsContainer.innerHTML = '';

    const markup = this.#currentMeal.extendedIngredients
      .map(ing => this.#generateMarkupIngredient(ing, this.#unitType))
      .join('');

    ingredientsContainer.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup(meal, unit = 'metric') {
    return `
        <div class="form__close"><button class="close-modal btn btn--orange" type="button">X</button></div>
        <div class="details__main">
          <p class="details__title | text-center">
            ${meal.title}
          </p>
          <div>
            <img
              class="details__image"
              src=${meal.image}
              alt=${meal.title}
            />
          </div>

          <div class="details__servings">
            <i class="details__icon fa-solid fa-utensils"></i>
            <p>${meal.servings} servings</p>
              <div>
                <i class="details__icon btn btn--update-servings fa fa-minus-circle"
                  aria-hidden="true"
                  data-update=${meal.servings - 1}></i>
              
                <i class="details__icon btn btn--update-servings fa fa-plus-circle" 
                  aria-hidden="true"
                  data-update=${meal.servings + 1}>
                </i>
              </div>
          </div>

          <div class="details__cooktime">
            <i class="details__icon fa-solid fa-clock"></i>
            <p>${meal.readyInMinutes} minutes</p>
          </div>
        </div>

        <hr class="style-one" />

        <div class="details__nutrients">
            <div class="details__nutrients-item">
              <p>Calories</p>
              <p>${Math.round(
                meal.nutrients.find(n => n.name === 'Calories').perServing
              )} calories</p>
            </div>
            <div class="details__nutrients-item">
              <p>Carbs</p>
              <p>${Math.round(
                meal.nutrients.find(n => n.name === 'Carbohydrates').perServing
              )} grams</p>
            </div>
            <div class="details__nutrients-item">
              <p>Protein</p>
              <p>${Math.round(
                meal.nutrients.find(n => n.name === 'Protein').perServing
              )} grams</p>
            </div>
            <div class="details__nutrients-item">
              <p>Fat</p>
              <p>${Math.round(
                meal.nutrients.find(n => n.name === 'Fat').perServing
              )} grams</p>
            </div>
          </div>

        <div class="details__secondary | flow">
          <div class="details__switch-button">
            <input
              class="details__switch-button-checkbox"
              type="checkbox"
              data-unit=${unit} ${unit === 'us' ? 'checked' : ''}
            />
            <label class="details__switch-button-label" for="">
              <span class="details__switch-button-label-span">Metric</span>
            </label>
          </div>

          <div class="details__ingredients">
            ${meal.extendedIngredients
              .map(ing => this.#generateMarkupIngredient(ing, unit))
              .join('')}
          </div>

          <div class="details__instructions">
            ${meal.instructions}
          </div>
        </div>`;
  }

  #generateMarkupIngredient(ing, type = 'metric') {
    return `<div class="details__ingredient">
              <p>${ing.name}</p>
              <p>
              ${this.#optimizeIngredient(ing, type)} ${
      ing.measures[type].unitShort
    }
              </p>
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

export default new MealDetailsView();
