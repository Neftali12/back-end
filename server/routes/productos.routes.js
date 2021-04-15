const express = require('express');
const router = express.Router();

const productosCtrl = require('../controllers/producto.controller');

router.get('/', productosCtrl.getProducto);

router.post('/', productosCtrl.createProducto);

router.put('/', productosCtrl.editarProducto);

router.delete('/', productosCtrl.deleteProducto);

module.exports = router;