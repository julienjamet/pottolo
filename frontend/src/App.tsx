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
/****************************************************/

/******************************************[ PAGES ]*/
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