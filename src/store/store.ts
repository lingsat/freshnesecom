import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "@Products/productsSlice";
import cartReducer from "@Cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import authReducer from "@/features/auth/authSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  products: productReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
