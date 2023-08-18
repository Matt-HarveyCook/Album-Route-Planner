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

