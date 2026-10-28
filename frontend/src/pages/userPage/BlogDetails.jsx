import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  blogSlug,
  optimizeImage,
  fetchBlogBySlug,
  getCachedBlog,
  prefetchBlog,
} from "../../utils/blogUtils";

import useLoopSlider from "../../utils/useLoopSlider";
import SEO from "../../components/SEO";

/* ============================================================
   HELPERS
============================================================ */

const SITE_URL = "https://scrollfuel.in";
const DEFAULT_SEO_IMAGE = `${SITE_URL}/assets/logo1.png`;

const safeParse = (data) => {
  try {
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getYouTubeId = (url = "") => {
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );

  return match ? match[1] : null;
};

const getVimeoId = (url = "") => {
  const match = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const isVideoFile = (url = "") =>
  /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(String(url));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const formatDate = (date, options) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.toLocaleDateString("en-IN", options);
};

/**
 * Ensure URLs used in social metadata are absolute.
 * Relative image paths resolve against the website domain.
 */
const toAbsoluteUrl = (url) => {
  if (!url || typeof url !== "string") {
    return DEFAULT_SEO_IMAGE;
  }

  try {
    return new URL(url, `${SITE_URL}/`).href;
  } catch {
    return DEFAULT_SEO_IMAGE;
  }
};

/* ============================================================
   BREADCRUMB
============================================================ */

const Breadcrumb = ({ category, title }) => {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs text-gray-400 flex-wrap"
    >
      <button
        type="button"
        className="hover:text-[#8bc53f] transition-colors"
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <span className="text-gray-500 dark:text-gray-400">›</span>

      <button
        type="button"
        className="hover:text-[#8bc53f] transition-colors"
        onClick={() => navigate("/blog")}
      >
        Blog
      </button>

      {category && (
        <>
          <span className="text-gray-500 dark:text-gray-400">›</span>
          <span>{category}</span>
        </>
      )}

      <span className="text-gray-500 dark:text-gray-400">›</span>

      <span className="text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
        {title}
      </span>
    </nav>
  );
};

/* ============================================================
   SECTION HEADING
============================================================ */

const SectionHeading = ({ label, color = "green" }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-7"
  >
    <span
      className="w-1.5 h-7 rounded-full flex-shrink-0"
      style={{
        background:
          color === "green"
            ? "var(--color-green)"
            : "var(--color-yellow)",
      }}
    />

    <h2 className="text-xl font-black text-black dark:text-white tracking-tight">
      {label}
    </h2>
  </motion.div>
);

/* ============================================================
   IMAGE LIGHTBOX
============================================================ */

