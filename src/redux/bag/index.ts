import { createSlice, PayloadAction ,createAsyncThunk, EntityState, createEntityAdapter} from "@reduxjs/toolkit";
import { client ,URL} from "../../service/api";
import data,{ TBagItem,TItem} from "../data_types";

// Define a type for the slice state
interface UserState {
    loading: boolean;
    bagItems: EntityState<TBagItem>;
    error: string | undefined;
}

const newBagItem = (id:number):TBagItem => {
    return ({
    id:id,
    details:[],
})}


const bagAdapter = createEntityAdapter<TBagItem>()
const initState = bagAdapter.getInitialState({
  
})
// Define the initial state using that type
const initialState: UserState = {
    loading: false,
    bagItems: initState,
    error: undefined,
};

export const fetch = createAsyncThunk('bag/fetch', async () => {
  
  if (URL.length > 0){
    const response = await client.get('bagItems')
    return response.data
  }
  else  {
    return data.bagItems
  }
})

export const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {
        addToBag(state, action: PayloadAction<TBagItem>) {
            let item = action.payload
            const oldItem = selectById(state.bagItems,item.id);
            if (oldItem) {
                let detail = oldItem.details.find((s) => 
                    (s.color === item.details[0].color && s.size === item.details[0].size)
                )
                if (!detail){
                    oldItem.details.forEach((s)=>{item.details.push(s)})
                    bagAdapter.upsertOne(state.bagItems, item)
                }
                
                else{
                    let index = oldItem.details.indexOf(detail)
                    let newItem = newBagItem(item.id);
                    oldItem.details.map((s,_index)=>{
                        if(_index!==index) 
                            newItem.details.push(s)
                        else
                            newItem.details.push(item.details[0])
                    })
                    bagAdapter.upsertOne(state.bagItems, newItem)
                }
            }
            else{
                bagAdapter.addOne(state.bagItems, item)
            }
        },
        removeFromBag(state, action: PayloadAction<number>) {
            bagAdapter.removeOne(state.bagItems, action.payload)
        },

        removeItem(state, action: PayloadAction<TItem>) {
            const p = action.payload
            const oldItem = selectById(state.bagItems,p.id);
            if (oldItem) {
                let newItem = newBagItem(p.id);
                oldItem.details.map((s,index)=>{if(index!==p.value) newItem.details.push(s)})
                if (newItem.details.length>0){
                    bagAdapter.upsertOne(state.bagItems, newItem)
                }
                else
                    bagAdapter.removeOne(state.bagItems, p.id)
            }
        },
        
        incrementQuantity(state, action: PayloadAction<TItem>) {
            const p = action.payload
            const oldItem = selectById(state.bagItems,p.id);
            if (oldItem) {
                let detail = {...oldItem.details[p.value]}
                detail.quantity = detail.quantity + 1 
                
                let newItem = newBagItem(p.id);
                oldItem.details.map((s,index)=>{
                    if(index!==p.value) 
                        newItem.details.push(s)
                    else
                        newItem.details.push(detail)
                })
                bagAdapter.upsertOne(state.bagItems, newItem)
            }
        },
        decrementQuantity(state, action: PayloadAction<TItem>) {
            const p = action.payload
            const oldItem = selectById(state.bagItems,p.id);
            if (oldItem) {
                let detail = {...oldItem.details[p.value]}
                detail.quantity = detail.quantity>1 ? detail.quantity - 1 : 1
                let newItem = newBagItem(p.id);
                oldItem.details.map((s,index)=>{
                    if(index!==p.value) 
                        newItem.details.push(s)
                    else
                        newItem.details.push(detail)
                })
                bagAdapter.upsertOne(state.bagItems, newItem)
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
                bagAdapter.setAll(state.bagItems, action.payload);
          })
          .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    addToBag,
    removeFromBag,
    removeItem,
    incrementQuantity,
    decrementQuantity,
} = bagSlice.actions;

export const { selectAll, selectById } = bagAdapter.getSelectors();
export default bagSlice.reducer;
