const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductoShema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
})

module.exports = mongoose.model('Producto', ProductoShema);