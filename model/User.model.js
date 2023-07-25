import mongoose, { ObjectId } from "mongoose";

export const UserSchema = new mongoose.Schema({
    id: { type: ObjectId },
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    fullName: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],

    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        unique: [true, "Please provide a unique"]
    },
    ex_grade: {
        type: String,
    },
    address: { type: String },
    description: { type: String },
    phone: { type: String },
    gender: { type: String },
    profile: { type: String },
    roleId: {
        type: Number,
        default: 1,
        enum: {

            values: [1, 2, 3, 4],
            message: '{VALUE} is not supported'
        },

    },
    isActive: {
        type: Number,
        default: 0,
        enum: {
            values: [0, 1],
            message: '{VALUE} is not supported'
        },
    }
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);