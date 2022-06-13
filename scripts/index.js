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

const cards = document.querySelector('.cards');
const itemTemplate = document.querySelector('#card-template').content;
const form = document.querySelector('.popup__new-form');
const formButton = document.querySelector('.popup__button_type_newsave');
const formInput1 = document.querySelector('.popup__item_type_newname');
const formInput2 = document.querySelector('.popup__item_type_link');


const newElement = initialCards.map(function (item) {
  return {
   name: item.name,
   link: item.link
  };
});

function render() {
  newElement.forEach(renderItem);
}

function renderItem({name, link, text}) {
  const placeElement = itemTemplate.cloneNode(true);

  placeElement.querySelector('.cards__title').textContent = name;
  placeElement.querySelector('.cards__image').src = link;



  placeElement.querySelector('.cards__button_type_like').addEventListener('click', function (evt){
    evt.target.classList.toggle('cards__button_type_like-active');
  });


  placeElement.querySelector('.cards__button_type_del').addEventListener('click', () => {
    deleteItem(placeElement);
  });

  cards.prepend(placeElement);

 /*const popupElement = itemTemplate.cloneNode(true);

 popupElement.querySelector('.cards__title').innerText = text;
 popupElement.querySelector('.cards__image').src = link;*/



}

render();

function deleteItem(item) {
  item.remove();
}

/*function addItem(name, link){
  const popupElement = itemTemplate.cloneNode(true);

  popupElement.querySelector('.cards__title').textContent = name;
  popupElement.querySelector('.cards__image').src = link;
}


function createItem(e) {
  e.preventDefault();
  addItem(formInput1.value);
  formInput1.value = ''

  /*renderItem(formInput2.value);
  formInput2.value = ''
}

form.addEventListener('submit', createItem);

initialCards.forEach(addItem);*/


const button = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const cardItem = document.querySelector('.cards__item');
const popup = document.querySelector('.popup');
const popupPlace = document.querySelector('.popup__new-place');
const popupCard = document.querySelector('.popup__image');
const popupCloseButton = document.querySelector('.popup__button_type_close');
const popupCloseButton1 = document.querySelector('.popup__button_type_place');
const popupCloseButton2 = document.querySelector('.popup__button_type_image');

let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__text');
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput =  document.querySelector('.popup__item_type_info');
let formElement = document.querySelector('.popup__form');
let popapPhoto = document.querySelector('.popup__photo');

function closePopupCard() {
  popupCard.classList.remove('popup_opened');

}

function openPopupCard() {
  popupCard.classList.add('popup_opened');

}

function closePopupNew() {
  popupPlace.classList.remove('popup_opened');
}

function openPopupNew() {
  popupPlace.classList.add('popup_opened');
}

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

buttonAdd.addEventListener('click', function() {
  openPopupNew();
})

cardItem.addEventListener('click', function() {
  openPopupCard();
})

popupCloseButton.addEventListener('click', function() {
  closePopup();
})

popupCloseButton1.addEventListener('click', function() {

  closePopupNew();
})

popupCloseButton2.addEventListener('click', function() {

  closePopupCard();
})

popup.addEventListener('click', function(e) {
  if (e.target === e.currentTarget)
  closePopup();
})


popupPlace.addEventListener('click', function(e) {
  if (e.target === e.currentTarget)
  closePopupNew();
})

popupCard.addEventListener('click', function(e) {
  if (e.target === e.currentTarget)
  closePopupCard();
})


