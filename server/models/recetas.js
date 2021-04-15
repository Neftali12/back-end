const mongoose = require('mongoose');
const { Schema } = mongoose;

const recetaSchema = new Schema({
    titulo:{
        type: String,
        required: [true, 'El titulo es necesario']
    },
    descripcion:{
        type: String,
        required: [true, 'El proceso es necesario']
    },
    status: {
        type: Boolean,
        default: true
    } 
},{
    collection: "receta"
});

module.exports = mongoose.model('receta', recetaSchema)