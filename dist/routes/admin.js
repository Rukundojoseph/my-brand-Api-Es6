"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _admincontroller = _interopRequireDefault(require("../controllers/admincontroller.js"));
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
/**
 * @swagger
 * /admin/blogs:
 *   post:
 *     tags:
 *       - Admin
 *     summary: creating a blog
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:                    
 *                    - title
 *                    - body                    
 *                 properties:                 
 *                    title:
 *                      type: string
 *                    body:
 *                      type: string
 *                   
 *     responses:
 *       201:
 *             description: Blog saved successfully
 *       400:
 *             description: you are not the admin.
 * */

/**
 * @swagger
 * /admin/blog/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully Deleted.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 * */

/**
 * @swagger
 * /admin/blog/{id}:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update a blog
 *     content:
 *       - application/json
 *     parameters:
 *       - title: auth
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             properties:
 *                Author:
 *                 type: string
 *                Title:
 *                 type: string
 *                Content:
 *                 type: string
 *     responses:
 *       200:
 *             description: Blog successfully updated.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 * */

router.get('/admin/blogs', _authMiddleware.requireAdmin, _admincontroller["default"].getAllBlogs);
router.post('/admin/blogs', _authMiddleware.requireAdmin, _admincontroller["default"].CreateBlog);
router.patch('/admin/blogs/:id', _authMiddleware.requireAdmin, _admincontroller["default"].EditBlogs);
router["delete"]('/admin/blogs/:id', _authMiddleware.requireAdmin, _admincontroller["default"].DeleteBlog);
router.get('/admin/blogs/:id/likes', _authMiddleware.requireAdmin, _admincontroller["default"].getlikes);
router.get('/admin/blogs/:blogid/comments', function () {});
router["delete"]('/admin/blogs/:blogid/comments/:commentId', function () {});
router.get('/admin/messages', _authMiddleware.requireAdmin, _admincontroller["default"].getContacts);
router.get('/admin/users', _authMiddleware.requireAdmin, _admincontroller["default"].getUsers);
router["delete"]('/admin/messages/:id', _authMiddleware.requireAdmin, _admincontroller["default"].Deletemessage);
var _default = router;
exports["default"] = _default;