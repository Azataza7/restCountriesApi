import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {ApiCountryItem, CountryLanguages} from '../../types';
import './RestCountries.css';

interface Props {
  alphaCode: string | null;
}

const countryUrl = `https://restcountries.com/v2/alpha/`;

const CountryDetails: React.FC<Props> = ({alphaCode}) => {
  const [countryItem, setCountryItem] = useState<ApiCountryItem | null>(null);
  const [borderCountry, setBorderItem] = useState([]);

  const fetchCountryItem = useCallback(async () => {
    if (alphaCode !== null) {
      try {
        const response = await axios.get<ApiCountryItem>(countryUrl + alphaCode);
        setCountryItem(response.data);

        if (!response.data.borders) {
          setBorderItem([]);
        } else {
          const borderPromises = response.data.borders.map(async (borderCode: string) => {
            const borderResponse = await axios.get<ApiCountryItem>(countryUrl + borderCode);
            return borderResponse.data.name;
          });

          const borderCountries = await Promise.all(borderPromises);
          setBorderItem(borderCountries);
        }
      } catch (e) {
        console.log('error:' + e);
      }

    }
  }, [alphaCode]);

  useEffect(() => {
    void fetchCountryItem();
  }, [fetchCountryItem]);

  return (
    <div className="country-details">
      {countryItem ? (
        <div>
          <div className="head-country">
            <h3 className="name-country">{countryItem.name}</h3>
            <img className="country-img" src={countryItem.flag} alt={countryItem.name}/>
          </div>
          <div className="body-country">
            <span className="capital">Capital: {countryItem?.capital}</span>
            <span className="population">Population: {countryItem.population}</span>
            <span className="timezone">Timezone: {countryItem.timezones[0]}</span>
            <span className="region">Continent: {countryItem.subregion}</span>
            <div className="languages">
              Languages:
              {countryItem?.languages.map((item: CountryLanguages, i) => (
                <span key={i}>{item.name}</span>
              ))}
            </div>
          </div>
          <ul className="bordering-countries">
            {borderCountry &&
            borderCountry.map((border: string, i) =>
              <li key={i}>{border}</li>)}
          </ul>
        </div>
      ) : (
        <p className="no-country">No country selected</p>
      )}
    </div>
  );
};

export default CountryDetails;