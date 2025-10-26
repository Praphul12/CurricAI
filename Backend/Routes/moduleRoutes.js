
import express from 'express'
import { getModulesAndLessons } from "../Controllers/moduleController.js";

const router = express.Router();

router.get("/:courseId",getModulesAndLessons);

export default router;