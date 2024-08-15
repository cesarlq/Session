import React, { useEffect, useContext } from 'react';
import style from '@styles/layout.module.scss';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { GlobalContext } from '../pages/_app';

function Layout(props: any) {


  return (
    <div>
      <div className={style['container']}>
      {props.children}
      </div>
    </div>
  );
}

export default Layout;