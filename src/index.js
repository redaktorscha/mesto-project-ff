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

// buttons for modals
const profileEditBtn = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const closeModalBtns = document.querySelectorAll('.popup__close');

// show picture modal selectors
const modalImage = document.querySelector('.popup__image');

closeModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    console.log('close btn', e.target);
    const opened = document.querySelector('.popup_is-opened');
    console.log(opened);
    closeModal(opened);
  });
});

profileEditBtn.addEventListener('click', () => {
  openModal(profileEditModal);
});

cardAddBtn.addEventListener('click', () => {
  openModal(cardAddModal);
});

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
  // popupImageCaption.textContent = cardData.name;
  openModal(openPictureModal);
}

// должна быть отдельной функций, можно стрелочной
function handleDeleteCard(evt) {
  console.log('handleDeleteCard', evt.target.closest('.card'));
  evt.target.closest('.card').remove();
}

// можно сделать и через простой цикл
initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard));
});
