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
    profieName.textContent = nameInput.value;
    profileProfi.textContent = aboutInput.value;
    closePopup(popupEditProfile);
    fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value,
            about: aboutInput.value
        })
    })
}

function updateAvatar() {
    fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me/avatar', {
            headers: {
                authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatarHref.value
            })
        }).then(res => res.json())
        .then((result) => {
            console.log(result);
        });
        profileAvatar.src = avatarHref.value;
        closePopup(popupUpdateAvatar);
}
export {
    showPopupEditProfile,
    showPopupAddCard,
    handleEditProfileFormSubmit,
    closePopup,
    openPopup,
    updateAvatar
};