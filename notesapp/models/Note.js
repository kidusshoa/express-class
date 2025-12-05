import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [70, "Title cannot exceed 70 characters"],
    },
    body: {
        type: String,
        required: [true, "Body is required"],
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("Note", noteSchema);