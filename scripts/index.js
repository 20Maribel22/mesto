import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import config from "./config.js";

const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");
const cardItem = document.querySelector(".cards__image");
const popupProfile = document.querySelector(".popup_theme_profile");
const popupPlace = document.querySelector(".popup_theme_place");
const popupCard = document.querySelector(".popup_theme_image");
const popupCloseButtonProfile = document.querySelector(
  ".popup__button-close_theme_profile"
);
const popupCloseButtonPlace = document.querySelector(
  ".popup__button-close_theme_place"
);
const popupCloseButtonImage = document.querySelector(
  ".popup__button-close_theme_image"
);
const popupImg = popupCard.querySelector(".popup__photo");
const popupTitle = popupCard.querySelector(".popup__photo-title");
const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__text");
const nameInput = document.querySelector(".popup__item_type_name");
const jobInput = document.querySelector(".popup__item_type_info");
const popupContainer = document.querySelector(".popup__container");
const popupFormName = document.querySelector(".popup__form");
const formAddName = popupContainer.querySelector("form[name=record]");
const formContainerCards = document.querySelector(".popup__form_theme_place");
const formAddCards = popupPlace.querySelector("form[name=cards]");
const formInputName = document.querySelector(".popup__item_type_newname");
const formInputImage = document.querySelector(".popup__item_type_link");
const cardsContainer = document.querySelector(".cards");

const addCard = () => {
  initialCards.forEach((item) => {
    cardsContainer.prepend(createCard(item.name, item.link));
  });
};

const createCard = (name, link) => {
  // Создадим экземпляр карточки
  const card = new Card(
    name,
    link,
    "#card-template",
    popupImg,
    popupTitle,
    popupCard,
    openPopup
  ); // передаём объект аргументом
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
};

function handleSubmit(e) {
  e.preventDefault();
  cardsContainer.prepend(createCard(formInputName.value, formInputImage.value));
  formInputName.value = "";
  formInputImage.value = "";
  closePopup(popupPlace);
}

formContainerCards.addEventListener("submit", handleSubmit);

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function closePopup(popup) {
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closePopupOverlay);
  popup.classList.remove("popup_opened");
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popup) {
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupOverlay);
  popup.classList.add("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popupProfile);
}
popupFormName.addEventListener("submit", handleProfileFormSubmit);

buttonEdit.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;

  formValidatorAddName.deleteMistakes();
  openPopup(popupProfile);
});

buttonAdd.addEventListener("click", function () {
  formAddCards.reset();
  formValidatorAddCards.deleteMistakes();
  openPopup(popupPlace);
});

popupCloseButtonProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupCloseButtonPlace.addEventListener("click", function () {
  closePopup(popupPlace);
});

popupCloseButtonImage.addEventListener("click", function () {
  closePopup(popupCard);
});

//вызываем функцию добавления карточек
addCard();

//добавляем валидацию формам
const formValidatorAddName = new FormValidator(config, formAddName);
formValidatorAddName.enableValidation();

const formValidatorAddCards = new FormValidator(config, formAddCards);
formValidatorAddCards.enableValidation();
