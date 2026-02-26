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

router.post("/blog", upload.single("hero_image"), createBlog);
router.put("/blog/:id", upload.single("hero_image"), updateBlog);
router.get("/blog", getBlogs);
router.get("/blog/:id", getBlogById);
router.delete("/blog/:id", deleteBlog);

export default router;