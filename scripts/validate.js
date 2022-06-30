const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
};


const enableValidation = (config) => {

  const formList = Array.from(document.querySelectorAll(config.formSelector));


  formList.forEach((formElement) => {
    setEventListeners(formElement,config);
  });

};
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);

};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement,config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);

};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement,config) => {

  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage,config);
  } else {

    hideInputError(formElement, inputElement,config);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some ((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция, которая отключает кнопку
const disableButton = (buttonElement,config) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(config.inactiveButtonClass);

};

//Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, config) => {

  if (hasInvalidInput(inputList)) {

    disableButton(buttonElement,config);
  } else {

    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// Слушатель событий
const setEventListeners = (formElement, config) => {


  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);


  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      checkInputValidity(formElement, inputElement,config);

      toggleButtonState(inputList, buttonElement,config);

    });

  });

};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
});


enableValidation(config);





