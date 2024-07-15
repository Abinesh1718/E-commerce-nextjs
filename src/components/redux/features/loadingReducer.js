import { createSlice } from "@reduxjs/toolkit"


const initialState = false


const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            return action.payload
        }


    }
})
export default loadingSlice.reducer

export const { setLoading } = loadingSlice.actions