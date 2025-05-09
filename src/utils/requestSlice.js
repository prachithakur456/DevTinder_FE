import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    initialState: null,
    name: "request",
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => state.filter(r => r._id !== action.payload)
    }
});

export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;
