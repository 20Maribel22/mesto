export default class Card {
  constructor(name, link, selectorTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._selectorTemplate) // используем this._selectorTemplate
      .content.querySelector(".cards__item")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    this._image = this._element.querySelector(".cards__image");
    this._title = this._element.querySelector(".cards__title");

    // Добавим данные
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__button_type_like")
      .addEventListener("click", this._handleLikeClick);

    this._element
      .querySelector(".cards__button_type_del")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle("cards__button_type_like-active");
  };

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }
}
