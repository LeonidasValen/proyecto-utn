import {Router} from "express";
import { getUser, getUsers} from "../controllers/user.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.get("/getUser", validateToken, getUser)
router.get("/getUsers", getUsers)

export default router;