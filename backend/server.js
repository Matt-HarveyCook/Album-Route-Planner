const express=  require('express')
const dotenv = require('dotenv').config()
const app = express()
// const port = process.env.port || 5000
const port = 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

app.listen(port, ()=>{console.log('server started on '+ port)})

app.use(express.json())

app.use(express.urlencoded( {extended:false}))

app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/paths', require('./routes/pathRoutes'))


app.get('/api/gen', (req, res) => {

    const { spawn } = require('child_process');
    const python = spawn('python3', ['backend/python/script1.py', 'parameter1']);

    python.stdout.on('data', (data) => {
        console.log('pattern: ', data.toString());
        res.status(200).send(data.toString())
    });
    
    python.stderr.on('data', (data) => {
        console.error('err: ', data.toString());
    });
    
    python.on('error', (error) => {
        console.error('error: ', error.message);
    });
    
    python.on('close', (code) => {
        console.log('child process exited with code ', code);
    });
})
