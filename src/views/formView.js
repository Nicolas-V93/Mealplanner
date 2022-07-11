class FormView {
  #modal = document.querySelector('.modal');
  #form = document.querySelector('#form-data');
  #btnCreate = document.querySelector('#create-mealplan');

  constructor() {
    this.#addHandlerShowForm();
  }

  addHandlerProcessInfo(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const formData = Object.fromEntries(dataArr);
      handler(formData, this.dataset.unit);
    });
  }

  #clear() {
    this.#form.innerHTML = '';
  }

  #toggleUnit() {
    if (this.#form.dataset.unit !== 'imperial') {
      this.#form.dataset.unit = 'imperial';
    } else {
      this.#form.dataset.unit = 'metric';
    }
  }

  #addHandlerShowForm() {
    this.#btnCreate.addEventListener('click', e => {
      this.#renderForm();
      this.#modal.showModal();
    });
  }

  #addHandlerHideModal() {
    document
      .querySelector('.close-modal')
      .addEventListener('click', () => this.#modal.close());
    document
      .querySelector('.btn--submit')
      .addEventListener('click', () => this.#modal.close());
  }

  #addHandlerUnit() {
    document
      .querySelector('.switch-button-checkbox')
      .addEventListener('click', () => {
        this.#toggleUnit();
        this.#renderForm();
      });
  }

  #renderForm() {
    this.#clear();

    const unit = this.#form.dataset.unit ?? 'metric';
    this.#form.dataset.unit = unit;
    const markup = this.#generateMarkup(unit);
    this.#form.insertAdjacentHTML('afterbegin', markup);

    this.#addHandlerUnit();
    this.#addHandlerHideModal();
  }

  #generateMarkup(unit) {
    return `
  <section class="form">
      <div class="form__description center-text">
        Fill in the form to calculate data
      </div>

      <div class="form__units flex-container flex-center">
        <div class="switch-button">
          <input class="switch-button-checkbox" type="checkbox" ${
            unit === 'imperial' ? 'checked' : ''
          }/>
          <label class="switch-button-label" for="">
            <span class="switch-button-label-span">Metric</span>
          </label>
        </div>
      </div>

      <div class="grid grid-col-2">
        <div class="form__age">
          <label class="form__label" for="age">Age</label>
          <input
            class="form__field"
            
            type="number"
            min="0"
            id="age"
            name="age"
            placeholder="Enter your current age"
          />
        </div>

        <div class="form__height">
          <label class="form__label" for="height">Height</label>
        <div class="form__height-container">
          <input
            class="form__field"         
            type="number"
            id="height"
            name="height"
            placeholder="${unit === 'metric' ? 'Height in cm' : 'Feet'}"
          />
          ${
            unit === 'imperial'
              ? '<input class="form__field"  type="text" id="height-inch" name="heightInch" placeholder="Inch" />'
              : ''
          }
          </div>
        </div>
        <div class="form__weight">
          <label class="form__label" for="weight">Weight</label>
          <input
            class="form__field"           
            type="number"
            min="0"
            id="weight"
            name="weight"
            placeholder="Weight in ${unit === 'metric' ? 'kg' : 'pounds'}"
          />
        </div>

        <div class="form__gender">
          <label class="form__label" for="weight">Gender</label>
          <div class="form__flex form__field">
            <div class="form__flex">
              <label for="male">Male</label>
              <input type="radio" id="male" name="sex" value="male" checked />
            </div>
            <div class="form__flex">
              <label for="female">Female</label>
              <input type="radio" id="female" name="sex" value="female" />
            </div>
          </div>
        </div>

        <div class="form__activity">
          <label class="form__label" for="activity"
            >Select activity level</label
          >
          <select class="form__field" name="activity" id="activity">
            <option value="1">Little to no exercise</option>
            <option value="2">Light exercise 1-3 times per week</option>
            <option value="3">Moderate exercise 3-5 times per week</option>
            <option value="4">Heavy exercise 5-6 times per week</option>
            <option value="5">Strenuous exercise 7 times per week</option>
          </select>
        </div>

        <div class="form__goal">
          <label class="form__label" for="goal">Select your goal</label>
          <select class="form__field" name="goal" id="goal">
            <option value="0">Gain muscle and lose fat</option>
            <option value="-5">Lose fat (5% calorie reduction)</option>
            <option value="-10">Lose fat (10% calorie reduction)</option>
            <option value="-15">Lose fat (15% calorie reduction)</option>
            <option value="-20">Lose fat (20% calorie reduction)</option>
          </select>
        </div>
      </div>

      <div class="flex-container flex-center">
        <button class="btn btn--large btn--full btn--submit">
          Calculate
        </button>
      </div>
    </section>
  `;
  }
}

export default new FormView();
