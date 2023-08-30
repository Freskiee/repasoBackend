const mongoose = require ('mongoose')

const tareaSchema = mongoose.Schema({
    texto: {
        type: String,
        required: [true, 'Por favor agrega una descripción a la Tarea']
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Tarea', tareaSchema)