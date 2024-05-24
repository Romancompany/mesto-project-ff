import './pages/index.css';
import { createCard, handleLikeCardClick, handleRemoveCardClick } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal, handleOverlayClick } from './components/modal.js';

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
const formProfile = popupProfile.querySelector('.popup__form'); 
const nameInput = formProfile.querySelector('.popup__input_type_name');  
const jobInput = formProfile.querySelector('.popup__input_type_description'); 
const nameInputError = formProfile.querySelector(`.${nameInput.id}-error`);  
const jobInputError = formProfile.querySelector(`.${jobInput.id}-error`); 

// Окно новой карточки [popup_type_new-card]
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form'); 
const nameNewCard = formNewCard.querySelector('.popup__input_type_card-name');  
const linkNewCard = formNewCard.querySelector('.popup__input_type_url'); 
const nameNewCardError = formNewCard.querySelector(`.${nameNewCard.id}-error`);  
const linkNewCardError = formNewCard.querySelector(`.${linkNewCard.id}-error`); 

// Окно изображения [popup_type_image]
const popupImgCard = document.querySelector('.popup_type_image');
const titleImgCard = popupImgCard.querySelector('.popup__caption');  
const photoImgCard = popupImgCard.querySelector('.popup__image');  

// Обработчик по клику мышки кнопки редактирования профиля
function handleProfileEditClick(evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    //nameInputError.textContent = '';
    //jobInputError.textContent = '';
    openModal(popupProfile);
}

// Прикрепляем обработчик редактирования профиля
profileEditButton.addEventListener('click', handleProfileEditClick);

// Обработчик по клику мышки кнопки добавления новой карточки
function handleCardAddClick(evt) {
    nameNewCard.value = '';
    linkNewCard.value = '';
    //nameNewCardError.textContent = '';
    //linkNewCardError.textContent = '';
    openModal(popupNewCard);
}

// Прикрепляем обработчик добавления новой карточки
cardAddButton.addEventListener('click', handleCardAddClick);

// Обработчик «отправки» формы профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closeModal(popupProfile);
}

// Прикрепляем обработчик «отправки» к форме профиля
formProfile.addEventListener('submit', handleFormProfileSubmit);

// Обработчик «отправки» формы новой карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault(); 
    const card = {name: nameNewCard.value, link: linkNewCard.value}
    const newCard = createCard(card, handleRemoveCardClick, handleLikeCardClick, handleImageCardClick);

    cardContainer.prepend(newCard); 
    closeModal(popupNewCard);
}

// Прикрепляем обработчик «отправки» к форме новой карточки
formNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Прикрепляем обработчики закрытия всех попап
function initPopupCloseListeners() {
    const popups = [popupProfile, popupNewCard, popupImgCard];

    popups.forEach(popup => {
        const button = popup.querySelector('.popup__close');
        // прикрепляем обработчик закрытия попап по кнопке закрытия
        button.addEventListener('click', function() { closeModal(popup); });
        // прикрепляем обработчик закрытия попап по оверлею
        popup.addEventListener('click', handleOverlayClick);
    }
    );
}

// Инициализировать прикрепление обработчиков
initPopupCloseListeners();

// Заполнить страницу карточками из массива
fillCards(initialCards);

// Обработчик открытия попап изображения
function handleImageCardClick(evt) {
    const image = evt.target;
    photoImgCard.src = image.src;
    photoImgCard.alt = image.alt;
    titleImgCard.textContent = image.alt;
    openModal(popupImgCard);
}

// Заполнить страницу карточками
function fillCards(cards) {
    cards.forEach(element => { 
        const newCard = createCard(element, handleRemoveCardClick, handleLikeCardClick, handleImageCardClick);
        cardContainer.append(newCard); 
                             }
                 );
}