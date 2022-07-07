import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Products from './pages/Products/Products';
import Cart from "./pages/Cart/Cart";
import AdminHome from "./components/Admin/AdminPages/AdminHome";
import {useActions} from "./hooks/useAppDispatch";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminProducts from "./components/Admin/AdminPages/AdminProducts";
import AdminAuthors from "./components/Admin/AdminPages/AdminAuthors";
import LoginContainer from "./pages/Login/LoginContainer";
import RegistrationContainer from "./pages/Registration/RegistrationContainer";
import {useTypedSelector} from "./hooks/useTypedSelector";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {RequireAuth} from "./auth/RequireAuth";
import {RequireAdmin} from "./auth/RequireAdmin";
import Order from "./pages/Order/Order";
import Success from "./pages/Success/Success";
import Product from "./pages/Product/Product";
import ProfileContainer from "./pages/Profile/ProfileContainer";
import AdminProduct from "./components/Admin/AdminPages/AdminProduct";
import Search from "./pages/Search/Search";
import AdminOrders from "./components/Admin/AdminPages/AdminOrders";

function App() {

    const {fetchCart, checkRole, checkInfo} = useActions()

    const {user, role, isInitialized, isAuth} = useTypedSelector(state => state.userReducer)

    useEffect(() => {
        checkRole()
        checkInfo()
        fetchCart()
    }, [])

    if (!isInitialized) {
        return <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={!isInitialized}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/products/:genre" element={<Products/>}/>
                        <Route path="/product/:productId" element={<Product/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/order" element={<Order/>}/>
                        <Route path="/profile" element={<ProfileContainer/>}/>
                    </Route>
                    <Route element={<RequireAuth><MainLayout/></RequireAuth>}>
                        <Route path="/profile" element={<ProfileContainer/>}/>
                    </Route>
                    <Route element={<RequireAdmin><AdminLayout/></RequireAdmin>}>
                        <Route path="/admin" element={<AdminHome/>}/>
                        <Route path="/admin/products" element={<AdminProducts/>}/>
                        <Route path="/admin/authors" element={<AdminAuthors/>}/>
                        <Route path="/admin/product/:productId" element={<AdminProduct/>}/>
                        <Route path="/admin/orders" element={<AdminOrders/>}/>
                    </Route>
                    <Route path="/login" element={<RequireAuth><LoginContainer/></RequireAuth>}/>
                    <Route path="/registration" element={<RequireAuth><RegistrationContainer/></RequireAuth>}/>
                    <Route path="/success" element={<Success/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
