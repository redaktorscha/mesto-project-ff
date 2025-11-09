import { deleteCard, Card } from './api.js';

/**
 *
 * @param {HTMLElement} template
 * @param {{cardData: Card, userId: string, onDelete: Function, onShow: Function, onLike: Function}} config
 * @returns {HTMLElement}
 */
const createCardElement = (
  template,
  { cardData, userId, onDelete, onShow, onLike } = {},
) => {
  const cardElement = template.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const isOwnCard = cardData.owner._id === userId;
  if (!isOwnCard) {
    deleteButton.classList.add('card__delete-button_is-hidden');
  }
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector('.card__title').textContent = data.name;

  if (onDelete && isOwnCard) {
    deleteButton.addEventListener('click', onDelete);
  }

  if (onShow) {
    cardImage.addEventListener('click', onShow);
  }

  if (onLike) {
    cardLikeBtn.addEventListener('click', onLike);
  }

  return cardElement;
};

/**
 *
 * @param {Event} e
 */
const handleLikeCard = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

/**
 *
 * @param {Event} e
 * @param {string} cardId
 */
const handleDeleteCard = (e, cardId) => {
  deleteCard(cardId)
    .then((_) => {
      e.target.closest('.card').remove();
    })
    .catch(console.log);
};

export { createCardElement, handleLikeCard, handleDeleteCard };
