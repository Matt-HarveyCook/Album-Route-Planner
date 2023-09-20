const asyncHandler = require('express-async-handler')

// These models are used to interact with the respective collections
const Goal = require('../model/goalModel')
const User = require('../model/userModel')


// Returns all the goals associated with the current user
const getGoals = asyncHandler(async (req, res) =>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})



const setGoals = asyncHandler( async(req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add text')
    }

    // Creates a goal using the data passed in and the id of the user
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    
    res.status(200).json(goal)
})



const putGoals = asyncHandler(async(req, res) =>{
    // Finds the goal within the collection by interacting with the Goal model
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }


    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    // This ensures that the goal you are attempting to access is associated with this user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorised')
    }

    // Updates the given goal object by finding it with the object id
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedGoal)
})

// This function operates the same as putGoals - finds the goal and user / verifies the goal belongs to user
const deleteGoals = asyncHandler(async(req, res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }


    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorised')
    }
    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})
module.exports = {getGoals, setGoals, putGoals, deleteGoals}