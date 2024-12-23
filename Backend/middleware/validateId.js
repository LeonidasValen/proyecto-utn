import mongoose from "mongoose"

export const validateId = (req, res, next)=>{
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "El id proporcionado no es valido" });

    next()
}

export const validateIdPost = (req, res, next)=>{
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ message: "El id proporcionado no es valido" });

    next()
}