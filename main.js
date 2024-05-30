(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-14",headers:{authorization:"a2475588-c201-48b3-b1ec-e921a3f3b495","Content-Type":"application/json"}},t=function(e,t){return fetch(e,t).then((function(e){return e.ok?e.json():Promise.reject("Ошибка от WEB-сервера: ".concat(e.status))}))},n="card__like-button_is-active",r="places__item",o=document.querySelector("#card-template").content;function a(e,t){e.querySelector(".card__like-count").textContent=t}function c(e,t,c,u,i){var l=o.cloneNode(!0),s=l.querySelector(".card__image"),d=l.querySelector(".card__title"),p=l.querySelector(".card__delete-button"),_=l.querySelector(".card__like-button");return l.querySelector("."+r).id=e._id,s.src=e.link,s.alt=e.name,d.textContent=e.name,e.likes.some((function(e){var r=e._id===t;return r&&_.classList.add(n),r})),a(l,e.likes.length),e.owner._id===t?p.addEventListener("click",c):p.classList.add("card__delete-button_hidden"),_.addEventListener("click",u),s.addEventListener("click",i),l}function u(o){var c,u=o.target,i=u.closest("."+r);u.classList.contains(n)?(c=i.id,t("".concat(e.baseUrl,"/cards/likes/").concat(c),{method:"DELETE",headers:e.headers})).then((function(e){u.classList.remove(n),a(i,e.likes.length)})).catch((function(e){return console.log(e)})):function(n){return t("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers})}(i.id).then((function(e){u.classList.add(n),a(i,e.likes.length)})).catch((function(e){return console.log(e)}))}function i(n){var o,a=n.target.closest("."+r);(o=a.id,t("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers})).then((function(e){"Пост удалён"===e.message?function(e){e.remove()}(a):alert("Ошибка удаления карточки на сервере")})).catch((function(e){return console.log(e)}))}var l="popup_is-opened";function s(e){e.classList.add(l),document.addEventListener("keydown",_)}function d(e){e.classList.remove(l),document.removeEventListener("keydown",_)}function p(e){var t=e.target;e.currentTarget===t&&d(t)}function _(e){"Escape"===e.key&&d(document.querySelector("."+l))}var f=!1,v=!0,y=!1,m=function(e,t,n){e?t.classList.add(n):t.classList.remove(n)},h=function(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",a=n.querySelector(".".concat(r.id,"-error")),c=e?v:y;a.textContent=e?o:"",m(c,a,t.errorClass),m(c,r,t.inputErrorClass)},S=function(e,t,n){var r=function(e){return e.some((function(e){return!e.validity.valid}))}(t),o=r?v:y;n.disabled=r,m(o,n,e.inactiveButtonClass)};function b(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);S(t,n,r),n.forEach((function(n){h(f,t,e,n)}))}var q,E,g={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},k=document.querySelector(".places__list"),L=document.querySelector(".profile"),C=L.querySelector(".profile__image"),x=L.querySelector(".profile__title"),T=L.querySelector(".profile__description"),U=L.querySelector(".profile__edit-button"),A=L.querySelector(".profile__add-button"),B=document.querySelector(".popup_type_avatar"),P=B.querySelector(".popup__form"),w=P.querySelector(".popup__input_type_url"),D=document.querySelector(".popup_type_edit"),N=D.querySelector(".popup__form"),O=N.querySelector(".popup__input_type_name"),j=N.querySelector(".popup__input_type_description"),J=document.querySelector(".popup_type_new-card"),M=J.querySelector(".popup__form"),G=M.querySelector(".popup__input_type_card-name"),H=M.querySelector(".popup__input_type_url"),z=document.querySelector(".popup_type_image"),V=z.querySelector(".popup__caption"),W=z.querySelector(".popup__image");function F(e){E=e.button_save.textContent,e.button_save.textContent="Сохранение..."}function I(e){e.button_save.textContent=E}function K(e){var t=e.target;W.src=t.src,W.alt=t.alt,V.textContent=t.alt,s(z)}function Q(e){x.textContent=e.name,T.textContent=e.about,C.style='background-image: url("'.concat(e.avatar,'")')}C.addEventListener("click",(function(e){w.value="",b(P,g),s(B)})),U.addEventListener("click",(function(e){O.value=x.textContent,j.value=T.textContent,b(N,g),s(D)})),A.addEventListener("click",(function(e){M.reset(),b(J,g),s(J)})),P.addEventListener("submit",(function(n){var r;n.preventDefault(),F(P),(r=w.value,t("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})})).then((function(e){e.avatar===w.value?(Q(e),d(B)):alert("Ошибка сохранения аватара на сервере")})).catch((function(e){return alert(e)})).finally((function(){return I(P)}))})),N.addEventListener("submit",(function(n){var r,o;n.preventDefault(),F(N),(r=O.value,o=j.value,t("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})})).then((function(e){e.name===O.value&&e.about===j.value?(x.textContent=O.value,T.textContent=j.value,d(D)):alert("Ошибка сохранения профиля на сервере")})).catch((function(e){return alert(e)})).finally((function(){return I(N)}))})),M.addEventListener("submit",(function(n){var r,o;n.preventDefault(),F(M),(r=G.value,o=H.value,t("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:o})})).then((function(e){if(e.name===G.value&&e.link===H.value){var t=c(e,q,i,u,K);k.prepend(t),d(J)}else alert("Ошибка добавления карточки на сервер")})).catch((function(e){return alert(e)})).finally((function(){return I(M)}))})),[B,D,J,z].forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){d(e)})),e.addEventListener("click",p)})),Promise.all([t("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}),t("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers})]).then((function(e){var t=e[0],n=e[1];Q(n),q=n._id,function(e){e.forEach((function(e){var t=c(e,q,i,u,K);k.append(t)}))}(t)})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);S(e,n,r),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){var r=n.validity.patternMismatch?n.dataset.errorMessage:"",o=!n.validity.valid||f;n.setCustomValidity(r),h(o,e,t,n,n.validationMessage)}(e,t,o),S(e,n,r)}))}))}))}(g)})();