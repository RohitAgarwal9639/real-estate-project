import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, updateUser } from "../../../../api/controllers/user.controller";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart:(state)=>{
        state.loading=true;
    },
    signInSuccess:(state,action)=>{
        state.loading=false;
        state.currentUser=action.payload;
        state.error=null;
    },
    signInFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    updateUserStart:(state)=>{
        state.loading=true;
    },
    updateUserSuccess:(state, action)=>{
        state.user = action.payload;
        console.log(state.user);
        state.loading=false;
        state.error=null;
    },
    updateUserFailure:(state, action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    deleteUserStart:(state)=>{
        state.loading=true;
    },
    deleteUserSuccess:(state)=>{
        state.user = null;
        state.loading=false;
        state.error=null;
    },
    deleteUserFailure:(state, action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    signOutUserStart:(state)=>{
        state.loading=true;
    },
    signOutUserSuccess:(state)=>{
        state.user = null;
        state.loading=false;
        state.error=null;
    },
    signOutUserFailure:(state, action)=>{
        state.error=action.payload;
        state.loading=false;
    },
  },
});

export const { signInStart, signInSuccess, signInFail,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,deleteUserFailure,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess } = userSlice.actions;
export default userSlice.reducer;