"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _swagger = _interopRequireDefault(require("./swagger.js"));
var _dotenv = require("dotenv");
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _xssClean = _interopRequireDefault(require("xss-clean"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _blogs = _interopRequireDefault(require("./routes/blogs.js"));
var _admin = _interopRequireDefault(require("./routes/admin.js"));
var _contactme = _interopRequireDefault(require("./routes/contactme.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _dotenv.config)();
var port = process.env.PORT || 3000;
var app = (0, _express["default"])();
app.use((0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use((0, _xssClean["default"])());

// middleware
app.use(_express["default"]["static"]('public'));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
//routes 

//routes 
//using routes
//using routes

// database connection
// const dbURI = 'mongodb://127.0.0.1:27017/authopf';
_mongoose["default"].connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function (result) {
  app.listen(port, function () {
    console.log("listening on port ".concat(port));
  });
  (0, _swagger["default"])(app, port);
})["catch"](function (err) {
  return console.log(err);
});

// routes

app.get('/', function (req, res) {
  return res.send('home');
});
app.use(_blogs["default"]);
app.use(_admin["default"]);
app.use(_contactme["default"]);
app.use(_authRoutes["default"]);
var _default = app;
exports["default"] = _default;