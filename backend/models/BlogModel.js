import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  keyword: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;
