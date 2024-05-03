// функция обработчик
let handleESC;

function openModal(popup, handleCloseESC) {
    popup.classList.add('popup_is-opened');
    if (!handleESC) {
        handleESC = handleCloseESC;
    }
    document.addEventListener('keydown', handleESC);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleESC);
}

/*
const escKeyDownHandler =  (event, domElement) => {
    if (event.keyCode === 27) closeModal(domElement);
};
const handleKeyDown = (event) => escKeyDownHandler(event, domElement)
document.addEventListener('keydown', handleKeyDown )
removeListener("...", handleKeyDown )
*/

export { openModal, closeModal };