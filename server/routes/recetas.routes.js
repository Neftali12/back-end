const express = require('express');
const router = express.Router();

const recetasCtrl = require('../controllers/recetas.controller');

router.get('/', recetasCtrl.getReceta);

router.post('/', recetasCtrl.createReceta);

router.put('/', recetasCtrl.editarReceta);

router.delete('/', recetasCtrl.deleteReceta);

module.exports = router;