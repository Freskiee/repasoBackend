const express = require('express')
const router = express.Router()
const {getTareas, createTareas, updateTareas, deleteTareas} = require('../controllers/tareaControllers')

router.route('/').get(getTareas).post(createTareas)
router.route('/:id').put(updateTareas).delete(deleteTareas)

module.exports = router