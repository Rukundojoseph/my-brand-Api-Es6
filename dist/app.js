"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _swagger = _interopRequireDefault(require("./swagger.js"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _blogs = _interopRequireDefault(require("./routes/blogs.js"));
var _admin = _interopRequireDefault(require("./routes/admin.js"));
var _contactme = _interopRequireDefault(require("./routes/contactme.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = 3000;
var app = (0, _express["default"])();

// middleware
app.use(_express["default"]["static"]('public'));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
//routes 

//routes 
//using routes

//using routes

// database connection
var dbURI = 'mongodb://127.0.0.1:27017/authopf';
_mongoose["default"].connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function (result) {
  app.listen(port);
  (0, _swagger["default"])(app, port);
})["catch"](function (err) {
  return console.log(err);
});

// routes

app.get('/', function (req, res) {
  return res.send('home');
});
//  app.get('/admin', requireAdmin, (req, res) => res.send('admin'));
app.use(_blogs["default"]);
app.use(_admin["default"]);
app.use(_contactme["default"]);
app.use(_authRoutes["default"]);
var _default = app;
exports["default"] = _default;