import { createCourse, getCourse } from '../Controllers/courseController.js';
import express from 'express'
import {authorize} from '../Middlewares/authentication.js'
const router = express.Router();



router.post("/create",createCourse);
router.get("/allCourse",getCourse);
export default router;

