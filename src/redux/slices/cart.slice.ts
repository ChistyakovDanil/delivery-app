import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../storage/storage';

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>('cartData') ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (existed) {
        if (existed.count === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          state.items.map((i) => {
            if (i.id === action.payload) {
              i.count -= 1;
            }
            return 1;
          });
          return;
        }
      }
    },
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return 1;
      });
    },
  },
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
