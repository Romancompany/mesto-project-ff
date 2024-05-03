import './pages/index.css';
import { createCard, removeCard } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

// код клавиши ESC
const keyESC = 27;

// Контейнер для списка карточек
const cardContainer = document.querySelector('.places__list');

// Профиль [profile]
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const cardAddButton = profile.querySelector('.profile__add-button');

// Окно редактирования профиля [popup_type_edit]
const popupProfile = document.querySelector('.popup_type_edit');
//const closeProfile = popupProfile.querySelector('.popup__close'); 
const formProfile = popupProfile.querySelector('.popup__form'); 
const nameInput = formProfile.querySelector('.popup__input_type_name');  
const jobInput = formProfile.querySelector('.popup__input_type_description'); 

// Окно новой карточки [popup_type_new-card]
const popupNewCard = document.querySelector('.popup_type_new-card');
//const closeNewCard = popupNewCard.querySelector('.popup__close'); 
const formNewCard = popupNewCard.querySelector('.popup__form'); 
const nameNewCard = formNewCard.querySelector('.popup__input_type_card-name');  
const linkNewCard = formNewCard.querySelector('.popup__input_type_url'); 

// Окно изображения [popup_type_image]
const popupImgCard = document.querySelector('.popup_type_image');
//const closeImage = popupImgCard.querySelector('.popup__close'); 
const titleImgCard = popupImgCard.querySelector('.popup__caption');  
const photoImgCard = popupImgCard.querySelector('.popup__image');  

// массив попапов
const popups = [popupProfile,popupNewCard,popupImgCard];

document.addEventListener('click', function(evt) { console.log(evt); } );

// обработчик закрытия popup по клавише ESC
function handleCloseKeyESC(evt) {
    if (evt.keyCode === keyESC) {
        popups.forEach(popup => { closeModal(popup); });
    } 
}

// Обработчик по клику мышки кнопки редактирования профиля
function handleProfileEditClick(evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popupProfile, handleCloseKeyESC);
}
// Прикрепляем обработчик
profileEditButton.addEventListener('click', handleProfileEditClick);

// Обработчик по клику мышки кнопки редактирования профиля
function handleCardAddClick(evt) {
    openModal(popupNewCard, handleCloseKeyESC);
}
// Прикрепляем обработчик
cardAddButton.addEventListener('click', handleCardAddClick);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const form = evt.target;
    const popup = form.closest('.popup');

    switch (form) {
        case  formProfile:
            profileName.textContent = nameInput.value;
            profileJob.textContent = jobInput.value;
            break;
        case  formNewCard:
            const cards = [
                {
                  name: nameNewCard.value,
                  link: linkNewCard.value
                }
            ];
            fillCards(cards, cardContainer, createCard);
            break;
    }

    closeModal(popup);
    form.reset();
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormSubmit);

// прикрепляем обработчик закрытия всем попап
function closeListener() {
    // прикрепляем обработчик закрытия попап по кнопке закрытия
    popups.forEach(popup => {
        const button = popup.querySelector('.popup__close');
        button.addEventListener('click', function() { closeModal(popup); });
    }
    );
}

// прикрепляем обработчик закрытия всем попап
closeListener();

// Заполнить страницу карточками из массива
fillCards(initialCards);

// Обработчик удаления карточки по кнопке удаления
function handleRemoveCardClick(evt) {
    const button = evt.target;
    const itemCard = button.closest('.places__item');
    removeCard(itemCard);
}

// Обработчик лайка карточки
function handleLikeCardClick(evt) {
    const button = evt.target;
    button.classList.toggle('card__like-button_is-active');
}

// Обработчик открытия попап изображения
function handleImageCardClick(evt) {
    const image = evt.target;
    photoImgCard.src = image.src;
    photoImgCard.alt = image.alt;
    titleImgCard.textContent = image.alt;
    openModal(popupImgCard, handleCloseKeyESC);
}

// Заполнить страницу карточками
function fillCards(cards) {
    cards.forEach(element => { 
        const newCard = createCard(element, handleRemoveCardClick, handleLikeCardClick, handleImageCardClick);
        cardContainer.append(newCard); 
                             }
                 );
}