import { Spinner } from 'spin.js';

class DietView {
  #btns = document.querySelectorAll('.diet button');
  #selectAmountOfMeals = document.querySelector('#num-meals');
  #selectedDiet;
  #btnGenerate = document.querySelector('#diet-generate');
  #spinner;

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

  showSpinner() {
    const opts = {
      lines: 13, // The number of lines to draw
      length: 38, // The length of each line
      width: 17, // The line thickness
      radius: 45, // The radius of the inner circle
      scale: 0.1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      speed: 1, // Rounds per second
      rotate: 0, // The rotation offset
      animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#312f2e', // CSS color or array of colors
      fadeColor: 'transparent', // CSS color or array of colors
      top: '50%', // Top position relative to parent
      left: '92%', // Left position relative to parent
      shadow: '0 0 1px transparent', // Box-shadow for the lines
      zIndex: 2000000000, // The z-index (defaults to 2e9)
      className: 'spinner', // The CSS class to assign to the spinner
      position: 'absolute', // Element positioning
    };

    const textEl = document.querySelector('.cta-text');
    textEl.style.display = 'inline-block';
    textEl.style.transform = 'translateX(-15px)';
    textEl.style.transition = 'all 0.4s';

    const target = document.querySelector('.cta-spinner');
    this.#spinner = new Spinner(opts).spin(target);

    this.#disableButton();
  }

  hideSpinner() {
    this.#spinner.stop();
    const textEl = document.querySelector('.cta-text');
    textEl.style.transform = 'translateX(0px)';
    this.#enableButton();
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

  #disableButton() {
    this.#btnGenerate.style.pointerEvents = 'none';
    this.#btnGenerate.style.opacity = 0.7;
  }

  #enableButton() {
    this.#btnGenerate.style.pointerEvents = 'all';
    this.#btnGenerate.style.opacity = 1;
  }
}

export default new DietView();
