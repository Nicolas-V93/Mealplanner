class mealDetailsView {
  #parentElement = document.querySelector('#meal-details');

  showMealDetails(selectedMeal) {
    this.#clear();
    const markup = this.#generateMarkup(selectedMeal);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup(meal) {
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
              </div>
            </div>
  
            <div class="details__ingredients-all">
              ${meal.extendedIngredients
                .map(ing => this.#generateMarkupIngredient(ing))
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

  #generateMarkupIngredient(ing) {
    return `<div class="details__ingredient">
              <div class="details__ingredient__image-container">
                    <img
                      class="details__img"
                      src="https://spoonacular.com/cdn/ingredients_250x250/${ing.image}"
                      alt="${ing.name}"
                    />
              </div>
              <div class="details__ingredient__description">${ing.name}</div>
              <div class="details__ingredient__unit">${ing.measures.metric.amount}</div>
            </div>`;
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
