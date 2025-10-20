import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desciption: String,
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
            trime: true
        }
    ]
}, {timestamps: true});


export const Course = mongoose.model('Course',courseSchema);
