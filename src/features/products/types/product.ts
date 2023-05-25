export interface IProduct {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  images: string[];
  stars: number;
  votes: number;
  mainPrice: number;
  price: {
    [key: string]: number;
  };
  discount: number;
  freeShipping: boolean;
  deliveryTime: number;
  countryFrom: string;
  countryFromCode: number;
  deliveryArea: string;
  tags: string[];
  freshness: string;
  brand: string;
  stock: {
    [key: string]: number;
  };
  color: string;
  size: string;
  mainCountCategory: string;
}

export interface ICategory {
  [key: string]: {
    count: number;
    brands: string[];
  };
}

export enum EPrice {
  MIN_DISTANCE = 5,
}

export enum ECount {
  MIN_COUNT_VALUE = 1,
}

export enum ESort {
  PRICE_LOW = "Lowest Price",
  PRICE_HIGH = "Highest Price",
  RATING_LOW = "Lowest Rating",
  RATING_HIGH = "Highest Rating",
  TITLE_ASC = "Title A-Z",
  TITLE_DESC = "Title Z-A",
}

export enum EStars {
  FIVE = "5",
  FOUR = "4",
  THREE = "3",
  TWO = "2",
  ONE = "1",
}
