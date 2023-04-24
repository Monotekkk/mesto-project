import './pages/index.css';
const closePopupButtonList = document.querySelectorAll('.popup__button_close'),
    popupEditProfile = document.querySelector('.popup_edit-profile'),
    popupAddCard = document.querySelector('.popup_add-card'),
    popupOverlayList = document.querySelectorAll('.popup'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    profileName = document.querySelector('.profile__name'),
    profileProfi = document.querySelector('.profile__profi'),
    formEditProfile = document.querySelector('#formEditProfile'),
    addCardButton = document.querySelector('.profile__add-button'),
    elementsContainer = document.querySelector('.elements'),
    popupImage = document.querySelector('.popup_image'),
    elementsTemplate = document.getElementById('elementsTemplate').content,
    inputProfileName = document.getElementById('name-input'),
    inputProfileProfi = document.getElementById('about-input'),
    imagePlace = document.querySelector('.popup__image'),
    imagePlaceTitle = document.querySelector('.popup__title_image'),
    placeName = document.getElementById('placeName-input'),
    placeHref = document.getElementById('placeHref-input'),
    initialCards = [{
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function showPopupEditProfile() {
    inputProfileName.value = profileName.textContent;
    inputProfileProfi.value = profileProfi.textContent;
    openPopup(popupEditProfile);
}

function showPopupAddCard() {
    openPopup(popupAddCard);
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = document.querySelector('#name-input').value;
    profileProfi.textContent = document.querySelector('#about-input').value;
    closePopup(popupEditProfile);
}

function increaseImage(srcValue, nameValue) {
    openPopup(popupImage);
    imagePlace.src = srcValue;
    imagePlaceTitle.textContent = nameValue;
    imagePlace.alt = nameValue;
}

function addElement(srcValue, nameValue) {
    const element = elementsTemplate.querySelector('.element').cloneNode(true),
        elementImage = element.querySelector('.element__image');
    elementImage.src = srcValue;
    elementImage.alt = nameValue;
    element.querySelector('.element__attractions').textContent = nameValue;
    element.querySelector('.element__like').addEventListener('click', function (e) {
        e.target.classList.toggle('element__like_active');
    });
    element.querySelector('.element__trash').addEventListener('click', function () {
        const deleteItem = element.closest('.element');
        deleteItem.remove();
    });
    element.querySelector('.element__image').addEventListener('click', function (e) {
        increaseImage(srcValue, nameValue);
    });
    return element;
}

function renderCard(srcValue, nameValue) {
    elementsContainer.prepend(addElement(srcValue, nameValue));
};
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
closePopupButtonList.forEach(element => element.addEventListener('click', () => {
    closePopup(document.querySelector('.popup_opened'));
}));
editProfileButton.addEventListener('click', showPopupEditProfile);
addCardButton.addEventListener('click', showPopupAddCard);
initialCards.forEach(element => {
    renderCard(element.link, element.name)
});
popupAddCard.addEventListener('submit', (e) => {
    e.preventDefault();
    renderCard(placeHref.value, placeName.value);
    e.target.reset();
    closePopup(popupAddCard);
});
popupOverlayList.forEach(element => {
    element.addEventListener('click', (e)=>{
        closePopup(e.target);
    })
});

/* Валидация */
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = ' ';
}

function isValid(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Поле могут содержать только латинские буквы, кириллические буквы, знаки дефиса и пробелы.");
  } else {
    inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input')),
        buttonElement = formElement.querySelector('.popup__button');
            toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_inactive');
    }
}
enableValidation();

