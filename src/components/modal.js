const classOpened = 'popup_is-opened';

// Открыть попап
function openModal(popup) {
    popup.classList.add(classOpened);
    document.addEventListener('keydown', handleCloseKeyESC);
}

// Закрыть попап
function closeModal(popup) {
    popup.classList.remove(classOpened);
    document.removeEventListener('keydown', handleCloseKeyESC);
}

// Обработчик закрытия попап по оверлею
function handleOverlayClick(evt) { 
    const target = evt.target;
    if (evt.currentTarget === target) { closeModal(target); }
} 

// Обработчик закрытия popup по клавише ESC
function handleCloseKeyESC(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.' + classOpened);
        closeModal(popup);
    } 
}

export { openModal, closeModal, handleOverlayClick };