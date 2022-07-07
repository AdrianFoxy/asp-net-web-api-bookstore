import React, {FC} from 'react';
import styles from "./RegistrationForm.module.scss"
import {Link} from "react-router-dom";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ErrorsRegistration, NewUser, Values} from "./RegistrationContainer";

interface RegistrationFormProps {
    errors: ErrorsRegistration
    newUser: NewUser
    values: Values
    handleChangeField: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void
    handleClickShowPassword: () => void
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleClickShowConfirmPassword: () => void
    handleMouseDownConfirmPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleClick: () => void
}

const RegistrationForm: FC<RegistrationFormProps> = (
    {
        errors,
        newUser,
        values,
        handleChangeField,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleClickShowConfirmPassword,
        handleMouseDownConfirmPassword,
        handleClick
    }
) => {
    return (
        <div className={styles.reg}>
            <div className={styles.reg__wrapper}>
                <div className={styles.reg__textWrapper}>
                    <img
                        src={"https://media.discordapp.net/attachments/502148795279081484/975410512877723747/unknown.png?width=609&height=609"}
                        alt="logo"/>
                </div>
                <div>
                    <div className={styles.reg__regForm}>
                        <Link to={"/"} className={styles.reg__redirect}>На главную</Link>
                        <div className={styles.reg__title}>
                            Регистрация
                        </div>
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
                                                       {values.showConfirmPassword ? <VisibilityOff/> :
                                                           <Visibility/>}
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
        </div>
    );
};

export default RegistrationForm;