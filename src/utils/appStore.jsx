import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";
import chatReducer from "./chatSlice";

const appStore = configureStore({
    reducer:{
        user : userReducer,
        feed  : feedReducer,
        request : requestReducer,
        chat : chatReducer
    }
})

export default appStore