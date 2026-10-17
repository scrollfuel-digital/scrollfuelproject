// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     keywords: {
//       type: [String],
//       default: [],
//     },

//     image: {
//       type: String,
//     },
//     hero_image: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Blog", blogSchema, "blogs");



import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String }, // generated from title
    description: { type: String },
    content: { type: String, required: true },
    keywords: { type: [String], default: [] },

    // These were being sent by the controller but missing in the schema,
    // so Mongoose (strict mode) silently dropped them.
    category: { type: String, default: "" },
    author: { type: String, default: "" },
    company: { type: String, default: "" },
    read_time: { type: String, default: "" },

    image: { type: String },
    hero_image: { type: String },
  },
  { timestamps: true }
);

// Fast sorting for the list page + fast lookup by slug
blogSchema.index({ createdAt: -1 });
blogSchema.index({ slug: 1 }, { unique: true, sparse: true });

export default mongoose.model("Blog", blogSchema, "blogs");