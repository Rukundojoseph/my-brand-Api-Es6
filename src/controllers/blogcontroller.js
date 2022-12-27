import Blog from '../models/blog.js'
import jwt from 'jsonwebtoken'
import Comments from'../models/comment.js'
import LIKE from'../models/like.js'
import handleErrors from'./errohandler.js'
import User from'../models/User.js'
import CONTACT from'../models/contact.js'



 class Blogcontroller{
static async getAllBlogs(req,res){
    const blogs = await Blog.find({})
 if(blogs){
    res.json({
        statusCode: 200,
        message: "success",
        data: {
        blogs, total: blogs.length
    }
    })
    return
 }
 res.status(404).json({
    statusCode: 404,
    message: "success",
    message: "no blog post yet"
 })
}
static async getSingleBlogs(req,res){
    const blogID= req.params.id
    const blog = await Blog.findOne({ _id: blogID}).populate("comments")
 if(blog){
 const coms = await Comments.findById(blog.comments)

   return res.status(200).json(
    { 
        statusCode: 200,
        message: "success",
        data: {
        title : blog.title,
       text : blog.body ,
       likes : blog.likes.length
       ,comments: blog.comments}
    },    
    )

 }
 res.status(404).json({
    statusCode: 404,    
    message: "there is no blog with that id "
 })
}
static async addLike(req,res){         
    var likeid = "none";  
    const token = req.cookies.token || req.headers.authorization
    jwt.verify(token, 'my name is joseph', async (err, decodedToken) => {
        if (err) {
          return {message:"the login has been changed"}    
        } else {      
            const user = await User.findById(decodedToken.id).select("email")                   
            Blog.findById(req.params.id, async function(err, foundBlog) {
                if(err){
                    console.log(err);
                    res.status(400).json(
                        {err,
                         statusCode: 400,
                         message: "failed",}
                         );
                } else{
                    const Bloglikes = await Blog.findById(req.params.id).populate("likes").select("likes")                   
                    Bloglikes.likes.forEach(element => {                        
                        if(element.email == user.email ){
                            likeid= element._id                            
                        }                        
                    });
                    if(likeid== "none"){
                    var addedlike = {                        
                       email : user.email
                    }; 
                    LIKE.create(addedlike, function(err, newlike){
                        if(err){
                            console.log(err);
                        } else{
                            foundBlog.likes.push(newlike);
                            foundBlog.save();
                            res.status(200).json(
                                {
                                    statusCode: 200,
                                    message: "success",
                                result :"liked blog"
                            })
                        }
                    })
                    }
                    else{
                        const deletelike = await LIKE.findByIdAndDelete({_id: likeid})
                        foundBlog.likes.splice((foundBlog.likes.indexOf(likeid)),1)
                        foundBlog.save()
                        res.status(200).json({
                            statusCode: 200,
                            "message" : "removed like"                         
                        })
                    }
                }
            })
        

        }
      }); 
   
// let like={
//     user: "user",
//     }   
//     console.log(like)
//     try{        
//         const blog  = await Blog.findOne({_id : blogid})
//     }    
//     catch(error) {        
//         res.status(400).send(error)     
//         console.log(error) 
     
//     }
}
static async addComment(req,res){
    const blogid= req.params.id     
    const text = req.body.text
    const token = req.cookies.token    || req.headers.authorization
   
    jwt.verify(token, 'my name is joseph', async (err, decodedToken) => {
        if (err) {
          return {message:"the login has been changed"}    
        } else {      
            const user = await User.findById(decodedToken.id).select("email")                   
            Blog.findById(req.params.id, async function(err, foundBlog) {
                if(err){
                    console.log(err);
                    res.status(400).json({
                        err,
                        statusCode: 200,
                        message: "error",
                    });
                } else{                  
                    
                    var addedcomment = {                        
                       author : user.email,
                       body : text,
                       blogID : blogid
                    };                    
                    Comments.create(addedcomment, function(err, newComment){
                        if(err){
                            console.log(err);
                        } else{
                            foundBlog.comments.push(newComment);
                            foundBlog.save();
                            res.status(200).json({
                                result:"added comment blog",
                                statusCode: 200,
                                message: "success",
                                commentid: newComment._id
                            })
                        }
                    })               
               
                }
            })
        

        }
      }); 
}
static async addMessage(req,res){
    try{
    const ms = {
        email : req.body.email,
        username : req.body.name,
        message : req.body.message
    }
    const messages =  await CONTACT.create(ms)
    res.status(200).json({
        statusCode: 200,
        message : "Message Sent",
        messageid: messages._id
    })
    } 
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }   
}
static async deleteComment(req,res){       
    const commentId = req.params.commentid;    
    const token = req.cookies.token || req.headers.authorization
    jwt.verify(token, 'my name is joseph', async (err, decodedToken) => {
        if (err) {
          return {message:"the login has been changed"}    
        } else {      
            const user = await User.findById(decodedToken.id).select("email")                   
            Blog.findById(req.params.id, async function(err, foundBlog) {
                if(err){
                    console.log(err);
                    res.status(400).json({
                        err,
                        statusCode: 200,
                        message: "error",
                    });
                } else{      
                    const comment= await Comments.findOne({_id : commentId})
                if(comment.author == user.email ){
                const deletedcmoment = await Comments.findOneAndDelete({_id : commentId})
                foundBlog.comments.splice((foundBlog.comments.indexOf(commentId)),1)
                foundBlog.save()      
                res.status(200).json({
                    statusCode: 200,
                    message : "deleted comment"
                })              
                }
                else{
                    res.status(404).json({
                        statusCode: 200,
                        message : "you are not the author of this comment"
                    }) 
                }
            }
          
            })      

        }
      }); 
}

 }

 export default Blogcontroller