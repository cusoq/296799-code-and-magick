'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupOpen = document.querySelector('.setup-open');
  var popupClose = document.querySelector('.setup-close');
  var form = document.querySelector('.setup-wizard-form');


  var userNameInput = window.util.popupSetup.querySelector('.setup-user-name');
  var wizardCoat = window.util.popupSetup.querySelector('.wizard-coat');
  var wizardEyes = window.util.popupSetup.querySelector('.wizard-eyes');
  var fireball = window.util.popupSetup.querySelector('.setup-fireball-wrap');
  var dialogHandler = window.util.popupSetup.querySelector('.upload');
  // открытие попапа
  var openPopup = function (popup) {
    popup.classList.remove('hidden');
    window.util.popupSetup.style.top = window.util.startY + 'px';
    window.util.popupSetup.style.left = window.util.startX + 'px';
  };
  // закрытие попапа
  var closePopup = function (popup) {
    popup.classList.add('hidden');
    window.removeEventListener('keydown', onEscCloser, onAvatarEnter, onAvatarCklick);
  };
  // хэндлеры
  var onEscCloser = function () {
    if (event.keyCode === ESC_KEYCODE) {
      closePopup(window.util.popupSetup);
    }
  };
  var onAvatarEnter = function () {
    event.preventDefault();
    if (event.keyCode === ENTER_KEYCODE) {
      openPopup(window.util.popupSetup);
    }
  };
  var onAvatarCklick = function () {
    event.preventDefault();
    openPopup(window.util.popupSetup);
  };
  // что происходит при перетаскивании попапа за аватар его
  var onSetupAvatarDragger = function () {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.popupSetup.style.top = (window.util.popupSetup.offsetTop - shift.y) + 'px';
      window.util.popupSetup.style.left = (window.util.popupSetup.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  // закрытие попапа по клику на крестик
  popupClose.addEventListener('click', function (event) {
    event.preventDefault();
    closePopup(window.util.popupSetup);
  });
  // закрытие попапа по Enter при фокусе на крестике
  popupClose.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (event.keyCode === ENTER_KEYCODE) {
      closePopup(window.util.popupSetup);
    }
  });
  // меняем цвет фаербола и записываем его код в соответствующее поле формы
  fireball.addEventListener('click', function () {
    var currentFireBallColor = window.util.getColor(FIREBALL_COLORS);
    fireball.style.background = currentFireBallColor;
    fireball.querySelector('input').value = currentFireBallColor;
  });
  // меняем цвет плаща и записываем его код в соответствующее поле формы
  wizardCoat.addEventListener('click', function () {
    var currentCoatColor = window.util.getColor(window.util.COAT_COLORS);
    wizardCoat.style.fill = currentCoatColor;
    window.util.popupSetup.getElementsByTagName('input')['coat-color'].value = currentCoatColor;
  });
  // меняем цвет глаз и записываем его код в соответствующее поле формы
  wizardEyes.addEventListener('click', function () {
    var currentEyesColor = window.util.getColor(window.util.EYES_COLORS);
    wizardEyes.style.fill = currentEyesColor;
    window.util.popupSetup.getElementsByTagName('input')['eyes-color'].value = currentEyesColor;
  });
  // Обрабатываем выход из диалога по Esc
  userNameInput.addEventListener('keydown', function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      event.stopPropagation();
    }
  });
  // закрытие попапа по Esc
  document.addEventListener('keydown', onEscCloser);
  // обрабатываем открытие диалогового окна по Enter на аватар
  setupOpen.addEventListener('keydown', onAvatarEnter);
  // обрабатываем открытие диалогового окна по клику на аватар
  setupOpen.addEventListener('click', onAvatarCklick);
  // Обрабатываем ошибку отправки формы
  var onErrorSave = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  // обрабатываем отправку данных по AJAX
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      closePopup(window.util.popupSetup);
    }, onErrorSave);
    evt.preventDefault();
  });

  // валидация формы
  userNameInput.addEventListener('input', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов. Лень кнопки нвжимать?');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов. Святые угодники, ну и фантазия..');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
  // перетаскивание диалогового окна
  dialogHandler.addEventListener('mousedown', onSetupAvatarDragger);
})();
