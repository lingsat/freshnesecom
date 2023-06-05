export interface IDescription {
  category: string;
  text: string;
}

export interface IReview {
  authorName: string;
  authorImage: string;
  text: string;
}

export interface IQuestion {
  question: string;
  answers: string[];
}

export interface IProduct {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  images: string[];
  stars: number;
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
  description: IDescription[];
  reviews: IReview[];
  questions: IQuestion[];
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
