const userModel = require('../models/usuario');
const userCtrl = {};


userCtrl.getUser = async (req, res) => {
    try {        
        const usuario = await userModel.find({...req.queryMatch });

        if (usuario.length <= 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'No se encontraron usuarios en la base de datos.',
                cont: {
                    usuario
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion obtenida correctamente.',
                cont: {
                    usuario
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al obtener a los usuarios.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
};



userCtrl.createUsuario = async (req,res) => {  
    console.log(req.body)  
    try{
        const usuarios = new userModel(req.body);
        let err = usuarios.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'ERROR AL INSERTAR',
                cont: {
                    err
                }
            });
        }

        const nuevoUsuario = await usuarios.save();

        if (nuevoUsuario.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo registrar el usuario.',
                cont: {
                    usuarios
                }
            });
        } else {            
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion insertada correctamente.',
                cont: {
                    usuarios
                }
            });
        } 
        
    }catch(err){        
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'ERROR AL REGISTRAR',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });               
    }    
};

userCtrl.editarUsuario = async (req,res) => {
    try {

        const idUsuario = req.query.idUsuario;

        if (idUsuario == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idUsuario;

        const usuarioEncontrado = await userModel.findById(idUsuario);

        if (!usuarioEncontrado)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro el usuario en la base de datos.',
                cont: usuarioEncontrado
            });

        const newusuario = new usuarioModel(req.body);

        let err = newusuario.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al agregar usuario.',
                cont: {
                    err
                }
            });
        }

        const usuarioActualizado = await userModel.findByIdAndUpdate(idUsuario, { $set: newusuario }, { new: true });

        if (!usuarioActualizado) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar actualizar usuario.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Se actualizo el usuario correctamente.',
                cont: {
                    usuarioActualizado
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al actualizar el usuario.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
};

userCtrl.deleteUsuario = async (req,res) => {    

    try {

        if (req.query.idUsuario == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        idUsuario = req.query.idUsuario;
        status = req.body.status;

        const usuarioEncontrado = await userModel.findById(idUsuario);

        if (!usuarioEncontrado)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro el usuario en la base de datos.',
                cont: usuarioEncontrado
            });

        const usuarioActualizado = await userModel.deleteOne();

        if (!usuarioActualizado) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar eliminar el usuario.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: `Success: Se ha eliminado el usuario correctamente.`,
                cont: {
                    usuarioActualizado
                }
            });
        }


    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al eliminar el usuario .',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

};

module.exports = userCtrl;