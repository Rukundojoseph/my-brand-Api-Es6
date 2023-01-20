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
})