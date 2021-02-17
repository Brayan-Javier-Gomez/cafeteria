const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const categoriaShema = new Schema({
    nombre: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Categoria', categoriaShema)