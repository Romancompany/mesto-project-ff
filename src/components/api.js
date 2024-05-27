const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
      authorization: 'a2475588-c201-48b3-b1ec-e921a3f3b495',
      'Content-Type': 'application/json'
    }
}
  
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

const patchProfile = (nameEdit, aboutEdit) => {
   return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: nameEdit,
        about: aboutEdit
      })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .then(profile => {
        return (profile.name === nameEdit && profile.about === aboutEdit);
    })
    .catch(err => { 
        console.log(err);
        return false;
    });
}

const postCard = (nameNew, linkNew) => {
    return fetch(`${config.baseUrl}/cards`, {
       method: 'POST',
       headers: config.headers,
       body: JSON.stringify({
         name: nameNew,
         link: linkNew
       })
     })
     .then(res => {
         if (res.ok) {
           return res.json();
         }
         // если ошибка, отклоняем промис
         return Promise.reject(`Ошибка: ${res.status}`);
       })
     .then(card => {
         return (card.name === nameNew && card.link === linkNew);
     })
     .catch(err => { 
         console.log(err);
         return false;
     });
}

const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
       method: 'DELETE',
       headers: config.headers,
     })
     .then(res => {
         if (res.ok) {
           return res.json();
         }
         // если ошибка, отклоняем промис
         return Promise.reject(`Ошибка: ${res.status}`);
       })
     .catch(err => { 
         console.log(err);
         return false;
     });
 }

export { getInitialCards, getProfile, patchProfile, postCard, deleteCard };