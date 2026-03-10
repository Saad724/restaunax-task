import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: { payload: CartItem }) => {
      const existing = state.items.find((i) => i.id === payload.id);
      if (existing) {
        existing.quantity += payload.quantity;
      } else {
        state.items.push({
          id: payload.id,
          name: payload.name,
          quantity: payload.quantity,
          price: payload.price,
          image: payload.image,
        });
      }
    },
    removeFromCart: (state, { payload }: { payload: string }) => {
      state.items = state.items.filter((i) => i.id !== payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
