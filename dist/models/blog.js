"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var blogSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: [true, 'blog title can not be null'],
    minlength: [4, "you cant have a blog title less than 4 characters"]
  },
  body: {
    type: String,
    required: [true, 'blog description can not be null']
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now
  },
  likes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Like'
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});
var _default = _mongoose["default"].model('BLOG', blogSchema);
exports["default"] = _default;