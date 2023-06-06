import { IWishlistItem } from "@Features/wishlist/types/wishlist";

export const getToggledArray = <T>(arr: T[], item: T): T[] => {
  return arr.includes(item)
    ? arr.filter((arrItem) => arrItem !== item)
    : [item, ...arr];
};

export const getToggledWishlist = (
  wishlist: IWishlistItem[],
  userId: string | null,
  productId: string
): IWishlistItem[] => {
  const existInWishlist = wishlist.find(
    (item) => item.productId === productId && item.userId === userId
  );

  if (existInWishlist) {
    return wishlist.filter((item) => {
      return item.productId !== productId || item.userId !== userId;
    });
  } else {
    return [{ userId, productId }, ...wishlist];
  }
};
