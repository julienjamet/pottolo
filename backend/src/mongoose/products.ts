/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import mongoose, { Schema, Model } from 'mongoose';
/****************************************************/

/*************************************[ INTERFACES ]*/
import { Product } from '@/interfaces/interfaces.js';
/****************************************************/

/************************************[ CONNECTIONS ]*/
import { connection } from './connection.js';
/****************************************************/
/************************************************************************/


/******************************************************[ PRODUCT MODEL ]*/
/*****************************************[ SCHEMA ]*/
const product: object = {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    size: { type: String },
    volume: { type: String },
    weight: { type: String }
};

const productSchema: Schema<Product> = new mongoose.Schema(product);
/****************************************************/


/******************************************[ MODEL ]*/
export const Products: Model<Product> = connection.model('Products', productSchema);
/****************************************************/
/************************************************************************/