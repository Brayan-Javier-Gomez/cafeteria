const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const UsuarioModel = require('../../model/usuarios');

app.get('/usuario', (req, res) => {

    UsuarioModel.find({})
        .limit(5)
        .exec((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'No se ha podidso guardar los datos'
                    }
                })

            };

            res.json({
                ok: true,
                usuarios: usuarioDB
            })
        })


});

app.post('/usuario', (req, res) => {

    const body = req.body;

    const usuario = new UsuarioModel({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se ha podidio guardar los datos'
                }
            })

        };
        res.json({
            ok: true,
            usuario_creado: usuarioDB
        })

    })








});

app.put('/usuario', (req, res) => {

});

app.delete('/usuario', (req, res) => {

});

module.exports = app;