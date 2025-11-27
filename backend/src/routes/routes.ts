/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { Application, Request, Response } from 'express';
import fs from 'fs';
/****************************************************/

/*************************************[ INTERFACES ]*/
import { Product } from '@/interfaces/interfaces.js';
/****************************************************/

/********************************[ MONGOOSE MODELS ]*/
import { Products } from '../mongoose/products.js';
/****************************************************/

/******************************************[ TOOLS ]*/
import { uploadImage } from '../tools/tools.js';
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


    /**
     * GET PRODUCT
    **/
    app.get('/products/:id', (req: Request, res: Response): void => {
        const id: string = req.params.id;

        Products.findById(id)

            .then((product: Product | null): Response => {
                if (product) {
                    return res.status(200).send(product);
                }
                else {
                    return res.status(404).send('Product not found');
                }
            })

            .catch((error: Error): Response => res.status(500).send(error));
    });


    /**
     * POST PRODUCT
    **/
    // eslint-disable-next-line
    app.post('/product', uploadImage.single('image') as any, (req: Request, res: Response): void => {
        const password: string = req.body.password;

        if (password !== process.env.POST_PRODUCT_PASSWORD) {
            res.status(403).send('Forbidden');

            return;
        }

        const imagePath: string | undefined = req.file?.path;

        if (!imagePath) {
            return;
        }

        const imageBase64: string = fs.readFileSync(imagePath, 'base64');
        const image: string = `data:image/png;base64,${imageBase64}`;

        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            image: image,
            description: req.body.description,
            stock: req.body.stock,
            size: req.body.size,
            volume: req.body.volume,
            weight: req.body.weight
        };

        Products.insertOne(product)

            .then((): Response => res.status(200).send('Product added successfully'))

            .catch((error: Error): Response => res.status(500).send(error));
    });
};
/************************************************************************/