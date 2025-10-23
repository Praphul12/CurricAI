import mongoose, { mongo } from "mongoose";


const moduleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    lessons:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Lesson'
        }
    ]
},{timestamps:true});


moduleSchema.statics.saveModule = async function (courseId,modules) {

    try {
        
        const moduleIds = [];
        let allLessons = [];
        for(const moduleData of modules){
            const module = new this({
                title: moduleData.title,
                course: courseId
            });
    
            const savedModule = await module.save();
            moduleIds.push(savedModule._id);
            
            const lessonToInsert = moduleData.lessons.map((title)=>({
                title: title,
                module: savedModule._id,
            }));
            
            allLessons = allLessons.concat(lessonToInsert);
        }
        return [allLessons,moduleIds];
       
    } catch (error) {
        
        console.error(error);
    }
    
}
export const Module = mongoose.model('Module',moduleSchema);

