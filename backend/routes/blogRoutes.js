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

// ✅ CREATE BLOG (FIXED)
router.post(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "hero_image", maxCount: 1 },
    ]),
    createBlog
);

// GET ALL
router.get("/", getBlogs);

// GET SINGLE
router.get("/:id", getBlogById);

// ✅ UPDATE BLOG (FIXED)
router.put(
    "/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "hero_image", maxCount: 1 },
    ]),
    updateBlog
);

// DELETE
router.delete("/:id", deleteBlog);

export default router;