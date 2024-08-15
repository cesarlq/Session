import {UserI} from '../../Interfaces/User'
import {createAsyncThunk} from '@reduxjs/toolkit'
import UserService from '../../services/authSerivice'

export const userLogin = createAsyncThunk('User/login', async (user: UserI) => {
    const response = await UserService.post('login',user);
    return response;
});

export const CookieLogginUser= createAsyncThunk('User/user', async () => {
    const response = await UserService.get('user');
    return response;
});

export const LogOutUser = createAsyncThunk('User/logout', async () => {
    const response = await UserService.post('logout');
    return response;
});

export const RegisterUser= createAsyncThunk('User/RegisterUser', async (data:UserI) => {
    const response = await UserService.post('register', data);
    return response;
});