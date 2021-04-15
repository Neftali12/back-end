const mongoose = require('mongoose');
const { Schema } = mongoose;


const usuarioSchema = new Schema({
    usuario: {
        type: String        
    },    
    email: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Favor de insertar su contraseña.']
    },
    typeUser: {
        type: String        
    },
    status: {
        type: Boolean,
        default: true
    }     
},{
    collection: "usuario"
}
);

module.exports = mongoose.model('usuario', usuarioSchema);