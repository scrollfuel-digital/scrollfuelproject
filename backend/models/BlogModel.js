import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
   
    image: {
      type: String,
    },
    hero_image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema, "blogs");