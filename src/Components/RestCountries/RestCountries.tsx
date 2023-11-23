import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ApiCountryList} from '../../types';
import Countries from './Countries';

import './RestCountries.css';
import CountryDetails from './CountryDetails';

const BASE_URL = 'https://restcountries.com/v2/';
const listCountryUrl = `${BASE_URL}all?fields=alpha3Code,name`;


const RestCountries = () => {
  const [countryList, setCountryList] = useState<ApiCountryList[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true)

    try {
      const response = await axios.get<ApiCountryList[]>(listCountryUrl);
      return setCountryList(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);


  return (
    <div className="rest-country">
      <Countries
        countryList={countryList}
        onSelectCountry={(code) => setSelectedCountryCode(code)}
        onLoading={loading}
      />
      <CountryDetails alphaCode={selectedCountryCode}/>
    </div>
  );
};

export default RestCountries;