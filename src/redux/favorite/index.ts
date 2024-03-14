import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
  EntityState
} from '@reduxjs/toolkit';
import { client ,URL} from "../../service/api";
import data,{ TFavorite } from "../data_types";

//const dispatch = useDispatch();
// Define a type for the slice state
interface UserState {
    loading: boolean;
    favorites: EntityState<TFavorite>;
    error: string | undefined;
}

const favoriteAdapter = createEntityAdapter<TFavorite>()
const initState = favoriteAdapter.getInitialState({
  
})

// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    favorites: initState,
    error:undefined,
};

export const fetch = createAsyncThunk('favorite/fetch', async () => {
  
  if (URL.length > 0){
    const response = await client.get('favorites')
    return response.data
  }
  else  {
    return data.favorites
  }
})

export const removeOne = createAsyncThunk('favorite/removeOne', async (id:number) => {
    if (URL.length > 0){
        const response = await client.delete('favorites/'+id)
      }  
    return id
})

export const addOne = createAsyncThunk('favorite/addOne', async (item:TFavorite) => {
    if (URL.length > 0){
      const response = await client.post('favorites',item)
      return response.data;
    }
    else {
      return item
    }
  })

export const favoriteSlice = createSlice({
    name: "favorite",
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
                favoriteAdapter.setAll(state.favorites, action.payload);
            })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
          .addCase(addOne.pending, (state) => {
              state.loading = true;
          })
          .addCase(addOne.fulfilled, (state, action) => {
              state.loading = false;
              favoriteAdapter.addOne(state.favorites, action.payload);
          })
          .addCase(addOne.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })
          .addCase(removeOne.pending, (state) => {
            state.loading = true;
          })
          .addCase(removeOne.fulfilled, (state, action) => {
              state.loading = false;
              favoriteAdapter.removeOne(state.favorites, action.payload);
          })
          .addCase(removeOne.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })
    }
});

export const {
} = favoriteSlice.actions;

export const { selectAll, selectById } = favoriteAdapter.getSelectors();
export default favoriteSlice.reducer;
