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
  farm: string;
  stock: number;
}
