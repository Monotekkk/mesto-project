import {
    сounterLikes,
    renderCard
} from "./card";
import {
    closePopup
} from "./modal";
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
    headers: {
        authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
        'Content-Type': 'application/json'
    }
}

const requestSetLike = (elementId) => {
    return fetch(`${config.baseUrl}/cards/likes/${elementId}`, {
            headers: config.headers,
            method: 'PUT'
        })
        .then(result => {
            if (result.ok) {
                return result.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${result.status}`);
        })
        .then(result => {
            console.log(result);
            сounterLikes(result.likes.length, result);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

const requestRemoveLike = (elementId) => {
    return fetch(`${config.baseUrl}/cards/likes/${elementId}`, {
            headers: config.headers,
            method: 'DELETE'
        })
        .then(result => {
            if (result.ok) {
                return result.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${result.status}`);
        })
        .then(result => {
            console.log(result);
            сounterLikes(result.likes.length, result);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

const requestDeleteCard = (elementId) => {
    return fetch(`${config.baseUrl}/cards/${elementId}`, {
            headers: config.headers,
            method: 'DELETE'
        })
        .then(result => {
            if (result.ok) {
                return result.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${result.status}`);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}
const requestGetCard = () => {
    return fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-23/cards`, {
            headers: config.headers,
            method: 'GET'
        })
        .then(result => {
            if (result.ok) {
                return result.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${result.status}`);
        })
        .then(result => {
            result.forEach(element => {
                renderCard(element.link, element.name, element._id, element.owner._id);
                сounterLikes(element.likes.length, element);
            })
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}
const requestPostCard = (nameValue, srcValue, popupAddCard) => {
    return fetch(`${config.baseUrl}/cards/`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: nameValue,
            link: srcValue
        }),
    }).then(() => {
        popupAddCard.querySelector('.popup__button').value = 'Сохранить';
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }).finally(() => {
        closePopup(popupAddCard);
    });
}
const requestUserInfo = (profieName, profileProfi, profileAvatar) => {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers,
            method: 'GET'
        }).then(result => {
            if (result.ok) {
                return result.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${result.status}`);
        })
        .then((result) => {
            profieName.textContent = result.name;
            profileProfi.textContent = result.about;
            profileAvatar.src = result.avatar;
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}
const requestPathInfo = (value, popup, url) => {
    return fetch(`${config.baseUrl}/${url}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(value)
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }).finally(() => {
        closePopup(popup);
        popup.querySelector('.popup__button').value = 'Сохранить';
    });
}
export {
    requestSetLike,
    requestRemoveLike,
    requestDeleteCard,
    requestGetCard,
    requestPostCard,
    requestUserInfo,
    requestPathInfo
}