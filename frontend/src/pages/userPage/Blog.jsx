import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

// Clean HTML + Markdown
const stripHTML = (html) => {
  if (!html) return "";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  let text = tempDiv.textContent || tempDiv.innerText || "";
  text = text.replace(/[#*_`>-]/g, "");

  return text.trim();
};

// Slug Generator
const createSlug = (title) => {
  return title
    ?.toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
};

// FIX IMAGE URL
const getImageUrl = (img) => {
  if (!img) return "/assets/blog.jpeg";

  if (img.startsWith("http")) {
    return img; // Cloudinary or external image
  }

  return `${API}${img}`; // Local uploaded image
};

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API}/api/blog`);
        const data = await res.json();
        setBlogs(data.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blogs.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [blogs]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % blogs.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? blogs.length - 1 : prev - 1
    );

  if (loading) {
    return (
      <section className="pt-28 pb-20 bg-black text-center text-white">
        Loading blogs...
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="pt-28 pb-20 bg-black text-center text-white">
        No blogs found.
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-primary">Blogs</span>
          </h1>
        </motion.div>

        {/* ================= SLIDER ================= */}
        <div className="relative mb-28">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-10 items-center bg-muted/5 rounded-3xl p-8 md:p-12"
              >
                <img
                  src={getImageUrl(blogs[current]?.hero_image)}
                  alt={blogs[current]?.title}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />

                <div>
                  <h2 className="text-3xl font-bold mt-3 mb-4 text-primary">
                    {blogs[current]?.title}
                  </h2>

                  <p className="text-muted mb-6 leading-relaxed">
                    {stripHTML(blogs[current]?.content).slice(0, 330)}...
                  </p>

                  {/* <button
                    onClick={() =>
                      navigate(
                        `/blog/${createSlug(blogs[current].title)}`,
                        { state: { blogId: blogs[current]._id } }
                      )
                    }
                    className="text-primary font-semibold hover:underline"
                  >
                    Read More →
                  </button> */}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevSlide} className="btn-circle">
              ←
            </button>
            <button onClick={nextSlide} className="btn-circle">
              →
            </button>
          </div>
        </div>

        {/* ================= BLOG GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group border border-gray-800 rounded-2xl overflow-hidden shadow-sm bg-black"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={getImageUrl(blog?.hero_image)}
                  alt={blog?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mt-2 mb-3 text-primary">
                  {blog.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed mb-4">
                  {stripHTML(blog?.content).slice(0, 120)}...
                </p>

                <button
                  className="text-primary font-medium hover:underline"
                  onClick={() =>
                    navigate(`/blog/${createSlug(blog.title)}`, {
                      state: { blogId: blog._id },
                    })
                  }
                >
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;