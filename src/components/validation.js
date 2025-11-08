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

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 */
const checkInputValidity = (formElement, inputElement) => {
  // check regex pattern
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
  //Если открыть модальное окно редактирования профиля, ввести невалидные данные в поля ввода и закрыть окно, то при повторном открытии и заполнении данных формы профиля необходимо вызвать очистку ошибок валидации, которые могли остаться с прошлого открытия.

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/**
 *
 * @param {Array<HTMLFormElement>} formElements
 */
const enableValidation = (formElements) => {
  formElements.forEach((elem) => setEventListeners(elem));
};

export { enableValidation };
