import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.js"

chai.should()

chai.use(chaiHttp)

describe("blogs api" ,()=>{



describe("GET/admin/users test add and delete message and test get messages", ()=>{
    var Ntoken="empty";  
    var mid ="empty"    
    const message={
        email : "johnwall@gmail.com",
        name : "test message ",
        message : "testing messages from contact page"
    }
      before(
          function(done) {               
          chai.request(app)
            .post('/login')
            .send({ email: 'joseph@gmail.com', password: process.env.TEST_PASS })
            .end((error,response)=>{                           
              Ntoken = `Beare ${response.body.token}`;                                     
          done()
            });          
            
        });     
        after(function(done){
            chai.request(app)      
            .delete(`/admin/messages/${mid}`)
            .set('Authorization', Ntoken) 
            .end((error,response)=>{
                response.should.have.status(200)
                done()
            })
        })        
        
      it("get all users from admin",(done)=>{                      
          chai.request(app)
          .get('/admin/users')            
          .set('Authorization', Ntoken)            
          .end((err,response) =>{
              response.should.have.status(200)                          
              done()              
               })
         })      
         it("you should get an error message ",(done)=>{                      
            chai.request(app)
            .get('/admin/users')       
                .end((err,response) =>{
                response.should.have.status(404)                          
                done()              
                 })
           })      
          

         it("send message to admin",(done)=>{                      
            chai.request(app)
            .post('/contact')            
            .send(message)           
            .end((err,response) =>{
                response.should.have.status(200)    
                mid=response.body.messageid                      
                done()              
                 })
           })   
        it("get all messages from the admin",(done)=>{
            chai.request(app)
            .get(`/admin/messages`)
            .set('Authorization', Ntoken) 
            .end((error,response)=>{
                response.should.have.status(200)                 
                done()

            })
            

        })
  })
  describe("post patch and delete /admin/blogs", ()=>{
    var Ntoken="empty";       
    const testpost=[{
        title: "test blog create",
        body: "test blog body create"
    },{
        title: "test blog patch",
        body: "test blog body patch"
    }]
    var blogid="empty"
      before(
          function(done) {               
          chai.request(app)
            .post('/login')
            .send({ email: 'joseph@gmail.com', password: process.env.TEST_PASS })
            .end((error,response)=>{
              // Save the token from the login response                  
              Ntoken = `Beare ${response.body.token}`;                                    
          done()
            });          
            
        });   
        after(function(done){
            chai.request(app)
            .delete(`/admin/blogs/${blogid}`)
            .set('Authorization', Ntoken)
            .end((err,response)=>{
                response.should.have.status(204)
                done()
            })

        })          
        
      it("create blog from admin",(done)=>{                      
          chai.request(app)
          .post('/admin/blogs')            
          .set('Authorization', Ntoken)     
          .send(testpost[0])       
          .end((err,response) =>{
              response.should.have.status(201)   
            //   response.body.message.should.be.eq("success")       
            blogid=response.body.blog
              done()              
               })
         })      
         it("patch blog from admin",(done)=>{                      
            chai.request(app)
            .patch(`/admin/blogs/${blogid}`)            
            .set('Authorization', Ntoken)     
            .send(testpost[1])       
            .end((err,response) =>{
                response.should.have.status(200)   
              //   response.body.message.should.be.eq("success")       
                done()              
                 })
           }) 
  })
      describe("GET/admin/blog/likes", ()=>{
    var Ntoken="empty";       
    const blogid = "63af23673be0660014f92479"
      before(
          function(done) {               
          chai.request(app)
            .post('/login')
            .send({ email: 'joseph@gmail.com', password: process.env.TEST_PASS })
            .end((error,response)=>{
              // Save the token from the login response                  
           Ntoken = `Beare ${response.body.token}`;                                     
          done()
            });          
            
        });             
        
      it("get all blog likes from admin",(done)=>{                      
          chai.request(app)
          .get(`/admin/blogs/${blogid}/likes`)            
          .set('Authorization', Ntoken)            
          .end((err,response) =>{
              response.should.have.status(200)   
            //   response.body.message.should.be.eq("success")       
              done()              
               })
         })      
  })
  
  describe("GET/admin/messages", ()=>{
    var Ntoken="empty";
    let tokenarr =[];
      before(
          function(done) {               
          chai.request(app)
            .post('/login')
            .send({ email: 'joseph@gmail.com', password: process.env.TEST_PASS })
            .end((error,response)=>{
              // Save the token from the login response
             
           Ntoken = `Beare ${response.body.token}`;                                      
          done()
            });          
            
        });             
        
      it("get all messages from admin",(done)=>{                      
          chai.request(app)
          .get('/admin/messages')            
          .set('Authorization', Ntoken)            
          .end((err,response) =>{
              response.should.have.status(200)   
              response.body.message.should.be.eq("succesfully withdrawn")       
              done()              
               })
         })      
  })


  //geting all blogs 
  describe("GET/admin/blogs", ()=>{
      var Ntoken="empty";
      let tokenarr =[];
        before(
            function(done) {               
            chai.request(app)
              .post('/login')
              .send({ email: 'joseph@gmail.com', password: process.env.TEST_PASS })
              .end((error,response)=>{
                // Save the token from the login response                  
              Ntoken = `Beare ${response.body.token}`;                                        
            done()
              });          
              
          });             
          
        it("get all blogs from admin",(done)=>{                      
            chai.request(app)
            .get('/admin/blogs')            
            .set('Authorization', Ntoken)            
            .end((err,response) =>{
                response.should.have.status(200)   
                response.body.message.should.be.eq("success")       
                done()              
                 })
           })      
    })
})