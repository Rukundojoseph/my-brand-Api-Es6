"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mybrand Api',
      description: 'this is my personal brand api',
      version: '1.0.0'
    }
  },
  // looks for configuration in specified directories
  apis: ['./src/routes/*.js']
};
var swaggerSpec = (0, _swaggerJsdoc["default"])(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec));

  // Documentation in JSON format
  app.get('/docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
var _default = swaggerDocs;
exports["default"] = _default;