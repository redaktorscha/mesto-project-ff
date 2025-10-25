/**
 *
 * @param {{name: string, link: string}} data
 * @param {HTMLElement} template
 * @param {{onDelete: Function, onShow: Function, onLike: Function}} createConfig
 * @returns {HTMLElement}
 */
const createCardElement = (
  data,
  template,
  { onDelete, onShow, onLike } = {},
) => {
  const cardElement = template.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector('.card__title').textContent = data.name;

  deleteButton.addEventListener('click', onDelete);

  cardImage.addEventListener('click', onShow);

  cardLikeBtn.addEventListener('click', onLike);
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
 */
const handleDeleteCard = (e) => {
  e.target.closest('.card').remove();
};

export { createCardElement, handleShowCard, handleLikeCard, handleDeleteCard };
