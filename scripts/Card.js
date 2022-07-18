export default class Card {


  constructor(data, selectorTemplate, popupImg, popupTitle, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplate = selectorTemplate;
    this.popupImg = popupImg;
    this.popupTitle = popupTitle;
    this.openPopup = openPopup;
  }

 _getTemplate() {
  console.log(this._selectorTemplate);
    // забираем разметку из HTML и клонируем элемент
            const cardElement = document
            .querySelector(this._selectorTemplate) // используем this._selectorTemplate
            .content
            .querySelector('.cards__item')
            .cloneNode(true);


   // вернём DOM-элемент карточки
   return  cardElement;

  }

  generateCard() {
  // Запишем разметку в приватное поле _element.
  // Так у других элементов появится доступ к ней.
  this._element = this._getTemplate();
  this._setEventListeners();

  // Добавим данные
  this._element.querySelector('.cards__image').src = this._link;
  this._element.querySelector('.cards__image').alt = this._name;
  this._element.querySelector('.cards__title').textContent = this._name;


  // Вернём элемент наружу
  return this._element;
 }


_setEventListeners() {

 this._element.querySelector('.cards__button_type_like').addEventListener('click', this._handleLikeClick);

 this._element.querySelector('.cards__button_type_del').addEventListener('click', () => {
    this._handleDeleteClick();
 });

this._element.querySelector('.cards__image').addEventListener('click', () => {
 this._handleCardClick();
});
}



_handleLikeClick = (evt) => {
    evt.target.classList.toggle('cards__button_type_like-active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleCardClick() {
   this.popupTitle.textContent = this._name;
   this.popupImg.src = this._link;
   this.popupImg.alt = this._link;

   this.openPopup(document.querySelector('.popup_theme_image'));
  }
}
