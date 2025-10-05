import './pages/index.css';
import { initialCards } from './components/cards.js';
import { closeModal, openModal } from './components/modal.js';

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы;
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

// Темплейт карточки
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

const getOpenedModal = () => document.querySelector('.popup_is-opened');

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
    const clickedElem = e.target;
    const currentTarget = e.currentTarget;
    const openedModal = getOpenedModal();
    console.log('modal clickedElem', clickedElem);
    console.log('modal currentTarget', currentTarget);
    const isCloseBtnClicked = [...closeModalBtns].includes(clickedElem);
    const isModalBackdropClicked = clickedElem === currentTarget;
    if (isCloseBtnClicked || isModalBackdropClicked) {
      closeModal(openedModal, onCloseModal);
    }
  });
});

profileEditBtn.addEventListener('click', () => {
  fillInUserInfoCard();
  openModal(profileEditModal, onOpenModal);
});

cardAddBtn.addEventListener('click', () => {
  openModal(cardAddModal, onOpenModal);
});

function fillInUserInfoProfile() {
  userProfileName.textContent = editProfileInputName.value;
  userProfileDescription.textContent = editProfileInputDescription.value;
}

function fillInUserInfoCard() {
  editProfileInputName.value = userProfileName.textContent;
  editProfileInputDescription.value = userProfileDescription.textContent;
}

/**
 *
 * @returns {{name: string, link: string}}
 */
function getNewCardData() {
  return {
    name: addCardInputPlaceName.value,
    link: addCardInputPlaceLink.value,
  };
}

/**
 *
 * @param {Event} e
 */
function closeModalOnKeyDown(e) {
  if (e.key === 'Escape') {
    const openedModal = getOpenedModal();
    closeModal(openedModal, onCloseModal);
  }
}

function onOpenModal() {
  document.addEventListener('keydown', closeModalOnKeyDown);
}

function onCloseModal() {
  document.removeEventListener('keydown', closeModalOnKeyDown);
}

/**
 *
 * @param {{name: string, link: string}} data
 * @param {Function} onDelete
 * @param {Function} onShow
 * @param {Function} onLike
 * @returns {HTMLElement}
 */
function createCardElement(data, onDelete, onShow, onLike) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector('.card__title').textContent = data.name;

  deleteButton.addEventListener('click', onDelete);

  cardImage.addEventListener('click', () => {
    onShow(modalImage, data);
  });

  cardLikeBtn.addEventListener('click', onLike);
  return cardElement;
}

/**
 *
 * @param {HTMLImageElement} imageElem
 * @param {{name: string, link: string}} imageData
 */
function handleShowCard(imageElem, imageData) {
  console.log('image clicked', imageData.link, imageData.name);
  imageElem.src = imageData.link;
  imageElem.alt = imageData.name;
  modalImageCaption.textContent = imageData.name;
  openModal(openPictureModal, onOpenModal);
}

/**
 *
 * @param {Event} e
 */
function handleLikeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

/**
 *
 * @param {Event} e
 */
function handleDeleteCard(e) {
  console.log('handleDeleteCard', e.target.closest('.card'));
  evt.target.closest('.card').remove();
}

function onEditProfileSubmit() {
  fillInUserInfoProfile();
  const openedModal = getOpenedModal();
  closeModal(openedModal, onCloseModal);
  formElementEditProfile.reset();
}

function onAddCardSubmit() {
  const newCardData = getNewCardData();
  placesWrap.prepend(
    createCardElement(
      newCardData,
      handleDeleteCard,
      handleShowCard,
      handleLikeCard,
    ),
  );
  const openedModal = getOpenedModal();
  closeModal(openedModal, onCloseModal);
  formElementAddCard.reset();
}

formElementEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  onEditProfileSubmit();
});

formElementAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  onAddCardSubmit();
});

// create initial cards
initialCards.forEach((data) => {
  placesWrap.append(
    createCardElement(data, handleDeleteCard, handleShowCard, handleLikeCard),
  );
});
