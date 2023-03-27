const closePopupButton = document.querySelectorAll('.popup__button_close'),
    popup = document.querySelectorAll('.popup'),
    popupEditProfile = document.querySelector('.popup_edit-profile'),
    popupAddCard = document.querySelector('.popup_add-card'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    profileName = document.querySelector('.profile__name'),
    profileProfi = document.querySelector('.profile__profi'),
    popupIput = document.querySelectorAll('.popup__input'),
    formElement = document.querySelector('.popup__form'),
    addCardButton = document.querySelector('.profile__add-button'),
    elementsContainer = document.querySelector('.elements'),
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

function closePopup(e) {
    popupEditProfile.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
}

function showPopup(e) {
    if (e.target == editProfileButton) {
        popupIput[0].value = profileName.textContent;
        popupIput[1].value = profileProfi.textContent;
        popupEditProfile.classList.add('popup_opened');
    } else if (e.target == addCardButton) {
        popupAddCard.classList.add('popup_opened');
    } else {
        console.log('error');
    }

}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupIput[0].value;
    profileProfi.textContent = popupIput[1].value;
    closePopup();
}

function renderElements(srcValue, nameValue) {
    const elementsTemplate = document.querySelector('#elementsTemplate').content,
        element = elementsTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = srcValue;
    element.querySelector('.element__attractions').textContent = nameValue;
    elementsContainer.append(element);
    element.querySelector('.element__like').addEventListener('click', function (e) {
        e.target.classList.toggle('element__like_active');
    });
}
formElement.addEventListener('submit', handleFormSubmit);
closePopupButton.forEach(element => element.addEventListener('click', closePopup));
editProfileButton.addEventListener('click', showPopup);
addCardButton.addEventListener('click', showPopup);
for (i = 0; i < 6; i++) {
    renderElements(initialCards[i].link, initialCards[i].name);
}
popupAddCard.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = popupIput[2].value;
    let href = popupIput[3].value;
    renderElements(href, name);
    closePopup();
});