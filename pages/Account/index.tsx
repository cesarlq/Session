import React, {useContext} from 'react';
import style from '@styles/Account/Account.module.scss'
import { GlobalContext } from '../_app';
import { TextField } from '@mui/material';

function Account() {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error('SomeComponent must be used within a GlobalContext.Provider');
    }
    let {userInfo} = context;
    if (userInfo) {
        console.log(userInfo.user);
    }
    return (
        <div>
        {
        userInfo && 
            <div className={style['containerAccount']}>
                Account {userInfo.user.name}
                <div className={style['mt-2']}>
                    <h2>
                        Usuario
                    </h2>
                    <div>
                        <TextField
                            disabled
                            className={style['width-50']}
                            size='small'
                            id="outlined-disabled"
                            label="Nombre"
                            defaultValue={userInfo.user.name}
                        />
                        <TextField
                            disabled
                            className={`${style['ml-1']} ${style['width-50']}`}
                            size='small'
                            id="outlined-disabled"
                            label="Usuario"
                            defaultValue={userInfo.user.user}
                        />
                    </div>
                    <h2>
                        Dirección
                    </h2>
                    <div className={style['mb-1']}>
                        <TextField
                            disabled
                            className={style['width-100']}
                            size='small'
                            id="outlined-disabled"
                            label="Calle"
                            defaultValue={userInfo.user.address.street}
                        />
                    </div>
                    <div className={style['mb-1']}>
                        <TextField
                            disabled
                            className={style['width-50']}
                            size='small'
                            id="outlined-disabled"
                            label="Ciudad"
                            defaultValue={userInfo.user.address.city}
                        />
                        <TextField
                            disabled
                            className={`${style['ml-1']} ${style['width-50']}`}
                            size='small'
                            id="outlined-disabled"
                            label="Estado"
                            defaultValue={userInfo.user.address.state}
                        />
                    </div>
                    <div className={style['mb-1']}>
                        <TextField
                            disabled
                            className={style['width-50']}
                            size='small'
                            id="outlined-disabled"
                            label="CP"
                            defaultValue={userInfo.user.address.zip}
                        />
                        <TextField
                            disabled
                            className={`${style['ml-1']} ${style['width-50']}`}
                            size='small'
                            id="outlined-disabled"
                            label="Colonia"
                            defaultValue={userInfo.user.address.suburb}
                        />
                    </div>
                </div>
            </div>
        }
        </div>
    );
}

export default Account;