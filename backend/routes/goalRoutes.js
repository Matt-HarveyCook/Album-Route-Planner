const express = require('express')
const router = express.Router()
const {getGoals, setGoals, putGoals, deleteGoals} = require('../controllers/goalController')
const {protect }= require('../middleware/authMiddleware')
 

// the protect ensures that only authenticated users can access this route
router.get('/', protect, getGoals)
router.post('/', protect, setGoals)
router.put('/:id', protect, putGoals)
router.delete('/:id', protect, deleteGoals)
module.exports = router

