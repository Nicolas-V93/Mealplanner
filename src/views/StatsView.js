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
        <p>${data.BMR}</p>
    </div>
    <div>
        <h3>Total Daily Energy Expenditure (TDEE)</h3>
        <p>${data.TDEE}</p>
    </div>
    <div>
        <h3>Daily calories based on goal</h3>
        <p>${data.goalTDEE}</p>
    </div>
    <div>
        <h3>Macros</h3>
        <p></p>
    </div>
`;
  }
}

export default new StatsView();
