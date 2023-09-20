const mongoose = require('mongoose')
const pathSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User',
    },
    albumName:{
        type: String,
        required: [true, 'Please add an album name']
    },
    albumLength:{
        type: String,
        required: [true, 'Please add an album length']
    },
    pathURL:{
        type: String,
        required: [true, 'Please add a path URL']
    },
    coverURL:{
        type: String,
        required: [true, 'Please add a cover URL']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Path', pathSchema)