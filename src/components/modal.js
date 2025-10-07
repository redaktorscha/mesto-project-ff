import { getOpenedModal } from './utils';

/**
 *
 * @param {HTMLElement} modalElem
 */
function openModal(modalElem) {
  modalElem.classList.add('popup_is-opened');
  onOpenModal();
}

/**
 *
 * @param {HTMLElement} modalElem
 */
function closeModal(modalElem) {
  modalElem.classList.remove('popup_is-opened');
  onCloseModal();
}

function onOpenModal() {
  document.addEventListener('keydown', closeModalOnKeyDown);
}

function onCloseModal() {
  document.removeEventListener('keydown', closeModalOnKeyDown);
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

/**
 *
 * @param {Event} e
 * @param {NodeList} closeModalBtns
 */
function handleCloseModalOnBtnClick(e, closeModalBtns) {
  const clickedElem = e.target;
  const currentTarget = e.currentTarget;
  const openedModal = getOpenedModal();
  const isCloseBtnClicked = [...closeModalBtns].includes(clickedElem);
  const isModalBackdropClicked = clickedElem === currentTarget;
  if (isCloseBtnClicked || isModalBackdropClicked) {
    closeModal(openedModal);
  }
}

export { openModal, closeModal, handleCloseModalOnBtnClick };
