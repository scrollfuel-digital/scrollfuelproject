import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API = import.meta.env.VITE_API_URL || "";

const safeParse = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data || [];
  } catch {
    return [];
  }
};

const createSlug = (title = "") =>
  title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");

const getYouTubeId = (url = "") => {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
};

const getVimeoId = (url = "") => {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
};

const isVideoFile = (url = "") => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Breadcrumb trail */
const Breadcrumb = ({ category, title }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
      <span className="cursor-pointer hover:text-[#8bc53f] transition-colors" onClick={() => navigate("/")}>Home</span>
      <span className="text-gray-500 dark:text-gray-400">›</span>
      <span className="cursor-pointer hover:text-[#8bc53f] transition-colors" onClick={() => navigate("/blog")}>Blog</span>
      {category && (
        <>
          <span className="text-gray-500 dark:text-gray-400">›</span>
          <span className="text-gray-400">{category}</span>
        </>
      )}
      <span className="text-gray-500 dark:text-gray-400">›</span>
      <span className="text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{title}</span>
    </nav>
  );
};

/* Section heading with coloured left bar */
const SectionHeading = ({ label, color = "green" }) => (
  <motion.div
    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="flex items-center gap-3 mb-7"
  >
    <span
      className="w-1.5 h-7 rounded-full flex-shrink-0"
      style={{ background: color === "green" ? "var(--color-green)" : "var(--color-yellow)" }}
    />
    <h2 className="text-xl font-black text-black dark:text-white tracking-tight">{label}</h2>
  </motion.div>
);

const Lightbox = ({ src, alt, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="relative max-w-5xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={src} alt={alt || ""} className="w-full max-h-[88vh] object-contain rounded-2xl" />
      {alt && <p className="mt-3 text-center text-white/55 text-sm italic">{alt}</p>}
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-black dark:text-white text-xl hover:bg-white/25 transition-all"
      >×</button>
    </motion.div>
  </motion.div>
);

const InlineImage = ({ src, alt }) => {
  const [lightbox, setLightbox] = useState(false);
  const [status, setStatus] = useState("loading");

  return (
    <>
      <span className="block my-7 not-prose">
        <span
          className="block relative rounded-2xl overflow-hidden group bg-gray-800"
          style={{ cursor: status === "loaded" ? "zoom-in" : "default", minHeight: status === "loaded" ? 0 : "280px" }}
          onClick={() => status === "loaded" && setLightbox(true)}
        >
          {status === "loading" && (
            <span
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(90deg,#1f2937 25%,#374151 50%,#1f2937 75%)",
                backgroundSize: "200% 100%",
                animation: "blogShimmer 1.5s infinite linear",
              }}
            />
          )}
          {status === "error" && (
            <span className="flex items-center justify-center w-full py-12 text-gray-500 dark:text-gray-400 text-sm gap-2">
              Image could not be loaded
            </span>
          )}
          {status !== "error" && (
            <img
              src={src}
              alt={alt || ""}
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              className="w-full h-auto rounded-2xl object-cover transition-all duration-500 group-hover:scale-[1.02]"
              style={{ opacity: status === "loaded" ? 1 : 0, transition: "opacity 0.4s ease" }}
            />
          )}
          {status === "loaded" && (
            <span
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full text-xs font-semibold text-black dark:text-white pointer-events-none"
              style={{ background: "rgba(0,0,0,0.55)" }}
            >
              Click to enlarge
            </span>
          )}
        </span>
        {alt && status === "loaded" && (
          <span className="block text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{alt}</span>
        )}
      </span>
      <AnimatePresence>
        {lightbox && <Lightbox src={src} alt={alt} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  );
};

const VideoEmbed = ({ url, caption }) => {
  const ytId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);

  const Wrapper = ({ children }) => (
    <figure className="my-7 not-prose">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ paddingBottom: "56.25%", background: "#000" }}>
        {children}
      </div>
      {caption && <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{caption}</figcaption>}
    </figure>
  );

  if (ytId)
    return (
      <Wrapper>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
          title={caption || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </Wrapper>
    );

  if (vimeoId)
    return (
      <Wrapper>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          title={caption || "Vimeo video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </Wrapper>
    );

  if (isVideoFile(url))
    return (
      <figure className="my-7 not-prose">
        <video src={url} controls className="w-full rounded-2xl shadow-md" style={{ background: "#000", maxHeight: "480px" }} />
        {caption && <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{caption}</figcaption>}
      </figure>
    );

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#8bc53f] underline text-sm">
      {caption || url}
    </a>
  );
};

