import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "@Products/productsSlice";
import cartReducer from "@Cart/cartSlice";
import wishlistReducer from "@Wishlist/wishlistSlice";
import authReducer from "@Auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
