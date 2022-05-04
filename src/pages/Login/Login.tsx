import React, {FC, useState} from 'react'
import styles from "./Login.module.scss"
import {useActions} from "../../hooks/useAppDispatch";
import {useInput} from "../../hooks/useInput";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {validateEmail} from "../../utils/validateEmail";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Login: FC = () => {

    const {login} = useActions()

    interface IStringIndex {
        [key: string]: any
        email: string
        password: string
    }

    const [user, setUser] = useState<IStringIndex>({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState<{
        email?: string,
        password?: string,
    }>({email: "", password: ""})

    const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setErrors((prevState) => ({...prevState, [field]: ""}))
        setUser((prevState) => ({...prevState, [field]: event.target.value}))
    }

    const handleClick = () => {
        const isValid = validateIsEmpty()
        for (let i = 0; i < isValid.length; i++) {
            if (!isValid[i]) {
                return false
            }
        }

        const {errorMessage: emailError, isEmail} = validateEmail(user.email, "Email is invalid")
        if (!isEmail) {
            setErrors((prevState) => ({...prevState, email: emailError}))
            return false
        }

        login(user)
    }

    const validateIsEmpty = () => {
        return Object.keys(errors).map((field, i) => {
            if (!user[field]) {
                setErrors((prevState) => ({...prevState, [field]: `${field} is required`}))
                return false
            } else {
                return true
            }
        })
    }

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
    )
}

export default Login