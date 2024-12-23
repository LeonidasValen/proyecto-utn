import rateLimit from 'express-rate-limit'

export const loginLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // número máximo de intentos de inicio de sesión permitidos dentro del período de tiempo
    handler: (req, res) => {
        res.status(429).json({
            message: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.'
        });
    }
})