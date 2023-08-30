//Se deben hacer asincronas para poder usarlas en la DB de mongo

const asyncHandler = require('express-async-handler') // esto es un envoltorio, debes envolver las funciones async en el asyncHandler (se instala con "npm i express-async-handler")
const Tarea = require('../models/tareasModel.js')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find()
    res.status(200).json(tareas)
})

const createTareas = asyncHandler(async (req, res) => {

    if (!req.body.texto) {
        res.status(400)
        throw new Error('No agregaste ninguna Tarea')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto
    })
    res.status(201).json(tarea)
})

const updateTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if (!tarea) {
        res.status(400)
        throw new Error('La tarea no existe')
    }
    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(tareaUpdated)
})

const deleteTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if (!tarea) {
        res.status(400)
        throw new Error('La tarea no existe')
    }
    tarea.deleteOne()  // Aquí elimino la tarea directamente, el 'tarea.' es la tarea que se buscó arriba antes del error

    // const tareaDeleted = await Tarea.findByIdAndDelete(req.params.id) // Aquí lo que hago es buscar de nuevo la tarea para eliminarla porque la estoy volviendo a buscar con el id, es lo mismo pero en este caso la línea de arriba es más eficiente, pero las 2 funcionan

    res.status(200).json({ id: req.params.id })

})

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}

