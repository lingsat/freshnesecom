import { fetchCitiesByCountrieCode } from "@Cart/services/cities";
import { ICity, ICountry } from "@Cart/types/location";

export const getCities = async (countryCode: string): Promise<ICity[]> => {
  if (!countryCode) {
    return [];
  } else {
    const citiesAll = await fetchCitiesByCountrieCode(countryCode);
    return citiesAll
      ? citiesAll.sort((a, b) => a.name.localeCompare(b.name))
      : [];
  }
};

export const getFilteredCities = (
  cities: ICity[],
  cityValue: string
): ICity[] => {
  const validCityValue = cityValue.trim().toLowerCase();

  return cities.filter((city) =>
    city.name.toLowerCase().includes(validCityValue)
  );
};

export const getFilteredCountries = (
  allCountries: ICountry[],
  countryValue: string
): ICountry[] => {
  const validCountryValue = countryValue.trim().toLowerCase();

  if (allCountries) {
    return allCountries.filter((country) =>
      country.label.toLowerCase().includes(validCountryValue)
    );
  } else {
    return [];
  }
};
