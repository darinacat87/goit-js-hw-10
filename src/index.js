import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();
  clearMarkup();
  if (
    !refs.input.value || refs.input.value.trim().length === 0
  ) {
    return;
  }
  fetchCountries(event.target.value.trim())
    .then(addCountryMarkup)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function addCountryMarkup(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length === 1) {
    countryInfo(countries);
  } else {
    listCountriesMarkup(countries);
  }
}

function listCountriesMarkup(countries) {
  const listElementMarkup = countries
    .map(
      country =>
        `<li class="country-list__item">
        <img class="flag" src=${country.flags.svg} alt="flag" width="60"></img>
        ${country.name.official}</li>`
    )
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', listElementMarkup);
}

function countryInfo(countries) {
  const listElementMarkup = countries
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class="blockrow"><img class="flag" src=${
          flags.svg
        } alt="flag" width="60">
        <h2 class="country-info__name">${name.official}</h2></div>
         <p class="country-info__description">Capital: <span class="country-info__value">${capital}</span></p>
         <p class="country-info__description">Population: <span class="country-info__value">${population}</span></p>
         <p class="country-info__description">Languages: <span class="country-info__value">${Object.values(
           languages
         )}</span></p>`
    )
    .join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', listElementMarkup);
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
