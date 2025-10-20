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

export const Module = mongoose.model('Module',moduleSchema);