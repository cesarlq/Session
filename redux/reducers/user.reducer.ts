import { initialStateUsersI } from "../../Interfaces/User";
import { userLogin, CookieLogginUser, LogOutUser, RegisterUser } from '../thunks/user.thunk';
import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateUsersI = {
    LogIn:{
        status: "idle",
        error: undefined,
        response: null
    },
    CookieLoggin:{
        status: "idle",
        error: undefined,
        response: null
    },
    LogOut:{
        status: "idle",
        error: undefined,
        response: null
    },
    Register:{
        status: "idle",
        error: undefined,
        response: null
    }
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetLogIn(state){
            state.LogIn=initialState.LogIn;
        },
        reseCookieLogginUser(state){
            state.CookieLoggin=initialState.CookieLoggin;
        },
        resetLogOut(state){
            state.LogOut=initialState.LogOut;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.LogIn.status = 'loading';
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.LogIn.status = 'succeeded';
            state.LogIn.response = action.payload;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.LogIn.status = 'failed';
            state.LogIn.error = action.error.message;
        });

        //COOKIELOGINUSER
        builder.addCase(CookieLogginUser.pending, (state) => {
            state.CookieLoggin.status = 'loading';
        });
        builder.addCase(CookieLogginUser.fulfilled, (state, action) => {
            state.CookieLoggin.status = 'succeeded';
            state.CookieLoggin.response = action.payload;
        });
        builder.addCase(CookieLogginUser.rejected, (state, action) => {
            state.CookieLoggin.status = 'failed';
            state.CookieLoggin.error = action.error.message;
        });
        //LOGOUT
        builder.addCase(LogOutUser.pending, (state) => {
            state.LogOut.status = 'loading';
        });
        builder.addCase(LogOutUser.fulfilled, (state, action) => {
            state.LogOut.status = 'succeeded';
            state.LogOut.response = action.payload;
        });
        builder.addCase(LogOutUser.rejected, (state, action) => {
            state.LogOut.status = 'failed';
            state.LogOut.error = action.error.message;
        });
        //Register
        builder.addCase(RegisterUser.pending, (state) => {
            state.Register.status = 'loading';
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.Register.status = 'succeeded';
            state.Register.response = action.payload;
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.Register.status = 'failed';
            state.Register.error = action.error.message;
        });
    },
});

export const { resetLogIn, reseCookieLogginUser, resetLogOut } = userSlice.actions
export default userSlice.reducer;
