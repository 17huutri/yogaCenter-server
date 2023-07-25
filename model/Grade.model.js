import mongoose, { ObjectId } from "mongoose";

export const GradeSchema = new mongoose.Schema({
    id: { type: ObjectId },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    nOfStudent: {
        min : 0,
        max : 20,
        type : Number,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    _image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
    },
    gradeName: {
        type: String,
        required: false,
    },
    _image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
    },
    description : {
        type : String,
        required : false,
    },
    room : {
        type : String,
        required : false,
    },
    weekDay : {
        type : String,
        required : false,
    },
    startTimeGrade: {
        type: String,
        required: false,
    },
    endTimeGrade: {
        type: String,
        required: false
    },

},
    { timestamps: true });

export default mongoose.model.Grade || mongoose.model('Grade', GradeSchema);