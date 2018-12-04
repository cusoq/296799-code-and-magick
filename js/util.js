'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var popupSetup = document.querySelector('.setup');
  // координаты первоначального появления диалогового окна,
  var startX;
  var startY;
  // получаем случайный элемент массива
  var getRandom = function (arrLength) {
    return Math.floor(Math.random() * arrLength);
  };
  // получаем цвет чего бы то ни было из массива цветов чего бы то ни было
  var getColor = function (colors) {
    return colors[getRandom(colors.length)];
  };
  window.util = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    popupSetup: popupSetup,
    startX: startX,
    startY: startY,
    getRandom: getRandom,
    getColor: getColor
  };
})();
