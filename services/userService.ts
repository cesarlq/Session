import fetch from 'node-fetch';
import { INDEX_PATH } from '../Utils/paths';
import Router from 'next/router';

const path =`${process.env.NEXT_PUBLIC_PATH_PROD}`;
/**
 * Performs a next-auth logout, clears cache and redirect
 * @param path - The path to get data from.
 * @returns A Promise that resolves with the response data or rejects with an error message.
 * @throws If an error occurs during the request.
 */

export const login = async (pathThunk: string,name: string, password: string) => {
    try {
        const url= path + pathThunk;
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({name, password}),
        };
        
        const response = await fetch(url, options);
        const data = await response.json();
        if(!response.ok){
            const error = 'Failed to Get';
            throw new Error(error);
        }
        Router.push(INDEX_PATH);
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
};

export const logout = async (pathThunk: string) => {
    try {
        const url= path + '/session/' + pathThunk;
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        };
        
        const response = await fetch(url, options);
        const data = await response.json();
        if(!response.ok){
            const error = 'Failed to LogOut';
            throw new Error(error);
        }
        Router.push(INDEX_PATH);
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const user = async (pathThunk: string) => {
    try {
        const url= path + '/session/' + pathThunk;
        const options = {
            method: 'GET',
            credentials: 'include',
        };
        
        const response = await fetch(url, options);
        const data = await response.json();
        if(!response.ok){
            const error = 'Failed to Login';
            throw new Error(error);
        }
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
};

const UserService={
    login,
    user,
    logout
};

export default UserService;