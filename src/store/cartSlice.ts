import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../components/types';

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        product.quantity = (product.quantity || 1) + 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        product.quantity = (product.quantity || 1) - 1;
        if (product.quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== action.payload);
        }
      }
    },
    setCart(state, action: PayloadAction<Product[]>) {
      state.cart = action.payload;
    },
    clearCart(state) {
      state.cart = [];
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

