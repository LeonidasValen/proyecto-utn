import Users from "../models/Users.js";

export const getUser = async(req, res) =>{
    try {
        const userFound = await Users.findById(req.user);

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

        res.status(201).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}

export const getUsers = async (req, res) => {
    try {
        //busca el correo del usuario
        const userFound = await Users.find();

        res.status(201).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}