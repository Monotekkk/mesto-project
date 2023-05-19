import {
    requestPathInfo
} from './api';
const nameInput = document.querySelector('#name-input'),
    aboutInput = document.querySelector('#about-input'),
    avatarHref = document.querySelector('#updateAvatar-input'),
    profieName = document.querySelector('.profile__name'),
    profileProfi = document.querySelector('.profile__profi'),
    profileAvatar = document.querySelector('.profile__avatar'),
    popupEditProfile = document.querySelector('.popup_edit-profile'),
    popupUpdateAvatar = document.querySelector('.popup_update-avatar'),
    popupAddCard = document.querySelector('.popup_add-card');

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscPopup);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscPopup);
}

function closeEscPopup(e) {
    if (e.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function showPopupEditProfile() {
    nameInput.value = profieName.textContent;
    aboutInput.value = profileProfi.textContent;
    openPopup(popupEditProfile);
}

function showPopupAddCard() {
    openPopup(popupAddCard);
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    popupEditProfile.querySelector('.popup__button').value = 'Сохранение...';
    requestPathInfo({
        name: nameInput.value,
        about: aboutInput.value
    }, popupEditProfile, 'users/me').then(()=>{
        profieName.textContent = nameInput.value;
        profileProfi.textContent = aboutInput.value;
        closePopup(popupEditProfile);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }).finally(() => {
        popupEditProfile.querySelector('.popup__button').value = 'Сохранить';
    });
}

function updateAvatar() {
    popupUpdateAvatar.querySelector('.popup__button').value = 'Сохранение...';
    requestPathInfo({
        avatar: avatarHref.value
    }, popupUpdateAvatar, 'users/me/avatar').then(()=>{
        profileAvatar.src = avatarHref.value;
        closePopup(popupUpdateAvatar);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }).finally(() => {
        popupUpdateAvatar.querySelector('.popup__button').value = 'Сохранить';
    });

}
export {
    showPopupEditProfile,
    showPopupAddCard,
    handleEditProfileFormSubmit,
    closePopup,
    openPopup,
    updateAvatar
};