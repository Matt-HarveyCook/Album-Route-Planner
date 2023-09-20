const express = require('express')
const router = express.Router()
const {getPaths, setPaths, putPaths, deletePaths} = require('../controllers/pathController')
const {protect }= require('../middleware/authMiddleware')

const {generatePath} = require('../controllers/pathController')
 

// the protect ensures that only authenticated users can access this route
router.get('/', protect, getPaths)
router.post('/', protect, setPaths)
router.put('/:id', protect, putPaths)
router.delete('/:id', protect, deletePaths)

router.get('/gen/:length/:xCord/:yCord', generatePath )

// Issue with whitelist ip on eduroam remove this block
// router.get('/gen/:length', (req, res) =>{
//     const { spawn } = require('child_process');
//     const python = spawn('python3', ['backend/python/script1.py', req.params.length]);

//     python.stdout.on('data', (data) => {
//         // console.log('pattern: ', data.toString());
//         res.status(200).send(data.toString())
//     });
    
//     python.stderr.on('data', (data) => {
//         // console.error('err: ', data.toString());
//         res.status(200).send(data.toString())
//     });
    
//     python.on('error', (error) => {
//         console.error('error: ', error.message);
//     });
    
//     python.on('close', (code) => {
//         console.log('child process exited with code ', code);
//     });
// } )

module.exports = router

