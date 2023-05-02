import { openPopup } from "./modal";
const imagePlace = document.querySelector('.popup__image'),
    imagePlaceTitle = document.querySelector('.popup__title_image'),
    elementsContainer = document.querySelector('.elements'),
    popupImage = document.querySelector('.popup_image'),
    elementsTemplate = document.querySelector('#elementsTemplate').content;

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
function сounterLikes(count){
    document.querySelector('.element__likes').textContent = count.length;
}
function renderInitalCard(){
   fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
    headers: {
      authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
    },
    method: 'GET'
  })
    .then(res => res.json())
    .then((result) => {
        result.forEach(element => {
            renderCard(element.link,element.name);
            сounterLikes(element.likes);
        });

    });
}
function addCardToServer(srcValue, nameValue){
    fetch('https://nomoreparties.co/v1/plus-cohort-23/cards/', {
        headers: {
          authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: nameValue,
            link: srcValue
        }),
      })
}
export {
    renderCard, renderInitalCard, addCardToServer
};