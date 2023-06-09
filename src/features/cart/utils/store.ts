import { ICount, ICartItem, ICartData } from "@Cart/types/cart";

const getCountArray = (countArr: ICount[], newCount: ICount) => {
  const updatedCountArr = countArr.map((item) => {
    return item.category === newCount.category
      ? { ...item, amount: item.amount + newCount.amount }
      : item;
  });

  if (!updatedCountArr.some((item) => item.category === newCount.category)) {
    updatedCountArr.unshift(newCount);
  }

  return updatedCountArr;
};

const getDevidedCart = (
  cart: ICartItem[],
  userId: string | null
): { userCart: ICartItem[]; nullCart: ICartItem[] } => {
  const userCart: ICartItem[] = [];
  const nullCart: ICartItem[] = [];

  cart.forEach((item) => {
    item.userId === userId ? userCart.push(item) : nullCart.push(item);
  });

  return { userCart, nullCart };
};

export const addProdToCart = (
  cart: ICartItem[],
  newCartData: ICartData,
  idOfUser: string | null
): ICartItem[] => {
  const { userId, productId, count } = newCartData;
  const { userCart, nullCart } = getDevidedCart(cart, idOfUser);

  const itemInArr = userCart.find(
    (item) => item.productId === newCartData.productId
  );

  if (itemInArr) {
    const newCountArr = getCountArray(itemInArr.countArr, count);
    const newItem: ICartItem = { ...itemInArr, countArr: newCountArr };
    const modedUserCart = userCart.map((item) => {
      return item.productId === itemInArr.productId ? newItem : item;
    });
    return [...modedUserCart, ...nullCart];
  } else {
    const newItem: ICartItem = {
      userId,
      productId,
      countArr: [{ amount: count.amount, category: count.category }],
    };
    return [newItem, ...userCart, ...nullCart];
  }
};

export const getUpdatedCart = (
  cart: ICartItem[],
  newCartData: ICartData,
  oldCategory: string,
  userId: string | null
): ICartItem[] => {
  const { productId, count } = newCartData;
  const { userCart, nullCart } = getDevidedCart(cart, userId);

  const updatedCart = userCart.map((item) => {
    if (item.productId === productId) {
      const updatedCountArr = item.countArr.map((countItem) => {
        return countItem.category === oldCategory ? count : countItem;
      });
      return { ...item, countArr: updatedCountArr };
    } else {
      return item;
    }
  });

  return [...updatedCart, ...nullCart];
};

export const getMergedCart = (
  cart: ICartItem[],
  newCartData: ICartData,
  oldCategory: string,
  userId: string | null
): ICartItem[] => {
  const { productId, count } = newCartData;
  const { userCart, nullCart } = getDevidedCart(cart, userId);

  const mergedCart = userCart.map((item) => {
    if (item.productId === productId) {
      const countAfterRemove = item.countArr.filter(
        (count) => count.category !== oldCategory
      );
      const updatedCountArr = countAfterRemove.map((countItem) => {
        return countItem.category === count.category ? count : countItem;
      });
      return { ...item, countArr: updatedCountArr };
    } else {
      return item;
    }
  });

  return [...mergedCart, ...nullCart];
};

export const getCartAfterRemove = (
  cart: ICartItem[],
  id: string,
  category: string,
  userId: string | null
): ICartItem[] => {
  const { userCart, nullCart } = getDevidedCart(cart, userId);
  const productInCart = userCart.find((cartItem) => cartItem.productId === id);

  if (productInCart) {
    if (productInCart.countArr.length === 1) {
      const useCartAfterRemove = userCart.filter(
        (item) => item.productId !== id
      );
      return [...useCartAfterRemove, ...nullCart];
    } else {
      const newCountArr = productInCart.countArr.filter(
        (count) => count.category !== category
      );
      const newProduct: ICartItem = { ...productInCart, countArr: newCountArr };
      const updatedUserCart = userCart.map((item) =>
        item.productId === id ? newProduct : item
      );
      return [...updatedUserCart, ...nullCart];
    }
  } else {
    return cart;
  }
};
