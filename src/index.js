import "./pages/index.css";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// DOM узлы
const placesWrap = document.querySelector(".places__list");

function createCardElement(data, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  return cardElement;
}

// должна быть отдельной функций, можно стрелочной
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

// можно сделать и через простой цикл
initialCards.forEach((data) => {
  placesWrap.append(createCardElement(data, handleDeleteCard));
});
