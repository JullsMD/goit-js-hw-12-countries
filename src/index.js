import './sass/main.scss';
import fetchCountries from './fetchCountries'
import countryListRef from './templates/country-list.hbs';
import searchedCountryItemRef from './templates/searchedCountryItem.hbs';


import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import {error} from '@pnotify/core/dist/PNotify.js';

const  debounce = require('lodash.debounce');

const refs = {
searchForm: document.querySelector('.form-control'),
searchCountry: document.querySelector('.country-search-result'),
};



refs.searchForm.addEventListener ('input',debounce(onSearch, 500));


function onSearch (e){
    refs.searchCountry.innerHTML = '';
     const searchQuery = e.target.value;
     console.log( searchQuery,'');

if(searchQuery === ' '){
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
        const countryDescription = searchedCountryItemRef(data)
       refs.searchCountry.insertAdjacentHTML('beforeend',countryDescription) 
    }
    
    else if (data.length <= 10){
        const listOfIntendedCountries = countryListRef(data)
        refs.searchCountry.insertAdjacentHTML('beforeend',listOfIntendedCountries )
    }
        })

}