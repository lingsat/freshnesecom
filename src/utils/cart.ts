import { City, ICity } from "country-state-city";

export const getCitiesByCountry = (countryCode: string): ICity[] => {
  if (!countryCode) {
    return [];
  } else {
    return City.getCitiesOfCountry(countryCode) || [];
  }
};
