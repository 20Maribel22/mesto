export default class Card {
  constructor(name, link, selectorTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    /*this._likes = likes;*/
    // this._id = _id;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
    // this._handleConfirmClick = handleConfirmClick;
    // this._api = api;
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
    this._likeButton = this._element.querySelector(".cards__button_type_like");
    this._number = this._element.querySelector(".cards__like-number");

    // Добавим данные
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    // this._number.textContent = this._likes.length;


    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    // this._likeButton
    //   .addEventListener("click", this._handleLikeClick);

    // this._element
    //   .querySelector(".cards__button_type_del")
    //   .addEventListener("click", () => {
    //     this._handleConfirmClick();
    //   });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _handleLikeClick () {
    this._likeButton.toggle("cards__button_type_like-active");
    // if(this._likeButton.classList.contains('cards__button_type_like-active')) {
    //   this._likes.length +1;
    //  } else {
    //   this._likes.length -1;
    //  }
  };

  /*_handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }*/



}
