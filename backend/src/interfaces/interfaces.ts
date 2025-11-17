export interface DbConnectParams {
    connectionString: string;
    dbName: string;
};

export interface Product {
    name: string;
    image: string;
    description: string;
    price: number;
    stock: number;
    size?: string;
    volume?: string;
    weight?: string;
};