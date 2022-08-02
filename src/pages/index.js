import "./index.css";
import initialCards from "../utils/initialCards.js";
import {
  buttonEdit,
  buttonAdd,
  popupProfile,
  popupPlace,
  popupCard,
  popupCloseButtonProfile,
  popupCloseButtonPlace,
  popupCloseButtonImage,
  popupImg,
  popupTitle,
  profileName,
  profileInfo,
  nameInput,
  jobInput,
  formAddName,
  formAddCards,
  formInputName,
  formInputImage,
  cardsContainer,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import config from "../utils/config.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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
popupImage.setEventListeners();

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

function handleCardsSubmit(e) {
  cardsList.addNewItem(
    createCard(formInputName.value, formInputImage.value, "#card-template", handleCardClick)
  );
}


function handleProfileFormSubmit({name, job}) {
  userInfoData.setUserInfo({name, job});
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
