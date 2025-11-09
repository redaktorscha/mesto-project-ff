import { deleteCard, Card, incrementLikes, decrementLikes } from './api.js';

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
    deleteButton.addEventListener('click', (e) => onDelete(e, cardData._id));
  }

  if (onShow) {
    cardImage.addEventListener('click', onShow);
  }

  if (onLike) {
    cardLikeBtn.addEventListener('click', (e) => onLike(e, cardData._id));
  }

  return cardElement;
};

/**
 *
 * @param {Event} e
 * @param {string} cardId
 */
const handleLikeCard = (e, cardId) => {
  // delete like
  if (e.target.classList.contains('card__like-button_is-active')) {
    decrementLikes(cardId)
      .then((card) => {
        // todo update card likes & remove card__like-button_is-active class
      })
      .catch(console.log);
  } else {
    // put like
    incrementLikes(cardId)
      .then((card) => {
        // todo update card & add card__like-button_is-active class
      })
      .catch(console.log);
  }

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
