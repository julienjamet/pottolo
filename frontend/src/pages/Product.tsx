/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
/****************************************************/

/*************************************[ INTEFRACES ]*/
import { Product, useCart } from '@/context/CartContext';
/****************************************************/
/************************************************************************/


/*****************************************************[ PRODUCT DETAIL ]*/
export const ProductDetail: FC = () => {
    /*****************************[ STATES & VARIABLES ]*/
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product>();

    const [quantity, setQuantity] = useState<number>(1);

    const { addToCart } = useCart();
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    // -- get product details
    useEffect((): void => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`)

            .then((response: AxiosResponse): void => setProduct(response.data))

            .catch((error: AxiosError): void => console.error(error));
    }, [id]);
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <div className='page'>
            <div className='productDetail'>
                <div className='productImage'>
                    <img
                        src={product?.image}
                        height={320}
                    />
                </div>

                <div className='productDescription'>
                    <h2>{product?.name}</h2>

                    <h2>{product?.price} €</h2>

                    {
                        (product && product.stock > 0) ? (
                            <>
                                <div className='quantity'>
                                    Quantité
                                </div>

                                <div className='quantitySelector'>
                                    <button
                                        className='quantityButton'
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    >
                                        -
                                    </button>

                                    <span className='quantityValue'>{quantity}</span>

                                    <button
                                        className='quantityButton'
                                        onClick={() => {
                                            if ((quantity + 1) < product.stock) {
                                                setQuantity(q => q + 1);
                                            }
                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                                <div
                                    className='quantity addToCart'
                                    onClick={(): void => {
                                        if (product) {
                                            addToCart(product, quantity);
                                        }
                                    }}
                                >
                                    Ajouter au panier
                                </div>
                            </>
                        ) : (
                            <div className='no-stock'>
                                Rupture de stock
                            </div>
                        )
                    }

                    <div className='caracteristics'>
                        {product?.description}
                    </div>

                    <div className='caracteristics'>
                        Dimensions : {product?.size || 'Non spécifié'}
                    </div>

                    <div className='caracteristics'>
                        Contenance : {product?.volume || 'Non spécifié'}
                    </div>

                    <div className='caracteristics'>
                        Poids : {product?.weight || 'Non spécifié'}
                    </div>
                </div>
            </div>
        </div>
    );
    /****************************************************/
};
/************************************************************************/