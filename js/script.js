"use strict";

if (document.querySelector(".modal-feedback-contact")) {
  const buttonContacts = document.querySelector(".company-contacts-button");
  const formModal = document.querySelector(".modal-feedback-contact");
  const inputName = formModal.querySelector("[name=name]"); //Ищем импут с атрибутом name="name" в определенной форме
  const inputEmail = formModal.querySelector("[name=email]"); //Ищем импут с атрибутом name="email" в определенной форме
  const modalClose = formModal.querySelector(".modal-close");
  // const storageName = localStorage.getItem("name");           //Берем значени сохранёное из инпута name в браузере и назначаем переменной
  // const storageEmail = localStorage.getItem("email");         //Берем значени сохранёное из инпута email в браузере и назначаем переменной
  const inputTextarea = formModal.querySelector("[name=coment]");

  let isStorageSupport = true;
  let storageName = "";
  let storageEmail = "";

  try {
    storageName = localStorage.getItem("name");
    storageEmail = localStorage.getItem("email");
  } catch (err) {
    isStorageSupport = false;
  }

  buttonContacts.addEventListener("click", function (evt) {
    evt.preventDefault();
    formModal.classList.add("modal-active");

    if (isStorageSupport) {
      if (storageName) {
        inputName.value = storageName;
      }

      if (storageEmail) {
        storageEmail.value = storageEmail;
      }
    }

    if (!storageName) {
      inputName.focus();
    } else {
      inputTextarea.focus();
    }
  });

  modalClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    formModal.classList.remove("modal-active");
    formModal.classList.remove("modal-error");
  });

  formModal.addEventListener("submit", function (evt) {
    if (!inputName.value || !inputEmail.value || !inputTextarea.value) {
      evt.preventDefault();
      formModal.classList.remove("modal-error");
      setTimeout(function () {
        formModal.classList.add("modal-error");
      }, 0);
    } else {
      if (isStorageSupport) {
        localStorage.setItem("name", inputName.value); //Сохнараняем значение в инпуте name в браузер
        localStorage.setItem("email", inputEmail.value); //Сохнараняем значение в инпуте email в браузер
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    // remove(evt, formModal, "modal-active", "modal-error");

    if (evt.keyCode === 27) {
      if (formModal.classList.contains("modal-active")) {
        //Проверяем открыто ли окно с формой или нет
        formModal.classList.remove("modal-active");
        formModal.classList.remove("modal-error");
      }
    }
  });
}

// function remove(evt, objectHtml, classActive, classError) {
//   if (evt.keyCode === 27) {
//     if (objectHtml.classList.contains(classActive)) {
//       objectHtml.classList.remove(classActive);
//       objectHtml.classList.remove(classError);
//     }
//   }
// }

if (document.querySelector(".modal-buy")) {
  const buttonBuys = document.querySelectorAll(".products-button-buy");
  const modalBuy = document.querySelector(".modal-buy");
  const modalBuyClose = modalBuy.querySelector(".modal-close");
  const modalBuyBack = modalBuy.querySelector(".modal-buy-button-back");
  const basket = document.querySelector(".basket-link");
  const basketCount = basket.querySelector(".basket-link span");

  for (let i = 0; i < buttonBuys.length; i++) {
    buttonBuys[i].addEventListener("click", function (evt) {
      evt.preventDefault();

      if (
        Number(basketCount.textContent) !== 9 &&
        !modalBuy.classList.contains("modal-active")
      ) {
        basketCount.textContent = Number(basketCount.textContent) + 1;
        modalBuy.classList.add("modal-active");
      } else if (Numder(basketCount.textContent) === 9) {
        alert(
          "Ну и на кой тебе столько??? Остановись!!! Корзина то не резиновая"
        );
      }

      // basket.innerHTML = "Корзина: " + productQuantity;

      if (basketCount.textContent !== "0") {
        basket.classList.add("header-link-full");
      }
    });
  }

  modalBuyClose.addEventListener("click", function () {
    modalBuy.classList.remove("modal-active");
  });

  modalBuyBack.addEventListener("click", function () {
    modalBuy.classList.remove("modal-active");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (modalBuy.classList.contains("modal-active")) {
        //Проверяем открыто ли окно с формой или нет
        modalBuy.classList.remove("modal-active");
      }
    }
  });
}

