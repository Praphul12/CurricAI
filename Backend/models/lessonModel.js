import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    isEnriched: {
        type: Boolean,
        default: false
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }
})


lessonSchema.statics.getLesson = async function (lessonId) {
    try {
        const lessonData = this.findById(lessonId);
        return lessonData;
    } catch (error) {
        return error;
    }
}
export const Lesson = mongoose.model('Lesson',lessonSchema); 