;
(function IIFE(){
  'use strict';
  
    // =============== Variables ================
    // JS variables
    let apiResponse     = {},
        wikiEntries     = [];
    
    // HTML elements
    const a              = document.querySelectorAll('a'),
        h3               = document.querySelectorAll('h3'),
        p                = document.querySelectorAll('p'),
        searchBar        = document.getElementById('search-value'),
        wikiContainer    = document.getElementById('wiki-container'),
        wikiReturnElement= document.querySelectorAll('.wiki-return-element');
    
    // =============== On Page Load ================
    document.addEventListener('DOMContentLoaded', function DOMLoaded(){
        
        // update the search results as the user types
        document.addEventListener('keyup', getWikiInfoAndSetHTML, false);
        
    }, {once: true});


    // ============== Functions ================
    function getWikiInfoAndSetHTML(){
        let xhttp = new XMLHttpRequest();
        let url   = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchBar.value}&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*`;
        
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                apiResponse = JSON.parse(this.responseText);
                
                wikiEntries = apiResponse.query.search;
              
                // write API response to HTML 
                displayWikiEntries();
            } 
        };
        
        xhttp.open('GET', url, true);
        xhttp.send();
    };
    
    function displayWikiEntries() {
        for (let i = 0; i < wikiEntries.length; i++) {

            // Reveal the div block
            wikiReturnElement[i].style.height = `auto`;
            wikiReturnElement[i].style.opacity = `1`;
            
            // Set its inner contents
            a[i + 1].href   = `https://en.wikipedia.org/wiki/${wikiEntries[i].title}`;
            h3[i].innerHTML = wikiEntries[i].title;
            p[i + 2].innerHTML  = wikiEntries[i].snippet;
        }
    };
    
})();