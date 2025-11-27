/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC } from 'react';
import axios, { AxiosResponse } from 'axios';
/****************************************************/

/****************************************[ CONTEXT ]*/
import { useCart, CartItem } from '@/context/CartContext';
/****************************************************/
/************************************************************************/


/**********************************************************[ CART PAGE ]*/
export const CartPage: FC = () => {
    /*****************************[ STATES & VARIABLES ]*/
    const { cart, addToCart, removeFromCart } = useCart();

    const total: number = cart.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantityInCart,
        0
    );

    const filteredCart: object[] = cart.map((item: CartItem): object => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantityInCart
    }));
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    // -- redirect to Stripe
    const checkout: () => Promise<void> = async () => {
        try {
            const response: AxiosResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/stripe`,
                { cart: filteredCart }
            );

            window.location.href = response.data.url;
        }
        catch (error) {
            console.error(error);
        }
    };
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    return (
        <div className='page'>
            <h2>Votre panier</h2>

            {cart.length === 0 && <p>Le panier est vide.</p>}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {
                    cart.map((item) => (
                        <li key={item._id} style={{ marginBottom: '20px' }}>
                            <img
                                src={item.image}
                                width={80}
                                height={80}
                                style={{ objectFit: 'cover', marginRight: '10px' }}
                            />

                            <strong>{item.name}</strong> — {item.price} €

                            <div style={{ marginTop: '8px' }}>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    style={{
                                        marginRight: '10px',
                                        background: 'transparent',
                                        border: '1px solid red',
                                        padding: '4px 8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Supprimer
                                </button>

                                <button
                                    onClick={() => addToCart(item, 0)}
                                    style={{
                                        marginRight: '10px',
                                        background: 'transparent',
                                        border: '1px solid gray',
                                        padding: '4px 8px',
                                    }}
                                >
                                    +
                                </button>

                                <span>Quantité : {item.quantityInCart}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <h3>Total : {total.toFixed(2)} €</h3>

            {
                cart.length > 0 && (
                    <button
                        onClick={checkout}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            background: 'black',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Procéder au paiement
                    </button>
                )
            }
        </div>
    );
    /****************************************************/
};
/************************************************************************/