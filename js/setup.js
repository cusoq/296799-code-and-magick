'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var wizards = [];
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // имя и фамилия волшебника
  var getFullName = function () {
    return WIZARD_NAMES[window.util.getRandom(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[window.util.getRandom(WIZARD_SURNAMES.length)];
  };
  // характеристики персонажа
  for (var j = 0; j < WIZARDS_QUANTITY; j++) {
    wizards[j] = {
      name: getFullName(),
      colorCoat: window.util.getColor(window.util.COAT_COLORS),
      colorEyes: window.util.getColor(window.util.EYES_COLORS)
    };
  }
  // ДОМ структура х-к персонажа
  document.querySelector('.setup').classList.remove('hidden');
  window.util.startX = window.util.popupSetup.offsetLeft;
  window.util.startY = window.util.popupSetup.offsetTop;
  var renderWizard = function (currentWizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.colorEyes;
    return wizardElement;
  };
  // Обработка успешной загрузки данных по сети
  var onSuccessLoad = function (xhrResponseWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(xhrResponseWizards[i]));
    }
    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
  // Обработка возможных ошибок
  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  // вставка сформированных ДОМ элементов в разметку или вывод сообщения об ошибке
  window.backend.load(onSuccessLoad, onErrorLoad);
})();
