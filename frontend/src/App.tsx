/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC, ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/****************************************************/

/****************************************[ CONTEXT ]*/
import { CartProvider } from './context/CartContext';
/****************************************************/

/*************************************[ COMPONENTS ]*/
import { Banner } from './components/shared/Banner';
import { MiniCart } from './components/shared/MiniCart';
import { CategoryGrid } from './components/home/CategoryGrid';
import { ProductList } from './components/shop/ProductList';
/****************************************************/

/******************************************[ PAGES ]*/
import { ProductDetail } from './pages/Product';
import { CartPage } from './pages/Cart';
import { Admin } from './pages/Admin';
/****************************************************/
/************************************************************************/


/********************************************************[ POTTOLO APP ]*/
export const App: FC = (): ReactElement => {
    /*****************************************[ RETURN ]*/
    return (
        <BrowserRouter>
            <CartProvider>
                <Banner />

                <MiniCart />

                <Routes>
                    <Route
                        path='/home'
                        element={<CategoryGrid />}
                    />

                    <Route
                        path='/shop'
                        element={<ProductList />}
                    />

                    <Route
                        path='/shop/:id'
                        element={<ProductDetail />}
                    />

                    <Route
                        path='/cart'
                        element={<CartPage />}
                    />

                    <Route
                        path='/admin'
                        element={<Admin />}
                    />

                    <Route
                        path='*'
                        element={<Navigate replace to='/home' />}
                    />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
    /****************************************************/
};
/************************************************************************/