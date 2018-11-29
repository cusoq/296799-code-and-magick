'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var popupSetup = document.querySelector('.setup');
var popupClose = document.querySelector('.setup-close');
var userNameInput = popupSetup.querySelector('.setup-user-name');
var wizardCoat = popupSetup.querySelector('.wizard-coat');
var wizardEyes = popupSetup.querySelector('.wizard-eyes');
var fireball = popupSetup.querySelector('.setup-fireball-wrap');
var fragment = document.createDocumentFragment();
// получаем случайный элемент массива
var getRandom = function (arrLength) {
  return Math.floor(Math.random() * arrLength);
};
// имя и фамилия волшебника
var getFullName = function () {
  return WIZARD_NAMES[getRandom(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length)];
};
// получаем цвет чего бы то ни было из массива цветов чего бы то ни было
var getColor = function (colors) {
  return colors[getRandom(colors.length)];
};
// открытие попапа
var openPopup = function (popup) {
  popup.classList.remove('hidden');
};
// закрытие попапа
var closePopup = function (popup) {
  popup.classList.add('hidden');
  window.removeEventListener('keydown', onEscCloser, onAvatarEnter, onAvatarCklick);
};
// хэндлеры
var onEscCloser = function () {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup(popupSetup);
  }
};
var onAvatarEnter = function () {
  event.preventDefault();
  if (event.keyCode === ENTER_KEYCODE) {
    openPopup(popupSetup);
  }
};
var onAvatarCklick = function () {
  event.preventDefault();
  openPopup(popupSetup);
};
// закрытие попапа по клику на крестик
popupClose.addEventListener('click', function (event) {
  event.preventDefault();
  closePopup(popupSetup);
});
// закрытие попапа по Enter при фокусе на крестике
popupClose.addEventListener('keydown', function (event) {
  event.preventDefault();
  if (event.keyCode === ENTER_KEYCODE) {
    closePopup(popupSetup);
  }
});
// меняем цвет фаербола и записываем его код в соответствующее поле формы
fireball.addEventListener('click', function () {
  var currentFireBallColor = getColor(FIREBALL_COLORS);
  fireball.style.background = currentFireBallColor;
  fireball.querySelector('input').value = currentFireBallColor;
});
// меняем цвет плаща и записываем его код в соответствующее поле формы
wizardCoat.addEventListener('click', function () {
  var currentCoatColor = getColor(COAT_COLORS);
  wizardCoat.style.fill = currentCoatColor;
  popupSetup.getElementsByTagName('input')['coat-color'].value = currentCoatColor;
});
// меняем цвет глаз и записываем его код в соответствующее поле формы
wizardEyes.addEventListener('click', function () {
  var currentEyesColor = getColor(EYES_COLORS);
  wizardEyes.style.fill = currentEyesColor;
  popupSetup.getElementsByTagName('input')['eyes-color'].value = currentEyesColor;
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
// характеристики персонажа
for (var j = 0; j < WIZARDS_QUANTITY; j++) {
  wizards[j] = {
    name: getFullName(),
    coatColor: getColor(COAT_COLORS),
    eyesColor: getColor(EYES_COLORS)
  };
}
// ДОМ структура х-к персонажа
document.querySelector('.setup').classList.remove('hidden');
var renderWizard = function (currentWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.eyesColor;
  return wizardElement;
};
// вставка сформированных ДОМ элементов в разметку
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
