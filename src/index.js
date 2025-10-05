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

// edit profile popup selectors
const formElementEditProfile = document.querySelector(
  '.popup__form[name="edit-profile"]',
);
const editProfileInputName = document.querySelector('.popup__input_type_name');
const editProfileInputDescription = document.querySelector(
  '.popup__input_type_description',
);

// handle close on cross icon
// closeModalBtns.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     console.log('close btn', e.target);
//     const opened = document.querySelector('.popup_is-opened');
//     console.log(opened);
//     closeModal(opened);
//   });
// });

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

function createCardElement(data, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector('.card__title').textContent = data.name;

  deleteButton.addEventListener('click', onDelete);

  cardImage.addEventListener('click', () => {
    onShow(modalImage, data);
  });
  return cardElement;
}

function onShow(imageElem, imageData) {
  console.log('image clicked', imageData.link, imageData.name);
  imageElem.src = imageData.link;
  imageElem.alt = imageData.name;
  modalImageCaption.textContent = imageData.name;
  openModal(openPictureModal, onOpenModal);
}

// должна быть отдельной функций, можно стрелочной
function handleDeleteCard(evt) {
  console.log('handleDeleteCard', evt.target.closest('.card'));
  evt.target.closest('.card').remove();
}

formElementEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  fillInUserInfoProfile();
  const openedModal = getOpenedModal();
  closeModal(openedModal, onCloseModal);
  formElementEditProfile.reset();
});

// можно сделать и через простой цикл
initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard));
});
