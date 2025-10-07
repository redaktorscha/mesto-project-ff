/**
 *
 * @param {{name: string, link: string}} data
 * @param {HTMLElement} template
 * @param {Function} onDelete
 * @param {Function} onShow
 * @param {Function} onLike
 * @returns {HTMLElement}
 */
function createCardElement(data, template, onDelete, onShow, onLike) {
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
}

/**
 *
 * @param {HTMLImageElement} imageElem
 * @param {HTMLImageElement} imageCaption
 * @param {{name: string, link: string}} imageData
 * @param {HTMLElement} openPictureModal
 * @returns {Function}
 */
function handleShowCard(imageElem, imageCaption, imageData, openPictureModal) {
  return function () {
    imageElem.src = imageData.link;
    imageElem.alt = imageData.name;
    imageCaption.textContent = imageData.name;
    openModal(openPictureModal);
  };
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
  e.target.closest('.card').remove();
}

export { createCardElement, handleShowCard, handleLikeCard, handleDeleteCard };
