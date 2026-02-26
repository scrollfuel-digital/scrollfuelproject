import express from "express";
import upload from "../middleware/upload.js";
import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// ✅ REMOVE extra /blog here
router.post("/", upload.single("hero_image"), createBlog);
router.put("/:id", upload.single("hero_image"), updateBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);

export default router;