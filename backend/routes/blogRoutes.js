import express from "express";

import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "../controllers/blogController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

/* Routes */

// Create Blog
router.post("/", upload.single("image"), createBlog);

// Get All Blogs
router.get("/", getBlogs);

// Get Single Blog
router.get("/:id", getBlogById);

// Update Blog
router.put("/:id", upload.single("image"), updateBlog);

// Delete Blog
router.delete("/:id", deleteBlog);

export default router;
