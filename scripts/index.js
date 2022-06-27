const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardsContainer = document.querySelector('.cards');
const itemTemplate = document.querySelector('#card-template').content.querySelector('.cards__item');
const formContainerCards = document.querySelector('.popup__form_theme_place');
const formInputName = document.querySelector('.popup__item_type_newname');
const formInputImage = document.querySelector('.popup__item_type_link');

const addCard = (place) =>
cardsContainer.prepend(place);

initialCards.forEach(function (item) {
 addCard(createCard(item.name, item.link));

});

function createCard(name, link) {
  const placeElement = itemTemplate.cloneNode(true);


  placeElement.querySelector('.cards__title').textContent = name;
  placeElement.querySelector('.cards__image').src = link;
  placeElement.querySelector('.cards__image').alt = name;



  placeElement.querySelector('.cards__button_type_like').addEventListener('click', function (evt){
    evt.target.classList.toggle('cards__button_type_like-active');
  });


  placeElement.querySelector('.cards__button_type_del').addEventListener('click',  () => {
   deleteItem(placeElement);
  });


  placeElement.querySelector('.cards__image').addEventListener('click',  () => {
    popupImg.src = link;
    popupTitle.textContent = name;
    popupImg.alt = name;

    openPopup(popupCard);
  });


  return placeElement;

}


function deleteItem(item) {
  item.remove();
}


function createItem(e) {
  e.preventDefault();
    addCard(
        createCard(
         formInputName.value,
         formInputImage.value
        )
    );

  formInputName.value = '';
  formInputImage.value = '';
    closePopup(popupPlace);

}

formContainerCards.addEventListener('submit', createItem);


const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const cardItem = document.querySelector('.cards__image');
const popupProfile = document.querySelector('.popup_theme_profile');
const popupPlace = document.querySelector('.popup_theme_place');
const popupCard = document.querySelector('.popup_theme_image');
const popupCloseButtonProfile = document.querySelector('.popup__button-close_theme_profile');
const popupCloseButtonPlace = document.querySelector('.popup__button-close_theme_place');
const popupCloseButtonImage = document.querySelector('.popup__button-close_theme_image');
const popupImg = popupCard.querySelector('.popup__photo');
const popupTitle = popupCard.querySelector('.popup__photo-title');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__text');
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput =  document.querySelector('.popup__item_type_info');
const popupFormName = document.querySelector('.popup__form');


function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }

}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
  popup.classList.toggle('popup_opened')
}


function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
  popup.classList.add('popup_opened');
  enableValidation(config);
}



function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popupProfile);
}
popupFormName.addEventListener('submit', handleProfileFormSubmit);


buttonEdit.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;

  openPopup(popupProfile);
})

buttonAdd.addEventListener('click', function() {
  openPopup(popupPlace);
})

cardItem.addEventListener('click', function() {
  openPopup(popupCard);
})


popupCloseButtonProfile.addEventListener('click', function() {
  closePopup(popupProfile);
})

popupCloseButtonPlace.addEventListener('click', function() {

  closePopup(popupPlace);
})

popupCloseButtonImage.addEventListener('click', function() {

  closePopup(popupCard);
})






