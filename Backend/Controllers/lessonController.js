// app.post("/api/generateLesson", async (req, res) => {
//   try {
//     const courseTitle = req.body.course;
//     const lessonTitle = req.body.lesson;
//     const moduleTitle = req.body.module;
//     // const topic = req.query.topic || "Introduction to APIS"; // optional query param
//     const lesson = await lessonGenerator(courseTitle,moduleTitle,lessonTitle);
//     res.status(200).json(lesson);

import { Lesson } from "../models/lessonModel.js";
import {lessonGenerator} from "../services/generator.js"
    



export const getLessonById = async(req,res)=>{

    try {
        
        const {lessonId} = req.params;
        const lessonData = await Lesson.getLesson(lessonId);
        res.status(200).json({lessonData});
    } catch (error) {
        res.status(400).json(error);
    }

}

export const generateLesson = async(req,res)=>{
    try {
        const { courseTitle, moduleTitle, lessonTitle } = req.body;
        const {lessonId} = req.params;
        const generatedLesson = await lessonGenerator(courseTitle,moduleTitle,lessonTitle);
        const parsedLesson = JSON.parse(generatedLesson);
        const lesson = await Lesson.findByIdAndUpdate(lessonId, {content : parsedLesson,isEnriched: true});

        res.status(200).json({lesson});

    } catch (error) {
        res.status(400).json({error});
    }
}