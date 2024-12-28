import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "../src/config.js";
import multer from "multer";

// Configuracion de Cloudinary con keys
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

// Configuracion de multer para subir las imagenes a Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog',  // Carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

// Middleware de multer para subir una imagen
export const upload = multer({ 
    storage, 
    limits: { files: 1, fileSize: 5 * 1024 * 1024 }, // Limita el tamaño de la imagen a 5MB
}).single("file");

// Middleware para manejar la subida de la imagen
export const uploadImage = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error("Multer error:", err);
            return res.status(400).json({ error: `Error en la carga del archivo: ${err.message}` });
        } else if (err) {
            console.error("Error general:", err);
            return res.status(500).json({ error: "Error al procesar la imagen. Intenta nuevamente." });
        }

        if (req.file) {
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                    folder: "blog",
                });
                req.file.cloudinaryUrl = cloudinaryResponse.secure_url;
                req.file.public_id = cloudinaryResponse.public_id; // Guarda el public_id para eliminar si es necesario
                next();
            } catch (cloudinaryErr) {
                console.error("Error al subir a Cloudinary:", cloudinaryErr);
                return res.status(500).json({ error: "Error al conectar con Cloudinary. Intenta nuevamente." });
            }
        } else {
            next(); // Continuar sin subir una nueva imagen
        }
    });
};