// ==UserScript==
// @name         Riksarkivet special search shortcuts
// @namespace    https://sok.riksarkivet.se/
// @description
// @version      1.0
// @author       Albin Larsson
// @match        https://sok.riksarkivet.se/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const specialSearchForms = [
        ["https://sok.riksarkivet.se/armens-rullor", "Arméns rullor"],
        ["https://sok.riksarkivet.se/domstolsarkiv","Domstolsarkiv"],
        ["https://sok.riksarkivet.se/ericsbergsarkivets-autografsamling","Ericsbergsarkivets autografsamling"],
        ["https://sok.riksarkivet.se/flottans-arkiv","Flottans arkiv"],
        ["https://sok.riksarkivet.se/forsamlingsutdrag","Församlingsutdrag 1860–1940"],
        ["https://sok.riksarkivet.se/generalmonsterrullor","Generalmönsterrullor"],
        ["https://sok.riksarkivet.se/jordebocker","Jordeböcker ca 1630–1750"],
        ["https://sok.riksarkivet.se/krigsarkivets-kartsamlingar","Krigsarkivets kart- och ritningssamlingar"],
        ["https://sok.riksarkivet.se/kyrkoarkiv","Kyrkoarkiv"],
        ["https://sok.riksarkivet.se/lagfartsbocker","Lagfartsböcker 1875–1933"],
        ["https://sok.riksarkivet.se/landskapshandlingar","Landskapshandlingar 1530–1630"],
        ["https://sok.riksarkivet.se/landskontor-landskansli","Landskontor och landskansli"],
        ["https://sok.riksarkivet.se/lokalundersokningar", "Lokalundersökningar (jordbruk)"],
        ["https://sok.riksarkivet.se/mantalslangder-stockholms-stad","Mantals- och kronotaxeringslängder Stockholms stad"],
        ["https://sok.riksarkivet.se/mantalslangder","Mantalslängder 1642–1820"],
        ["https://sok.riksarkivet.se/ockupationsarkivet-novgorod","Ockupationsarkivet från Novgorod"],
        ["https://sok.riksarkivet.se/roterings-utskrivningslangder","Roterings- och utskrivningslängder"],
        ["https://sok.riksarkivet.se/scb-fodda-vigda-doda","SCB födda, vigda, döda 1860–1949"],
        ["https://sok.riksarkivet.se/summariska-folkmangdsredogorelser","Summariska folkmängdsredogörelser"],
        ["http://riksarkivet.se/geometriska","Sveriges äldsta storskaliga kartor "],
        ["https://sok.riksarkivet.se/trolldomskommissionen","Trolldomskommissionen"],
        ["https://sok.riksarkivet.se/alvsborgs-losen","Älvsborgs lösen 1571 och 1613"],
        ["https://sok.riksarkivet.se/aktiebolag","Aktiebolag 1901–1935"],
        ["https://sok.riksarkivet.se/oxenstierna","Axel Oxenstiernas skrifter och brev"],
        ["https://sok.riksarkivet.se/bouppteckningar","Bouppteckningar"],
        ["https://sok.riksarkivet.se/brevsamlingar","Brevsamlingar och korrespondens"],
        ["https://sok.riksarkivet.se/by-och-gardsnamn","By- och gårdsnamn"],
        ["http://ddss.nu/","DDSS (Demografisk Databas Södra Sverige)"],
        ["https://sok.riksarkivet.se/domboksregister","Domboksregister, Västra härad, Jönköpings län"],
        ["https://sok.riksarkivet.se/dodregister","Dödregister, Gotland, Jämtland och Västernorrlands län"],
        ["https://sok.riksarkivet.se/estonia","Estoniasamlingen"],
        ["https://sok.riksarkivet.se/folkrakningar","Folkräkningar (Sveriges befolkning)"],
        ["https://riksarkivet.x-ref.se/","Fornsvensk bibliografi och Svensk runbibliografi"],
        ["https://sok.riksarkivet.se/frigivna-straffarbetsfangar","Frigivna straffarbetsfångar"],
        ["https://sok.riksarkivet.se/fodelseregister","Födelseregister, Jämtland och Västernorrlands län"],
        ["https://sok.riksarkivet.se/garpenbergs-bruk","Garpenbergs bruk 1854–1874"],
        ["https://transkribus.eu/r/archives-sweden/","Göteborgs Poliskammare: Detektiva avdelningens rapportböcker 1868–1902 "],
        ["https://sok.riksarkivet.se/grill","Indelningsverket (Grill)"],
        ["https://sok.riksarkivet.se/konseljarenden","Konseljärenden 1840–1920"],
        ["https://sok.riksarkivet.se/krigsarkivets-portrattsamlingar","Krigsarkivets porträttsamlingar"],
        ["https://sok.riksarkivet.se/kungliga-patriotiska-sallskapets-medaljer","Kungliga Patriotiska Sällskapets medaljer"],
        ["https://sok.riksarkivet.se/lagfartsregister","Lagfartsregister"],
        ["https://sok.riksarkivet.se/MPO","Medeltida pergamentomslag"],
        ["https://sok.riksarkivet.se/medicinalstyrelsen","Medicinalstyrelsen 1876–1915"],
        ["https://sok.riksarkivet.se/Topografier","Orter, Sveriges indelning genom tiderna (NAD)"],
        ["https://sok.riksarkivet.se/personregister-skrivelser-kungl-majt","Personregister över skrivelser till Kungl. Maj:t"],
        ["https://sok.riksarkivet.se/rosenberg","Rosenbergs geografiska lexikon"],
        ["https://sok.riksarkivet.se/sdhk","SDHK (Medeltidsbrev)"],
        ["https://sok.riksarkivet.se/sjomanshus","Sjömanshus (Sjöfolk)"],
        ["https://sok.riksarkivet.se/smolensk","Smolenskarkivet 1604–1611"],
        ["https://sok.riksarkivet.se/sockenstamma","Sockenstämma Jämtlands län"],
        ["http://sok.riksarkivet.se/sbl","Svenskt biografiskt lexikon "],
        ["https://riksarkivet.se/tora","Topografiskt register på Riksarkivet (TORA) "],
        ["https://sok.riksarkivet.se/torparforsvar","Torparförsvar Västernorrlands och Jämtlands län"],
        ["https://sok.riksarkivet.se/vigselregister","Vigselregister, Gotland, Jämtland och Västernorrlands län"]
    ];

    const targetElm = document.querySelector('#sokrutan');
    const detailsElm = document.createElement('details');
    const summaryElm = document.createElement('summary');
    const containerElm = document.createElement('div');
    containerElm.style = 'column-count: 2;';
    summaryElm.innerText = 'Specialsökgenvägar';
    detailsElm.appendChild(summaryElm);

    specialSearchForms.forEach(form => {
      const aElm = document.createElement('a');
      aElm.href = form[0];
      aElm.innerText = form[1];
      aElm.style.display = 'block';
      containerElm.appendChild(aElm);
    });

    detailsElm.appendChild(containerElm);
    targetElm.appendChild(detailsElm);
})();
