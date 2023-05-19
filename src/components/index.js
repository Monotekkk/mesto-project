import '../pages/index.css';
import {
    enableValidation,
} from './validate.js';
import {
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
import {
    requestGetCard,
    requestUserInfo
} from './api';
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
    profileAvatar = document.querySelector('.profile__avatar'),
    profileAvatarBtn = document.querySelector('.profile__avatar-button');
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formUpdateAvatar.addEventListener('submit', updateAvatar);
closePopupButtonList.forEach(element => element.addEventListener('click', (e) => {
    closePopup(document.querySelector('.popup_opened'));

}));
editProfileButton.addEventListener('click', showPopupEditProfile);
addCardButton.addEventListener('click', showPopupAddCard);
popupAddCard.addEventListener('submit', (e) => {
    e.preventDefault();
    addCardToServer({
        placeHref: placeHref.value,
        placeName: placeName.value
    }, e)

});
popupOverlayList.forEach(element => {
    element.addEventListener('click', (e) => {
        closePopup(e.target);
    })
});
profileAvatarBtn.addEventListener('click', () => {
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
Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
        requestUserInfo(),
        requestGetCard()
    ])
    .then(([info, initialCards]) => { //попадаем сюда, когда оба промиса будут выполнены, деструктурируем ответ
        profieName.textContent = info.name;
        profileProfi.textContent = info.about;
        profileAvatar.src = info.avatar;
        initialCards.reverse();
        renderInitalCard(initialCards,info._id); //все данные получены, отрисовываем страницу
    })
    .catch((err) => { //попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
    })
