import './pages/index.css';
// import { initialCards } from './components/cards.js';
import {
  openModal,
  closeModal,
  handleCloseModalOnBtnClick,
} from './components/modal.js';
import {
  createCardElement,
  handleLikeCard,
  handleDeleteCard,
} from './components/card.js';

import {
  fillInUserInfoCard,
  //fillInUserInfoProfile,
  getNewCardData,
  getOpenedModal,
} from './components/utils.js';
import { enableValidation, clearValidation } from './components/validation.js';

import {
  getUserInfo,
  getCardsList,
  editUserProfile,
  addNewCard,
} from './components/api.js';

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

//all forms
const allFormsList = [...document.querySelectorAll('.popup__form')];

// user info selectors
const userProfileName = document.querySelector('.profile__title');
const userProfileDescription = document.querySelector('.profile__description');
const userProfileAvatar = document.querySelector('.profile__image');

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

// handle close modals
allModals.forEach((modal) => {
  modal.addEventListener('mousedown', (e) => {
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
  clearValidation(formElementEditProfile);
  openModal(profileEditModal);
});

// handle open card add modal
cardAddBtn.addEventListener('click', (_) => {
  openModal(cardAddModal);
});

// submit edit profile form
formElementEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();

  editUserProfile(editProfileInputName.value, editProfileInputDescription.value)
    .then((result) => {
      userProfileName.textContent = result.name;
      userProfileDescription.textContent = result.about;
      const openedModal = getOpenedModal();
      closeModal(openedModal);
      formElementEditProfile.reset();
    })
    .catch(console.log);
  // fillInUserInfoProfile(
  //   editProfileInputName,
  //   editProfileInputDescription,
  //   userProfileName,
  //   userProfileDescription,
  // );
});

// submit add card form
formElementAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  // const newCardData = getNewCardData(
  //   addCardInputPlaceName,
  //   addCardInputPlaceLink,
  // );

  addNewCard(addCardInputPlaceName.value, addCardInputPlaceLink.value).then(
    (card) => {
      const { name, link } = card;
      placesWrap.prepend(
        createCardElement({ name, link }, cardTemplate, {
          onDelete: handleDeleteCard,
          onShow: handleShowCard(
            modalImage,
            modalImageCaption,
            { name, link },
            openPictureModal,
          ),
          onLike: handleLikeCard,
        }),
      );
      const openedModal = getOpenedModal();
      closeModal(openedModal);
      formElementAddCard.reset();
      clearValidation(formElementAddCard);
    },
  );
});

// todo add _id
document.addEventListener('DOMContentLoaded', () => {
  enableValidation(allFormsList);

  Promise.all([
    getUserInfo()
      .then((result) => {
        console.log(result);
        // todo func
        const { about, avatar, name } = result;
        userProfileName.textContent = name;
        userProfileDescription.textContent = about;
        userProfileAvatar.style.cssText = `background-image: url('${avatar}')`;
      })
      .catch((err) => {
        console.log(err);
        // todo add default values for user
      }),

    getCardsList()
      .then((result) => {
        console.log(result);
        // todo func
        result.forEach((card) => {
          const { name, link } = card;
          placesWrap.append(
            createCardElement({ name, link }, cardTemplate, {
              onDelete: handleDeleteCard,
              onShow: handleShowCard(
                modalImage,
                modalImageCaption,
                { name, link },
                openPictureModal,
              ),
              onLike: handleLikeCard,
            }),
          );
        });
      })
      .catch((err) => {
        console.log(err);
        // todo add default values for cards?
      }),
  ]);
});
