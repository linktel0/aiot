import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';
import { client ,URL} from "../../service/api";
import data,{TProduct} from "../data_types";

// Define a type for the slice state
interface UserState {
    loading: boolean;
    products: EntityState<TProduct>;
    error: string | undefined;
}

const productAdapter = createEntityAdapter<TProduct>()
const initState = productAdapter.getInitialState({
  
})
// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    products: initState,
    error: undefined,
};


export const fetch = createAsyncThunk('product/fetch', async (items:number[]) => {
  let param = "";
  items.map((item,index)=>{
    if (param.length > 0) 
      param +=  "&id="+item 
    else 
      param +=  "?id="+item
    })
  if (URL.length > 0){
    const response = await client.get('products/'+param);
    return response.data
  }
  else  {
    return data.products
  }
  
})

export const productSlice = createSlice({
    name: "product",
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
                const products:TProduct[] = action.payload
                products.map((item)=>{
                  productAdapter.addOne(state.products,item);
                })
            })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
    
});

export const {

} = productSlice.actions;

export const { selectAll, selectById } = productAdapter.getSelectors();

export default productSlice.reducer;
