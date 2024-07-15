import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./features/CartSlice";
import productSlice from "./features/productSlice";
import loadingReducer from "./features/loadingReducer";



const store = configureStore({
    reducer: {
        CartSlice,
        productSlice,
        loadingReducer

    }
})
export default store