import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './features/todos/todoSlide';
import cartSlice from './features/cart/cartSlide';
const store = configureStore({
  reducer: {
    todos: todoSlice,
    cart: cartSlice
  },
})
export default store;