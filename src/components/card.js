import { deleteCard, putLikeCard, deleteLikeCard } from './api.js';

const classLike = 'card__like-button_is-active';
const classPlaces = 'places__item';
// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// Функция создания карточки
function setCountLikeCard(cardElement, countLike) {
    const cardLikeCount = cardElement.querySelector('.card__like-count');

    cardLikeCount.textContent = countLike;
}


// Функция создания карточки
function createCard(cardData, idProfile, handleRemoveCard, handleLikeCard, handleImageCard) {
    const newCard = templateCard.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    const cardLikeButton = newCard.querySelector('.card__like-button');
    const cardElement = newCard.querySelector('.' + classPlaces);

    cardElement.id = cardData._id;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardData.likes.some(user => {
        const isLike = (user._id === idProfile);
        if (isLike) {
            cardLikeButton.classList.add(classLike);
        }
        return isLike;
    });
    setCountLikeCard(newCard, cardData.likes.length);

    if (cardData.owner._id === idProfile) {
        cardDeleteButton.addEventListener('click', handleRemoveCard);
    } else {
        cardDeleteButton.classList.add('card__delete-button_hidden');
    }

    cardLikeButton.addEventListener('click', handleLikeCard);
    cardImage.addEventListener('click', handleImageCard);

    return newCard;
}

// Функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

// Обработчик лайка карточки
function handleLikeCardClick(evt) {
    const button = evt.target;
    const cardElement = button.closest('.' + classPlaces);

    if (!button.classList.contains(classLike)) {
        putLikeCard(cardElement.id)
        .then(card => { 
            button.classList.add(classLike);
            setCountLikeCard(cardElement, card.likes.length); 
        })
        .catch(err => console.log(err) );
    } else {
        deleteLikeCard(cardElement.id)
        .then(card => { 
            button.classList.remove(classLike);
            setCountLikeCard(cardElement, card.likes.length); 
        })
        .catch(err => console.log(err) );
    }
}

// Обработчик удаления карточки по кнопке удаления
function handleRemoveCardClick(evt) {
    const button = evt.target;
    const cardElement = button.closest('.' + classPlaces);

    deleteCard(cardElement.id)
    .then(res => {
        //{"message":"Пост удалён"}
        if (res.message === "Пост удалён") {
            removeCard(cardElement);
        } else {
            alert('Ошибка удаления карточки на сервере');
        }
     })
     .catch(err => console.log(err) );
}

export { createCard, handleLikeCardClick, handleRemoveCardClick };