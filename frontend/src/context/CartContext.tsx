/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { Context, createContext, useState, ReactNode, useContext } from 'react';
/****************************************************/

/*************************************[ INTERFACES ]*/
export interface Product {
    _id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    stock: number;
    size?: string;
    volume?: string;
    weight?: string;
};

export interface CartItem extends Product {
    quantityInCart: number;
};

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (id: string) => void;
};
/****************************************************/
/************************************************************************/


/******************************************************[ CART PROVIDER ]*/
const CartContext: Context<CartContextType | undefined> = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line
export const CartProvider: any = ({ children }: { children: ReactNode }) => {
    /*****************************[ STATES & VARIABLES ]*/
    const [cart, setCart] = useState<CartItem[]>([]);
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    // -- add to cart
    const addToCart: (product: Product, quantity: number) => void = (product, quantity) => {
        setCart((prev: CartItem[]): CartItem[] => {
            const existing: CartItem | undefined = prev.find((item: CartItem): boolean => item._id === product._id);

            if (existing) {
                return prev.map((item: CartItem): CartItem =>
                    item._id === product._id ? { ...item, quantityInCart: item.quantityInCart + quantity } : item
                );
            }

            return [...prev, { ...product, quantityInCart: quantity }];
        });
    };


    // -- remove from cart
    const removeFromCart: (id: string) => void = (id) => {
        setCart((prev: CartItem[]): CartItem[] => prev.filter((item: CartItem): boolean => item._id !== id));
    };
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
    /****************************************************/
};

// eslint-disable-next-line
export const useCart: () => CartContextType = () => {
    const ctx: CartContextType | undefined = useContext(CartContext);

    if (!ctx) {
        throw new Error('useCart must be used inside CartProvider');
    }

    return ctx;
};
/************************************************************************/