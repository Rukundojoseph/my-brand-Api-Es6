import mongoose from 'mongoose'

import joi from 'joi'

const contactSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        required: true
    },
    username:{
        type: String,
        required: true,        
    },
    message:{
        type: String,
        required: [true, 'enter the message you want to send']
    },
    date: {type: Date, default: Date.now},
})

export default mongoose.model('Message' , contactSchema)