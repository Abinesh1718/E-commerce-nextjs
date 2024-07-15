import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            return action.payload
        },

    }
})
export default productSlice.reducer

export const { addProduct } = productSlice.actions