import { getOpenedModal } from './utils';

/**
 *
 * @param {HTMLElement} modalElem
 */
const openModal = (modalElem) => {
  modalElem.classList.add('popup_is-opened');
  onOpenModal();
};

/**
 *
 * @param {HTMLElement} modalElem
 */
const closeModal = (modalElem) => {
  modalElem.classList.remove('popup_is-opened');
  onCloseModal();
};

const onOpenModal = () => {
  document.addEventListener('keydown', closeModalOnKeyDown);
};

const onCloseModal = () => {
  document.removeEventListener('keydown', closeModalOnKeyDown);
};

/**
 *
 * @param {Event} e
 */
const closeModalOnKeyDown = (e) => {
  if (e.key === 'Escape') {
    const openedModal = getOpenedModal();
    closeModal(openedModal, onCloseModal);
  }
};

/**
 *
 * @param {Event} e
 * @param {NodeList} closeModalBtns
 */
const handleCloseModalOnBtnClick = (e, closeModalBtns) => {
  const clickedElem = e.target;
  const currentTarget = e.currentTarget;
  const openedModal = getOpenedModal();
  const isCloseBtnClicked = [...closeModalBtns].includes(clickedElem);
  const isModalBackdropClicked = clickedElem === currentTarget;
  if (isCloseBtnClicked || isModalBackdropClicked) {
    closeModal(openedModal);
  }
};

export { openModal, closeModal, handleCloseModalOnBtnClick };
