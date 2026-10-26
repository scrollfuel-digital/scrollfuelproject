import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpenIcon } from "@animateicons/react/lucide";
import { pageSEO } from "../../data/seoData";
import {
  blogSlug,
  getImageUrl,
  fetchBlogList,
  getCachedBlogList,
  prefetchBlog,
} from "../../utils/blogUtils";
import useLoopSlider from "../../utils/useLoopSlider";
import SEO from "../../components/SEO";

/* ============================================================
   SEO CONFIGURATION
============================================================ */

const seo = {
  title:
    pageSEO?.blog?.title ||
    "Digital Marketing Blog | SEO, PPC & Online Growth | ScrollFuel",

  description:
    pageSEO?.blog?.description ||
    "Explore the ScrollFuel digital marketing blog for SEO tips, PPC strategies, social media insights, content marketing and online growth tips.",

  canonical: "https://scrollfuel.in/blog/",

  h1: pageSEO?.blog?.h1 || "Digital Marketing Blog",
};

/* ============================================================
   NAVIGATION
============================================================ */

const goToBlog = (navigate, blog) => {
  const slug = blogSlug(blog);

  if (!slug) return;

  navigate(`/blog/${slug}/`, {
    state: { blogId: blog._id },
  });
};

/* ============================================================
   IMAGE FALLBACK
============================================================ */

