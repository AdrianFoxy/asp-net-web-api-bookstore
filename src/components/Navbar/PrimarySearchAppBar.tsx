import {Link} from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "../../assets/img/logo.png"
import MenuBurger from "../UI/MenuBurger/MenuBurger";
import KeepMountedModal from "../Modal";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAppDispatch";
import ShowAuth from "../../auth/ShowAuth";
import ShowAdmin from "../../auth/ShowAdmin";
import Search from "../SearchDebounce/Search";

function PrimarySearchAppBar() {

    const {totalCount} = useTypedSelector(state => state.cartReducer)
    const {logout} = useActions()


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const {isAuth} = useTypedSelector(state => state.userReducer)

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isAuth === true ?
                <>
                    <Link to="/profile"><MenuItem onClick={handleMenuClose}>Профиль</MenuItem></Link>
                    <ShowAdmin>
                        <Link to="/admin"><MenuItem onClick={handleMenuClose}> Admin </MenuItem> </Link>
                    </ShowAdmin>
                </>
                :
                <>
                    <Link to="/registration"><MenuItem onClick={handleMenuClose}>Регистрация</MenuItem></Link>
                    <Link to="/login"><MenuItem onClick={handleMenuClose}> Авторизация </MenuItem> </Link>
                </>
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // const {setTextSearch, setPageSearch} = useActions()
    //
    // const [text, setText] = useState("")
    //
    // const textDebounce = useDebounce(text, 1000)
    //
    // useEffect(() => {
    //     if (!(textDebounce === "")) {
    //         setTextSearch(textDebounce)
    //         setPageSearch(1)
    //     }
    // }, [textDebounce])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar style={{padding: "0"}}>
                    <MenuBurger/>
                    <Link to="/" style={{marginRight: "36px"}}>
                        <img src={logo} style={{width: "40px"}} alt="logo"/>
                    </Link>
                    <KeepMountedModal>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{mr: 2}}
                            style={{marginRight: "36px"}}
                        >
                            <WidgetsOutlinedIcon style={{color: "#fff", cursor: "pointer"}}/>
                        </IconButton>
                    </KeepMountedModal>
                    <Search/>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Link to="/cart" style={{marginRight: "12px"}}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={totalCount} color="error">
                                    <ShoppingCartOutlinedIcon style={{color: "#fff"}}/>
                                </Badge>
                            </IconButton>
                        </Link>
                        <div style={{marginRight: "12px"}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle style={{color: "#fff"}}/>
                            </IconButton>
                        </div>
                    </Box>
                    <ShowAuth>
                        <MenuItem onClick={() => logout()} style={{marginRight: "12px", marginLeft: "12px"}}>
                            Выйти
                        </MenuItem>
                    </ShowAuth>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

export default PrimarySearchAppBar;