const markdownComponents = {
  img({ src, alt }) {
    if (!src) return null;
    if (isVideoFile(src) || getYouTubeId(src) || getVimeoId(src))
      return <VideoEmbed url={src} caption={alt} />;
    return <InlineImage src={src} alt={alt} />;
  },
  a({ href, children }) {
    const text = String(children ?? "");
    const isVideoLink =
      text.toLowerCase().startsWith("[video]") ||
      getYouTubeId(href) ||
      getVimeoId(href) ||
      isVideoFile(href);
    if (isVideoLink) {
      const caption = text.replace(/^\[video\]\s*/i, "");
      return <VideoEmbed url={href} caption={caption !== href ? caption : ""} />;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#8bc53f] no-underline hover:underline">
        {children}
      </a>
    );
  },
  p({ children }) {
    const hasBlock = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        (child.type === InlineImage ||
          child.type === VideoEmbed ||
          String(child.props?.className ?? "").includes("not-prose"))
    );
    if (hasBlock) return <>{children}</>;
    return <p className="text-gray-700 dark:text-gray-300 leading-[1.85] text-[15px] my-4">{children}</p>;
  },
};

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readProgress, setProgress] = useState(0);
  const [relatedPosts, setRelated] = useState([]);

  /* ── fetch blog by slug ── */
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/blog`);
        const data = await res.json();
        const all = data.data || [];
        const matched = all.find((b) => createSlug(b.title) === slug);
        if (!matched) { setBlog(null); return; }
        setBlog(matched);
        const related = all.filter(
          (b) =>
            b._id !== matched._id && // exclude current blog
            b.category === matched.category // same category
        );

        setRelated(related);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  /* ── scroll progress ── */
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── loading / not-found states ── */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white" >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 rounded-full"
          style={{ borderColor: "var(--color-green)", borderTopColor: "transparent" }}
        />
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
        Blog post not found.
      </div>
    );

  /* ── derived data ── */
  const keywords = safeParse(blog.keywords);
  const heroImage = blog.hero_image || "/assets/blog.jpeg";
  const authorName = blog.company || blog.author || "Digital Team";
  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
    : null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform) => {
    if (platform === "Copy Link") { navigator.clipboard?.writeText(shareUrl); return; }
    const map = {
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`,
    };
    window.open(map[platform], "_blank", "noopener");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white select-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Global keyframe for shimmer */}
      <style>{`
        @keyframes blogShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ── Read progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gray-800 pointer-events-none">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${readProgress}%`,
            background: "linear-gradient(90deg, var(--color-green), var(--color-yellow))",
          }}
        />
      </div>

      {/* ── HERO SECTION ── */}
      {/* <section className="relative w-full overflow-hidden" style={{ minHeight: "62vh" }}> */}
      <section className="relative w-full overflow-hidden min-h-[45vh] sm:min-h-[55vh] md:min-h-[62vh]">
        {/* Layer 1 — background image */}
        <img
          src={heroImage}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0, filter: "brightness(0.48)" }}
        />
        {/* Layer 2 — gradient darkening overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.58) 55%, rgba(0,0,0,0.93) 100%)",
          }}
        />

        {/* Layer 3 — back button */}
        <div className="absolute top-24 left-5 md:left-12" style={{ zIndex: 20 }}>
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/25 transition-all text-black dark:text-white"

          >
            ← Back to Blogs
          </button>
        </div>

        {/* Layer 4 — title + author anchored to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 md:px-12 pb-10" style={{ zIndex: 20 }}>
          <div className="max-w-5xl">

            {/* Category badge */}
            {blog.category && (
              <motion.span
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                style={{ background: "var(--color-yellow)", color: "#000000" }}
              >
                {blog.category}
              </motion.span>
            )}

            {/* Title */}
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.15] mb-6 text-white dark:text-white"

            >
              {blog.title}
            </motion.h1>

            {/* Author + read-time row */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="flex flex-wrap items-center gap-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#8bc53f,#5a8c1e)", color: "#ffffff" }}
                >
                  {authorName?.[0]?.toUpperCase() || "A"}
                </div>
                <div>
                  <p className="text-sm font-bold text-white dark:text-white" >{authorName}</p>
                  {formattedDate && <p className="text-xs" style={{ color: "rgba(255,255,255,0.60)" }}>{formattedDate}</p>}
                </div>
              </div>

              {blog.read_time && (
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.60)" }}>
                  <span className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>⏱</span>
                  {blog.read_time} min read
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb strip ── */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-3">
          <Breadcrumb category={blog.category} title={blog.title} />
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">

        <main className="min-w-0 space-y-12">

          {/* Tags */}
          {keywords.length > 0 && (
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="flex flex-wrap gap-2">
              {keywords.map((k, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1 rounded-full cursor-pointer hover:bg-[#8bc53f] hover:text-white transition-all select-none"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", }}
                >
                  {k}
                </span>
              ))}
            </motion.div>
          )}

          {/* Description */}
          {blog.description && (
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed border-l-4 pl-5"
              style={{ borderColor: "var(--color-green)" }}
            >
              {blog.description}
            </motion.p>
          )}

          {/* SECOND IMAGE */}
          {blog.image && (
            <img
              src={blog.image}
              className="w-full h-150 object-cover rounded-xl my-6"
            />
          )}
          {/* ── A) MARKDOWN CONTENT ── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div
              className="
  prose prose-base max-w-none 
  text-gray-800 dark:text-gray-300

  dark:prose-invert

  prose-ul:list-disc prose-ul:list-inside
  prose-ol:list-decimal prose-ol:list-inside
  prose-li:marker:text-gray-400

  prose-headings:font-black 
  prose-headings:text-black dark:prose-headings:text-white
  prose-headings:tracking-tight

  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
  prose-h4:text-base prose-h4:mt-6 prose-h4:mb-2

  prose-p:text-gray-800 dark:prose-p:text-gray-300 
  prose-p:leading-[1.85] prose-p:text-[15px]

  prose-li:text-gray-800 dark:prose-li:text-gray-300 
  prose-li:text-[15px] prose-li:leading-relaxed

  prose-strong:text-black dark:prose-strong:text-white 
  prose-strong:font-bold

  prose-a:text-[#8bc53f] prose-a:no-underline hover:prose-a:underline

  prose-blockquote:border-l-4 prose-blockquote:border-[#8bc53f]
  prose-blockquote:pl-5 prose-blockquote:italic 
  prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
  prose-blockquote:rounded-r-xl prose-blockquote:py-2

  prose-code:bg-gray-200 dark:prose-code:bg-gray-800
  prose-code:text-black dark:prose-code:text-gray-200
  prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm

  prose-ul:pl-6 prose-ol:pl-6

  [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20
"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </motion.div>


          {/* ── G) AUTHOR BIO ── */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-black dark:text-white font-black text-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#8bc53f,#5a8c1e)" }}
            >
              {authorName[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Written by</p>
              <p className="font-black text-black dark:text-white text-base">{authorName}</p>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">Sharing insights on digital strategy, marketing, and growth.</p>
            </div>
          </motion.div>

          {/* ── H) SHARE STRIP ── */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: "linear-gradient(135deg,rgba(139,197,63,0.08),rgba(255,201,59,0.08))",
              border: "1px solid rgba(139,197,63,0.20)",
            }}
          >
            <div>
              <p className="font-black text-black dark:text-white text-base">Found this helpful?</p>
              <p className="text-gray-400 text-sm">Share it with your network.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["LinkedIn", "Twitter", "Copy Link"].map((label) => (
                <button
                  key={label}
                  onClick={() => handleShare(label)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e5e7eb",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-green)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--color-green)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#e5e7eb"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── I) RELATED POSTS — mobile only ── */}
          {relatedPosts.length > 0 && (
            <div className="lg:hidden">
              <SectionHeading label="Related Articles" color="green" />
              <div className="space-y-4">
                {relatedPosts.slice(0, 3).map((post, i) => {
                  const ps = createSlug(post.title);
                  return (
                    <div key={i} onClick={() => navigate(`/blog/${ps}`)} className="flex gap-4 cursor-pointer group">
                      {post.hero_image && (
                        <img src={post.hero_image} alt={post.title} className="w-20 h-5 rounded-xl object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-[#8bc53f] transition-colors leading-snug line-clamp-2">{post.title}</p>
                        {post.createdAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(post.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        <aside className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-6 self-start">
          {/* Topics */}
          {keywords.length > 0 && (
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Topics</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all select-none"
                    style={{ border: "1px solid rgba(139,197,63,0.40)", color: "#8bc53f" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-green)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-green)"; }}
                  >{k}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Posts */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Related Posts</p>
            <div className="space-y-4">
              {relatedPosts.length > 0 ? (
                relatedPosts.slice(0, 4).map((post, i) => {
                  const ps = createSlug(post.title);
                  return (
                    <div key={i} onClick={() => navigate(`/blog/${ps}`, { state: { blogId: post._id } })} className="flex gap-3 group cursor-pointer">
                      {post.hero_image ? (
                        <img src={post.hero_image} alt={post.title}
                          // className="w-16 h-14 rounded-xl object-cover flex-shrink-0" 
                          className="w-16 h-9 sm:h-14 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-black dark:text-white text-xs font-black" style={{ background: "linear-gradient(135deg,#8bc53f,#5a8c1e)" }}>Blog</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#8bc53f] transition-colors leading-snug line-clamp-2">{post.title}</p>
                        {post.createdAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(post.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No related posts.</p>
              )}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#111 50%,#1c320a)" }}
          >
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-25" style={{ background: "var(--color-yellow)" }} />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-20" style={{ background: "var(--color-green)" }} />
            <p className="relative text-xs font-black uppercase tracking-widest mb-2" style={{ color: "var(--color-yellow)" }}>Free Consultation</p>
            <h3 className="relative text-xl font-black leading-tight mb-2 text-black dark:text-white" >Ready to grow your business?</h3>
            <p className="relative text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>Let our experts craft a strategy built for your goals.</p>
            <button
              className="relative w-full py-3 rounded-xl font-black text-sm text-black transition-all hover:scale-[1.03] active:scale-95"
              style={{ background: "var(--color-green)" }}
              onClick={() => navigate(`/contact`)}
            >Get in Touch →</button>
          </motion.div>
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <section
          className="border-t py-14 px-5 md:px-12"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeading label="Maybe You Want to Read" color="green" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((post, i) => {
                const ps = createSlug(post.title);
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    onClick={() => navigate(`/blog/${ps}`, { state: { blogId: post._id } })}
                    className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="overflow-hidden" style={{ height: "180px" }}>
                      {post.hero_image ? (
                        <img src={post.hero_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black dark:text-white font-black text-2xl" style={{ background: "linear-gradient(135deg,#8bc53f,#5a8c1e)" }}>
                          {post.title?.[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {post.category && <span className="text-xs font-black uppercase tracking-widest text-[#8bc53f]">{post.category}</span>}
                      <h3 className="mt-2 text-base font-black text-black dark:text-white group-hover:text-[#8bc53f] transition-colors leading-snug line-clamp-2">{post.title}</h3>
                      {post.createdAt && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;