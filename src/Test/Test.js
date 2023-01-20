import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.js"

chai.should()

chai.use(chaiHttp)

describe("blogs api" ,()=>{
    //login 
    describe("GET /login functionality", ()=>{        
        const users=[{
            email: "joseph@gmail.com",
            password : "pass123"
        },
       {
            email: "joseph@gmail.com",
            password : "pass1mm23"
        },
        {
            email: "josephgmail.com",
            password : "pass123"
        }]
        it("should log the user in ",(done)=>{
            chai.request(app)
            .post('/login')
            .send(users[0]) 
            .end((err,response) =>{
                response.should.have.status(200)    
                done();
            })         
          })   
        it("it should say incorrect email or password",(done)=>{
            chai.request(app)
            .post('/login')
            .send(users[1]) 
            .end((err,response) =>{
                response.should.have.status(400)    
                  
                 done();
            })             
            
        })   
    })
    //signup 
    //get blogs
    describe("GET /blogs", ()=>{
        it("it should get all blogs ",(done)=>{
            chai.request(app)
            .get('/blogs') 
            .end((err,response) =>{
                response.should.have.status(200)
                response.body.message.should.be.eq('success')                
            }) 
            done();
        })
        it("it should get response message of success ",(done)=>{
            chai.request(app)
            .get('/blogs') 
            .end((err,response) =>{                
                response.body.message.should.be.eq('success')                          
            }) 
            done();
        })   
    })      
    //get by id 
    describe("GET /blogs/:id", ()=>{
        const blogid = "63af23673be0660014f92479"
        it("it should get single blog by id ",(done)=>{            
            chai.request(app)
            .get('/blogs/'+ blogid) 
            .end((err,response) =>{
                response.should.have.status(200)                
            }) 
            done();
        })
        it("it should get one object for one blog ",(done)=>{
            chai.request(app)
            .get('/blogs/'+blogid) 
            .end((err,response) =>{                
                response.body.data.should.be.a('object')
            }) 
            done();
        })   
    })
    // comment 
    describe("post /blogs/:id/comment", ()=>{
        const blogid = "63af23673be0660014f92479"        
        const comment ="what is  happening now"
        it("it should check add comment on blog id ",(done)=>{            
            chai.request(app)
            .post('/blogs/'+ blogid+'/comment') 
            .send(comment)
            .end((err,response) =>{
                response.should.have.status(403)                
            }) 
            done();
        })
       
    })

    // like 
    describe("post /blogs/:id/like", ()=>{
        const blogid = "63af23673be0660014f92479"       
        it("it should get single blog by id ",(done)=>{            
            chai.request(app)
            .post('/blogs/'+ blogid+'/like') 
            .end((err,response) =>{
                response.should.have.status(403)                
            }) 
            done();
        })
        it("it should get one object for one blog ",(done)=>{
            chai.request(app)
            .get('/blogs/'+blogid) 
            .end((err,response) =>{                
                response.body.data.should.be.a('object')
            }) 
            done();
        })   
    })
    // add message 
    //get admin  messages
    describe("GET /admin/messages", ()=>{      
        it("it should Not get all admin messages from contact me ",(done)=>{
            chai.request(app)            
            .get('/admin/messages')        
            .end((err,response) =>{
                response.should.have.status(404)     
                response.body.message.should.be.eq("you are not logged in")        
               
            }) 
            done();
        })   
        it("it should Not get all admin messages from contact me ",(done)=>{
            chai.request(app)
            .get(`/admin/messages`)      
            .end((err,response) =>{
                response.should.have.status(404)     
                // response.body.message.should.be.eq("you are not logged in")           
            }) 
            done();
        })
    })
    // get admin blogs
    describe("GET /admin/blogs", ()=>{       
        it("it should say you are not logged in",(done)=>{
            chai.request(app)
            .get('/admin/blogs') 
            .end((err,response) =>{
                response.should.have.status(404)   
                response.body.message.should.be.eq("you are not logged in")             
            }) 
            done();
        })      
    })
    //creating blog
    describe("Post /admin/blog",()=>{
        let blog={
            title: "test blog",
            body : "testing blog form mocha",
            image : "image url"
        }
        it("it should say you are not logged in ", ()=>{
            chai.request(app)
            .post("/admin/blogs")
            .send(blog)
            .end((err,response)=>{
                response.should.have.status(404)            
            })
        })

    })
    //editing blog 
    describe("delete /admin/blog/:id",()=>{      
        it("it should say you are not logged in ", ()=>{
            chai.request(app)
            .delete("/admin/blogs")            
            .end((err,response)=>{
                response.should.have.status(404)            
            })
        })

    })

/// requre authentication tests ............................................................................ , 
    //get all admin messages

    //adding comment   
    describe("post/blogs/:id/comment", ()=>{
        var Ntoken="empty";        
        var commentid="empty"
        const blogid = "63af23673be0660014f92479" 
          before(
              function(done) {               
              chai.request(app)
                .post('/login')
                .send({ email: 'josephrk@gmail.com', password: process.env.TEST_PASS })
                .end((error,response)=>{
                  // Save the token from the login response                  
            Ntoken = `Beare ${response.body.token}`;                                                      
              done()
                });          
                
            });     
            after(
                function(done){                    
                    chai.request(app)
                    .delete(`/blogs/${blogid}/${commentid}`)
                    .set('Authorization', Ntoken)                     
                    .end((error,response)=>{
                        response.should.have.status(200)
                        response.body.message.should.be.eq("deleted comment")
                        done()
                    })}
            )     
            it("get add comment",(done)=>{      
            let testcomment={
                text:"testcomment"
            }
                          
              chai.request(app)
              .post(`/blogs/${blogid}/comment`)            
              .set('Authorization', Ntoken)    
              .send(testcomment)
              .end((err,response) =>{
                  response.should.have.status(200)   
                  response.body.result.should.be.eq("added comment blog")     
                  commentid=response.body.commentid 
                  done()              
                   })
             })      
      }) 

      //adding like
      describe("post/blogs/:id/like", ()=>{
        var Ntoken="empty";        
          before(
              function(done) {               
              chai.request(app)
                .post('/login')
                .send({ email: 'josephrk@gmail.com', password: process.env.TEST_PASS })
                .end((error,response)=>{
                  // Save the token from the login response                  
                Ntoken = `Beare ${response.body.token}`;   
              done()
                });          
                
            });             
            
          it("get add like",(done)=>{            
            const blogid = "63af23673be0660014f92479"                
              chai.request(app)
              .post(`/blogs/${blogid}/like`)            
              .set('Authorization', Ntoken)    
              .send("like")            
              .end((err,response) =>{
                  response.should.have.status(200)   
                //   response.body.result.should.be.eq("liked blog")        
                  done()             
                   })
             })      
      }) 

      //get users 
      
      
})
