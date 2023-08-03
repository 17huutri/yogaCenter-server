import mongoose, { ObjectId } from "mongoose";

export const SlotSchema = new mongoose.Schema({
    id: { type: ObjectId },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: false,
    },
    isAttended: {
        type: Number,
        default: 0,
        enum: {
            values: [0, 1],
            message: '{VALUE} is not supported'
        },
    },
  
   
}, {
    timestamps: true
});

export default mongoose.model.Slot || mongoose.model('Slot', SlotSchema);