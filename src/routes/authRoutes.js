import { Router } from 'express'
import  Users from '../controllers/authController.js'

const router = Router();
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: login a user
 *     security: []
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
 * /signup:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: signup user
 *     security: []
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
router.post('/signup', Users.signup_post);
router.post('/login', Users.login_post);

export default router