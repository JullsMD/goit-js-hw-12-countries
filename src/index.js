import './sass/main.scss';
import fetchCountries from './fetchCountries'
import countryListItemRef from './templates/countryListItem.hbs';
import searchedCountryItemRef from './templates/searchedCountryItem.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import {error} from '@pnotify/core/dist/PNotify.js';


// REFS
const searchCountryInputRef = document.querySelector('#searchCountryInput');
const searchCountryListRef = document.querySelector('.searchCountryList');
// Задержка
const  debounce = require('lodash.debounce');
searchCountryInputRef.addEventListener ('input',debounce(onSearch, 500));
// 
function onSearch (e){
    searchCountryListRef.innerHTML = '';
     const searchQuery = e.target.value.trim();
if(searchQuery === ''){
   return;
}
  fetchCountries(searchQuery). then(data => {
    if (!data){
          return;
      }
    if(data.length > 10){
        error({
            text: "Too many matches found. Please enter a more specific query!"
        });
    }
    else if (data.status === 404){
        error({
            text: "There is no such country! Refine your request."
        })
    }
    else if (data.length === 1){
       const countryInfo = searchedCountryItemRef(data);
       searchCountryListRef.insertAdjacentHTML('beforeend',countryInfo);
    }
    
    else if (data.length <= 10){
        const listOfIntendedCountries = countryListItemRef(data);
        searchCountryListRef.insertAdjacentHTML('beforeend',listOfIntendedCountries);
    }
        })

}