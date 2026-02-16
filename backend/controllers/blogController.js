import "../database/conn.js";
import BlogModel from "../models/BlogModel.js";

/* Helper: Count Words */
const countWords = (text) => {
    return text.trim().split(/\s+/).length;
};

/* ================= CREATE BLOG ================= */
// const createBlog = async (req, res) => {
//     try {
//         const { title, content, keyword } = req.body;

//         // Validate content
//         if (!content || countWords(content) < 5) {
//             return res.status(400).json({
//                 error: "Content must contain at least 5 words",
//             });
//         }

//         // Validate title
//         if (!title || countWords(title) < 3) {
//             return res.status(400).json({
//                 error: "Title must contain at least 3 words",
//             });
//         }

//         const blog = new BlogModel({
//             title,
//             content,
//             keyword,
//             image: req.file ? `/uploads/${req.file.filename}` : "",
//         });

//         const savedBlog = await blog.save();

//         res.status(201).json({
//             success: true,
//             message: "Blog created successfully",
//             data: savedBlog,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// };

const createBlog = async (req, res) => {
    try {
        const {
            title,
            content,
            description,
            keywords,
            sub_points,
            faqs,
        } = req.body;

        /* ---------------- VALIDATION ---------------- */

        if (!title || title.trim().split(/\s+/).length < 3) {
            return res.status(400).json({
                error: "Title must contain at least 3 words",
            });
        }

        if (!content || content.trim().split(/\s+/).length < 5) {
            return res.status(400).json({
                error: "Content must contain at least 5 words",
            });
        }

        /* ---------------- CREATE BLOG ---------------- */

        const blog = new BlogModel({
            title: title.trim(),
            description: description || "",
            content, // ✅ SAVE MARKDOWN DIRECTLY
            keywords: keywords ? JSON.parse(keywords) : [],
            sub_points: sub_points ? JSON.parse(sub_points) : [],
            faqs: faqs ? JSON.parse(faqs) : [],
            image: req.files?.image
                ? `/uploads/${req.files.image[0].filename}`
                : "",
        });

        const savedBlog = await blog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: savedBlog,
        });

    } catch (error) {
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
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


/* ================= UPDATE BLOG ================= */
const updateBlog = async (req, res) => {
    try {
        const { title, content, keyword } = req.body;

        // Validate content if exists
        if (content && countWords(content) < 5) {
            return res.status(400).json({
                error: "Content must contain at least 5 words",
            });
        }

        // Validate title if exists
        if (title && countWords(title) < 3) {
            return res.status(400).json({
                error: "Title must contain at least 3 words",
            });
        }

        const updateData = {
            title,
            content,
            keyword,
        };

        // If new image uploaded
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const blog = await BlogModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
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
