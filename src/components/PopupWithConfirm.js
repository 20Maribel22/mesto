import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit, buttonClose) {
    super(popupSelector,buttonClose);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');

  }
open(id) {
   this._id = id;
   super.open();
  }

setAction(action){

}

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._id);
    });

   super.setEventListeners();
  }
}

