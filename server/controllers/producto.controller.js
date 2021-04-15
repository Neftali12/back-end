const productoModel = require('../models/producto');
const productosCtrl = {};


productosCtrl.getProducto = async (req, res) => {
    const productos = await productoModel.find();
    res.json(productos);
};

productosCtrl.createProducto = async (req,res) => {    
    try{
        const productos = new productoModel(req.body);
        let err = productos.validateSync();

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

        const nuevoProducto = await productos.save();

        if (nuevoProducto.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo registrar el reporte.',
                cont: {
                    productos
                }
            });
        } else {            
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion insertada correctamente.',
                cont: {
                    productos
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


productosCtrl.editarProducto = async (req,res) => {
    try {

        const idProducto = req.query.idProducto;

        if (idProducto == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idProducto;

        const productoEncontrado = await productoModel.findById(idProducto);

        if (!productoEncontrado)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro el producto en la base de datos.',
                cont: productoEncontrado
            });

        const newproducto = new productoModel(req.body);

        let err = newproducto.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar el producto.',
                cont: {
                    err
                }
            });
        }

        const productoActualizado = await productoModel.findByIdAndUpdate(idProducto, { $set: newproducto }, { new: true });

        if (!productoActualizado) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar actualizar el producto.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Se actualizo el producto correctamente.',
                cont: {
                    productoActualizado
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al actualizar el producto.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
};

productosCtrl.deleteProducto = async (req,res) => {    

    try {

        if (req.query.idProducto == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        idProducto = req.query.idProducto;
        status = req.body.status;

        const productoEncontrado = await productoModel.findById(idProducto);

        if (!productoEncontrado)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro el producto en la base de datos.',
                cont: productoEncontrado
            });

        const productoActualizado = await productoModel.deleteOne();

        if (!productoActualizado) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar eliminar el producto.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: `Success: Se a eliminado el producto correctamente.`,
                cont: {
                    productoActualizado
                }
            });
        }


    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al eliminar el producto.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

};




module.exports = productosCtrl;