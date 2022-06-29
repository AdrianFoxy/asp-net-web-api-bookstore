import React, {FC, useState} from 'react'
import styles from "./Login.module.scss"
import {useActions} from "../../hooks/useAppDispatch";
import {useInput} from "../../hooks/useInput";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {validateEmail} from "../../utils/validateEmail";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LoginForm from "../../components/UI/LoginForm/LoginForm";

export interface ErrorsLogin {
    email?: string,
    password?: string,
}

export interface User {
    [key: string]: any

    email: string
    password: string
}

export interface Values {
    showPassword: boolean
}

const Login: FC = () => {

    const {login} = useActions()

    const [user, setUser] = useState<User>({email: "", password: ""})

    const [errors, setErrors] = useState<ErrorsLogin>({email: "", password: ""})

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
        <LoginForm errors={errors} user={user} handleChangeField={handleChangeField} values={values}
                   handleClickShowPassword={handleClickShowPassword}
                   handleMouseDownPassword={handleMouseDownPassword} handleClick={handleClick}
        />
    )
}

export default Login