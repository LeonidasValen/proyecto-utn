import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 150
    }, 
    descrip: {
        type: String,
        required: true
    }, 
    img: {
        type: String,
        required: true,
    }, 
    cat: {
        type: String,
        required: true,
        enum: ['art', 'videogames', 'tecnologies', 'cinema', 'food']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},
    { timestamps: true }
);

// indices para mejorar consultas
postSchema.index({ userId: 1 });
postSchema.index({ cat: 1 });

// Exportar el modelo para usar en la aplicación
export default mongoose.model('Posts', postSchema);