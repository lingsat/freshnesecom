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

export const addProdToCart = (cart: ICartItem[], newCartData: ICartData) => {
  const { userId, productId, count } = newCartData;

  const itemInArr = cart.find(
    (item) => item.productId === newCartData.productId
  );

  if (itemInArr) {
    const newCountArr = getCountArray(itemInArr.countArr, count);
    const newItem: ICartItem = { ...itemInArr, countArr: newCountArr };
    return cart.map((item) => {
      return item.productId === itemInArr.productId ? newItem : item;
    });
  } else {
    const newItem: ICartItem = {
      userId,
      productId,
      countArr: [{ amount: count.amount, category: count.category }],
    };
    return [newItem, ...cart];
  }
};

export const getUpdatedCart = (
  cart: ICartItem[],
  newCartData: ICartData,
  oldCategory: string
): ICartItem[] => {
  const { productId, count } = newCartData;
  return cart.map((item) => {
    if (item.productId === productId) {
      const updatedCountArr = item.countArr.map((countItem) => {
        return countItem.category === oldCategory ? count : countItem;
      });
      return { ...item, countArr: updatedCountArr };
    } else {
      return item;
    }
  });
};

export const getMergedCart = (
  cart: ICartItem[],
  newCartData: ICartData,
  oldCategory: string
): ICartItem[] => {
  const { productId, count } = newCartData;
  return cart.map((item) => {
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
};

export const getCartAfterRemove = (
  cart: ICartItem[],
  id: string,
  category: string
): [ICartItem[], boolean] => {
  let isCartProductsNeedClear = false;
  const index = cart.findIndex((cartItem) => cartItem.productId === id);

  if (index !== -1) {
    const cartItem = cart[index];

    if (cartItem.countArr.length === 1) {
      isCartProductsNeedClear = true;
      cart.splice(index, 1);
    } else {
      cartItem.countArr = cartItem.countArr.filter(
        (count) => count.category !== category
      );
    }
  }

  return [cart, isCartProductsNeedClear];
};
