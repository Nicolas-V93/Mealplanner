class DietView {
  #btns = document.querySelectorAll('.diet button');
  #selectAmountOfMeals = document.querySelector('#num-meals');
  #selectedDiet;
  #btnGenerate = document.querySelector('#diet-generate');

  constructor() {
    this.#addHandlerSelectTypeOfDiet();
  }

  addHandlerSelectMealplanData(handler) {
    this.#btnGenerate.addEventListener('click', () => {
      const dietData = {
        amountOfMeals: +this.#selectAmountOfMeals.value,
        diet: this.#selectedDiet,
      };
      handler(dietData);
    });
  }

  showDiets() {
    document.querySelector('.diet-container').classList.remove('hidden');
  }

  toggleError(error) {
    console.log(error);
    const errorEl = document.querySelector('#diet-error');
    errorEl.innerText = error || '';
  }

  #addHandlerSelectTypeOfDiet() {
    this.#btns.forEach(b => {
      b.addEventListener('click', e => {
        this.#selectedDiet = this.#getCurrentSelectedDiet(e);
        this.#toggleBackgroundColor(this.#selectedDiet);
      });
    });
  }

  #getCurrentSelectedDiet(e) {
    const diet = e.target.closest('.diet > div');
    return diet.dataset.diet;
  }

  #toggleBackgroundColor(diet) {
    const selectedDiet = document.querySelector('.diet--selected');

    if (selectedDiet) {
      selectedDiet.classList.remove('diet--selected');
    }

    const container = document.querySelector(`[data-diet="${diet}"]`);
    container.classList.add('diet--selected');
  }
}

export default new DietView();
