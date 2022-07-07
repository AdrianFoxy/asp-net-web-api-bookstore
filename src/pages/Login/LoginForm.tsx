import React, {FC} from 'react';
import styles from "./LoginForm.module.scss"
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ErrorsLogin, User, Values} from "./LoginContainer";

interface LoginFormProps {
    errors: ErrorsLogin
    user: User
    handleChangeField: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void
    values: Values
    handleClickShowPassword: () => void
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleClick: () => void
}

const LoginForm: FC<LoginFormProps> = (
    {
        errors,
        user,
        handleChangeField,
        values,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleClick
    }
) => {
    return (
        <div className={styles.login}>
            <div className={styles.login__wrapper}>
                <div className={styles.login__textWrapper}>
                    <div className={styles.login__title}>
                        Логин
                    </div>
                </div>
                <div className={styles.login__loginForm}>
                    <TextField name="email"
                               placeholder="email"
                               error={Boolean(errors?.email)}
                               helperText={errors?.email}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "email")}
                               value={user.fullName}
                               className={styles.login__input}
                               inputProps={{maxLength: 100}}
                               fullWidth
                    />
                    <TextField name="password"
                               placeholder="password"
                               type={values.showPassword ? 'text' : 'password'}
                               error={Boolean(errors?.password)}
                               helperText={errors?.password}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "password")}
                               value={user.password}
                               className={styles.login__input}
                               inputProps={{maxLength: 50, autoComplete: "off"}}
                               fullWidth
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton
                                               aria-label="toggle password visibility"
                                               onClick={handleClickShowPassword}
                                               onMouseDown={handleMouseDownPassword}
                                               edge="end"
                                           >
                                               {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                           </IconButton>
                                       </InputAdornment>
                                   )
                               }}
                    />
                    <Button variant="outlined" onClick={handleClick} fullWidth className={styles.login__input}>
                        Log in
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;