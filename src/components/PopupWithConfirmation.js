import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit, buttonClose) {
    super(popupSelector, buttonClose);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    super.setEventListeners();
  }
}
