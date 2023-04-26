import '../pages/index.css';
import { enableValidation } from './validate.js';
import { renderCard } from './card';
import {showPopupEditProfile, showPopupAddCard, handleEditProfileFormSubmit, closePopup} from './modal';
const closePopupButtonList = document.querySelectorAll('.popup__button_close'),
    popupAddCard = document.querySelector('.popup_add-card'),
    popupOverlayList = document.querySelectorAll('.popup'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    formEditProfile = document.querySelector('#formEditProfile'),
    addCardButton = document.querySelector('.profile__add-button'),
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
    e.target.querySelector('.popup__button').classList.add('popup__button_inactive')
    closePopup(popupAddCard);

});
popupOverlayList.forEach(element => {
    element.addEventListener('click', (e) => {
        closePopup(e.target);
    })
});
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
