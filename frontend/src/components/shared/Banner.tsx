/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
/****************************************************/
/************************************************************************/


/*************************************************************[ BANNER ]*/
export const Banner: FC = () => {
    /*****************************[ STATES & VARIABLES ]*/
    const pathname: string = useLocation().pathname;
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <div className='banner'>
            <img src='/assets/banner.png' />

            <h1>CÉRAMIQUES ARTISANALES</h1>

            {
                pathname !== '/home' && (
                    <div className='menu'>
                        <NavLink to='/home'>Accueil</NavLink>

                        <NavLink to='/about'>A propos</NavLink>

                        <NavLink to='/shop'>Boutique</NavLink>

                        <NavLink to='/home'>Cours</NavLink>

                        <NavLink to='/home'>Décor sur céramique</NavLink>

                        <NavLink to='/offer'>Carte cadeau</NavLink>

                        <NavLink to='/contact'>Contact</NavLink>
                    </div>
                )
            }
        </div>
    );
    /****************************************************/
};
/************************************************************************/