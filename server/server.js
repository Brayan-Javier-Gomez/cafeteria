const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');

//SE DEBEN IMPORTAR EL BODY-PARSER PARA QUE EN LAS RUTAS FUNCIONE EL JSON Y RESPONDA    

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//SE IMPORTAN LAS RUTAS 

app.use(require('../routes/categorias/categorias'));
app.use(require('../routes/productos/productos'));
app.use(require('../routes/usuarios/usuarios'));
app.use(require('../routes/login/login'));


//index


//IMPORTACION DE LA CONFIGURACION
require('./config')
    //CONEXION CON MONGODB

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {

    if (err) throw err
    console.log('corriendo base de datos puerto 27017');

});

//PUERTO DE ESCUCHA

app.listen(process.env.PORT, () => {
    console.log(`Servicio levantado y escuchando el puerto ${process.env.PORT}`);
})