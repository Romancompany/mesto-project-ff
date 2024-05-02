import './pages/index.css';
import { createCard } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

const keyEsc = 27;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
function fillCards(cards) {
    cards.forEach(element => { cardContainer.append(createCard(element)); });
}

fillCards(initialCards);

// секция [profile]
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const cardAddButton = profile.querySelector('.profile__add-button');

// Окно редактирования профиля [popup_type_edit]
const popupProfile = document.querySelector('.popup_type_edit');
const closeProfile = popupProfile.querySelector('.popup__close'); 
const formProfile = popupProfile.querySelector('.popup__form'); 
const nameInput = formProfile.querySelector('.popup__input_type_name');  
const jobInput = formProfile.querySelector('.popup__input_type_description'); 

// Окно новой карточки [popup_type_new-card]
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeNewCard = popupNewCard.querySelector('.popup__close'); 
const formNewCard = popupNewCard.querySelector('.popup__form'); 
const nameNewCard = formNewCard.querySelector('.popup__input_type_card-name');  
const linkNewCard = formNewCard.querySelector('.popup__input_type_url'); 

// Окно изображения [popup_type_image]
const popupImage = document.querySelector('.popup_type_image');
const closeImage = popupImage.querySelector('.popup__close'); 
const nameImage = popupImage.querySelector('.popup__caption');  
const imgImage = popupImage.querySelector('.popup__image');  

// Обработчик кнопки редактирования профиля
function handleProfileEditButtonClick(evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popupProfile);
}
// Прикрепляем обработчик к кнопке редактирования  
profileEditButton.addEventListener('click', handleProfileEditButtonClick);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 
    const formSubmit = evt.target;
    const popup = formSubmit.closest('.popup');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    formSubmit.reset();
    closeModal(popup);
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleFormProfileSubmit);

/*
const escKeyDownHandler =  (event, domElement) => {
    if (event.keyCode === 27) closeModal(domElement);
};
const handleKeyDown = (event) => escKeyDownHandler(event, domElement)
document.addEventListener('keydown', handleKeyDown )
removeListener("...", handleKeyDown )
*/

/*
// Находим форму в DOM
const formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = // Воспользуйтесь инструментом .querySelector()
const jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
*/