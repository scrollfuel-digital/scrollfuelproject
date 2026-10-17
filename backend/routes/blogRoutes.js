import express from "express";
import upload from "../middleware/upload.js";
import {
    createBlog,
    getBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// CREATE
router.post(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "hero_image", maxCount: 1 },
    ]),
    createBlog
);

// GET ALL (lightweight list)
router.get("/", getBlogs);

// GET SINGLE BY SLUG (+ related) — must be BEFORE "/:id"
router.get("/slug/:slug", getBlogBySlug);

// GET SINGLE BY ID
router.get("/:id", getBlogById);

// UPDATE
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