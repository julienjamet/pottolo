/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC, useState, ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
/****************************************************/

/****************************************[ CONTEXT ]*/
import { CartItem, useCart } from '@/context/CartContext';
/****************************************************/
/************************************************************************/


/***************************************************************[ GRID ]*/
export const MiniCart: FC = () => {
    /*****************************[ STATES & VARIABLES ]*/
    const navigate: NavigateFunction = useNavigate();

    const { cart, removeFromCart } = useCart();

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const totalItems: number = cart.reduce(
        (sum, item) => sum + item.quantityInCart,
        0
    );

    const total: number = cart.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantityInCart,
        0
    );
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    const goToCartPage: () => void = () => {
        const url: string = `/cart`;

        navigate(url);
    };
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <>
            {
                !isHovered ? (
                    <div className='mini-cart'>
                        <i
                            className='fa-solid fa-basket-shopping'
                            onMouseEnter={(): void => setIsHovered(true)}
                            onClick={goToCartPage}
                        />

                        {
                            totalItems > 0 && (
                                <span className='cartBadge'>
                                    {totalItems}
                                </span>
                            )
                        }
                    </div>
                ) : (
                    <div
                        className='expanded-cart'
                        onMouseLeave={(): void => setIsHovered(false)}
                        onClick={goToCartPage}
                    >
                        <h4>Panier</h4>

                        {cart.length === 0 && <p>Aucun article</p>}

                        <ul>
                            {
                                cart.map((item: CartItem): ReactNode => (
                                    <li key={item._id}>
                                        <strong>{item.name}</strong> x{item.quantityInCart}

                                        <button onClick={(): void => removeFromCart(item._id)}>
                                            ✕
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>

                        <p>Total : {total.toFixed(2)} €</p>
                    </div>
                )
            }
        </>
    );
    /****************************************************/
};
/************************************************************************/