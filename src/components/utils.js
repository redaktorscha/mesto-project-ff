const getOpenedModal = () => document.querySelector('.popup_is-opened');

/**
 *
 * @param {HTMLInputElement} inputName
 * @param {HTMLInputElement} inputDescription
 * @param {HTMLElement} profileName
 * @param {HTMLElement} profileDescription
 */
const fillInUserInfoCard = (
  inputName,
  inputDescription,
  profileName,
  profileDescription,
) => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

/**
 *
 * @param {Event} e
 * @param {boolean} isLoading
 */
const toggleButtonText = (e, isLoading) => {
  const button = e.target.querySelector('.popup__button');
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

export { getOpenedModal, fillInUserInfoCard, toggleButtonText };
