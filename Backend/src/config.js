import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;

export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME; 
export const CLOUD_API_KEY = process.env.CLOUDINARY_API_KEY; 
export const CLOUD_API_SECRET = process.env.CLOUDINARY_API_SECRET; 