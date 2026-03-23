import "../database/conn.js";
import BlogModel from "../models/BlogModel.js";

/* ================= HELPERS ================= */

const countWords = (text = "") =>
    text.trim().split(/\s+/).filter(Boolean).length;

const safeParse = (value) => {
    if (!value) return [];
    if (typeof value === "object") return value;
    try {
        return JSON.parse(value);
    } catch (err) {
        console.log("Parse Error:", err.message);
        return [];
    }
};

/* ================= CREATE BLOG ================= */

const createBlog = async (req, res) => {
    try {
        const {
            title,
            content,
            description,
            keywords,
            category,
            author,
            company,
            read_time,
        } = req.body;

        if (!title || countWords(title) < 3) {
            return res.status(400).json({
                success: false,
                error: "Title must contain at least 3 words",
            });
        }

        if (!content || countWords(content) < 5) {
            return res.status(400).json({
                success: false,
                error: "Content must contain at least 5 words",
            });
        }

        const parsedKeywords = safeParse(keywords);

        // ✅ CLOUDINARY FILES
        const image = req.files?.image?.[0]?.path;
        const hero_image = req.files?.hero_image?.[0]?.path;

        const blog = new BlogModel({
            title: title.trim(),
            description: description?.trim() || "",
            content,
            category: category || "",
            author: author || "",
            company: company || "",
            read_time: read_time || "",
            keywords: parsedKeywords,
            image: image || "",
            hero_image: hero_image || "",
        });

        const savedBlog = await blog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: savedBlog,
        });
    } catch (error) {
        console.error("CREATE BLOG ERROR:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* ================= GET ALL ================= */

const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (error) {
        console.error("GET BLOGS ERROR:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* ================= GET ONE ================= */

const getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error("GET BLOG ERROR:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* ================= UPDATE ================= */

const updateBlog = async (req, res) => {
    try {
        const { title, content, description, keywords } = req.body;

        const updateData = {};

        if (title) {
            if (countWords(title) < 3) {
                return res.status(400).json({
                    success: false,
                    error: "Title must contain at least 3 words",
                });
            }
            updateData.title = title.trim();
        }

        if (content) {
            if (countWords(content) < 5) {
                return res.status(400).json({
                    success: false,
                    error: "Content must contain at least 5 words",
                });
            }
            updateData.content = content;
        }

        if (description !== undefined) {
            updateData.description = description;
        }

        if (keywords !== undefined) {
            updateData.keywords = safeParse(keywords);
        }

        // ✅ CLOUDINARY FILES
        const image = req.files?.image?.[0]?.path;
        const hero_image = req.files?.hero_image?.[0]?.path;

        if (image) updateData.image = image;
        if (hero_image) updateData.hero_image = hero_image;

        const blog = await BlogModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error) {
        console.error("UPDATE BLOG ERROR:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* ================= DELETE ================= */

const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("DELETE BLOG ERROR:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};