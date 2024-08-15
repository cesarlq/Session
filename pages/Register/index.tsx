import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import style from '@styles/Register/register.module.scss'
import { useAppDispatch } from '@redux/hooks';
import { UserI } from '@interfaces/User';
import { RegisterUser } from '@redux/thunks/user.thunk'
import { TextField } from '@mui/material';

function Register() {
    const dispatch = useAppDispatch();
    const { handleSubmit, register, watch, formState: { errors, dirtyFields }, setValue, reset, control } = useForm<UserI>({
        mode: 'onChange'
    });
    const submit = (data: UserI) => {
        data.address.zip=Number(data.address.zip)
        dispatch( RegisterUser(data) );
    };


    return (
        <div className={style['containerForm']}>
            <div>
                <h1>
                    Registo de Usuario
                </h1>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={style['divForms']}>
                    <TextField
                        className={`${style['mr-1']} ${style['width-25']}`}
                        label="Usuario" 
                        placeholder='Usuario'
                        size="small"
                        variant="outlined"
                        helperText={errors.user?.message}
                        focused={Boolean(watch('user'))}
                        error={Boolean(errors.user)}
                        {...register('user',{
                            required: {
                                value: true,
                                message: 'Usuario Invalido'
                            }
                        }
                        )}
                    />
                    <TextField
                        className={style['width-25']}
                        label="Nombre" 
                        placeholder='Nombre'
                        size="small"
                        variant="outlined"
                        helperText={errors.name?.message}
                        focused={Boolean(watch('name'))}
                        error={Boolean(errors.name)}
                        {...register('name',{
                            required: {
                                value: true,
                                message: 'Nombre Invalido'
                            }
                        }
                        )}
                    />
                </div>
                <div className={style['divForms']}>
                    <TextField
                        className={`${style['mr-1']} ${style['width-25']}`}
                        label="Contraseña" 
                        placeholder='Contraseña'
                        size="small"
                        variant="outlined"
                        helperText={errors.password?.message}
                        focused={Boolean(watch('password'))}
                        error={Boolean(errors.password)}
                        {...register('password',{
                            required: {
                                value: true,
                                message: 'Contraseña Invalida'
                            }
                        }
                        )}
                    />
                </div>
                <div>
                    <h2>
                        Dirección
                    </h2>
                </div>
                <div className={style['divForms']}>
                    <TextField
                        className={style['width-50']}
                        label="Calle" 
                        placeholder='Calle'
                        size="small"
                        variant="outlined"
                        helperText={errors.address?.street?.message}
                        focused={Boolean(watch('address.street'))}
                        error={Boolean(errors.address?.street)}
                        {...register('address.street',{
                            required: {
                                value: true,
                                message: 'Calle Invalida'
                            }
                        }
                        )}
                    />
                </div>
                <div className={style['divForms']}>
                    <TextField
                        label="Ciudad"
                        className={`${style['mr-1']} ${style['width-25']}`}
                        placeholder='Ciudad'
                        size="small"
                        variant="outlined"
                        helperText={errors.address?.city?.message}
                        focused={Boolean(watch('address.city'))}
                        error={Boolean(errors.address?.city)}
                        {...register('address.city',{
                            required: {
                                value: true,
                                message: 'Ciudad Invalida'
                            }
                        }
                        )}
                    />
                    <TextField
                        label="Estado"
                        className={style['width-25']}
                        placeholder='Estado'
                        size="small"
                        variant="outlined"
                        helperText={errors.address?.state?.message}
                        focused={Boolean(watch('address.state'))}
                        error={Boolean(errors.address?.state)}
                        {...register('address.state',{
                            required: {
                                value: true,
                                message: 'Estado Invalida'
                            }
                        }
                        )}
                    />
                </div>
                <div className={style['divForms']}>
                    <TextField
                        label="C.P"
                        type='number'
                        className={`${style['mr-1']} ${style['width-25']}`}
                        placeholder='C.P'
                        size="small"
                        variant="outlined"
                        helperText={errors.address?.zip?.message}
                        focused={Boolean(watch('address.zip'))}
                        error={Boolean(errors.address?.zip)}
                        {...register('address.zip',{
                            required: {
                                value: true,
                                message: 'C.P Invalida'
                            }
                        }
                        )}
                    />
                    <TextField
                        label="Colonia"
                        className={style['width-25']}
                        placeholder='Colonia'
                        size="small"
                        variant="outlined"
                        helperText={errors.address?.suburb?.message}
                        focused={Boolean(watch('address.suburb'))}
                        error={Boolean(errors.address?.suburb)}
                        {...register('address.suburb',{
                            required: {
                                value: true,
                                message: 'Colonia Invalida'
                            }
                        }
                        )}
                    />
                </div>
                <div>
                    <button type='submit'>Enviar</button>
                </div>
                
            </form>
        </div>
      
    );
}

export default Register;