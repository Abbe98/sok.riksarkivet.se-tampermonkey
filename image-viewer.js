// ==UserScript==
// @name         Riksarkivet image viewer
// @namespace    https://sok.riksarkivet.se/
// @description
// @version      1.0
// @author       Albin Larsson
// @match        https://sok.riksarkivet.se/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const imageButton = document.querySelector('.btn.btn-small.btn-success.link-image');
    if (!imageButton) return;
    const imageLink = imageButton.href;
    const iframeHTML = '<iframe src="' + imageLink + '" allowfullscreen="" width="940" height="700" frameborder="0"></iframe>';
    imageButton.parentElement.parentElement.innerHTML = iframeHTML;
})();