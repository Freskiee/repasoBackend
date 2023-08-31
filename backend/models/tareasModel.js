const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // esto quiere decir que 'user' será un ObjectId de otra tabla, en este caso será de la carpeta users de la base de datos, solo se puede guardar el id de un usuario que existe, de lo contrario marcara error
        required: true, //esto quiere decir que es requerido
        ref: 'User' // aqui se especifica la referencia de donde agarrara la informacion
    },
    texto: {
        type: String,
        required: [true, 'Por favor agrega una descripción a la Tarea']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Tarea', tareaSchema)