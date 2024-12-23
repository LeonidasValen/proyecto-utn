import { z } from 'zod'

const categorias = ['art', 'videogames', 'tecnologies', 'cinema', 'food'];

export const postSchema = z.object({
    title: z
        .string()
        .nonempty({ message: "El título es requerido" })
        .min(2, { message: "El título debe tener al menos 2 caracteres" })
        .max(150, { message: "El título no debe exceder los 100 caracteres" }),
    descrip: z
        .string()
        .nonempty({ message: "La descripción es requerida" })
        .min(2, { message: "La descripción debe tener al menos 2 caracteres" }),
    cat: z
        .enum(categorias)
        .refine(val => categorias.includes(val), { message: "La categoría es requerida" })
});

export const filterSchema = z.object({
    cat: z
        .enum(categorias, { message: "La categoría no es válida" })
        .optional(),
    // page: z
    //     .number()
    //     .min(1, { message: "La página debe ser mayor o igual a 1" }),
    // limit: z
    //     .number()
    //     .min(1, { message: "El límite debe ser mayor o igual a 1" }),
});