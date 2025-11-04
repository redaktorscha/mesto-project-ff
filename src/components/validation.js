// todo save selectors to constants

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 * @param {string} errorMessage
 */
const showInputError = (formElement, inputElement, errorMessage) => {
  // todo func
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // todo wrap in func
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
  // todo func
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // todo wrap in func
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity('');
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
    // переменная validationMessage хранит наше кастомное сообщение
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
  if (hasInvalidInput(inputList)) {
    // todo wrap in func
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    // todo wrap in func
    buttonElement.disabled = false;
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

  // todo add event listener for reset event

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/**
 *
 * @param {HTMLFormElement} formElement
 */
const enableValidation = (formElement) => {
  // todo find all forms here
  setEventListeners(formElement);
};
