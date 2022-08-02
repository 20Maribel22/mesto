export default class Popup {
  constructor(popupSelector, buttonClose) {
    this._popup = popupSelector;
    this._closeButton = buttonClose;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      this._handleOverlayClose(evt);
    });
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("click", this._handleOverlayClose);

    document.removeEventListener("keydown", this._handleEscClose);
  }
}