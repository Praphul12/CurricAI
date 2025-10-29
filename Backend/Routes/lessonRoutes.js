import express from "express"
import { generateLesson, getLessonById } from "../Controllers/lessonController.js";
import { fetchVideos } from "../services/fetchVideos.js";

const router = express.Router();


router.get("/:lessonId",getLessonById);

router.post("/:lessonId/generate",generateLesson);

export default router;