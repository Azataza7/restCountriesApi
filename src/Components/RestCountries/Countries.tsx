import React from 'react';
import {ApiCountryList} from '../../types';

interface Props {
  countryList: ApiCountryList[];
  onSelectCountry: (code: string) => void;
}

const Countries = React.memo(({countryList, onSelectCountry}:Props) => {
  const countries = (
    countryList.map((country, index) => (
      <span key={index} onClick={() => onSelectCountry(country.alpha3Code)}>{country.name}</span>
    ))
  );

  return (
    <div className="countries">
      {countries}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.countryList === nextProps.countryList;
});

export default Countries;