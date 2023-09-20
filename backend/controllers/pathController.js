const asyncHandler = require('express-async-handler')

// These models are used to interact with the respective collections
const Path = require('../model/pathModel')
const User = require('../model/userModel')

const generatePath = asyncHandler(async (req, res) =>{
    const { spawn } = require('child_process');
    const python = spawn('python3', ['backend/python/script1.py', req.params.length, req.params.xCord, req.params.yCord]);




    python.stdout.on('data', (data) => {
        // console.log('pattern: ', data.toString());
        res.status(200).send(data.toString())
    });
    
    python.stderr.on('data', (data) => {
        // console.error('err: ', data.toString());
        res.status(200).send(data.toString())
    });
    
    python.on('error', (error) => {
        console.error('error: ', error.message);
    });
    
    python.on('close', (code) => {
        console.log('child process exited with code ', code);
    });
})

// Returns all the paths associated with the current user
const getPaths = asyncHandler(async (req, res) =>{
    const paths = await Path.find({user: req.user.id})
    res.status(200).json(paths)
})


// Creates a new path
const setPaths = asyncHandler( async(req, res) =>{
    if(!req.body.albumName){
        res.status(400)
        throw new Error('please add album name')
    }
    if(!req.body.albumLength){
        res.status(400)
        throw new Error('please add album length')
    }
    if(!req.body.pathURL){
        res.status(400)
        throw new Error('please add path url')
    }
    if(!req.body.coverURL){
        res.status(400)
        throw new Error('please add cover url')
    }

    // Creates a path using the data passed in and the id of the user
    const path = await Path.create({
        albumName: req.body.albumName,
        albumLength: req.body.albumLength,
        pathURL: req.body.pathURL,
        user: req.user.id,
        coverURL: req.body.coverURL
    })
    
    res.status(200).json(path)
})


// Updates a path
const putPaths = asyncHandler(async(req, res) =>{
    // Finds the path within the collection by interacting with the Path model
    const path = await Path.findById(req.params.id)

    if(!path){
        res.status(400)
        throw new Error('path not found')
    }


    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    // This ensures that the path you are attempting to access is associated with this user
    if(path.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorised')
    }

    // Updates the given path object by finding it with the object id
    const updatedPath = await Path.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedPath)
})

// This function operates the same as putPaths - finds the path and user / verifies the path belongs to user
const deletePaths = asyncHandler(async(req, res) =>{
    const path = await Path.findById(req.params.id)
    if(!path){
        res.status(400)
        throw new Error('path not found')
    }


    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(path.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorised')
    }
    await Path.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})
module.exports = {getPaths, setPaths, putPaths, deletePaths, generatePath}