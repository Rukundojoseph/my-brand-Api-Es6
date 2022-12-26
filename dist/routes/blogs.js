"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _blogcontroller = _interopRequireDefault(require("../controllers/blogcontroller.js"));
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
/**
 * @swagger
 * /blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: Retrieve all blogs
 *     consumes:
 *        - application/json
 *     responses:
 *       200:
 *             description: Blogs successfully Retrieved.
 * */

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: retrieve single blog
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       200:
 *             description: Blog successfully Retrieved.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 * */

/**
 * @swagger
 * /blogs/{id}/like:
 *  post:
 *     tags:
 *       - Blogs
 *     name: add like
 *     summary: add like
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       200:
 *             description: added like succefuly.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 * */

/**
 * @swagger
 * /blogs/{id}/comment:
 *   post:
 *     tags:
 *       - Blogs
 *     name: comment
 *     summary: add a comment to a blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:           
 *                text:
 *                 type: string
 *     responses:
 *       201:
 *             description: Comment successfully added.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server error.
 * */

router.get('/blogs', _blogcontroller["default"].getAllBlogs);
router.get('/blogs/:id', _blogcontroller["default"].getSingleBlogs);
// router.get('/blogs/:id/likes',()=>{})
// router.get('/blogs/:blogid/comments',()=>{})

//require authentication
router.post('/blogs/:id/like', _authMiddleware.requireAuth, _blogcontroller["default"].addLike);
router.post('/blogs/:id/comment', _authMiddleware.requireAuth, _blogcontroller["default"].addComment);
//require authentication
var _default = router;
exports["default"] = _default;