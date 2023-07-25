import countries, {
  alpha3ToAlpha2,
  getAlpha2Code,
  getName,
} from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export const getCountryCode = (country: string | undefined) => {
  if (country?.length === 3)
    return alpha3ToAlpha2(country.toUpperCase()).toLowerCase();
  return country ? getAlpha2Code(country, 'en')?.toLowerCase() : 'earth';
};

export const getCountryName = (country: string | undefined) =>
  country ? getName(country, 'en') : 'Earth';
