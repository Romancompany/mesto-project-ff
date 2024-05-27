// показать/скрыть сообщение об ошибке
const showError = true;
const hideError = false;
// добавления/удаление класса у элемента
const addClass = true;
const removeClass = false;

const setClass = (flagClass, element, className) => {
   if (flagClass) {
       element.classList.add(className);
   } else {
       element.classList.remove(className);
   }
}

const inputError = (flagError, validationConfig, formElement, inputElement, errorMessage='') => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const flagClass = (flagError ? addClass : removeClass);

  errorElement.textContent = (flagError ? errorMessage : '');
  setClass(flagClass, errorElement, validationConfig.errorClass);
  setClass(flagClass, inputElement, validationConfig.inputErrorClass);
};

const isValid = (validationConfig, formElement, inputElement) => {
  const textCustom = (inputElement.validity.patternMismatch ? inputElement.dataset.errorMessage : '');
  const flagError = (inputElement.validity.valid ? hideError : showError);

  inputElement.setCustomValidity(textCustom);
  inputError(flagError, validationConfig, formElement, inputElement, inputElement.validationMessage);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция вернёт true
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  const isInvalid = hasInvalidInput(inputList);
  const flagClass = (isInvalid ? addClass : removeClass);

  buttonElement.disabled = isInvalid;
  setClass(flagClass, buttonElement, validationConfig.inactiveButtonClass);
};

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(validationConfig, inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(validationConfig, formElement, inputElement);
        toggleButtonState(validationConfig, inputList, buttonElement);
      })
    });
  });
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputList.forEach((inputElement) => {
    inputError(hideError, validationConfig, formElement, inputElement);
  });
}

export { enableValidation, clearValidation };