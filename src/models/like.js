import mongoose from 'mongoose'

const likeSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},            
            email: {
                 type: String ,
                 required: true
             },   
        
}
)


export default mongoose.model('Like', likeSchema)