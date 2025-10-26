
import { Module } from "../models/moduleModel.js";
export const getModulesAndLessons = async(req,res)=>{

    try {
        
        const courseId = req.params;
        const modules = await Module.getModules(courseId);
        res.status(200).json({modules});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}