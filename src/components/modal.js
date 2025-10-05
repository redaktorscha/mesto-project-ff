/**
 *
 * @param {HTMLElement} modalElem
 * @param {Function} onOpen
 */
function openModal(modalElem, onOpen) {
  modalElem.classList.add('popup_is-opened');
  onOpen();
}

/**
 *
 * @param {HTMLElement} modalElem
 * @param {Function} onClose
 */
function closeModal(modalElem, onClose) {
  modalElem.classList.remove('popup_is-opened');
  onClose();
}

export { openModal, closeModal };
