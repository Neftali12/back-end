const recetaModel = require('../models/recetas');
const recetasCtrl = {};


recetasCtrl.getReceta = async (req, res) => {
    const recetas = await recetaModel.find();
    res.json(recetas);
};

recetasCtrl.createReceta = async (req,res) => {    
    try{
        const recetas = new recetaModel(req.body);
        let err = recetas.validateSync();

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

        const nuevaReceta = await recetas.save();

        if (nuevaReceta.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo registrar la receta.',
                cont: {
                    recetas
                }
            });
        } else {            
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion insertada correctamente.',
                cont: {
                    recetas
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


recetasCtrl.editarReceta = async (req,res) => {
    try {

        const idReceta = req.query.idReceta;

        if (idReceta == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idReceta;

        const recetaEncontrada = await recetaModel.findById(idReceta);

        if (!recetaEncontrada)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro la receta en la base de datos.',
                cont: recetaEncontrada
            });

        const newreceta = new recetaModel(req.body);

        let err = newreceta.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar la receta.',
                cont: {
                    err
                }
            });
        }

        const recetaActualizada = await recetaModel.findByIdAndUpdate(idReceta, { $set: newreceta }, { new: true });

        if (!recetaActualizada) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar actualizar la receta.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Se actualizo la receta correctamente.',
                cont: {
                    recetaActualizada
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al actualizar la receta.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
};

recetasCtrl.deleteReceta = async (req,res) => {    

    try {

        if (req.query.idReceta == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        idReceta = req.query.idReceta;
        status = req.body.status;

        const recetaEncontrada = await recetaModel.findById(idReceta);

        if (!recetaEncontrada)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro la receta en la base de datos.',
                cont: recetaEncontrada
            });

        const recetaActualizada = await recetaModel.deleteOne();

        if (!recetaActualizada) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar eliminar la receta.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: `Success: Se a eliminado la receta correctamente.`,
                cont: {
                    recetaActualizada
                }
            });
        }


    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al eliminar la receta.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

};


module.exports = recetasCtrl;