const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const AsyncHandler = require('express-async-handler')
const User = require('../model/userModel')


const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
  
    // If the user has been created successfully then the values are returned
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
  


const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })


const getMe =AsyncHandler (async  (req, res)=>{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
      id: _id,
      name,
      email,
    })
})

// Encrypts a given id using a secret key
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerUser, loginUser, getMe}