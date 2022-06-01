const button = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__button_type_close');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__text');
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput =  document.querySelector('.popup__item_type_info');
let formElement = document.querySelector('.popup__form');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

button.addEventListener('click', function() {
  openPopup();
})

popupCloseButton.addEventListener('click', function() {
  closePopup();
})

popup.addEventListener('click', function(e) {
  if (e.target === e.currentTarget)
  closePopup();
})
