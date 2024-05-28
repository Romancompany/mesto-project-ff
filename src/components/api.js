const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {  
        authorization: 'a2475588-c201-48b3-b1ec-e921a3f3b495',
        'Content-Type': 'application/json'
    }
}

const fetchJSON = (url, head) => {
return fetch(url, head)
      .then(res => {
         if (res.ok) { return res.json(); }
         // если ошибка, отклоняем промис
         return Promise.reject(`Ошибка WEB сервера: ${res.status}`);
       });
}
  
const getInitialCards = () => {
return fetchJSON(`${config.baseUrl}/cards`
                , { method: 'GET',
                    headers: config.headers
                  }
                );
}

const getProfile = () => {
return fetchJSON(`${config.baseUrl}/users/me`
                , { method: 'GET',
                    headers: config.headers
                  }
                );
}

const patchProfile = (nameEdit, aboutEdit) => {
return fetchJSON(`${config.baseUrl}/users/me`
                , { method: 'PATCH',
                    headers: config.headers,
                    body: JSON.stringify({
                            name: nameEdit,
                            about: aboutEdit
                        })
                  }
                );
}

const postCard = (nameNew, linkNew) => {
return fetchJSON(`${config.baseUrl}/cards`
                , { method: 'POST',
                    headers: config.headers,
                    body: JSON.stringify({
                        name: nameNew,
                        link: linkNew
                    })
                  }
                );
}

const deleteCard = (id) => {
return fetchJSON(`${config.baseUrl}/cards/${id}`
                , { method: 'DELETE',
                    headers: config.headers
                  }
                );
}

const putLikeCard = (id) => {
return fetchJSON(`${config.baseUrl}/cards/likes/${id}`
                , { method: 'PUT',
                    headers: config.headers
                  }
                );
}

const deleteLikeCard = (id) => {
return fetchJSON(`${config.baseUrl}/cards/likes/${id}`
                , { method: 'DELETE',
                    headers: config.headers
                  }
                );
}

export { getInitialCards, getProfile, patchProfile, postCard, deleteCard, putLikeCard, deleteLikeCard };