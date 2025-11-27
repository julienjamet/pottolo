/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import multer from 'multer';
/****************************************************/
/************************************************************************/


/*************************************************************[ MULTER ]*/
const storage: multer.StorageEngine = multer.diskStorage({
    destination: './files/tmp/',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const uploadImage: multer.Multer = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true);
        }
        else {
            callback(new Error("The file is not an image."));
        }
    }
});


export { uploadImage };
/************************************************************************/