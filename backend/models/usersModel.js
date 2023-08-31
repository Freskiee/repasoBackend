const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor agrega un nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor agrega un e-mail'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor agrega una contraseña']
    }
}, {
    timesstamps: true
}
)

module.exports = mongoose.model('User', userSchema)