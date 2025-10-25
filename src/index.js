import './pages/index.css';
import { initialCards } from './components/cards.js';
import {
  openModal,
  closeModal,
  handleCloseModalOnBtnClick,
} from './components/modal.js';
import {
  createCardElement,
  handleShowCard,
  handleLikeCard,
  handleDeleteCard,
} from './components/card.js';

import {
  fillInUserInfoCard,
  fillInUserInfoProfile,
  getNewCardData,
  getOpenedModal,
} from './components/utils.js';

// places card template
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.places__item');

// cards
const placesWrap = document.querySelector('.places__list');

// modals
const profileEditModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
const openPictureModal = document.querySelector('.popup_type_image');
const allModals = document.querySelectorAll('.popup');

// user info selectors
const userProfileName = document.querySelector('.profile__title');
const userProfileDescription = document.querySelector('.profile__description');

// buttons for modals
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const closeModalBtns = document.querySelectorAll('.popup__close');

// show picture modal selectors
const modalImage = document.querySelector('.popup__image');
const modalImageCaption = document.querySelector('.popup__caption');

// edit profile form selectors
const formElementEditProfile = document.querySelector(
  '.popup__form[name="edit-profile"]',
);
const editProfileInputName = document.querySelector('.popup__input_type_name');
const editProfileInputDescription = document.querySelector(
  '.popup__input_type_description',
);

// add card form selectors
const formElementAddCard = document.querySelector(
  '.popup__form[name="new-place"]',
);
const addCardInputPlaceName = document.querySelector(
  '.popup__input_type_card-name',
);
const addCardInputPlaceLink = document.querySelector('.popup__input_type_url');

// handle close modals
allModals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    handleCloseModalOnBtnClick(e, closeModalBtns);
  });
});

// open profile edit modal & prefill info
profileEditBtn.addEventListener('click', (_) => {
  fillInUserInfoCard(
    editProfileInputName,
    editProfileInputDescription,
    userProfileName,
    userProfileDescription,
  );
  openModal(profileEditModal);
});

// handle open card add modal
cardAddBtn.addEventListener('click', (_) => {
  openModal(cardAddModal);
});

// submit edit profile form
formElementEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  fillInUserInfoProfile(
    editProfileInputName,
    editProfileInputDescription,
    userProfileName,
    userProfileDescription,
  );
  const openedModal = getOpenedModal();
  closeModal(openedModal);
  formElementEditProfile.reset();
});

// submit add card form
formElementAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const newCardData = getNewCardData(
    addCardInputPlaceName,
    addCardInputPlaceLink,
  );
  placesWrap.prepend(
    createCardElement(
      newCardData,
      cardTemplate,
      handleDeleteCard,
      handleShowCard(
        modalImage,
        modalImageCaption,
        newCardData,
        openPictureModal,
      ),
      handleLikeCard,
    ),
  );
  const openedModal = getOpenedModal();
  closeModal(openedModal);
  formElementAddCard.reset();
});

// create initial cards
initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement(
      data,
      cardTemplate,
      handleDeleteCard,
      handleShowCard(modalImage, modalImageCaption, data, openPictureModal),
      handleLikeCard,
    ),
  );
});

/**
 *
 * @param {HTMLImageElement} imageElem
 * @param {HTMLImageElement} imageCaption
 * @param {{name: string, link: string}} imageData
 * @param {HTMLElement} openPictureModal
 * @returns {Function}
 */
const handleShowCard = (
  imageElem,
  imageCaption,
  imageData,
  openPictureModal,
) => {
  return () => {
    imageElem.src = imageData.link;
    imageElem.alt = imageData.name;
    imageCaption.textContent = imageData.name;
    openModal(openPictureModal);
  };
};
