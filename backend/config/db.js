const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        MONGO_URI = 'mongodb+srv://Octopushorse:rocket08@cluster0.r8ghkag.mongodb.net/?retryWrites=true&w=majority'
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected ' + conn.connection.host)
    }
    catch(error){
        console.log(error)
        process.exit(1)

    }
}

module.exports = connectDB