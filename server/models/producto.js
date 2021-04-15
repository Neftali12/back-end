const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
    nombreMarca:{
        type: String
    },
    nombre:{
        type: String,
        required: [true, 'El nombre del producto es necesario']
    },
    descripcion:{
        type: String,
        required: [true, 'Es necesaria la descrición']
    },
    precio:{
        type: Number,
        required: [true, 'El precio es necesario']
    },
    status: {
        type: Boolean,
        default: true
    }    
},{
    collection: "producto"
});

module.exports = mongoose.model('producto', productoSchema);