const BlogImage = ({
  src,
  alt,
  loading = "lazy",
  padding = "16px",
  className = "",
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center w-full h-full text-white font-bold ${className}`}
        style={{
          background: "linear-gradient(135deg, #8bc53f, #5a8c1e)",
        }}
      >
        <span className="text-2xl">ScrollFuel</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "ScrollFuel blog article"}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={{ padding }}
    />
  );
};

/* ============================================================
   STACKED BLOG ROW
============================================================ */

const BlogRow = ({ blog, index, navigate }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 52 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => goToBlog(navigate, blog)}
      onMouseEnter={() => prefetchBlog(blogSlug(blog))}
      onTouchStart={() => prefetchBlog(blogSlug(blog))}
      className="group relative grid grid-cols-1 md:grid-cols-2 border-b border-stone-200 dark:border-stone-800 cursor-pointer overflow-hidden bg-white dark:bg-black hover:bg-stone-50 dark:hover:bg-[#111111] transition-colors duration-500"
      style={{ minHeight: "460px" }}
    >
      {/* IMAGE SIDE */}
      <div
        className={`relative flex items-center justify-center bg-stone-50 dark:bg-[#111111] overflow-hidden ${isEven ? "md:order-1" : "md:order-2"
          }`}
        style={{ minHeight: "340px" }}
      >
        <BlogImage
          src={getImageUrl(blog?.hero_image, 900)}
          alt={blog?.title}
          loading={index === 0 ? "eager" : "lazy"}
          padding="24px"
          className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        <div
          className={`absolute bottom-0 h-[3px] w-0 bg-[#8bc53f] group-hover:w-full transition-all duration-700 ${isEven ? "left-0" : "right-0"
            }`}
        />
      </div>

      {/* CONTENT SIDE */}
      <div
        className={`relative flex flex-col justify-between px-6 py-10 md:px-10 lg:px-20 lg:py-16 overflow-hidden bg-white dark:bg-black ${isEven ? "md:order-2" : "md:order-1"
          }`}
      >
        <div
          className={`absolute top-0 h-[2px] w-12 bg-[#8bc53f] transition-all duration-500 group-hover:w-24 ${isEven ? "left-0" : "right-0"
            }`}
        />

        <div className="flex-1 flex flex-col">
          <h2 className="font-serif text-3xl md:text-[2.2rem] lg:text-[2.6rem] leading-[1.08] text-black dark:text-white mb-5 transition-transform duration-500 group-hover:-translate-y-1">
            {blog.title}
          </h2>

          <div className="w-8 h-px bg-stone-200 dark:bg-stone-700 mb-5 transition-all duration-500 group-hover:w-16" />

          <div className="overflow-hidden flex-1">
            <p className="text-stone-500 dark:text-stone-400 text-sm leading-[1.8] translate-y-0 md:translate-y-5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 line-clamp-4">
              {blog.excerpt || blog.description || ""}
            </p>
          </div>
        </div>

        <div className="mt-6 mb-5 overflow-hidden">
          <div className="translate-y-0 md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
            <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-black dark:text-white uppercase">
              Read Article
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-black dark:border-white text-sm transition-all duration-300 group-hover:bg-[#8bc53f] group-hover:border-[#8bc53f] group-hover:text-white">
                →
              </span>
            </span>
          </div>
        </div>

        <span
          aria-hidden="true"
          className={`absolute bottom-4 font-serif font-black text-[110px] leading-none pointer-events-none transition-all duration-700 text-stone-100 dark:text-stone-900 group-hover:translate-y-2 ${isEven ? "right-6" : "left-6"
            }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
};

/* ============================================================
   SLIDER CARD
============================================================ */

const SliderCard = ({ blog, navigate }) => (
  <article
    onClick={() => goToBlog(navigate, blog)}
    onMouseEnter={() => prefetchBlog(blogSlug(blog))}
    className="group relative w-full h-full cursor-pointer overflow-hidden bg-white dark:bg-[#111111] border border-stone-200 dark:border-stone-800 rounded-2xl"
  >
    <div
      className="relative flex items-center justify-center bg-stone-50 dark:bg-[#1a1a1a] overflow-hidden"
      style={{ height: "240px" }}
    >
      <BlogImage
        src={getImageUrl(blog?.hero_image, 600)}
        alt={blog?.title}
        padding="16px"
        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-[#8bc53f]/0 group-hover:bg-[#8bc53f]/10 transition-colors duration-500 pointer-events-none" />

      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#8bc53f] group-hover:w-full transition-all duration-500" />
    </div>

    <div className="relative p-7 overflow-hidden">
      <h3 className="font-serif text-xl leading-[1.2] text-black dark:text-white mb-3 transition-transform duration-500 group-hover:-translate-y-0.5 line-clamp-2">
        {blog.title}
      </h3>

      <p className="text-stone-500 dark:text-stone-400 text-[13px] leading-relaxed mb-5 line-clamp-3">
        {blog.excerpt || blog.description || ""}
      </p>

      <span className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-black dark:text-white uppercase">
        Read Article
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-black dark:border-white text-xs transition-all duration-300 group-hover:bg-[#8bc53f] group-hover:border-[#8bc53f] group-hover:text-white">
          →
        </span>
      </span>
    </div>
  </article>
);

/* ============================================================
   SLIDER SECTION
============================================================ */

const VISIBLE = 3;
const GAP = 24;

const SliderSection = ({ blogs, navigate }) => {
  const total = blogs.length;

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
          ...blogs.slice(-clones),
          ...blogs,
          ...blogs.slice(0, clones),
        ]
        : blogs,
    [blogs, canLoop, clones]
  );

  if (!total) return null;

  const cardWidth = `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-stone-50 dark:bg-[#0a0a0a] border-t border-stone-200 dark:border-stone-800 py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[2px] bg-[#8bc53f]" />
            <span className="text-[9px] font-bold tracking-[0.28em] text-[#8bc53f] uppercase">
              More Stories
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-black dark:text-white leading-tight">
            Keep Reading
          </h2>
        </div>

        {canLoop && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 mr-4">
              {blogs.map((blog, index) => (
                <button
                  key={blog._id || index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to blog ${index + 1}`}
                  aria-current={index === current ? "true" : undefined}
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
              aria-label="Previous blog"
              className="w-11 h-11 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:border-black dark:hover:border-white transition-all duration-300"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next blog"
              className="w-11 h-11 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-[#8bc53f] hover:border-[#8bc53f] hover:text-white transition-all duration-300"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="flex overflow-x-hidden"
        style={{ gap: `${GAP}px` }}
      >
        {looped.map((blog, index) => (
          <div
            key={`${blog._id || blogSlug(blog)}-${index}`}
            className="flex-shrink-0"
            style={{ width: cardWidth }}
          >
            <SliderCard blog={blog} navigate={navigate} />
          </div>
        ))}
      </div>

      {canLoop && (
        <div className="mt-8 h-px bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8bc53f] rounded-full transition-all duration-500"
            style={{
              width: `${((current + 1) / total) * 100}%`,
            }}
          />
        </div>
      )}
    </motion.section>
  );
};

