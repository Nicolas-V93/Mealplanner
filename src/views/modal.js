export default class Modal {
  #modal;

  constructor(element) {
    this.#modal = element;
  }

  addHandlerCloseModal() {
    this.#modal
      .querySelector('.close-modal')
      .addEventListener('click', this.closeModal.bind(this));
  }

  openModal() {
    this.#modal.showModal();
  }

  closeModal() {
    this.#modal.close();
  }
}
