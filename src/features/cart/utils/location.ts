import { ICountry } from "@Cart/types/location";

import { fetchCountries } from "../services/countries";

export const getCountries = async (): Promise<ICountry[]> => {
  const countries = await fetchCountries();
  return countries ? countries : [];
};

export const getFilteredCountries = (
  countries: ICountry[],
  value: string
): ICountry[] => {
  const validValue = value.trim().toLowerCase();

  return countries.filter((countrie) =>
    countrie.country.toLowerCase().includes(validValue)
  );
};

export const getFilteredCities = (
  countries: ICountry[],
  value: string,
  countrieCode: string
): string[] => {
  const validValue = value.trim().toLowerCase();

  const currentCountry = countries.find(
    (country) => country.iso2 === countrieCode
  );

  if (currentCountry) {
    return currentCountry.cities.filter((city) =>
      city.toLowerCase().includes(validValue)
    );
  } else {
    return [];
  }
};
