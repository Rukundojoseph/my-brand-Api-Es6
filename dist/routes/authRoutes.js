"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authController = _interopRequireDefault(require("../controllers/authController.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: login a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: user not registered.
 * */

/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *       - Users
 *     name: logout
 *     summary: logout a user
 *     responses:
 *       201:
 *             description: logged out user successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in the system.
 * */

/**
 * @swagger
 * /signup:
 *   get:
 *     tags:
 *       - Users
 *     name: login
 *     summary: signup user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already registered.
 * */
router.post('/signup', _authController["default"].signup_post);
router.post('/login', _authController["default"].login_post);
router.get('/logout', _authController["default"].logout_get);
var _default = router;
exports["default"] = _default;