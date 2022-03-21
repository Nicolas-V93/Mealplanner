class StatsView {
  #parentElement = document.querySelector('#person-data');

  displayStats(data) {
    this.#clear();
    const markup = this.#generateMarkup(data);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup(data) {
    return `
    <div>
        <h3>Basal Metabolic Rate (BMR)</h3>
        <p>${data.bmr}</p>
    </div>
    <div>
        <h3>Total Daily Energy Expenditure (TDEE)</h3>
        <p>${data.tdee}</p>
    </div>
    <div>
        <h3>Daily calories based on goal</h3>
        <p>${data.goalTDEE}</p>
    </div>
    <div>
        <h3>Macros</h3>
        <p>Carbs: ${data.macros.carbs} grams</p>
        <p>Protein: ${data.macros.proteins} grams</p>
        <p>Fat: ${data.macros.fats} grams</p>
    </div>
`;
  }
}

export default new StatsView();
