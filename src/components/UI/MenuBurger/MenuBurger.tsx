import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import KeepMountedModal from "../../Modal";
import styles from "./MenuBurger.module.scss"
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link} from "react-router-dom";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MenuBurger = () => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div onClick={(e) => e.stopPropagation()} style={{padding: "10px"}} className={styles.menu}>
                <div className={styles.menu__flex}>
                    <div className={styles.menu__icon_wrapper}>
                        <AccountCircleIcon/>
                    </div>
                    <div>
                        <div style={{marginBottom: "2px"}}>
                            t
                        </div>
                        <div>
                            tank123558@gmail.com
                        </div>
                    </div>
                </div>
                <Divider style={{marginBottom: "10px"}}/>
                <KeepMountedModal type="secondary">
                    <div className={styles.menu__flex}>
                        <div className={styles.menu__icon_wrapper}>
                            <WidgetsOutlinedIcon style={{color: "#000"}}/>
                        </div>
                        <div>
                            Каталог товаров
                        </div>
                    </div>
                </KeepMountedModal>
                <div className={styles.menu__flex}>
                    <div className={styles.menu__icon_wrapper}>
                        <FilterFramesIcon/>
                    </div>
                    <div>
                        Мои заказы
                    </div>
                </div>
                <div className={styles.menu__flex}>
                    <div className={styles.menu__icon_wrapper}>
                        <ShoppingCartOutlinedIcon/>
                    </div>
                    <div>
                        Корзина
                    </div>
                </div>
                <Divider style={{marginBottom: "10px"}}/>
                <div className={styles.menu__info}>
                    Информация о магазине
                </div>
                <div className={styles.menu__info_link_block}>
                    <Link to={""} className={styles.menu__info_link}>
                        О нас
                    </Link>
                </div>
                <div className={styles.menu__info_link_block}>
                    <Link to={""} className={styles.menu__info_link}>
                        Условия использования сайта
                    </Link>
                </div>
                <div className={styles.menu__info_link_block}>
                    <Link to={""} className={styles.menu__info_link}>
                        Контакты
                    </Link>
                </div>
                <Divider style={{marginBottom: "10px"}}/>
                <div className={styles.menu__info_link_block}>
                    <Link to={""} className={styles.menu__info_link}>
                        Доставка и оплата
                    </Link>
                </div>
                <div className={styles.menu__info_link_block}>
                    <Link to={""} className={styles.menu__info_link}>
                        Гарантия
                    </Link>
                </div>
                <div className={styles.menu__info_link_block}>
                    <Link to={""} className={styles.menu__info_link}>
                        Возврат товара
                    </Link>
                </div>
            </div>
            {/*<List>*/}
            {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
            {/*        <ListItem button key={text}>*/}
            {/*            <ListItemIcon>*/}
            {/*                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
            {/*            </ListItemIcon>*/}
            {/*            <ListItemText primary={text}/>*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*</List>*/}
        </Box>
    );

    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{mr: 2}}
        >
            <Button onClick={toggleDrawer("left", true)}><MenuIcon style={{color: "#fff"}}/></Button>
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </IconButton>
    );
};

export default MenuBurger;