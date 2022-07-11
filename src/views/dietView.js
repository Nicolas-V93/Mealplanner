class DietView {
  #btns = document.querySelectorAll('.diet button');

  addHandlerSelectDiet(handler) {
    this.#btns.forEach(b =>
      b.addEventListener('click', e => {
        const diet = e.target.closest('.diet > div');
        handler(diet.dataset.diet);
      })
    );
  }
}

export default new DietView();
