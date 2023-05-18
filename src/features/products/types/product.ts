export interface IProduct {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  stars: number;
  votes: number;
  price: number;
  oldPrice: number;
  freeShipping: boolean;
  deliveryTime: number;
  deliveryFrom: string;
  tags: string[];
  freshness: string;
  brand: string;
  stock: number;
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

export enum ESort {
  CLEAR = "",
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
