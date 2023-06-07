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
import {
  IWishlistState,
  selectWishlist,
  toggleWishlistItem,
} from "@Wishlist/wishlistSlice";
import { showAuth } from "@Auth/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { findProductInWishlist } from "@/utils/products";
import { ERoutes } from "@/types/routes";
import { ECount } from "@/common/types/count";
import { ICartItemWithProduct } from "@Cart/types/cart";
import Stars from "@CommonComponents/Stars/Stars";
import Count from "@CommonComponents/Count/Count";
import Modal from "@CommonComponents/Modal/Modal";

import heart from "@Images/heart_thin.svg";
import heartFilled from "@Images/heart_filled.svg";
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
  const { wishlist } = useSelector<RootState, IWishlistState>(selectWishlist);
  const { isAuth, userId } = useAuth();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const [nextCategory, setNextCategory] = useState<string>("");

  const isCountInvalid =
    count.amount > product.stock[count.category] ||
    count.amount < ECount.MIN_COUNT_VALUE;
  const priceSummary = (product.price[count.category] * count.amount).toFixed(
    2
  );
  const isInWishlist =
    findProductInWishlist(wishlist, userId, product.id) && isAuth;

  const notifyChangeCountCategory = (amount: number, category: string) =>
    toast.warn(
      `Amount was decreased! We have only ${amount} "${category}" in stock.`
    );

  const notifyNotLoggedIn = () =>
    toast.warn("The Wishlist is available only to authorized users");

  const handleToggleWishlist = () => {
    if (!isAuth) {
      notifyNotLoggedIn();
      dispatch(showAuth());
    } else {
      dispatch(toggleWishlistItem({ userId, productId: product.id }));
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemoveCartItem = () => {
    dispatch(
      removeSingleCartItem({
        productId: product.id,
        category: count.category,
        userId,
      })
    );
  };

  const handleOpenProduct = () => {
    navigate(`/${ERoutes.PRODUCTS_LIST}/${product.id}`);
  };

  const handleChangeCategory = (newCategory: string) => {
    const maxNewCategoryStock = product.stock[newCategory];
    setNextCategory(newCategory);

    if (invalidCategories.includes(newCategory)) {
      const nextAmount = getNewCountAmount(
        cart,
        product.id,
        newCategory,
        userId
      );
      let amountSum = nextAmount + count.amount;

      if (amountSum > maxNewCategoryStock) {
        amountSum = maxNewCategoryStock;
        setModalText(
          `You already have ${nextAmount} "${newCategory}" in cart. Now you trying to add ${count.amount} "${newCategory}" more, but we have only ${maxNewCategoryStock} "${newCategory}" in stock. Press Cancel to change amount or Confirm - to get ${maxNewCategoryStock} "${newCategory}".`
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
    const maxNewCategoryStock = product.stock[newCategory];
    let validAmount = count.amount;

    if (count.amount > maxNewCategoryStock) {
      notifyChangeCountCategory(maxNewCategoryStock, newCategory);
      validAmount = maxNewCategoryStock;
    }

    const newCartData = {
      userId,
      productId: product.id,
      count: {
        amount: validAmount,
        category: newCategory,
      },
    };
    dispatch(
      changeCartItemCount({ newCartData, oldCategory: count.category, userId })
    );
  };

  const handleMergeCategories = () => {
    const maxNewCategoryStock = product.stock[nextCategory];
    const nextAmount = getNewCountAmount(
      cart,
      product.id,
      nextCategory,
      userId
    );
    let amountSum = nextAmount + count.amount;

    if (amountSum > maxNewCategoryStock) {
      amountSum = maxNewCategoryStock;
    }

    const newCartData = {
      userId,
      productId: product.id,
      count: {
        amount: amountSum,
        category: nextCategory,
      },
    };

    dispatch(
      mergeCartItemCategories({
        newCartData,
        oldCategory: count.category,
        userId,
      })
    );
    handleCloseModal();
  };

  const handleChangeAmount = (newAmount: number) => {
    const newCartData = {
      userId,
      productId: product.id,
      count: {
        amount: newAmount,
        category: count.category,
      },
    };
    dispatch(
      changeCartItemCount({ newCartData, oldCategory: count.category, userId })
    );
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
          <button className="cart-item__btn" onClick={handleToggleWishlist}>
            <img src={isInWishlist ? heartFilled : heart} alt="Heart" />
            {isInWishlist ? "Unwish" : "Wishlist"}
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
