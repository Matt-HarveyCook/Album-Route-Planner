const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
// this protect ensures that only authenticated users can access this route
router.get('/me', protect, getMe)
module.exports = router