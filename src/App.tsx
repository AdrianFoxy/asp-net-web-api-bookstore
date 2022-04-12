import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Products from './pages/Products/Products';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:genre" element={<Products/>}/>
                </Route>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
