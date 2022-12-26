"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var commentSchema = _mongoose["default"].Schema({
  date: {
    type: Date,
    "default": Date.now
  },
  body: {
    type: String,
    required: [true, 'you cant post a null comment']
  },
  author: {
    type: String
  },
  //
  blogID: {
    type: String
  }
  //
});
var _default = _mongoose["default"].model('Comment', commentSchema);
exports["default"] = _default;