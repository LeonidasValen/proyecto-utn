import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../src/config.js"

export const validateToken = (req, res, next)=>{
    //verifica  si tiene el token
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "no estas autenticado"})

    //verifica el token y trae los datos del usuario
    jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
        if(err) return res.status(403).json({message: "Token invalido"});
        
        req.user = decodedToken.id; // Guarda todo el decodedToken en req.user
        next()
    })
}