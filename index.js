const closePopupButtonList = document.querySelectorAll('.popup__button_close'),
    popupEditProfile = document.querySelector('.popup_edit-profile'),
    popupAddCard = document.querySelector('.popup_add-card'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    profileName = document.querySelector('.profile__name'),
    profileProfi = document.querySelector('.profile__profi'),
    popupIputList = document.querySelectorAll('.popup__input'),
    formElement = document.querySelector('#formEditProfile'),
    addCardButton = document.querySelector('.profile__add-button'),
    elementsContainer = document.querySelector('.elements'),
    popupImage = document.querySelector('.popup_image'),
    elementsTemplate = document.querySelector('#elementsTemplate').content,
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
    const popupParent = popup.parentElement.parentElement;
    popupParent.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function showPopup(e) {
    if (e.target == editProfileButton) {
        document.querySelector('#inputProfileName').value = profileName.textContent;
        document.querySelector('#inputProfileProfi').value = profileProfi.textContent;
        openPopup(popupEditProfile);
    } else if (e.target == addCardButton) {
        openPopup(popupAddCard);
    } else {
        console.log('error');
    }

}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = document.querySelector('#inputProfileName').value;
    profileProfi.textContent = document.querySelector('#inputProfileProfi').value;
    closePopup(evt.target);
}

function increaseImage(srcValue, nameValue) {
    popupImage.classList.add('popup_opened');
    const imagePlace = document.querySelector('.popup__image'),
    imagePlaceTitle = document.querySelector('.popup__title_image');
    imagePlace.src = srcValue;
    imagePlaceTitle.textContent = nameValue;
    imagePlace.alt = nameValue;
}

function addElement(srcValue, nameValue) {
    const element = elementsTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = srcValue;
    element.querySelector('.element__image').alt = nameValue;
    element.querySelector('.element__attractions').textContent = nameValue;
    renderCard(element);
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
}
function renderCard(card){
    elementsContainer.prepend(card);
};
formElement.addEventListener('submit', handleFormSubmit);
closePopupButtonList.forEach(element => element.addEventListener('click', () => {
    closePopup(element);
}));
editProfileButton.addEventListener('click', showPopup);
addCardButton.addEventListener('click', showPopup);
for (i = 0; i < 6; i++) {
    addElement(initialCards[i].link, initialCards[i].name);
}
popupAddCard.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.querySelector('#inputPlaceName').value,
     href = document.querySelector('#inputPlaceHref').value;
    addElement(href, name);
    e.target.reset();
    closePopup(e.target);
});
