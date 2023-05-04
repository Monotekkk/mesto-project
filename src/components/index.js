import '../pages/index.css';
import {
    enableValidation,
    buttonDisabled
} from './validate.js';
import {
    renderCard,
    renderInitalCard,
    addCardToServer,
} from './card';
import {
    showPopupEditProfile,
    showPopupAddCard,
    handleEditProfileFormSubmit,
    closePopup,
    openPopup,
    updateAvatar
} from './modal';
const closePopupButtonList = document.querySelectorAll('.popup__button_close'),
    popupAddCard = document.querySelector('.popup_add-card'),
    popupOverlayList = document.querySelectorAll('.popup'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    formEditProfile = document.querySelector('#formEditProfile'),
    addCardButton = document.querySelector('.profile__add-button'),
    placeName = document.querySelector('#placeName-input'),
    placeHref = document.querySelector('#placeHref-input'),
    submitCardButton = popupAddCard.querySelector('.popup__button'),
    profieName = document.querySelector('.profile__name'),
    profileProfi = document.querySelector('.profile__profi'),
    formUpdateAvatar = document.querySelector('#formUpdateAvatar'),
    profileAvatar = document.querySelector('.profile__avatar');
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formUpdateAvatar.addEventListener('submit', updateAvatar);
closePopupButtonList.forEach(element => element.addEventListener('click', () => {
    closePopup(document.querySelector('.popup_opened'));
}));
editProfileButton.addEventListener('click', showPopupEditProfile);
addCardButton.addEventListener('click', showPopupAddCard);
popupAddCard.addEventListener('submit', (e) => {
    e.preventDefault();
    renderCard(placeHref.value, placeName.value);
    addCardToServer(placeHref.value, placeName.value);
    e.target.reset();
    buttonDisabled(submitCardButton, 'popup__button_inactive');
    closePopup(popupAddCard);

});
popupOverlayList.forEach(element => {
    element.addEventListener('click', (e) => {
        closePopup(e.target);
    })
});
profileAvatar.addEventListener('click', ()=>{
    openPopup(document.querySelector('.popup_update-avatar'));
});
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
renderInitalCard();
fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me', {
        headers: {
            authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372'
        },
        method: 'GET'
    }).then(res => res.json())
    .then((result) => {
        profieName.textContent = result.name;
        profileProfi.textContent = result.about;
        profileAvatar.src = result.avatar;
    });
