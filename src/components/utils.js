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

export { getOpenedModal, fillInUserInfoCard };
