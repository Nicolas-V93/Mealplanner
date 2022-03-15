class FormView {
  #form = document.querySelector('#person-info');

  addHandlerProcessInfo(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const formData = Object.fromEntries(dataArr);
      handler(formData);
    });
  }
}

export default new FormView();
