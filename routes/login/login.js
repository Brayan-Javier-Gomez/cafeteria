const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const ModelUsuario = require('../../model/usuarios');

app.post('/login', (req, res) => {
    let body = req.body;
    console.log(body);

    if (body.password === undefined) {
        return res.json({
            ok: false,
            err: { message: 'no se especifico un valor de contraseña' }
        })
    }

    ModelUsuario.findOne({ email: body.email }, (err, usuarioDB) => {

        console.log(usuarioDB);
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrectos'
                }
            })
        };

        if (bcrypt.compareSync(body.password, usuarioDB.password) === false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrectos'
                }
            })

        };

        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 });

        res.json({
            ok: true,
            usuarioDB,
            token

        })


    })
});



module.exports = app;