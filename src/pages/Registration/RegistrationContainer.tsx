import React, {useState} from 'react'
import {useActions} from "../../hooks/useAppDispatch";
import {validateEmail} from "../../utils/validateEmail";
import {validatePhone} from "../../utils/validatePhone";
import {validatePassword} from "../../utils/validatePassword";
import {validateEqualPassword} from "../../utils/validateEqualPasswords";
import RegistrationForm from "./RegistrationForm";

export interface ErrorsRegistration {
    fullName?: string
    phone?: string
    email?: string
    password?: string
    confirmPassword?: string
    dateofBirth: Date | null
}

export interface NewUser {
    [key: string]: any

    fullName: string
    phone: string
    email: string
    password: string
    confirmPassword: string
    dateofBirth: Date | null
}

export interface Values {
    showPassword: boolean,
    showConfirmPassword: boolean
}

const RegistrationContainer = () => {

    const {registration} = useActions()

    const [newUser, setNewUser] = useState<NewUser>({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateofBirth: null
    })

    const [errors, setErrors] = useState<ErrorsRegistration>({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateofBirth: null
    })

    const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setErrors((prevState) => ({...prevState, [field]: ""}))
        setNewUser((prevState) => ({...prevState, [field]: event.target.value}))
    }

    const validateIsEmpty = () => {
        return Object.keys(errors).map((field, i) => {
            if (!newUser[field]) {
                setErrors((prevState) => ({...prevState, [field]: `${field} is required`}))
                return false
            } else {
                return true
            }
        })
    }

    const [values, setValues] = React.useState<Values>({
        showPassword: false,
        showConfirmPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClick = () => {

        const isValid = validateIsEmpty()
        for (let i = 0; i < isValid.length; i++) {
            if (!isValid[i]) {
                return false
            }
        }

        const {errorMessage: emailError, isEmail} = validateEmail(newUser.email, "Email is invalid")
        if (!isEmail) {
            setErrors((prevState) => ({...prevState, email: emailError}))
            return false
        }

        const {errorMessage: phoneError, isPhone} = validatePhone(newUser.phone, "Phone is invalid")
        if (!isPhone) {
            setErrors((prevState) => ({...prevState, phone: phoneError}))
            return false
        }

        const {errorMessage: passwordError, isPassword} = validatePassword(newUser.password, "Password too short")
        if (!isPassword) {
            setErrors((prevState) => ({...prevState, password: passwordError}))
            return false
        }

        const {
            errorMessage: equalPasswords,
            isEquals
        } = validateEqualPassword(newUser.password, newUser.confirmPassword, "Passwords are not equal")
        if (!isEquals) {
            setErrors((prevState) => ({...prevState, confirmPassword: equalPasswords}))
            return false
        }

        registration({...newUser, userName: newUser.email})
    }

    return (
        <RegistrationForm errors={errors} newUser={newUser} values={values} handleChangeField={handleChangeField}
                          handleClickShowPassword={handleClickShowPassword}
                          handleMouseDownPassword={handleMouseDownPassword}
                          handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                          handleMouseDownConfirmPassword={handleMouseDownConfirmPassword}
                          handleClick={handleClick}
        />
    )
}

export default RegistrationContainer