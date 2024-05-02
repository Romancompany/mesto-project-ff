// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// @todo: Функция удаления карточки
function handleRemoveCard(evt) {
    const cardDeleteButton = evt.target;
    const itemCard = cardDeleteButton.closest('.places__item');

    cardDeleteButton.removeEventListener('click', handleRemoveCard);
    itemCard.remove();
}

// @todo: Функция создания карточки
function createCard(element) {
    const newCard = templateCard.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__title');
    const cardDeleteButton = newCard.querySelector('.card__delete-button');

    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;
    cardDeleteButton.addEventListener('click', handleRemoveCard);

    return newCard;
}

export { createCard };