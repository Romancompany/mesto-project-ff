// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(element,delCard) {
    const tmpCard = templateCard.cloneNode(true);
    const imgCard = tmpCard.querySelector('.card__image');
    const titleCard = tmpCard.querySelector('.card__title');
    const deleteButtonCard = tmpCard.querySelector('.card__delete-button');

    imgCard.src = element.link;
    imgCard.alt = element.name;
    titleCard.textContent = element.name;
    deleteButtonCard.addEventListener('click', function(evt) { delCard(evt.target); } );

    return tmpCard;
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton) {
    deleteButton.parentElement.remove();
}

// @todo: Вывести карточки на страницу
function fillCards(Cards) {
    Cards.forEach(element => { cardContainer.append(createCard(element,deleteCard)); });
}

fillCards(initialCards);
