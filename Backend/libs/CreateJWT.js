import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../src/config.js";

export function createJWT(payload) {
    //new promise es una promesa async que devuelve resolve(puede ir bien), reject(puede ir mal)
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            JWT_SECRET,
            {
                expiresIn: "7d",
            },
            (err, token) => {
                if (err) reject(err)//reject(le fue mal) 
                resolve(token)//resolve(le fue bien)
            }
        );
    })
}