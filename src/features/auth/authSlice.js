
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../config";
import { isLoggedIn } from "../../func";
export const getUser = createAsyncThunk("auth/getUser", async (param, thunkApi) => {
    const response = await axios.get(`${SERVER}/api/user/get-info`, {withCredentials: true});
    return response.data;
});
const cartSlice = createSlice({
    name: 'auth',
    
    initialState: {
        current: {},
        loading: true,
        isLoggedIn: isLoggedIn()
    },
    reducers: {

    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.loading = false;

        },
        [getUser.fulfilled]: (state, action) => {
            state.current = action.payload;
            state.loading = false;
            state.isLoggedIn = true;
        }
    }
  });
  const { actions, reducer } = cartSlice;
  export const { setAuth } = actions;
  export default reducer;