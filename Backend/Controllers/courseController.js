import { parse } from "dotenv";
import { courseGenerator } from "../services/generator.js";

import {Course} from '../models/courseModel.js'
import { Module } from "../models/moduleModel.js";
import { Lesson } from "../models/lessonModel.js";


export const createCourse = async(req,res)=>{
    try {
        const topic = req.body.prompt;
        const userId = "google-oauth2|101643413532842411490"; //req.auth.payload.sub 
        const data = await courseGenerator(topic);
        //Extracting the raw json string
        const rawContent = data.choices[0].message.content;

        //parse the stringified json into JSON
        const parsedContent = JSON.parse(rawContent);

       //Save the course
        const course = await Course.saveCourse(userId,parsedContent.title,parsedContent.description,parsedContent.tags);
        //Save the modules 
        const [lessons,moduleIds] = await Module.saveModule(course._id,parsedContent.modules);
        //Now each module has lessons to it so save them together using insertMany
        const insertedLessons = await Lesson.insertMany(lessons);

        for(const mId of moduleIds){
            const lesonWithMId = await Lesson.find({module: mId}).distinct('_id');
            await Module.findByIdAndUpdate(mId,{lessons: lesonWithMId});

        }
        //Finally update the moduleIds in the course 
        const updatedCourse = await Course.findByIdAndUpdate(course._id,{modules: moduleIds},{new: true});
        res.status(200).json({updatedCourse});
        
    } catch (error) {
        
       res.status(400).json({message: error.message});
    }
}

export const getCourse = async(req,res)=>{

    try {
        const userId = "google-oauth2|101643413532842411490"; //req.auth.payload.sub 
        const courses = await Course.getUserCourses(userId);
        res.status(200).json({courses});
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }


}

