import './pages/index.css';
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

import { fillInUserInfoCard, getOpenedModal } from './components/utils.js';
import { enableValidation, clearValidation } from './components/validation.js';

import {
  getUserInfo,
  getCardsList,
  editUserProfile,
  addNewCard,
  checkIsPicture,
  changeUserAvatar,
} from './components/api.js';

document.addEventListener('DOMContentLoaded', () => {
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
  const avatarEditModal = document.querySelector('.popup_type_edit-avatar');
  const deleteCardModal = document.querySelector('.popup_type_delete-card');
  const allModals = document.querySelectorAll('.popup');

  //all forms
  const allFormsList = [...document.querySelectorAll('.popup__form')];

  // user info selectors
  const userProfileName = document.querySelector('.profile__title');
  const userProfileDescription = document.querySelector(
    '.profile__description',
  );
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
  const editProfileInputName = document.querySelector(
    '.popup__input_type_name',
  );
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
  const addCardInputPlaceLink = document.querySelector(
    '.popup__input_type_url',
  );

  // edit avatar selectors
  const formElementEditAvatar = document.querySelector(
    '.popup__form[name="edit-avatar"]',
  );
  const editAvatarInputLink = document.querySelector(
    '.popup__input_type_avatar-link',
  );

  // delete card selectors
  const formElementDeleteCard = document.querySelector(
    '.popup__form[name="delete-card"]',
  );

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

    editUserProfile(
      editProfileInputName.value,
      editProfileInputDescription.value,
    )
      .then((user) => {
        userProfileName.textContent = user.name;
        userProfileDescription.textContent = user.about;
        const openedModal = getOpenedModal();
        closeModal(openedModal);
        formElementEditProfile.reset();
      })
      .catch(console.log);
  });

  // submit add card form
  formElementAddCard.addEventListener('submit', (e) => {
    e.preventDefault();

    addNewCard(addCardInputPlaceName.value, addCardInputPlaceLink.value)
      .then((card) => {
        const { name, link, owner, _id: cardId } = card;
        placesWrap.prepend(
          createCardElement(cardTemplate, {
            cardData: card,
            userId: owner._id,
            onDelete: () => {
              openModal(deleteCardModal);
              formElementDeleteCard.addEventListener('submit', (e) => {
                e.preventDefault();
                const currentCard = document.querySelector(
                  `[data-id="${card._id}"]`,
                );
                handleDeleteCard(currentCard, card._id);
              });
            },
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
      })
      .catch(console.log);
  });

  // open edit avatar form on click
  userProfileAvatar.addEventListener('click', () => {
    clearValidation(formElementEditAvatar);
    openModal(avatarEditModal);
  });

  // submit edit avatar form
  formElementEditAvatar.addEventListener('submit', (e) => {
    e.preventDefault();
    checkIsPicture(editAvatarInputLink.value)
      .then((isPicture) => {
        if (isPicture) {
          return editAvatarInputLink.value;
        }
        return Promise.reject('not a picture');
      })
      .then((value) => changeUserAvatar(value))
      .then((avatar) => {
        userProfileAvatar.style.cssText = `background-image: url('${avatar}')`;
        formElementEditAvatar.reset();
        const openedModal = getOpenedModal();
        closeModal(openedModal);
      })
      .catch(console.log);
  });

  enableValidation(allFormsList);

  Promise.all([getUserInfo(), getCardsList()])
    .then(([user, cards]) => {
      const { about, avatar, name, _id: userId } = user;
      userProfileName.textContent = name;
      userProfileDescription.textContent = about;
      userProfileAvatar.style.cssText = `background-image: url('${avatar}')`;

      cards.forEach((card) => {
        const { name, link } = card;
        placesWrap.append(
          createCardElement(cardTemplate, {
            cardData: card,
            userId: userId,
            onDelete: () => {
              openModal(deleteCardModal);
              formElementDeleteCard.addEventListener('submit', (e) => {
                e.preventDefault();
                const currentCard = document.querySelector(
                  `[data-id="${card._id}"]`,
                );
                handleDeleteCard(currentCard, card._id);
              });
            },
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
