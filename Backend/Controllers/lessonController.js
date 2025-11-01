
import { Lesson } from "../models/lessonModel.js";
import { fetchVideos } from "../services/fetchVideos.js";
import {lessonGenerator} from "../services/generator.js"

export const getLessonById = async(req,res)=>{

    try {
        
        const {lessonId} = req.params;
        const lesson = await Lesson.getLesson(lessonId);
        res.status(200).json({lesson});
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

       const blocks = parsedLesson?.content;
    //    console.log(blocks);

       for(const block of blocks){
            if(block.type === 'video'){
                const videoId = await fetchVideos(block.query);
                block.url  = `https://www.youtube.com/watch?v=${videoId}`;
            }
       }


        const lesson = await Lesson.findByIdAndUpdate(lessonId, {content : parsedLesson,isEnriched: true},{new:true});
        res.status(200).json({lesson});
        // console.log(lesson);

    } catch (error) {
        res.status(400).json({error});
    }
}