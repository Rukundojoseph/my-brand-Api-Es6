"use strict";

var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _app = _interopRequireDefault(require("../app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
describe("blogs api", function () {
  //login 
  // describe("GET /login", ()=>{        
  //     const users=[{
  //         email: "joseph@gmail.com",
  //         password : "pass123"
  //     },
  //    {
  //         email: "joseph@gmail.com",
  //         password : "pass1mm23"
  //     },
  //     {
  //         email: "josephgmail.com",
  //         password : "pass123"
  //     }]
  //     it("should log the user in ",(done)=>{
  //         chai.request(server)
  //         .post('/login')
  //         .send(users[0]) 
  //         .end((err,response) =>{
  //             response.should.have.status(200)     
  //             response.body.message.should.be.eq("you are not logged in")           
  //         })             
  //         done();
  //     })   
  //     it("it should say incorect email or password",(done)=>{
  //         chai.request(app)
  //         .post('/login')
  //         .send(users[1]) 
  //         .end((err,response) =>{
  //             response.should.have.status(400)     
  //              response.body.msg.should.be.eq("incorrect password")        

  //         })             
  //         done();
  //     })   
  // })
  //signup 
  //get blogs
  describe("GET /blogs", function () {
    it("it should get all blogs ", function (done) {
      _chai["default"].request(_app["default"]).get('/blogs').end(function (err, response) {
        response.should.have.status(200);
        response.body.message.should.be.eq('success');
      });
      done();
    });
    it("it should get response message of success ", function (done) {
      _chai["default"].request(_app["default"]).get('/blogs').end(function (err, response) {
        response.body.message.should.be.eq('success');
      });
      done();
    });
  });
  //get by id 
  describe("GET /blogs/:id", function () {
    var blogid = "639b45418b6be33a98643589";
    it("it should get single blog by id ", function (done) {
      _chai["default"].request(_app["default"]).get('/blogs/' + blogid).end(function (err, response) {
        response.should.have.status(200);
      });
      done();
    });
    it("it should get one object for one blog ", function (done) {
      _chai["default"].request(_app["default"]).get('/blogs/' + blogid).end(function (err, response) {
        response.body.data.should.be.a('object');
      });
      done();
    });
  });
  // comment 
  describe("post /blogs/:id/comment", function () {
    var blogid = "639b45418b6be33a98643589";
    var comment = "what is  happening now";
    it("it should check add comment on blog id ", function (done) {
      _chai["default"].request(_app["default"]).post('/blogs/' + blogid + '/comment').send(comment).end(function (err, response) {
        response.should.have.status(403);
      });
      done();
    });
    it("it should check for error ", function (done) {
      _chai["default"].request(_app["default"]).get('/blogs/' + blogid).end(function (err, response) {
        response.body.data.should.be.a('object');
      });
      done();
    });
  });

  // like 
  describe("post /blogs/:id/like", function () {
    var blogid = "639b45418b6be33a98643589";
    var comment = "what is  happening now";
    it("it should get single blog by id ", function (done) {
      _chai["default"].request(_app["default"]).post('/blogs/' + blogid + '/like').send(comment).end(function (err, response) {
        response.should.have.status(403);
      });
      done();
    });
    it("it should get one object for one blog ", function (done) {
      _chai["default"].request(_app["default"]).get('/blogs/' + blogid).end(function (err, response) {
        response.body.data.should.be.a('object');
      });
      done();
    });
  });
  // add message 
  //get admin  messages
  describe("GET /admin/messages", function () {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWI3MTI2ZjJkZWE4MjkwNDAxYWE2MCIsImlhdCI6MTY3MTQ1NTkwMiwiZXhwIjoxNjcxNzE1MTAyfQ.HUslSYE5TfF4EAo689BEeM9GsTzAEDiCGSpu1A5rV44";
    it("it should Not get all admin messages from contact me ", function (done) {
      _chai["default"].request(_app["default"]).get('/admin/messages').end(function (err, response) {
        response.should.have.status(404);
        response.body.message.should.be.eq("you are not logged in");
      });
      done();
    });
    it("it should Not get all admin messages from contact me ", function (done) {
      _chai["default"].request(_app["default"]).get("/admin/messages").set('token', token).end(function (err, response) {
        response.should.have.status(404);
        // response.body.message.should.be.eq("you are not logged in")           
      });

      done();
    });
  });
  // get admin blogs
  describe("GET /admin/blogs", function () {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWI3MTI2ZjJkZWE4MjkwNDAxYWE2MCIsImlhdCI6MTY3MTQ0NjYxMCwiZXhwIjoxNjcxNzA1ODEwfQ.mHXK2yUKN_7dx5CIzPDcYTboOBLl3jgPxzwDoL1-zXA";
    it("it should say you are not logged in", function (done) {
      _chai["default"].request(_app["default"]).get('/admin/blogs').end(function (err, response) {
        response.should.have.status(404);
        response.body.message.should.be.eq("you are not logged in");
      });
      done();
    });
  });
  //creating blog
  describe("Post /admin/blog", function () {
    var blog = {
      title: "test blog",
      body: "testing blog form mocha",
      image: "image url"
    };
    it("it should say you are not logged in ", function () {
      _chai["default"].request(_app["default"]).post("/admin/blogs").send(blog).end(function (err, response) {
        response.should.have.status(404);
      });
    });
  });
  //editing blog 
  describe("delete /admin/blog/:id", function () {
    it("it should say you are not logged in ", function () {
      _chai["default"].request(_app["default"])["delete"]("/admin/blogs").end(function (err, response) {
        response.should.have.status(404);
      });
    });
  });
  //deleting blog 
  describe("GET /admin/messages", function () {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWI3MTI2ZjJkZWE4MjkwNDAxYWE2MCIsImlhdCI6MTY3MTQ0NjYxMCwiZXhwIjoxNjcxNzA1ODEwfQ.mHXK2yUKN_7dx5CIzPDcYTboOBLl3jgPxzwDoL1-zXA";
    it("it should say you are not logged in", function (done) {
      _chai["default"].request(_app["default"]).get('/admin/messages').end(function (err, response) {
        response.should.have.status(404);
        response.body.message.should.be.eq("you are not logged in");
      });
      done();
    });
  });
  //deleting message 
  //deleting comment     
});