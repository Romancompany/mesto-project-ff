import { deleteCard } from './api.js';

const classLike = 'card__like-button_is-active';
const classPlaces = 'places__item';
// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(element, isSelf, handleRemoveCard, handleLikeCard, handleImageCard) {
    const newCard = templateCard.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    const cardLikeButton = newCard.querySelector('.card__like-button');
    const cardLikeCount = newCard.querySelector('.card__like-count');
    const itemCard = newCard.querySelector('.' + classPlaces);

    itemCard.id = element._id;
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;
    cardLikeCount.textContent = element.likes.length;

    if (isSelf) {
        cardDeleteButton.addEventListener('click', handleRemoveCard);
    } else {
        cardDeleteButton.classList.add('card__delete-button_hidden');
    }

    cardLikeButton.addEventListener('click', handleLikeCard);
    cardImage.addEventListener('click', handleImageCard);

    return newCard;
}

// Функция удаления карточки
function removeCard(itemCard) {
    itemCard.remove();
}

// Обработчик лайка карточки
function handleLikeCardClick(evt) {
    const button = evt.target;
    button.classList.toggle(classLike);
}

// Обработчик удаления карточки по кнопке удаления
function handleRemoveCardClick(evt) {
    const button = evt.target;
    const itemCard = button.closest('.' + classPlaces);

    if (deleteCard(itemCard.id)) {
        removeCard(itemCard);
    } else {
        alert('Ошибка удаления карточки на сервере');
    }
}

export { createCard, handleLikeCardClick, handleRemoveCardClick };