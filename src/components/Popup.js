export default class Popup {
  constructor(popupSelector, buttonClose) {
    this._popup = popupSelector;
    this._closeButton = buttonClose;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }

  setEventListeners() {
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });

    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      this._handleOverlayClose(evt);
    });
  }

  open() {
    
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("click", this._handleOverlayClose);

    document.removeEventListener("keydown", this._handleEscClose);
  }
}
