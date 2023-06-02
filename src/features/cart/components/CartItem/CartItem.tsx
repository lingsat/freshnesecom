import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { removeSingleCartItem, changeCartItem } from "@Cart/cartSlice";
import { ERoutes } from "@/types/routes";
import { ECount } from "@Products/types/product";
import { ICartItemWithProduct } from "@Cart/types/cart";
import Stars from "@CommonComponents/Stars/Stars";
import Count from "@CommonComponents/Count/Count";

import heart from "@Images/heart_thin.svg";
import close from "@Images/close.svg";

import "./CartItem.scss";

interface CartItemProps {
  itemWithProduct: ICartItemWithProduct;
  invalidCategories: string[];
}

const CartItem: FC<CartItemProps> = ({
  itemWithProduct,
  invalidCategories,
}) => {
  const { product, count } = itemWithProduct;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isCountInvalid =
    count.amount > product.stock[count.category] ||
    count.amount < ECount.MIN_COUNT_VALUE;
  const priceSummary = (product.price[count.category] * count.amount).toFixed(
    2
  );

  const handleRemoveCartItem = () => {
    dispatch(
      removeSingleCartItem({ productId: product.id, category: count.category })
    );
  };

  const handleOpenProduct = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}/${product.id}`);
  };

  const handleChangeCategory = (newCategory: string) => {
    const newCartData = {
      productId: product.id,
      count: {
        amount: count.amount,
        category: newCategory,
      },
    };
    dispatch(changeCartItem({ newCartData, oldCategory: count.category }));
  };

  const handleChangeAmount = (newAmount: number) => {
    const newCartData = {
      productId: product.id,
      count: {
        amount: newAmount,
        category: count.category,
      },
    };
    dispatch(changeCartItem({ newCartData, oldCategory: count.category }));
  };

  return (
    <li className="cart-item">
      <div className="cart-item__left">
        <img
          src={product.images[0]}
          alt={product.title}
          className="cart-item__image"
          onClick={handleOpenProduct}
        />
        <div className="cart-item__buttons">
          <button className="cart-item__btn">
            <img src={heart} alt="Heart" />
            Wishlist
          </button>
          <button className="cart-item__btn" onClick={handleRemoveCartItem}>
            <img src={close} alt="Close" />
            Remove
          </button>
        </div>
      </div>
      <div className="cart-item__right">
        <h3 className="cart-item__title" onClick={handleOpenProduct}>
          {product.title}
        </h3>
        <ul className="cart-item__list">
          <li className="cart-item__item">
            <p className="cart-item__category">Brand:</p>
            <p className="cart-item__value">{product.brand}</p>
          </li>
          <li className="cart-item__item">
            <p className="cart-item__category">Freshness:</p>
            <p className="cart-item__value">{product.freshness}</p>
          </li>
        </ul>
        <Stars checkedStars={product.stars.toString()} />
        <div className="cart-item__controls">
          <p className="cart-item__price">{priceSummary} USD</p>
          <Count
            product={product}
            countCategory={count.category}
            handleChangeCategory={handleChangeCategory}
            count={count.amount}
            handleChangeAmount={handleChangeAmount}
            isCountInvalid={isCountInvalid}
            invalidCategories={invalidCategories}
            maxCount={product.stock[count.category]}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
