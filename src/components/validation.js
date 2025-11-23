/**
 * @typedef {Object} ValidationConfig
 * @property {string} formSelector
 * @property {string} inputSelector
 * @property {string} submitButtonSelector
 * @property {string} inactiveButtonClass
 * @property {string} inputErrorClass
 * @property {string} errorClass
 */

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 * @param {string} errorMessage
 */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 */
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      inputElement.dataset.errorPatternMismatchMessage,
    );
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/**
 *
 * @param {Array<HTMLInputElement>} inputList
 * @returns {boolean}
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

/**
 *
 * @param {Array<HTMLInputElement>} inputList
 * @param {HTMLButtonElement} buttonElement
 */
const toggleButtonState = (inputList, buttonElement) => {
  const shouldDisableButton = hasInvalidInput(inputList);
  buttonElement.disabled = shouldDisableButton;
  if (shouldDisableButton) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
};

/**
 *
 * @param {HTMLFormElement} formElement
 */
const setEventListeners = (formElement) => {
  const inputList = [...formElement.querySelectorAll('.popup__input')];
  const buttonElement = formElement.querySelector('.popup__button');
  // disables if not valid
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/**
 *
 * @param {ValidationConfig} validationConfig
 */
const enableValidation = (validationConfig) => {
  const { formSelector } = validationConfig;
  const formElements = [...document.querySelectorAll(formSelector)];
  formElements.forEach((elem) => setEventListeners(elem));
};

/**
 *
 * @param {HTMLFormElement} formElement
 */
const clearValidation = (formElement) => {
  const inputList = [...formElement.querySelectorAll('.popup__input')];
  inputList.forEach((inputElement) =>
    checkInputValidity(formElement, inputElement),
  );
  const buttonElement = formElement.querySelector('.popup__button');
  // disables if not valid
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

export { enableValidation, clearValidation };
