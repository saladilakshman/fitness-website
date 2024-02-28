import { configureStore } from "@reduxjs/toolkit";
//import appReducer from "../slice/sliceaction";
import { fitApi } from "../services/apiservices";
export const store=configureStore({
    reducer:{
        [fitApi.reducerPath]:fitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fitApi.middleware),
})