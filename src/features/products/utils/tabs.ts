import { IProduct } from "@Products/types/product";

export const getTabsData = (
  product: IProduct
): { title: string; length: number }[] => {
  const { description, reviews, questions } = product;
  return [
    { title: "Description", length: description.length },
    { title: "Reviews", length: reviews.length },
    { title: "Questions", length: questions.length },
  ];
};
