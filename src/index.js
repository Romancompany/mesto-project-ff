import './pages/index.css';
import { createCard, handleLikeCardClick, handleRemoveCardClick } from './components/card.js';
//import { initialCards } from './components/cards.js';
import { openModal, closeModal, handleOverlayClick } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getProfile, patchProfile, postCard } from './components/api.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
  
// Контейнер для списка карточек
const cardContainer = document.querySelector('.places__list');

// Профиль [profile]
const profile = document.querySelector('.profile');
const profileImage = profile.querySelector('.profile__image');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const cardAddButton = profile.querySelector('.profile__add-button');

// Окно редактирования профиля [popup_type_edit]
const popupProfile = document.querySelector('.popup_type_edit');
const formProfile = popupProfile.querySelector('.popup__form'); 
const nameInput = formProfile.querySelector('.popup__input_type_name');  
const jobInput = formProfile.querySelector('.popup__input_type_description'); 

// Окно новой карточки [popup_type_new-card]
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form'); 
const nameNewCard = formNewCard.querySelector('.popup__input_type_card-name');  
const linkNewCard = formNewCard.querySelector('.popup__input_type_url'); 

// Окно изображения [popup_type_image]
const popupImgCard = document.querySelector('.popup_type_image');
const titleImgCard = popupImgCard.querySelector('.popup__caption');  
const photoImgCard = popupImgCard.querySelector('.popup__image');  

//
let idProfile;

// Обработчик по клику мышки кнопки редактирования профиля
function handleProfileEditClick(evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(formProfile, validationConfig);
    openModal(popupProfile);
}

// Прикрепляем обработчик редактирования профиля
profileEditButton.addEventListener('click', handleProfileEditClick);

// Обработчик по клику мышки кнопки добавления новой карточки
function handleCardAddClick(evt) {
    nameNewCard.value = '';
    linkNewCard.value = '';
    clearValidation(popupNewCard, validationConfig);
    openModal(popupNewCard);
}

// Прикрепляем обработчик добавления новой карточки
cardAddButton.addEventListener('click', handleCardAddClick);

// Обработчик «отправки» формы профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 

    patchProfile(nameInput.value, jobInput.value)
    .then( profile => {
        if (profile.name === nameInput.value && profile.about === jobInput.value) {
            profileName.textContent = nameInput.value;
            profileJob.textContent = jobInput.value;
        } else {
            alert('Ошибка сохранения профиля на сервере');
        }
    })
    .catch(err => console.log(err) );

    closeModal(popupProfile);
}

// Прикрепляем обработчик «отправки» к форме профиля
formProfile.addEventListener('submit', handleFormProfileSubmit);

// Обработчик «отправки» формы новой карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault(); 

    postCard(nameNewCard.value, linkNewCard.value)
    .then(card => {
        if (card.name === nameNewCard.value && card.link === linkNewCard.value) {
            const newCard = createCard(card, idProfile, handleRemoveCardClick, handleLikeCardClick, handleImageCardClick);
            cardContainer.prepend(newCard); 
        } else {
            alert('Ошибка добавления карточки на сервер');
        }
     })
     .catch(err => console.log(err) );
/*
    {
        "likes": [],
        "_id": "6655b73870b696002b945cfb",
        "name": "TestNRB",
        "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        "owner": {
            "name": "Николаев Роман",
            "about": "программист",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
            "_id": "3bfc9fecbf5409d0e3c56c38",
            "cohort": "wff-cohort-14"
        },
        "createdAt": "2024-05-28T10:51:36.227Z"
    }    
*/
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
        const newCard = createCard(element, idProfile, handleRemoveCardClick, handleLikeCardClick, handleImageCardClick);
        cardContainer.append(newCard); 
    }
    );
}

// Заполнить страницу карточками
function fillProfile(profile) {
    profileName.textContent = profile.name;
    profileJob.textContent = profile.about;
    profileImage.style = `background-image: url("${profile.avatar}")`;
/*
    {
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
        "_id": "3bfc9fecbf5409d0e3c56c38",
        "cohort": "wff-cohort-14"
    }
*/
}

// Инициализировать прикрепление обработчиков
initPopupCloseListeners();

// Заполнить профиль и карточки
Promise.all([getInitialCards(), getProfile()])
.then(results => {
    const cards = results[0];   // массив карточек
    const profile = results[1]; // профиль

    // Заполнить профиль
    fillProfile(profile); 
    idProfile = profile._id;
    // Заполнить страницу карточками /* fillCards(initialCards); */
    fillCards(cards);
})
.catch(err => console.log(err) );
  
// включение валидации вызовом enableValidation
enableValidation(validationConfig);