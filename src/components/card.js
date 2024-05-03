// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;
// функции обработчики
let handleRemove;
let handleLike;
let handleImage;

// Функция создания карточки
function createCard(element, handleRemoveCard, handleLikeCard, handleImageCard) {
    const newCard = templateCard.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    const cardLikeButton = newCard.querySelector('.card__like-button');

    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;

    if (!handleRemove) {
        handleRemove = handleRemoveCard;
    }

    if (!handleLike) {
        handleLike = handleLikeCard;
    }

    if (!handleImage) {
        handleImage = handleImageCard;
    }

    cardDeleteButton.addEventListener('click', handleRemove);
    cardLikeButton.addEventListener('click', handleLike);
    cardImage.addEventListener('click', handleImage);

    return newCard;
}

// Функция удаления карточки
function removeCard(itemCard) {
    const cardDeleteButton = itemCard.querySelector('.card__delete-button');
    const cardLikeButton = itemCard.querySelector('.card__like-button');
    const cardImage = itemCard.querySelector('.card__image');

    cardDeleteButton.removeEventListener('click', handleRemove);
    cardLikeButton.removeEventListener('click', handleLike);
    cardImage.removeEventListener('click', handleImage);

    itemCard.remove();
}

export { createCard, removeCard };