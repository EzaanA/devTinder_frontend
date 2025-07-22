import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name : 'chat',
    initialState:[],
    reducers:{
        addChat : (state , action)=>{
            if (Array.isArray(action.payload)) {
                // If payload is an array (initial fetch)
                return [...action.payload];
            } else {
                state.push({
                    senderId: action.payload.userId,
                    fName: action.payload.name,
                    message: action.payload.text,
                    time: action.payload.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  });
            }
        }
    }
})

export const {addChat} = chatSlice.actions;
export default chatSlice.reducer;