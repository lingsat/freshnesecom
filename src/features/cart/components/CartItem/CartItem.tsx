import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import {
  removeSingleCartItem,
  changeCartItemCount,
  mergeCartItemCategories,
  ICartState,
  selectCart,
} from "@Cart/cartSlice";
import { getNewCountAmount } from "@Cart/utils/cart";
import { ERoutes } from "@/types/routes";
import { ECount } from "@Products/types/product";
import { ICartItemWithProduct } from "@Cart/types/cart";
import Stars from "@CommonComponents/Stars/Stars";
import Count from "@CommonComponents/Count/Count";
import Modal from "@CommonComponents/Modal/Modal";

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
  const { cart } = useSelector<RootState, ICartState>(selectCart);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const [nextCategory, setNextCategory] = useState<string>("");

  const isCountInvalid =
    count.amount > product.stock[count.category] ||
    count.amount < ECount.MIN_COUNT_VALUE;
  const priceSummary = (product.price[count.category] * count.amount).toFixed(
    2
  );

  const notifyChangeCountCategory = (amount: number, category: string) =>
    toast.warn(
      `Amount was decreased! We have only ${amount} "${category}" in stock.`
    );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemoveCartItem = () => {
    dispatch(
      removeSingleCartItem({ productId: product.id, category: count.category })
    );
  };

  const handleOpenProduct = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}/${product.id}`);
  };

  const handleChangeCategory = (newCategory: string) => {
    setNextCategory(newCategory);
    if (invalidCategories.includes(newCategory)) {
      const nextAmount = getNewCountAmount(cart, product.id, newCategory);
      let amountSum = nextAmount + count.amount;

      if (amountSum > product.stock[newCategory]) {
        amountSum = product.stock[newCategory];
        setModalText(
          `You already have ${nextAmount} "${newCategory}" in cart. Now you trying to add ${count.amount} "${newCategory}" more, but we have only ${product.stock[newCategory]} "${newCategory}" in stock. Press Cancel to change amount or Confirm - to get ${product.stock[newCategory]} "${newCategory}".`
        );
      } else {
        setModalText(
          `You already have ${nextAmount} "${newCategory}" in cart. Now you trying to add ${
            count.amount
          } "${newCategory}" more. Press Cancel to change amount or Confirm - to get ${
            nextAmount + count.amount
          } "${newCategory}".`
        );
      }
      handleOpenModal();
    } else {
      handleSetCategory(newCategory);
    }
  };

  const handleSetCategory = (newCategory: string) => {
    let validAmount = count.amount;

    if (count.amount > product.stock[newCategory]) {
      notifyChangeCountCategory(product.stock[newCategory], newCategory);
      validAmount = product.stock[newCategory];
    }

    const newCartData = {
      productId: product.id,
      count: {
        amount: validAmount,
        category: newCategory,
      },
    };
    dispatch(changeCartItemCount({ newCartData, oldCategory: count.category }));
  };

  const handleMergeCategories = () => {
    const nextAmount = getNewCountAmount(cart, product.id, nextCategory);
    let amountSum = nextAmount + count.amount;

    if (amountSum > product.stock[nextCategory]) {
      amountSum = product.stock[nextCategory];
    }

    const newCartData = {
      productId: product.id,
      count: {
        amount: amountSum,
        category: nextCategory,
      },
    };

    dispatch(
      mergeCartItemCategories({ newCartData, oldCategory: count.category })
    );
    handleCloseModal();
  };

  const handleChangeAmount = (newAmount: number) => {
    const newCartData = {
      productId: product.id,
      count: {
        amount: newAmount,
        category: count.category,
      },
    };
    dispatch(changeCartItemCount({ newCartData, oldCategory: count.category }));
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [showModal]);

  return (
    <li className="cart-item">
      {showModal && (
        <Modal
          text={modalText}
          confirmBtnText="Confirm"
          onModalConfirm={handleMergeCategories}
          onModalCancel={handleCloseModal}
        />
      )}
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
            maxCount={product.stock[count.category]}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
