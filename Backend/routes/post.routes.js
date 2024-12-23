import { Router } from "express";
import { addPost, deletePost, getPost, getPosts, getPostsAside, updatePost } from "../controllers/post.controller.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { filterSchema, postSchema } from "../schema/post.schema.js";
import { validateToken } from "../middleware/validateToken.js";
import { upload } from "../libs/multerImg.js";
import { validateId, validateIdPost } from "../middleware/validateId.js";

const router = Router();

router.get("/getPosts", validateSchema(filterSchema), getPosts);
router.get("/getPostsAside", getPostsAside);
router.get("/getPost/:id", validateId, getPost);

router.post("/addPost", validateToken, upload, validateSchema(postSchema), addPost);
router.put("/updatePost/:id", validateToken, upload, validateSchema(postSchema), updatePost);
router.delete("/deletePost/:id", validateIdPost, deletePost);

export default router;