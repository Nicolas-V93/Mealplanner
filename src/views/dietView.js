class DietView {
  #btns = document.querySelectorAll('.diet button');
  #selectAmountOfMeals = document.querySelector('#num-meals');

  // addHandlerSelectDiet(handler) {
  //   this.#btns.forEach(b =>
  //     b.addEventListener('click', e => {
  //       const diet = e.target.closest('.diet > div');
  //       this.#toggleBackgroundColor(diet);
  //       const dietData = {
  //         amountOfMeals: +this.#selectAmountOfMeals.value,
  //         diet: diet.dataset.diet,
  //       };
  //       handler(dietData);
  //     })
  //   );
  // }

  showDiets() {
    document.querySelector('.diet-container').classList.remove('hidden');
  }

  #toggleBackgroundColor(diet) {
    const selectedDiet = document.querySelector('.diet--selected');

    if (selectedDiet) selectedDiet.classList.remove('diet--selected');
    diet.classList.add('diet--selected');
  }
}

export default new DietView();
