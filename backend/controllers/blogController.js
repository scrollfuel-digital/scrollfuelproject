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

// Must match the frontend createSlug()
const createSlug = (title = "") =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");

const uniqueSlug = async (title, excludeId) => {
    const base = createSlug(title) || "post";
    let slug = base;
    let n = 1;
    // eslint-disable-next-line no-await-in-loop
    while (
        await BlogModel.exists({
            slug,
            ...(excludeId ? { _id: { $ne: excludeId } } : {}),
        })
    ) {
        n += 1;
        slug = `${base}-${n}`;
    }
    return slug;
};

// Plain-text excerpt from markdown/html
const toExcerpt = (text = "", len = 200) =>
    text
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/[#*_`>~|-]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, len);

// Fields needed for cards/lists (NO full content)
const LIST_PROJECTION = {
    title: 1,
    slug: 1,
    description: 1,
    category: 1,
    author: 1,
    company: 1,
    read_time: 1,
    hero_image: 1,
    createdAt: 1,
    excerpt: { $substrCP: ["$content", 0, 600] },
};

const shapeListItem = (b) => ({
    _id: b._id,
    title: b.title,
    slug: b.slug || createSlug(b.title),
    category: b.category,
    author: b.author,
    company: b.company,
    read_time: b.read_time,
    hero_image: b.hero_image,
    createdAt: b.createdAt,
    excerpt: toExcerpt(b.description || b.excerpt, 240),
});

/* ================= SIMPLE IN-MEMORY CACHE ================= */

const TTL = 60 * 1000;
let listCache = { data: null, time: 0 };
const clearCache = () => {
    listCache = { data: null, time: 0 };
};

const getList = async () => {
    if (listCache.data && Date.now() - listCache.time < TTL) {
        return listCache.data;
    }
    const rows = await BlogModel.aggregate([
        { $sort: { createdAt: -1 } },
        { $project: LIST_PROJECTION },
    ]);
    const data = rows.map(shapeListItem);
    listCache = { data, time: Date.now() };
    return data;
};

const setPublicCache = (res) =>
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");

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

        const image = req.files?.image?.[0]?.path;
        const hero_image = req.files?.hero_image?.[0]?.path;

        const blog = new BlogModel({
            title: title.trim(),
            slug: await uniqueSlug(title.trim()),
            description: description?.trim() || "",
            content,
            category: category || "",
            author: author || "",
            company: company || "",
            read_time: read_time || "",
            keywords: safeParse(keywords),
            image: image || "",
            hero_image: hero_image || "",
        });

        const savedBlog = await blog.save();
        clearCache();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: savedBlog,
        });
    } catch (error) {
        console.error("CREATE BLOG ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/* ================= GET ALL (LIGHTWEIGHT) ================= */

const getBlogs = async (req, res) => {
    try {
        const data = await getList();
        setPublicCache(res);
        res.status(200).json({ success: true, count: data.length, data });
    } catch (error) {
        console.error("GET BLOGS ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/* ================= GET ONE BY SLUG (+ related) ================= */

const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        let blog = await BlogModel.findOne({ slug }).lean();

        // Fallback for old blogs that don't have a stored slug yet
        if (!blog) {
            const titles = await BlogModel.find({ slug: { $exists: false } }, "title").lean();
            const match = titles.find((b) => createSlug(b.title) === slug);
            if (match) {
                blog = await BlogModel.findById(match._id).lean();
                // lazy backfill (ignore failure, e.g. duplicate slug)
                BlogModel.updateOne({ _id: match._id }, { slug }).catch(() => { });
            }
        }

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        const all = await getList();
        const related = all.filter((b) => String(b._id) !== String(blog._id)).slice(0, 30);

        setPublicCache(res);
        res.status(200).json({
            success: true,
            data: { ...blog, slug: blog.slug || slug },
            related,
        });
    } catch (error) {
        console.error("GET BLOG BY SLUG ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/* ================= GET ONE BY ID ================= */

const getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id).lean();

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error("GET BLOG ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/* ================= UPDATE ================= */

const updateBlog = async (req, res) => {
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

        const updateData = {};

        if (title) {
            if (countWords(title) < 3) {
                return res.status(400).json({
                    success: false,
                    error: "Title must contain at least 3 words",
                });
            }
            updateData.title = title.trim();
            updateData.slug = await uniqueSlug(title.trim(), req.params.id);
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

        if (description !== undefined) updateData.description = description;
        if (keywords !== undefined) updateData.keywords = safeParse(keywords);
        if (category !== undefined) updateData.category = category;
        if (author !== undefined) updateData.author = author;
        if (company !== undefined) updateData.company = company;
        if (read_time !== undefined) updateData.read_time = read_time;

        const image = req.files?.image?.[0]?.path;
        const hero_image = req.files?.hero_image?.[0]?.path;
        if (image) updateData.image = image;
        if (hero_image) updateData.hero_image = hero_image;

        const blog = await BlogModel.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        clearCache();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error) {
        console.error("UPDATE BLOG ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/* ================= DELETE ================= */

const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        clearCache();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("DELETE BLOG ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export {
    createBlog,
    getBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog,
};