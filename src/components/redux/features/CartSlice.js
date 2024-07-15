import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addCart: (state, action) => {

            if (state.findIndex(data => data.id == action.payload.id) == -1) {
                state.push(action.payload)
            } else {
                return state.map(data => {

                    return data.id == action.payload.id ? { ...data, quantity: data.quantity + 1 } : data
                })
            }
        },
        removeCart: (state, action) => {
            let id = action.payload
            return state = state.filter(data => data.id !== id)
        }


    }
})
export default cartSlice.reducer

export const { addCart, removeCart } = cartSlice.actions