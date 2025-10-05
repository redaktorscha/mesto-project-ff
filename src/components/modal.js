/**
 *
 * @param {HTMLElement} modalElem
 */
function openModal(modalElem) {
  modalElem.classList.add('popup_is-opened');
  // todo add listener close on esc
}

/**
 *
 * @param {HTMLElement} modalElem
 */
function closeModal(modalElem) {
  modalElem.classList.remove('popup_is-opened');
  // todo remove listener close on esc
}

export { openModal, closeModal };
