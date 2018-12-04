'use strict';

var popupSetup = document.querySelector('.setup');
var dialogHandler = popupSetup.querySelector('.upload');

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

    popupSetup.style.top = (popupSetup.offsetTop - shift.y) + 'px';
    popupSetup.style.left = (popupSetup.offsetLeft - shift.x) + 'px';
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

// перетаскивание диалогового окна
dialogHandler.addEventListener('mousedown', onSetupAvatarDragger);
