import React from 'react';
import {ApiCountryList} from '../../types';

interface Props {
  countryList: ApiCountryList[];
  onSelectCountry: (code: string) => void;
  onLoading: boolean;
}

const Countries = React.memo(({countryList, onSelectCountry, onLoading}: Props) => {
  const countries = (
    countryList.map((country, index) => (
      <span key={index} onClick={() => onSelectCountry(country.alpha3Code)}>{country.name}</span>
    ))
  );

  const containerStyle = {display: onLoading ? 'block' : 'none'};

  return (
    <div className="countries">
      {onLoading ? (
        <div className="lds-dual-ring" style={containerStyle}/>
      ) : (
        countries
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.countryList === nextProps.countryList;
});

export default Countries;