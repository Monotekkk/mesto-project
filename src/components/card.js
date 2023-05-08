import {
    closePopup,
    openPopup
} from "./modal";
import {
    requestSetLike,
    requestRemoveLike,
    requestDeleteCard,
    requestPostCard,
} from "./api";
import {
    buttonDisabled
}from "./validate";
const imagePlace = document.querySelector('.popup__image'),
    imagePlaceTitle = document.querySelector('.popup__title_image'),
    elementsContainer = document.querySelector('.elements'),
    popupImage = document.querySelector('.popup_image'),
    popupAddCard = document.querySelector('.popup_add-card'),
    submitCardButton = popupAddCard.querySelector('.popup__button'),
    elementsTemplate = document.querySelector('#elementsTemplate').content;

function increaseImage(srcValue, nameValue) {
    openPopup(popupImage);
    imagePlace.src = srcValue;
    imagePlaceTitle.textContent = nameValue;
    imagePlace.alt = nameValue;
}

function addElement(srcValue, nameValue, elementId, owner, likes = 0, myID) {
    const element = elementsTemplate.querySelector('.element').cloneNode(true),
        elementImage = element.querySelector('.element__image');
    elementImage.src = srcValue;
    elementImage.alt = nameValue;
    element.querySelector('.element__attractions').textContent = nameValue;
    element.querySelector('.element__likes').textContent = likes.length;
    likes.forEach((users)=>{
        if(users._id == myID){
            element.querySelector('.element__like').classList.add('element__like_active');
        }
    })
    element.querySelector('.element__like').addEventListener('click', function (e) {
        if (e.target.classList.contains('element__like_active')) {
            requestRemoveLike(elementId)
                .then(result => {
                    element.querySelector('.element__likes').textContent -= 1;
                    //сounterLikes(result.likes.length, result, result.owner._id, element);
                    e.target.classList.remove('element__like_active');
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            requestSetLike(elementId).then(result => {
                element.querySelector('.element__likes').textContent =   +(element.querySelector('.element__likes').textContent) +1;
                //сounterLikes(result.likes.length, result, result.owner._id, element);
            }).then(() => {
                e.target.classList.add('element__like_active');
            })
        }
    });
    if (owner == myID || !owner) {
        element.querySelector('.element__trash').addEventListener('click', function () {
            deleteCard(element, elementId);
        });
    } else {
        element.querySelector('.element__trash').classList.add('element__trash_hidden');
    }
    element.querySelector('.element__image').addEventListener('click', function (e) {
        increaseImage(srcValue, nameValue);
    });
    return element;
}

function deleteCard(element, elementId) {
        requestDeleteCard(elementId).then(()=>{
            element.remove()
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
         //обратиться к карточке по ид
}

function renderCard(element, myID) {
    const srcValue = element.link,
        nameValue = element.name,
        elementId = element._id,
        owner = element.owner._id,
        likes = element.likes;
    elementsContainer.prepend(addElement(srcValue, nameValue, elementId, owner, likes, myID));
};

function сounterLikes(count, cardID, myID, element) {
    element.querySelector('.element__likes').textContent = count;
}

function renderInitalCard(cards, myID) {
        cards.forEach(element => {
            renderCard(element, myID);
        })}

function addCardToServer(element, e) {
    popupAddCard.querySelector('.popup__button').value = 'Сохранение...';
    requestPostCard(element.placeName, element.placeHref).then((result) => {
            renderCard(result, result.owner._id);
            popupAddCard.querySelector('.popup__button').value = 'Сохранить';
        }).finally(() => {
            closePopup(popupAddCard);
            e.target.reset();
            buttonDisabled(submitCardButton, 'popup__button_inactive');
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });

}
export {
    renderCard,
    renderInitalCard,
    addCardToServer,
    сounterLikes
};