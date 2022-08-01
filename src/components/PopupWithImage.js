import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, buttonClose, popupImg, popupTitle) {
    super(popupSelector, buttonClose);
    this._image = popupImg;
    this._title = popupTitle;
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
    super.open();
  }
}
