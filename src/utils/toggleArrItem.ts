import { IWishlistItem } from "@Features/wishlist/types/wishlist";

export const getToggledArray = <T>(arr: T[], item: T): T[] => {
  return arr.includes(item)
    ? arr.filter((arrItem) => arrItem !== item)
    : [item, ...arr];
};

export const getToggledWishlist = (
  wishlist: IWishlistItem[],
  productId: string,
  userId: string
): IWishlistItem[] => {
  const existInWishlist = wishlist.find(
    (item) => item.productId === productId && item.userId === userId
  );

  if (existInWishlist) {
    return wishlist.filter((item) => item.productId !== productId);
  } else {
    return [{ userId, productId }, ...wishlist];
  }
};
