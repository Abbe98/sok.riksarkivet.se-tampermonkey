// ==UserScript==
// @name         Riksarkivet download post metadata
// @namespace    https://sok.riksarkivet.se/
// @description
// @version      1.0
// @author       Albin Larsson
// @match        https://sok.riksarkivet.se/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const copyValueBtn = document.querySelector('i.copy-btn');
    if (!copyValueBtn) return;
    const postLink = copyValueBtn.dataset.copyValue;
    // TODO check if it's a valid agent or archive URI
    const uri = postLink.replace('https://sok.', 'https://data.').replace('/arkiv/', '/archive/');
    const aJSONLD = document.createElement('a');
    aJSONLD.innerText = 'JSONLD';
    aJSONLD.href = uri + '.jsonld';
    aJSONLD.download = true;
    aJSONLD.style = 'margin-left: 5px;';
    aJSONLD.title = 'Ladda ner metadata som JSONLD';
    const aRDFXML = document.createElement('a');
    aRDFXML.innerText = 'RDF/XML';
    aRDFXML.href = uri + '.rdfxml';
    aRDFXML.download = true;
    aRDFXML.style = 'margin-left: 5px;';
    aJSONLD.title = 'Ladda ner metadata som RDF/XML';

    copyValueBtn.parentElement.append(aJSONLD);
    copyValueBtn.parentElement.append(aRDFXML);
})();
