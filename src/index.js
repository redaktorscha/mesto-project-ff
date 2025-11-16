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
  checkIsPicture,
  changeUserAvatar,
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
// const avatarEditModal; // todo
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

// edit avatar selectors todo
// const formElementEditAvatar;
// const editAvatarInputLink;

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
    .then((user) => {
      userProfileName.textContent = user.name;
      userProfileDescription.textContent = user.about;
      console.log(`editUserProfile: ${user._id}`);
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
      const { name, link, owner, _id: cardId } = card;
      placesWrap.prepend(
        createCardElement(cardTemplate, {
          cardData: card,
          userId: owner._id,
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

userProfileAvatar.addEventListener('click', () => {
  openModal(avatarEditModal);
});

// formElementEditAvatar.addEventListener('submit', (e) => {
//   e.preventDefault();
//   checkIsPicture(editAvatarInputLink.value)
//     .then((isPicture) => {
//       if (isPicture) {
//         return editAvatarInputLink.value;
//       }
//       return Promise.reject('not a picture');
//     })
//     .then((value) => changeUserAvatar(value))
//     .then((avatar) => {
//       userProfileAvatar.style.cssText = `background-image: url('${avatar}')`;
//     })
//     .catch(console.log);
// });
// todo add _id
document.addEventListener('DOMContentLoaded', () => {
  enableValidation(allFormsList);

  Promise.all([getUserInfo(), getCardsList()])
    .then(([user, cards]) => {
      const { about, avatar, name, _id: userId } = user;
      userProfileName.textContent = name;
      userProfileDescription.textContent = about;
      userProfileAvatar.style.cssText = `background-image: url('${avatar}')`;

      cards.forEach((card) => {
        const { name, link, _id: cardId } = card;
        console.log(`userId: ${userId} cardId: ${cardId}`);
        placesWrap.append(
          createCardElement(cardTemplate, {
            cardData: card,
            userId: userId,
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
    .catch(console.log);
});
