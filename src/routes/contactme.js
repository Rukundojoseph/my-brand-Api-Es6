import express from "express"
import Blogcontroller from "../controllers/blogcontroller.js"
const router = express.Router()

/**
 * @swagger
 * /contact:
 *   post:
 *     tags:
 *       - contact
 *     summary: send a message
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:                    
 *                    - email
 *                    - name
 *                    - message                   
 *                 properties:                 
 *                    email:
 *                      type: string
 *                    name:
 *                      type: string
 *                    message: 
 *                       type : string
 *                   
 *     responses:
 *       201:
 *             description: successfully sent message;
 *       
 * */

router.post('/contact',Blogcontroller.addMessage)

export default router