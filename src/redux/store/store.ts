import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/user.slice';
import { saveState } from '../storage/storage';
import cartSlice from '../slices/cart.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, 'userData');
  saveState(store.getState().cart, 'cartData');
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
