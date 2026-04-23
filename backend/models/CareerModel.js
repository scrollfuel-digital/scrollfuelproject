import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contact: { type: String, required: true },
        address: { type: String, required: true },
        interest: { type: String, required: true },
        appliedFor: { type: String, default: "" },
        resume: { type: String, required: true },
        status: { type: String, enum: ["pending", "rejected"], default: "pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Career", careerSchema, "careers");
