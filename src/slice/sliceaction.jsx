import { createSlice } from "@reduxjs/toolkit";
export const appslice=()=>createSlice({
    name:'movie-slice',
    initialState:[],
    reducers:{
        addname:(state)=>{
            return [...state, 'apple'];
        }
    }
})

export const {addname}=appslice.actions;
export default appslice.reducer;