if (document.querySelector(".products-button-bookmarks")) {
  const buttonBookmarks = document.querySelectorAll(
    ".products-button-bookmarks"
  );
  const bookmarksLink = document.querySelector(".bookmarks-link");

  let bookmarkQuantity = 0;

  bookmarksLink.innerHTML = "Закладки: " + bookmarkQuantity;

  for (let i = 0; i < buttonBookmarks.length; i++) {
    buttonBookmarks[i].addEventListener("click", function (evt) {
      evt.preventDefault();

      if (bookmarkQuantity !== 9) {
        bookmarkQuantity += 1;
        bookmarksLink.classList.add("header-link-full");
      } else {
        alert(
          "Да госпади, что же ты такой ненасытный то??? Нету больше места в закладках,угомонись!!!"
        );
      }

      bookmarksLink.innerHTML = "Закладки: " + bookmarkQuantity;
    });
  }
}

if (document.querySelector(".modal-map")) {
  const companyMap = document.querySelector(".company-contacts-link");
  const modalMap = document.querySelector(".modal-map");
  const modalMapClose = modalMap.querySelector(".modal-close");

  companyMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalMap.classList.add("modal-active");
  });

  modalMapClose.addEventListener("click", function () {
    modalMap.classList.remove("modal-active");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (modalMap.classList.contains("modal-active")) {
        //Проверяем открыто ли окно с формой или нет
        modalMap.classList.remove("modal-active");
      }
    }
  });
}

if (document.querySelector(".offers-slide")) {
  const offersSlides = document.querySelectorAll(".offers-slide");
  const controlBack = document.querySelector(".offers-slider-controls-back");
  const controlNext = document.querySelector(".offers-slider-controls-next");
  const dotsHtml = document.querySelectorAll(".offers-slider-dot");
  const wrapDots = document.querySelector(".offers-slider-dots");

  let dots = [];

  for (let i = 0; i < dotsHtml.length; i++) {
    dotsHtml[i].remove();
  }

  for (let i = 0; i < offersSlides.length; i++) {
    let dot = document.createElement("button");
    dot.classList.add("offers-slider-dot");
    wrapDots.appendChild(dot);
    dots[i] = dot;

    let stcik = 0;

    if (offersSlides[i].classList.contains("offers-slide-active")) {
      stcik = i;
      dots[i].classList.add("offers-slider-dot-active");
    }

    controlNext.addEventListener("click", function () {
      if (offersSlides[stcik + 1]) {
        stcik = stcik + 1;
      } else {
        stcik = 0;
      }

      for (let k = 0; k < offersSlides.length; k++) {
        offersSlides[k].classList.remove("offers-slide-active");
        dots[k].classList.remove("offers-slider-dot-active");
      }

      offersSlides[stcik].classList.add("offers-slide-active");
      dots[stcik].classList.add("offers-slider-dot-active");
    });

    controlBack.addEventListener("click", function () {
      if (offersSlides[stcik - 1]) {
        stcik = stcik - 1;
      } else {
        stcik = offersSlides.length - 1;
      }

      for (let k = 0; k < offersSlides.length; k++) {
        offersSlides[k].classList.remove("offers-slide-active");
        dots[k].classList.remove("offers-slider-dot-active");
      }

      offersSlides[stcik].classList.add("offers-slide-active");
      dots[stcik].classList.add("offers-slider-dot-active");
    });

    dots[i].addEventListener("click", function () {
      stcik = i;

      for (let k = 0; k < offersSlides.length; k++) {
        offersSlides[k].classList.remove("offers-slide-active");
        dots[k].classList.remove("offers-slider-dot-active");
      }

      offersSlides[stcik].classList.add("offers-slide-active");
      dots[stcik].classList.add("offers-slider-dot-active");
    });
  }
}

if (document.querySelectorAll(".services-item-button")) {
  const buttonsSlides = document.querySelectorAll(".services-item-button");
  const slides = document.querySelectorAll(".services-slide");

  for (let i = 0; i < buttonsSlides.length; i++) {
    buttonsSlides[i].addEventListener("click", function () {
      for (let k = 0; k < buttonsSlides.length; k++) {
        buttonsSlides[k].classList.remove("services-item-button-active");
        slides[k].classList.remove("services-slide-active");
      }

      buttonsSlides[i].classList.add("services-item-button-active");
      slides[i].classList.add("services-slide-active");
    });
  }
}