/* ============================================================
   PAGE HEADING
============================================================ */

const PageHeading = ({ heading }) => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-black py-10 md:py-14"
  >
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 font-serif text-primary dark:text-white">
      {heading.h1}
    </h1>

    <p className="max-w-2xl mx-auto px-6 text-center text-sm md:text-base leading-relaxed text-stone-600 dark:text-stone-400">
      Explore digital marketing insights, SEO strategies, PPC tips, and social
      media trends to grow your business online.
    </p>
  </motion.header>
);

/* ============================================================
   EMPTY STATE
============================================================ */

const EmptyState = () => (
  <div className="min-h-[40vh] bg-white dark:bg-black flex items-center justify-center px-6">
    <div className="text-center">
      <h2 className="font-serif text-3xl md:text-4xl text-stone-400 dark:text-stone-600">
        No stories yet.
      </h2>

      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Please check back soon for the latest insights.
      </p>
    </div>
  </div>
);

/* ============================================================
   BLOG PAGE
============================================================ */

const Blog = () => {
  const navigate = useNavigate();

  const cachedBlogs = getCachedBlogList();

  const [blogs, setBlogs] = useState(() => cachedBlogs || []);
  const [loaded, setLoaded] = useState(() => !!cachedBlogs);
  const [error, setError] = useState(false);

  /* ---------- FETCH BLOGS ---------- */

  useEffect(() => {
    let cancelled = false;

    fetchBlogList()
      .then((result) => {
        if (cancelled) return;

        setBlogs(Array.isArray(result) ? result : []);
        setError(false);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);

        if (!cancelled) {
          setError(true);
          setLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- SPLIT BLOGS ---------- */

  const stackedBlogs = useMemo(() => blogs.slice(0, 3), [blogs]);
  const sliderBlogs = useMemo(() => blogs.slice(3), [blogs]);

  /* ---------- PAGE ---------- */

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      {/* SEO: managed by the reusable SEO component */}
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        image="https://scrollfuel.in/assets/logo1.png"
        type="website"
      />

      <style>{`
        .font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
      `}</style>

      <PageHeading heading={seo} />

      {blogs.length === 0 ? (
        !loaded ? null : error ? (
          <div className="min-h-[40vh] flex items-center justify-center px-6">
            <p className="text-sm text-stone-500 dark:text-stone-400 text-center">
              Unable to load blog posts right now. Please refresh the page and
              try again.
            </p>
          </div>
        ) : (
          <EmptyState />
        )
      ) : (
        <>
          {/* FIRST THREE BLOG POSTS */}
          <div>
            {stackedBlogs.map((blog, index) => (
              <BlogRow
                key={blog._id || blogSlug(blog)}
                blog={blog}
                index={index}
                navigate={navigate}
              />
            ))}
          </div>

          {/* REMAINING BLOG POSTS */}
          {sliderBlogs.length > 0 && (
            <SliderSection blogs={sliderBlogs} navigate={navigate} />
          )}
        </>
      )}

      <div className="h-[3px] bg-gradient-to-r from-[#8bc53f] via-[#ffc93b] to-transparent" />
    </div>
  );
};

export default Blog;