const express = require('express');
const app = express();


const ModelProducto = require('../../model/productos');
const ModelCategoria = require('../../model/categorias');
const { autenticaRole, autenticaToken } = require('../../middelwares/autenticaciones');

app.get('/producto', (req, res) => {
    ModelProducto.find({})
        .populate({
            path: 'categoria',
            populate: {
                path: 'usuario',
                select: 'nombre, email'
            }
        })
        .populate('usuario', 'role nombre email')



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

app.post('/producto', [autenticaToken, autenticaRole], (req, res) => {
    let id_usuario = req.usuario._id;

    let body = req.body;

    let id_categoria;

    if (body.categoria === undefined) {
        return res.status(400).json({
            ok: false,
            message: 'no se ha especificado una categoria'

        })
    }

    ModelCategoria.find({ nombre: body.categoria }, (err, categoriaID) => {
        // console.log(categoriaID[0].id);
        if (!categoriaID[0].id) {
            return res.json({
                ok: false,
                err: {
                    message: 'La categoria especificada no ha sido encontrada'
                }
            })
        }

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
                err: {
                    message: 'La categoria no viene'
                }
            })
        }





        if (categoriaID) {
            id_categoria = categoriaID[0].id
            console.log(id_categoria);
            const producto = new ModelProducto({
                nombre: body.nombre,
                precio: body.precio,
                descripcion: body.descripcion,
                categoria: id_categoria,
                usuario: id_usuario,
            })
            producto.save((err, productoDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Ya existe un producto con el mismo nombre'
                        }
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