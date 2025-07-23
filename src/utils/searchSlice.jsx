import { createSlice } from "@reduxjs/toolkit";
import { addFeed } from "./feedSlice";


const searchSlice = createSlice({
    name: "searchFeed",
    initialState: null,
    reducers: {
        addSearchFeed: (state, action) => {
            return action.payload;
        },
    }
})

export const{addSearchFeed} = searchSlice.actions;
export default searchSlice.reducer ;