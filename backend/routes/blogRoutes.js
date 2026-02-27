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

router.post("/", upload.single("hero_image"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("hero_image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;