import React, {FC, useEffect, useState} from 'react';
import styles from "./Profile.module.scss"
import {Card, Pagination, TextField} from "@mui/material";
import {IUser} from "../../types/IUser";
import {IOrder} from "../../types/IOrder";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

interface ProfileProps {
    user: IUser
    page: number
    pages: number
    handleChange: (event: React.ChangeEvent<unknown>, page: number) => void
    orders: IOrder[]
    changeOrderStatusToCancelled: (orderId: number) => void
    navigate: any
    changeUserInfo: (id: string, user: Object) => void
    changeFullName: (fullName: string) => void
    changePhone: (fullName: string) => void
    changeEmail: (fullName: string) => void
    changeDateofBirth: (fullName: string) => void
}

const Profile: FC<ProfileProps> = (
    {
        user,
        page,
        pages,
        handleChange,
        orders,
        changeOrderStatusToCancelled,
        navigate,
        changeUserInfo,
        changeFullName,
        changePhone,
        changeEmail,
        changeDateofBirth
    }
) => {
    const [isFullName, setIsFullName] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPhone, setIsPhone] = useState<boolean>(false)
    const [isDateofBirth, setIsDateofBirth] = useState<boolean>(false)

    const sendUserData = (id: string) => {
        const formData = new FormData()
        formData.append("FullName", user.fullName)
        // @ts-ignore
        formData.append("UserName", user.userName)
        formData.append("Phone", user.phone)
        formData.append("Email", user.email)
        // @ts-ignore
        formData.append("DateofBirth", user.dateofBirth)
        changeUserInfo(id, formData)
    }

    return (
        <div>
            <div className={styles.profile__title2}>Личные данные</div>
            <ul className={styles.profile__container}>
                <li className={styles.profile__item}>
                    <div className={styles.profile__edit}>
                        <label>Фио </label>
                        <ModeEditOutlineOutlinedIcon className={styles.profile__icon}
                                                     onClick={() => setIsFullName(!isFullName)}/>
                    </div>
                    {isFullName ?
                        <div className={styles.profile__edit}>
                            <TextField value={user.fullName} onChange={(e) => changeFullName(e.target.value)}
                                       style={{width: "80%", marginRight: "10px"}} id="outlined-basic" label="title"
                                       variant="outlined"/>
                            <CheckBoxOutlinedIcon style={{transform: "scale(1.3)"}}
                                                  onClick={() => {
                                                      sendUserData(user.id)
                                                      setIsFullName(!isFullName)
                                                  }}/>
                        </div>
                        :
                        <p> {user.fullName}</p>
                    }
                </li>
                <li className={styles.profile__item}>
                    <div className={styles.profile__edit}>
                        <label>Электронная почта </label>
                        <ModeEditOutlineOutlinedIcon className={styles.profile__icon}
                                                     onClick={() => setIsEmail(!isEmail)}/>
                    </div>
                    {isEmail ?
                        <div className={styles.profile__edit}>
                            <TextField value={user.email} onChange={(e) => changeEmail(e.target.value)}
                                       style={{width: "80%", marginRight: "10px"}} id="outlined-basic" label="title"
                                       variant="outlined"/>
                            <CheckBoxOutlinedIcon style={{transform: "scale(1.3)"}}
                                                  onClick={() => {
                                                      sendUserData(user.id)
                                                      setIsEmail(!isEmail)
                                                  }}/>
                        </div>
                        :
                        <p> {user.email}</p>
                    }
                </li>
                <li className={styles.profile__item}>
                    <div className={styles.profile__edit}>
                        <label>Телефон </label>
                        <ModeEditOutlineOutlinedIcon className={styles.profile__icon}
                                                     onClick={() => setIsPhone(!isPhone)}/>
                    </div>
                    {isPhone ?
                        <div className={styles.profile__edit}>
                            <TextField value={user.phone} onChange={(e) => changePhone(e.target.value)}
                                       style={{width: "80%", marginRight: "10px"}} id="outlined-basic" label="title"
                                       variant="outlined"/>
                            <CheckBoxOutlinedIcon style={{transform: "scale(1.3)"}}
                                                  onClick={() => {
                                                      sendUserData(user.id)
                                                      setIsPhone(!isPhone)
                                                  }}/>
                        </div>
                        :
                        <p> {user.phone}</p>
                    }
                </li>
                <li className={styles.profile__item}>
                    <div className={styles.profile__edit}>
                        <label>Дата рождения </label>
                        <ModeEditOutlineOutlinedIcon className={styles.profile__icon}
                                                     onClick={() => setIsDateofBirth(!isDateofBirth)}/>
                    </div>
                    {isDateofBirth ?
                        <div className={styles.profile__edit}>
                            <TextField value={user.dateofBirth} onChange={(e) => changeDateofBirth(e.target.value)}
                                       style={{width: "80%", marginRight: "10px"}} id="outlined-basic" label="title"
                                       variant="outlined"/>
                            <CheckBoxOutlinedIcon style={{transform: "scale(1.3)"}}
                                                  onClick={() => {
                                                      sendUserData(user.id)
                                                      setIsDateofBirth(!isDateofBirth)
                                                  }}/>
                        </div>
                        :
                        <p> {user.dateofBirth && new Date(user.dateofBirth).toLocaleString("ru", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            timeZone: "UTC"
                        })} </p>
                    }
                </li>
            </ul>
            <div className={styles.profile__title_wrapper}>
                <div className={styles.profile__title}>Список заказов</div>
                <Pagination page={page} count={pages} color="primary" onChange={handleChange}/>
            </div>
            <div>
                {orders.map((order) =>
                    <Card className={styles.profile__items_wrapper}>
                        <ul className={styles.profile__items}>
                            <div className={styles.profile__info}>
                                <li className={styles.profile__item}>
                                    <div className={styles.profile__statusWrapper}>
                                        <div>
                                            <label>Номер заказа</label>
                                            <p>{order.id}</p>
                                        </div>
                                        <div>
                                            <label>Статус заказа</label>
                                            <p>{order.orderStatus.name}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className={styles.profile__item}>
                                    <div className={styles.profile__statusWrapper}>
                                        <div>
                                            <label>Сумма заказа </label>
                                            <p>{order.sum}</p>
                                        </div>
                                        <div>
                                            {order.orderStatus.id === 1 ?
                                                <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                                                    <div style={{
                                                        padding: "5px 12px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #EB4C42",
                                                        cursor: "pointer"
                                                    }}
                                                         onClick={() => {
                                                             changeOrderStatusToCancelled(order.id)
                                                         }}
                                                    >
                                                        Отменить
                                                    </div>
                                                </div> :
                                                order.orderStatus.id === 6 ?
                                                    <div style={{
                                                        padding: "5px 12px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #EB4C42",
                                                        cursor: "pointer"
                                                    }}
                                                         onClick={() => {
                                                             changeOrderStatusToCancelled(order.id)
                                                         }}
                                                    >
                                                        Отменить
                                                    </div> :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                </li>
                                <li className={styles.profile__item}>
                                    <label>{order.delivery.name}</label>
                                    <p>{order.address}</p>
                                </li>
                            </div>
                            <div className={styles.profile__products}>
                                <label className={styles.profile__label}>Товары</label>
                                <div>
                                    {order.orderItem.map((orderItem) =>
                                        <div className={styles.profile__books}>
                                            <img
                                                src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${orderItem.book.imageUrl}`}
                                                className={styles.profile__orderItem_img} alt={"logo-book"}
                                                onClick={() => {
                                                    navigate(`/product/${orderItem.book.id}`)
                                                }}/>
                                            <div>
                                                {orderItem.book.title}
                                            </div>
                                            <div>
                                                Цена {orderItem.book.price}
                                            </div>
                                            <div>
                                                Количество {orderItem.amount}
                                            </div>
                                            <div>
                                                Сумма {orderItem.amount * orderItem.book.price}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ul>
                    </Card>
                )}
            </div>
            <Pagination page={page} count={pages} color="primary" onChange={handleChange}/>
        </div>
    );
};

export default Profile;