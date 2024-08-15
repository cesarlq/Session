import { useState } from 'react';
import style from '@styles/navbar/navbar.module.scss';
import { AccountCircle, Settings, PersonOutline, Logout} from '@mui/icons-material';
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LogOutUser } from '@redux/thunks/user.thunk'
import { useAppDispatch } from '@redux/hooks';
import {REGISTER_PATH, INDEX_PATH, ACCOUNT_PATH } from '@utils/paths'
import Router from 'next/router';

function Navbar(props: any) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(!open);

    const handleLogOut = () => {
        dispatch(LogOutUser());
        handleClick()
    }

    const handleAccount = () =>{
        handleClick()
        Router.push(ACCOUNT_PATH);
    }

    const handleRegister = () =>{
        handleClick()
        Router.push(REGISTER_PATH);
    }

    const handleHome = () => {
        Router.push(INDEX_PATH);
    }
    let menu;
    if(props.auth){
      menu =(
      <Collapse className={style['collapse']} in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
              <ListItemButton>
                  <ListItemText primary="Settings" />
                  <ListItemIcon className={style['itemIcon']}>
                      <Settings/>
                  </ListItemIcon >
              </ListItemButton>
          </List>
        <Divider />
          <List component="div" disablePadding>
              <ListItemButton onClick={handleAccount}>
                  <ListItemText primary="Account" />
                  <ListItemIcon className={style['itemIcon']}>
                      <PersonOutline/>
                  </ListItemIcon >
              </ListItemButton>
          </List>
        <Divider />
        <List component="div" disablePadding>
            <ListItemButton onClick={handleLogOut}>
                <ListItemText primary="LogOut" />
                <ListItemIcon className={style['itemIcon']}>
                    <Logout/>
                </ListItemIcon >
            </ListItemButton>
        </List>
      </Collapse>)
    } else {
      menu= (
      <Collapse className={style['collapse']} in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
              <ListItemButton onClick={handleRegister}>
                  <ListItemText primary="Register" />
                  <ListItemIcon className={style['itemIcon']}>
                      <Settings/>
                  </ListItemIcon >
              </ListItemButton>
          </List>
      </Collapse>);
    }
    
    return (
        <div>
            <nav className={style['navbar']}>
                <ul>
                    <li>
                        <a onClick={handleHome}>
                            Home
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <ListItemButton onClick={handleClick}>
                            <AccountCircle/>
                        </ListItemButton>
                       {menu}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;