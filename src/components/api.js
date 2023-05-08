const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
    headers: {
        authorization: 'b879d976-9451-46e7-99e2-ffc6de83a372',
        'Content-Type': 'application/json'
    }
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}
const requestSetLike = (elementId) => {
    return fetch(`${config.baseUrl}/cards/likes/${elementId}`, {
            headers: config.headers,
            method: 'PUT'
        }).then(result => {
           return getResponseData(result);
        })
}

const requestRemoveLike = (elementId) => {
    return fetch(`${config.baseUrl}/cards/likes/${elementId}`, {
            headers: config.headers,
            method: 'DELETE'
        })
        .then(result => {
            return getResponseData(result);
        })
}

const requestDeleteCard = (elementId) => {
    return fetch(`${config.baseUrl}/cards/${elementId}`, {
            headers: config.headers,
            method: 'DELETE'
        })
        .then(result => {
            console.log(result);
            return getResponseData(result);
        })
}
const requestGetCard = () => {
    return fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-23/cards`, {
            headers: config.headers,
            method: 'GET'
        })
        .then(result => {
            return getResponseData(result);
        })
}
const requestPostCard = (nameValue, srcValue) => {
    return fetch(`${config.baseUrl}/cards/`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: nameValue,
            link: srcValue
        })
    }).then(result => {
        return getResponseData(result);
    })
}
const requestUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers,
            method: 'GET'
        }).then(result => {
            return getResponseData(result);
        })
}
const requestPathInfo = (value, popup, url) => {
    return fetch(`${config.baseUrl}/${url}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(value)
    })
}
Promise.all([                 //в Promise.all передаем массив промисов которые нужно выполнить
    requestUserInfo(),
    requestGetCard()
])
export {
    requestSetLike,
    requestRemoveLike,
    requestDeleteCard,
    requestGetCard,
    requestPostCard,
    requestUserInfo,
    requestPathInfo
}