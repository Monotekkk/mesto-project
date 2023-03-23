const closePopupButton = document.querySelectorAll('.popup__button_close'),
    popup = document.querySelectorAll('.popup'),
    popupEditProfile =document.querySelector('.popup_edit-profile'),
    popupAddCard = document.querySelector('.popup_add-card'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    profileName = document.querySelector('.profile__name'),
    profileProfi = document.querySelector('.profile__profi'),
    popupIput = document.querySelectorAll('.popup__input'),
    formElement = document.querySelector('.popup__form'),
    addCardButton = document.querySelector('.profile__add-button');
function closePopup(){
    popupEditProfile.classList.remove('popup_opened');
}
function showPopup(e){
    if(e.target == editProfileButton){
        popupIput[0].value=profileName.textContent;
        popupIput[1].value=profileProfi.textContent;
        popupEditProfile.classList.add('popup_opened');
    }else if(e.target == addCardButton){
        popupAddCard.classList.add('popup_opened');
    }else{
        console.log('error');
    }

}
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupIput[0].value;
    profileProfi.textContent = popupIput[1].value;
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);
closePopupButton.forEach(element => {
    element.addEventListener('click', closePopup);
});
editProfileButton.addEventListener('click', showPopup);
addCardButton.addEventListener('click', showPopup);
