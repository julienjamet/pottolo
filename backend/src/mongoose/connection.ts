/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import mongoose from 'mongoose';
/****************************************************/

/*************************************[ INTERFACES ]*/
import { DbConnectParams } from '@/interfaces/interfaces.js';
/****************************************************/

/****************************************[ METHODS ]*/
import { connectToDatabase } from '../methods/methods.js';
/****************************************************/
/************************************************************************/


/************************************************[ DATABASE CONNECTION ]*/
const username: string = process.env.DB_USERNAME || '';
const password: string = process.env.DB_PASSWORD || '';
const dbName: string = process.env.DB_NAME || '';

const connectionString: string = `mongodb+srv://${username}:${password}@cluster0.jhfneae.mongodb.net/pottolo`;

const params: DbConnectParams = {
    connectionString: connectionString,
    dbName: dbName
};

export const connection: mongoose.Connection = connectToDatabase(params);
/************************************************************************/