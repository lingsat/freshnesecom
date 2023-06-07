import axios from "axios";

import { ICityRes } from "@Cart/types/location";

const config = {
  headers: {
    apikey: process.env.REACT_APP_CITIES_API_KEY,
  },
};

export const fetchCitiesByCountrieCode = async (
  countrieCode: string
): Promise<ICityRes[] | undefined> => {
  try {
    const cities = await axios.get<ICityRes[]>(
      `${process.env.REACT_APP_CITIES_API_URL}/${countrieCode}`,
      config
    );
    return cities.data;
  } catch (error) {
    console.log(error);
  }
};