const Lightbox = ({ src, alt, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    role="dialog"
    aria-modal="true"
    aria-label={alt || "Image preview"}
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="relative max-w-5xl w-full"
      onClick={(event) => event.stopPropagation()}
    >
      <img
        src={src}
        alt={alt || ""}
        className="w-full max-h-[88vh] object-contain rounded-2xl"
      />

      {alt && (
        <p className="mt-3 text-center text-white/55 text-sm italic">
          {alt}
        </p>
      )}

      <button
        type="button"
        aria-label="Close image preview"
        onClick={onClose}
        className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white text-xl hover:bg-white/25 transition-all"
      >
        ×
      </button>
    </motion.div>
  </motion.div>
);

/* ============================================================
   INLINE MARKDOWN IMAGE
============================================================ */

const InlineImage = ({ src, alt }) => {
  const [lightbox, setLightbox] = useState(false);
  const [status, setStatus] = useState("loading");

  const imageSrc = optimizeImage(src, 1200);

  return (
    <>
      <span className="block my-7 not-prose">
        <span
          className="block relative rounded-2xl overflow-hidden group bg-gray-800"
          style={{
            cursor: status === "loaded" ? "zoom-in" : "default",
            minHeight: status === "loaded" ? 0 : "280px",
          }}
          onClick={() => {
            if (status === "loaded") setLightbox(true);
          }}
        >
          {status === "loading" && (
            <span
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(90deg,#1f2937 25%,#374151 50%,#1f2937 75%)",
                backgroundSize: "200% 100%",
                animation: "blogShimmer 1.5s infinite linear",
              }}
            />
          )}

          {status === "error" && (
            <span className="flex items-center justify-center w-full py-12 text-gray-500 dark:text-gray-400 text-sm">
              Image could not be loaded
            </span>
          )}

          {status !== "error" && (
            <img
              src={imageSrc}
              alt={alt || ""}
              loading="lazy"
              decoding="async"
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.02]"
              style={{
                opacity: status === "loaded" ? 1 : 0,
                transition: "opacity 0.4s ease, transform 0.5s ease",
              }}
            />
          )}

          {status === "loaded" && (
            <span
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full text-xs font-semibold text-white pointer-events-none"
              style={{ background: "rgba(0,0,0,0.55)" }}
            >
              Click to enlarge
            </span>
          )}
        </span>

        {alt && status === "loaded" && (
          <span className="block text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            {alt}
          </span>
        )}
      </span>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={imageSrc}
            alt={alt}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* ============================================================
   VIDEO EMBED
============================================================ */

const VideoEmbed = ({ url, caption }) => {
  const ytId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);

  const frame = (children) => (
    <figure className="my-7 not-prose">
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-md"
        style={{ paddingBottom: "56.25%", background: "#000" }}
      >
        {children}
      </div>

      {caption && (
        <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );

  if (ytId) {
    return frame(
      <iframe
        src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
        title={caption || "YouTube video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
      />
    );
  }

  if (vimeoId) {
    return frame(
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
        title={caption || "Vimeo video"}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
      />
    );
  }

  if (isVideoFile(url)) {
    return (
      <figure className="my-7 not-prose">
        <video
          src={url}
          controls
          preload="metadata"
          className="w-full rounded-2xl shadow-md"
          style={{ background: "#000", maxHeight: "480px" }}
        />

        {caption && (
          <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#8bc53f] underline text-sm"
    >
      {caption || url}
    </a>
  );
};

/* ============================================================
   MARKDOWN COMPONENTS
============================================================ */

const markdownComponents = {
  img({ src, alt }) {
    if (!src) return null;

    if (isVideoFile(src) || getYouTubeId(src) || getVimeoId(src)) {
      return <VideoEmbed url={src} caption={alt} />;
    }

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

      return (
        <VideoEmbed
          url={href}
          caption={caption !== href ? caption : ""}
        />
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#8bc53f] no-underline hover:underline"
      >
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

    return (
      <p className="text-gray-700 dark:text-gray-300 leading-[1.85] text-[15px] my-4">
        {children}
      </p>
    );
  },
};

const remarkPlugins = [remarkGfm];

const MarkdownBody = React.memo(({ content }) => (
  <ReactMarkdown
    remarkPlugins={remarkPlugins}
    components={markdownComponents}
  >
    {content || ""}
  </ReactMarkdown>
));

/* ============================================================
   PROSE STYLES
============================================================ */

const PROSE_CLASSES = `
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
  prose-a:text-[#8bc53f]
  prose-a:no-underline
  hover:prose-a:underline
  prose-blockquote:border-l-4
  prose-blockquote:border-[#8bc53f]
  prose-blockquote:pl-5
  prose-blockquote:italic
  prose-blockquote:text-gray-700
  dark:prose-blockquote:text-gray-300
  prose-blockquote:rounded-r-xl
  prose-blockquote:py-2
  prose-code:bg-gray-200
  dark:prose-code:bg-gray-800
  prose-code:text-black
  dark:prose-code:text-gray-200
  prose-code:px-1.5
  prose-code:py-0.5
  prose-code:rounded
  prose-code:text-sm
  prose-ul:pl-6
  prose-ol:pl-6
  [&_h2]:scroll-mt-20
  [&_h3]:scroll-mt-20
`;

/* ============================================================
   RELATED BLOG CARD
============================================================ */

const RelatedBlogCard = ({ post, mobile = false, navigate }) => {
  const slug = blogSlug(post);
  const thumb = mobile ? "w-20 h-16" : "w-16 h-14";

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() =>
        navigate(`/blog/${slug}`, {
          state: { blogId: post._id },
        })
      }
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          navigate(`/blog/${slug}`, {
            state: { blogId: post._id },
          });
        }
      }}
      onMouseEnter={() => prefetchBlog(slug)}
      className={
        mobile
          ? "flex gap-4 cursor-pointer group"
          : "flex gap-3 group cursor-pointer"
      }
    >
      {post.hero_image ? (
        <img
          src={optimizeImage(post.hero_image, 200)}
          alt={post.title || "Related article"}
          loading="lazy"
          decoding="async"
          className={`${thumb} rounded-xl object-cover flex-shrink-0`}
        />
      ) : (
        <div
          className={`${thumb} rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-black`}
          style={{
            background: "linear-gradient(135deg,#8bc53f,#5a8c1e)",
          }}
        >
          Blog
        </div>
      )}

      <div className="flex-1 min-w-0">
        {post.category && (
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#8bc53f] mb-1">
            {post.category}
          </p>
        )}

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#8bc53f] transition-colors leading-snug line-clamp-2">
          {post.title}
        </p>

        {post.createdAt && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(post.createdAt, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   RELATED POSTS SLIDER
============================================================ */

const VISIBLE = 3;
const GAP = 24;

const RelatedPostsSlider = ({ relatedPosts, navigate }) => {
  const total = relatedPosts.length;

  const {
    trackRef,
    current,
    canLoop,
    clones,
    next,
    prev,
    goTo,
  } = useLoopSlider(total, VISIBLE, GAP);

  const looped = useMemo(
    () =>
      canLoop
        ? [
          ...relatedPosts.slice(-clones),
          ...relatedPosts,
          ...relatedPosts.slice(0, clones),
        ]
        : relatedPosts,
    [relatedPosts, canLoop, clones]
  );

  if (!total) return null;

  const cardWidth = `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`;

  return (
    <div className="w-full">
      {canLoop && (
        <div className="flex justify-end items-center gap-3 mb-6">
          <div className="hidden md:flex items-center gap-2 mr-3">
            {relatedPosts.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to post ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${index === current
                    ? "w-6 h-2 bg-[#8bc53f]"
                    : "w-2 h-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400"
                  }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous related post"
            className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-[#8bc53f] hover:border-[#8bc53f] hover:text-white transition-all"
          >
            ←
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next related post"
            className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-[#8bc53f] hover:border-[#8bc53f] hover:text-white transition-all"
          >
            →
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        className="flex overflow-x-hidden"
        style={{ gap: `${GAP}px` }}
      >
        {looped.map((post, index) => {
          const postSlug = blogSlug(post);

          return (
            <div
              key={`${post._id}-${index}`}
              onClick={() =>
                navigate(`/blog/${postSlug}`, {
                  state: { blogId: post._id },
                })
              }
              onMouseEnter={() => prefetchBlog(postSlug)}
              className="flex-shrink-0 cursor-pointer group"
              style={{ width: cardWidth }}
            >
              <div
                className="rounded-2xl overflow-hidden h-full hover:shadow-lg transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="overflow-hidden" style={{ height: "180px" }}>
                  {post.hero_image ? (
                    <img
                      src={optimizeImage(post.hero_image, 600)}
                      alt={post.title || "Related article"}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-black text-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg,#8bc53f,#5a8c1e)",
                      }}
                    >
                      {post.title?.[0]?.toUpperCase() || "B"}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {post.category && (
                    <span className="text-xs font-black uppercase tracking-widest text-[#8bc53f]">
                      {post.category}
                    </span>
                  )}

                  <h3 className="mt-2 text-base font-black text-black dark:text-white group-hover:text-[#8bc53f] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {post.createdAt && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(post.createdAt, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   BLOG DETAILS PAGE
============================================================ */

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(() => getCachedBlog(slug));
  const [loading, setLoading] = useState(() => !getCachedBlog(slug));

  const progressRef = useRef(null);

  const blog = data?.blog || null;
  const relatedPosts = data?.related || [];

  /* ------------------------------------------------------------
     FETCH BLOG

     Fetch and scroll hooks must be declared before any returns.
  ------------------------------------------------------------ */

  useEffect(() => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const cached = getCachedBlog(slug);

    if (cached) {
      setData(cached);
      setLoading(false);
    } else {
      setLoading(true);
      setData(null);
    }

    fetchBlogBySlug(slug)
      .then((result) => {
        if (cancelled) return;

        setData(result || null);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);

        if (!cancelled) {
          if (!cached) setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* ------------------------------------------------------------
     READING PROGRESS BAR
  ------------------------------------------------------------ */

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        total > 0 ? (window.scrollY / total) * 100 : 0;

      if (progressRef.current) {
        progressRef.current.style.width = `${percentage}%`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [slug, loading]);

  /* ------------------------------------------------------------
     LOADING STATE

     IMPORTANT: No blog properties are accessed before this
     conditional return.
  ------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 rounded-full"
          style={{
            borderColor: "var(--color-green)",
            borderTopColor: "transparent",
          }}
        />
      </div>
    );
  }

  /* ------------------------------------------------------------
     NOT FOUND STATE
  ------------------------------------------------------------ */

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5 text-gray-500 dark:text-gray-400 text-sm">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Blog post not found
        </h1>

        <p>
          This article may have been removed or the URL may be incorrect.
        </p>

        <button
          type="button"
          onClick={() => navigate("/blog")}
          className="px-5 py-2.5 rounded-full bg-[#8bc53f] text-black font-semibold hover:opacity-90 transition"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  /* ------------------------------------------------------------
     SEO METADATA

     This section only runs when blog exists.
  ------------------------------------------------------------ */

  const pageTitle =
    blog.metaTitle ||
    blog.seoTitle ||
    `${blog.title || "Digital Marketing Insights"} | ScrollFuel`;

  const rawDescription =
    blog.metaDescription ||
    blog.seoDescription ||
    blog.excerpt ||
    blog.description ||
    "Read the latest digital marketing insights from ScrollFuel.";

  // Keep the description reasonably concise for search snippets.
  const pageDescription = String(rawDescription)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  const pageCanonical = `${SITE_URL}/blog/${encodeURIComponent(slug)}/`;

  const optimizedSeoImage = blog.hero_image
    ? optimizeImage(blog.hero_image, 1200)
    : "";

  const pageImage = toAbsoluteUrl(optimizedSeoImage);

  const publishedTime = blog.createdAt || undefined;
  const modifiedTime = blog.updatedAt || blog.createdAt || undefined;
  const authorName = blog.company || blog.author || "ScrollFuel";

  /* ------------------------------------------------------------
     DERIVED DATA
  ------------------------------------------------------------ */

  const keywords = safeParse(blog.keywords);

  const heroImage =
    optimizeImage(blog.hero_image, 1600) || "/assets/blog.jpeg";

  const formattedDate = formatDate(blog.createdAt, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const shareUrl = pageCanonical;

  const handleShare = (platform) => {
    if (platform === "Copy Link") {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(shareUrl).catch((error) => {
          console.error("Could not copy link:", error);
        });
      } else {
        window.prompt("Copy this article link:", shareUrl);
      }

      return;
    }

    const shareUrls = {
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,

      Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(blog.title || pageTitle)}`,
    };

    const targetUrl = shareUrls[platform];

    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  /* ------------------------------------------------------------
     PAGE UI
  ------------------------------------------------------------ */

  return (
    <div
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* SEO */}
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={pageCanonical}
        image={pageImage}
        type="article"
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        author={authorName}
      />

{/* READ PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gray-800 pointer-events-none">
        <div
          ref={progressRef}
          className="h-full"
          style={{
            width: "0%",
            background:
              "linear-gradient(90deg, var(--color-green), var(--color-yellow))",
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative w-full overflow-hidden min-h-[45vh] sm:min-h-[55vh] md:min-h-[62vh]">
        <img
          src={heroImage}
          alt={blog.title || "ScrollFuel article"}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0, filter: "brightness(0.48)" }}
        />

        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.58) 55%, rgba(0,0,0,0.93) 100%)",
          }}
        />

        <div
          className="absolute top-24 left-5 md:left-12"
          style={{ zIndex: 20 }}
        >
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/25 transition-all text-white"
          >
            ← Back to Blogs
          </button>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 px-5 md:px-12 pb-10"
          style={{ zIndex: 20 }}
        >
          <div className="max-w-5xl">
            {blog.category && (
              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                style={{
                  background: "var(--color-yellow)",
                  color: "#000000",
                }}
              >
                {blog.category}
              </motion.span>
            )}

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.15] mb-6 text-white"
            >
              {blog.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="flex flex-wrap items-center gap-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg,#8bc53f,#5a8c1e)",
                    color: "#ffffff",
                  }}
                >
                  {authorName?.[0]?.toUpperCase() || "S"}
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    {authorName}
                  </p>

                  {formattedDate && (
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                    >
                      {formattedDate}
                    </p>
                  )}
                </div>
              </div>

              {blog.read_time && (
                <span
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    ⏱
                  </span>

                  {blog.read_time} min read
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-3">
          <Breadcrumb category={blog.category} title={blog.title} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
        <main className="min-w-0 space-y-12">
          {blog.description && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed border-l-4 pl-5"
              style={{ borderColor: "var(--color-green)" }}
            >
              {blog.description}
            </motion.p>
          )}

          {blog.image && (
            <img
              src={optimizeImage(blog.image, 1200)}
              alt={blog.title || "Article image"}
              loading="lazy"
              decoding="async"
              className="w-full max-h-[600px] object-contain rounded-xl my-6"
            />
          )}

          {/* MARKDOWN CONTENT */}
          <div className={PROSE_CLASSES}>
            <MarkdownBody content={blog.content} />
          </div>

          {/* TAGS */}
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={`${keyword}-${index}`}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {/* AUTHOR */}
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0"
              style={{
                background: "linear-gradient(135deg,#8bc53f,#5a8c1e)",
              }}
            >
              {authorName[0]?.toUpperCase() || "S"}
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                Written by
              </p>

              <p className="font-black text-black dark:text-white text-base">
                {authorName}
              </p>

              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                Sharing insights on digital strategy, marketing, and growth.
              </p>
            </div>
          </div>

          {/* SHARE */}
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background:
                "linear-gradient(135deg,rgba(139,197,63,0.08),rgba(255,201,59,0.08))",
              border: "1px solid rgba(139,197,63,0.20)",
            }}
          >
            <div>
              <p className="font-black text-black dark:text-white text-base">
                Found this helpful?
              </p>

              <p className="text-gray-400 text-sm">
                Share it with your network.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {["LinkedIn", "Twitter", "Copy Link"].map((label) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => handleShare(label)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.03] hover:!bg-[#8bc53f] hover:!border-[#8bc53f] hover:!text-white"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#9ca3af",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* MOBILE RELATED POSTS */}
          {relatedPosts.length > 0 && (
            <div className="lg:hidden">
              <SectionHeading label="Related Articles" color="green" />

              <div className="space-y-5">
                {relatedPosts.slice(0, 5).map((post) => (
                  <RelatedBlogCard
                    key={post._id}
                    post={post}
                    mobile
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-6 self-start">
          {keywords.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                Topics
              </p>

              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span
                    key={`${keyword}-${index}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-[#8bc53f]"
                    style={{
                      border: "1px solid rgba(139,197,63,0.40)",
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
              All Posts
            </p>

            <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
              {relatedPosts.length > 0 ? (
                relatedPosts.map((post) => (
                  <RelatedBlogCard
                    key={post._id}
                    post={post}
                    navigate={navigate}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No other posts available.
                </p>
              )}
            </div>
          </div>

          {/* CONSULTATION CTA */}
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#111 50%,#1c320a)",
            }}
          >
            <div
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-25"
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

            <h3 className="relative text-xl font-black leading-tight mb-2 text-white">
              Ready to grow your business?
            </h3>

            <p
              className="relative text-sm mb-5 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Let our experts craft a strategy built for your goals.
            </p>

            <button
              type="button"
              className="relative w-full py-3 rounded-xl font-black text-sm text-black transition-all hover:scale-[1.03] active:scale-95"
              style={{ background: "var(--color-green)" }}
              onClick={() => navigate("/connect-with-us/")}
            >
              Get in Touch →
            </button>
          </div>
        </aside>
      </div>

      {/* RELATED POSTS SLIDER */}
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {relatedPosts.length > 0 && (
          <section className="mt-20 pb-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[2px] bg-[#8bc53f]" />

                  <span className="text-[9px] font-bold tracking-[0.28em] text-[#8bc53f] uppercase">
                    More Stories
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl text-black dark:text-white">
                  Related Posts
                </h2>
              </div>
            </div>

            <RelatedPostsSlider
              key={slug}
              relatedPosts={relatedPosts}
              navigate={navigate}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
