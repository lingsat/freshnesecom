import axios from "axios";

import { ICity } from "@Cart/types/location";

const config = {
  headers: {
    apikey: process.env.REACT_APP_CITIES_API_KEY,
  },
};

export const fetchCitiesByCountrieCode = async (
  countrieCode: string
): Promise<ICity[] | undefined> => {
  try {
    const cities = await axios.get<ICity[]>(
      `${process.env.REACT_APP_CITIES_API_URL}/${countrieCode}`,
      config
    );
    return cities.data;
  } catch (error) {
    console.log(error);
  }
};
