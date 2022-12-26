"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var handleErrors = function handleErrors(err) {
  console.log(err.message, err.code);
  var errors = {
    status: 400
  };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.message = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.message = 'incorrect password or email';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.message = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(function (_ref) {
      var properties = _ref.properties;
      // console.log(val);
      //  console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  if (err.message.includes('Validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(function (_ref2) {
      var properties = _ref2.properties;
      // console.log(val);
      //  console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
var _default = handleErrors;
exports["default"] = _default;