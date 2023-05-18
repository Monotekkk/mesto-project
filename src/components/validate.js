/* Валидация */
function showInputError(formElement, inputElement, errorMessage, values) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(values.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(values.errorClass);
}

function hideInputError(formElement, inputElement, values) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(values.inputErrorClass);
    errorElement.classList.remove(values.errorClass);
    errorElement.textContent = ' ';
}

function isValid(formElement, inputElement, values) {
    if (inputElement.validity.patternMismatch) {
        console.log(values);
        inputElement.setCustomValidity(inputItem.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, values);
    } else {
        hideInputError(formElement, inputElement, values);
    }
}

function setEventListeners(formElement, values) {
    const inputList = Array.from(formElement.querySelectorAll(values.inputSelector)),
        buttonElement = formElement.querySelector(values.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, values);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement, values);
            toggleButtonState(inputList, buttonElement, values);
        });
    });
};

function enableValidation(values) {
    const formList = Array.from(document.querySelectorAll(values.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, values);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function buttonDisabled(buttonElement, inactiveButtonClass) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
}

function toggleButtonState(inputList, buttonElement, values) {
    if (hasInvalidInput(inputList)) {
        buttonDisabled(buttonElement, values.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(values.inactiveButtonClass);
    }
}
export {
    enableValidation,
    buttonDisabled
};