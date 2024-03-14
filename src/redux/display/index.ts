import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';
import { client ,URL} from "../../service/api";
import data,{ TDisplay } from "../data_types";

// Define a type for the slice state
interface UserState {
    loading: boolean;
    displays: EntityState<TDisplay>;
    error: string | undefined;
}

const displayAdapter = createEntityAdapter<TDisplay>()
const initState = displayAdapter.getInitialState({
  
})
// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    displays: initState,
    error:undefined,
};


export const fetch = createAsyncThunk('producer/fetch', async () => {
  
  if (URL.length > 0){
    const response = await client.get('displays')
    return response.data
  }
  else  {
    return data.displays
  }
})

export const displaySlice = createSlice({
    name: "display",
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
                displayAdapter.setAll(state.displays, action.payload);
            })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
} = displaySlice.actions;

export const subCategory = (displayType: string) =>
  createSelector(selectAll, (items) => {items.map((item)=>{console.log(item); if(item.display_name==displayType) return item})});

export const { selectAll, selectById } = displayAdapter.getSelectors(); 
export default displaySlice.reducer;

