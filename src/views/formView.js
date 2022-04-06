class FormView {
  #modal = document.querySelector('.modal');
  #form = document.querySelector('#form-data');
  #btnCreate = document.querySelector('#create-mealplan');

  constructor() {
    this.#addHandlerShowForm();
  }

  #clear() {
    this.#form.innerHTML = '';
  }

  addHandlerProcessInfo(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const formData = Object.fromEntries(dataArr);
      handler(formData, this.dataset.unit);
    });
  }

  #addHandlerShowForm() {
    this.#btnCreate.addEventListener('click', e => {
      this.#renderForm(e);
      this.#modal.showModal();
    });
  }

  #addHandlerHideModal() {
    document
      .querySelector('.close-modal')
      .addEventListener('click', () => this.#modal.close());
    document
      .querySelector('.btn-submit')
      .addEventListener('click', () => this.#modal.close());
  }

  #addHandlerUnit() {
    document
      .querySelector('.btn-metric')
      .addEventListener('click', this.#renderForm.bind(this));
    document
      .querySelector('.btn-imperial')
      .addEventListener('click', this.#renderForm.bind(this));
  }

  #renderForm(e) {
    this.#clear();
    const unit = e.target.dataset.unit ?? 'metric';

    this.#form.dataset.unit = unit;
    const markup = this.#generateMarkup(unit);
    this.#form.insertAdjacentHTML('afterbegin', markup);

    this.#addHandlerUnit();
    this.#addHandlerHideModal();
    // document.querySelector('[data-unit="metric"]');
  }

  #generateMarkup(unit) {
    return `
    <div>
      <button data-unit="imperial" class="btn-imperial" type="button">
        Imperial
      </button>
      <button data-unit="metric" class="btn-metric" type="button">
        Metric
      </button>
      <button type="button" class="close-modal">X</button>
    </div>
    <div>
      <label for="age">Age</label>
      <input required type="text" id="age" name="age" />
    </div>
    <div class="unit-container">
      <div>
        <label for="height">Height</label>
        <input
            required
            type="text"
            id="height"
            name="height"
            placeholder="${unit === 'metric' ? 'height in cm' : 'Feet'}"
        />
      </div>
        ${
          unit === 'imperial'
            ? '<input required type="text" id="height-inch" name="heightInch" placeholder="Inch"'
            : ''
        }
       <div>
          <label for="weight">Weight</label>
          <input
            required
            type="text"
            id="weight"
            name="weight"
            placeholder="weight in ${unit === 'metric' ? 'kg' : 'pounds'}"
          />
       </div>
      </div>

      <div>
        <label for="male">Male</label>
        <input type="radio" id="male" name="sex" value="male" checked />

        <label for="female">Female</label>
        <input type="radio" id="female" name="sex" value="female" />
      </div>

      <div>
        <label for="activity">Select activity level</label>
        <select name="activity" id="activity">
          <option value="1">Little to no exercise</option>
          <option value="2">Light exercise 1-3 times per week</option>
          <option value="3">Moderate exercise 3-5 times per week</option>
          <option value="4">Heavy exercise 5-6 times per week</option>
          <option value="5">Strenuous exercise 7 times per week</option>
        </select>
      </div>

      <div>
        <label for="goal">Select your goal</label>
        <select name="goal" id="goal">
          <option value="0">Gain muscle and lose fat</option>
          <option value="-5">Lose fat (5% calorie reduction)</option>
          <option value="-10">Lose fat (10% calorie reduction)</option>
          <option value="-15">Lose fat (15% calorie reduction)</option>
          <option value="-20">Lose fat (20% calorie reduction)</option>
        </select>
      </div>

      <button class="btn-submit" type="submit">Calculate</button>
    `;
  }
}

export default new FormView();
