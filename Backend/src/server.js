import app from "./app.js";
import { connectDB } from "../db/db.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import postRouter from "../routes/post.routes.js";
import { PORT } from "./config.js";

connectDB();

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(PORT, () => {
    console.log(`Server corriendo en: http://localhost:${PORT}`);
  });
  
  app.get("/", (req, res) => {
    res.json("¡Bienvenido al backend!");
  });
