import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
const API = import.meta.env.VITE_API_URL;


/* ---------------- SAFE PARSER ---------------- */
const safeParse = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data || [];
  } catch {
    return [];
  }
};

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API}/api/blog/${id}`);
        const data = await res.json();
        setBlog(data.data || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="text-center pt-40 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );

  if (!blog)
    return <div className="text-center pt-40">Blog not found</div>;

  /* ---------------- DATA STRUCTURE ---------------- */
  const keywords = safeParse(blog.keywords);
  const subPoints = safeParse(blog.sub_points);
  const faqs = safeParse(blog.faqs);

  /* ---------------- TRUNCATE ---------------- */
  const truncate = (text, max = 280) =>
    text?.length > max ? text.slice(0, max) + "..." : text;

  return (
    <section className="bg-gray-50 min-h-screen pb-24">

      {/* ================= HERO ================= */}
      <div
        className="relative min-h-200 flex items-center"
        style={{
          backgroundImage: blog.hero_image
            ? `url(${API_BASE}${blog.hero_image})`
            : `url("/assets/blog.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-20 text-white z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-96 text-white/80 hover:text-white"
          >
            ← Back to Blogs
          </button>

          <h1 className="text-4xl md:text-5xl font-black pb-20 leading-tight">
            {blog.title}
          </h1>

          <p className="mt-5 text-lg text-white/90 font-medium max-w-3xl">
            {blog.description}
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 mt-12 grid md:grid-cols-[1fr_300px] gap-10">

        {/* MAIN ARTICLE */}
        <div className="space-y-10">

          {/* CONTENT CARD */}
          {/* <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div
              className="prose prose-lg max-w-none 
                         prose-headings:text-dark 
                         prose-p:text-gray-700 
                         prose-li:text-gray-700 
                         prose-strong:text-dark"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          </div> */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="prose prose-lg max-w-none prose-headings:text-primary">
              <ReactMarkdown>
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* SUB POINTS */}
          {subPoints.length > 0 && (
            <div className="space-y-6">
              {subPoints.map((point, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="font-bold text-xl mb-2 text-dark">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {truncate(point.paragraph)}
                  </p>
                  {point.keyword && (
                    <div className="text-secondary font-semibold text-sm flex items-center gap-2">
                      • {point.keyword}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">FAQs</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="bg-white p-6 rounded-xl border">
                    <summary className="font-semibold cursor-pointer">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {keywords.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold mb-4">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k, i) => (
                  <span
                    key={i}
                    className="bg-primary/10 px-3 py-1 rounded text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

