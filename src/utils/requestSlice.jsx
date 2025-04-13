import { createSlice } from "@reduxjs/toolkit";

const reqeuestSlice = createSlice({
    name : 'requests',
    initialState : [] ,
    reducers : {
        addRequest : (state ,action)=>{
            return action.payload ;
        },
        removeRequest : (state , action)=>{
            console.log(action);
            console.log(state);
            const newArray = state.filter((e)=> e._id !== action.payload)
            return newArray;
            // console.log(state);
        }

    }
})

export const{addRequest , removeRequest} = reqeuestSlice.actions ;
export default reqeuestSlice.reducer ;