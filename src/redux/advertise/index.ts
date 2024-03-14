import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';
import data,{ TAdvertise } from "../data_types";
import { client,URL} from "../../service/api";

// Define a type for the slice state

interface UserState {
    loading: boolean;
    advertises: EntityState<TAdvertise>;
    error: string | undefined;
}

const advertiseAdapter = createEntityAdapter<TAdvertise>()
const initState = advertiseAdapter.getInitialState({})
// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    advertises: initState,
    error: undefined,
};

export const fetch = createAsyncThunk('advertise/fetch', async () => {
  
  if (URL.length === 0){
    const response = await client.get('advertises')
    return response.data
  }
  else  {
    return data.advertises
  }
})

export const advertiseSlice = createSlice({
    name: "advertise",
    initialState,
    reducers: { 

    },
    
    extraReducers(builder) {
        builder
          .addCase(fetch.pending, (state) => {
                state.loading = true;
            })
          .addCase(fetch.fulfilled, (state, action) => {
                state.loading = false;
                advertiseAdapter.setAll(state.advertises, action.payload);
            })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
    
});

export const {
} = advertiseSlice.actions;
export const { selectAll, selectById } = advertiseAdapter.getSelectors();
export default advertiseSlice.reducer;

