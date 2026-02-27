import "../database/conn.js";
import BlogModel from "../models/BlogModel.js";

/* Helper: Count Words */
const countWords = (text = "") => {
    return text.trim().split(/\s+/).filter(Boolean).length;
};

/* Helper: Safe JSON Parse */
const safeParse = (value) => {
    if (!value) return [];
    if (typeof value === "object") return value;
    try {
        return JSON.parse(value);
    } catch {
        return [];
    }
};

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

        const blog = new BlogModel({
            title: title.trim(),
            description: description?.trim() || "",
            content,
            category: category || "",
            author: author || "",
            company: company || "",
            read_time: read_time || "",
            keywords: parsedKeywords,
            hero_image: req.file ? req.file.path : "", // ✅ CLOUDINARY URL
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
/* ================= GET ALL BLOGS ================= */
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

/* ================= GET SINGLE BLOG ================= */
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
        console.error("GET BLOG BY ID ERROR:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* ================= UPDATE BLOG ================= */
const updateBlog = async (req, res) => {
    try {
        const { title, content, description, keywords, sub_points, faqs } =
            req.body;

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

        if (sub_points !== undefined) {
            updateData.sub_points = safeParse(sub_points);
        }

        if (faqs !== undefined) {
            updateData.faqs = safeParse(faqs);
        }
        if (req.file) {
            updateData.hero_image = req.file.path; // ✅ Cloudinary URL
        }

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

/* ================= DELETE BLOG ================= */
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