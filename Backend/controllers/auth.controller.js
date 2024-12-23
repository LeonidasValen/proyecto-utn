import Users  from "../models/Users.js";
import brcypt from "bcrypt";
import { createJWT } from "../libs/CreateJWT.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //busca si el correo ya esta registrado
        const userFound = await Users.findOne({ email })
        if (userFound) return res.status(400).json({ message: "El correo ya esta registrado" })

        //hasha la contraseña
        const hashedPass = await brcypt.hash(password, 10)

        const newUser = new Users(
            {
                username,
                email,
                password: hashedPass,
                profilePicture: "",
            }
        )
        await newUser.save();
        res.status(201).json({ message: "Usuario creado exitosamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //busca el correo del usuario
        const userFound = await Users.findOne({ email })
        //verifica el correo
        if (!userFound) return res.status(404).json({ message: "Correo o contraseña incorrecto" })
        //compara las contraseñas
        const isMatch = await brcypt.compare(password, userFound.password)
        //verifica la contraseña
        if (!isMatch) return res.status(404).json({ message: "Correo o contraseña incorrecto" })

        const token = await createJWT({ id: userFound._id })
        //configura las cookies
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })

        res.status(201).json({ message: "Usuario iniciado exitosamente", 
            id:userFound.id,
            username: userFound.username,
            email: userFound.email,
            profilePicture: userFound.profilePicture,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

