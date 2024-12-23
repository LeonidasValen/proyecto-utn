import app from "./app.js";
import { connectDB } from "../db/db.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import postRouter from "../routes/post.routes.js";
import { PORT } from "./config.js";
import { logger } from "./logger.js";

// Middleware de winston para guardar solicitudes y respuestas globales
app.use((req, res, next) => {
  res.on("finish", () => {
    //este registra cualquier solicitud
    // logger.info(
    //   `${req.method} ${req.url} - status: ${res.statusCode}`
    // );

    //registra solo errores
    if (res.statusCode >= 500) {
      logger.error(
        `${req.method} ${req.url} - status: ${res.statusCode}`
      );
    }
  });
  next();
});

connectDB();

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)

// Inicio del servidor
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en: http://localhost:${PORT}`);
});

// Ruta principal
app.get("/", (req, res) => {
  res.json("¡Bienvenido al backend!");
});
