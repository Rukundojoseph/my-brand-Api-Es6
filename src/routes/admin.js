import express from 'express'
const router = express()
import  Admin from '../controllers/admincontroller.js'
import { requireAdmin, requireAuth } from '../middleware/authMiddleware.js'


/**
 * @swagger
 * /admin/blogs:
 *   get:
 *     tags:
 *       - Admin
 *     name: Blog
 *     summary: Retrieve all blogs in admin
 *     consumes:
 *        - application/json
 *     responses:
 *       200:
 *             description: Blogs successfully Retrieved.
 * */

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
/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags:
 *       - Admin
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
 * /admin/messages:
 *   get:
 *     tags:
 *       - Admin
 *     name:  Messages
 *     summary: Retrieve all messages
 *     consumes:
 *        - application/json
 *     responses:
 *       200:
 *             description: Blogs successfully Retrieved messages.
 *       400: 
 *              your dont have access to this route
 * */

/**
 * @swagger
 * /admin/messages/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a messages
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully Deleted message.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 * */

router.get('/admin/blogs',requireAdmin,Admin.getAllBlogs)
router.post('/admin/blogs',requireAdmin,Admin.CreateBlog)
router.patch('/admin/blogs/:id',requireAdmin,Admin.EditBlogs)
router.delete('/admin/blogs/:id',requireAdmin,Admin.DeleteBlog)
router.get('/admin/blogs/:id/likes',requireAdmin,Admin.getlikes)
router.get('/admin/messages',requireAdmin,Admin.getContacts)
router.get('/admin/users',requireAdmin,Admin.getUsers)
router.delete('/admin/messages/:id',requireAdmin,Admin.Deletemessage)


export default router

