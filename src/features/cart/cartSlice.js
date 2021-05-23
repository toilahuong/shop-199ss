
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        numberProduct: 0,
        listProduct: []
    },
    reducers: {
      incrementNumberProduct(state,action) {
        state.numberProduct += action.payload;
      },
      decrementNumberProduct(state,action) {
        state.numberProduct -= action.payload;
      },
      incrementProduct(state,action) {
          let check = true;
          state.listProduct.every((item) => {
            if(item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size) {
                check = false;
                item.amount += action.payload.amount;
                return false;
            }
            return true;
          });
          if (check) {
              state.listProduct.push(action.payload);
          }
          
      },
      removeProduct(state,action) {
        state.listProduct.splice(action.payload,1);
      }
    }
  });
  const { actions, reducer } = cartSlice;
  export const { incrementNumberProduct, decrementNumberProduct, incrementProduct, removeProduct } = actions;
  export default reducer;