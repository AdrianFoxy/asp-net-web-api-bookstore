import React, {useState} from 'react'
import styles from "./Registration.module.scss"
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {useActions} from "../../hooks/useAppDispatch";
import {validateEmail} from "../../utils/validateEmail";
import {validatePhone} from "../../utils/validatePhone";
import {validatePassword} from "../../utils/validatePassword";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {validateEqualPassword} from "../../utils/validateEqualPasswords";

const Registration = () => {

    const {registration} = useActions()

    interface IStringIndex {
        [key: string]: any

        fullName: string
        phone: string
        email: string
        password: string
        confirmPassword: string
    }

    const [newUser, setNewUser] = useState<IStringIndex>({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState<{
        fullName?: string,
        phone?: string,
        email?: string,
        password?: string,
        confirmPassword?: string
    }>({fullName: "", phone: "", email: "", password: "", confirmPassword: ""})

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

        const {errorMessage: equalPasswords, isEquals} = validateEqualPassword(newUser.password, newUser.confirmPassword, "Passwords are not equal")
        if (!isEquals) {
            setErrors((prevState) => ({...prevState, confirmPassword: equalPasswords}))
            return false
        }

        registration(newUser)
    }

    const [values, setValues] = React.useState({
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

    return (
        <div className={styles.reg}>
            <div className={styles.reg__wrapper}>
                <div className={styles.reg__textWrapper}>
                    <div className={styles.reg__title}>
                        Регистрация
                    </div>
                </div>
                <div className={styles.reg__regForm}>
                    <TextField name="fullName"
                               placeholder="fullName"
                               error={Boolean(errors?.fullName)}
                               helperText={errors?.fullName}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "fullName")}
                               value={newUser.fullName}
                               className={styles.reg__input}
                               inputProps={{maxLength: 100}}
                               fullWidth
                    />
                    <TextField name="phone"
                               placeholder="phone"
                               error={Boolean(errors?.phone)}
                               helperText={errors?.phone}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "phone")}
                               value={newUser.phone}
                               className={styles.reg__input}
                               inputProps={{maxLength: 50}}
                               fullWidth
                    />
                    <TextField name="email"
                               placeholder="email"
                               error={Boolean(errors?.email)}
                               helperText={errors?.email}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "email")}
                               value={newUser.email}
                               className={styles.reg__input}
                               inputProps={{maxLength: 50}}
                               fullWidth
                    />
                    <div className={styles.reg__reg_password}>
                        <TextField name="password"
                                   placeholder="password"
                                   type={values.showPassword ? 'text' : 'password'}
                                   error={Boolean(errors?.password)}
                                   helperText={errors?.password}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "password")}
                                   value={newUser.password}
                                   className={styles.reg__input}
                                   inputProps={{
                                       maxLength: 50, autoComplete: "off"
                                   }}
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
                                   fullWidth
                        />
                        <TextField name="confirmPassword"
                                   placeholder="confirmPassword"
                                   type={values.showConfirmPassword ? 'text' : 'password'}
                                   error={Boolean(errors?.confirmPassword)}
                                   helperText={errors?.confirmPassword}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "confirmPassword")}
                                   value={newUser.confirmPassword}
                                   className={styles.reg__input}
                                   inputProps={{maxLength: 50, autoComplete: "off"}}
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowConfirmPassword}
                                                   onMouseDown={handleMouseDownConfirmPassword}
                                                   edge="end"
                                               >
                                                   {values.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                                   fullWidth
                        />
                    </div>
                    <Button variant="outlined" onClick={handleClick} fullWidth className={styles.reg__input}>
                        Reg
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Registration