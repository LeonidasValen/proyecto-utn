import { z } from 'zod'

export const regisSchema = z.object({
    username: z
        .string({ required_error: "Nombre es requerido" })
        .nonempty({ message: 'Nombre es requerido' }) 
        .min(2, { message: 'El Nombre debe tener 2 cacteres' })
        .max(100, { message: 'El Nombre no debe exeder los 100 cacteres' })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "El nombre de usuario no puede contener caracteres especiales." }), // Solo permite letras, números y guiones bajos
    email: z
        .string({ required_error: 'Correo es requerido' })
        .nonempty({ message: 'Email es requerido' }) 
        .email({ message: 'Email inválido' }),
    password: z
        .string({ required_error: 'La contraseña es requerida' })
        .nonempty({ message: 'La contraseña es requerida' })
        .min(6, { message: 'La contraseña de contener al menos 6 caracteres' })
})

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email es requerido' }) 
        .nonempty({ message: 'Email es requerido' }) 
        .email({ message: 'Email inválido' }), 
    password: z
        .string({ required_error: 'La contraseña es requerida' }) 
        .nonempty({ message: 'La contraseña es requerida' }) 
        .min(6, { message: 'La contraseña debe contener al menos 6 caracteres' }), 
});