"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var likeSchema = _mongoose["default"].Schema({
  date: {
    type: Date,
    "default": Date.now
  },
  email: {
    type: String,
    required: true
  }
});
var _default = _mongoose["default"].model('Like', likeSchema);
exports["default"] = _default;