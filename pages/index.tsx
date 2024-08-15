import React, { useContext, useEffect, useState } from 'react';
import Layout from '@layouts/layout';
import Login from '@pages/login/Login';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {CookieLogginUser} from '@redux/thunks/user.thunk'
import Index from '@pages/dashboard/page'
import {resetLogIn, reseCookieLogginUser,resetLogOut} from '@redux/reducers/user.reducer'
import { GlobalContext } from '../pages/_app';
import { jwtDecode } from 'jwt-decode';

function Home() {
    const [auth, setAuth] = useState(false);
    const dispatch = useAppDispatch();
    const LogIn = useAppSelector((state) => state.userSlice.LogIn);
    const CookieLoggin = useAppSelector((state) => state.userSlice.CookieLoggin);
    const LogOut = useAppSelector((state) => state.userSlice.LogOut);
    const context = useContext(GlobalContext);
  
    if (!context) {
      throw new Error('SomeComponent must be used within a GlobalContext.Provider');
    }
  
    const {setGlobalVar} = context;
    const {setUserInfo} = context;
    useEffect(() => {
        if(LogIn.status === 'failed'){
            dispatch(resetLogIn());
            dispatch(reseCookieLogginUser());
            dispatch(resetLogOut());
            setAuth(false);
            setGlobalVar(false);
        }
        if(CookieLoggin.status === 'succeeded'){
            setAuth(true);
            const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('User='))
            ?.split('=')[1];
            if (token) {
                const decoded = jwtDecode(token);
                setGlobalVar(true);
                setUserInfo(decoded);
            }

        }
        if(CookieLoggin.status === 'failed'){
            dispatch(resetLogIn());
            dispatch(reseCookieLogginUser());
            dispatch(resetLogOut());
            setAuth(false);
            setGlobalVar(false);
        }
        if(LogOut.status === 'succeeded'){
            dispatch(resetLogIn());
            dispatch(reseCookieLogginUser());
            dispatch(resetLogOut());
            setAuth(false);
            setGlobalVar(false);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[LogIn, CookieLoggin, LogOut]);

    useEffect(() => {
        if(LogIn.status === 'succeeded'){
            dispatch(CookieLogginUser());
            setAuth(true);
            setGlobalVar(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[LogIn.status]);

    useEffect(() => {
            dispatch(CookieLogginUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Layout auth={auth}>
            {auth ? <Index/> : <Login/>}
        </Layout>
    );
}

export default Home;