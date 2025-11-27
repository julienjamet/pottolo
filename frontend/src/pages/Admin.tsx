/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
/****************************************************/
/************************************************************************/


/**************************************************************[ ADMIN ]*/
export const Admin: FC = () => {
    /*****************************[ STATES & VARIABLES ]*/
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<File>();
    const [description, setDescription] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [size, setSize] = useState<string>('');
    const [volume, setVolume] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    /****************************************************/

    /******************************[ EFFECTS & METHODS ]*/
    // -- submit form
    const submitForm: (event: React.FormEvent<HTMLFormElement>) => void = (event) => {
        event.preventDefault();

        if (!image) {
            return;
        }

        const data: FormData = new FormData();

        data.append('image', image);

        data.append('name', name);

        data.append('price', price.toString());

        data.append('description', description);

        data.append('stock', stock.toString());

        data.append('size', size);

        data.append('volume', volume);

        data.append('weight', weight);

        data.append('password', password);

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/product`, data)

            .then((response: AxiosResponse): void => console.log(response.data))

            .catch((error: AxiosError): void => console.error(error));
    };
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <div className='page'>
            <h2>Ajouter un produit :</h2>

            <form
                className='admin'
                onSubmit={submitForm}
            >
                <label htmlFor='name'>
                    Nom
                </label>

                <input
                    id='name'
                    type='text'
                    onChange={(e): void => setName(e.target.value)}
                />

                <label htmlFor='price'>
                    Prix
                </label>

                <input
                    id='price'
                    type='number'
                    onChange={(e): void => setPrice(Number(e.target.value))}
                />

                <label htmlFor='image'>
                    Image
                </label>

                <input
                    id='image'
                    type='file'
                    onChange={(e): void => setImage(e.target.files?.[0])}
                />

                <label htmlFor='description'>
                    Description
                </label>

                <input
                    id='description'
                    type='textArea'
                    onChange={(e): void => setDescription(e.target.value)}
                />

                <label htmlFor='stock'>
                    Stock
                </label>

                <input
                    id='stock'
                    type='number'
                    onChange={(e): void => setStock(Number(e.target.value))}
                />

                <label htmlFor='size'>
                    Dimensions
                </label>

                <input
                    id='size'
                    type='textArea'
                    onChange={(e): void => setSize(e.target.value)}
                />

                <label htmlFor='volume'>
                    Contenance
                </label>

                <input
                    id='volume'
                    type='textArea'
                    onChange={(e): void => setVolume(e.target.value)}
                />

                <label htmlFor='weight'>
                    Poids
                </label>

                <input
                    id='weight'
                    type='textArea'
                    onChange={(e): void => setWeight(e.target.value)}
                />

                <label htmlFor='password'>
                    Mot de passe
                </label>

                <input
                    id='password'
                    type='password'
                    onChange={(e): void => setPassword(e.target.value)}
                />

                <input
                    type='submit'
                    value='Valider'
                />
            </form>
        </div>
    );
    /****************************************************/
};
/************************************************************************/