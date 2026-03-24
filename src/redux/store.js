import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    product: productReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginSuccess', 'order/createOrderSuccess'],
        ignoredPaths: ['auth.user', 'order.orders'],
      },
    }),
});

export default store;
