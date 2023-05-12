export interface ICategoryWithCount {
  title: string;
  count: number;
}

export interface ICategoryWithBrands {
  [key: string]: string[];
}
