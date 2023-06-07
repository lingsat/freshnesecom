import { fetchCitiesByCountrieCode } from "@Cart/services/cities";
import { ICity } from "@Cart/types/location";

export const getCities = async (countryCode: string): Promise<ICity[]> => {
  if (!countryCode) {
    return [];
  } else {
    const citiesAll = await fetchCitiesByCountrieCode(countryCode);

    if (citiesAll) {
      const validCities: ICity[] = citiesAll.map((city) => ({
        label: city.name,
      }));
      return validCities.sort((a, b) => a.label.localeCompare(b.label));
    } else {
      return [];
    }
  }
};

export const getFilteredLocations = <T extends { label: string }>(
  locationsArr: T[],
  value: string
): T[] => {
  const validValue = value.trim().toLowerCase();

  return locationsArr.filter((item) =>
    item.label.toLowerCase().includes(validValue)
  );
};
