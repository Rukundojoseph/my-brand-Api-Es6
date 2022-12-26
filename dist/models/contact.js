"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var contactSchema = _mongoose["default"].Schema({
  email: {
    type: String,
    lowercase: true,
    email: _joi["default"].string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }).required(),
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: [true, 'enter the message you want to send']
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var _default = _mongoose["default"].model('Message', contactSchema);
exports["default"] = _default;