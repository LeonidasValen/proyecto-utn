import mongoose from "mongoose";
import { MONGO_URL } from "../src/config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a la base de datos");
  } catch (err) {
    console.log("Error al conectarse a la base datos", err);
    throw err;
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("Desconectado de la base de datos");
})

mongoose.connection.on("connected", () => {
  console.log("Conectado a la base de datos");
})

mongoose.connection.on("reconnected", () => {
  console.log("Reconectado a la base de datos");
})
