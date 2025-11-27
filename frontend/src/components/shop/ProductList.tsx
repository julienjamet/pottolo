/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
/****************************************************/

/****************************************[ CONTEXT ]*/
import { Product } from '@/context/CartContext';
/****************************************************/

/*************************************[ COMPONENTS ]*/
import { ProductCard } from './ProductCard';
/****************************************************/
/************************************************************************/


/*******************************************************[ PRODUCT LIST ]*/
export const ProductList: FC = () => {
    /*****************************[ STATES & VARIABLES ]*/
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    useEffect((): void => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`)

            .then((response: AxiosResponse): void => {
                setProducts(response.data);

                setLoading(false);
            })

            .catch((error: AxiosError): void => console.error(error));
    }, []);
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <div className='productList'>
            {
                loading ? (
                    <p className='warning'>
                        Chargement des produits...
                    </p>
                ) : (
                    !products.length ? (
                        <p className='warning'>
                            Aucun produit disponible pour le moment.
                        </p>
                    ) : (
                        <div className='page'>
                            <h2>Boutique</h2>

                            <div className='grid'>
                                <div className='line'>
                                    {
                                        products && products.map((product: Product, index: number): ReactNode => (
                                            <ProductCard
                                                key={index}
                                                product={product}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
    /****************************************************/
};
/************************************************************************/