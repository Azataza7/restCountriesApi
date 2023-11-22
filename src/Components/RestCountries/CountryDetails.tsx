import React from 'react';

interface Props {
  alphaCode: string;
}

const countryUrl = `https://restcountries.com/v2/alpha/`;

const CountryDetails: React.FC<Props> = ({alphaCode}) => {
  const fetchData = () => {
  };

  return (
    <div className="country-details">
      {alphaCode}
    </div>
  );
};

export default CountryDetails;