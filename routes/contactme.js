import express from "express"
import Blogcontroller from "../controllers/blogcontroller.js"
const router = express.Router()

router.post('/contact',Blogcontroller.addMessage)

export default router