const getOpenedModal = () => document.querySelector('.popup_is-opened');

/**
 * @param {HTMLInputElement} addCardInputPlaceName
 * @param {HTMLInputElement} addCardInputPlaceLink
 * @returns {{name: string, link: string}}
 */
function getNewCardData(addCardInputPlaceName, addCardInputPlaceLink) {
  return {
    name: addCardInputPlaceName.value,
    link: addCardInputPlaceLink.value,
  };
}

/**
 *
 * @param {HTMLInputElement} inputName
 * @param {HTMLInputElement} inputDescription
 * @param {HTMLElement} profileDescription
 * @param {HTMLElement} profileName
 */
function fillInUserInfoProfile(
  inputName,
  inputDescription,
  profileName,
  profileDescription,
) {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
}

/**
 *
 * @param {HTMLInputElement} inputName
 * @param {HTMLInputElement} inputDescription
 * @param {HTMLElement} profileName
 * @param {HTMLElement} profileDescription
 */
function fillInUserInfoCard(
  inputName,
  inputDescription,
  profileName,
  profileDescription,
) {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

export {
  getOpenedModal,
  getNewCardData,
  fillInUserInfoProfile,
  fillInUserInfoCard,
};
