import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../../../../api/controllers/user.controller";

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
  },
});

export const { signInStart, signInSuccess, signInFail,updateUserFailure,updateUserStart,updateUserSuccess } = userSlice.actions;
export default userSlice.reducer;