import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './features/todos/todoSlice';
import cartSlice from './features/cart/cartSlice';
import authSlice from './features/auth/authSlice';
const store = configureStore({
  reducer: {
    todos: todoSlice,
    cart: cartSlice,
    auth: authSlice
  },
})
export default store;
