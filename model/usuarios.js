const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Shema = mongoose.Schema;

const Usuario = new Shema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'El correo electronico es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],

    },
    role: {
        type: String,
        required: true,
        default: 'rol_usuario',
        enum: {
            values: ['rol_admin', 'rol_usuario'],
            message: '{VALUE} , no es un rol valido'
        }
    }

})

Usuario.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', Usuario)