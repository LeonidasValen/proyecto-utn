import Posts from "../models/Posts.js";

export const getPosts = async (req, res) => {
    const {cat, page = 1, limit = 10} = req.query;  

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    try {
        const skip = (pageNum - 1) * limitNum;

        const query = {};

        if (cat) {
            query.cat = cat;
        }

        console.log(cat)

        const posts = await Posts.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getPostsAside = async (req, res) => {
    const {cat, exclude, page = 1, limit = 5} = req.query;  

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 5);
    try {
        const skip = (pageNum - 1) * limitNum;

        const query = {};

        if (cat) {
            query.cat = cat;
        }

        if (exclude) {
            query._id = { $ne: exclude }; // Excluir el ID especificado
        }

        const posts = await Posts.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getPost = async (req, res) => {
    try {
        // Buscar el post e incluir el usuario relacionado utilizando populate
        const post = await Posts.findById(req.params.id).populate('userId', 'username profilePicture');

        // Verificar si el post existe
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        // Si se encuentra el post, responder con la información
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const addPost = async (req, res) => {
    const { title, descrip, cat } = req.body;
    const userId = req.user;

    const img = req.file?.path;
    try {
        const post = new Posts({
            title,
            descrip,
            cat,
            img,
            userId,
        });

        await post.save();

        res.status(201).json({message: "Post creado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updatePost = async (req, res) => {
    const { title, descrip, cat } = req.body;
    const img = req.file?.path;
    const postId = req.params.id;

    try {
        const post = await Posts.findByIdAndUpdate(postId, { title, descrip, cat, img});

        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        res.status(200).json({message: "Post actualizado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Posts.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        res.status(200).json({ message: "Post eliminado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};