import { City, Country, ICity, ICountry } from "country-state-city";

export const getCitiesByCountry = (
  countryCode: string,
  cityValue: string
): ICity[] => {
  const validCityValue = cityValue.trim().toLowerCase();

  if (!countryCode) {
    return [];
  } else {
    const citiesAll = City.getCitiesOfCountry(countryCode);
    return citiesAll
      ? citiesAll.filter((city) =>
          city.name.toLowerCase().includes(validCityValue)
        )
      : [];
  }
};

export const getCountries = (countryValue: string): ICountry[] => {
  const validCountryValue = countryValue.trim().toLowerCase();
  const countries = Country.getAllCountries();

  if (countries) {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(validCountryValue)
    );
  } else {
    return [];
  }
};
