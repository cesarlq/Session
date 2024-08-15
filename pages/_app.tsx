import React, { createContext, useState, useEffect } from 'react';
import '@styles/global.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {store} from '@redux/store' 
import Navbar from '@components/navbar';
import { jwtDecode } from 'jwt-decode';

type GlobalContextType = {
  globalVar: boolean;
  setGlobalVar: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: any;
  setUserInfo: any
};

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

function MyApp({ Component, pageProps }: AppProps) {
  const [globalVar, setGlobalVar] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('User='))
      ?.split('=')[1];
  
    if (token) {
      const decoded = jwtDecode(token);
      setUserInfo(decoded); // Asigna la información del usuario al contexto global
      setGlobalVar(true);
    }
  }, []);
  
  return (
    <GlobalContext.Provider value={{ globalVar, setGlobalVar, userInfo, setUserInfo }}>
      <Provider store={store}>
          <Navbar auth={globalVar}/>
          <Component {...pageProps} />
      </Provider>
    </GlobalContext.Provider>
)}

export default MyApp