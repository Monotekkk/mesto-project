function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function showPopupEditProfile() {
    document.getElementById('name-input').value = document.querySelector('.profile__name').textContent;
    document.getElementById('about-input').value = document.querySelector('.profile__profi').textContent;
    openPopup(document.querySelector('.popup_edit-profile'));
}

function showPopupAddCard() {
    openPopup(document.querySelector('.popup_add-card'));
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = document.querySelector('#name-input').value;
    document.querySelector('.profile__profi').textContent = document.querySelector('#about-input').value;
    closePopup(document.querySelector('.popup_edit-profile'));
}
export {showPopupEditProfile, showPopupAddCard, handleEditProfileFormSubmit, closePopup, openPopup};