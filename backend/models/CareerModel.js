import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // ⭐ UNIQUE
        contact: { type: String, required: true },
        address: { type: String, required: true },
        interest: { type: String, required: true },
        resume: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Career", careerSchema);
