import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, default: "" },
    location: { type: String, default: "" },
    type: { type: String, required: true },
    experience: { type: String, default: "" },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema, "jobs");
