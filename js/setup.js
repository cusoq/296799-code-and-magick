'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var wizards = [];
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  // имя и фамилия волшебника
  var getFullName = function () {
    return WIZARD_NAMES[window.util.getRandom(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[window.util.getRandom(WIZARD_SURNAMES.length)];
  };
  // характеристики персонажа
  for (var j = 0; j < WIZARDS_QUANTITY; j++) {
    wizards[j] = {
      name: getFullName(),
      coatColor: window.util.getColor(window.util.COAT_COLORS),
      eyesColor: window.util.getColor(window.util.EYES_COLORS)
    };
  }
  // ДОМ структура х-к персонажа
  document.querySelector('.setup').classList.remove('hidden');
  window.util.startX = window.util.popupSetup.offsetLeft;
  window.util.startY = window.util.popupSetup.offsetTop;
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
})();
