;
(function IIFE(){
  'use strict';
  
    // =============== Variables ================
    // JS variables
    let apiResponse     = {},
        wikiEntries     = [];
    
    // HTML elements
    let searchBtn       = document.getElementById('search-btn');
    var searchValue     = '';
    
    // =============== On Page Load ================
    document.addEventListener('DOMContentLoaded', function getLocationAndWeatherInformation(){
        
        // Click Event on the Search Button
        searchBtn.addEventListener('click', function (){
            
            // update the searchValue
            searchValue = document.getElementById('search-value').value;
            
            // API call
            getWikiInfoWithSearchValue();    
            
        });
        
    });


    // ============== Functions ================
    function getWikiInfoWithSearchValue(){
        let xhttp   = new XMLHttpRequest();
        let url     = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchValue}&titles=${searchValue}&prop=revisions&rvprop=content&format=json&formatversion=2&origin=*`;
        
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              
              apiResponse = JSON.parse(this.responseText);
              console.log(apiResponse);
              
              wikiEntries = apiResponse.query.search;
              console.log(wikiEntries);
              
              displayWikiEntries();
            } 
        };
        
        // Get the JSON data from the url with user position
        xhttp.open('GET', url, true);
          
        xhttp.send();
    };
    
    
    function displayWikiEntries() {
        for (let i = 0; i < wikiEntries.length; i++) {
            // create a block
                // display wikiEntries[i].title;
                wikiEntries[i].title
                // display wikiEntries[i].snippet;
            
        }
      
    }
    
    
})();

// when the user presses the search icon, the input value from the search form is used to query the wiki API

// Assign the titles and basic info for all the returning wiki articles

// Display the title and description in cards, or separate paragraph boxes