/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { Application, Request, Response } from 'express';
/****************************************************/

/*************************************[ INTERFACES ]*/
import { Product } from '@/interfaces/interfaces.js';
/****************************************************/

/********************************[ MONGOOSE MODELS ]*/
import { Products } from '../mongoose/products.js';
/****************************************************/
/************************************************************************/


/*************************************************************[ ROUTES ]*/
export default (app: Application): void => {
    /**
     * GET PRODUCTS
    **/
    app.get('/products', (req: Request, res: Response): void => {
        Products.find()

            .then((products: Product[]): Response => res.status(200).send(products))

            .catch((error: Error): Response => res.status(500).send(error));
    });
};
/************************************************************************/