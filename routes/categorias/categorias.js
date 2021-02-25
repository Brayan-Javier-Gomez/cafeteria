const express = require('express');
const app = express();

const { autenticaRole, autenticaToken } = require('../../middelwares/autenticaciones')



const ModelCategoria = require('../../model/categorias');

app.get('/', (req, res) => {
    res.json({
        ok: true,
        status: 200,
        message: 'El servicio de API rest se ha iniciado correctamente',
        rutas: {
            usuarios: 'https://hitman-rest-server.herokuapp.com/usuario',
            categorias: 'https://hitman-rest-server.herokuapp.com/categoria',
            productos: 'https://hitman-rest-server.herokuapp.com/producto'
        }


    })
})

app.get('/categoria', (req, res) => {

    ModelCategoria.find({})
        .populate('usuario', 'nombre email')
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

app.post('/categoria', [autenticaToken, autenticaRole], (req, res) => {



    let body = req.body;

    console.log(req.usuario._id);


    // console.log(body);
    const categoria = new ModelCategoria({
        nombre: body.nombre,
        usuario: req.usuario._id
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