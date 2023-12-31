export interface ApiCountryList {
  name: string;
  alpha3Code: string;
  independent: boolean;
}

export interface ApiCountryItem {
  name: string;
  capital: string;
  subregion: string;
  population: number;
  flag: string;
  timezones: [];
  borders: [];
  languages: [];
}

export interface CountryLanguages {
  name: string
}