(function () {
  'use strict';

  var backgroundPage = chrome.extension.getBackgroundPage();
  document.querySelector('button').addEventListener('click', function () {
    backgroundPage.handleButtonClick();
  });
}());
