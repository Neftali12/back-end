const express = require('express');
const router = express.Router();

const usuariosCtrl = require('../controllers/usuario.controller');

router.get('/', usuariosCtrl.getUser);

//router.post('/', usuariosCtrl.createUsuer);

router.post('/', usuariosCtrl.createUsuario);

router.delete('/', usuariosCtrl.deleteUsuario);

module.exports = router;