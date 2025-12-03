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
 * @param {ValidationConfig} validationConfig
 */
const hideInputError = (formElement, inputElement, validationConfig) => {
  const { inputErrorClass, errorClass } = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 * @param {ValidationConfig} validationConfig
 */
const checkInputValidity = (formElement, inputElement, validationConfig) => {
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
    hideInputError(formElement, inputElement, validationConfig);
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
 * @param {HTMLButtonElement} buttonElement
 * @param {string} buttonClass
 */
const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(buttonClass);
};

/**
 *
 * @param {HTMLButtonElement} buttonElement
 * @param {string} buttonClass
 */
const enableButton = (buttonElement) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(buttonClass);
};

/**
 *
 * @param {Array<HTMLInputElement>} inputList
 * @param {HTMLButtonElement} buttonElement
 * @param {ValidationConfig} validationConfig
 */
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const { inactiveButtonClass } = validationConfig;
  const shouldDisableButton = hasInvalidInput(inputList);
  buttonElement.disabled = shouldDisableButton;
  if (shouldDisableButton) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
};

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {ValidationConfig} validationConfig
 */
const setEventListeners = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector } = validationConfig;
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // disables if not valid
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
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
  formElements.forEach((elem) => setEventListeners(elem, validationConfig));
};

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {ValidationConfig} validationConfig
 */
const clearValidation = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector } = validationConfig;
  const inputList = [...formElement.querySelectorAll(inputSelector)];

  const buttonElement = formElement.querySelector(submitButtonSelector);
  const { inactiveButtonClass } = validationConfig;
  disableButton(buttonElement, inactiveButtonClass);
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
};

export { enableValidation, clearValidation };
