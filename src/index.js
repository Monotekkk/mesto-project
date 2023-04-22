import './pages/index.css';
const closePopupButtonList = document.querySelectorAll('.popup__button_close'),
    popupEditProfile = document.querySelector('.popup_edit-profile'),
    popupAddCard = document.querySelector('.popup_add-card'),
    popupForm = document.querySelector('.popup__form'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    profileName = document.querySelector('.profile__name'),
    profileProfi = document.querySelector('.profile__profi'),
    popupIput = popupForm.querySelector('.popup__input'),
    formEditProfile = document.querySelector('#formEditProfile'),
    addCardButton = document.querySelector('.profile__add-button'),
    elementsContainer = document.querySelector('.elements'),
    popupImage = document.querySelector('.popup_image'),
    elementsTemplate = document.getElementById('elementsTemplate').content,
    inputProfileName = document.getElementById('name-input'),
    inputProfileProfi = document.getElementById('about-input'),
    imagePlace = document.querySelector('.popup__image'),
    imagePlaceTitle = document.querySelector('.popup__title_image'),
    placeName = document.getElementById('inputPlaceName'),
    placeHref = document.getElementById('inputPlaceHref'),
    popupError = popupForm.querySelector(`.${popupIput.id}-error`),
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
    profileName.textContent = document.querySelector('#inputProfileName').value;
    profileProfi.textContent = document.querySelector('#inputProfileProfi').value;
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
function showInputError(element, errorMessage){
    element.classList.add('popup__input_type_error');
    popupError.textContent = errorMessage;
    popupError.classList.add('popup__input-error_active');
};
function hideInputError(element){
    element.classList.remove('popup__input_type_error');
    popupError.textContent = ' ';
    popupError.classList.remove('popup__input-error_active');
};
function isValid(){
    if(!popupIput.validity.valid){
        showInputError(popupIput, popupIput.validationMessage);
    } else {
        hideInputError(popupIput);
    }
}
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
popupIput.addEventListener('input', isValid);