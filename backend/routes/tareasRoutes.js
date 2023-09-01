const express = require('express')
const router = express.Router()
const { getTareas, createTareas, updateTareas, deleteTareas } = require('../controllers/tareaControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTareas).post(protect, createTareas)
router.route('/:id').put(protect, updateTareas).delete(protect, deleteTareas)

module.exports = router