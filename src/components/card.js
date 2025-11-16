import { deleteCard, Card, incrementLikes, decrementLikes } from './api.js';
import { openModal } from './modal.js';

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
  cardElement.dataset.id = cardData._id;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const isOwnCard = cardData.owner._id === userId;
  if (!isOwnCard) {
    deleteButton.classList.add('card__delete-button_is-hidden');
  }
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const { likes } = cardData;
  const likesCount = likes.length;
  if (likesCount > 0) {
    const likesContainer = cardElement.querySelector('.card__likes');
    const likesCounter = likesContainer.querySelector('.card__like-counter');
    likesCounter.textContent = `${likesCount}`;
    likesCounter.classList.add('card__like-counter_is-active');
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector('.card__title').textContent = cardData.name;

  if (onDelete && isOwnCard) {
    deleteButton.addEventListener('click', onDelete);
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
        // todo func
        const { likes } = card;
        const likesCount = likes.length;
        const likesContainer = e.target.closest('.card__likes');
        const likesCounter = likesContainer.querySelector(
          '.card__like-counter',
        );
        likesCounter.textContent = `${likesCount}`;
        e.target.classList.toggle('card__like-button_is-active');
      })
      .catch(console.log);
  } else {
    // put like
    incrementLikes(cardId)
      .then((card) => {
        // todo func
        const { likes } = card;
        const likesCount = likes.length;
        const likesContainer = e.target.closest('.card__likes');
        const likesCounter = likesContainer.querySelector(
          '.card__like-counter',
        );
        likesCounter.textContent = `${likesCount}`;
        e.target.classList.toggle('card__like-button_is-active');
      })
      .catch(console.log);
  }
};

/**
 *
 * @param {HTMLLiElement} cardElement
 * @param {string} cardId
 */
const handleDeleteCard = (cardElement, cardId) => {
  deleteCard(cardId)
    .then((_) => {
      cardElement.remove();
    })
    .catch(console.log);
};

export { createCardElement, handleLikeCard, handleDeleteCard };
