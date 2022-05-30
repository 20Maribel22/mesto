const button = document.querySelector('.profile__button_edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');

function closePopup() {
  popup.classList.add('popup_opened');
}

function openPopup() {
  popup.classList.remove('popup_opened');
}

button.addEventListener('click', function() {
  openPopup();
})

popupCloseButton.addEventListener('click', function() {
  closePopup();
})

popupSaveButton.addEventListener('click', function() {
  closePopup();
})

popup.addEventListener('click', function(e) {
  if (e.target === e.currentTarget)
  closePopup();
})

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__item_name');
let jobInput = document.querySelector('.popup__item_info');

nameInput.value = 'Марина Белан';
jobInput.value = 'Путешественник-любитель';

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__item_name').value;
  document.querySelector('.profile__name').textContent = nameInput;

  let jobInput = document.querySelector('.popup__item_info').value;
  document.querySelector('.profile__text').textContent = jobInput;
}
formElement.addEventListener('submit', formSubmitHandler);
