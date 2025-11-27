/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
/****************************************************/

/*************************************[ INTERFACES ]*/
import { Product } from '@/context/CartContext';

interface IProductCard {
    product: Product;
};
/****************************************************/
/************************************************************************/


/*******************************************************[ PRODUCT CARD ]*/
export const ProductCard: FC<IProductCard> = (props) => {
    /*****************************[ STATES & VARIABLES ]*/
    const navigate: NavigateFunction = useNavigate();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    const goToProductPage: (id: string) => void = (id) => {
        const url: string = `/shop/${id}`;

        navigate(url);
    };
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <div
            className='product'
            onClick={(): void => goToProductPage(props.product._id)}
            onMouseEnter={(): void => setIsHovered(true)}
            onMouseLeave={(): void => setIsHovered(false)}
        >
            {
                !isHovered ? (
                    <>
                        <div>
                            <img
                                src={props.product.image}
                                alt={props.product.name}
                            />
                        </div>

                        <div>
                            <h3>{props.product.name}</h3>

                            <p>{props.product.price} €</p>

                            <p>{props.product.description}</p>

                            {
                                props.product.stock > 0 ? (
                                    <p className='stock'>
                                        En stock : {props.product.stock}
                                    </p>
                                ) : (
                                    <p className='no-stock'>
                                        Rupture de stock
                                    </p>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <div className='fullImage'>
                        <img
                            src={props.product.image}
                            alt={props.product.name}
                        />

                        <h3>{props.product.name}</h3>
                    </div>
                )
            }
        </div>
    );
    /****************************************************/
};
/************************************************************************/