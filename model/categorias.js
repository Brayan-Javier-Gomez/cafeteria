const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const categoriaShema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario'
    }
})
categoriaShema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('Categoria', categoriaShema)