import axios from "axios";

import { ICountry } from "@Cart/types/location";

export const fetchCountries = async (): Promise<ICountry[] | undefined> => {
  try {
    const response = await axios.get<{ data: ICountry[] }>(
      `https://countriesnow.space/api/v0.1/countries`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
