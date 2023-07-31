import mongoose from "mongoose";
export const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        
    },
    payment: {
        type: Number,
        default: 0,
        enum: {
            values: [0, 1],
            message: '{VALUE} is not supported'
        },
    },
    isAccepted: {
        type: Number,
        default: 0,
        enum: {
            values: [-1,0, 1],
            message: '{VALUE} is not supported'
        },
    },

},
    { timestamps: true }
);
BookingSchema.index({ user: 1, grade: 1 }, { unique: true }
);


export default mongoose.model.Booking || mongoose.model('Booking', BookingSchema);