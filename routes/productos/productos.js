const express = require('express');
const app = express();


const ModelProducto = require('../../model/productos');
const ModelCategoria = require('../../model/categorias');

app.get('/producto', (req, res) => {
    ModelProducto.find({})

    .populate('categoria')

    .exec((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se ha podido obtener los productos'
                }
            })
        }

        res.json({
            ok: true,
            productos: productoDB
        })
    })


});

app.post('/producto', (req, res) => {
    let body = req.body;
    console.log(body.categoria);
    let id_categoria;

    if (body.categoria === undefined) {
        return res.status(400).json({
            ok: false,
            message: 'no se ha especificado una categoria'

        })
    }

    ModelCategoria.find({ nombre: body.categoria }, (err, categoriaID) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se ha especificado una categoria'
                }
            })
        }

        if (!categoriaID) {
            return res.status(404).json({
                ok: false,
                err
            })
        }

        if (categoriaID) {
            id_categoria = categoriaID[0].id
            console.log(id_categoria);
            const producto = new ModelProducto({
                nombre: body.nombre,
                precio: body.precio,
                categoria: id_categoria
            })
            producto.save((err, productoDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                };
                if (!productoDB) {
                    return res.status(404).json({
                        ok: false,
                        err: {
                            message: 'No se ha recibido la informacion de producto debido a que ocurrio un error'
                        }
                    })
                }



                res.json({
                    ok: true,
                    productoCreado: productoDB
                })
            })

        }

    })

    // console.log(id_categoria);



    // console.log(producto);



})







module.exports = app;