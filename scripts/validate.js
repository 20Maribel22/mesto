
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
};

const showInputError = (formElement, inputElement,errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);

};


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);

};


const checkInputValidity = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {

    hideInputError(formElement, inputElement);
  }

};

const hasInvalidInput = (inputList) => {
  return inputList.some ((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {

    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {

    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};



const setEventListeners = (formElement) => {


  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);


 toggleButtonState(inputList, buttonElement);



  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);

    });

  });

};

const enableValidation = (config) => {

  const formList = Array.from(document.querySelectorAll(config.formSelector));


  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {

      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};









