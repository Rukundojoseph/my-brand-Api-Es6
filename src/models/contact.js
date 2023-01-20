import mongoose from 'mongoose'

import joi from 'joi'

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };

const contactSchema = mongoose.Schema({
    
    email:{
        type: String,
        trim: true,
        lowercase: true,  
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']       
    },
    username:{
        type: String,
        required: [true, "you need to add a username"],        
    },
    message:{
        type: String,
        required: [true, 'enter the message you want to send']
    },
    date: {type: Date, default: Date.now},
})

export default mongoose.model('Message' , contactSchema)