const userModel = require('../models/usuario');
const loginCtrl = {};

loginCtrl.Login = async (req,res) => {    
    let body = req.body;
    // let email = req.body.gmail
    console.log(req.body)

    const usuario = await userModel.findOne({ usuario: body.usuario, status: true, password: body.password }, (err, usr) => {
         console.log(err)
         console.log(usr)
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento del login',
                err
            })
        }

        if (!usr) {
            return res.status(400).json({
                ok: false,
                msg: 'email incorrecto, intentelo de nuevo',
                
            });
        }

        if (!body.password) {
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta, intentelo de nuevo'
            })
        }

        res.json({
            ok: true,
            msg: `Bienvenido ${usr.usuario}`,
            usr
        })
    });
};

module.exports = loginCtrl;