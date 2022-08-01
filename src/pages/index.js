import './index.css';
import initialCards  from "../utils/initialCards.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import config from "../utils/config.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");
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

//добавляем валидацию формам
const formValidatorAddName = new FormValidator(config, formAddName);
formValidatorAddName.enableValidation();

const formValidatorAddCards = new FormValidator(config, formAddCards);
formValidatorAddCards.enableValidation();

const userInfoData = new UserInfo(profileName, profileInfo);

const popupImage = new PopupWithImage(
  popupCard,
  popupCloseButtonImage,
  popupImg,
  popupTitle
);

const popupFormProfile = new PopupWithForm(
  popupProfile,
  handleProfileFormSubmit,
  popupCloseButtonProfile
);
const popupFormCard = new PopupWithForm(
  popupPlace,
  handleCardsSubmit,
  popupCloseButtonPlace
);

const createCard = (name, link) => {
  // Создадим экземпляр карточки
  const card = new Card(name, link, "#card-template", handleCardClick); // передаём объект аргументом
  // Создаём карточку и возвращаем наружу

  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(
        createCard(item.name, item.link, "#card-template", handleCardClick)
      );
    },
  },
  cardsContainer
);

cardsList.renderItems();

function handleCardsSubmit(data) {
  cardsList.addNewItem(
    createCard(data[0], data[1], "#card-template", handleCardClick)
  );
}

function handleProfileFormSubmit(data) {
  userInfoData.setUserInfo(data[0], data[1]);
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

buttonEdit.addEventListener("click", function () {
  const currentData = userInfoData.getUserInfo();
  nameInput.value = currentData.name;
  jobInput.value = currentData.job;

  popupFormProfile.open();

  formValidatorAddName.deleteMistakes();
});

buttonAdd.addEventListener("click", function () {
  formAddCards.reset();
  formValidatorAddCards.deleteMistakes();
  popupFormCard.open();
});
