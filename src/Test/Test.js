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
        const blogid = "639b45418b6be33a98643589"
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
        const blogid = "639b45418b6be33a98643589"
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWI3MTI2ZjJkZWE4MjkwNDAxYWE2MCIsImlhdCI6MTY3MjA0NTE1NCwiZXhwIjoxNjcyMzA0MzU0fQ.QnLy1bNzGnC6EfU4OhE10QBrakRoO3q7NgKZQ9BLSYo"
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
        it("it should check for error ",(done)=>{
            chai.request(app)
            .get('/blogs/'+blogid) 
            .end((err,response) =>{                
                response.body.data.should.be.a('object')
            }) 
            done();
        })   
    })

    // like 
    describe("post /blogs/:id/like", ()=>{
        const blogid = "639b45418b6be33a98643589"
        const comment ="what is  happening now"
        it("it should get single blog by id ",(done)=>{            
            chai.request(app)
            .post('/blogs/'+ blogid+'/like') 
            .send(comment)
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
    var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWI3MTI2ZjJkZWE4MjkwNDAxYWE2MCIsImlhdCI6MTY3MTQ1NTkwMiwiZXhwIjoxNjcxNzE1MTAyfQ.HUslSYE5TfF4EAo689BEeM9GsTzAEDiCGSpu1A5rV44"
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
            .set('token',token)     
            .end((err,response) =>{
                response.should.have.status(404)     
                // response.body.message.should.be.eq("you are not logged in")           
            }) 
            done();
        })
    })
    // get admin blogs
    describe("GET /admin/blogs", ()=>{
        const  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWI3MTI2ZjJkZWE4MjkwNDAxYWE2MCIsImlhdCI6MTY3MTQ0NjYxMCwiZXhwIjoxNjcxNzA1ODEwfQ.mHXK2yUKN_7dx5CIzPDcYTboOBLl3jgPxzwDoL1-zXA";
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



/// requre authentication tests ................................................ , 
    //get all admin messages

    describe("GET/admin/messages", (done)=>{
      var Ntoken="empty";
      let tokenarr =[];
        before(
            function(done) {               
            chai.request(app)
              .post('/login')
              .send({ email: 'joseph@gmail.com', password: 'pass123' })
              .end((error,response)=>{
                // Save the token from the login response
                console.log(Ntoken)
             Ntoken = response.body.token;                                      
            done()
              });          
              
          });             
          
        it("get all messages from admin",()=>{                      
            chai.request(app)
            .get('/admin/messages')            
            .set('Authorization', Ntoken)            
            .end((err,response) =>{
                response.should.have.status(200)   
                response.body.message.should.be.eq("succesfully withdrawn")                     
                 })
           })      
    })


    //geting all blogs 
    describe("GET/admin/blogs", (done)=>{
        var Ntoken="empty";
        let tokenarr =[];
          before(
              function(done) {               
              chai.request(app)
                .post('/login')
                .send({ email: 'joseph@gmail.com', password: 'pass123' })
                .end((error,response)=>{
                  // Save the token from the login response
                  console.log(Ntoken)
               Ntoken = response.body.token;                                      
              done()
                });          
                
            });             
            
          it("get all blogs from admin",()=>{                      
              chai.request(app)
              .get('/admin/blogs')            
              .set('Authorization', Ntoken)            
              .end((err,response) =>{
                  response.should.have.status(200)   
                  response.body.message.should.be.eq("success")                     
                   })
             })      
      })
      
    //adding comment   
    describe("post/blogs/:id/comment", (done)=>{
        var Ntoken="empty";
        let tokenarr =[];
          before(
              function(done) {               
              chai.request(app)
                .post('/login')
                .send({ email: 'josephrk@gmail.com', password: 'pass123' })
                .end((error,response)=>{
                  // Save the token from the login response
                  console.log(Ntoken)
               Ntoken = response.body.token;                                      
              done()
                });          
                
            });             
            
          it("get add comment",()=>{      
            let testcomment={
                body :"testcomment"
            }
            const blogid = "639b45418b6be33a98643589"                
              chai.request(app)
              .post(`/blogs/${blogid}/comment`)            
              .set('Authorization', Ntoken)    
              .send(testcomment)
              .end((err,response) =>{
                  response.should.have.status(200)   
                  response.body.result.should.be.eq("added comment blog")                     
                   })
             })      
      }) 
})
