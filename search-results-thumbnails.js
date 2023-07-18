// ==UserScript==
// @name         Riksarkivet tumbnails
// @namespace    https://sok.riksarkivet.se/
// @description
// @version      1.0
// @author       Albin Larsson
// @match        https://sok.riksarkivet.se/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const hitRows = document.querySelectorAll('.hitRow');
    for (const element of hitRows) {
        const iconElm = element.querySelector('.hit_icon');
        if (!iconElm) continue;
        const link = new URL(element.querySelector('.hit_middle a').href);
        fetch(link).then(r => {
          return r.text();
        }).then(t => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(t, 'text/html');
          const imageLinkElm = doc.querySelector("a[href^='/bildvisning/']");
          if (!imageLinkElm) return;


          const imageViewURL = new URL(imageLinkElm.href);
          let imageID = imageViewURL.pathname.split('/')[imageViewURL.pathname.split('/').length - 1];
          if (imageID.startsWith('R') && !imageID.includes('_')) { // medetidapegament?
            imageID = 'arkis!' + imageID + '_00001';
          } else if (imageID.startsWith('C') && !imageID.includes('_')) {
            imageID = 'arkis!' + imageID + '_00001';
          } else if (imageID.startsWith('Folk_')) {
            imageID = imageID.replace('Folk_', 'folk!');
          } else if (imageID.startsWith('Sdhk_')) {
            const SDHKID = imageID.replace('Sdhk_', '');
            imageID = imageID.replace('_', '!') + '_' + SDHKID + '.jpg';
          } else {
            imageID = 'arkis!' + imageID;
          }

          const tumbnailURL = 'https://lbiiif.riksarkivet.se/v2/' + imageID + '/full/100,/0/default.jpg';
          iconElm.src = tumbnailURL;
          iconElm.width = '100';
          iconElm.height = '50';
        });

    }

})();
