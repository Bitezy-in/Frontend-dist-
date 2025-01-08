import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import cartReducer from "./cart";
import orderReducer from "./order"
import notificationReducer from "./notification";
export const store = configureStore({
  reducer: {
    customer: userReducer,
    cart: cartReducer,
    order: orderReducer,
    notification: notificationReducer
  },
});

