import { combineReducers } from "redux";
import bagSlice from "./bag";
import favoriteSlice from "./favorite";
import orderSlice  from "./order/orderSlice";
import categorySlice from "./category";
import subCategorySlice from "./subcategory";
import productSlice from "./product";
import userSlice  from "./user";
import advertiseSlice  from "./advertise";
import displaySlice  from "./display";


const rootReducer = combineReducers({
    display:displaySlice,
    advertise:advertiseSlice,
    user: userSlice,
    category:categorySlice,
    subCategory:subCategorySlice,
    product: productSlice,
    bag: bagSlice,
    favorite: favoriteSlice,
    order: orderSlice
})

export default rootReducer