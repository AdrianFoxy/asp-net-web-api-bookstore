import {Button, Card, Grid, TextField} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import styles from "./Order.module.scss"
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {morph} from "../../utils/words";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useRequest} from "../../hooks/useRequest";
import $api from "../../http";
import {useInput} from "../../hooks/useInput";
import {useActions} from "../../hooks/useAppDispatch";
import {fetchCart} from "../../redux/actions/cart";
import {useNavigate} from "react-router-dom";

const Order: FC = () => {

    const navigate = useNavigate()

    const {products, totalPrice, totalCount} = useTypedSelector(state => state.cartReducer)

    const {user} = useTypedSelector(state => state.userReducer)

    const {fetchCart} = useActions()

    interface IStringIndex {
        [key: string]: any

        fullName: string
        phone: string
        email: string
    }

    const [contactInfo, setContactInfo] = useState<IStringIndex>({
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
    })

    const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setContactInfo((prevState) => ({...prevState, [field]: event.target.value}))
    }

    const [errors, setErrors] = useState<{
        fullName?: string,
        phone?: string,
        email?: string,
    }>({fullName: "", phone: "", email: ""})

    const [isDelivery, setIsDelivery] = useState<boolean>(false)
    const [value, setValue] = React.useState('Самовывоз');
    const [deliveryId, setDeliveryId] = useState<string>("1")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target as HTMLInputElement).value === "Самовывоз") {
            setIsDelivery(false)
        } else if ((event.target as HTMLInputElement).value === "Доставка по адресу") {
            setIsDelivery(true)
        }
        setValue((event.target as HTMLInputElement).value);
    };

    const [deliveryList] = useRequest(async () => {
        return await $api.get(`/Delivery/get-delivery-for-drop-list`)
    })

    const deliveryAddress = useInput("")

    const sendOrder = () => {
        const formData = new FormData()
        formData.append("Phone", user.phone)
        formData.append("Email", user.email)
        formData.append("Name", user.fullName)
        formData.append("Address", deliveryAddress.value)
        formData.append("DeliveryId", deliveryId)
        const data = async () => {
            return await $api.post(`/Order/complete-order`, formData).then((response) => {
                if (response.status === 200) {
                    console.log(response)
                    fetchCart()
                    navigate("/success", {state: response.data})
                }
            })
        }
        data()
    }

    // useEffect(() => {
    //     setContactInfo((prevState) => ({...prevState, fullName: user.fullName}))
    //     setContactInfo((prevState) => ({...prevState, phone: user.phone}))
    //     setContactInfo((prevState) => ({...prevState, email: user.email}))
    // }, [user])

    return (
        <div>
            <div className={styles.order__title}>Оформление заказа</div>
            <div className={styles.order__wrapper}>
                <div className={styles.order__form_wrapper}>
                    <Card className={styles.order__form_contact}>
                        <div className={styles.order__block_title}>
                            <span>1</span>
                            Контактные данные получателя заказа
                        </div>
                        <Grid container width={"100%"} rowSpacing={2} columnSpacing={{xs: 1, sm: 2}}>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Фио" variant="outlined" fullWidth
                                           inputProps={{maxLength: 50, autoComplete: "off"}}
                                           value={contactInfo.fullName}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "fullName")}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Мобильный телефон" variant="outlined" fullWidth
                                           inputProps={{maxLength: 50, autoComplete: "off"}} value={contactInfo.phone}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "phone")}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Электронная почта" variant="outlined" fullWidth
                                           inputProps={{maxLength: 50, autoComplete: "off"}} value={contactInfo.email}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeField(e, "email")}/>
                            </Grid>
                        </Grid>
                    </Card>
                    <Card className={`${styles.order__form_contact}`}>
                        <div className={styles.order__block_title}>
                            <span>2</span>
                            Товары
                        </div>
                        <Grid container width={"100%"} rowSpacing={2} columnSpacing={{xs: 1, sm: 2}}>
                            {products.map((product) =>
                                <Grid item xs={12} className={styles.order__item}>
                                    <img className={styles.order__img}
                                         src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${product.book.imageUrl}`}
                                         alt="product-img"/>
                                    <div className={styles.order__item_w}>
                                        {product.book.title}
                                    </div>
                                    <div className={styles.order__item_w}>
                                        Цена {product.book.price} грн.
                                    </div>
                                    <div className={styles.order__item_w}>
                                        Количество {product.amount}
                                    </div>
                                    <div className={styles.order__item_w}>
                                        Сумма {product.book.price * product.amount} грн.
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    </Card>
                    <Card className={`${styles.order__form_contact}`}>
                        <div className={styles.order__block_title}>
                            <span>3</span>
                            Доставка
                        </div>
                        <Grid container width={"100%"} rowSpacing={2} columnSpacing={{xs: 1, sm: 2}}>
                            <Grid item xs={12} className={styles.order__item}>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        {deliveryList?.map((item: any) =>
                                            <FormControlLabel value={item.name} control={<Radio/>} label={item.name}
                                                              onChange={() => setDeliveryId(item.id)}/>
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className={styles.order__item}>
                                {isDelivery &&
                                <TextField id="outlined-basic" label="Введите адрес" variant="outlined" fullWidth
                                           inputProps={{maxLength: 50, autoComplete: "off"}} {...deliveryAddress}/>
                                }
                            </Grid>
                        </Grid>
                    </Card>
                </div>
                <div className={styles.order__total_wrapper}>
                    <Card className={styles.order__total}>
                        <div className={styles.order__title}>
                            Итого
                        </div>
                        <div className={styles.order__total_row}>
                            <div>
                                {totalCount} {morph(totalCount)} на сумму
                            </div>
                            <div>
                                {totalPrice} грн.
                            </div>
                        </div>
                        <Button variant="outlined" fullWidth onClick={sendOrder}>Заказ подтверждаю</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Order;