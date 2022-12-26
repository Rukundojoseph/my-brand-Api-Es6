"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _blogcontroller = _interopRequireDefault(require("../controllers/blogcontroller.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/contact', _blogcontroller["default"].addMessage);
var _default = router;
exports["default"] = _default;