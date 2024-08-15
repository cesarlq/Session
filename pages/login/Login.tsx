import React from 'react';
import style from '@styles/Login/login.module.scss';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import { Fingerprint, Visibility, VisibilityOff} from '@mui/icons-material';
import { UserI } from '../../Interfaces/User';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import {userLogin} from '../../redux/thunks/user.thunk';
import Router from 'next/router';
import { INDEX_PATH } from '@utils/paths';

function Login() {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const {register, handleSubmit, watch ,formState: { errors }, reset} = useForm<UserI>({
        defaultValues: {
            user: '',
            password: ''
        }
    });
    const submit = (data: UserI) => {
        dispatch(userLogin(data));
        Router.push(INDEX_PATH);
      };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className={style['containerLogin']}>
            <div className={style['container']}>
                <div className={style['title']}>
                    <h1>
                        Quiroz S.A. de C.V
                    </h1>
                </div>
                <form onSubmit={handleSubmit(submit)} className={style['containterinputs']}>
                    <TextField
                    focused={Boolean(watch('user'))}
                    error={Boolean(errors.user)}
                    helperText={errors.user?.message}
                    id="standard-required"
                    label="Username"
                    placeholder="example@gmail.com"
                    variant="standard"
                    {...register('user',{
                        required: {
                            value: true,
                            message: 'This field is required'
                        },
                        maxLength: 34,
                    }
                    )}
                    />
                    <Paper className={style['passwordInput']}>
                        <TextField
                            focused={Boolean(watch('password'))}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            className={style['TextField']}
                            label="Password"
                            placeholder='Password'
                            variant="standard"
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password',{
                                required: {
                                    value: true,
                                    message: 'This field is required'
                                },
                                maxLength: {
                                    value: 34,
                                    message: 'The password is too long'
                                },
                            }
                            )}
                        />
                        <IconButton className={style['button-Visibility']} onClick={handleClickShowPassword} type="button" aria-label="Visibility">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </Paper>
                

                    <Button variant="contained" type='submit' endIcon={<Fingerprint/>}>
                        Login
                    </Button>
                </form>
            </div>
            
        </div>
    );
}

export default Login;