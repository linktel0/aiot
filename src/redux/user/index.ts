import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client,URL} from "../../service/api";
import data,{ Order, ShippingAddress, TUser } from "../data_types";
import { TypeOf } from "yup";

// Define a type for the slice state
interface UserState {
    loading: boolean;
    current_user: TUser | undefined;
    error: string | undefined;
}

// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    current_user: undefined,
    error: undefined,
};

export const fetch = createAsyncThunk('user/fetch', async (id:number) => {
  
    if (URL.length > 0){
      const response = await client.get('users/' + id)
      return response.data
    }
    else  {
      return data.users.find((item)=>item.id=id);
    }
  })
  

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDefaultAddress(state, action: PayloadAction<number>) {
          let address = state.current_user!.shipping_addresses.find(
            (item)=>item.id===action.payload
          )
          let addresses = state.current_user!.shipping_addresses
          if (address) {
            address.is_default = !address.is_default
            if (address.is_default){
              addresses.map((item)=>{
                if (item.id !== action.payload) {
                  item.is_default = false
                }})
            }
          }
          state.current_user!.shipping_addresses = [...addresses];
        },
        addOrder(state, action: PayloadAction<Order>) {
            state.current_user!.orders = [
                //action.payload,
                ...state.current_user!.orders,
            ];
        },
        addShippingAddress(state, action: PayloadAction<ShippingAddress>) {
            const shipping_addresses = state.current_user!.shipping_addresses;
            if(shipping_addresses.length > 0){
              shipping_addresses.sort((a,b)=>b.id-a.id);
              action.payload.id = shipping_addresses[0].id + 1
            }
            state.current_user!.shipping_addresses = [
                action.payload,
                ...shipping_addresses,
            ];
            console.log(action.payload);
        },
        removeShippingAddress(state, action: PayloadAction<number>) {
            state.current_user!.shipping_addresses =
                state.current_user!.shipping_addresses.filter(
                    (s) => s.id !== action.payload
                );
        },
        editShippingAddress(state, action: PayloadAction<ShippingAddress>) {
          let shipp = state.current_user!.shipping_addresses.find(s => s.id === action.payload.id)
          if(shipp) {
            shipp.address = action.payload.address
            shipp.city = action.payload.city
            shipp.country = action.payload.country
            shipp.full_name = action.payload.full_name
            shipp.state = action.payload.state
            shipp.zip_code = action.payload.zip_code
          }
        },
    },
    extraReducers(builder) {
        builder
          .addCase(fetch.pending, (state) => {
                state.loading = true;
            })
          .addCase(fetch.fulfilled, (state, action) => {
                state.loading = false;
                state.current_user = action.payload;
            })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
  addOrder,
  addShippingAddress,
  editShippingAddress, 
  removeShippingAddress,
  setDefaultAddress
} = userSlice.actions;

export default userSlice.reducer;
