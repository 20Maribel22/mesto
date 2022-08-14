import "./index.css";
/*import initialCards from "../utils/initialCards.js";*/
import {
  buttonEdit,
  buttonAdd,
  popupProfile,
  popupPlace,
  popupCard,
  popupAvatar,
  popupCloseButtonProfile,
  popupCloseButtonPlace,
  popupCloseButtonImage,
  popupCloseButtonAvatar,
  popupImg,
  popupTitle,
  profileName,
  profileInfo,
  nameInput,
  jobInput,
  formAddName,
  formAddAvatar,
  formAddCards,
  formInputName,
  formInputImage,
  cardsContainer,
  buttonEditAvatar,
  profileAvatar,
  popupBtn,
  popupCloseButtonConfirm,
  buttonDel,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import config from "../utils/config.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    authorization: "84303af8-04c1-448c-9d37-1e7857c2af9d",
    "Content-Type": "application/json",
  },
});

//добавляем валидацию формам
const formValidatorAddName = new FormValidator(config, formAddName);
formValidatorAddName.enableValidation();

const formValidatorAddCards = new FormValidator(config, formAddCards);
formValidatorAddCards.enableValidation();

const formValidatorAddAvatar = new FormValidator(config, formAddAvatar);
formValidatorAddAvatar.enableValidation();

const userInfoData = new UserInfo(profileName, profileInfo, profileAvatar);

const popupConfirm = new PopupWithConfirm(
  popupBtn,
  handleConfirmClick,
  popupCloseButtonConfirm
);

const popupImage = new PopupWithImage(
  popupCard,
  popupCloseButtonImage,
  popupImg,
  popupTitle
);

popupImage.setEventListeners();
popupConfirm.setEventListeners();

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

const popupFormAvatar = new PopupWithForm(
  popupAvatar,
  handleAvatarFormSubmit,
  popupCloseButtonAvatar
);

/*const createCard = (name, link) => {
  // Создадим экземпляр карточки
  const card = new Card(name, link, "#card-template", handleCardClick, handleConfirmClick); // передаём объект аргументом
  // Создаём карточку и возвращаем наружу

  const cardElement = card.generateCard();
  return cardElement;
};*/

let currentUserId = null;
api.getUserInfo().then((user) => {
  currentUserId = user._id;
});

const createCard = (data) => {
  // Создадим экземпляр карточки
  data.currentUserId = currentUserId;
  console.log("Создаю карточку", { data });
  const card = new Card(data, "#card-template", {
    imageClick: handleCardClick,
    remove: (currentData, removeCallback) => {
      const removeCard = () => {
        api.removeCard(currentData._id).then((updatedData) => {
          removeCallback(updatedData.likes);
          popupConfirm.close();
        });
      };

      popupConfirm.open();
      popupConfirm.setAction(removeCard);
    },
    like: (currentData, likeCallback) => {
      console.log("Вызываю api.likeCard", { currentData, likeCallback });
      api.likeCard(currentData._id).then((updatedData) => {
        console.log("Вызываю likeCallback", { updatedData });
        likeCallback(updatedData.likes);
      });
    },
  }); // передаём объект аргументом
  // Создаём карточку и возвращаем наружу

  const cardElement = card.generateCard();
  return cardElement;
};
const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardsContainer
);

api
  .getInitialCards()
  .then((items) => {
    console.log(items, "items");
    cardsList.renderItems(items);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
/*
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(
        createCard(item.name, item.link, "#card-template",likes, id, handleCardClick)
      );
    },
  },
  cardsContainer
);

cardsList.renderItems();
*/
function handleCardsSubmit(e) {
  cardsList.addNewItem(
    createCard(
      formInputName.value,
      formInputImage.value,
      "#card-template",
      handleCardClick
    )
  );
}

function handleProfileFormSubmit({ name, job }) {
  userInfoData.setUserInfo({ name, job });
}

function handleAvatarFormSubmit({ avatar }) {
  userInfoData.setUserAvatar({ avatar });
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleConfirmClick(id) {
  popupConfirm.open(id);
  deleteItem;
}

// попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  const currentData = userInfoData.getUserInfo();
  nameInput.value = currentData.name;
  jobInput.value = currentData.job;

  popupFormProfile.open();

  formValidatorAddName.deleteMistakes();
});
// попап добавления карточки
buttonAdd.addEventListener("click", function () {
  formAddCards.reset();
  formValidatorAddCards.deleteMistakes();
  popupFormCard.open();
});
// попап добавления аватара
buttonEditAvatar.addEventListener("click", function () {
  formValidatorAddAvatar.deleteMistakes();
  popupFormAvatar.open();
});

/*buttonDel.addEventListener("click", function () {
  popupConfirm.open();
});*/
