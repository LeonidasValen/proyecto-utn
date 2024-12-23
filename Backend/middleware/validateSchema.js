export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)//los datos registros son enviados para luego ser validados por zod
        next()//dirije a la siguiente ruta que seria el schema de zod
    } catch (error) {
        if (error) {
            return res.status(400).json({ error: error.errors.map(error => error.message) }) //recopila el error de zod luego es enviado al frontend
        } else {
            return res.status(500).json({error: 'Error interno del servidor al validar los datos'})
        }
    }
}