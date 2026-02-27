

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

const API = import.meta.env.VITE_API_URL || "";

const safeParse = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data || [];
  } catch {
    return [];
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── FAQ accordion item ── */
const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-sm text-black pr-4 leading-snug">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg leading-none font-light"
          style={{ background: "var(--color-green)" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-6 pt-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { slug } = useParams();
  const location = useLocation();

  const blogId = location.state?.blogId;

  useEffect(() => {
    if (!slug) return;

    const createSlug = (title) =>
      title
        ?.toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");

    (async () => {
      try {
        setLoading(true);

        // Fetch all blogs
        const res = await fetch(`${API}/api/blog`);
        const data = await res.json();
        const allBlogs = data.data || [];

        // Find blog by slug
        const matchedBlog = allBlogs.find(
          (b) => createSlug(b.title) === slug
        );

        if (!matchedBlog) {
          setBlog(null);
          return;
        }

        setBlog(matchedBlog);

        // Fetch related
        if (matchedBlog?.category) {
          const relatedRes = await fetch(
            `${API}/api/blog?category=${matchedBlog.category}&exclude=${matchedBlog._id}`
          );
          const relatedData = await relatedRes.json();
          setRelatedPosts(relatedData.data || []);
        }

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();

  }, [slug]);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 border-4 rounded-full"
          style={{ borderColor: "var(--color-green)", borderTopColor: "transparent" }}
        />
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Blog not found.
      </div>
    );

  const keywords = safeParse(blog.keywords);
  const subPoints = safeParse(blog.sub_points);
  const faqs = safeParse(blog.faqs);

  const heroImage = blog.hero_image || "/assets/blog.jpeg";
  // const formattedDate = blog.created_at
  //   ? new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  //   : null;
  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : null;
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── progress bar ── */}
      <div className="fixed top-0 left-0 bottom-7 right-0 z-50 h-[3px] bg-gray-100">
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${readProgress}%`,
            background: "linear-gradient(90deg, var(--color-green), var(--color-yellow))",
          }}
        />
      </div>

      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${heroImage}")`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Back Button */}
        <div className="absolute top-28 left-6 md:left-14 z-30">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-white text-sm font-semibold 
               bg-black/40 backdrop-blur-md px-4 py-2 rounded-full 
               border border-white/20 hover:bg-black/60 transition-all"
          >
            <span className="w-6 h-6 rounded-full flex items-center justify-center">
              ←
            </span>
            Back to Blogs
          </button>
        </div>

        {/* CATEGORY */}
        {blog.category && (
          <div className="absolute bottom-24 left-6 md:left-14 z-20">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-black"
              style={{ background: "var(--color-yellow)" }}
            >
              {blog.category}
            </span>
          </div>
        )}

        {/* TITLE OVER IMAGE - CENTERED */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight text-center max-w-4xl"
          >
            {blog.title}
          </motion.h1>
        </div>
      </section>

      <section className="bg-white ">
        <div className="max-w-7xl mx-auto px-6 md:px-14 pb-12">

          {/* meta — date · company · read time */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            {formattedDate && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{
                    background: "rgba(139,197,63,0.14)",
                    color: "var(--color-green)",
                  }}
                >
                  📅
                </span>
                {formattedDate}
              </div>
            )}

            {(blog.company || blog.author) && (
              <>
                <span className="text-gray-300 hidden sm:block select-none">·</span>
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
                    style={{ background: "#111" }}
                  >
                    {(blog.company || blog.author)?.[0]?.toUpperCase()}
                  </div>
                  <span className="font-bold text-black">{blog.company || blog.author}</span>
                </div>
              </>
            )}

            {blog.read_time && (
              <>
                <span className="text-gray-300 hidden sm:block select-none">·</span>
                <span className="text-sm text-gray-500">⏱ {blog.read_time} min read</span>
              </>
            )}
          </motion.div>

          {/* related tags */}
          {keywords.length > 0 && (
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 self-center mr-1">
                Related:
              </span>
              {keywords.map((k, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer transition-all select-none"
                  style={{ borderColor: "#e5e7eb", color: "#666" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-green)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--color-green)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#666";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  {k}
                </span>
              ))}
            </motion.div>
          )}

          {/* intro / description paragraph */}
          {blog.description && (
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="mt-7 text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl"
            >
              {blog.description}
            </motion.p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-14 py-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

        {/* ── MAIN CONTENT ── */}
        <main className="min-w-0 space-y-14">

          {/* A) INTRO / MAIN CONTENT (markdown) */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-white"
          >
            <div
              className="blog-content prose prose-lg max-w-none
                prose-headings:font-black prose-headings:text-8xl prose-headings:text-black
                prose-h1:text-5xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-li:text-gray-700 prose-strong:text-black
                prose-a:text-[#8bc53f] prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-[3px] prose-blockquote:border-[#8bc53f]
                prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-500
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
            >
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </motion.div>

          {/* B) SUB POINTS — numbered list */}
          {subPoints.length > 0 && (
            <div>
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-1 w-10 rounded-full" style={{ background: "var(--color-green)" }} />
                <h2 className="text-2xl font-black text-black">Key Points</h2>
              </motion.div>

              {/* numbered list rows */}
              <div className="space-y-4 mb-8">
                {subPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    className="group flex gap-5 items-start bg-white rounded-2xl border border-gray-200 px-6 py-5  transition-all duration-300 relative overflow-hidden"
                  >
                    {/* left accent */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                      style={{ background: i % 2 === 0 ? "var(--color-green)" : "var(--color-yellow)" }}
                    />

                    {/* number */}
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm"
                      style={{
                        background: i % 2 === 0 ? "var(--color-green)" : "var(--color-yellow)",
                        color: i % 2 === 0 ? "#fff" : "#000",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-base text-black mb-1.5 group-hover:text-[#8bc53f] transition-colors leading-snug">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {point.paragraph?.length > 300
                          ? point.paragraph.slice(0, 300) + "..."
                          : point.paragraph}
                      </p>
                      {point.keyword && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-green)" }} />
                          <span className="text-xs font-bold" style={{ color: "var(--color-green)" }}>
                            {point.keyword}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* C) HIGHLIGHT BOXES — one per sub-point */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-1 w-10 rounded-full" style={{ background: "var(--color-yellow)" }} />
                <h2 className="text-xl font-black text-black">Highlights</h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                {subPoints.map((point, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                      className="rounded-2xl p-5 flex flex-col gap-3"
                      style={{
                        background: isEven
                          ? "linear-gradient(135deg, rgba(139,197,63,0.10), rgba(139,197,63,0.04))"
                          : "linear-gradient(135deg, rgba(255,201,59,0.12), rgba(255,201,59,0.04))",
                        border: `1.5px solid ${isEven ? "rgba(139,197,63,0.25)" : "rgba(255,201,59,0.30)"}`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
                          style={{
                            background: isEven ? "var(--color-green)" : "var(--color-yellow)",
                            color: isEven ? "#fff" : "#000",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs font-black uppercase tracking-wider" style={{ color: isEven ? "#5a8a1a" : "#a07800" }}>
                          Key Insight
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-black leading-snug">
                        {point.highlight || point.title}
                      </p>
                      {point.keyword && (
                        <span
                          className="self-start text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: isEven ? "rgba(139,197,63,0.15)" : "rgba(255,201,59,0.20)",
                            color: isEven ? "#4a7a12" : "#8a6400",
                          }}
                        >
                          #{point.keyword}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* D) FAQs */}
          {faqs.length > 0 && (
            <div>
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-1 w-10 rounded-full" style={{ background: "var(--color-yellow)" }} />
                <h2 className="text-2xl font-black text-black">Frequently Asked Questions</h2>
              </motion.div>
              <div className="space-y-3">
                {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
              </div>
            </div>
          )}

          {/* share strip */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "linear-gradient(135deg,#8bc53f10,#ffc93b10)", border: "1px solid #8bc53f22" }}
          >
            <div>
              <p className="font-black text-black text-lg">Found this useful?</p>
              <p className="text-gray-500 text-sm">Share it with your network.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {["LinkedIn", "Twitter", "Copy Link"].map((label) => (
                <button
                  key={label}
                  className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </main>

        {/* ── SIDEBAR ── */}
        <aside className="space-y-5 lg:sticky lg:top-8 self-start">

          {/* Table of Contents */}
          {subPoints.length > 0 && (
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-5"
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                In This Article
              </h3>
              <ul className="space-y-2.5">
                {subPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-black"
                      style={{
                        background: i % 2 === 0 ? "var(--color-green)" : "var(--color-yellow)",
                        color: i % 2 === 0 ? "#fff" : "#000",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600 hover:text-black cursor-pointer transition-colors leading-snug">
                      {point.title}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Keywords / Tags */}
          {keywords.length > 0 && (
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-5"
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer transition-all select-none"
                    style={{ borderColor: "var(--color-green)", color: "var(--color-green)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-green)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--color-green)";
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Posts */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              Related Posts
            </h3>
            <div className="space-y-3">

              {relatedPosts.length > 0 ? (
                relatedPosts.slice(0, 3).map((post, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="flex gap-3 group cursor-pointer"
                  >
                    {post.hero_image && (
                      <img
                        src={post.hero_image}
                        alt={post.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black group-hover:text-[#8bc53f] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </p>

                      {post.createdAt && (
                        <p className="text-xs text-gray-900 mt-1">
                          {new Date(post.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No related posts found.</p>
              )}
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-2xl p-6 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #111 55%, #1b2d0b)" }}
          >
            <div
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-30"
              style={{ background: "var(--color-yellow)" }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-20"
              style={{ background: "var(--color-green)" }}
            />
            <p
              className="relative text-xs font-black uppercase tracking-widest mb-2"
              style={{ color: "var(--color-yellow)" }}
            >
              Free Consultation
            </p>
            <h3 className="relative text-xl font-black leading-tight mb-3">
              Ready to grow your business?
            </h3>
            <p className="relative text-white/60 text-sm mb-5">
              Let our experts craft a strategy tailored to your goals.
            </p>
            <button
              className="relative w-full py-3 rounded-xl font-black text-sm text-black transition-transform hover:scale-105 active:scale-95"
              style={{ background: "var(--color-green)" }}
            >
              Get in Touch →
            </button>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
