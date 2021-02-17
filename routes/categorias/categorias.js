const express = require('express');
const app = express();



const ModelCategoria = require('../../model/categorias');

app.get('/categoria', (req, res) => {

    ModelCategoria.find({})
        .sort('nombre')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };
            if (!categorias) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'No se encontraron las categorias'
                    }
                })
            };

            res.json({
                ok: true,
                categorias
            })



        })




});

app.post('/categoria', (req, res) => {

    let body = req.body;
    // console.log(body);
    const categoria = new ModelCategoria({
        nombre: body.nombre
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };
        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se ha recibido los datos de categoria'
                }
            })
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })



});

app.put('/categoria', (req, res) => {

});

app.delete('/categoria', (req, res) => {

})


module.exports = app;