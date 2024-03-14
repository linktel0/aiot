import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';
import data,{ TSubCategory } from "../data_types";
import { client,URL} from "../../service/api";

// Define a type for the slice state

interface UserState {
    loading: boolean;
    subCategories: EntityState<TSubCategory>;
    error: string | undefined;
}

const subCategoryAdapter = createEntityAdapter<TSubCategory>()
const initState = subCategoryAdapter.getInitialState({
  
})
// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    subCategories: initState,
    error: undefined,
};

export const fetch = createAsyncThunk('subcategory/fetch', async () => {
  
  if (URL.length > 0){
    const response = await client.get('sub_categories')
    return response.data
  }
  else  {
    return data.sub_categories
  }
})

export const subCategorySlice = createSlice({
    name: "subcategory",
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
                subCategoryAdapter.setAll(state.subCategories, action.payload);
            })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
    
});

export const {
} = subCategorySlice.actions;

export const { selectAll, selectById } = subCategoryAdapter.getSelectors();
export default subCategorySlice.reducer;

