import { createSlice } from "@reduxjs/toolkit";



const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem("userInfo")):null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentails:(state,action)=>{
            console.log("🔥 Dispatched to Redux:", action.payload);
            state.userInfo=action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))

            const expirationTime=new Date().getTime()+30*24*60*60*1000;
            localStorage.setItem('expirationTime',expirationTime)
        },
        logout:(state)=>{
            state.userInfo=null;
            localStorage.clear();
        },
    },
})

export const{setCredentails,logout}=authSlice.actions
export default authSlice.reducer;