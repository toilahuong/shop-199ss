
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../config";
export const getUser = createAsyncThunk("auth/getUser", async (param, thunkApi) => {
    const response = await axios.post(`${SERVER}/api/user/get-info`, {}, {withCredentials: true});
    return response.data;
});
const cartSlice = createSlice({
    name: 'auth',
    initialState: {
        current: {},
    },
    reducers: {
      getUser(state) {
        return state
      }
    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
        },
        [getUser.rejected]: (state, action) => {
            localStorage.removeItem("auth");
        },
        [getUser.fulfilled]: (state, action) => {
            state.current = action.payload;
        }
    }
  });
  const { actions, reducer } = cartSlice;
  export const { setAuth } = actions;
  export default reducer;