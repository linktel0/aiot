import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';
import data,{ TCategory } from "../data_types";
import { client,URL} from "../../service/api";

// Define a type for the slice state

interface UserState {
    loading: boolean;
    categories: EntityState<TCategory>;
    error: string | undefined;
}

const categoryAdapter = createEntityAdapter<TCategory>()
const initState = categoryAdapter.getInitialState({
  
})
// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    categories: initState,
    error: undefined,
};

export const fetch = createAsyncThunk('category/fetch', async () => {
  
  if (URL.length > 0){
    const response = await client.get('categories')
    return response.data
  }
  else  {
    return data.categories
  }
})

export const categorySlice = createSlice({
    name: "category",
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
                categoryAdapter.setAll(state.categories, action.payload);
            })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
    
});

export const {
} = categorySlice.actions;

export const { selectAll, selectById } = categoryAdapter.getSelectors();
export default categorySlice.reducer;

