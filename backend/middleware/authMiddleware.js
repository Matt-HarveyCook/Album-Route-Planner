const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next)=>{
    let token

    // Determines if a token has been passed in the header or not
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // Checks the token provided by the request and decodes it using the secret phrase
        try {
           token = req.headers.authorization.split(' ')[1]
           const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // finds the user using the decoded id from the token
           req.user = await User.findById(decoded.id).select('-password')
           next()
        } catch (error) {
           console.log(error) 
           res.status(401)
           throw new Error('Not authorised')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorised no token')
    }

})

module.exports = {protect}


