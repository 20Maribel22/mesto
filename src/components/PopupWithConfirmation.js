import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit, buttonClose) {
    super(popupSelector, buttonClose);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");

  }

  open(_id, cardElement) {
    super.open(_id);
    this._id = _id;
    this._element = cardElement;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
       this._handleSubmit(this._id, this._element);
    });
    super.setEventListeners();
  }

 

}
