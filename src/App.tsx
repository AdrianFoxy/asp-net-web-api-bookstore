import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Products from './pages/Products/Products';
import Cart from "./pages/Cart/Cart";
import AdminHome from "./pages/Admin/AdminHome";
import {useActions} from "./hooks/useAppDispatch";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminProducts from "./pages/Admin/AdminProducts";

function App() {

    const {fetchCart} = useActions()

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:genre" element={<Products/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Route>
                <Route element={<AdminLayout/>}>
                    <Route path="/admin" element={<AdminHome/>}/>
                    <Route path="/admin/products" element={<AdminProducts/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
