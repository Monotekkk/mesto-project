import { closePopup, openPopup } from "./modal";
import { requestSetLike, requestRemoveLike, requestDeleteCard, requestGetCard, requestPostCard } from "./api";
const imagePlace = document.querySelector('.popup__image'),
    imagePlaceTitle = document.querySelector('.popup__title_image'),
    elementsContainer = document.querySelector('.elements'),
    popupImage = document.querySelector('.popup_image'),
    popupDeleteCard = document.querySelector('.popup_delete-card'),
    popupAddCard = document.querySelector('.popup_add-card'),
    elementsTemplate = document.querySelector('#elementsTemplate').content;

function increaseImage(srcValue, nameValue) {
    openPopup(popupImage);
    imagePlace.src = srcValue;
    imagePlaceTitle.textContent = nameValue;
    imagePlace.alt = nameValue;
}

function addElement(srcValue, nameValue, elementId, owner) {
    const element = elementsTemplate.querySelector('.element').cloneNode(true),
        elementImage = element.querySelector('.element__image');
    elementImage.src = srcValue;
    elementImage.alt = nameValue;
    element.querySelector('.element__attractions').textContent = nameValue;
    element.dataset.id = elementId;
    element.querySelector('.element__like').addEventListener('click', function (e) {
        e.target.classList.toggle('element__like_active');
       if(e.target.classList.contains('element__like_active')){
        /*    fetch(`https://nomoreparties.co/v1/plus-cohort-23/cards/likes/${elementId}`,{
                headers: {
                    authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
                    'Content-Type': 'application/json'
                  },
                  method: 'PUT'
                })
                  .then(res => res.json())
                  .then(result =>{
                    сounterLikes(result.likes.length, result);
            })*/
            requestSetLike(elementId);
        }else{
        /*    fetch(`https://nomoreparties.co/v1/plus-cohort-23/cards/likes/${elementId}`,{
                headers: {
                    authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
                    'Content-Type': 'application/json'
                  },
                  method: 'DELETE'
                })
                  .then(res => res.json())
                  .then(result =>{
                    сounterLikes(result.likes.length, result);
            })*/
            requestRemoveLike(elementId);
        }
    });
    if(owner =="2d1ce162dcb142eb0b940e01" || !owner){
        element.querySelector('.element__trash').addEventListener('click', function () {
            const deleteItem = element.closest('.element');
            deleteCard(deleteItem, elementId);
        });
    }else{
        element.querySelector('.element__trash').style.visibility='hidden';
    }
    element.querySelector('.element__image').addEventListener('click', function (e) {
        increaseImage(srcValue, nameValue);
    });
    return element;
}
function deleteCard(deleteItem, elementId){
    openPopup(popupDeleteCard);
    popupDeleteCard.querySelector('.popup__button').addEventListener('click', ()=>{
        requestDeleteCard(elementId);
       /* fetch(`https://nomoreparties.co/v1/plus-cohort-23/cards/${elementId}`, {
            headers: {
              authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
              'Content-Type': 'application/json'
            },
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(result =>{
                console.log(result);
            })*/
            closePopup(popupDeleteCard);
            deleteItem.remove();
    })
}
function renderCard(srcValue, nameValue, elementId, owner) {
    elementsContainer.prepend(addElement(srcValue, nameValue, elementId, owner));
};
function сounterLikes(count, cardID){
    let card = document.querySelector(`[data-id="${cardID._id}"]`);
    card.querySelector('.element__likes').textContent = count;
    cardID.likes.forEach(users =>{
        if(users._id=="2d1ce162dcb142eb0b940e01"){
            card.querySelector('.element__like').classList.add('element__like_active');
        }
    })
}
function renderInitalCard(){
   requestGetCard();
    /*fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
    headers: {
      authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
    },
    method: 'GET'
  })
    .then(res => res.json())
    .then((result) => {
        result.forEach(element => {
            renderCard(element.link, element.name, element._id, element.owner._id);
            сounterLikes(element.likes.length, element);
        });

    });*/
}
function addCardToServer(srcValue, nameValue){
    popupAddCard.querySelector('.popup__button').value = 'Сохранение...';
    requestPostCard(nameValue, srcValue, popupAddCard);
    // fetch('https://nomoreparties.co/v1/plus-cohort-23/cards/', {
    //     headers: {
    //       authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
    //       'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //         name: nameValue,
    //         link: srcValue
    //     }),
    //   }).then(()=>{
    //     popupAddCard.querySelector('.popup__button').value  = 'Сохранить';
    //   }).finally(()=>{
    //     closePopup(popupAddCard);
    //   });

}
export {
    renderCard, renderInitalCard, addCardToServer, сounterLikes
};