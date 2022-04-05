class FormView {
  #form = document.querySelector('#person-info');
  #btnMetric = document.querySelector('[data-unit="metric"]');
  #btnImperial = document.querySelector('[data-unit="imperial"]');

  constructor() {
    this.#addHandlerShowForm();
    //this.#btnMetric.click(); // On page load show metric form by default
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
    this.#btnMetric.addEventListener('click', this.#renderForm.bind(this));
    this.#btnImperial.addEventListener('click', this.#renderForm.bind(this));
  }

  #renderForm(e) {
    const unit = e.target.dataset.unit;
    this.#clear();
    this.#form.dataset.unit = unit;
    const markup = this.#generateMarkup(unit);
    this.#form.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup(unit) {
    return `
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

      <button>Calculate</button>
    `;
  }
}

export default new FormView();
