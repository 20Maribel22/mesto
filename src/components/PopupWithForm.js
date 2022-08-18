import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, buttonClose) {
    super(popupSelector, buttonClose);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__item");
    this._setEventListeners = this.setEventListeners();
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }

  addSaving() {
    this._form.querySelector('.popup__button-save').textContent = 'Сохранение...';
  }

  deleteSaving() {
    this._form.querySelector('.popup__button-save').textContent = 'Сохранить';
  }


  close() {
    this._form.reset();
    super.close();
  }
}
