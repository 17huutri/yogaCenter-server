// Upload.js
import mongoose, { ObjectId } from "mongoose";

export const UploadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model.Upload || mongoose.model('Upload', UploadSchema);
