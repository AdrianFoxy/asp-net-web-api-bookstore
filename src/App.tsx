import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Products from './pages/Products/Products';
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import {useActions} from "./hooks/useAppDispatch";

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
                <Route path="/admin" element={<Admin />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
