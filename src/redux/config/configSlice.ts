import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCTS } from "../data";
import { Product, SIZES } from "../data_types";
import * as asyncStore from '../../storage/asyncStore'
import { string } from "yup";

export interface SysConfig {
    loginMode: 'sign'|'unsign'|'unknow';
}

const getLoginMode1Async = () => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const mode = await asyncStore.getLoginMode();
      // dispatch an action when we get the response back
      dispatch(setMode(mode))
    } catch (err) {
      // If something went wrong, handle it here
    }
  } 
}

const setLoginMode1Async = () => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    const mode = dispatch(getMode())
    try {
      // make an async call in the thunk
      await asyncStore.setLoginMode(mode);
      // dispatch an action when we get the response back
      dispatch(setMode(mode))
    } catch (err) {
      // If something went wrong, handle it here
    }
  } 
}

export const configSlice = createSlice({
    name: "loginMode",
    initialState: {
        loginMode: 'unknown'
    },
    reducers: {
        getMode: state => {
            state.loginMode;
        },
        setMode: (state, action) => {
            state.loginMode = action.payload
        }
    },
});

export const {
    getMode,
    setMode,
} = configSlice.actions;

export default configSlice.reducer;
