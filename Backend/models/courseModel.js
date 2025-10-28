import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    creator : {
        type: String,
        required: true
    },
    modules : [
        //Many modules
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Module'

        }
    ],
    tags : [
        {
            type: String,
            trim: true
        }
    ]
}, {timestamps: true});


courseSchema.statics.saveCourse = async function (id,title,description,tags,modules) {
    
    try {
        
    
        const course = new this({
          
            title,
            description,
            creator: id,
            tags
        });
    
        const newCourse = await course.save();
        return newCourse;
        
    } catch (error) {
        throw new Error('Error creating course '+ error.message);
    }

}

courseSchema.statics.getUserCourses = async function (userId) {
    
    try {
        const courses = await this.find({creator: userId}).sort({createdAt: -1}).exec();
        return courses;
        
    } catch (error) {
        throw new Error("unable to fetch Courses "+ error.message);
    }
}

export const Course = mongoose.model('Course',courseSchema);
